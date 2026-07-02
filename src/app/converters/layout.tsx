import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `All Unit Converters | ${SITE_CONFIG.name}`,
  description: "Browse our complete collection of free online unit converters. Convert between length, weight, area, volume, speed, temperature, and many more units instantly.",
  openGraph: {
    title: `All Unit Converters | ${SITE_CONFIG.name}`,
    description: "Browse our complete collection of free online unit converters.",
    url: `${SITE_CONFIG.url}/converters`,
  },
  twitter: {
    title: `All Unit Converters | ${SITE_CONFIG.name}`,
    description: "Browse our complete collection of free online unit converters.",
  },
  alternates: { canonical: `${SITE_CONFIG.url}/converters` },
  keywords: ["unit converters", "length converter", "weight converter", "area converter", "volume converter"],
};

export default function ConvertersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
