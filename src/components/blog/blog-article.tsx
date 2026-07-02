import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";
import { getBlogImageUrl, getBlogImageAlt } from "@/lib/blog-images";
import { ShareButtons } from "@/components/blog/share-buttons";
import { AdSlot } from "@/components/AdSlot";
import { BLOG_AFTER_CONTENT } from "@/config/adPlacements";

import {
  Clock,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  BookOpen,
} from "lucide-react";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { BlogTableOfContents } from "@/components/blog/blog-toc";
import { RecommendationsSection } from "@/components/blog/recommendations-section";

function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

function markdownToHtml(markdown: string): string {
  let html = markdown;
  html = html.replace(/href="\/blog\//g, 'href="/');
  html = html.replace(/^### (.+)$/gm, (_, text) => `<h3 id="${slugify(text)}" class="text-xl font-semibold text-text mt-8 mb-3 scroll-mt-24">${text}</h3>`);
  html = html.replace(/^## (.+)$/gm, (_, text) => `<h2 id="${slugify(text)}" class="text-2xl font-bold text-text mt-10 mb-4 scroll-mt-24">${text}</h2>`);
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-text">$1</strong>');
  html = html.replace(/^- (.+)$/gm, '<li class="text-text-secondary pl-1">$1</li>');
  html = html.replace(/(<li.*<\/li>\n?)+/g, '<ul class="space-y-1.5 list-disc list-inside mb-4">$&</ul>');
  html = html.replace(/^(\d+)\. (.+)$/gm, '<li class="text-text-secondary pl-1"><span class="font-medium text-text">$1.</span> $2</li>');
  html = html.replace(/(?:<li.*<\/li>\n?)+/g, (match) => {
    if (match.includes("font-medium")) return `<ol class="space-y-1.5 list-inside mb-4">${match}</ol>`;
    return match;
  });
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-surface-secondary dark:bg-dark-800 rounded-xl p-4 overflow-x-auto text-sm mb-4 border border-border/60"><code>$2</code></pre>');
  html = html.replace(/`([^`]+)`/g, '<code class="bg-surface-secondary dark:bg-dark-800 px-1.5 py-0.5 rounded text-sm font-mono text-primary-600 dark:text-primary-400">$1</code>');
  html = html.replace(/^\|.+\|\n\|[-:| ]+\|\n(?:\|.+\|\n?)+/gm, (match) => {
    const rows = match.trim().split("\n");
    const isHeader = (row: string) => /^\|[-:| ]+\|$/.test(row);
    const toCells = (row: string) => row.split("|").slice(1, -1).map((c) => c.trim());
    let output = '<div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse">';
    let inHeader = true;
    for (const row of rows) {
      if (isHeader(row)) { inHeader = false; continue; }
      const cells = toCells(row);
      const tag = inHeader ? "th" : "td";
      output += `<tr class="border-b border-border/60">`;
      for (const cell of cells) {
        const cls = inHeader ? 'text-left text-xs font-semibold text-text uppercase tracking-wider py-2.5 pr-4' : 'text-text-secondary py-2.5 pr-4';
        output += `<${tag} class="${cls}">${cell}</${tag}>`;
      }
      output += `</tr>`;
    }
    output += "</table></div>";
    return output;
  });
  html = html.replace(/^(?!<[hou]|<li|<pre|<code|<span|<div|<table|<tr|<td|<th|<tbody|<thead)(.+)$/gm, (match) => {
    const trimmed = match.trim();
    if (!trimmed || trimmed.startsWith("<")) return match;
    return `<p class="text-text-secondary leading-relaxed mb-4">${trimmed}</p>`;
  });
  html = html.replace(/\n{3,}/g, "\n\n");
  return html;
}

function generateToc(content: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    headings.push({
      id: slugify(match[2]),
      text: match[2],
      level: match[1].length,
    });
  }
  return headings;
}

function getRelatedPosts(post: BlogPost, blogs: BlogPost[]): BlogPost[] {
  return post.relatedSlugs
    .map((slug) => blogs.find((p) => p.slug === slug))
    .filter((p): p is BlogPost => p !== undefined);
}

function getIndex(slug: string, blogs: BlogPost[]): number {
  return blogs.findIndex((p) => p.slug === slug);
}

function getPrevPost(slug: string, blogs: BlogPost[]): BlogPost | null {
  const idx = getIndex(slug, blogs);
  return idx > 0 ? blogs[idx - 1] : null;
}

function getNextPost(slug: string, blogs: BlogPost[]): BlogPost | null {
  const idx = getIndex(slug, blogs);
  return idx < blogs.length - 1 ? blogs[idx + 1] : null;
}

export function BlogArticle({ post, blogs }: { post: BlogPost; blogs: BlogPost[] }) {
  const toc = generateToc(post.content);
  const contentHtml = markdownToHtml(post.content);
  const relatedPosts = getRelatedPosts(post, blogs);
  const prevPost = getPrevPost(post.slug, blogs);
  const nextPost = getNextPost(post.slug, blogs);
  const shareUrl = `${SITE_CONFIG.url}/${post.slug}`;

  return (
    <>
      <ReadingProgress />
      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_280px] gap-10">
          <article className="min-w-0">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-text-secondary">
                  <CalendarDays className="h-4 w-4" />
                  {formatDate(post.publishedAt, { style: "long" })}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-text-secondary">
                  <Clock className="h-4 w-4" />
                  {post.readingTime} min read
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text mb-6">
                {post.title}
              </h1>

              <p className="text-lg text-text-secondary leading-relaxed mb-6">
                {post.excerpt}
              </p>

              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <div className="text-sm text-text-secondary mb-4">
                  Published <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, { style: "long" })}</time>
                  {' · '}Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt, { style: "long" })}</time>
                </div>
              )}

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface-secondary/50 dark:bg-dark-800/30 border border-border/60">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-sm font-bold text-white shrink-0">
                  {post.author.avatar}
                </div>
                <div>
                  <p className="font-semibold text-text">{post.author.name}</p>
                  <p className="text-sm text-text-secondary">{post.author.role}</p>
                </div>
              </div>
            </div>

            <div className="mb-8 rounded-2xl overflow-hidden border border-border/60 bg-surface-secondary/50">
              <div className="relative w-full h-64 sm:h-80 lg:h-96">
                <Image
                  src={getBlogImageUrl(post.slug, post.category)}
                  alt={getBlogImageAlt(post.slug, post.category)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 66vw"
                  priority
                />
              </div>
            </div>

            <div
              className="prose-content mb-10"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            <AdSlot placement={BLOG_AFTER_CONTENT} />

            <div className="flex items-center gap-3 mb-10 p-4 rounded-2xl bg-surface-secondary/50 dark:bg-dark-800/30 border border-border/60">
              <span className="text-sm font-medium text-text">Share this article:</span>
              <ShareButtons url={shareUrl} text={post.title} />
            </div>

            <div className="mb-10 p-6 rounded-2xl bg-surface-secondary/50 dark:bg-dark-800/30 border border-border/60">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-lg font-bold text-white shrink-0">
                  {post.author.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-text">About {post.author.name}</h3>
                  <p className="text-sm text-text-secondary">{post.author.role}</p>
                </div>
              </div>
              {post.author.bio && (
                <p className="text-sm text-text-secondary leading-relaxed border-t border-border/40 pt-3">
                  {post.author.bio}
                </p>
              )}
            </div>

            {post.faqs && post.faqs.length > 0 && (
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-text mb-4">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  {post.faqs.map((faq, i) => (
                    <details
                      key={i}
                      className="group rounded-2xl border border-border/60 bg-surface overflow-hidden"
                    >
                      <summary className="flex items-center justify-between p-4 cursor-pointer text-text font-medium hover:bg-surface-secondary transition-colors list-none">
                        {faq.question}
                        <ChevronDown className="h-5 w-5 text-text-secondary shrink-0 group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="px-4 pb-4">
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            <RecommendationsSection current={post} allBlogs={blogs} />

            <div className="flex items-center justify-between gap-4 flex-wrap">
              {prevPost ? (
                <Link
                  href={`/${prevPost.slug}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border/60 bg-surface hover:border-primary-500/30 hover:text-primary-600 transition-all group"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <div className="text-left">
                    <p className="text-xs text-text-secondary">Previous</p>
                    <p className="text-sm font-medium text-text group-hover:text-primary-600 line-clamp-1 max-w-[200px]">
                      {prevPost.title}
                    </p>
                  </div>
                </Link>
              ) : <div />}
              {nextPost ? (
                <Link
                  href={`/${nextPost.slug}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border/60 bg-surface hover:border-primary-500/30 hover:text-primary-600 transition-all group"
                >
                  <div className="text-right">
                    <p className="text-xs text-text-secondary">Next</p>
                    <p className="text-sm font-medium text-text group-hover:text-primary-600 line-clamp-1 max-w-[200px]">
                      {nextPost.title}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : <div />}
            </div>
          </article>

          <aside className="hidden lg:block space-y-6">
            {toc.length > 0 && (
              <BlogTableOfContents items={toc} />
            )}

            {relatedPosts.length > 0 && (
              <div className="p-5 rounded-2xl border border-border/60 bg-surface">
                <h3 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-accent-cyan" />
                  Related Articles
                </h3>
                <div className="space-y-1">
                  {relatedPosts.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/${rp.slug}`}
                      className="flex items-center gap-3 p-2.5 rounded-xl transition-colors hover:bg-surface-secondary"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shrink-0 text-white text-xs font-bold">
                        {rp.author.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-text line-clamp-1">{rp.title}</p>
                        <p className="text-xs text-muted">{rp.readingTime} min read</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
    </>
  );
}
