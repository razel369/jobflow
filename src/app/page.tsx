import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Wrench, Calendar, DollarSign, Users, Smartphone, Zap, Shield } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
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
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
              Blog
            </Link>
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
              Log in
            </Link>
            <Button asChild>
              <Link href="/signup">Start free trial</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6">
            Built for HVAC contractors
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            The job management platform that actually understands HVAC
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Stop juggling spreadsheets, paper invoices, and 5 different apps. JobFlow gives
            HVAC contractors one place to schedule jobs, invoice customers, and get paid faster.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/signup">Start 14-day free trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">Watch 2-minute demo</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required · Cancel anytime
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Everything you need to run your HVAC business
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Built for the way HVAC contractors actually work — not adapted from generic CRMs.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Calendar className="h-6 w-6" />}
              title="Smart job scheduling"
              description="Dispatch technicians based on location, skill, and availability. Customers get automated appointment reminders."
            />
            <FeatureCard
              icon={<DollarSign className="h-6 w-6" />}
              title="HVAC-specific invoicing"
              description="Pre-built line items for refrigerant, filters, blower motors, and more. Accept payments online via Stripe."
            />
            <FeatureCard
              icon={<Users className="h-6 w-6" />}
              title="Customer & system history"
              description="Track every customer's HVAC system, service history, and warranty info in one place."
            />
            <FeatureCard
              icon={<Smartphone className="h-6 w-6" />}
              title="Mobile-first for technicians"
              description="Techs can update job status, capture photos, and collect signatures from their phone."
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Recurring maintenance contracts"
              description="Automatically schedule annual tune-ups and send customers renewal reminders."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Built-in compliance"
              description="EPA Section 608 tracking for refrigerant. State licensing reminders. License-free, worry-free."
            />
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Trusted by HVAC contractors across America
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <TestimonialCard
                quote="Replaced 4 different apps. Saved 10 hours a week."
                author="Mike R."
                role="Owner, Cool Air HVAC"
                city="Phoenix, AZ"
              />
              <TestimonialCard
                quote="Got paid 12 days faster. Worth the subscription alone."
                author="Sarah T."
                role="Dispatcher, All Seasons"
                city="Chicago, IL"
              />
              <TestimonialCard
                quote="Customers love the text reminders. No-shows down 40%."
                author="James L."
                role="Owner, L&L Heating"
                city="Atlanta, GA"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to run your HVAC business on one platform?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
            Start your 14-day free trial. No credit card required. Set up in under 10 minutes.
          </p>
          <Button size="lg" variant="secondary" asChild className="mt-8">
            <Link href="/signup">Get started free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Wrench className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold">JobFlow</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Job management software built for HVAC contractors.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Product</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/changelog">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Resources</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/hvac-resources">HVAC resources</Link></li>
                <li><Link href="/help">Help center</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Company</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/legal/privacy">Privacy</Link></li>
                <li><Link href="/legal/terms">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            © 2026 JobFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="mt-4 font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function TestimonialCard({
  quote,
  author,
  role,
  city,
}: {
  quote: string;
  author: string;
  role: string;
  city: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-lg font-medium">&ldquo;{quote}&rdquo;</p>
        <div className="mt-4 text-sm">
          <div className="font-semibold">{author}</div>
          <div className="text-muted-foreground">{role}</div>
          <div className="text-muted-foreground">{city}</div>
        </div>
      </CardContent>
    </Card>
  );
}