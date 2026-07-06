import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, Users, Smartphone, Zap, Shield, MapPin, Bell, FileText, Camera, Wrench, Clock } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Features — JobFlow",
  description:
    "JobFlow features built specifically for HVAC contractors: scheduling, invoicing, CRM, mobile app, embedded payments, and more.",
};

const FEATURES = [
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Smart job scheduling",
    description:
      "Dispatch technicians based on location, skill, and availability. Drag-and-drop calendar. Map view to optimize routes.",
    bullets: ["Drag-and-drop calendar", "Skill-based dispatch", "Route optimization", "Recurring appointments"],
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: "HVAC-specific invoicing",
    description:
      "Pre-built line items for refrigerant, filters, blower motors, capacitors, and more. Generate invoices from jobs in one click.",
    bullets: ["Pre-built HVAC line items", "One-click invoice from job", "Stripe payment links", "Tax & discount support"],
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Customer & system history",
    description:
      "Track every customer's HVAC system — brand, model, age, refrigerant type, filter size, warranty status. All past jobs and invoices in one view.",
    bullets: ["Per-property system details", "Service history timeline", "Warranty tracking", "Contact & address records"],
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Mobile app for technicians",
    description:
      "Native iOS and Android app. Techs update job status, capture before/after photos, collect signatures, and record work from the field.",
    bullets: ["Native iOS & Android", "Offline mode", "Photo capture", "Digital signatures"],
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Embedded payments via Stripe Connect",
    description:
      "Customers pay invoices directly through JobFlow. Funds land in your Stripe account in 1-2 business days. We charge just 0.5% on top.",
    bullets: ["Stripe Connect integration", "Credit, debit, ACH, Apple/Google Pay", "Auto-reminders", "0.5% JobFlow fee"],
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Recurring maintenance contracts",
    description:
      "Automatically schedule annual tune-ups. Send customers renewal reminders. Track contract value and renewal rates.",
    bullets: ["Auto-scheduled tune-ups", "Renewal reminders", "Contract revenue tracking", "Customer self-service portal"],
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Compliance tracking",
    description:
      "EPA Section 608 leak inspection reminders, refrigerant purchase tracking (R-410A, R-32, R-454B), state license expiration alerts.",
    bullets: ["EPA 608 leak inspection reminders", "Refrigerant purchase tracking", "License expiration alerts", "Insurance certificate tracking"],
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Customer communications",
    description:
      "Automatic SMS and email appointment reminders. Post-service follow-up. Online review requests after each completed job.",
    bullets: ["SMS + email reminders", "Two-way texting", "Review requests", "Branded notifications"],
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Estimates and quotes",
    description:
      "Generate professional estimates from your phone. Customers accept with one tap. Convert accepted estimates to jobs automatically.",
    bullets: ["Mobile estimate creation", "Customer e-signature", "One-tap acceptance", "Auto-convert to job"],
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "GPS and route planning",
    description:
      "See all your techs and jobs on a map. Optimize daily routes. Track time on-site automatically.",
    bullets: ["Live map view", "Route optimization", "Time-on-site tracking", "Travel time estimates"],
  },
  {
    icon: <Camera className="h-6 w-6" />,
    title: "Job photos & documentation",
    description:
      "Capture before/after photos. Annotate issues. Attach photos to invoices and customer records automatically.",
    bullets: ["Before/after photos", "Photo annotation", "Auto-attach to jobs", "Customer gallery sharing"],
  },
  {
    icon: <Wrench className="h-6 w-6" />,
    title: "Inventory & equipment tracking",
    description:
      "Track refrigerant, parts, and equipment. Get low-stock alerts. Allocate parts to jobs in real time.",
    bullets: ["Refrigerant tracking", "Low-stock alerts", "Job-level allocation", "Vendor purchase orders"],
  },
];

export default function FeaturesPage() {
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
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">Log in</Link>
            <Button asChild><Link href="/signup">Start free trial</Link></Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4">Features</Badge>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Everything an HVAC contractor needs in one place
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Stop juggling spreadsheets, paper invoices, and 5 different apps. JobFlow gives
            HVAC contractors one tool to run the entire business.
          </p>
        </div>
      </section>

      {/* Features grid */}
      <section className="border-t bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle className="mt-4 text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {feature.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2 text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Try JobFlow free for 14 days
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
            No credit card required. Set up in under 10 minutes.
          </p>
          <Button size="lg" variant="secondary" asChild className="mt-8">
            <Link href="/signup">Start free trial</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t py-12 text-center text-sm text-muted-foreground">
        © 2026 JobFlow. All rights reserved.
      </footer>
    </main>
  );
}