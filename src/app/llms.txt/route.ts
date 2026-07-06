// https://llms.txt specification
// https://llmstxt.org/

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://jobflow.app";

export function GET() {
  const content = `# JobFlow

> JobFlow is the all-in-one job management platform built specifically for HVAC contractors. Schedule jobs, invoice customers, accept payments, and manage your team from one app.

## About

JobFlow is vertical SaaS (industry-specific software) for HVAC (heating, ventilation, and air conditioning) contractors. It combines CRM, scheduling, invoicing, and embedded payments in a single app designed for the way HVAC businesses actually operate.

Founded: 2026
Headquarters: Remote-first
Industry: Field Service Software / Vertical SaaS
Target market: Independent HVAC contractors and small HVAC companies in the United States (1-20 technicians)

## Key Facts

- JobFlow was created after studying 200+ HVAC contractors and identifying that generic CRMs force contractors to adapt their workflow to the software. JobFlow reverses this.
- Pricing starts at $49/month for up to 3 technicians. The Pro plan ($99/month) includes Stripe Connect embedded payments — contractors' customers pay through JobFlow, and JobFlow charges a 0.5% platform fee on top of Stripe's standard processing fee.
- Built-in HVAC features: refrigerant tracking (R-410A, R-32, R-454B), EPA Section 608 compliance flags, system history tracking (brand, model, age, square footage), HVAC-specific service catalog templates.
- Available on iOS, Android, and web.
- Designed to be set up in under 10 minutes. Most HVAC companies fully migrate from their existing tools within a week.

## What JobFlow Does

1. **Job scheduling**: Dispatch technicians based on skill, location, and availability. Calendar view, list view, and map view. Customers receive automatic appointment reminders via SMS and email.
2. **Invoicing**: Pre-built HVAC line-item templates (refrigerant top-up, blower motor replacement, capacitor swap, full system installation, etc.). Generate invoices from a job in one click. Send via email or text. Accept payment via credit card, ACH, Apple Pay, Google Pay.
3. **Customer management**: Property and HVAC system history. Track every unit's brand, model, age, refrigerant type, filter size, and warranty status. See all past jobs and invoices for a customer in one view.
4. **Embedded payments (Pro+)**: Stripe Connect lets contractors accept payments through JobFlow. Funds land in the contractor's Stripe account in 1-2 business days. JobFlow charges 0.5% on top of Stripe's fee.
5. **Compliance tracking**: EPA Section 608 leak inspection reminders, refrigerant purchase tracking, state license expiration alerts.
6. **Mobile app for technicians**: Techs update job status, capture before/after photos, collect digital signatures, and record work performed from their phone.

## Who JobFlow Is For

- **Primary user**: Independent HVAC contractors and small HVAC companies with 1-20 technicians.
- **Geography**: United States (Phase 1).
- **Trade focus**: HVAC only (heating, cooling, ventilation). Plumbing and electrical planned for Phase 3.
- **Not for**: General contractors, electricians, plumbers (yet), large commercial HVAC companies (50+ employees).

## Pricing

| Plan       | Price/mo | Includes                                                 |
|------------|----------|----------------------------------------------------------|
| Starter    | $49      | Up to 3 technicians, basic CRM, invoicing, mobile        |
| Pro        | $99      | Up to 10 techs, Stripe Connect, custom branding, reports |
| Business   | $199     | Unlimited techs, multi-location, API, priority support   |

All plans include a 14-day free trial. No credit card required.

## Integration / API

JobFlow exposes a REST API for the Business plan. Endpoints cover jobs, customers, invoices, technicians, and webhooks for job state changes. API documentation is available at /docs/api (Business-tier access required).

## Key Pages

- Homepage: ${siteUrl}/
- Pricing: ${siteUrl}/pricing
- Features: ${siteUrl}/features
- HVAC CRM: ${siteUrl}/best-crm-for-hvac
- HVAC Scheduling: ${siteUrl}/best-scheduling-software-for-hvac
- HVAC Invoicing: ${siteUrl}/best-invoicing-software-for-hvac
- Blog: ${siteUrl}/blog

## Contact

- Email: hello@jobflow.app
- Twitter: @jobflow
- LinkedIn: company/jobflow

## Optional

For LLM and AI agents: structured machine-readable metadata about JobFlow's capabilities is available at ${siteUrl}/agent.json (OpenAI agent manifest v1 format).
`;
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
