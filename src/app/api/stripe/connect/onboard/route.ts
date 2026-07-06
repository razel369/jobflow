/**
 * Stripe Connect onboarding for HVAC contractors — required to enable embedded payments.
 * Creates or retrieves a Connect Express account for the organization.
 */
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import { db } from "@/lib/db";
import { organizations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe not configured" },
        { status: 503 }
      );
    }

    const { orgId } = await req.json();

    if (!orgId) {
      return NextResponse.json({ error: "Missing orgId" }, { status: 400 });
    }

    const [org] = await db
      .select()
      .from(organizations)
      .where(eq(organizations.id, orgId))
      .limit(1);

    if (!org) {
      return NextResponse.json({ error: "Org not found" }, { status: 404 });
    }

    let connectAccountId = org.stripeConnectAccountId;

    if (!connectAccountId) {
      const account = await stripe.accounts.create({
        type: "express",
        country: "US",
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        business_type: "individual",
        metadata: { orgId: org.id },
      });
      connectAccountId = account.id;

      await db
        .update(organizations)
        .set({
          stripeConnectAccountId: connectAccountId,
          updatedAt: new Date(),
        })
        .where(eq(organizations.id, orgId));
    }

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const accountLink = await stripe.accountLinks.create({
      account: connectAccountId,
      refresh_url: `${origin}/dashboard/payments?stripe_refresh=true`,
      return_url: `${origin}/dashboard/payments?stripe_return=true`,
      type: "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (err) {
    console.error("Stripe Connect onboard error:", err);
    return NextResponse.json(
      { error: "Failed to create connect account" },
      { status: 500 }
    );
  }
}
