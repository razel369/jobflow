import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export const metadata = {
  title: "Blog — JobFlow",
  description:
    "Resources, guides, and tips for HVAC contractors. Learn how to run a more profitable HVAC business.",
};

const POSTS = [
  {
    slug: "hvac-business-software-essentials",
    title: "The 7 essentials of HVAC business software in 2026",
    excerpt:
      "What every HVAC contractor needs in their tech stack — from CRM to embedded payments, plus our picks for the best tools.",
    date: "2026-07-01",
    readTime: "8 min",
  },
  {
    slug: "hvac-pricing-strategy",
    title: "How to price HVAC services without undercutting yourself",
    excerpt:
      "HVAC pricing benchmarks, flat-rate vs hourly, and how to communicate value without discounting.",
    date: "2026-06-28",
    readTime: "6 min",
  },
  {
    slug: "hvac-recurring-revenue",
    title: "Recurring maintenance contracts: the HVAC business model that compounds",
    excerpt:
      "Why 78% of profitable HVAC companies run maintenance contracts, and how to build one from scratch.",
    date: "2026-06-22",
    readTime: "10 min",
  },
];

export default function BlogPage() {
  return (
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

      <section className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold tracking-tight">The JobFlow blog</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Guides and resources for HVAC contractors who want to run a smarter business.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                  <p className="mt-4 text-xs text-muted-foreground">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    · {post.readTime} read
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t py-12 text-center text-sm text-muted-foreground">
        © 2026 JobFlow. All rights reserved.
      </footer>
    </main>
  );
}