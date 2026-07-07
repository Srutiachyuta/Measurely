"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";
import { ToolCard } from "./tool-card";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { calculators } from "@/data/calculators";
import { getIconName } from "@/data/tool-registry";

const RECENT_COUNT = 16;

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

const ROTH_CONVERSION_ENTRY = {
  name: "Roth Conversion Tax Calculator",
  slug: "roth-conversion-tax-calculator",
  category: "Finance",
  categorySlug: "finance",
  icon: "Percent",
  description: "Estimate federal and state tax due on a Roth IRA conversion, lifetime tax savings, break-even period, and retirement withdrawal comparison.",
};

const HSA_ENTRY = {
  name: "HSA Tax Savings Calculator",
  slug: "hsa-tax-savings-calculator",
  category: "Finance",
  categorySlug: "finance",
  icon: "Heart",
  description: "Estimate federal, state, and FICA tax savings from Health Savings Account contributions with investment growth projections.",
};

const SALARY_SACRIFICE_ENTRY = {
  name: "Salary Sacrifice Calculator",
  slug: "salary-sacrifice-calculator",
  category: "Finance",
  categorySlug: "finance",
  icon: "PiggyBank",
  description: "Estimate your UK tax and National Insurance savings from salary sacrifice arrangements including pension, EV, and cycle to work.",
};

const EMERGENCY_FUND_ENTRY = {
  name: "Emergency Fund Calculator",
  slug: "emergency-fund-calculator",
  category: "Finance",
  categorySlug: "finance",
  icon: "Shield",
  description: "Determine your ideal emergency fund based on monthly expenses, income stability, and risk profile with milestone tracking.",
};

const CD_LADDER_ENTRY = {
  name: "CD Ladder Calculator",
  slug: "cd-ladder-calculator",
  category: "Finance",
  categorySlug: "finance",
  icon: "Layers",
  description: "Build an optimized CD ladder strategy to maximize returns while maintaining liquidity with staggered maturity dates.",
};

const HARDCODED_SLUGS = new Set([
  ROTH_CONVERSION_ENTRY.slug,
  HSA_ENTRY.slug,
  SALARY_SACRIFICE_ENTRY.slug,
  EMERGENCY_FUND_ENTRY.slug,
  CD_LADDER_ENTRY.slug,
]);

const recentTools = (() => {
  const seen = new Set<string>(HARDCODED_SLUGS);
  const calcItems = calculators.map((c) => ({
    name: c.name,
    slug: c.slug,
    category: getCategoryDisplay(c.category),
    categorySlug: c.category,
    icon: getIconName(c.icon),
    description: c.description,
  })).reverse().filter((c) => {
    if (seen.has(c.slug)) return false;
    seen.add(c.slug);
    return true;
  });
  const sliced = calcItems.slice(0, RECENT_COUNT - 5);
  return [ROTH_CONVERSION_ENTRY, HSA_ENTRY, SALARY_SACRIFICE_ENTRY, EMERGENCY_FUND_ENTRY, CD_LADDER_ENTRY, ...sliced];
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
