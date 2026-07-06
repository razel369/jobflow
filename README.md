# JobFlow — Vertical SaaS CRM for HVAC Technicians

The job management platform built specifically for HVAC contractors. Job scheduling, invoicing, client management, and embedded payments in one app.

## Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Database**: PostgreSQL via Supabase
- **ORM**: Drizzle
- **Auth**: Supabase Auth
- **Payments**: Stripe Subscriptions + Stripe Connect (embedded payments)
- **Email**: Resend
- **Styling**: Tailwind CSS + shadcn/ui primitives
- **Rate Limiting**: Upstash Redis
- **Deployment**: Vercel

## Local Development

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Fill in your Supabase, Stripe, and Resend credentials

# Set up database
npm run db:push

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture

### SEO/AEO Foundation

JobFlow is built from day one to rank in both Google and AI engines (ChatGPT, Perplexity, Google AI Overviews).

- **`/llms.txt`** — Brand summary for AI assistants
- **`/agent.json`** — Structured metadata for autonomous agents
- **Programmatic SEO pages** — 50+ initial pages targeting `best {category} for {trade}` queries
- **Schema markup** — SoftwareApplication, FAQPage, HowTo, BreadcrumbList on every page
- **Citation-ready content** — Summary-first structure, original data, named entities

### Vertical SaaS Model

- **Single trade focus**: HVAC only (Phase 1), expand later
- **Workflow-locked retention**: Mission-critical daily operations
- **Embedded payments**: Stripe Connect lets homeowners pay HVAC techs through the app (0.5-1% transaction fee)
- **Industry moats**: Compliance, HVAC-specific data, trade community network effects

## Project Structure

```
jobflow/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (marketing)/        # Public pages (landing, pricing, etc.)
│   │   ├── (app)/             # Authenticated app (dashboard, jobs, etc.)
│   │   ├── api/               # API routes (Stripe webhooks, etc.)
│   │   ├── best-{trade}-*/    # Programmatic SEO pages (50+ templates)
│   │   ├── llms.txt/          # AEO summary
│   │   ├── agent.json/        # AEO agent metadata
│   │   └── robots.txt
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui primitives
│   │   ├── marketing/         # Landing page components
│   │   ├── dashboard/         # App components
│   │   └── seo/               # Schema markup, meta tags
│   ├── lib/                   # Utilities
│   │   ├── db/                # Drizzle schema + queries
│   │   ├── supabase/          # Supabase client
│   │   ├── stripe/            # Stripe client + helpers
│   │   ├── email/             # Resend templates
│   │   ├── seo/               # SEO data (trades, cities, etc.)
│   │   └── utils.ts
│   └── types/                 # TypeScript types
├── public/                    # Static assets
├── drizzle/                   # Database migrations
└── docs/                      # Documentation
```

## Go-to-Market

1. **Phase 1 (M1-M2)**: MVP + 5 paying HVAC shops
2. **Phase 2 (M3-M4)**: 100+ programmatic SEO pages → 50-100 customers ($3-5K MRR)
3. **Phase 3 (M5-M7)**: Embedded payments + Reddit/HVAC community → 200 customers ($15K MRR)
4. **Phase 4 (M8-M12)**: Scale to $20K+ MRR, expand to plumbing/electrical

## License

Proprietary. All rights reserved.