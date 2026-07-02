import type { LucideIcon } from "lucide-react";
import { getSlugCategory } from "@/data/tool-registry";

export interface CategoryTheme {
  label: string;
  slug: string;
  color: string;
  lightBg: string;
  darkBg: string;
  gradientFrom: string;
  gradientTo: string;
  iconGradient: string;
  iconBg: string;
  borderGlow: string;
  shadowGlow: string;
  textColor: string;
}

export const categoryThemes: Record<string, CategoryTheme> = {
  finance: {
    label: "Finance Calculators",
    slug: "finance",
    color: "#3b82f6",
    lightBg: "from-blue-500/10 to-blue-600/5",
    darkBg: "from-blue-500/20 to-blue-600/10",
    gradientFrom: "from-blue-500",
    gradientTo: "to-blue-600",
    iconGradient: "from-blue-500 to-blue-600",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
    borderGlow: "hover:border-blue-500/30",
    shadowGlow: "hover:shadow-blue-500/10",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  health: {
    label: "Health Calculators",
    slug: "health",
    color: "#ec4899",
    lightBg: "from-pink-500/10 to-pink-600/5",
    darkBg: "from-pink-500/20 to-pink-600/10",
    gradientFrom: "from-pink-500",
    gradientTo: "to-pink-600",
    iconGradient: "from-pink-500 to-pink-600",
    iconBg: "bg-pink-500/10 dark:bg-pink-500/20",
    borderGlow: "hover:border-pink-500/30",
    shadowGlow: "hover:shadow-pink-500/10",
    textColor: "text-pink-600 dark:text-pink-400",
  },
  math: {
    label: "Math Calculators",
    slug: "math",
    color: "#8b5cf6",
    lightBg: "from-purple-500/10 to-purple-600/5",
    darkBg: "from-purple-500/20 to-purple-600/10",
    gradientFrom: "from-purple-500",
    gradientTo: "to-purple-600",
    iconGradient: "from-purple-500 to-purple-600",
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
    borderGlow: "hover:border-purple-500/30",
    shadowGlow: "hover:shadow-purple-500/10",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  time: {
    label: "Time Calculators",
    slug: "time",
    color: "#14b8a6",
    lightBg: "from-teal-500/10 to-teal-600/5",
    darkBg: "from-teal-500/20 to-teal-600/10",
    gradientFrom: "from-teal-500",
    gradientTo: "to-teal-600",
    iconGradient: "from-teal-500 to-teal-600",
    iconBg: "bg-teal-500/10 dark:bg-teal-500/20",
    borderGlow: "hover:border-teal-500/30",
    shadowGlow: "hover:shadow-teal-500/10",
    textColor: "text-teal-600 dark:text-teal-400",
  },
  engineering: {
    label: "Engineering Calculators",
    slug: "engineering",
    color: "#f97316",
    lightBg: "from-orange-500/10 to-orange-600/5",
    darkBg: "from-orange-500/20 to-orange-600/10",
    gradientFrom: "from-orange-500",
    gradientTo: "to-orange-600",
    iconGradient: "from-orange-500 to-orange-600",
    iconBg: "bg-orange-500/10 dark:bg-orange-500/20",
    borderGlow: "hover:border-orange-500/30",
    shadowGlow: "hover:shadow-orange-500/10",
    textColor: "text-orange-600 dark:text-orange-400",
  },
  construction: {
    label: "Construction Calculators",
    slug: "construction",
    color: "#f59e0b",
    lightBg: "from-amber-500/10 to-amber-600/5",
    darkBg: "from-amber-500/20 to-amber-600/10",
    gradientFrom: "from-amber-500",
    gradientTo: "to-amber-600",
    iconGradient: "from-amber-500 to-amber-600",
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
    borderGlow: "hover:border-amber-500/30",
    shadowGlow: "hover:shadow-amber-500/10",
    textColor: "text-amber-600 dark:text-amber-400",
  },
  "everyday-life": {
    label: "Everyday Life Calculators",
    slug: "everyday-life",
    color: "#22c55e",
    lightBg: "from-green-500/10 to-green-600/5",
    darkBg: "from-green-500/20 to-green-600/10",
    gradientFrom: "from-green-500",
    gradientTo: "to-green-600",
    iconGradient: "from-green-500 to-green-600",
    iconBg: "bg-green-500/10 dark:bg-green-500/20",
    borderGlow: "hover:border-green-500/30",
    shadowGlow: "hover:shadow-green-500/10",
    textColor: "text-green-600 dark:text-green-400",
  },
  "real-estate": {
    label: "Real Estate Calculators",
    slug: "real-estate",
    color: "#0ea5e9",
    lightBg: "from-sky-500/10 to-sky-600/5",
    darkBg: "from-sky-500/20 to-sky-600/10",
    gradientFrom: "from-sky-500",
    gradientTo: "to-sky-600",
    iconGradient: "from-sky-500 to-sky-600",
    iconBg: "bg-sky-500/10 dark:bg-sky-500/20",
    borderGlow: "hover:border-sky-500/30",
    shadowGlow: "hover:shadow-sky-500/10",
    textColor: "text-sky-600 dark:text-sky-400",
  },
  retirement: {
    label: "Retirement Calculators",
    slug: "retirement",
    color: "#64748b",
    lightBg: "from-slate-500/10 to-slate-600/5",
    darkBg: "from-slate-500/20 to-slate-600/10",
    gradientFrom: "from-slate-500",
    gradientTo: "to-slate-600",
    iconGradient: "from-slate-500 to-slate-600",
    iconBg: "bg-slate-500/10 dark:bg-slate-500/20",
    borderGlow: "hover:border-slate-500/30",
    shadowGlow: "hover:shadow-slate-500/10",
    textColor: "text-slate-600 dark:text-slate-400",
  },
  automotive: {
    label: "Automotive Calculators",
    slug: "automotive",
    color: "#ef4444",
    lightBg: "from-red-500/10 to-red-600/5",
    darkBg: "from-red-500/20 to-red-600/10",
    gradientFrom: "from-red-500",
    gradientTo: "to-red-600",
    iconGradient: "from-red-500 to-red-600",
    iconBg: "bg-red-500/10 dark:bg-red-500/20",
    borderGlow: "hover:border-red-500/30",
    shadowGlow: "hover:shadow-red-500/10",
    textColor: "text-red-600 dark:text-red-400",
  },
  "social-media": {
    label: "Social Media Calculators",
    slug: "social-media",
    color: "#8b5cf6",
    lightBg: "from-violet-500/10 to-violet-600/5",
    darkBg: "from-violet-500/20 to-violet-600/10",
    gradientFrom: "from-violet-500",
    gradientTo: "to-violet-600",
    iconGradient: "from-violet-500 to-violet-600",
    iconBg: "bg-violet-500/10 dark:bg-violet-500/20",
    borderGlow: "hover:border-violet-500/30",
    shadowGlow: "hover:shadow-violet-500/10",
    textColor: "text-violet-600 dark:text-violet-400",
  },
  business: {
    label: "Business Calculators",
    slug: "business",
    color: "#10b981",
    lightBg: "from-emerald-500/10 to-emerald-600/5",
    darkBg: "from-emerald-500/20 to-emerald-600/10",
    gradientFrom: "from-emerald-500",
    gradientTo: "to-emerald-600",
    iconGradient: "from-emerald-500 to-emerald-600",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    borderGlow: "hover:border-emerald-500/30",
    shadowGlow: "hover:shadow-emerald-500/10",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
};

export function getCategoryTheme(categorySlug: string): CategoryTheme {
  return categoryThemes[categorySlug] ?? {
    label: "Tools",
    slug: categorySlug,
    color: "#6366f1",
    lightBg: "from-primary-500/10 to-primary-600/5",
    darkBg: "from-primary-500/20 to-primary-600/10",
    gradientFrom: "from-primary-500",
    gradientTo: "to-primary-600",
    iconGradient: "from-primary-500 to-primary-600",
    iconBg: "bg-primary-500/10 dark:bg-primary-500/20",
    borderGlow: "hover:border-primary-500/30",
    shadowGlow: "hover:shadow-primary-500/10",
    textColor: "text-primary-600 dark:text-primary-400",
  };
}

export function getCategoryColor(categorySlug: string): string {
  return categoryThemes[categorySlug]?.color ?? "#6366f1";
}

export function slugToCategorySlug(slug: string): string {
  return getSlugCategory(slug);
}
