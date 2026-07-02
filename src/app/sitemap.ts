import type { MetadataRoute } from "next";
import { SITE, CATEGORIES } from "@/lib/constants";
import { calculators } from "@/data/calculators";
import { converters } from "@/data/converters";
import { blogs } from "@/data/blogs";
import { comparisons } from "@/data/comparisons";

const BASE_URL = SITE.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/calculators`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/converters`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/categories`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.5 },
    { url: `${BASE_URL}/terms`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.5 },
    { url: `${BASE_URL}/disclaimer`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.5 },
    { url: `${BASE_URL}/cookie-policy`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.5 },
    { url: `${BASE_URL}/editorial-policy`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.5 },
    { url: `${BASE_URL}/search`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.3 },
  ];

  const blogPages = blogs.map((blog) => ({
    url: `${BASE_URL}/${blog.slug}`,
    lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(blog.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryPages = CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const calculatorPages = calculators.map((calc) => ({
    url: `${BASE_URL}/${calc.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const converterPages = converters.map((conv) => ({
    url: `${BASE_URL}/${conv.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const comparisonPages = comparisons.map((comp) => ({
    url: `${BASE_URL}/${comp.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...blogPages,
    ...categoryPages,
    ...calculatorPages,
    ...converterPages,
    ...comparisonPages,
  ];
}
