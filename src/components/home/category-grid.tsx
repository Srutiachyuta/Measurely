"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";
import { SectionHeader } from "./section-header";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { getCategoryTheme } from "@/lib/card-theme";
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
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Heart, Sigma, ArrowLeftRight, Clock, GraduationCap,
  Cpu, Hammer, Sparkles, Home, PiggyBank, Car, BarChart3,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.25, 0, 1] as const },
  },
};

export function CategoryGrid({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section className="py-20 sm:py-28 bg-surface-secondary/30 dark:bg-dark-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <SectionHeader
            title="Browse by Category"
            description="Find the right tool for any task, organized by category"
            viewAllHref="/categories"
          />
        )}

        <ErrorBoundary fallback={
          <div className="text-center py-12">
            <p className="text-text-secondary">Browse our tool categories below.</p>
          </div>
        }>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
          >
            {CATEGORIES.map((category) => {
              const Icon = iconMap[category.icon] || Sparkles;
              const theme = getCategoryTheme(category.slug);
              return (
                <motion.div key={category.slug} variants={itemVariants}>
                  <Link
                    href={`/${category.slug}`}
                    className="group block h-full"
                  >
                    <div
                      className={cn(
                        "relative h-full overflow-hidden rounded-2xl border border-border/50",
                        "bg-white/70 dark:bg-dark-800/40 backdrop-blur-sm p-6 transition-all duration-400",
                        "hover:shadow-xl hover:-translate-y-2 hover:bg-white/90 dark:hover:bg-dark-800/60",
                        theme.borderGlow
                      )}
                    >
                      {/* Glassmorphism overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/5 dark:from-white/5 dark:to-transparent pointer-events-none" />

                      {/* Colored gradient accent top */}
                      <div
                        className={cn(
                          "absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                          theme.iconGradient
                        )}
                      />

                      {/* Glow effect on hover */}
                      <div
                        className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-0 group-hover:opacity-20 blur-3xl transition-all duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(circle, ${theme.color}, transparent)` }}
                      />

                      <div className="relative z-10 flex flex-col h-full">
                        {/* Icon and arrow */}
                        <div className="flex items-center justify-between mb-5">
                          <div
                            className={cn(
                              "flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br text-white shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300",
                              theme.iconGradient
                            )}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-secondary/50 dark:bg-dark-800/50 group-hover:bg-white/80 transition-all duration-300 group-hover:shadow-sm">
                            <ArrowRight className={cn("h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5", theme.textColor)} />
                          </div>
                        </div>

                        {/* Content */}
                        <h3 className={cn(
                          "text-lg font-semibold mb-1.5 transition-colors group-hover:text-primary-600 dark:group-hover:text-primary-400",
                          theme.textColor
                        )}>
                          {category.name}
                        </h3>
                        <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2 flex-1">
                          {category.description}
                        </p>

                        {/* Bottom stats */}
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 text-xs font-medium",
                            theme.textColor
                          )}>
                            <span className={cn("w-1.5 h-1.5 rounded-full", theme.textColor.replace("text-", "bg-"))} />
                            {category.tools.length} tools
                          </span>
                          <span className="text-xs text-muted">
                            Calculators & Converters
                          </span>
                        </div>
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
