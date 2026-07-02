import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Search Tools | ${SITE_CONFIG.name}`,
  description: "Find the right calculator or converter for your needs. Search our complete collection of free online tools.",
  openGraph: {
    title: `Search Tools | ${SITE_CONFIG.name}`,
    description: "Find the right calculator or converter for your needs.",
    url: `${SITE_CONFIG.url}/search`,
  },
  twitter: {
    title: `Search Tools | ${SITE_CONFIG.name}`,
    description: "Find the right calculator or converter for your needs.",
  },
  alternates: { canonical: `${SITE_CONFIG.url}/search` },
  keywords: ["search calculators", "search converters", "find tools"],
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
