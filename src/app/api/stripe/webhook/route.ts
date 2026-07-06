import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import { db } from "@/lib/db";
import { organizations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orgId = session.metadata?.orgId;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;

        if (orgId) {
          await db
            .update(organizations)
            .set({
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
              updatedAt: new Date(),
            })
            .where(eq(organizations.id, orgId));
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const orgId = subscription.metadata?.orgId;
        const status = subscription.status;
        const trialEnd = subscription.trial_end
          ? new Date(subscription.trial_end * 1000)
          : null;

        if (orgId) {
          await db
            .update(organizations)
            .set({
              subscriptionStatus: status as any,
              trialEndsAt: trialEnd,
              updatedAt: new Date(),
            })
            .where(eq(organizations.id, orgId));
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const orgId = subscription.metadata?.orgId;

        if (orgId) {
          await db
            .update(organizations)
            .set({
              subscriptionStatus: "canceled",
              updatedAt: new Date(),
            })
            .where(eq(organizations.id, orgId));
        }
        break;
      }

      case "invoice.payment_succeeded": {
        // Record successful payments, update customer's invoice status
        const invoice = event.data.object as Stripe.Invoice;
        console.log("Payment succeeded:", invoice.id);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("Payment failed:", invoice.id);
        // Send dunning email
        break;
      }

      default:
        // Ignore other event types
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
