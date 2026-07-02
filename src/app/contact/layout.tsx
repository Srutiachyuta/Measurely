import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contact Us | ${SITE_CONFIG.name}`,
  description: `Get in touch with ${SITE_CONFIG.name}. Send us a message, report an issue, suggest a new calculator, or share your feedback. We typically respond within 24 hours.`,
  openGraph: {
    title: `Contact Us | ${SITE_CONFIG.name}`,
    description: `Get in touch with ${SITE_CONFIG.name}. Send us a message, report an issue, or suggest a new calculator.`,
    url: `${SITE_CONFIG.url}/contact`,
  },
  twitter: {
    title: `Contact Us | ${SITE_CONFIG.name}`,
    description: `Get in touch with ${SITE_CONFIG.name}. Send us a message, report an issue, or suggest a new calculator.`,
  },
  alternates: { canonical: `${SITE_CONFIG.url}/contact` },
  keywords: [
    "contact measurely", "measurely support", "get in touch",
    "measurely feedback", "report issue", "suggest calculator",
  ],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
