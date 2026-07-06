export const metadata = {
  title: "Terms of Service — JobFlow",
};

export default function TermsPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-16 prose-jobflow">
      <h1>Terms of Service</h1>
      <p className="text-muted-foreground">Last updated: July 2026</p>
      <h2>1. Service</h2>
      <p>
        JobFlow provides SaaS job management software for HVAC contractors, including scheduling,
        invoicing, customer management, and embedded payment processing via Stripe Connect.
      </p>
      <h2>2. Payment processing</h2>
      <p>
        Payment processing is provided by Stripe. JobFlow charges a 0.5% platform fee on
        transactions processed through Stripe Connect, in addition to Stripe&apos;s standard fees.
      </p>
      <h2>3. Cancellation</h2>
      <p>
        You may cancel at any time from your account settings. Access continues through the end of
        your current billing period.
      </p>
      <h2>4. Contact</h2>
      <p>Email: legal@jobflow.app</p>
    </main>
  );
}