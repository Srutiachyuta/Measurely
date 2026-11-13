import type { BlogPost } from "@/types";
import type { ContentBlock, blocksToHtml } from "@/cms/types/content";
import { getBlogImageUrl, getBlogImageAlt } from "@/lib/blog-images";
import articles from "@/content";
import cmsData from "@/cms/data/articles.json";

const cmsArticles: {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured: boolean;
  popular: boolean;
  author: { name: string; avatar: string; role: string; bio?: string };
  relatedSlugs: string[];
  relatedTools?: { name: string; slug: string; type: "calculator" }[];
  faqs?: { question: string; answer: string }[];
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  status?: string;
}[] = cmsData as any;

const cmsPublishedMap = new Map(
  cmsArticles
    .filter((a) => a.status !== "draft")
    .map((a) => [a.slug, a])
);

const blogsData: BlogPost[] = articles;

const merged: BlogPost[] = blogsData.map((post) => {
  const cms = cmsPublishedMap.get(post.slug);
  if (!cms) return post;
  return {
    ...post,
    title: cms.title || post.title,
    excerpt: cms.excerpt || post.excerpt,
    content: cms.content || post.content,
    category: cms.category || post.category,
    categorySlug: cms.categorySlug || post.categorySlug,
    publishedAt: cms.publishedAt || post.publishedAt,
    updatedAt: cms.updatedAt || post.updatedAt,
    readingTime: cms.readingTime || post.readingTime,
    featured: cms.featured ?? post.featured,
    author: cms.author || post.author,
    relatedSlugs: cms.relatedSlugs?.length ? cms.relatedSlugs : post.relatedSlugs,
    relatedTools: cms.relatedTools?.length ? cms.relatedTools : post.relatedTools,
    faqs: cms.faqs?.length ? cms.faqs : post.faqs,
    tags: cms.tags?.length ? cms.tags : post.tags,
    metaTitle: cms.metaTitle || post.metaTitle,
    metaDescription: cms.metaDescription || post.metaDescription,
    keywords: cms.keywords?.length ? cms.keywords : post.keywords,
  };
});

const cmsOnlyArticles: BlogPost[] = cmsArticles
  .filter((a) => a.status !== "draft" && !blogsData.find((b) => b.slug === a.slug))
  .map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt || "",
    content: a.content || "",
    category: a.category || "Uncategorized",
    categorySlug: a.categorySlug || "uncategorized",
    publishedAt: a.publishedAt || new Date().toISOString().split("T")[0],
    updatedAt: a.updatedAt,
    readingTime: a.readingTime || Math.max(1, Math.ceil((a.excerpt?.split(/\s+/).length || 0) / 200)),
    featured: a.featured || false,
    popular: a.popular || false,
    image: "",
    author: a.author || { name: "Admin", avatar: "A", role: "Editor" },
    relatedSlugs: a.relatedSlugs || [],
    relatedTools: a.relatedTools || [],
    faqs: a.faqs || [],
    tags: a.tags || [],
    metaTitle: a.metaTitle || a.title,
    metaDescription: a.metaDescription || a.excerpt || "",
    keywords: a.keywords || [],
    featuredImage: getBlogImageUrl(a.slug, a.category),
    featuredImageAlt: getBlogImageAlt(a.slug, a.category),
  }));

// Retire the outdated 2026 tax guide without allowing CMS overrides to republish it.
export const blogs: BlogPost[] = [...merged, ...cmsOnlyArticles]
  .filter(post => post.slug !== "tax-saving-tips-2026")
  .map(post => ({
    ...post,
    content: post.content.replaceAll('href="/tax-saving-tips-2026"', 'href="/tax-calculator"'),
    relatedSlugs: post.relatedSlugs.filter(slug => slug !== "tax-saving-tips-2026"),
    relatedTools: post.relatedTools?.filter(tool => tool.slug !== "tax-saving-tips-2026"),
  })).sort((a, b) => {
  const cmp = b.publishedAt.localeCompare(a.publishedAt);
  if (cmp !== 0) return cmp;
  return b.slug.localeCompare(a.slug);
})
