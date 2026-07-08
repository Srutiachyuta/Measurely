export type CmsStatus = "draft" | "published"

export interface CmsToolMeta {
  name: string
  slug: string
  category: string
  description: string
  shortDescription: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  faqs: { question: string; answer: string }[]
  relatedSlugs: string[]
  relatedArticleSlugs: string[]
  formula: string
  status: CmsStatus
  featuredImage: string
  featuredImageAlt: string
  gallery: { src: string; alt: string; caption?: string }[]
  author: string
  publishDate: string
  lastUpdated: string
  schema: Record<string, unknown>
  canonicalUrl: string
  ogImage: string
  ogTitle: string
  ogDescription: string
  twitterCard: "summary" | "summary_large_image" | "app" | "player"
  robots: string
  breadcrumb: { label: string; href?: string }[]
  contentBlocks: import("./content").ContentBlock[]
  toolCode: string
  examples: { title: string; inputs: Record<string, string | number>; explanation?: string }[]
  internalLinks: { text: string; href: string }[]
  version: number
}

export interface CmsArticle {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  categorySlug: string
  publishedAt: string
  updatedAt: string
  readingTime: number
  featured: boolean
  popular: boolean
  author: {
    name: string
    avatar: string
    role: string
    bio: string
  }
  relatedSlugs: string[]
  relatedTools: { name: string; slug: string; type: "calculator" }[]
  faqs: { question: string; answer: string }[]
  tags: string[]
  metaTitle: string
  metaDescription: string
  keywords: string[]
  status: CmsStatus
  featuredImage: string
  featuredImageAlt: string
}

export interface CmsCategory {
  slug: string
  name: string
  icon: string
  description: string
  intro: string
  faqs: { question: string; answer: string }[]
  metaTitle: string
  metaDescription: string
  status: CmsStatus
}

export interface CmsTag {
  id: string
  name: string
  slug: string
  count: number
}

export interface CmsAuthor {
  name: string
  slug: string
  avatar: string
  role: string
  bio: string
  socialLinks: Record<string, string>
}

export interface CmsRedirect {
  from: string
  to: string
  statusCode: 301 | 302
  createdAt: string
}

export interface CmsMediaItem {
  id: string
  filename: string
  originalName: string
  url: string
  type: "image" | "svg" | "other"
  width: number
  height: number
  altText: string
  fileSize: number
  createdAt: string
}

export interface SeoOverride {
  slug: string
  type: "tool" | "article" | "category" | "comparison" | "page"
  metaTitle: string
  metaDescription: string
  canonicalUrl: string
  robots: string
  ogImage: string
}

export interface AnalyticsEntry {
  date: string
  pageViews: number
  uniqueVisitors: number
  topPages: { path: string; views: number }[]
  topCountries: { country: string; visitors: number }[]
}

export interface SearchQuery {
  query: string
  impressions: number
  clicks: number
  ctr: number
  position: number
}

export interface AuditIssue {
  type: "error" | "warning" | "info"
  category: "seo" | "content" | "accessibility" | "performance" | "links" | "schema" | "media"
  message: string
  location: string
  fixable: boolean
}

export interface CmsSettings {
  siteName: string
  siteUrl: string
  siteDescription: string
  twitterHandle: string
  defaultOgImage: string
  gaId: string
  gtmId: string
  adSenseSlotId: string
  adminPassword: string
  disallowRobotsPaths: string[]
}
