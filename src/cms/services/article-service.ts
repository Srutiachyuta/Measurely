import type { CmsArticle } from "@/cms/types"
import type { ContentBlock } from "@/cms/types/content"
import { readJsonFile, writeJsonFile } from "@/cms/lib/api"

const ARTICLES_FILE = "articles.json"

export interface ArticleFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  contentBlocks: ContentBlock[]
  category: string
  categorySlug: string
  tags: string[]
  metaTitle: string
  metaDescription: string
  keywords: string[]
  status: "draft" | "published"
  author: string
  featured: boolean
  faqs: { question: string; answer: string }[]
  relatedSlugs: string[]
  relatedTools: { name: string; slug: string; type: "calculator" }[]
}

export async function getArticles(): Promise<CmsArticle[]> {
  return readJsonFile<CmsArticle[]>(ARTICLES_FILE)
}

export async function getArticle(slug: string): Promise<CmsArticle | null> {
  const articles = await getArticles()
  return articles.find((a) => a.slug === slug) || null
}

export async function saveArticle(slug: string, data: ArticleFormData): Promise<void> {
  const articles = await getArticles()
  const index = articles.findIndex((a) => a.slug === slug)
  const now = new Date().toISOString().split("T")[0]

  const entry: CmsArticle = {
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    content: data.contentBlocks && data.contentBlocks.length > 0 ? JSON.stringify(data.contentBlocks) : data.content,
    category: data.category,
    categorySlug: data.categorySlug,
    publishedAt: index >= 0 ? articles[index].publishedAt : now,
    updatedAt: now,
    readingTime: Math.max(1, Math.ceil((data.excerpt?.split(/\s+/).length || 0) / 200)),
    featured: data.featured,
    popular: false,
    author: { name: data.author || "Admin", avatar: "A", role: "Editor", bio: "" },
    relatedSlugs: data.relatedSlugs || [],
    relatedTools: data.relatedTools || [],
    faqs: data.faqs?.filter((f) => f.question || f.answer) || [],
    tags: data.tags || [],
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    keywords: data.keywords || [],
    status: data.status,
    featuredImage: "",
    featuredImageAlt: "",
  }

  if (index >= 0) {
    articles[index] = entry
  } else {
    articles.push(entry)
  }

  await writeJsonFile(ARTICLES_FILE, articles)
}

export async function deleteArticle(slug: string): Promise<void> {
  const articles = await getArticles()
  await writeJsonFile(ARTICLES_FILE, articles.filter((a) => a.slug !== slug))
}

export function slugify(text: string): string {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")
}

export async function isSlugTaken(slug: string, excludeSlug?: string): Promise<boolean> {
  const articles = await getArticles()
  return articles.some((a) => a.slug === slug && a.slug !== excludeSlug)
}
