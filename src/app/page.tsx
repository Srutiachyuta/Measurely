import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/json-ld";
import { HeroSection } from "@/components/home/premium-hero";
import { EditorialHome } from "@/components/home/editorial-home";



export const metadata: Metadata = {
    title: `${SITE_CONFIG.name} - Free Online Calculators & Financial Tools`,
  description: SITE_CONFIG.description + " Use our paycheck calculator, home affordability calculator, 401(k) retirement planner, EV charging cost calculator, ROI calculator, and more free tools.",
  keywords: [...SITE_CONFIG.keywords],
  openGraph: {
  title: `${SITE_CONFIG.name} - Free Online Calculators & Financial Tools`,
    description: SITE_CONFIG.description + " Use our paycheck calculator, home affordability calculator, 401(k) retirement planner, EV charging cost calculator, ROI calculator, and more.",
    siteName: SITE_CONFIG.siteName,
    url: SITE_CONFIG.url,
    images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630, alt: SITE_CONFIG.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} - Free Online Calculators & Tools`,
    description: SITE_CONFIG.description + " Explore our collection of free calculators and financial tools.",
    images: [SITE_CONFIG.ogImage],
    creator: SITE_CONFIG.twitterHandle,
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

      <EditorialHome />
     
    </>
  );
}
