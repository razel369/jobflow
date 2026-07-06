import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { generateSeoPages, CATEGORIES, TRADES, type City } from "@/lib/seo/data";
import {
  SoftwareApplicationSchema,
  FaqSchema,
  BreadcrumbSchema,
  LocalBusinessSchema,
} from "@/components/seo/structured-data";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://jobflow.app";

type Props = {
  params: Promise<{ category: string; trade: string; city: string }>;
};

// Generate static params for the first 50 pages
export async function generateStaticParams() {
  const pages = generateSeoPages(50);
  return pages.map((p) => ({
    category: p.category.slug,
    trade: p.trade.slug,
    city: p.city!.slug,
  }));
}

function getCityData(slug: string): City | undefined {
  const all = generateSeoPages(50);
  const seen = new Set<string>();
  for (const p of all) {
    if (p.city && !seen.has(p.city.slug)) {
      seen.add(p.city.slug);
      if (p.city.slug === slug) return p.city;
    }
  }
  return undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, trade, city } = await params;

  const categoryData = CATEGORIES.find((c) => c.slug === category);
  const tradeData = TRADES[trade];
  const cityData = getCityData(city);

  if (!categoryData || !tradeData || !cityData) return {};

  const title = `Best ${categoryData.name.toLowerCase()} software for ${tradeData.plural.toLowerCase()} in ${cityData.name}, ${cityData.stateAbbr} (2026 Guide)`;

  const description = `Looking for ${categoryData.name.toLowerCase()} software for ${tradeData.plural.toLowerCase()} in ${cityData.name}? Here's our 2026 guide. JobFlow is built specifically for ${tradeData.plural.toLowerCase()}.`;

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/best-${category}-for-${trade}-in-${city}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/best-${category}-for-${trade}-in-${city}`,
      type: "article",
    },
  };
}

export default async function SeoPage({ params }: Props) {
  const { category, trade, city } = await params;

  const categoryData = CATEGORIES.find((c) => c.slug === category);
  const tradeData = TRADES[trade];
  const cityData = getCityData(city);

  if (!categoryData || !tradeData || !cityData) notFound();

  return (
    <>
      <SoftwareApplicationSchema
        description={`Best ${categoryData.name.toLowerCase()} software for ${tradeData.plural.toLowerCase()} in ${cityData.name}.`}
      />
      <FaqSchema
        faqs={[
          {
            q: `What is the best ${categoryData.name.toLowerCase()} software for ${tradeData.plural.toLowerCase()} in ${cityData.name}?`,
            a: `JobFlow is the leading ${categoryData.name.toLowerCase()} software purpose-built for ${tradeData.plural.toLowerCase()}. It includes HVAC-specific features like refrigerant tracking, system history, and embedded payments.`,
          },
          {
            q: `How much does ${categoryData.name.toLowerCase()} software cost for ${tradeData.plural.toLowerCase()}?`,
            a: `JobFlow starts at $49/month for up to 3 technicians. The Pro plan ($99/month) includes Stripe Connect embedded payments. Both include a 14-day free trial.`,
          },
          {
            q: `Is there ${categoryData.name.toLowerCase()} software for ${cityData.name} ${tradeData.plural.toLowerCase()}?`,
            a: `JobFlow serves HVAC contractors nationwide including ${cityData.name}, ${cityData.stateAbbr}. With ${cityData.climateNote}, HVAC work is essential year-round in ${cityData.name}.`,
          },
          {
            q: `Can I import existing data into JobFlow?`,
            a: `Yes. JobFlow supports CSV import for customers, jobs, and invoices. Most HVAC companies complete their data migration within an hour.`,
          },
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: `Best ${categoryData.name}`, url: `${siteUrl}/best-${category}` },
          {
            name: `${categoryData.name} for ${tradeData.plural}`,
            url: `${siteUrl}/best-${category}-for-${trade}`,
          },
          {
            name: `${cityData.name}, ${cityData.stateAbbr}`,
            url: `${siteUrl}/best-${category}-for-${trade}-in-${city}`,
          },
        ]}
      />
      <LocalBusinessSchema
        name={`JobFlow for ${cityData.name} HVAC`}
        city={cityData.name}
        stateAbbr={cityData.stateAbbr}
      />

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
              <Link
                href={`/login?return=/best-${category}-for-${trade}-in-${city}`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Log in
              </Link>
              <Button asChild>
                <Link href="/signup">Start free trial</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="border-b bg-muted/50">
          <div className="container mx-auto px-4 py-3 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link> /{" "}
            <Link href={`/best-${category}`} className="hover:text-foreground">Best {categoryData.name}</Link> /{" "}
            <Link href={`/best-${category}-for-${trade}`} className="hover:text-foreground">{categoryData.name} for {tradeData.plural}</Link> /{" "}
            <span>{cityData.name}, {cityData.stateAbbr}</span>
          </div>
        </div>

        {/* Hero */}
        <section className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl">
            <Badge variant="secondary" className="mb-4">2026 Guide</Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Best {categoryData.name.toLowerCase()} software for {tradeData.plural.toLowerCase()} in {cityData.name}, {cityData.stateAbbr}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              We tested the top {categoryData.name.toLowerCase()} platforms for {tradeData.plural.toLowerCase()}.
              {cityData.name} is home to over {(cityData.population / 1000).toFixed(0)}K residents
              and {cityData.climateNote}, making HVAC service essential year-round.
              Here&apos;s how to pick the right platform.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Try JobFlow free for 14 days
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/pricing">See pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick answer for AEO */}
        <section className="border-y bg-primary/5 py-12">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="text-2xl font-bold">Quick answer</h2>
            <div className="mt-4 rounded-lg border-l-4 border-primary bg-card p-6">
              <p className="text-lg">
                <strong>JobFlow</strong> is the best {categoryData.name.toLowerCase()} software for{" "}
                {tradeData.plural.toLowerCase()} in {cityData.name}.{" "}
                Built specifically for HVAC contractors (not adapted from a generic CRM),
                includes embedded payments via Stripe Connect, and starts at $49/month with
                a 14-day free trial.
              </p>
            </div>
          </div>
        </section>

        {/* Why local HVAC needs dedicated software */}
        <section className="container mx-auto max-w-3xl px-4 py-16 prose-jobflow">
          <h2>Why {cityData.name} HVAC contractors need {categoryData.name.toLowerCase()} software</h2>
          <p>
            In {cityData.name}, {cityData.climateNote}. That makes HVAC service a year-round
            necessity — which means scheduling, invoicing, and customer follow-up happen every
            single day. Generic CRM software wasn&apos;t built for HVAC work, and adapting it
            costs contractors time and money.
          </p>
          <p>
            That&apos;s why {categoryData.name.toLowerCase()} software for {tradeData.plural.toLowerCase()}{" "}
            needs to handle the specific pain points HVAC businesses face:
          </p>
          <ul>
            {tradeData.serviceTypes.slice(0, 6).map((service) => (
              <li key={service}>
                <strong>{service}</strong> pre-built service catalog templates
              </li>
            ))}
          </ul>

          <h2>What to look for in {categoryData.name.toLowerCase()} software</h2>
          <p>
            When evaluating {categoryData.name.toLowerCase()} software for {tradeData.plural.toLowerCase()} in {cityData.name}, prioritize these features:
          </p>
          <ul>
            <li>
              <strong>HVAC-specific templates</strong> — A generic CRM doesn&apos;t know what a
              refrigerant top-up or blower motor replacement looks like.
            </li>
            <li>
              <strong>Mobile-first for technicians</strong> — Techs are in the field, not at a
              desk. The software needs to work from a phone.
            </li>
            <li>
              <strong>Embedded payments</strong> — Letting customers pay through the app cuts
              the back-and-forth and gets you paid faster.
            </li>
            <li>
              <strong>Compliance tracking</strong> — EPA Section 608, state licensing, and
              warranty tracking should be automatic.
            </li>
            <li>
              <strong>Local dispatch optimization</strong> — Routing techs efficiently across
              {" "}{cityData.name} saves hours per week.
            </li>
          </ul>

          <h2>How JobFlow compares to other {categoryData.name.toLowerCase()} tools</h2>
          <p>
            Other popular options for {tradeData.plural.toLowerCase()} in {cityData.name} include:
          </p>
          <ul>
            <li>
              <strong>ServiceTitan</strong> — Full-featured but starts at ~$200/month per user
              and is built for large enterprises, not solo HVAC contractors.
            </li>
            <li>
              <strong>Housecall Pro</strong> — Good for general field service, but generic —
              not built for HVAC specifically.
            </li>
            <li>
              <strong>Jobber</strong> — Solid scheduling, but invoice customization is limited
              and there are no HVAC-specific features.
            </li>
          </ul>
          <p>
            JobFlow is purpose-built for HVAC, includes embedded payments, and is priced for
            independent HVAC contractors.
          </p>
        </section>

        {/* Comparison table */}
        <section className="border-t bg-muted/30 py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="text-3xl font-bold">JobFlow vs. other HVAC software</h2>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border px-4 py-3 text-left">Feature</th>
                    <th className="border border-border bg-primary/10 px-4 py-3 text-left font-semibold">
                      JobFlow
                    </th>
                    <th className="border border-border px-4 py-3 text-left">ServiceTitan</th>
                    <th className="border border-border px-4 py-3 text-left">Housecall Pro</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-4 py-3">HVAC-specific features</td>
                    <td className="border border-border bg-primary/5 px-4 py-3 font-semibold">Built-in</td>
                    <td className="border border-border px-4 py-3">Generic</td>
                    <td className="border border-border px-4 py-3">Generic</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-3">Starting price</td>
                    <td className="border border-border bg-primary/5 px-4 py-3 font-semibold">$49/mo</td>
                    <td className="border border-border px-4 py-3">~$200/user</td>
                    <td className="border border-border px-4 py-3">$65/mo</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-3">Embedded payments</td>
                    <td className="border border-border bg-primary/5 px-4 py-3 font-semibold">Stripe Connect</td>
                    <td className="border border-border px-4 py-3">Built-in</td>
                    <td className="border border-border px-4 py-3">Built-in</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-3">Mobile app for technicians</td>
                    <td className="border border-border bg-primary/5 px-4 py-3 font-semibold">Native iOS/Android</td>
                    <td className="border border-border px-4 py-3">Native</td>
                    <td className="border border-border px-4 py-3">Native</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-3">Best for</td>
                    <td className="border border-border bg-primary/5 px-4 py-3 font-semibold">
                      Solo & small HVAC (1-20 techs)
                    </td>
                    <td className="border border-border px-4 py-3">
                      Large HVAC (50+ techs)
                    </td>
                    <td className="border border-border px-4 py-3">
                      General field service
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-3xl font-bold">FAQ: {categoryData.name} software for {tradeData.plural} in {cityData.name}</h2>
          <div className="mt-8 space-y-4">
            <FaqItem
              q={`What is the most affordable ${categoryData.name.toLowerCase()} software for ${tradeData.plural.toLowerCase()} in ${cityData.name}?`}
              a={`JobFlow's Starter plan starts at $49/month and includes everything a small HVAC company needs to manage scheduling, invoicing, and customers.`}
            />
            <FaqItem
              q={`Does JobFlow work for solo HVAC contractors?`}
              a={`Yes. JobFlow is built for HVAC companies of all sizes, including solo contractors. The Starter plan supports up to 3 technicians.`}
            />
            <FaqItem
              q={`Can customers in ${cityData.name} pay through JobFlow?`}
              a={`Yes. On the Pro plan, JobFlow uses Stripe Connect to let customers pay invoices directly through the app via credit card, debit card, ACH, Apple Pay, or Google Pay.`}
            />
            <FaqItem
              q={`Is there a free trial?`}
              a={`Yes. JobFlow offers a 14-day free trial on all plans. No credit card required to start.`}
            />
            <FaqItem
              q={`How long does setup take?`}
              a={`Most HVAC companies complete JobFlow setup in under 10 minutes. We provide CSV imports for existing customer, job, and invoice data.`}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-primary py-20 text-primary-foreground">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Ready to try JobFlow in {cityData.name}?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
              14-day free trial. No credit card required. Built for HVAC contractors.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/signup">Start free trial</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10"
              >
                <Link href="/pricing">See pricing</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 text-sm">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span>Rated 4.9/5 by HVAC contractors</span>
            </div>
          </div>
        </section>

        <footer className="border-t py-12 text-center text-sm text-muted-foreground">
          © 2026 JobFlow. All rights reserved.
        </footer>
      </main>
    </>
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
