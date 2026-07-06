import { notFound } from "next/navigation";
import Link from "next/link";
import { Wrench, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArticleSchema } from "@/components/seo/structured-data";

const POSTS: Record<string, any> = {
  "hvac-business-software-essentials": {
    title: "The 7 essentials of HVAC business software in 2026",
    description:
      "What every HVAC contractor needs in their tech stack — from CRM to embedded payments.",
    date: "2026-07-01",
    author: "JobFlow Team",
    content: `
      <p>Running an HVAC business in 2026 means juggling service calls, customer relationships,
      technician schedules, refrigerant inventory, and getting paid on time. The HVAC contractors who
      thrive don't work harder — they have the right software stack.</p>
      <p>Here's what every HVAC company needs from their tech stack:</p>
      <h2>1. HVAC-specific CRM</h2>
      <p>A generic CRM doesn't know what refrigerant is. You need software that tracks each customer's
      HVAC system by brand, model, age, refrigerant type, and filter size — so the next time you visit,
      you arrive with the right parts.</p>
      <h2>2. Job scheduling with technician dispatch</h2>
      <p>HVAC work happens in the field, not at a desk. Your scheduling software needs to dispatch
      technicians based on skill, location, and availability — and let customers see their appointment
      window in real time.</p>
      <h2>3. Mobile app for technicians</h2>
      <p>Techs need to update job status, capture before/after photos, collect signatures, and record
      parts used — from their phone. A desktop-only tool doesn't cut it.</p>
      <h2>4. HVAC-specific invoicing</h2>
      <p>Pre-built line items for refrigerant top-ups, blower motor replacements, capacitor swaps, and
      full system installations. One-click invoice generation from a completed job. Online payment
      links so customers can pay from their phone.</p>
      <h2>5. Embedded payments (Stripe Connect)</h2>
      <p>Customers paying through your software = getting paid 12 days faster on average. Stripe Connect
      lets you accept credit card, ACH, Apple Pay, and Google Pay — with the funds landing in your
      bank in 1-2 business days.</p>
      <h2>6. Compliance tracking</h2>
      <p>EPA Section 608 leak inspection reminders. Refrigerant purchase tracking. State license
      expiration alerts. Compliance should be automatic, not manual.</p>
      <h2>7. Recurring maintenance contracts</h2>
      <p>Annual tune-ups are the foundation of HVAC business compounding. Your software should
      auto-schedule these, send renewal reminders, and let customers self-manage their plan.</p>
    `,
  },
};

export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const post = POSTS[slug];
    if (!post) return {};
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
      },
    };
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  return (
    <>
      <ArticleSchema
        headline={post.title}
        description={post.description}
        datePublished={post.date}
        authorName={post.author}
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
          </div>
        </header>

        <article className="container mx-auto max-w-3xl px-4 py-16">
          <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to blog
          </Link>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">{post.title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {post.author} ·{" "}
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          <div
            className="prose-jobflow mt-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <section className="border-t bg-primary py-16 text-primary-foreground">
          <div className="container mx-auto max-w-2xl px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to try JobFlow?
            </h2>
            <p className="mt-4 text-lg opacity-90">
              14-day free trial. No credit card required. Built specifically for HVAC contractors.
            </p>
            <Button size="lg" variant="secondary" asChild className="mt-6">
              <Link href="/signup">Start free trial</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}