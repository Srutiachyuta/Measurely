import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE, CATEGORIES, SITE_CONFIG } from "@/lib/constants";
import { calculators } from "@/data/calculators";
import { blogs } from "@/data/blogs";
import { comparisons } from "@/data/comparisons";
import { getBlogImageUrl } from "@/lib/blog-images";
import {
  BreadcrumbJsonLd,
  WebPageJsonLd,
  WebApplicationJsonLd,
  FAQJsonLd,
  HowToJsonLd,
} from "@/components/seo/json-ld";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { BlogArticle } from "@/components/blog/blog-article";
import { ComparisonLayout } from "@/components/compare/comparison-layout";
import { CategoryDetail } from "@/components/categories/category-detail";

const CUSTOM_PAGES = ["ai-token-cost-calculator"];

const allSlugs = [
  ...calculators.map((c) => c.slug),
  ...blogs.map((b) => b.slug),
  ...comparisons.map((c) => c.slug),
  ...CATEGORIES.map((c) => c.slug),
].filter((slug) => !CUSTOM_PAGES.includes(slug));

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [...new Set(allSlugs)].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const calculator = calculators.find((c) => c.slug === slug);
  const blog = blogs.find((b) => b.slug === slug);
  const category = CATEGORIES.find((c) => c.slug === slug);
  const comparison = comparisons.find((c) => c.slug === slug);

  if (!calculator && !blog && !category && !comparison) return {};

  const url = `${SITE.url}/${slug}`;

  if (blog) {
    return {
      title: blog.metaTitle,
      description: blog.metaDescription,
      alternates: { canonical: url },
      openGraph: {
        title: blog.metaTitle,
        description: blog.metaDescription,
        url,
        type: "article",
        publishedTime: blog.publishedAt,
        authors: [blog.author.name],
        tags: blog.tags,
        siteName: SITE.siteName,
        images: [{ url: getBlogImageUrl(blog.slug, blog.category), width: 1200, height: 630, alt: blog.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.metaTitle,
        description: blog.metaDescription,
        images: [getBlogImageUrl(blog.slug, blog.category)],
      },
      keywords: blog.keywords.join(", "),
    };
  }

  if (category) {
    return {
      title: `${category.name} | ${SITE_CONFIG.name}`,
      description: category.description,
      alternates: { canonical: url },
      openGraph: {
        title: `${category.name} | ${SITE_CONFIG.name}`,
        description: category.description,
        url,
        siteName: SITE_CONFIG.siteName,
        images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: `${category.name} | ${SITE_CONFIG.name}` }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${category.name} | ${SITE_CONFIG.name}`,
        description: category.description,
        images: [SITE.ogImage],
      },
      keywords: [`${category.name.toLowerCase()}`, "free online tools", "measurely"],
    };
  }

  if (comparison) {
    return {
      title: comparison.metaTitle,
      description: comparison.metaDescription,
      alternates: { canonical: url },
      openGraph: {
        title: comparison.metaTitle,
        description: comparison.metaDescription,
        url,
        type: "website",
        siteName: SITE.siteName,
        images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: comparison.name }],
      },
      twitter: {
        card: "summary_large_image",
        title: comparison.metaTitle,
        description: comparison.metaDescription,
        images: [SITE.ogImage],
        creator: SITE.twitterHandle,
      },
    };
  }

  const def = calculator!;

  return {
    title: def.metaTitle,
    description: def.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: def.metaTitle,
      description: def.metaDescription,
      url,
      type: "website",
      siteName: SITE.siteName,
      images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: def.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: def.metaTitle,
      description: def.metaDescription,
      images: [SITE.ogImage],
      creator: SITE.twitterHandle,
    },
  };
}

export default async function ToolSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const calculator = calculators.find((c) => c.slug === slug);
  const blog = blogs.find((b) => b.slug === slug);
  const category = CATEGORIES.find((c) => c.slug === slug);
  const comparison = comparisons.find((c) => c.slug === slug);

  if (!calculator && !blog && !category && !comparison) {
    notFound();
  }

  const url = `${SITE.url}/${slug}`;

  if (blog) {
    return (
      <>
        <BreadcrumbJsonLd
          items={[
            { name: SITE.name, url: SITE.url },
            { name: "Blog", url: `${SITE.url}/blog` },
            { name: blog.title, url },
          ]}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "@id": `${url}#blogposting`,
              headline: blog.title,
              description: blog.excerpt,
              image: getBlogImageUrl(blog.slug, blog.category),
              url,
              datePublished: blog.publishedAt,
              dateModified: blog.updatedAt || blog.publishedAt,
              author: { "@type": "Person", name: blog.author.name },
              publisher: { "@id": `${SITE.url}/#organization` },
              mainEntityOfPage: { "@type": "WebPage", "@id": url },
              keywords: blog.tags.join(", "),
            }),
          }}
        />
        {blog.faqs && blog.faqs.length > 0 && <FAQJsonLd questions={blog.faqs} url={url} />}
        <BlogArticle post={blog} blogs={blogs} />
      </>
    );
  }

  if (category) {
    return <CategoryDetail category={category} />;
  }

  if (comparison) {
    return <ComparisonLayout comparison={comparison} />;
  }

  const def = calculator!;
  const categoryName = CATEGORIES.find((c) => c.slug === def.category)?.name || def.category;

  const howToSteps = def.inputs.slice(0, 4).map((input, i) => ({
    name: `Enter ${input.label}`,
    text: `Provide the ${input.label.toLowerCase()} value${input.placeholder ? ` (e.g., ${input.placeholder})` : ""}.`,
  })).concat([
    { name: "Click Calculate", text: "Press the Calculate button to compute your results instantly." },
  ]);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: SITE.name, url: SITE.url },
          { name: categoryName, url: `${SITE.url}/${def.category}` },
          { name: def.name, url },
        ]}
      />
      <WebPageJsonLd
        title={def.metaTitle}
        description={def.metaDescription}
        url={url}
      />
      <WebApplicationJsonLd
        name={def.name}
        description={def.description}
        url={url}
        category="Calculator"
      />
      {def.faqs && def.faqs.length > 0 && (
        <FAQJsonLd questions={def.faqs} url={url} />
      )}
      {howToSteps.length > 0 && (
        <HowToJsonLd
          name={`How to Use the ${def.name}`}
          description={`Step-by-step guide for using the ${def.name} calculator on Measurely.`}
          steps={howToSteps}
          url={url}
        />
      )}
      <CalculatorLayout slug={slug} />
    </>
  );
}
