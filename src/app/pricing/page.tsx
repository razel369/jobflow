import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Wrench } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Pricing — JobFlow",
  description:
    "Simple, transparent pricing for HVAC contractors. Start free. No credit card required.",
};

const PLANS = [
  {
    name: "Starter",
    price: "$49",
    period: "per month",
    description: "For solo HVAC techs and small teams just getting organized.",
    features: [
      "Up to 3 technicians",
      "Unlimited jobs & invoices",
      "Customer management",
      "Mobile app for iOS & Android",
      "Email support",
      "SSL & daily backups",
    ],
    cta: "Start free trial",
    href: "/signup?plan=starter",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$99",
    period: "per month",
    description: "For growing HVAC businesses that need embedded payments.",
    features: [
      "Up to 10 technicians",
      "Everything in Starter",
      "Stripe Connect (embedded payments)",
      "Customers pay you through JobFlow",
      "0.5% transaction fee on payments",
      "Custom branding on invoices",
      "Priority support",
      "Advanced reporting",
    ],
    cta: "Start free trial",
    href: "/signup?plan=pro",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$199",
    period: "per month",
    description: "For multi-location HVAC companies and franchises.",
    features: [
      "Unlimited technicians",
      "Everything in Pro",
      "Multi-location support",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "SSO & audit logs",
      "Custom contracts available",
    ],
    cta: "Start free trial",
    href: "/signup?plan=business",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wrench className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold">JobFlow</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
              Log in
            </Link>
            <Button asChild>
              <Link href="/signup">Start free trial</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            No hidden fees. Cancel anytime. 14-day free trial on every plan.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={
                plan.highlighted
                  ? "border-primary shadow-lg ring-2 ring-primary/20"
                  : ""
              }
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.highlighted && <Badge>Most popular</Badge>}
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">/{plan.period.split(" ")[1]}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-6 w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  asChild
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t bg-muted/50 py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold tracking-tight">Frequently asked questions</h2>
          <div className="mt-8 space-y-6">
            <FaqItem
              q="Is there a free trial?"
              a="Yes. Every plan comes with a 14-day free trial. No credit card required to start."
            />
            <FaqItem
              q="What payment methods do my customers have?"
              a="Through Stripe, your customers can pay with credit card, debit card, ACH, Apple Pay, Google Pay, and Cash App Pay."
            />
            <FaqItem
              q="How does the embedded payment fee work?"
              a="On the Pro and Business plans, customers can pay invoices directly through JobFlow via Stripe Connect. We charge a 0.5% platform fee on top of Stripe's standard 2.9% + $0.30."
            />
            <FaqItem
              q="Can I import my existing customer data?"
              a="Yes. We support CSV imports for customers, jobs, and invoices. Most HVAC companies have everything migrated within an hour."
            />
            <FaqItem
              q="Do you offer annual billing?"
              a="Yes. Annual billing is available at 2 months free (effectively 17% off)."
            />
            <FaqItem
              q="What if I need to cancel?"
              a="Cancel anytime from your account settings. You'll keep access until the end of your billing period, and your data is exportable as CSV at any time."
            />
          </div>
        </div>
      </section>

      <footer className="border-t py-12 text-center text-sm text-muted-foreground">
        © 2026 JobFlow. All rights reserved.
      </footer>
    </main>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="font-semibold">{q}</h3>
      <p className="mt-2 text-muted-foreground">{a}</p>
    </div>
  );
}