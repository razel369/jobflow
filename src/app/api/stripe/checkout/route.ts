import { NextRequest, NextResponse } from "next/server";
import { stripe, PRICING, type PlanTier } from "@/lib/stripe/client";
import { z } from "zod";

const checkoutSchema = z.object({
  plan: z.enum(["starter", "pro", "business"]),
  interval: z.enum(["monthly", "yearly"]).default("monthly"),
  orgId: z.string().uuid(),
  customerEmail: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe not configured" },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { plan, interval, orgId, customerEmail } = checkoutSchema.parse(body);

    const priceId =
      interval === "yearly"
        ? PRICING[plan as PlanTier].stripePriceIdYearly
        : PRICING[plan as PlanTier].stripePriceIdMonthly;

    if (!priceId) {
      return NextResponse.json(
        { error: `Missing Stripe price ID for ${plan} ${interval}` },
        { status: 500 }
      );
    }

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: customerEmail,
      success_url: `${origin}/dashboard?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?checkout=canceled`,
      metadata: {
        orgId,
        plan,
        interval,
      },
      subscription_data: {
        trial_period_days: 14,
        metadata: { orgId, plan },
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request", details: error.issues }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
