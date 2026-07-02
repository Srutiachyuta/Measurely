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
  Eye,
  BarChart3,
  Calculator,
  Percent,
  Heart,
  Clock,
  PiggyBank,
  DollarSign,
  HandCoins,
} from "lucide-react";

const trendingTools = [
  { name: "SIP Calculator", slug: "sip-calculator", icon: TrendingUp, category: "Finance", trend: "+28%", categorySlug: "finance" },
  { name: "BMI Calculator", slug: "bmi-calculator", icon: Heart, category: "Health", trend: "+22%", categorySlug: "health" },
  { name: "EMI Calculator", slug: "emi-calculator", icon: Calculator, category: "Finance", trend: "+18%", categorySlug: "finance" },
  { name: "Percentage Calculator", slug: "percentage-calculator", icon: Percent, category: "Math", trend: "+15%", categorySlug: "math" },
  { name: "Compound Interest", slug: "compound-interest-calculator", icon: BarChart3, category: "Finance", trend: "+12%", categorySlug: "finance" },
  { name: "Age Calculator", slug: "age-calculator", icon: Clock, category: "Time", trend: "+10%", categorySlug: "time" },
  { name: "TFSA Contribution Room", slug: "tfsa-contribution-room-calculator-canada", icon: PiggyBank, category: "Finance", trend: "+35%", categorySlug: "finance" },
  { name: "Ontario Take-Home Pay", slug: "ontario-take-home-pay-calculator-after-tax", icon: DollarSign, category: "Finance", trend: "+25%", categorySlug: "finance" },
  { name: "Ontario Severance Pay", slug: "ontario-severance-pay-calculator", icon: HandCoins, category: "Business", trend: "+18%", categorySlug: "business" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.4, ease: [0.25, 0.25, 0, 1] as const },
  },
};

export function TrendingTools() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Trending Now"
          description="Most popular tools among our users this week"
          badge="Trending"
          badgeVariant="warning"
        />

        <ErrorBoundary fallback={
          <div className="text-center py-12">
            <p className="text-text-secondary">Discover trending tools in our collection.</p>
          </div>
        }>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {trendingTools.map((tool) => {
              const theme = getCategoryTheme(tool.categorySlug);
              return (
                <motion.div key={tool.slug} variants={itemVariants}>
                  <Link href={`/${tool.slug}`} className="group block">
                    <div
                      className={cn(
                        "relative flex items-center gap-4 rounded-2xl border border-border/50",
                        "bg-white/70 dark:bg-dark-800/40 backdrop-blur-sm p-4",
                        "transition-all duration-400",
                        "hover:shadow-xl hover:-translate-y-1.5 hover:bg-white/90 dark:hover:bg-dark-800/60",
                        theme.borderGlow
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br text-white shadow-sm shrink-0 group-hover:scale-110 group-hover:shadow-md transition-all duration-300",
                          theme.iconGradient
                        )}
                      >
                        <tool.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-semibold text-text truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {tool.name}
                          </h3>
                          <Badge
                            variant="secondary"
                            size="sm"
                            className={cn(
                              "border font-medium shrink-0",
                              theme.iconBg.replace("bg-", "bg-").replace("/10", "/15 dark:bg-").replace("/20", "/20"),
                              theme.textColor,
                              "border-current/20"
                            )}
                          >
                            {tool.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Eye className="h-3 w-3 text-text-secondary/50" />
                          <span className="text-xs text-text-secondary">Trending this week</span>
                        </div>
                      </div>
                      <Badge variant="warning" size="sm" className="shrink-0 shadow-sm">
                        <TrendingUp className="h-3 w-3 mr-0.5" />
                        {tool.trend}
                      </Badge>
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
