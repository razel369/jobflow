/**
 * Schema.org JSON-LD components for AEO.
 * These components output structured data that both Google (rich results)
 * and AI engines (ChatGPT, Perplexity) consume.
 */
import { generateSeoPages } from "@/lib/seo/data";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://jobflow.app";

// ============================================================================
// ORGANIZATION SCHEMA
// ============================================================================

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "JobFlow",
    legalName: "JobFlow Inc.",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      "Job management software built specifically for HVAC contractors.",
    foundingDate: "2026",
    founders: [{ "@type": "Person", name: "JobFlow Team" }],
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@jobflow.app",
      availableLanguage: ["English"],
    },
    sameAs: [
      `${siteUrl}/twitter`,
      `${siteUrl}/linkedin`,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ============================================================================
// SOFTWARE APPLICATION SCHEMA
// ============================================================================

export function SoftwareApplicationSchema({
  name = "JobFlow",
  description,
  price = "49",
  ratingValue,
  ratingCount,
}: {
  name?: string;
  description?: string;
  price?: string;
  ratingValue?: number;
  ratingCount?: number;
}) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Field Service Software",
    operatingSystem: "Web, iOS, Android",
    description: description || "Job management software for HVAC contractors.",
    offers: {
      "@type": "Offer",
      price: `${price}.00`,
      priceCurrency: "USD",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/pricing`,
    },
    aggregateRating: ratingValue && ratingCount ? {
      "@type": "AggregateRating",
      ratingValue,
      ratingCount,
      bestRating: "5",
      worstRating: "1",
    } : undefined,
  };

  // Remove undefined fields
  Object.keys(schema).forEach((key) => {
    if (schema[key] === undefined) delete schema[key];
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ============================================================================
// FAQ SCHEMA
// ============================================================================

export function FaqSchema({ faqs }: { faqs: Array<{ q: string; a: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ============================================================================
// HOWTO SCHEMA
// ============================================================================

export function HowToSchema({
  name,
  description,
  steps,
  totalTime,
}: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string }>;
  totalTime?: string;
}) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    totalTime,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
  if (!totalTime) delete schema.totalTime;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ============================================================================
// BREADCRUMB SCHEMA
// ============================================================================

export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ============================================================================
// ARTICLE SCHEMA (for blog posts)
// ============================================================================

export function ArticleSchema({
  headline,
  description,
  datePublished,
  authorName,
  imageUrl,
}: {
  headline: string;
  description: string;
  datePublished: string;
  authorName: string;
  imageUrl?: string;
}) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    author: { "@type": "Person", name: authorName },
    publisher: {
      "@type": "Organization",
      name: "JobFlow",
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` },
    },
  };
  if (imageUrl) schema.image = imageUrl;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ============================================================================
// LOCAL BUSINESS SCHEMA (for pSEO pages targeting cities)
// ============================================================================

export function LocalBusinessSchema({
  name,
  city,
  stateAbbr,
}: {
  name: string;
  city: string;
  stateAbbr: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Field Service Software",
    areaServed: {
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "State",
        name: stateAbbr,
      },
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: "49",
      highPrice: "199",
      priceCurrency: "USD",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
