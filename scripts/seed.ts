/**
 * Seed the Turso DB with a demo org + demo user + sample data.
 *
 * Demo credentials: demo@jobflow.app / password123
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import {
  organizations,
  users,
  customers,
  jobs,
  invoices,
  serviceCatalog,
} from "../src/lib/db/schema";

const url = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;

if (!url) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const client = createClient({ url, authToken });
const db = drizzle(client);

const DEMO_EMAIL = "demo@jobflow.app";
const DEMO_PASSWORD = "password123";

async function main() {
  console.log("Seeding demo data...");

  // 1. Create demo org
  const existing = await db
    .select()
    .from(organizations)
    .where(eq(organizations.slug, "cool-air-hvac"));

  let orgId: string;
  if (existing.length > 0) {
    orgId = existing[0].id;
    console.log(`Org already exists: ${orgId}`);
  } else {
    const [org] = await db
      .insert(organizations)
      .values({
        name: "Cool Air HVAC",
        slug: "cool-air-hvac",
        trade: "hvac",
        defaultHourlyRate: 125,
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        planTier: "pro",
        subscriptionStatus: "trialing",
      })
      .returning();
    orgId = org.id;
    console.log(`✓ Org created: ${org.name} (${orgId})`);
  }

  // 2. Create demo user
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, DEMO_EMAIL));

  if (existingUser.length === 0) {
    const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
    const [user] = await db
      .insert(users)
      .values({
        orgId,
        email: DEMO_EMAIL,
        passwordHash,
        fullName: "Mike Rodriguez",
        role: "owner",
        phone: "(555) 123-4567",
      })
      .returning();
    console.log(`✓ Demo user created: ${user.email} / ${DEMO_PASSWORD}`);
  } else {
    console.log("Demo user already exists, skipping");
  }

  // 3. Create 5 technicians
  const techNames = [
    "Mike Rodriguez",
    "Sarah Thompson",
    "James Lee",
    "Carlos Garcia",
    "David Park",
  ];
  const techIds: string[] = [];
  for (const name of techNames) {
    const techId = crypto.randomUUID();
    await db.insert(users).values({
      id: techId,
      orgId,
      email: `${name.toLowerCase().replace(/\s+/g, ".")}@coolair.com`,
      fullName: name,
      role: "technician",
      passwordHash: await bcrypt.hash("tech123", 10),
    });
    techIds.push(techId);
  }
  console.log(`✓ ${techNames.length} technicians created`);

  // 4. Create service catalog (HVAC-specific)
  const services = [
    { name: "AC Tune-Up", category: "maintenance", price: 129 },
    { name: "Furnace Tune-Up", category: "maintenance", price: 129 },
    { name: "Refrigerant Top-Up (R-410A)", category: "repair", price: 185 },
    { name: "Capacitor Replacement", category: "repair", price: 195 },
    { name: "Blower Motor Replacement", category: "repair", price: 695 },
    { name: "AC System Installation", category: "install", price: 7500 },
    { name: "Furnace Installation", category: "install", price: 4500 },
    { name: "Heat Pump Installation", category: "install", price: 8500 },
    { name: "Ductwork Inspection", category: "inspection", price: 175 },
    { name: "Thermostat Installation", category: "install", price: 250 },
  ];
  for (const svc of services) {
    await db.insert(serviceCatalog).values({
      orgId,
      name: svc.name,
      category: svc.category,
      defaultPrice: svc.price,
      estimatedMinutes: 60,
    });
  }
  console.log(`✓ ${services.length} service catalog items created`);

  // 5. Create customers (HVAC properties)
  const customerData = [
    { name: "Smith Residence", phone: "(555) 123-4567", city: "Houston", state: "TX", system: "Central AC + Furnace", brand: "Trane" },
    { name: "Johnson Family", phone: "(555) 234-5678", city: "Katy", state: "TX", system: "Heat Pump", brand: "Carrier" },
    { name: "Garcia Property", phone: "(555) 345-6789", city: "Sugar Land", state: "TX", system: "Central AC", brand: "Lennox" },
    { name: "Lee Residence", phone: "(555) 456-7890", city: "Pearland", state: "TX", system: "Mini-Split", brand: "Mitsubishi" },
    { name: "Park Family", phone: "(555) 567-8901", city: "Spring", state: "TX", system: "Central AC", brand: "Goodman" },
    { name: "Brown Residence", phone: "(555) 678-9012", city: "The Woodlands", state: "TX", system: "Furnace + AC", brand: "York" },
    { name: "Williams Property", phone: "(555) 789-0123", city: "Tomball", state: "TX", system: "Heat Pump", brand: "Daikin" },
    { name: "Davis Family", phone: "(555) 890-1234", city: "Cypress", state: "TX", system: "Central AC", brand: "Rheem" },
    { name: "Martinez Residence", phone: "(555) 901-2345", city: "Missouri City", state: "TX", system: "Central AC + Furnace", brand: "American Standard" },
    { name: "Anderson Property", phone: "(555) 012-3456", city: "Friendswood", state: "TX", system: "Mini-Split", brand: "Fujitsu" },
  ];

  const customerIds: string[] = [];
  for (const c of customerData) {
    const customerId = crypto.randomUUID();
    await db.insert(customers).values({
      id: customerId,
      orgId,
      name: c.name,
      phone: c.phone,
      email: `${c.name.toLowerCase().split(" ")[0]}@example.com`,
      city: c.city,
      state: c.state,
      zip: "77001",
      propertyType: "residential",
      systemType: c.system,
      systemBrand: c.brand,
      systemAge: Math.floor(Math.random() * 15) + 2,
      squareFootage: Math.floor(Math.random() * 2000) + 1500,
      tags: ["residential"],
    });
    customerIds.push(customerId);
  }
  console.log(`✓ ${customerData.length} customers created`);

  // 6. Create jobs (varied status)
  const jobTitles = [
    "AC tune-up", "Furnace diagnostic", "Heat pump repair", "Refrigerant top-up",
    "Capacitor swap", "Blower motor replacement", "Thermostat installation",
    "Ductwork inspection", "Annual maintenance", "Emergency AC repair",
    "Furnace installation", "Heat pump installation", "Mini-split install",
    "Filter replacement", "System diagnostic",
  ];
  const statuses = ["scheduled", "scheduled", "completed", "in_progress", "scheduled", "completed", "scheduled", "completed"];
  const priorities = ["normal", "high", "normal", "low", "emergency", "normal", "high", "normal"];

  let jobsCreated = 0;
  for (let i = 0; i < 24; i++) {
    const customerId = customerIds[i % customerIds.length];
    const techId = techIds[i % techIds.length];
    const daysOffset = Math.floor(i / 4) - 1; // spread across days
    const hour = 8 + (i % 6) * 2;
    const scheduledStart = new Date();
    scheduledStart.setDate(scheduledStart.getDate() + daysOffset);
    scheduledStart.setHours(hour, 0, 0, 0);

    await db.insert(jobs).values({
      orgId,
      customerId,
      assignedToId: techId,
      title: jobTitles[i % jobTitles.length],
      description: `${jobTitles[i % jobTitles.length]} job — full scope as discussed`,
      jobType: ["repair", "install", "maintenance", "inspection"][i % 4],
      status: statuses[i % statuses.length] as any,
      priority: priorities[i % priorities.length] as any,
      scheduledStart,
      estimatedHours: 1 + (i % 4) * 0.5,
      hourlyRate: 125,
      flatRate: i % 3 === 0 ? 150 + i * 25 : null,
      partsCost: i % 4 === 0 ? 45 + i * 8 : 0,
    });
    jobsCreated++;
  }
  console.log(`✓ ${jobsCreated} jobs created`);

  // 7. Create invoices
  let invoicesCreated = 0;
  for (let i = 0; i < 12; i++) {
    const customerId = customerIds[i % customerIds.length];
    const status = ["paid", "paid", "paid", "sent", "overdue", "draft"][i % 6] as any;
    const subtotal = 150 + i * 75;
    const tax = subtotal * 0.0825;
    const total = subtotal + tax;
    const amountPaid = status === "paid" ? total : 0;

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + (i < 6 ? -7 : 7));
    const paidAt = status === "paid" ? new Date() : null;
    const issueDate = new Date();
    issueDate.setDate(issueDate.getDate() - (i < 6 ? 14 : 1));

    await db.insert(invoices).values({
      orgId,
      customerId,
      invoiceNumber: `INV-${1042 + i}`,
      status,
      subtotal,
      taxRate: 0.0825,
      taxAmount: tax,
      total,
      amountPaid,
      issueDate,
      dueDate,
      paidAt,
    });
    invoicesCreated++;
  }
  console.log(`✓ ${invoicesCreated} invoices created`);

  console.log("\n✅ Seed completed!");
  console.log(`\nLogin with: ${DEMO_EMAIL} / ${DEMO_PASSWORD}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});