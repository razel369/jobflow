import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Users,
  DollarSign,
  Wrench,
  Smartphone,
  Zap,
  Shield,
  Check,
  Play,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Product Demo — JobFlow",
  description:
    "See how JobFlow helps HVAC contractors schedule jobs, invoice customers, and get paid 12 days faster.",
};

const FEATURES = [
  {
    icon: Calendar,
    title: "Smart job scheduling",
    body: "Drag-and-drop dispatch. Assign techs based on location, skill, and availability. Customers get SMS reminders automatically.",
  },
  {
    icon: DollarSign,
    title: "HVAC-specific invoicing",
    body: "Pre-built line items for refrigerant, filters, blower motors, capacitors. Send invoices by SMS. Accept ACH & card payments via Stripe.",
  },
  {
    icon: Users,
    title: "Customer & system history",
    body: "Every customer's HVAC system, age, brand, and full service history — searchable in one click.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first for technicians",
    body: "Techs update job status, capture photos, collect signatures, and take payment from their phone.",
  },
  {
    icon: Zap,
    title: "Recurring maintenance contracts",
    body: "Auto-schedule annual tune-ups. Send renewal reminders. Turn one-time jobs into predictable MRR.",
  },
  {
    icon: Shield,
    title: "EPA 608 refrigerant tracking",
    body: "Built-in compliance. Track refrigerant type, quantity, and recovery per job.",
  },
];

const STEPS = [
  {
    n: "1",
    title: "Schedule the job",
    body: "Drag a job to the calendar. JobFlow auto-assigns the closest qualified technician.",
  },
  {
    n: "2",
    title: "Tech completes the work",
    body: "On-site, the tech updates status from their phone, captures photos, and collects the customer's signature.",
  },
  {
    n: "3",
    title: "Invoice is sent automatically",
    body: "Line items are pre-filled from the service catalog. Invoice goes out by SMS + email. Payment link included.",
  },
  {
    n: "4",
    title: "Get paid 12 days faster",
    body: "Customers pay online. Stripe deposits directly into your bank. No more chasing checks.",
  },
];

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center rounded-full border bg-secondary px-3 py-1 text-xs font-semibold mb-6">
            2-minute product demo
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            See JobFlow in action
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
            Four steps from &quot;the customer called&quot; to &quot;we got paid.&quot; No spreadsheets, no paper invoices, no chasing checks.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/signup">
                <Play className="mr-2 h-4 w-4" />
                Start free trial
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/login">Try the demo account</Link>
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Demo login: <code className="rounded bg-muted px-1.5 py-0.5">demo@jobflow.app</code> / <code className="rounded bg-muted px-1.5 py-0.5">password123</code>
          </p>
        </div>
      </section>

      {/* The 4-step flow */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              From phone call to paid invoice
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              How JobFlow handles a typical HVAC service call.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <Card key={step.n} className="relative">
                <CardContent className="p-6">
                  <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                    {step.n}
                  </div>
                  <h3 className="mt-2 font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Built for HVAC, not adapted from generic CRMs
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every feature is opinionated for the way HVAC contractors actually run their day.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title}>
                  <CardContent className="p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{feature.body}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* What you'll see in the dashboard */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              What the dashboard actually shows
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Log in with the demo account to see a real, populated HVAC business.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Jobs today", value: "24" },
              { label: "Customers", value: "10" },
              { label: "Outstanding invoices", value: "$2,760" },
              { label: "Revenue (MTD)", value: "$2,922" },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to run your HVAC business on one platform?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
            14-day free trial. No credit card required. Set up in under 10 minutes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link href="/signup">Start free trial</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm opacity-80">
            <Check className="mr-1 inline h-4 w-4" />
            14-day free trial &middot;
            <Check className="mr-1 ml-2 inline h-4 w-4" />
            No credit card &middot;
            <Check className="mr-1 ml-2 inline h-4 w-4" />
            Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Wrench className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-foreground">JobFlow</span>
          </Link>
          <p className="mt-4">&copy; 2026 JobFlow. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}