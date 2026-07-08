export interface SchemaValidationIssue {
  severity: "error" | "warning" | "info"
  message: string
  path?: string
}

export function validateJsonLd(json: string): SchemaValidationIssue[] {
  const issues: SchemaValidationIssue[] = []

  let parsed: any
  try {
    parsed = JSON.parse(json)
  } catch (e) {
    issues.push({ severity: "error", message: `Invalid JSON: ${(e as Error).message}` })
    return issues
  }

  if (!parsed["@context"] || parsed["@context"] !== "https://schema.org") {
    issues.push({ severity: "error", message: 'Missing or invalid "@context" — must be "https://schema.org"' })
  }

  if (!parsed["@type"]) {
    issues.push({ severity: "error", message: 'Missing "@type" — schema type is required' })
  }

  const schemaType = parsed["@type"]
  if (typeof schemaType === "string") {
    const firstChar = schemaType[0]
    if (firstChar !== firstChar.toUpperCase()) {
      issues.push({ severity: "warning", message: `"@type" "${schemaType}" should start with uppercase (e.g., WebPage, not webpage)` })
    }
  }

  if (parsed["@type"] === "FAQPage") {
    if (!parsed.mainEntity || !Array.isArray(parsed.mainEntity)) {
      issues.push({ severity: "error", message: 'FAQPage requires "mainEntity" array' })
    }
    if (Array.isArray(parsed.mainEntity)) {
      parsed.mainEntity.forEach((item: any, i: number) => {
        if (item["@type"] !== "Question") {
          issues.push({ severity: "error", message: `mainEntity[${i}] should have @type "Question"` })
        }
        if (!item.name) issues.push({ severity: "error", message: `mainEntity[${i}] is missing "name" (the question)` })
        if (!item.acceptedAnswer?.text) issues.push({ severity: "error", message: `mainEntity[${i}] is missing "acceptedAnswer.text"` })
      })
    }
  }

  if (parsed["@type"] === "BreadcrumbList") {
    if (!parsed.itemListElement || !Array.isArray(parsed.itemListElement)) {
      issues.push({ severity: "error", message: 'BreadcrumbList requires "itemListElement" array' })
    }
    if (Array.isArray(parsed.itemListElement)) {
      parsed.itemListElement.forEach((item: any, i: number) => {
        if (!item.position) issues.push({ severity: "warning", message: `itemListElement[${i}] missing "position"` })
        if (!item.name) issues.push({ severity: "warning", message: `itemListElement[${i}] missing "name"` })
        if (!item.item) issues.push({ severity: "warning", message: `itemListElement[${i}] missing "item" URL` })
      })
    }
  }

  const knownTypes = ["WebSite", "Organization", "BreadcrumbList", "FAQPage", "WebApplication", "HowTo", "BlogPosting", "WebPage", "Article", "Product", "LocalBusiness", "Person", "Review", "Recipe", "VideoObject", "ImageObject", "ItemList", "CollectionPage", "AboutPage", "ContactPage", "SearchAction"]
  if (typeof schemaType === "string" && !knownTypes.includes(schemaType)) {
    issues.push({ severity: "info", message: `"@type" "${schemaType}" is not in the common schema types list. Verify it's correct at schema.org/${schemaType}` })
  }

  return issues
}

export function getSchemaCoverage(
  pages: { slug: string; title: string; type: string }[]
): { total: number; withSchema: string[]; withoutSchema: string[] } {
  const withSchema: string[] = []
  const withoutSchema: string[] = []
  for (const page of pages) {
    if (page.type === "tool" || page.type === "article" || page.type === "category" || page.type === "comparison") {
      withSchema.push(page.slug)
    } else {
      withoutSchema.push(page.slug)
    }
  }
  return { total: pages.length, withSchema, withoutSchema }
}

export const SCHEMA_TYPES = [
  { label: "WebSite", description: "Site-wide website schema", context: "global" },
  { label: "Organization", description: "Organization/company info", context: "global" },
  { label: "SearchAction", description: "Site search action for WebSite", context: "global" },
  { label: "BreadcrumbList", description: "Navigation breadcrumbs", context: "page" },
  { label: "WebPage", description: "Generic webpage", context: "page" },
  { label: "WebApplication", description: "Web app/calculator tool", context: "tool" },
  { label: "FAQPage", description: "FAQ structured data", context: "page" },
  { label: "HowTo", description: "Step-by-step instructions", context: "page" },
  { label: "BlogPosting", description: "Blog article", context: "article" },
  { label: "Article", description: "Generic article", context: "page" },
  { label: "ItemList", description: "List of items", context: "page" },
  { label: "CollectionPage", description: "Collection/category page", context: "category" },
  { label: "AboutPage", description: "About us page", context: "page" },
  { label: "ContactPage", description: "Contact page", context: "page" },
]
