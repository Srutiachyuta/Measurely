"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";
import { ToolCard } from "./tool-card";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { calculators } from "@/data/calculators";
import { getIconName } from "@/data/tool-registry";

const RECENT_COUNT = 12;

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
};

const STUDENT_LOAN_ENTRY = {
  name: "Student Loan Repayment Calculator",
  slug: "student-loan-repayment-calculator",
  category: "Finance",
  categorySlug: "finance",
  icon: "GraduationCap",
  description: "Estimate monthly payments, total interest, IBR, and forgiveness for student loans.",
};

const recentTools = (() => {
  const calcItems = calculators.map((c) => ({
    name: c.name,
    slug: c.slug,
    category: getCategoryDisplay(c.category),
    categorySlug: c.category,
    icon: getIconName(c.icon),
    description: c.description,
  })).reverse();
  const sliced = calcItems.slice(0, RECENT_COUNT - 2);
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
    <section className="relative overflow-hidden py-20 sm:py-28 bg-gradient-to-br from-primary-500/[0.03] via-accent-cyan/[0.02] to-purple-500/[0.03] dark:from-primary-500/[0.05] dark:via-accent-cyan/[0.03] dark:to-purple-500/[0.05]">
      <div className="absolute top-1/3 -left-32 w-72 h-72 bg-primary-500/10 dark:bg-primary-500/15 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDuration: "10s" }} />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-accent-cyan/10 dark:bg-accent-cyan/15 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDuration: "8s", animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/8 dark:bg-purple-500/12 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDuration: "12s", animationDelay: "1s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={<span className="text-gradient-cyan">Recently Added</span>}
          description="New tools we have added to our collection"
          badge="New"
          badgeVariant="gradient"
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
