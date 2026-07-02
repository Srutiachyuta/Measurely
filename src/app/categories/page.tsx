import type { Metadata } from "next";
import { SITE_CONFIG, CATEGORIES } from "@/lib/constants";
import { CategoryGrid } from "@/components/home/category-grid";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BreadcrumbJsonLd, WebPageJsonLd, CollectionPageJsonLd, ItemListJsonLd } from "@/components/seo/json-ld";
import type { BreadcrumbItem } from "@/types";
import { Grid3X3 } from "lucide-react";

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Categories" },
];

export const metadata: Metadata = {
  title: `All Categories | ${SITE_CONFIG.name}`,
  description: `Browse all ${CATEGORIES.length} categories of calculators and unit converters. Find the right tool for finance, health, math, engineering and more.`,
  openGraph: {
    title: `All Categories | ${SITE_CONFIG.name}`,
    description: `Browse all ${CATEGORIES.length} categories of calculators and unit converters.`,
    url: `${SITE_CONFIG.url}/categories`,
    siteName: SITE_CONFIG.siteName,
    images: [{ url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`, width: 1200, height: 630, alt: `${SITE_CONFIG.name} Categories` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `All Categories | ${SITE_CONFIG.name}`,
    description: `Browse all ${CATEGORIES.length} categories of calculators and unit converters.`,
    images: [`${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`],
  },
  alternates: { canonical: `${SITE_CONFIG.url}/categories` },
  keywords: ["calculator categories", "unit converter categories", "finance", "health", "math", "engineering", "construction"],
};

export default function CategoriesPage() {
  const totalTools = CATEGORIES.reduce((sum, c) => sum + c.tools.length, 0);
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Categories" }]} />
      <WebPageJsonLd title={`All Categories | ${SITE_CONFIG.name}`} description={`Browse all ${CATEGORIES.length} categories of calculators and unit converters.`} url={`${SITE_CONFIG.url}/categories`} />
      <CollectionPageJsonLd title={`All Categories | ${SITE_CONFIG.name}`} description={`Browse all ${CATEGORIES.length} categories of calculators and unit converters.`} url={`${SITE_CONFIG.url}/categories`} />
      <ItemListJsonLd items={CATEGORIES.map((c) => ({ name: c.name, url: `${SITE_CONFIG.url}/${c.slug}` }))} url={`${SITE_CONFIG.url}/categories`} />
      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} className="mb-8" />
          <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-600/5 dark:from-primary-500/20 dark:to-primary-600/10 text-primary-600 dark:text-primary-400 mx-auto mb-4">
            <Grid3X3 className="h-7 w-7" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            All <span className="text-gradient">Categories</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Explore all {CATEGORIES.length} categories and discover {totalTools} calculators and converters for every need.
          </p>
        </div>
        <CategoryGrid showHeader={false} />
      </div>
    </div>
    </>
  );
}
