import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import {
  BreadcrumbJsonLd, WebsiteJsonLd, WebPageJsonLd,
  CollectionPageJsonLd, ItemListJsonLd
} from "@/components/seo/json-ld";
import type { BreadcrumbItem } from "@/types";
import { blogs } from "@/data/blogs";
import { BlogPageClient } from "@/app/blog/blog-page-client";

export const metadata: Metadata = {
  title: `Blog | ${SITE_CONFIG.name}`,
  description: `Explore ${SITE_CONFIG.name}'s blog for articles about calculators, measurement tips, financial planning, health metrics, and more.`,
  openGraph: {
    title: `Blog | ${SITE_CONFIG.name}`,
    description: `Explore ${SITE_CONFIG.name}'s blog for articles about calculators and measurement tools.`,
    url: `${SITE_CONFIG.url}/blog`,
    siteName: SITE_CONFIG.siteName,
    images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630, alt: `${SITE_CONFIG.name} Blog` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${SITE_CONFIG.name}`,
    description: `Explore ${SITE_CONFIG.name}'s blog for articles about calculators and measurement tools.`,
    images: [SITE_CONFIG.ogImage],
  },
  alternates: { canonical: `${SITE_CONFIG.url}/blog` },
  keywords: ["measurely blog", "calculator tips", "measurement guides", "financial articles", "health calculators"],
};

const breadcrumbItems: BreadcrumbItem[] = [{ label: "Blog" }];

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }, { name: "Blog", url: `${SITE_CONFIG.url}/blog` }]} />
      <WebPageJsonLd
        title={`Blog | ${SITE_CONFIG.name}`}
        description={`Explore ${SITE_CONFIG.name}'s blog for articles about calculators and measurement tools.`}
        url={`${SITE_CONFIG.url}/blog`}
      />
      <CollectionPageJsonLd
        title={`Blog | ${SITE_CONFIG.name}`}
        description={`Explore ${SITE_CONFIG.name}'s blog for articles about calculators and measurement tools.`}
        url={`${SITE_CONFIG.url}/blog`}
      />
      <ItemListJsonLd
        items={blogs.map((b) => ({ name: b.title, url: `${SITE_CONFIG.url}/${b.slug}` }))}
        url={`${SITE_CONFIG.url}/blog`}
      />
      <BlogPageClient blogs={blogs} breadcrumbItems={breadcrumbItems} />
    </>
  );
}
