export const metadata = {
  title: "Privacy Policy — JobFlow",
};

export default function PrivacyPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-16 prose-jobflow">
      <h1>Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: July 2026</p>
      <h2>1. Information we collect</h2>
      <p>
        We collect information you provide directly: company name, contact info, customer data you
        upload for service management, and payment information processed via Stripe.
      </p>
      <h2>2. How we use your information</h2>
      <p>
        To provide and improve JobFlow services, process payments, communicate with you about your
        account, and comply with legal obligations.
      </p>
      <h2>3. Data storage</h2>
      <p>
        Your data is stored in Supabase (PostgreSQL) and Stripe. We use industry-standard
        encryption in transit and at rest.
      </p>
      <h2>4. Contact</h2>
      <p>Email: privacy@jobflow.app</p>
    </main>
  );
}