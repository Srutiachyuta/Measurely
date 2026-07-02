import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightLeft, ArrowRight, Calculator } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd, CollectionPageJsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { comparisons } from "@/data/comparisons";
import type { BreadcrumbItem } from "@/types";

export const metadata: Metadata = {
  title: `Compare Financial & Health Tools | Side-by-Side Comparisons | ${SITE_CONFIG.name}`,
  description: "Compare financial and health tools side by side — SIP vs FD, BMI vs Body Fat, Old vs New Tax Regime, and more. Make informed decisions with our comparison guides.",
  openGraph: {
    title: `Compare Financial & Health Tools | ${SITE_CONFIG.name}`,
    description: "Side-by-side comparisons of financial and health tools — SIP vs FD, BMI vs Body Fat, Old vs New Tax Regime, and more.",
    url: `${SITE_CONFIG.url}/compare`,
    siteName: SITE_CONFIG.siteName,
    images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630, alt: "Tool Comparisons" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Compare Financial & Health Tools | ${SITE_CONFIG.name}`,
    description: "Side-by-side comparisons of financial and health tools.",
    images: [SITE_CONFIG.ogImage],
    creator: SITE_CONFIG.twitterHandle,
  },
  alternates: { canonical: `${SITE_CONFIG.url}/compare` },
};

export default function CompareIndexPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Compare" },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: SITE_CONFIG.name, url: SITE_CONFIG.url },
        { name: "Compare", url: `${SITE_CONFIG.url}/compare` },
      ]} />
      <WebPageJsonLd title="Compare Financial & Health Tools" description="Side-by-side comparisons of financial and health tools." url={`${SITE_CONFIG.url}/compare`} />
      <CollectionPageJsonLd title="Compare Financial & Health Tools" description="Side-by-side comparisons" url={`${SITE_CONFIG.url}/compare`} />
      <div className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} className="mb-8" />

          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-600/5 text-primary-600 dark:text-primary-400 shrink-0">
              <ArrowRightLeft className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-text">
                Tool Comparisons
              </h1>
              <p className="text-text-secondary mt-1">
                Side-by-side comparisons to help you make informed decisions
              </p>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="grid gap-6 md:grid-cols-2">
            {comparisons.map((comparison) => (
              <Link key={comparison.slug} href={`/${comparison.slug}`} className="group">
                <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="info" size="sm">
                        <ArrowRightLeft className="h-3 w-3 mr-1" />
                        Comparison
                      </Badge>
                    </div>
                    <h2 className="text-lg font-semibold text-text group-hover:text-primary-600 transition-colors mb-2">
                      {comparison.name}
                    </h2>
                    <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                      {comparison.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <span className="flex items-center gap-1">
                        <Calculator className="h-3 w-3" />
                        {comparison.toolA.name}
                      </span>
                      <span className="text-muted">vs</span>
                      <span className="flex items-center gap-1">
                        <Calculator className="h-3 w-3" />
                        {comparison.toolB.name}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-medium text-primary-600 dark:text-primary-400">
                      Compare Now
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
