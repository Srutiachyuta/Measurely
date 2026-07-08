import type { CmsToolMeta } from "@/cms/types"
import type { ContentBlock } from "@/cms/types/content"
import { readJsonFile, writeJsonFile } from "@/cms/lib/api"

const TOOLS_FILE = "tools.json"

export type ToolFormData = {
  name: string
  slug: string
  category: string
  description: string
  shortDescription: string
  metaTitle: string
  metaDescription: string
  keywords: string
  formula: string
  status: "draft" | "published"
  faqs: { question: string; answer: string }[]
  relatedSlugs: string[]
  relatedArticleSlugs: string[]
  featuredImage: string
  featuredImageAlt: string
  gallery: { src: string; alt: string; caption?: string }[]
  author: string
  publishDate: string
  canonicalUrl: string
  ogImage: string
  ogTitle: string
  ogDescription: string
  twitterCard: "summary" | "summary_large_image" | "app" | "player"
  robots: string
  breadcrumb: { label: string; href?: string }[]
  contentBlocks: ContentBlock[]
  toolCode: string
  examples: { title: string; inputs: Record<string, string | number>; explanation?: string }[]
  internalLinks: { text: string; href: string }[]
  schema: string
}

export async function getTools(): Promise<CmsToolMeta[]> {
  return readJsonFile<CmsToolMeta[]>(TOOLS_FILE)
}

export async function getTool(slug: string): Promise<CmsToolMeta | null> {
  const tools = await getTools()
  return tools.find((t) => t.slug === slug) || null
}

export async function saveTool(slug: string, data: ToolFormData): Promise<CmsToolMeta> {
  const tools = await getTools()
  const index = tools.findIndex((t) => t.slug === slug)
  const now = new Date().toISOString().split("T")[0]

  let parsedSchema: Record<string, unknown> = {}
  try { parsedSchema = JSON.parse(data.schema || "{}") } catch { parsedSchema = {} }

  const existing = index >= 0 ? tools[index] : null

  const entry: CmsToolMeta = {
    name: data.name,
    slug: data.slug,
    category: data.category,
    description: data.description,
    shortDescription: data.shortDescription,
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    keywords: data.keywords.split(",").map((k) => k.trim()).filter(Boolean),
    faqs: data.faqs.filter((f) => f.question || f.answer),
    relatedSlugs: data.relatedSlugs,
    relatedArticleSlugs: data.relatedArticleSlugs || [],
    formula: data.formula,
    status: data.status,
    featuredImage: data.featuredImage || "",
    featuredImageAlt: data.featuredImageAlt || "",
    gallery: data.gallery || [],
    author: data.author || "",
    publishDate: data.publishDate || "",
    lastUpdated: now,
    schema: parsedSchema,
    canonicalUrl: data.canonicalUrl || "",
    ogImage: data.ogImage || "",
    ogTitle: data.ogTitle || "",
    ogDescription: data.ogDescription || "",
    twitterCard: data.twitterCard || "summary_large_image",
    robots: data.robots || "",
    breadcrumb: data.breadcrumb || [],
    contentBlocks: data.contentBlocks || [],
    toolCode: data.toolCode || "",
    examples: data.examples || [],
    internalLinks: data.internalLinks || [],
    version: (existing?.version || 0) + 1,
  }

  if (index >= 0) {
    tools[index] = entry
  } else {
    tools.push(entry)
  }

  await writeJsonFile(TOOLS_FILE, tools)
  return entry
}

export async function deleteTool(slug: string): Promise<void> {
  const tools = await getTools()
  await writeJsonFile(TOOLS_FILE, tools.filter((t) => t.slug !== slug))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

export function getSuggestedSlug(name: string, existingSlug?: string): string {
  const slug = slugify(name)
  return slug || existingSlug || ""
}

export async function isSlugTaken(slug: string, excludeSlug?: string): Promise<boolean> {
  const tools = await getTools()
  return tools.some((t) => t.slug === slug && t.slug !== excludeSlug)
}

export async function getToolVersions(slug: string): Promise<{ version: number; lastUpdated: string }[]> {
  const tools = await getTools()
  const tool = tools.find((t) => t.slug === slug)
  if (!tool) return []
  return [{ version: tool.version || 1, lastUpdated: tool.lastUpdated }]
}

export async function addRedirect(from: string, to: string): Promise<void> {
  const { readJsonFile: read, writeJsonFile: write } = await import("@/cms/lib/api")
  const redirects = await read<{ from: string; to: string; statusCode: 301 | 302; createdAt: string }[]>("redirects.json")
  if (!redirects.find((r) => r.from === from)) {
    redirects.push({ from, to, statusCode: 301, createdAt: new Date().toISOString() })
    await write("redirects.json", redirects)
  }
}
