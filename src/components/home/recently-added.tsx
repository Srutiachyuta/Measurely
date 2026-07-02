"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";
import { ToolCard } from "./tool-card";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { calculators } from "@/data/calculators";
import { converters } from "@/data/converters";
import { getIconName } from "@/data/tool-registry";

const RECENT_COUNT = 10;

const categoryDisplay: Record<string, string> = {
  finance: "Finance",
  health: "Health",
  math: "Math",
  time: "Time",
  engineering: "Engineering",
  construction: "Construction",
  "everyday-life": "Daily Life",
  "real-estate": "Real Estate",
  retirement: "Retirement",
  automotive: "Automotive",
  "social-media": "Social Media",
  business: "Business",
  "unit-converters": "Unit Conversion",
};

function getCategoryDisplay(category: string): string {
  return categoryDisplay[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

const HOME_EQUITY_ENTRY = {
  name: "Home Equity Loan Calculator",
  slug: "home-equity-loan-calculator",
  category: "Real Estate",
  categorySlug: "real-estate",
  icon: "House",
  description: "Estimate your available home equity, maximum borrowing amount, and monthly payments for a home equity loan.",
  isNew: true,
};

const STUDENT_LOAN_ENTRY = {
  name: "Student Loan Repayment Calculator",
  slug: "student-loan-repayment-calculator",
  category: "Finance",
  categorySlug: "finance",
  icon: "GraduationCap",
  description: "Estimate monthly payments, total interest, IBR, and forgiveness for student loans.",
  isNew: true,
};

const recentTools = (() => {
  const calcItems = calculators.map((c) => ({
    name: c.name,
    slug: c.slug,
    category: getCategoryDisplay(c.category),
    categorySlug: c.category,
    icon: getIconName(c.icon),
    description: c.description,
    isNew: true,
  })).reverse();
  const convItems = converters.map((c) => ({
    name: c.name,
    slug: c.slug,
    category: "Unit Conversion",
    categorySlug: "unit-converters",
    icon: getIconName(c.icon),
    description: c.description,
    isNew: true,
  })).reverse();
  const interleaved: any[] = [];
  let ci = 0, vi = 0;
  while (ci < calcItems.length || vi < convItems.length) {
    if (ci < calcItems.length) interleaved.push(calcItems[ci++]);
    if (vi < convItems.length) interleaved.push(convItems[vi++]);
  }
  const sliced = interleaved.slice(0, RECENT_COUNT - 2);
  return [HOME_EQUITY_ENTRY, STUDENT_LOAN_ENTRY, ...sliced];
})();

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.25, 0, 1] as const },
  },
};

export function RecentlyAdded() {
  return (
    <section className="py-20 sm:py-28 bg-surface-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Recently Added"
          description="New tools we have added to our collection"
          badge="New"
          badgeVariant="success"
        />

        <ErrorBoundary fallback={
          <div className="text-center py-12">
            <p className="text-text-secondary">Explore the newest tools in our collection.</p>
          </div>
        }>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {recentTools.map((tool) => (
            <motion.div key={tool.slug} variants={itemVariants}>
              <ToolCard {...tool} />
            </motion.div>
          ))}
        </motion.div>
        </ErrorBoundary>
      </div>
    </section>
  );
}
