import { calculators } from "@/data/calculators"
import { blogs } from "@/data/blogs"
import { comparisons } from "@/data/comparisons"
import { CATEGORIES } from "@/lib/constants"
import type { BlogPost } from "@/types"
import type { CalculatorDefinition } from "@/types/calculators"

interface GeneratedContent {
  slug: string
  type: "tool" | "article" | "category" | "comparison"
  breadcrumbs: { label: string; href?: string }[]
  schemaType: string
  sitemapPriority: string
  sitemapChangeFreq: string
  openGraph: {
    title: string
    description: string
    type: string
  }
  twitterCard: {
    title: string
    description: string
  }
  relatedTools: string[]
  relatedArticles: string[]
}

export function generateToolContent(slug: string): GeneratedContent | null {
  const tool = calculators.find((c) => c.slug === slug)
  if (!tool) return null

  const category = CATEGORIES.find((c) => c.slug === tool.category)
  const categoryName = category?.name || tool.category

  return {
    slug: tool.slug,
    type: "tool",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Calculators", href: "/calculators" },
      { label: categoryName, href: `/${tool.category}` },
      { label: tool.name },
    ],
    schemaType: "WebApplication",
    sitemapPriority: "0.7",
    sitemapChangeFreq: "monthly",
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      type: "website",
    },
    twitterCard: {
      title: tool.metaTitle,
      description: tool.metaDescription,
    },
    relatedTools: tool.relatedSlugs,
    relatedArticles: blogs
      .filter((b) => b.relatedTools?.some((t) => t.slug === tool.slug))
      .map((b) => b.slug),
  }
}

export function generateArticleContent(slug: string): GeneratedContent | null {
  const article = blogs.find((b) => b.slug === slug)
  if (!article) return null

  return {
    slug: article.slug,
    type: "article",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: article.category, href: `/${article.categorySlug}` },
      { label: article.title },
    ],
    schemaType: "BlogPosting",
    sitemapPriority: "0.8",
    sitemapChangeFreq: "monthly",
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
    },
    twitterCard: {
      title: article.metaTitle,
      description: article.metaDescription,
    },
    relatedTools: (article.relatedTools || []).map((t) => t.slug),
    relatedArticles: article.relatedSlugs,
  }
}

export function generateCategoryContent(slug: string): GeneratedContent | null {
  const category = CATEGORIES.find((c) => c.slug === slug)
  if (!category) return null

  const categoryTools = calculators.filter((c) => c.category === slug)

  return {
    slug: category.slug,
    type: "category",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Categories", href: "/categories" },
      { label: category.name },
    ],
    schemaType: "CollectionPage",
    sitemapPriority: "0.8",
    sitemapChangeFreq: "weekly",
    openGraph: {
      title: `${category.name} | Measurely`,
      description: category.description,
      type: "website",
    },
    twitterCard: {
      title: `${category.name} | Measurely`,
      description: category.description,
    },
    relatedTools: categoryTools.map((c) => c.slug),
    relatedArticles: [],
  }
}

export function generateComparisonContent(slug: string): GeneratedContent | null {
  const comparison = comparisons.find((c) => c.slug === slug)
  if (!comparison) return null

  return {
    slug: comparison.slug,
    type: "comparison",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Compare", href: "/compare" },
      { label: comparison.name },
    ],
    schemaType: "WebPage",
    sitemapPriority: "0.7",
    sitemapChangeFreq: "monthly",
    openGraph: {
      title: comparison.metaTitle,
      description: comparison.metaDescription,
      type: "website",
    },
    twitterCard: {
      title: comparison.metaTitle,
      description: comparison.metaDescription,
    },
    relatedTools: comparison.relatedSlugs,
    relatedArticles: [],
  }
}

export function getSuggestedRelatedTools(
  slug: string,
  category: string,
  maxCount: number = 4
): string[] {
  const sameCategory = calculators.filter(
    (c) => c.category === category && c.slug !== slug
  )
  return sameCategory.slice(0, maxCount).map((c) => c.slug)
}

export function getSuggestedRelatedArticles(
  toolSlug: string,
  category: string,
  maxCount: number = 3
): string[] {
  const catBlogSlugs: Record<string, string> = {
    finance: "finance",
    health: "health",
    math: "math",
    engineering: "engineering",
    construction: "construction",
    "everyday-life": "daily-life",
    "real-estate": "real-estate",
    retirement: "retirement",
    automotive: "automotive",
    "social-media": "social-media",
    business: "business",
  }

  const blogCat = catBlogSlugs[category]
  if (!blogCat) return []

  return blogs
    .filter((b) => b.categorySlug === blogCat && b.slug !== toolSlug)
    .slice(0, maxCount)
    .map((b) => b.slug)
}

export function preventDuplicateContent(
  existingSlugs: string[],
  newSlug: string
): boolean {
  return existingSlugs.includes(newSlug)
}

export function generateSitemapEntry(
  slug: string,
  priority: string,
  changefreq: string
): string {
  return `  <url>
    <loc>https://measurely.in/${slug}</loc>
    <priority>${priority}</priority>
    <changefreq>${changefreq}</changefreq>
  </url>`
}

export function generateRssEntry(
  title: string,
  slug: string,
  date: string,
  description: string
): string {
  return `  <item>
    <title>${title}</title>
    <link>https://measurely.in/${slug}</link>
    <pubDate>${new Date(date).toUTCString()}</pubDate>
    <description>${description}</description>
  </item>`
}
