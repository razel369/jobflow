import type { MetadataRoute } from "next";
import { generateSeoPages } from "@/lib/seo/data";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://jobflow.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = generateSeoPages(50);
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/features`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Programmatic SEO pages
  const seoPages: MetadataRoute.Sitemap = pages.map((p) => ({
    url: `${siteUrl}/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...seoPages];
}
