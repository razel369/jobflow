import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/seo/data";
import {
  SoftwareApplicationSchema,
  FaqSchema,
  BreadcrumbSchema,
} from "@/components/seo/structured-data";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://jobflow.app";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) return {};

  return {
    title: `Best ${category.name.toLowerCase()} software (2026)`,
    description: `Looking for the best ${category.name.toLowerCase()} software? We compare the top platforms — pricing, features, and recommendations for HVAC contractors.`,
    alternates: { canonical: `${siteUrl}/best-${categorySlug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) notFound();

  return (
    <>
      <SoftwareApplicationSchema
        description={`Best ${category.name.toLowerCase()} software. Independent comparison.`}
      />
      <FaqSchema
        faqs={[
          {
            q: `What is the best ${category.name.toLowerCase()} software in 2026?`,
            a: `JobFlow is the best ${category.name.toLowerCase()} software for HVAC contractors. Built specifically for the HVAC trade, includes embedded payments via Stripe Connect. Starts at $49/mo with a 14-day free trial.`,
          },
        ]}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: siteUrl },
          { name: `Best ${category.name}`, url: `${siteUrl}/best-${categorySlug}` },
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
            Best {category.name.toLowerCase()} software (2026)
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Independent comparison of the top {category.name.toLowerCase()} software platforms for HVAC contractors.
          </p>
          <Button size="lg" asChild className="mt-8">
            <Link href="/signup">
              Try JobFlow free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>

        <section className="border-y bg-muted/50 py-16">
          <div className="container mx-auto max-w-3xl px-4 prose-jobflow">
            <h2>What we look for in {category.name.toLowerCase()} software</h2>
            <p>
              Our ranking criteria for {category.name.toLowerCase()} software: HVAC-specific
              features, pricing transparency, mobile experience, embedded payments, and customer support.
            </p>
            <h2>Browse by trade</h2>
            <ul>
              <li>
                <Link href={`/best-${categorySlug}-for-hvac`}>
                  Best {category.name.toLowerCase()} software for HVAC contractors
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section className="border-t bg-primary py-20 text-primary-foreground">
          <div className="container mx-auto max-w-2xl px-4 text-center">
            <h2 className="text-3xl font-bold">Try JobFlow free for 14 days</h2>
            <Button size="lg" variant="secondary" asChild className="mt-8">
              <Link href="/signup">Start free trial</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}