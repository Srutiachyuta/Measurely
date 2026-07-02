"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./section-header";
import { Badge } from "@/components/ui/badge";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { getCategoryTheme } from "@/lib/card-theme";
import {
  TrendingUp,
  Heart,
  Calculator,
  DollarSign,
  BarChart3,
  ArrowRight,
  Sparkles,
  PiggyBank,
  House,
  Receipt,
} from "lucide-react";

const featuredCalculators = [
  {
    name: "EMI Calculator",
    slug: "emi-calculator",
    description: "Calculate monthly EMI, total interest payable, and payment schedule for loans with precise amortization tables.",
    formula: "EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)",
    icon: Calculator,
    categorySlug: "finance",
  },
  {
    name: "BMI Calculator",
    slug: "bmi-calculator",
    description: "Measure your Body Mass Index and get insights into your health category with personalized recommendations.",
    formula: "BMI = weight(kg) / height(m)²",
    icon: Heart,
    categorySlug: "health",
  },
  {
    name: "GST Calculator",
    slug: "gst-calculator",
    description: "Calculate GST inclusive and exclusive prices with support for multiple tax slabs and reverse calculations.",
    formula: "GST = Price × Rate / (100 + Rate)",
    icon: Calculator,
    categorySlug: "finance",
  },
  {
    name: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    description: "Project your investment growth with compound interest, factoring in monthly contributions and compounding frequency.",
    formula: "A = P(1 + r/n)^(nt)",
    icon: BarChart3,
    categorySlug: "finance",
  },
  {
    name: "SIP Calculator",
    slug: "sip-calculator",
    description: "Plan your mutual fund investments with our SIP calculator showing projected returns and wealth accumulation.",
    formula: "M = P × ((1 + i)^n - 1) / i × (1 + i)",
    icon: TrendingUp,
    categorySlug: "finance",
  },
  {
    name: "Loan Calculator",
    slug: "loan-calculator",
    description: "Compare different loan options with detailed amortization schedules and total cost analysis.",
    formula: "A = P × r(1 + r)^n / ((1 + r)^n - 1)",
    icon: DollarSign,
    categorySlug: "finance",
  },
  {
    name: "TFSA Contribution Room Calculator",
    slug: "tfsa-contribution-room-calculator-canada",
    description: "Calculate your available TFSA contribution room including annual limits, cumulative room, and remaining space.",
    formula: "Room = Σ Annual Limits - Contributions + Withdrawals",
    icon: PiggyBank,
    categorySlug: "finance",
  },
  {
    name: "Canada Mortgage Stress Test",
    slug: "canada-mortgage-stress-test-calculator",
    description: "Check if you qualify for a mortgage under Canada's stress test rules with GDS and TDS ratio calculations.",
    formula: "Qualifying Rate = max(Contract + 2%, 5.25%)",
    icon: House,
    categorySlug: "real-estate",
  },
  {
    name: "GST/HST Calculator Ontario",
    slug: "gst-hst-calculator-ontario",
    description: "Calculate Ontario HST (13%) — add or remove HST and see the GST and PST breakdown.",
    formula: "HST = Amount × 13% or Amount ÷ 1.13",
    icon: Receipt,
    categorySlug: "finance",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.25, 0, 1] as const },
  },
};

export function FeaturedCalculators() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Featured Calculators"
          description="Try our most powerful and popular calculators"
          viewAllHref="/calculators"
        />

        <ErrorBoundary fallback={
          <div className="text-center py-12">
            <p className="text-text-secondary">Browse our calculators below.</p>
          </div>
        }>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {featuredCalculators.map((calc) => {
              const theme = getCategoryTheme(calc.categorySlug);
              return (
                <motion.div key={calc.slug} variants={itemVariants}>
                  <Link href={`/${calc.slug}`} className="group block h-full">
                    <div
                      className={cn(
                        "relative h-full rounded-2xl border border-border/50",
                        "bg-white/70 dark:bg-dark-800/40 backdrop-blur-sm p-6",
                        "transition-all duration-400",
                        "hover:shadow-xl hover:-translate-y-1.5 hover:bg-white/90 dark:hover:bg-dark-800/60",
                        theme.borderGlow,
                        "overflow-hidden"
                      )}
                    >
                      {/* Glass overlay */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />

                      {/* Gradient corner decoration */}
                      <div
                        className={cn(
                          "absolute top-0 right-0 w-40 h-40 bg-gradient-to-br rounded-bl-[64px] opacity-[0.06] group-hover:opacity-[0.15] transition-opacity duration-500",
                          theme.iconGradient
                        )}
                      />

                      {/* Blur glow */}
                      <div
                        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-15 blur-3xl transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(circle, ${theme.color}, transparent)` }}
                      />

                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={cn(
                              "flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br text-white shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300",
                              theme.iconGradient
                            )}
                          >
                            <calc.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-text group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {calc.name}
                            </h3>
                            <Badge
                              variant="info"
                              size="sm"
                              className={cn(
                                "border font-medium",
                                theme.iconBg.replace("bg-", "bg-").replace("/10", "/15 dark:bg-").replace("/20", "/20"),
                                theme.textColor,
                                "border-current/20"
                              )}
                            >
                              Calculator
                            </Badge>
                          </div>
                        </div>

                        <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-1">
                          {calc.description}
                        </p>

                        <div className="p-3.5 rounded-xl bg-surface-secondary/70 dark:bg-dark-800/50 border border-border/40 mb-4 backdrop-blur-sm">
                          <div className="flex items-center gap-2">
                            <Sparkles className={cn("h-3 w-3", theme.textColor)} />
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary/60">Formula</span>
                          </div>
                          <code className={cn("block mt-1 text-xs font-mono leading-relaxed", theme.textColor)}>
                            {calc.formula}
                          </code>
                        </div>

                        <span className={cn(
                          "inline-flex items-center gap-2 self-start h-9 px-4 text-sm font-medium rounded-lg transition-all duration-200 group/btn",
                          "bg-gradient-to-r text-white shadow-sm hover:shadow-md",
                          theme.iconGradient
                        )}>
                          Try Now
                          <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </ErrorBoundary>
      </div>
    </section>
  );
}
