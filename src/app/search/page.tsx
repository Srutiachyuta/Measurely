"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ToolCard } from "@/components/home/tool-card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/json-ld";
import type { BreadcrumbItem } from "@/types";
import { blogs } from "@/data/blogs";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, FileText, HelpCircle } from "lucide-react";
import { buildSearchIndex, searchIndex as searchIndexFn } from "@/lib/search";

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Search", href: "/search" },
];

const searchIndexItems = buildSearchIndex();

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"all" | "tool" | "blog" | "faq">("all");
  const [page, setPage] = useState(0);
  const [mounted, setMounted] = useState(false);
  const perPage = 12;

  useEffect(() => {
    setMounted(true);
  }, []);

  const results = useMemo(
    () => searchIndexFn(query, searchIndexItems),
    [query]
  );

  const filtered = useMemo(() => {
    let result = results;
    if (type === "tool") {
      result = result.filter((r) => r.item.type === "tool");
    } else if (type === "blog") {
      result = result.filter((r) => r.item.type === "blog");
    } else if (type === "faq") {
      result = result.filter((r) => r.item.type === "faq");
    }
    return result;
  }, [results, type]);

  const paginated = useMemo(
    () => filtered.slice(0, (page + 1) * perPage),
    [filtered, page]
  );

  const toolResults = paginated.filter((r) => r.item.type === "tool");
  const blogResults = paginated.filter((r) => r.item.type === "blog");
  const faqResults = paginated.filter((r) => r.item.type === "faq");

  return (
    <div className="min-h-screen">
      <BreadcrumbJsonLd items={[{ name: "Search Tools" }]} />
      <WebPageJsonLd title="Search Tools & Articles | Measurely" description="Find calculators, converters, and articles across the site." url="https://www.measurely.in/search" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Search <span className="text-gradient">Tools & Articles</span>
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Find calculators, converters, articles, and FAQs across the site.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted" />
            <Input
              placeholder="Search calculators, converters, articles..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(0);
              }}
              className="pl-10 h-12 text-base"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-surface-secondary transition-colors text-muted hover:text-text"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {mounted && (
            <div className="flex items-center gap-2 flex-wrap">
              {(["all", "tool", "blog", "faq"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => { setType(t); setPage(0); }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    type === t
                      ? "bg-primary-600 text-white shadow-sm"
                      : "bg-surface-secondary text-text-secondary hover:text-text border border-border/60"
                  }`}
                >
                  {t === "all" ? "All" : t === "tool" ? "Tools" : t === "blog" ? "Articles" : "FAQs"}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {query.trim().length > 0 && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-secondary mx-auto mb-4">
              <SlidersHorizontal className="h-8 w-8 text-muted" />
            </div>
            <p className="text-lg text-text-secondary font-medium">No results found</p>
            <p className="text-sm text-muted mt-1">
              No results for &ldquo;{query.trim()}&rdquo;. Try different keywords.
            </p>
          </motion.div>
        )}

        {query.trim().length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-secondary mx-auto mb-4">
              <Search className="h-8 w-8 text-muted" />
            </div>
            <p className="text-lg text-text-secondary font-medium">Start typing to search</p>
            <p className="text-sm text-muted mt-1">
              Search across all calculators, converters, articles, and FAQs.
            </p>
          </motion.div>
        )}

        {query.trim().length > 0 && filtered.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.03 } },
            }}
            className="space-y-10"
          >
            {toolResults.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
                  Tools ({toolResults.length})
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {toolResults.map(({ item }, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02, duration: 0.25 }}
                    >
                      <ToolCard
                        name={item.title}
                        slug={item.href.replace("/", "")}
                        category={item.category}
                        categorySlug=""
                        icon="Calculator"
                        description={item.description}
                      />
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {blogResults.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
                  Articles ({blogResults.length})
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {blogResults.map(({ item }, i) => {
                    const blog = blogs.find((b) => item.href.endsWith(b.slug));
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.02, duration: 0.25 }}
                      >
                        <Link
                          href={item.href}
                          className="group block h-full"
                        >
                          <div className="h-full rounded-2xl border border-border/50 bg-white/70 dark:bg-dark-800/40 backdrop-blur-sm p-5 transition-all duration-400 hover:shadow-xl hover:-translate-y-1.5 hover:bg-white/90 dark:hover:bg-dark-800/60">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm shrink-0">
                                <FileText className="h-4 w-4" />
                              </div>
                              <Badge variant="info" size="sm" className="font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                                Article
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-text group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 mb-2">
                              {item.title}
                            </h3>
                            <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 mb-3">
                              {item.description}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted">
                              {blog?.readingTime && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {blog.readingTime} min read
                                </span>
                              )}
                              {blog?.publishedAt && (
                                <span className="flex items-center gap-1">
                                  <CalendarDays className="h-3 w-3" />
                                  {new Date(blog.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            )}

            {faqResults.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
                  FAQs ({faqResults.length})
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {faqResults.map(({ item }, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02, duration: 0.25 }}
                    >
                      <Link
                        href={item.href}
                        className="block h-full rounded-2xl border border-border/50 bg-white/70 dark:bg-dark-800/40 backdrop-blur-sm p-5 transition-all duration-400 hover:shadow-lg hover:-translate-y-1 hover:bg-white/90 dark:hover:bg-dark-800/60 group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
                            <HelpCircle className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-text group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-1">
                              {item.title}
                            </h3>
                            <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {paginated.length < filtered.length && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="inline-flex items-center justify-center rounded-xl border border-border bg-surface px-6 py-3 text-sm font-medium text-text hover:bg-surface-secondary hover:border-primary-500/30 transition-all duration-200 shadow-sm"
                >
                  Show More ({filtered.length - paginated.length} remaining)
                </button>
              </div>
            )}

            {filtered.length > perPage && (
              <p className="text-center text-sm text-muted mt-4">
                Showing {paginated.length} of {filtered.length} results
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
