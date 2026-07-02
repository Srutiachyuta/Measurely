import type { LucideIcon } from "lucide-react";
import { calculators } from "./calculators";

export interface CategoryToolEntry {
  name: string;
  slug: string;
  icon: string;
  description: string;
  isCalculator: boolean;
  isConverter: boolean;
  usageCount?: string;
}

export interface CategoryEntry {
  name: string;
  slug: string;
  icon: string;
  description: string;
  tools: CategoryToolEntry[];
}

const CATEGORY_DISPLAY: Record<string, { name: string; icon: string; description: string }> = {
  finance: { name: "Finance Calculators", icon: "TrendingUp", description: "Financial planning, loans, investments, and tax calculators" },
  health: { name: "Health Calculators", icon: "Heart", description: "Health, fitness, and wellness calculators" },
  math: { name: "Math Calculators", icon: "Sigma", description: "Mathematical problem-solving tools" },
  time: { name: "Time Calculators", icon: "Clock", description: "Date and time calculation tools" },
  engineering: { name: "Engineering Calculators", icon: "Cpu", description: "Engineering and physics calculation tools" },
  construction: { name: "Construction Calculators", icon: "Hammer", description: "Construction and home improvement calculators" },
  "everyday-life": { name: "Everyday Life Calculators", icon: "Sparkles", description: "Practical tools for daily life calculations" },
  "real-estate": { name: "Real Estate Calculators", icon: "Home", description: "Property and mortgage calculators" },
  retirement: { name: "Retirement Calculators", icon: "PiggyBank", description: "Retirement planning and savings tools" },
  automotive: { name: "Automotive Calculators", icon: "Car", description: "Vehicle-related calculation tools" },
  "social-media": { name: "Social Media Calculators", icon: "BarChart3", description: "Social media analytics and planning tools" },
  business: { name: "Business Calculators", icon: "TrendingUp", description: "Business and entrepreneurship calculators" },
};

export function getIconName(icon: LucideIcon): string {
  return icon.displayName || "Calculator";
}

const allCalculatorEntries: CategoryToolEntry[] = calculators.map((c) => ({
  name: c.name,
  slug: c.slug,
  icon: getIconName(c.icon),
  description: c.description,
  isCalculator: true,
  isConverter: false,
}));

export const ALL_TOOLS: CategoryToolEntry[] = [...allCalculatorEntries];

export const ALL_CATEGORIES: CategoryEntry[] = buildCategories();

function buildCategories(): CategoryEntry[] {
  const catMap = new Map<string, CategoryToolEntry[]>();

  for (const c of calculators) {
    const slug = c.category || "finance";
    if (!catMap.has(slug)) catMap.set(slug, []);
    catMap.get(slug)!.push({
      name: c.name,
      slug: c.slug,
      icon: getIconName(c.icon),
      description: c.description,
      isCalculator: true,
      isConverter: false,
    });
  }

  const categories: CategoryEntry[] = [];
  for (const [slug, tools] of catMap) {
    const display = CATEGORY_DISPLAY[slug] || {
      name: slug.charAt(0).toUpperCase() + slug.slice(1) + " Calculators",
      icon: "Calculator",
      description: `${slug.charAt(0).toUpperCase() + slug.slice(1)} calculators and tools`,
    };
    categories.push({
      name: display.name,
      slug,
      icon: display.icon,
      description: display.description,
      tools,
    });
  }

  return categories.sort((a, b) => {
    const order = ["finance", "health", "math", "time", "engineering", "construction", "everyday-life", "real-estate", "retirement", "automotive", "social-media", "business"];
    return order.indexOf(a.slug) - order.indexOf(b.slug);
  });
}

export const REDIRECT_SLUGS: string[] = [];

const slugCategoryCache = new Map<string, string>();
for (const c of calculators) {
  slugCategoryCache.set(c.slug, c.category || "finance");
}

export function getSlugCategory(slug: string): string {
  return slugCategoryCache.get(slug) || "finance";
}

const iconNameCache = new Map<string, string>();
for (const c of calculators) {
  iconNameCache.set(c.slug, getIconName(c.icon));
}

export function getToolIconName(slug: string): string {
  return iconNameCache.get(slug) || "Calculator";
}
