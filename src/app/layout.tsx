import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://jobflow.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JobFlow — Job Management Software for HVAC Contractors",
    template: "%s | JobFlow",
  },
  description:
    "JobFlow is the all-in-one job management platform built specifically for HVAC contractors. Schedule jobs, invoice customers, and accept payments from one app.",
  keywords: [
    "HVAC software",
    "HVAC CRM",
    "HVAC scheduling",
    "HVAC invoicing",
    "field service software",
    "HVAC contractor software",
    "HVAC business management",
  ],
  authors: [{ name: "JobFlow" }],
  creator: "JobFlow",
  publisher: "JobFlow",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "JobFlow",
    title: "JobFlow — Job Management Software for HVAC Contractors",
    description:
      "The all-in-one job management platform built specifically for HVAC contractors.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "JobFlow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JobFlow — Job Management Software for HVAC Contractors",
    description:
      "The all-in-one job management platform built specifically for HVAC contractors.",
    images: ["/og.png"],
    creator: "@jobflow",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        {/* AEO: explicit references to llms.txt and agent.json */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Summary" />
        <link rel="agent.json" href="/agent.json" />
      </head>
      <body className={inter.variable}>{children}</body>
    </html>
  );
}