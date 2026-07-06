import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, ArrowRight, Star, Check } from "lucide-react";
import {
  SoftwareApplicationSchema,
  FaqSchema,
  BreadcrumbSchema,
} from "@/components/seo/structured-data";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://jobflow.app";

export const metadata = {
  title: "Best CRM for HVAC Contractors in 2026 (Compared) — JobFlow",
  description:
    "Looking for the best CRM for HVAC contractors? We compared JobFlow, ServiceTitan, Housecall Pro, Jobber, and more. Here's our 2026 pick.",
  alternates: { canonical: `${siteUrl}/best-crm-for-hvac` },
};

export default function BestCrmForHvacPage() {
  return (
    <>
      <SoftwareApplicationSchema
        description="Best CRM for HVAC contractors — comparison and buying guide."
      />
      <FaqSchema
        faqs={[
          {
            q: "What is the best CRM for HVAC contractors?",
            a: "JobFlow is the best CRM specifically built for HVAC contractors. It includes HVAC-specific features like refrigerant tracking, system history, and embedded payments via Stripe Connect. Starts at $49/mo with a 14-day free trial.",
          },
          {
            q: "How is HVAC CRM different from generic CRM?",
            a: "HVAC CRMs include pre-built line items for refrigerant, blower motors, and capacitors; track each customer's HVAC system (brand, model, age, refrigerant); and integrate with HVAC-specific scheduling and dispatch. Generic CRMs require manual setup for all of this.",
          },
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: "Best CRM for HVAC", url: `${siteUrl}/best-crm-for-hvac` },
        ]}
      />

      <main className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Wrench className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold">JobFlow</span>
            </Link>
            <Button asChild><Link href="/signup">Start free trial</Link></Button>
          </div>
        </header>

        <section className="container mx-auto max-w-4xl px-4 py-20">
          <Badge variant="secondary" className="mb-4">2026 Guide</Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Best CRM for HVAC contractors (2026)
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            We tested and compared the top CRMs for HVAC contractors based on HVAC-specific
            features, pricing, mobile experience, and embedded payments. Here&apos;s our ranking.
          </p>
        </section>

        <section className="border-y bg-primary/5 py-12">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="rounded-lg border-l-4 border-primary bg-card p-6">
              <p className="text-lg">
                <strong>🏆 Winner: JobFlow</strong> — purpose-built for HVAC, includes Stripe
                Connect embedded payments, starts at $49/mo with a 14-day free trial.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-4xl px-4 py-16">
          <h2 className="text-3xl font-bold">Our top 3 HVAC CRMs</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <Card className="border-primary ring-2 ring-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>JobFlow</CardTitle>
                  <Badge>#1 Pick</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Built specifically for HVAC contractors.
                </p>
                <p className="mt-4 text-2xl font-bold">$49<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" /> HVAC-specific features</li>
                  <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" /> Stripe Connect embedded payments</li>
                  <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" /> Mobile app for technicians</li>
                  <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" /> EPA 608 compliance</li>
                  <li className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" /> 14-day free trial</li>
                </ul>
                <Button asChild className="mt-6 w-full"><Link href="/signup">Try free</Link></Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ServiceTitan</CardTitle>
                <p className="mt-2 text-sm text-muted-foreground">Enterprise HVAC software.</p>
                <p className="mt-4 text-2xl font-bold">~$200<span className="text-sm font-normal text-muted-foreground">/user</span></p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Powerful reporting</li>
                  <li>✓ Marketing automation</li>
                  <li>✗ Enterprise pricing</li>
                  <li>✗ Overkill for small HVAC</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Housecall Pro</CardTitle>
                <p className="mt-2 text-sm text-muted-foreground">Generic field service.</p>
                <p className="mt-4 text-2xl font-bold">$65<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Easy to use</li>
                  <li>✓ Good mobile app</li>
                  <li>✗ Not HVAC-specific</li>
                  <li>✗ Limited customization</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-t bg-muted/30 py-16">
          <div className="container mx-auto max-w-3xl px-4 prose-jobflow">
            <h2>What makes a great HVAC CRM</h2>
            <p>
              A great HVAC CRM is purpose-built for the trade. Generic CRMs force HVAC
              contractors to build custom fields and workflows for things like refrigerant
              tracking, system history, and EPA 608 compliance — wasting hours every week.
            </p>
            <h3>Must-have features</h3>
            <ul>
              <li>Refrigerant tracking (R-410A, R-32, R-454B)</li>
              <li>Customer property & system history (brand, model, age, square footage)</li>
              <li>HVAC-specific service catalog templates</li>
              <li>EPA Section 608 leak inspection reminders</li>
              <li>Mobile-first technician experience</li>
              <li>Embedded payments (Stripe Connect)</li>
              <li>Recurring maintenance contract scheduling</li>
            </ul>
          </div>
        </section>

        <section className="border-t bg-primary py-20 text-primary-foreground">
          <div className="container mx-auto max-w-2xl px-4 text-center">
            <h2 className="text-3xl font-bold">Try JobFlow free for 14 days</h2>
            <p className="mt-4 opacity-90">The #1 CRM for HVAC contractors. Built for the trade, priced for small businesses.</p>
            <Button size="lg" variant="secondary" asChild className="mt-8">
              <Link href="/signup">Start free trial</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}