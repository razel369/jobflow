import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// Lazy-initialize Stripe client only when the key is available.
// This prevents build-time errors when the key isn't set yet.
export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
      appInfo: {
        name: "JobFlow",
        version: "0.1.0",
      },
    })
  : null;

if (!stripe) {
  console.warn(
    "STRIPE_SECRET_KEY is not set. Stripe operations will fail until you add it to .env.local."
  );
}

// ============================================================================
// PRICING
// ============================================================================

export const PRICING = {
  starter: {
    name: "Starter",
    priceMonthly: 4900, // $49
    priceYearly: 49000, // $490
    stripePriceIdMonthly: process.env.STRIPE_PRICE_STARTER_MONTHLY!,
    stripePriceIdYearly: process.env.STRIPE_PRICE_STARTER_YEARLY!,
    features: [
      "Up to 3 technicians",
      "Unlimited jobs & invoices",
      "Customer management",
      "Email support",
      "Mobile app",
    ],
  },
  pro: {
    name: "Pro",
    priceMonthly: 9900, // $99
    priceYearly: 99000, // $990
    stripePriceIdMonthly: process.env.STRIPE_PRICE_PRO_MONTHLY!,
    stripePriceIdYearly: process.env.STRIPE_PRICE_PRO_YEARLY!,
    features: [
      "Up to 10 technicians",
      "Everything in Starter",
      "Stripe Connect (embedded payments)",
      "Custom branding",
      "Priority support",
      "Advanced reporting",
    ],
  },
  business: {
    name: "Business",
    priceMonthly: 19900, // $199
    priceYearly: 199000, // $1990
    stripePriceIdMonthly: process.env.STRIPE_PRICE_BUSINESS_MONTHLY!,
    stripePriceIdYearly: process.env.STRIPE_PRICE_BUSINESS_YEARLY!,
    features: [
      "Unlimited technicians",
      "Everything in Pro",
      "Multi-location",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
    ],
  },
} as const;

export type PlanTier = keyof typeof PRICING;