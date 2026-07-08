export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

export function generateReadingTime(content: string): number {
  const wpm = 200
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / wpm))
}

export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toISOString().split("T")[0]
}

export function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + "..." : str
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function mergeMetaTitles(
  existing: { slug: string; title: string }[],
  overrides: { slug: string; metaTitle: string }[]
): { slug: string; title: string }[] {
  const overrideMap = new Map(overrides.map((o) => [o.slug, o.metaTitle]))
  return existing.map((item) => ({
    ...item,
    title: overrideMap.get(item.slug) || item.title,
  }))
}

export function findDuplicateMeta(
  items: { slug: string; metaTitle?: string; metaDescription?: string }[]
): { type: "title" | "description"; value: string; slugs: string[] }[] {
  const titleMap = new Map<string, string[]>()
  const descMap = new Map<string, string[]>()
  const duplicates: { type: "title" | "description"; value: string; slugs: string[] }[] = []

  for (const item of items) {
    if (item.metaTitle) {
      const existing = titleMap.get(item.metaTitle) || []
      existing.push(item.slug)
      titleMap.set(item.metaTitle, existing)
    }
    if (item.metaDescription) {
      const existing = descMap.get(item.metaDescription) || []
      existing.push(item.slug)
      descMap.set(item.metaDescription, existing)
    }
  }

  for (const [value, slugs] of titleMap) {
    if (slugs.length > 1) duplicates.push({ type: "title", value, slugs })
  }
  for (const [value, slugs] of descMap) {
    if (slugs.length > 1) duplicates.push({ type: "description", value, slugs })
  }

  return duplicates
}

export function getCategorySlugMap(): Record<string, string> {
  return {
    finance: "finance",
    health: "health",
    math: "math",
    time: "time",
    engineering: "engineering",
    construction: "construction",
    "everyday-life": "everyday-life",
    "real-estate": "real-estate",
    retirement: "retirement",
    automotive: "automotive",
    "social-media": "social-media",
    business: "business",
  }
}


