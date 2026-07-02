import { calculators } from "@/data/calculators";
import { blogs } from "@/data/blogs";
import { getSlugCategory } from "@/data/tool-registry";
import type { CalculatorDefinition } from "@/types/calculators";
import type { BlogPost } from "@/types";

const CATEGORY_TO_BLOG: Record<string, string> = {
  "everyday-life": "daily-life",
  time: "",
};

function toolCategoryToBlogCategory(toolCat: string): string {
  return CATEGORY_TO_BLOG[toolCat] ?? toolCat;
}

function deterministicShuffle<T>(items: T[], seed: string): T[] {
  const arr = [...items];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  const scored = arr.map((item, index) => ({
    item,
    score: ((hash * 31 + index * 17 + seed.charCodeAt(index % seed.length || 1)) | 0) % 10000,
  }));
  scored.sort((a, b) => a.score - b.score);
  return scored.map(({ item }) => item);
}

export function getRelatedToolsByCategory(
  slug: string,
  maxCount = 8
): CalculatorDefinition[] {
  const category = getSlugCategory(slug);
  const sameCat = calculators.filter(
    (c) => c.slug !== slug && c.category === category
  );
  return deterministicShuffle(sameCat, slug).slice(0, maxCount);
}

export function getRelatedArticlesByCategory(
  slug: string,
  maxCount = 6
): BlogPost[] {
  const category = getSlugCategory(slug);
  const blogCat = toolCategoryToBlogCategory(category);
  if (!blogCat) return [];
  const matching = blogs.filter((b) => b.categorySlug === blogCat);
  return deterministicShuffle(matching, slug + "-articles").slice(0, maxCount);
}
