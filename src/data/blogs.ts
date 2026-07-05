import type { BlogPost } from "@/types";
import { getBlogImageUrl, getBlogImageAlt } from "@/lib/blog-images";
import articles from "@/content";

const blogsData: BlogPost[] = articles;

export const blogs: BlogPost[] = blogsData.sort((a, b) => {
  const cmp = b.publishedAt.localeCompare(a.publishedAt);
  if (cmp !== 0) return cmp;
  return b.slug.localeCompare(a.slug);
}).map((post) => ({
  ...post,
  featuredImage: getBlogImageUrl(post.slug, post.category),
  featuredImageAlt: getBlogImageAlt(post.slug, post.category),
}));
