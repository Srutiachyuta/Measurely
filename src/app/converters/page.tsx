import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { converters } from "@/data/converters";
import { BreadcrumbJsonLd, WebPageJsonLd, CollectionPageJsonLd, ItemListJsonLd } from "@/components/seo/json-ld";
import { ConvertersPageClient } from "./page-client";

export const metadata: Metadata = {
  title: "All Unit Converters | Measurely",
  description:
    "Browse our complete collection of free online unit converters. Convert between length, weight, area, volume, speed, temperature, and many more units instantly.",
  openGraph: {
    title: "All Unit Converters | Measurely",
    description:
      "Browse our complete collection of free online unit converters. Convert between length, weight, area, volume, speed, temperature, and more.",
    url: `${SITE.url}/converters`,
    siteName: SITE.siteName,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: "Measurely Unit Converters" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Unit Converters | Measurely",
    description:
      "Browse our complete collection of free online unit converters.",
    images: [SITE.ogImage],
  },
  alternates: { canonical: `${SITE.url}/converters` },
  keywords: ["free online converters", "unit converters", "length converter", "weight converter", "temperature converter"],
};

export default function ConvertersPage() {
  const url = `${SITE.url}/converters`;
  const allItems = converters.map((conv) => ({
    name: conv.name,
    url: `${SITE.url}/${conv.slug}`,
  }));

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Converters" }]} />
      <WebPageJsonLd title="All Unit Converters | Measurely" description="Browse our complete collection of free online unit converters." url={url} />
      <CollectionPageJsonLd title="All Unit Converters | Measurely" description="Browse our complete collection of free online unit converters." url={url} />
      <ItemListJsonLd items={allItems} url={url} />
      <ConvertersPageClient />
    </>
  );
}
