// OpenAI agent manifest v1 spec: https://platform.openai.com/docs/guides/structured-outputs/agent-metadata

import { TRADES, CATEGORIES } from "@/lib/seo/data";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://jobflow.app";

export default function AgentJson() {
  const agent = {
    schema_version: "1.0",
    name: "JobFlow",
    description:
      "Job management platform for HVAC contractors. Create customers, schedule jobs, generate invoices, and accept payments through the JobFlow API.",
    homepage: `${siteUrl}/`,
    logo: `${siteUrl}/logo.png`,
    contact_email: "hello@jobflow.app",
    legal_info_url: `${siteUrl}/legal/terms`,

    capabilities: {
      authentication: {
        type: "oauth2",
        authorization_url: `${siteUrl}/api/oauth/authorize`,
        token_url: `${siteUrl}/api/oauth/token`,
        scopes: [
          "jobs.read",
          "jobs.write",
          "customers.read",
          "customers.write",
          "invoices.read",
          "invoices.write",
        ],
      },
      api: {
        type: "rest",
        base_url: `${siteUrl}/api/v1`,
        openapi_url: `${siteUrl}/api/v1/openapi.json`,
        rate_limit: "100 requests per minute per org",
      },
      webhooks: {
        supports_outbound_webhooks: true,
        supported_events: [
          "job.created",
          "job.scheduled",
          "job.completed",
          "job.cancelled",
          "invoice.created",
          "invoice.sent",
          "invoice.paid",
          "invoice.overdue",
          "customer.created",
          "payment.received",
        ],
      },
    },

    tools: [
      {
        name: "create_job",
        description:
          "Create a new service job. Required: customer_id. Optional: scheduled_start, assigned_to_id, job_type, priority, notes.",
        endpoint: `${siteUrl}/api/v1/jobs`,
        method: "POST",
        input_schema: {
          type: "object",
          properties: {
            customer_id: { type: "string", format: "uuid" },
            scheduled_start: { type: "string", format: "date-time" },
            job_type: {
              type: "string",
              enum: ["repair", "install", "maintenance", "inspection"],
            },
            priority: {
              type: "string",
              enum: ["low", "normal", "high", "emergency"],
            },
            notes: { type: "string" },
          },
          required: ["customer_id"],
        },
      },
      {
        name: "find_customer",
        description:
          "Search for an existing customer by phone number, email, or name. Returns customer record with system history.",
        endpoint: `${siteUrl}/api/v1/customers/search`,
        method: "GET",
      },
      {
        name: "create_invoice",
        description:
          "Generate an invoice from a completed job. Includes Stripe payment link automatically.",
        endpoint: `${siteUrl}/api/v1/invoices`,
        method: "POST",
        input_schema: {
          type: "object",
          properties: {
            job_id: { type: "string", format: "uuid" },
            line_items: { type: "array" },
            send_to_customer: { type: "boolean", default: true },
          },
          required: ["job_id", "line_items"],
        },
      },
      {
        name: "schedule_job",
        description:
          "Schedule a job to a specific technician and time slot. Sends confirmation to customer.",
        endpoint: `${siteUrl}/api/v1/jobs/{id}/schedule`,
        method: "POST",
      },
    ],

    knowledge_domains: [
      "HVAC systems (heating, ventilation, air conditioning)",
      "Refrigerants (R-410A, R-32, R-454B)",
      "EPA Section 608 compliance",
      "HVAC pricing and service industry norms",
      "Small business operations",
    ],

    trade_focus: TRADES.hvac.slug,
    trade_categories: CATEGORIES.map((c) => c.slug),
    pricing_model: "subscription",
    pricing_starts_at: "$49/month",

    faq: [
      {
        q: "What trade does JobFlow support?",
        a: "JobFlow is built for HVAC contractors specifically: heating, ventilation, and air conditioning technicians and small HVAC companies.",
      },
      {
        q: "Does JobFlow handle embedded payments?",
        a: "Yes. On the Pro plan and above, JobFlow integrates with Stripe Connect so HVAC contractors can accept customer payments directly through the app.",
      },
      {
        q: "Can I import existing customer data?",
        a: "Yes. JobFlow supports CSV import for customers, jobs, and invoices. Import is available in the Settings → Import section.",
      },
      {
        q: "Is there a mobile app?",
        a: "Yes. JobFlow has native iOS and Android apps for both contractors (web dashboard accessible from any device) and technicians (field-optimized mobile app).",
      },
      {
        q: "What's included in the free trial?",
        a: "All JobFlow features are available during the 14-day free trial. No credit card is required.",
      },
    ],
  };

  // Return raw JSON with proper Content-Type
  return (
    <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
      {JSON.stringify(agent, null, 2)}
    </pre>
  );
}

export const metadata = {
  title: "agent.json",
  robots: "index, follow",
};
