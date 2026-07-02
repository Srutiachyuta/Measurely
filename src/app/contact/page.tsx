import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/json-ld";
import { ContactPageClient } from "./page-client";

export const metadata: Metadata = {
  title: "Contact Us | Measurely",
  description:
    "Get in touch with Measurely. Have a question, suggestion, or feedback? Contact us via email, phone, or our contact form. We respond within 24 hours.",
  openGraph: {
    title: "Contact Us | Measurely",
    description:
      "Get in touch with Measurely. Have a question, suggestion, or feedback? We respond within 24 hours.",
    url: "https://measurely.in/contact",
    siteName: "Measurely",
    images: [{ url: "https://measurely.in/og-image.png", width: 1200, height: 630, alt: "Contact Measurely" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Measurely",
    description:
      "Get in touch with Measurely. We respond within 24 hours.",
    images: ["https://measurely.in/og-image.png"],
  },
  alternates: { canonical: "https://measurely.in/contact" },
  keywords: ["contact measurely", "measurely support", "calculator help", "measurely feedback"],
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }, { name: "Contact Us", url: `${SITE_CONFIG.url}/contact` }]} />
      <WebPageJsonLd title={`Contact Us | ${SITE_CONFIG.name}`} description={`Get in touch with ${SITE_CONFIG.name}. We would love to hear from you.`} url={`${SITE_CONFIG.url}/contact`} />
      <ContactPageClient />
    </>
  );
}
