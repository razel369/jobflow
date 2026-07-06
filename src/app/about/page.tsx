import Link from "next/link";
import { Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About — JobFlow",
  description: "JobFlow is the job management platform built specifically for HVAC contractors.",
};

export default function AboutPage() {
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

      <section className="container mx-auto max-w-3xl px-4 py-20">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">About JobFlow</h1>
        <div className="prose-jobflow mt-12">
          <p>
            JobFlow was started because we watched too many HVAC contractors struggle with software
            that wasn&apos;t built for them. Generic CRMs force contractors to bend their workflow
            to the software. We thought it should be the other way around.
          </p>
          <p>
            Today JobFlow serves HVAC companies across the United States, from solo techs in
            Phoenix to multi-location businesses in Chicago. Our team is remote-first and ship
            software every week.
          </p>
          <h2>What we believe</h2>
          <ul>
            <li>Vertical beats horizontal. Generic tools can&apos;t compete with software built for one trade.</li>
            <li>Embedded payments are the future of small business software.</li>
            <li>SEO and AEO are the most sustainable customer acquisition channels for SaaS.</li>
            <li>Ship fast, listen to customers, iterate.</li>
          </ul>
        </div>
        <Button asChild className="mt-8">
          <Link href="/signup">Try JobFlow free</Link>
        </Button>
      </section>
    </main>
  );
}