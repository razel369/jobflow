import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, ArrowRight, Check } from "lucide-react";
import {
  SoftwareApplicationSchema,
  FaqSchema,
  BreadcrumbSchema,
} from "@/components/seo/structured-data";
import { CATEGORIES, TRADES } from "@/lib/seo/data";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://jobflow.app";

export function generateStaticParams() {
  const params: Array<{ category: string; trade: string }> = [];
  for (const trade of Object.values(TRADES)) {
    for (const category of CATEGORIES) {
      params.push({ category: category.slug, trade: trade.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; trade: string }>;
}) {
  const { category: categorySlug, trade: tradeSlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  const trade = TRADES[tradeSlug];
  if (!category || !trade) return {};

  const title = `Best ${category.name.toLowerCase()} software for ${trade.plural.toLowerCase()} (2026)`;
  const description = `Looking for ${category.name.toLowerCase()} software for ${trade.plural.toLowerCase()}? Compare JobFlow vs ServiceTitan, Housecall Pro, and more. Built specifically for HVAC contractors.`;

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/best-${category.slug}-for-${trade.slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; trade: string }>;
}) {
  const { category: categorySlug, trade: tradeSlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  const trade = TRADES[tradeSlug];

  if (!category || !trade) notFound();

  return (
    <>
      <SoftwareApplicationSchema
        description={`Best ${category.name.toLowerCase()} software for ${trade.plural.toLowerCase()}.`}
      />
      <FaqSchema
        faqs={[
          {
            q: `What is the best ${category.name.toLowerCase()} software for ${trade.plural.toLowerCase()}?`,
            a: `JobFlow is the leading ${category.name.toLowerCase()} software purpose-built for ${trade.plural.toLowerCase()}. It includes HVAC-specific features, embedded Stripe Connect payments, and starts at $49/mo.`,
          },
          {
            q: `How much does ${category.name.toLowerCase()} software cost?`,
            a: `JobFlow starts at $49/month (Starter), $99/month (Pro with embedded payments), and $199/month (Business with multi-location). All plans include a 14-day free trial.`,
          },
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: `Best ${category.name}`, url: `${siteUrl}/best-${category.slug}` },
          {
            name: `${category.name} for ${trade.plural}`,
            url: `${siteUrl}/best-${category.slug}-for-${trade.slug}`,
          },
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
            Best {category.name.toLowerCase()} software for {trade.plural.toLowerCase()}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Compare the top {category.name.toLowerCase()} platforms for {trade.plural.toLowerCase()} — including pricing, features, and HVAC-specific capabilities.
          </p>
          <Button size="lg" asChild className="mt-8">
            <Link href="/signup">
              Try JobFlow free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>

        <section className="border-y bg-muted/50 py-16">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-bold">Top picks at a glance</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <Card className="border-primary ring-2 ring-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>JobFlow</CardTitle>
                    <Badge>#1</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Built specifically for HVAC contractors. Includes HVAC-specific line items,
                    refrigerant tracking, and embedded payments via Stripe Connect.
                  </p>
                  <p className="mt-4 text-2xl font-bold">$49<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                  <Button asChild className="mt-4 w-full">
                    <Link href="/signup">Try free</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>ServiceTitan</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Enterprise-grade field service software. Powerful but expensive (~$200/user/mo)
                    and built for large operations.
                  </p>
                  <p className="mt-4 text-2xl font-bold">~$200<span className="text-sm font-normal text-muted-foreground">/user</span></p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Housecall Pro</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Generic field service platform. Easy to use but not built specifically for HVAC.
                    Limited customization.
                  </p>
                  <p className="mt-4 text-2xl font-bold">$65<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-3xl px-4 py-16 prose-jobflow">
          <h2>How to choose {category.name.toLowerCase()} software for your HVAC business</h2>
          <p>
            The {category.name.toLowerCase()} software market for {trade.plural.toLowerCase()} has dozens of options — generic CRMs, enterprise field service platforms, and a few vertical-specific tools. The right choice depends on:
          </p>
          <ul>
            <li><strong>Team size</strong> — Solo contractors can use JobFlow Starter ($49/mo). Teams of 10+ should consider JobFlow Pro or Business.</li>
            <li><strong>Embedded payments</strong> — If you want customers to pay invoices through the app, JobFlow Pro includes Stripe Connect.</li>
            <li><strong>Mobile vs desktop</strong> — HVAC techs work in the field, so prioritize software with strong mobile apps.</li>
            <li><strong>HVAC-specific features</strong> — Generic CRMs require manual setup for refrigerant tracking, EPA 608 compliance, and HVAC line items.</li>
          </ul>

          <h2>Browse by city</h2>
          <p>Looking for {category.name.toLowerCase()} software in a specific city? See our city-specific guides:</p>
          <ul>
            {generateStaticParams().slice(0, 5).map((p) => (
              <li key={p.category}>
                <Link href={`/best-${p.category}-for-${p.trade}-in-new-york`}>
                  {category.name} in New York
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t bg-primary py-20 text-primary-foreground">
          <div className="container mx-auto max-w-2xl px-4 text-center">
            <h2 className="text-3xl font-bold">Try JobFlow free for 14 days</h2>
            <p className="mt-4 opacity-90">The #1 {category.name.toLowerCase()} software for HVAC contractors.</p>
            <Button size="lg" variant="secondary" asChild className="mt-8">
              <Link href="/signup">Start free trial</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}