import type { BlogPost } from "@/types";
import type { CalculatorDefinition } from "@/types/calculators";
import type { ConverterDefinition } from "@/types/converters";
import { calculators } from "@/data/calculators";
import { converters } from "@/data/converters";

const BLOG_CATEGORY_TO_TOOL_CATEGORY: Record<string, string> = {
  engineering: "engineering",
  construction: "construction",
  "real-estate": "real-estate",
  "daily-life": "everyday-life",
  finance: "finance",
  health: "health",
  math: "math",
  "unit-conversion": "unit-converters",
  education: "",
  automotive: "automotive",
  business: "business",
  "social-media": "social-media",
  retirement: "retirement",
};

function tagSimilarity(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const setB = new Set(b.map((t) => t.toLowerCase()));
  const intersection = a.filter((t) => setB.has(t.toLowerCase())).length;
  const union = new Set([...a.map((t) => t.toLowerCase()), ...b.map((t) => t.toLowerCase())]).size;
  return intersection / union;
}

function keywordSimilarity(a: string[], b: string[]): number {
  const setB = new Set(b.map((k) => k.toLowerCase()));
  const intersection = a.filter((k) => setB.has(k.toLowerCase())).length;
  if (intersection === 0) return 0;
  return intersection / Math.max(a.length, b.length);
}

function textSimilarity(text: string, targets: string[]): number {
  const words = text.toLowerCase().split(/\s+/);
  const wordSet = new Set(words.filter((w) => w.length > 3));
  if (wordSet.size === 0) return 0;
  let score = 0;
  for (const target of targets) {
    const targetWords = target.toLowerCase().split(/\s+/);
    const matchCount = targetWords.filter((w) => wordSet.has(w)).length;
    score += matchCount / targetWords.length;
  }
  return score / targets.length;
}

function scoreArticle(post: BlogPost, current: BlogPost): number {
  let score = 0;
  if (post.categorySlug === current.categorySlug) score += 10;
  score += tagSimilarity(current.tags, post.tags) * 5;
  score += keywordSimilarity(current.keywords, post.keywords) * 4;
  score += textSimilarity(current.title, [post.title, post.excerpt]) * 3;
  score += textSimilarity(current.excerpt, [post.title, post.excerpt]) * 2;
  return score;
}

export function getRelatedArticles(
  current: BlogPost,
  allBlogs: BlogPost[],
  count: number = 6
): BlogPost[] {
  const scored = allBlogs
    .filter((p) => p.slug !== current.slug)
    .map((p) => ({ post: p, score: scoreArticle(p, current) }));

  scored.sort((a, b) => b.score - a.score);

  const picked = new Set<string>();
  const related: BlogPost[] = [];

  for (const item of scored) {
    if (related.length >= count) break;
    if (picked.has(item.post.slug)) continue;
    picked.add(item.post.slug);
    related.push(item.post);
  }

  if (related.length < count) {
    const fallbacks = allBlogs
      .filter((p) => p.slug !== current.slug && !picked.has(p.slug))
      .sort((a, b) => {
        if (a.popular !== b.popular) return a.popular ? -1 : 1;
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });

    for (const fb of fallbacks) {
      if (related.length >= count) break;
      if (picked.has(fb.slug)) continue;
      picked.add(fb.slug);
      related.push(fb);
    }
  }

  return related;
}

function scoreToolForBlog(
  tool: { name: string; slug: string; category: string; description: string; keywords?: string[] },
  current: BlogPost
): number {
  const toolCat = BLOG_CATEGORY_TO_TOOL_CATEGORY[current.categorySlug];
  let score = 0;
  if (tool.category === toolCat) score += 10;
  if (toolCat && tool.category === toolCat) score += 5;
  score += keywordSimilarity(current.keywords, tool.keywords || []) * 3;
  score += textSimilarity(current.title, [tool.name, tool.description]) * 2;
  if (current.relatedTools?.some((rt) => rt.slug === tool.slug)) score += 8;
  return score;
}

export interface RelatedToolItem {
  name: string;
  slug: string;
  description: string;
  category: string;
  icon: string;
  isCalculator: boolean;
  isConverter: boolean;
}

export function getRelatedTools(
  current: BlogPost,
  count: number = 6
): RelatedToolItem[] {
  const allTools: (RelatedToolItem & { category: string; keywords?: string[] })[] = [
    ...calculators.map((c) => ({
      name: c.name,
      slug: c.slug,
      description: c.description,
      category: c.category,
      icon: c.icon.displayName || "Calculator",
      keywords: [c.name, ...c.description.split(" ").slice(0, 10)],
      isCalculator: true,
      isConverter: false,
    })),
    ...converters.map((c) => ({
      name: c.name,
      slug: c.slug,
      description: c.description,
      category: "unit-converters",
      icon: c.icon.displayName || "ArrowLeftRight",
      keywords: [c.name, ...c.description.split(" ").slice(0, 10)],
      isCalculator: false,
      isConverter: true,
    })),
  ];

  const scored = allTools.map((t) => ({
    tool: t,
    score: scoreToolForBlog(t, current),
  }));

  scored.sort((a, b) => b.score - a.score);

  const picked = new Set<string>();
  const related: RelatedToolItem[] = [];

  for (const item of scored) {
    if (related.length >= count) break;
    if (picked.has(item.tool.slug)) continue;
    picked.add(item.tool.slug);
    related.push(item.tool);
  }

  if (related.length < count) {
    for (const t of allTools) {
      if (related.length >= count) break;
      if (picked.has(t.slug)) continue;
      picked.add(t.slug);
      related.push(t);
    }
  }

  return related;
}

export function getBlogCategoryColor(categorySlug: string): string {
  const colors: Record<string, string> = {
    engineering: "#f97316",
    construction: "#f59e0b",
    "real-estate": "#0ea5e9",
    "daily-life": "#22c55e",
    finance: "#3b82f6",
    health: "#ec4899",
    math: "#8b5cf6",
    "unit-conversion": "#06b6d4",
    education: "#6366f1",
    automotive: "#ef4444",
    business: "#10b981",
    "social-media": "#8b5cf6",
    retirement: "#64748b",
  };
  return colors[categorySlug] ?? "#6366f1";
}
