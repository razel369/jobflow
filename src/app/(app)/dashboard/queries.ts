import { db } from "@/lib/db";
import { jobs, customers, invoices } from "@/lib/db/schema";
import { eq, and, gte, sql, desc } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth/session";

/**
 * Get the authenticated user's dashboard summary.
 */
export async function getDashboardStats() {
  const session = await getCurrentUser();
  if (!session) {
    return {
      jobsToday: 0,
      customers: 0,
      newCustomersThisWeek: 0,
      outstandingInvoices: 0,
      outstandingAmount: 0,
      revenueMtd: 0,
      upcomingJobs: [],
      recentActivity: [],
    };
  }

  const orgId = session.org.id;
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);
  const startOfWeek = new Date(startOfDay);
  startOfWeek.setDate(startOfWeek.getDate() - 7);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  try {
    const todayJobs = await db
      .select({ count: sql<number>`count(*)` })
      .from(jobs)
      .where(
        and(
          eq(jobs.orgId, orgId),
          gte(jobs.scheduledStart, startOfDay)
        )
      );

    const totalCustomers = await db
      .select({ count: sql<number>`count(*)` })
      .from(customers)
      .where(eq(customers.orgId, orgId));

    const newCustomers = await db
      .select({ count: sql<number>`count(*)` })
      .from(customers)
      .where(
        and(
          eq(customers.orgId, orgId),
          gte(customers.createdAt, startOfWeek)
        )
      );

    const outstandingInvoices = await db
      .select({
        count: sql<number>`count(*)`,
        total: sql<number>`COALESCE(SUM(total - amount_paid), 0)`,
      })
      .from(invoices)
      .where(
        and(
          eq(invoices.orgId, orgId),
          sql`${invoices.status} IN ('sent', 'overdue', 'viewed')`
        )
      );

    const paidMtd = await db
      .select({ total: sql<number>`COALESCE(SUM(total), 0)` })
      .from(invoices)
      .where(
        and(
          eq(invoices.orgId, orgId),
          eq(invoices.status, "paid"),
          gte(invoices.paidAt, startOfMonth)
        )
      );

    const upcoming = await db
      .select({
        id: jobs.id,
        title: jobs.title,
        scheduledStart: jobs.scheduledStart,
        status: jobs.status,
      })
      .from(jobs)
      .where(
        and(
          eq(jobs.orgId, orgId),
          gte(jobs.scheduledStart, now),
          sql`${jobs.status} IN ('scheduled', 'en_route')`
        )
      )
      .orderBy(jobs.scheduledStart)
      .limit(5);

    return {
      jobsToday: Number(todayJobs[0]?.count ?? 0),
      customers: Number(totalCustomers[0]?.count ?? 0),
      newCustomersThisWeek: Number(newCustomers[0]?.count ?? 0),
      outstandingInvoices: Number(outstandingInvoices[0]?.count ?? 0),
      outstandingAmount: Number(outstandingInvoices[0]?.total ?? 0),
      revenueMtd: Number(paidMtd[0]?.total ?? 0),
      upcomingJobs: upcoming.map((j) => ({
        id: j.id,
        title: j.title,
        customerName: "Customer", // simplified for the demo
        scheduledStart: j.scheduledStart.toISOString(),
        status: j.status,
      })),
      recentActivity: [
        {
          id: "1",
          description: `Welcome to JobFlow, ${session.org.name}!`,
          createdAt: new Date().toISOString(),
        },
      ],
    };
  } catch (err) {
    console.error("Dashboard query error:", err);
    return {
      jobsToday: 0,
      customers: 0,
      newCustomersThisWeek: 0,
      outstandingInvoices: 0,
      outstandingAmount: 0,
      revenueMtd: 0,
      upcomingJobs: [],
      recentActivity: [],
    };
  }
}