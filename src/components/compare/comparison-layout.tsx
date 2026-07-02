"use client";

import Link from "next/link";
import { ArrowLeft, Calculator, ArrowRightLeft, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AdSlot } from "@/components/AdSlot";
import { CALCULATOR_AFTER_RESULT, CALCULATOR_BEFORE_FAQ } from "@/config/adPlacements";
import {
  BreadcrumbJsonLd,
  WebPageJsonLd,
  FAQJsonLd,
} from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SITE_CONFIG } from "@/lib/constants";
import { calculators } from "@/data/calculators";
import { converters } from "@/data/converters";
import { RelatedTools } from "@/components/tool/related-tools";
import { ToolFAQ } from "@/components/tool/tool-faq";
import { ReadingProgress } from "@/components/ui/reading-progress";
import type { ComparisonDefinition } from "@/data/comparisons";
import type { BreadcrumbItem } from "@/types";

interface Props {
  comparison: ComparisonDefinition;
}

export function ComparisonLayout({ comparison }: Props) {
  const relatedToolDefs = comparison.relatedSlugs
    .map((slug) => calculators.find((c) => c.slug === slug) ?? converters.find((c) => c.slug === slug))
    .filter(Boolean);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Comparisons", href: "/compare" },
    { label: comparison.name },
  ];

  return (
    <>
      <ReadingProgress />
      <BreadcrumbJsonLd items={[
        { name: SITE_CONFIG.name, url: SITE_CONFIG.url },
        { name: "Comparisons", url: `${SITE_CONFIG.url}/compare` },
        { name: comparison.name, url: `${SITE_CONFIG.url}/${comparison.slug}` },
      ]} />
      <WebPageJsonLd
        title={comparison.metaTitle}
        description={comparison.metaDescription}
        url={`${SITE_CONFIG.url}/${comparison.slug}`}
      />
      <FAQJsonLd
        questions={comparison.faqs.map((f) => ({ question: f.question, answer: f.answer }))}
        url={`${SITE_CONFIG.url}/${comparison.slug}`}
      />

      <div className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} className="mb-8" />

          <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-10">
            <div className="min-w-0">
              <Link
                href="/compare"
                className="inline-flex items-center text-sm text-text-secondary hover:text-primary-600 transition-colors mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                All Comparisons
              </Link>

              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium">
                  <ArrowRightLeft className="h-4 w-4" />
                  Comparison
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">
                {comparison.name}
              </h1>
              <p className="text-lg text-text-secondary mb-6">
                {comparison.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-8">
                <Link
                  href={`/${comparison.toolA.slug}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-600 transition-colors"
                >
                  <Calculator className="h-4 w-4" />
                  {comparison.toolA.name}
                </Link>
                <span className="text-text-secondary text-sm font-medium">vs</span>
                <Link
                  href={`/${comparison.toolB.slug}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-600 transition-colors"
                >
                  <Calculator className="h-4 w-4" />
                  {comparison.toolB.name}
                </Link>
              </div>

              <Separator className="mb-10" />

              {/* Overview */}
              <section id="overview" className="mb-10">
                <h2 className="text-2xl font-bold text-text mb-4">Overview</h2>
                <p className="text-text-secondary leading-relaxed">
                  {comparison.overview}
                </p>
              </section>

              <AdSlot placement={CALCULATOR_AFTER_RESULT} />

              {/* Key Differences */}
              <section id="key-differences" className="mb-10">
                <h2 className="text-2xl font-bold text-text mb-4">Key Differences</h2>
                <ul className="space-y-3">
                  {comparison.keyDifferences.map((diff, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-secondary">
                      <Sparkles className="h-5 w-5 mt-0.5 text-primary-500 shrink-0" />
                      <span>{diff}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <Separator className="mb-10" />

              {/* Comparison Table */}
              <section id="comparison-table" className="mb-10">
                <h2 className="text-2xl font-bold text-text mb-6">Comparison Table</h2>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-surface-secondary">
                        <th className="text-left px-4 py-3 font-semibold text-text w-2/5">Feature</th>
                        <th className="text-left px-4 py-3 font-semibold text-primary-600 dark:text-primary-400 w-[30%]">
                          {comparison.toolA.name}
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-primary-600 dark:text-primary-400 w-[30%]">
                          {comparison.toolB.name}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparison.table.map((row, i) => (
                        <tr key={i} className="border-t border-border hover:bg-surface-secondary/50 transition-colors">
                          <td className="px-4 py-3 font-medium text-text">{row.feature}</td>
                          <td className="px-4 py-3 text-text-secondary">{row.a}</td>
                          <td className="px-4 py-3 text-text-secondary">{row.b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 p-6 rounded-xl bg-surface-secondary">
                <p className="text-sm text-text-secondary text-center sm:text-left">
                  Ready to calculate? Try these tools to see the numbers for your situation.
                </p>
                <div className="flex gap-3 shrink-0">
                  <Link href={`/${comparison.toolA.slug}`} className="inline-flex items-center justify-center rounded-md bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 transition-colors">
                    {comparison.toolA.name}
                  </Link>
                  <Link href={`/${comparison.toolB.slug}`} className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium text-text hover:bg-surface-secondary transition-colors">
                    {comparison.toolB.name}
                  </Link>
                </div>
              </div>

              <AdSlot placement={CALCULATOR_BEFORE_FAQ} />

              {/* FAQs */}
              <section id="faq" className="mb-10">
                <h2 className="text-2xl font-bold text-text mb-6">Frequently Asked Questions</h2>
                <ToolFAQ items={comparison.faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
              </section>

              <RelatedTools tools={relatedToolDefs as any} maxCount={8} />
            </div>

            <aside className="hidden lg:block" />
          </div>
        </div>
      </div>
    </>
  );
}
