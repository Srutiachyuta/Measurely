import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/json-ld";
import { HeroSection } from "@/components/home/hero-section";

import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedCalculators } from "@/components/home/featured-calculators";
import { FeaturedConverters } from "@/components/home/featured-converters";
import { TrendingTools } from "@/components/home/trending-tools";
import { RecentlyAdded } from "@/components/home/recently-added";

import { Newsletter } from "@/components/newsletter";
import { FAQSection } from "@/components/home/faq-section";


export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} - Free Online Calculators, Converters & Financial Tools`,
  description: SITE_CONFIG.description + " Use our paycheck calculator, home affordability calculator, 401(k) retirement planner, EV charging cost calculator, ROI calculator, and more free tools.",
  keywords: [...SITE_CONFIG.keywords],
  openGraph: {
    title: `${SITE_CONFIG.name} - Free Online Calculators, Converters & Financial Tools`,
    description: SITE_CONFIG.description + " Use our paycheck calculator, home affordability calculator, 401(k) retirement planner, EV charging cost calculator, ROI calculator, and more.",
    siteName: SITE_CONFIG.siteName,
    url: SITE_CONFIG.url,
    images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630, alt: SITE_CONFIG.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} - Free Online Calculators & Tools`,
    description: SITE_CONFIG.description + " Explore our collection of 100+ free calculators, converters, and financial tools.",
    images: [SITE_CONFIG.ogImage],
  },
  alternates: { canonical: SITE_CONFIG.url },
  robots: { index: true, follow: true },
};

export default function HomePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }]} />
      <WebPageJsonLd title={SITE_CONFIG.name} description={SITE_CONFIG.description} url={SITE_CONFIG.url} />
      <HeroSection />

      <RecentlyAdded />
      <CategoryGrid />
      <FeaturedCalculators />
      <FeaturedConverters />
      <TrendingTools />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <Newsletter variant="fullwidth" />
      </section>
      <FAQSection />
     
    </>
  );
}
