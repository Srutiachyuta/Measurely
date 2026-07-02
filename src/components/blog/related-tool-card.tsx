"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, TrendingUp, Heart, Sigma, ArrowLeftRight, Clock, Cpu, Hammer, Sparkles, Home, PiggyBank, Car, BarChart3, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getBlogCategoryColor } from "@/lib/recommendations";
import { getSlugCategory } from "@/data/tool-registry";
import { getCategoryTheme } from "@/lib/card-theme";
import type { RelatedToolItem } from "@/lib/recommendations";

const iconMap: Record<string, LucideIcon> = {
  Calculator,
  TrendingUp,
  Heart,
  Sigma,
  ArrowLeftRight,
  Clock,
  Cpu,
  Hammer,
  Sparkles,
  Home,
  PiggyBank,
  Car,
  BarChart3,
};

interface RelatedToolCardProps {
  tool: RelatedToolItem;
  index: number;
}

export function RelatedToolCard({ tool, index }: RelatedToolCardProps) {
  const Icon = iconMap[tool.icon] ?? Calculator;
  const categorySlug = getSlugCategory(tool.slug);
  const theme = getCategoryTheme(categorySlug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        href={`/${tool.slug}`}
        className={cn(
          "group block rounded-2xl border border-border/60 bg-surface p-5 transition-all duration-300 h-full",
          theme.borderGlow,
          "hover:shadow-elevation-md hover:-translate-y-0.5"
        )}
      >
        <div className="flex items-start gap-4 mb-3">
          <div className={cn(
            "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
            theme.iconGradient
          )}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-text line-clamp-1 group-hover:text-primary-600 transition-colors">
              {tool.name}
            </h3>
            <span className={cn("text-xs font-medium capitalize", theme.textColor)}>
              {categorySlug.replace(/-/g, " ")}
            </span>
          </div>
        </div>
        <p className="text-sm text-text-secondary line-clamp-2 mb-4">
          {tool.description}
        </p>
        <div className="flex items-center justify-between">
          <span className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300",
            "bg-surface-secondary dark:bg-dark-800 text-text-secondary group-hover:bg-primary-500/10 group-hover:text-primary-600 dark:group-hover:text-primary-400"
          )}>
            Use Tool
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
