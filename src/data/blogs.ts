import type { BlogPost } from "@/types";
import { getPlaceholderImage, getBlogImageAlt } from "@/lib/blog-images";
import articles from "@/content";

const blogsData: BlogPost[] = articles;

export const blogs: BlogPost[] = blogsData.sort((a, b) => {
  const cmp = b.publishedAt.localeCompare(a.publishedAt);
  if (cmp !== 0) return cmp;
  return b.slug.localeCompare(a.slug);
}).map((post) => ({
  ...post,
  featuredImage: getPlaceholderImage(post.slug),
  featuredImageAlt: getBlogImageAlt(post.slug, post.category),
}));
