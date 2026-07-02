import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { calculators } from "@/data/calculators";
import { BreadcrumbJsonLd, WebPageJsonLd, CollectionPageJsonLd, ItemListJsonLd } from "@/components/seo/json-ld";
import { CalculatorsPageClient } from "./page-client";

export const metadata: Metadata = {
  title: "All Calculators | Measurely",
  description:
    "Browse our complete collection of free online calculators. Finance, health, math, time, engineering, construction, and everyday life calculators.",
  openGraph: {
    title: "All Calculators | Measurely",
    description:
      "Browse our complete collection of free online calculators. Finance, health, math, time, engineering, construction, and everyday life.",
    url: `${SITE.url}/calculators`,
    siteName: SITE.siteName,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: "Measurely Calculators" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Calculators | Measurely",
    description:
      "Browse our complete collection of free online calculators.",
    images: [SITE.ogImage],
  },
  alternates: { canonical: `${SITE.url}/calculators` },
  keywords: ["free online calculators", "financial calculators", "health calculators", "math calculators", "engineering calculators"],
};

export default function CalculatorsPage() {
  const url = `${SITE.url}/calculators`;
  const allItems = calculators.map((calc) => ({
    name: calc.name,
    url: `${SITE.url}/${calc.slug}`,
  }));

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Calculators" }]} />
      <WebPageJsonLd title="All Calculators | Measurely" description="Browse our complete collection of free online calculators." url={url} />
      <CollectionPageJsonLd title="All Calculators | Measurely" description="Browse our complete collection of free online calculators." url={url} />
      <ItemListJsonLd items={allItems} url={url} />
      <CalculatorsPageClient />
    </>
  );
}
