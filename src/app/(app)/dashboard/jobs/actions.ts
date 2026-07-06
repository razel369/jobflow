"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { jobs, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth/session";

const jobSchema = z.object({
  customerId: z.string().min(1),
  title: z.string().min(1),
  jobType: z.enum(["repair", "install", "maintenance", "inspection"]),
  priority: z.enum(["low", "normal", "high", "emergency"]),
  scheduledStart: z.string(),
  estimatedHours: z.coerce.number().min(0),
  hourlyRate: z.coerce.number().min(0),
  description: z.string().optional(),
});

export async function createJob(formData: FormData) {
  const result = await getCurrentUser();
  if (!result) redirect("/login");

  const raw = Object.fromEntries(formData);
  const parsed = jobSchema.safeParse(raw);

  if (!parsed.success) {
    redirect("/dashboard/jobs/new?error=invalid");
  }

  const data = parsed.data;
  const orgId = result.org.id;

  const [job] = await db
    .insert(jobs)
    .values({
      orgId,
      customerId: data.customerId,
      title: data.title,
      jobType: data.jobType,
      priority: data.priority,
      scheduledStart: new Date(data.scheduledStart),
      estimatedHours: data.estimatedHours,
      hourlyRate: data.hourlyRate,
      description: data.description,
      status: "scheduled",
    })
    .returning();

  revalidatePath("/dashboard/jobs");
  redirect(`/dashboard/jobs/${job.id}`);
}