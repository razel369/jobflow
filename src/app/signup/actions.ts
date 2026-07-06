"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { organizations, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createSessionForUser,
  hashPassword,
} from "@/lib/auth/session";

const signupSchema = z.object({
  companyName: z.string().min(1),
  fullName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

export async function signupAction(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const parsed = signupSchema.safeParse(raw);

  if (!parsed.success) {
    redirect("/signup?error=invalid");
  }

  const { companyName, fullName, email, password } = parsed.data;

  const [existing] = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase()))
    .limit(1);

  if (existing) {
    redirect("/signup?error=email_taken");
  }

  const passwordHash = await hashPassword(password);

  // Create org + owner user atomically
  const baseSlug = slugify(companyName) || "company";
  const slug = `${baseSlug}-${Math.random().toString(36).slice(2, 7)}`;

  const [org] = await db
    .insert(organizations)
    .values({
      name: companyName,
      slug,
      trade: "hvac",
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    })
    .returning();

  const [user] = await db
    .insert(users)
    .values({
      orgId: org.id,
      email: email.toLowerCase(),
      passwordHash,
      fullName,
      role: "owner",
    })
    .returning();

  await createSessionForUser(user.id);

  revalidatePath("/", "layout");
  redirect("/dashboard");
}