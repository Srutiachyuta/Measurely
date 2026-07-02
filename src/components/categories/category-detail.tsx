"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd, CollectionPageJsonLd, ItemListJsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import type { BreadcrumbItem } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ToolGrid } from "@/components/home/tool-grid";
import { AdSlot } from "@/components/AdSlot";
import { CATEGORY_TOP_BANNER } from "@/config/adPlacements";
import { categoryContent } from "@/data/category-content";
import { comparisons } from "@/data/comparisons";
import type { CategoryEntry } from "@/data/tool-registry";
import {
  TrendingUp,
  Heart,
  Sigma,
  ArrowLeftRight,
  Clock,
  GraduationCap,
  Cpu,
  Hammer,
  Sparkles,
  Home,
  PiggyBank,
  Car,
  BarChart3,
  Calculator,
  ChevronRight,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Heart,
  Sigma,
  ArrowLeftRight,
  Clock,
  GraduationCap,
  Cpu,
  Hammer,
  Sparkles,
  Home,
  PiggyBank,
  Car,
  BarChart3,
};

function getToolDescription(name: string): string {
  const descriptions: Record<string, string> = {
    "EMI Calculator": "Calculate monthly EMI and total interest",
    "Loan Calculator": "Compare loan options and repayment schedules",
    "Mortgage Calculator": "Estimate monthly mortgage payments",
    "Interest Calculator": "Calculate simple and compound interest",
    "Compound Interest Calculator": "Project investment growth over time",
    "SIP Calculator": "Plan systematic investment plan returns",
    "SWP Calculator": "Calculate systematic withdrawal plan income",
    "FD Calculator": "Estimate fixed deposit maturity amount",
    "RD Calculator": "Calculate recurring deposit returns",
    "GST Calculator": "Compute GST inclusive and exclusive prices",
    "Tax Calculator": "Estimate your tax liability",
    "Salary Calculator": "Calculate take-home salary and deductions",
    "Currency Converter": "Convert between world currencies",
    "BMI Calculator": "Calculate Body Mass Index",
    "BMR Calculator": "Calculate Basal Metabolic Rate",
    "Body Fat Calculator": "Estimate body fat percentage",
    "Calorie Calculator": "Calculate daily calorie needs",
    "Water Intake Calculator": "Calculate recommended water intake",
    "Pregnancy Calculator": "Calculate due date and pregnancy week",
    "Heart Rate Calculator": "Calculate target heart rate zones",
    "Ideal Weight Calculator": "Calculate your ideal body weight",
    "Percentage Calculator": "Calculate percentages quickly",
    "Fraction Calculator": "Perform fraction arithmetic",
    "Scientific Calculator": "Advanced mathematical calculations",
    "Matrix Calculator": "Perform matrix operations",
    "Equation Solver": "Solve algebraic equations",
    "GCF & LCM Calculator": "Find GCF and LCM of numbers",
    "Prime Number Calculator": "Check primality and find factors",
    "Statistics Calculator": "Compute statistical measures",

    "Age Calculator": "Calculate exact age in various units",
    "Date Calculator": "Add or subtract dates",
    "Days Between Dates": "Calculate days between two dates",
    "Time Duration Calculator": "Calculate time between two times",
    "Week Calculator": "Calculate weeks between dates",
    "Month Calculator": "Calculate months between dates",
    "GPA Calculator": "Calculate Grade Point Average",
    "CGPA Calculator": "Calculate Cumulative GPA",
    "Grade Calculator": "Calculate final grades",
    "Ohm's Law Calculator": "Calculate voltage, current, resistance",
    "Voltage Divider Calculator": "Calculate divider output voltage",
    "Power Calculator": "Calculate electrical power",
    "Resistor Calculator": "Calculate resistor values",
    "Watt Calculator": "Calculate wattage and power",
    "Concrete Calculator": "Calculate concrete volume needed",
    "Paint Calculator": "Estimate paint required",
    "Tile Calculator": "Calculate tiles needed",
    "Roofing Calculator": "Estimate roofing materials",
    "Flooring Calculator": "Calculate flooring materials",
    "Discount Calculator": "Calculate discounts and savings",
    "Tip Calculator": "Calculate tip amounts",
    "Split Bill Calculator": "Split bills evenly",
    "Fuel Cost Calculator": "Estimate trip fuel costs",
    "ROI Calculator": "Measure return on investment and calculate profit percentages",
    "Freelance Rate Calculator": "Determine your ideal hourly and project rates",
    "YouTube Money Calculator": "Estimate YouTube earnings based on views and engagement",
  };
  return descriptions[name] || `Calculate ${name.toLowerCase()}`;
}

interface Props {
  category: CategoryEntry;
}

export function CategoryDetail({ category }: Props) {
  const Icon = iconMap[category.icon] || Sparkles;
  const calculators = category.tools.filter((t) => t.isCalculator);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Categories", href: "/categories" },
    { label: category.name },
  ];

  const toolCards = category.tools.map((tool) => ({
    name: tool.name,
    slug: tool.slug,
    category: category.name,
    categorySlug: category.slug,
    icon: category.icon,
    description: getToolDescription(tool.name),
    usageCount: "1K",
  }));

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: SITE_CONFIG.name, url: SITE_CONFIG.url },
        { name: "Categories", url: `${SITE_CONFIG.url}/categories` },
        { name: category.name, url: `${SITE_CONFIG.url}/${category.slug}` },
      ]} />
      <WebPageJsonLd title={`${category.name} | ${SITE_CONFIG.name}`} description={category.description} url={`${SITE_CONFIG.url}/${category.slug}`} />
      <CollectionPageJsonLd title={`${category.name} | ${SITE_CONFIG.name}`} description={category.description} url={`${SITE_CONFIG.url}/${category.slug}`} />
      <ItemListJsonLd items={category.tools.map((t) => ({ name: t.name, url: `${SITE_CONFIG.url}/${t.slug}` }))} url={`${SITE_CONFIG.url}/${category.slug}`} />
      <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-600/5 dark:from-primary-500/20 dark:to-primary-600/10 text-primary-600 dark:text-primary-400 shrink-0">
            <Icon className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-text mb-2">
              {category.name}
            </h1>
            <p className="text-lg text-text-secondary">
              {category.description}
            </p>
            <div className="flex items-center gap-3 mt-3">
              <Badge variant="info" size="sm">
                <Calculator className="h-3 w-3 mr-1" />
                {calculators.length} Calculators
              </Badge>
            </div>
          </div>
        </div>

        <Separator className="mb-10" />

        <AdSlot placement={CATEGORY_TOP_BANNER} />

        <div className="grid lg:grid-cols-4 gap-10 mt-8">
          <div className="lg:col-span-3 space-y-8">
            {categoryContent[category.slug] && (
              <>
                <section>
                  <p className="text-text-secondary leading-relaxed">
                    {categoryContent[category.slug].intro}
                  </p>
                </section>

                {categoryContent[category.slug].comparisonSlugs.length > 0 && (
                  <section>
                    <h2 className="text-xl font-bold text-text mb-4">Compare Tools</h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {categoryContent[category.slug].comparisonSlugs.map((cs) => {
                        const comp = comparisons.find((c) => c.slug === cs);
                        if (!comp) return null;
                        return (
                          <Link
                            key={cs}
                            href={`/${cs}`}
                            className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary-500/30 hover:shadow-sm transition-all group"
                          >
                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 shrink-0">
                              <ArrowLeftRight className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-text group-hover:text-primary-600 transition-colors text-sm">{comp.name}</p>
                              <p className="text-xs text-text-secondary truncate">{comp.toolA.name} vs {comp.toolB.name}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                )}

                <section>
                  <h2 className="text-xl font-bold text-text mb-4">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {categoryContent[category.slug].faqs.map((faq, i) => (
                      <details key={i} className="group rounded-xl border border-border p-4 open:border-primary-500/30 transition-all">
                        <summary className="cursor-pointer text-sm font-medium text-text list-none flex items-center justify-between">
                          {faq.question}
                          <ChevronRight className="h-4 w-4 text-text-secondary shrink-0 transition-transform group-open:rotate-90" />
                        </summary>
                        <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                          {faq.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              </>
            )}

            <ToolGrid
              tools={toolCards}
              columns={2}
              variant="compact"
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
