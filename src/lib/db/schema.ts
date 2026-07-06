import {
  sqliteTable,
  text,
  integer,
  real,
  index,
} from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

// ============================================================================
// ENUMS (as text + check at app level — SQLite has no native enums)
// ============================================================================

export const USER_ROLES = ["owner", "dispatcher", "technician", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const JOB_STATUSES = ["scheduled", "en_route", "in_progress", "completed", "cancelled", "on_hold"] as const;
export type JobStatus = (typeof JOB_STATUSES)[number];

export const JOB_PRIORITIES = ["low", "normal", "high", "emergency"] as const;
export type JobPriority = (typeof JOB_PRIORITIES)[number];

export const INVOICE_STATUSES = ["draft", "sent", "viewed", "paid", "overdue", "void"] as const;
export type InvoiceStatus = (typeof INVOICE_STATUSES)[number];

export const SUBSCRIPTION_STATUSES = ["trialing", "active", "past_due", "canceled", "unpaid", "incomplete"] as const;
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number];

export const PLAN_TIERS = ["starter", "pro", "business"] as const;
export type PlanTier = (typeof PLAN_TIERS)[number];

// ============================================================================
// ORGANIZATIONS
// ============================================================================

export const organizations = sqliteTable("organizations", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  trade: text("trade").notNull().default("hvac"),

  // Stripe
  stripeCustomerId: text("stripe_customer_id").unique(),
  stripeConnectAccountId: text("stripe_connect_account_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  planTier: text("plan_tier").$type<PlanTier>().default("starter"),
  subscriptionStatus: text("subscription_status").$type<SubscriptionStatus>(),

  // Settings
  timezone: text("timezone").default("America/New_York"),
  defaultHourlyRate: real("default_hourly_rate").default(125),
  currency: text("currency").default("USD"),

  // Trial
  trialEndsAt: integer("trial_ends_at", { mode: "timestamp" }),

  // Metadata
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});

// ============================================================================
// USERS
// ============================================================================

export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash"), // bcrypt hash (NULL for OAuth users)
    fullName: text("full_name"),
    role: text("role").$type<UserRole>().default("technician"),
    phone: text("phone"),
    avatarUrl: text("avatar_url"),

    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
  },
  (t) => ({
    orgIdIdx: index("users_org_id_idx").on(t.orgId),
  })
);

// ============================================================================
// SESSIONS (for custom auth — replaces Supabase Auth)
// ============================================================================

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});

// ============================================================================
// CUSTOMERS
// ============================================================================

export const customers = sqliteTable(
  "customers",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),

    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone").notNull(),

    // Address
    addressLine1: text("address_line1"),
    addressLine2: text("address_line2"),
    city: text("city"),
    state: text("state"),
    zip: text("zip"),

    // Property details (HVAC-specific)
    propertyType: text("property_type"),
    systemType: text("system_type"),
    systemBrand: text("system_brand"),
    systemAge: integer("system_age"),
    squareFootage: integer("square_footage"),

    notes: text("notes"),
    tags: text("tags", { mode: "json" }).$type<string[]>(),

    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
  },
  (t) => ({
    orgIdIdx: index("customers_org_id_idx").on(t.orgId),
    phoneIdx: index("customers_phone_idx").on(t.phone),
  })
);

// ============================================================================
// JOBS
// ============================================================================

export const jobs = sqliteTable(
  "jobs",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    customerId: text("customer_id")
      .notNull()
      .references(() => customers.id, { onDelete: "cascade" }),
    assignedToId: text("assigned_to_id").references(() => users.id, {
      onDelete: "set null",
    }),

    scheduledStart: integer("scheduled_start", { mode: "timestamp" }).notNull(),
    scheduledEnd: integer("scheduled_end", { mode: "timestamp" }),
    actualStart: integer("actual_start", { mode: "timestamp" }),
    actualEnd: integer("actual_end", { mode: "timestamp" }),

    title: text("title").notNull(),
    description: text("description"),
    jobType: text("job_type"),
    status: text("status").$type<JobStatus>().default("scheduled").notNull(),
    priority: text("priority").$type<JobPriority>().default("normal").notNull(),

    estimatedHours: real("estimated_hours"),
    actualHours: real("actual_hours"),
    hourlyRate: real("hourly_rate"),
    flatRate: real("flat_rate"),
    partsCost: real("parts_cost").default(0),

    systemDiagnosis: text("system_diagnosis"),
    workPerformed: text("work_performed"),
    recommendations: text("recommendations"),

    customerSignatureUrl: text("customer_signature_url"),
    customerApprovedAt: integer("customer_approved_at", { mode: "timestamp" }),

    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
  },
  (t) => ({
    orgIdIdx: index("jobs_org_id_idx").on(t.orgId),
    customerIdIdx: index("jobs_customer_id_idx").on(t.customerId),
    statusIdx: index("jobs_status_idx").on(t.status),
    scheduledStartIdx: index("jobs_scheduled_start_idx").on(t.scheduledStart),
  })
);

// ============================================================================
// INVOICES
// ============================================================================

export const invoices = sqliteTable(
  "invoices",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    orgId: text("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    jobId: text("job_id").references(() => jobs.id, { onDelete: "set null" }),
    customerId: text("customer_id")
      .notNull()
      .references(() => customers.id, { onDelete: "cascade" }),
    invoiceNumber: text("invoice_number").notNull(),

    status: text("status").$type<InvoiceStatus>().default("draft").notNull(),

    subtotal: real("subtotal").notNull(),
    taxRate: real("tax_rate").default(0),
    taxAmount: real("tax_amount").default(0),
    total: real("total").notNull(),
    amountPaid: real("amount_paid").default(0),

    issueDate: integer("issue_date", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
    dueDate: integer("due_date", { mode: "timestamp" }).notNull(),
    paidAt: integer("paid_at", { mode: "timestamp" }),

    stripeInvoiceId: text("stripe_invoice_id"),
    stripePaymentIntentId: text("stripe_payment_intent_id"),

    pdfUrl: text("pdf_url"),
    notes: text("notes"),

    createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
  },
  (t) => ({
    orgIdIdx: index("invoices_org_id_idx").on(t.orgId),
    jobIdIdx: index("invoices_job_id_idx").on(t.jobId),
    statusIdx: index("invoices_status_idx").on(t.status),
  })
);

export const invoiceLineItems = sqliteTable("invoice_line_items", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  invoiceId: text("invoice_id")
    .notNull()
    .references(() => invoices.id, { onDelete: "cascade" }),

  description: text("description").notNull(),
  quantity: real("quantity").notNull(),
  unitPrice: real("unit_price").notNull(),
  total: real("total").notNull(),

  serviceCatalogId: text("service_catalog_id"),

  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});

export const serviceCatalog = sqliteTable("service_catalog", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  orgId: text("org_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" }),

  name: text("name").notNull(),
  description: text("description"),
  category: text("category"),
  defaultPrice: real("default_price").notNull(),
  estimatedMinutes: integer("estimated_minutes"),

  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()).notNull(),
});

// ============================================================================
// RELATIONS
// ============================================================================

export const organizationsRelations = relations(organizations, ({ many }) => ({
  users: many(users),
  customers: many(customers),
  jobs: many(jobs),
  invoices: many(invoices),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  org: one(organizations, { fields: [users.orgId], references: [organizations.id] }),
  assignedJobs: many(jobs),
}));

export const customersRelations = relations(customers, ({ one, many }) => ({
  org: one(organizations, { fields: [customers.orgId], references: [organizations.id] }),
  jobs: many(jobs),
  invoices: many(invoices),
}));

export const jobsRelations = relations(jobs, ({ one, many }) => ({
  org: one(organizations, { fields: [jobs.orgId], references: [organizations.id] }),
  customer: one(customers, { fields: [jobs.customerId], references: [customers.id] }),
  assignedTo: one(users, { fields: [jobs.assignedToId], references: [users.id] }),
  invoices: many(invoices),
}));

export const invoicesRelations = relations(invoices, ({ one, many }) => ({
  org: one(organizations, { fields: [invoices.orgId], references: [organizations.id] }),
  job: one(jobs, { fields: [invoices.jobId], references: [jobs.id] }),
  customer: one(customers, { fields: [invoices.customerId], references: [customers.id] }),
  lineItems: many(invoiceLineItems),
}));

export const invoiceLineItemsRelations = relations(invoiceLineItems, ({ one }) => ({
  invoice: one(invoices, { fields: [invoiceLineItems.invoiceId], references: [invoices.id] }),
}));

// ============================================================================
// TYPES
// ============================================================================

export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;
export type Job = typeof jobs.$inferSelect;
export type NewJob = typeof jobs.$inferInsert;
export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;
export type InvoiceLineItem = typeof invoiceLineItems.$inferSelect;
export type ServiceCatalogItem = typeof serviceCatalog.$inferSelect;
export type Session = typeof sessions.$inferSelect;