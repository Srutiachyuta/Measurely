import type { MetadataRoute } from "next";
import { SITE, CATEGORIES } from "@/lib/constants";
import { calculators } from "@/data/calculators";
import { blogs } from "@/data/blogs";
import { comparisons } from "@/data/comparisons";

const BASE_URL = SITE.url;

export default function sitemap(): MetadataRoute.Sitemap {


  const staticPages = [
    { url: BASE_URL, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/calculators`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/categories`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/compare`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/privacy-policy`, changeFrequency: "yearly" as const, priority: 0.5 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly" as const, priority: 0.5 },
    { url: `${BASE_URL}/disclaimer`, changeFrequency: "yearly" as const, priority: 0.5 },
    { url: `${BASE_URL}/cookie-policy`, changeFrequency: "yearly" as const, priority: 0.5 },
    { url: `${BASE_URL}/editorial-policy`, changeFrequency: "yearly" as const, priority: 0.5 },
  ];

const blogPages = blogs.map((blog) => ({
    url: `${BASE_URL}/${blog.slug}`,
    lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(blog.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryPages = CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/${cat.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const calculatorPages = calculators.map((calc) => ({
    url: `${BASE_URL}/${calc.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const comparisonPages = comparisons.map((comp) => ({
    url: `${BASE_URL}/${comp.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const pages: MetadataRoute.Sitemap = [
    ...staticPages,
    ...blogPages,
    ...categoryPages,
    ...calculatorPages,
    ...comparisonPages,
  ];
  return [...new Map(pages.map(page => [page.url, page])).values()];
}
