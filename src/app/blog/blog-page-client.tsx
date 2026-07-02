"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Clock,
  CalendarDays,
  TrendingUp,
  Flame,
  Eye,
  BookOpen,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Bell,
  X,
  ChevronRight,
  Home,
  Sparkles,
  LayoutGrid,
  SlidersHorizontal,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { getBlogImageUrl, getBlogImageAlt } from "@/lib/blog-images";
import { SITE_CONFIG } from "@/lib/constants";
import { NEWSLETTER_FORM } from "@/lib/constants";
import type { BlogPost } from "@/types";

const POPULAR_TAGS = [
  "calculator", "finance", "health", "math", "converter",
  "engineering", "retirement", "investment", "tax", "mortgage",
  "fitness", "savings", "loans", "energy", "education",
];

const TRENDING_VIEWS = ["12K", "8.5K", "7.2K", "6.8K", "5.1K", "4.9K", "4.2K", "3.8K"];

const categoryIconMap: Record<string, React.ElementType> = {
  finance: TrendingUp,
  health: BookOpen,
  math: LayoutGrid,
  engineering: SlidersHorizontal,
  construction: LayoutGrid,
  education: BookOpen,
  "daily-life": Sparkles,
  "unit-conversion": RefreshCw,
  "real-estate": LayoutGrid,
  retirement: TrendingUp,
  automotive: LayoutGrid,
  "social-media": TrendingUp,
  business: TrendingUp,
};

function stem(word: string): string {
  const lower = word.toLowerCase();
  if (lower.endsWith("ies") && lower.length > 3) return lower.slice(0, -3) + "y";
  if (lower.endsWith("ves") && lower.length > 3) return lower.slice(0, -3) + "f";
  if (lower.endsWith("es") && lower.length > 3) return lower.slice(0, -2);
  if (lower.endsWith("s") && !lower.endsWith("ss") && lower.length > 2) return lower.slice(0, -1);
  return lower;
}

function matchesField(queryWords: string[], fieldValue: string): number {
  const val = fieldValue.toLowerCase();
  const stemmedVal = stem(val);
  let score = 0;
  for (const qw of queryWords) {
    if (val.includes(qw)) {
      score += val === qw || val.startsWith(qw + " ") || val.endsWith(" " + qw) || val.includes(" " + qw + " ") ? 1 : 0.5;
    } else if (stemmedVal.includes(stem(qw))) {
      score += 0.3;
    }
  }
  return score;
}

function scoreBlogPost(post: BlogPost, queryWords: string[]): number {
  let score = 0;
  score += matchesField(queryWords, post.title) * 5;
  score += matchesField(queryWords, post.slug.replace(/-/g, " ")) * 4;
  score += matchesField(queryWords, post.excerpt) * 2;
  score += matchesField(queryWords, post.metaDescription) * 1;
  score += matchesField(queryWords, post.category) * 2;
  for (const tag of post.tags) score += matchesField(queryWords, tag) * 4;
  for (const kw of post.keywords) score += matchesField(queryWords, kw) * 3;
  score += matchesField(queryWords, post.author.name) * 3;
  return score;
}

interface BlogPageClientProps {
  blogs: BlogPost[];
  breadcrumbItems: { label: string; href?: string }[];
}

function PopularCategories() {
  const cats = [
    { name: "Finance", slug: "finance", count: "24+" },
    { name: "Health", slug: "health", count: "18+" },
    { name: "Math", slug: "math", count: "15+" },
    { name: "Engineering", slug: "engineering", count: "12+" },
    { name: "Unit Conversion", slug: "unit-conversion", count: "20+" },
  ];
  return (
    <div className="space-y-2">
      {cats.map((cat) => (
        <Link
          key={cat.slug}
          href={`/blog?category=${cat.slug}`}
          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-secondary transition-colors group"
        >
          <span className="text-sm text-text group-hover:text-primary-600 transition-colors">{cat.name}</span>
          <span className="text-xs text-text-secondary/60">{cat.count}</span>
        </Link>
      ))}
    </div>
  );
}

function NewsletterSidebar() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (value: string) => {
    if (!value.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate(email);
    if (validationError) { setError(validationError); return; }
    setSubmitting(true);
    try {
      const formBody = new URLSearchParams();
      formBody.append(NEWSLETTER_FORM.fieldEmail, email);
      if (NEWSLETTER_FORM.actionUrl) {
        await fetch(NEWSLETTER_FORM.actionUrl, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: formBody.toString() });
      }
      setSubmitted(true);
      setEmail("");
    } catch {
      setError("Failed. Try again.");
    } finally { setSubmitting(false); }
  };

  if (submitted) {
    return (
      <div className="p-5 rounded-2xl bg-gradient-to-br from-accent-green/5 to-accent-green/10 border border-accent-green/20 text-center">
        <CheckCircle2 className="h-8 w-8 text-accent-green mx-auto mb-2" />
        <p className="text-sm font-semibold text-text mb-1">Subscribed!</p>
        <p className="text-xs text-text-secondary">Thanks for subscribing.</p>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-primary-500/5 to-primary-600/5 border border-primary-500/20">
      <div className="flex items-center gap-2 mb-3">
        <Bell className="h-4 w-4 text-primary-500" />
        <h3 className="font-semibold text-text text-sm">Newsletter</h3>
      </div>
      <p className="text-xs text-text-secondary mb-3 leading-relaxed">Get the latest articles delivered to your inbox.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="honeypot" className="absolute -left-[9999px] -top-[9999px]" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <input
          type="email" value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          placeholder="Your email"
          className="w-full px-3 py-2.5 rounded-lg border border-border/60 bg-surface text-text placeholder:text-text-secondary/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 mb-2"
        />
        {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
        <button
          type="submit" disabled={submitting}
          className="w-full py-2.5 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 disabled:opacity-50 transition-all flex items-center justify-center gap-1.5"
        >
          {submitting ? (
            <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <><Send className="h-3.5 w-3.5" /> Subscribe</>
          )}
        </button>
        <p className="text-[10px] text-text-secondary/60 mt-2 text-center">No spam. Unsubscribe anytime.</p>
      </form>
    </div>
  );
}

function ArticleCard({ post, index }: { post: BlogPost; index: number }) {
  const imgSrc = getBlogImageUrl(post.slug, post.category);
  const imgAlt = getBlogImageAlt(post.slug, post.category);
  const catColors: Record<string, string> = {
    finance: "from-amber-500 to-orange-600",
    health: "from-emerald-500 to-teal-600",
    math: "from-violet-500 to-purple-600",
    engineering: "from-blue-500 to-indigo-600",
    construction: "from-orange-500 to-red-600",
    education: "from-sky-500 to-blue-600",
    "daily-life": "from-pink-500 to-rose-600",
    "unit-conversion": "from-cyan-500 to-teal-600",
    "real-estate": "from-green-500 to-emerald-600",
    retirement: "from-indigo-500 to-violet-600",
    automotive: "from-red-500 to-rose-600",
    "social-media": "from-fuchsia-500 to-pink-600",
    business: "from-amber-500 to-yellow-600",
  };
  const gradient = catColors[post.categorySlug] ?? "from-primary-500 to-primary-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link
        href={`/${post.slug}`}
        className="group block rounded-2xl border border-border/60 bg-surface hover:shadow-xl hover:shadow-primary-500/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        <div className="relative h-48 sm:h-52 overflow-hidden bg-surface-secondary">
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white shadow-lg",
              `bg-gradient-to-r ${gradient}`
            )}>
              {post.category}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 text-xs text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
              <Clock className="h-3 w-3" />
              {post.readingTime} min
            </span>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-text-secondary mb-2.5">
            <CalendarDays className="h-3 w-3" />
            {formatDate(post.publishedAt)}
          </div>
          <h3 className="font-semibold text-text group-hover:text-primary-600 transition-colors mb-2 line-clamp-2 leading-snug">
            {post.title}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-2 mb-4 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-7 h-7 rounded-full bg-gradient-to-br flex items-center justify-center text-[10px] font-bold text-white shrink-0",
                gradient
              )}>
                {post.author.avatar}
              </div>
              <span className="text-xs text-text-secondary">{post.author.name}</span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-all translate-x-[-4px] group-hover:translate-x-0">
              Read <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function FeaturedArticleCard({ post }: { post: BlogPost }) {
  const imgSrc = getBlogImageUrl(post.slug, post.category);
  const imgAlt = getBlogImageAlt(post.slug, post.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Link
        href={`/${post.slug}`}
        className="group block rounded-2xl border border-border/60 bg-surface hover:shadow-xl hover:shadow-primary-500/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        <div className="grid md:grid-cols-5 gap-0">
          <div className="md:col-span-2 relative h-64 md:h-full min-h-[280px] overflow-hidden bg-surface-secondary">
            <Image
              src={imgSrc}
              alt={imgAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-primary-700 backdrop-blur-sm shadow-lg">
                {post.category}
              </span>
            </div>
          </div>
          <div className="md:col-span-3 p-6 sm:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center gap-1.5 text-xs text-text-secondary bg-surface-secondary px-2.5 py-1 rounded-full">
                <Clock className="h-3 w-3" />
                {post.readingTime} min read
              </span>
              <span className="flex items-center gap-1.5 text-xs text-text-secondary">
                <CalendarDays className="h-3 w-3" />
                {formatDate(post.publishedAt)}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text group-hover:text-primary-600 transition-colors mb-3 leading-tight">
              {post.title}
            </h2>
            <p className="text-text-secondary mb-5 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-xs font-bold text-white">
                  {post.author.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">{post.author.name}</p>
                  <p className="text-xs text-text-secondary">{post.author.role}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 group-hover:gap-2 transition-all">
                Read Article <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function TrendingCard({ post, index }: { post: BlogPost; index: number }) {
  const imgSrc = getBlogImageUrl(post.slug, post.category);
  const imgAlt = getBlogImageAlt(post.slug, post.category);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="shrink-0 w-[280px] snap-start"
    >
      <Link
        href={`/${post.slug}`}
        className="group block rounded-2xl border border-border/60 bg-surface hover:shadow-lg hover:shadow-primary-500/5 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
      >
        <div className="relative h-36 overflow-hidden bg-surface-secondary">
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="280px"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute top-2 left-2 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-orange-500 text-white shadow-lg">
              <Flame className="h-2.5 w-2.5" /> Trending
            </span>
          </div>
          <div className="absolute bottom-2 left-2 right-2">
            <span className="inline-flex items-center gap-1 text-[10px] text-white/80 bg-black/30 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
              <Eye className="h-2.5 w-2.5" /> {TRENDING_VIEWS[index % TRENDING_VIEWS.length]} views
            </span>
          </div>
        </div>
        <div className="p-3.5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-medium text-primary-600 bg-primary-500/10 px-1.5 py-0.5 rounded-md">{post.category}</span>
            <span className="text-[10px] text-text-secondary">{post.readingTime} min</span>
          </div>
          <p className="text-sm font-semibold text-text line-clamp-2 leading-snug group-hover:text-primary-600 transition-colors">
            {post.title}
          </p>
          <p className="text-[10px] text-text-secondary mt-1.5">{formatDate(post.publishedAt)}</p>
        </div>
      </Link>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border/60 bg-surface overflow-hidden animate-pulse">
      <div className="h-48 bg-surface-secondary" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-24 bg-surface-secondary rounded-full" />
        <div className="h-4 w-full bg-surface-secondary rounded" />
        <div className="h-4 w-3/4 bg-surface-secondary rounded" />
        <div className="h-3 w-full bg-surface-secondary rounded" />
        <div className="h-3 w-2/3 bg-surface-secondary rounded" />
        <div className="flex items-center gap-2 pt-2">
          <div className="h-7 w-7 rounded-full bg-surface-secondary" />
          <div className="h-3 w-20 bg-surface-secondary rounded" />
        </div>
      </div>
    </div>
  );
}

export function BlogPageClient({ blogs, breadcrumbItems }: BlogPageClientProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const catScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortedByDate = useMemo(() =>
    [...blogs].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
    [blogs]
  );

  const featuredBlog = useMemo(() => blogs.find((b) => b.featured), [blogs]);
  const trendingBlogs = useMemo(() => {
    const popular = blogs.filter((b) => b.popular);
    return popular.length >= 4 ? popular : blogs.slice(0, 8);
  }, [blogs]);

  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    for (const b of blogs) {
      if (b.categorySlug && !seen.has(b.categorySlug)) seen.set(b.categorySlug, b.category);
    }
    const order = ["finance", "health", "math", "engineering", "construction", "education", "daily-life", "unit-conversion", "real-estate", "retirement", "automotive", "social-media", "business"];
    return Array.from(seen.entries())
      .sort((a, b) => { const ai = order.indexOf(a[0]), bi = order.indexOf(b[0]); return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi); })
      .map(([slug, name]) => ({ name, slug }));
  }, [blogs]);

  const isSearching = query.trim().length > 0;
  const queryWords = useMemo(() => query.trim().toLowerCase().split(/\s+/).filter(Boolean), [query]);

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const scored = blogs.map((post) => ({ post, score: scoreBlogPost(post, queryWords) })).filter((item) => item.score > 0).sort((a, b) => b.score - a.score);
    return scored.map((item) => item.post);
  }, [blogs, queryWords, isSearching]);

  const suggestions = useMemo(() => {
    if (!isSearching || queryWords.length === 0) return [];
    return searchResults.slice(0, 5);
  }, [searchResults, isSearching, queryWords]);

  const filteredByCategory = useMemo(() => {
    if (selectedCategory === "all") return blogs;
    return blogs.filter((b) => b.categorySlug === selectedCategory);
  }, [blogs, selectedCategory]);

  const displayBlogs = useMemo(() => {
    if (isSearching) return searchResults;
    return filteredByCategory;
  }, [isSearching, searchResults, filteredByCategory]);

  const displayed = useMemo(() => displayBlogs.slice(0, visibleCount), [displayBlogs, visibleCount]);
  const hasMore = visibleCount < displayBlogs.length;

  const popularPosts = useMemo(() => {
    const popular = blogs.filter((b) => b.popular);
    return popular.length > 0 ? popular : sortedByDate.slice(0, 5);
  }, [blogs, sortedByDate]);

  const recentPosts = useMemo(() => sortedByDate.slice(0, 5), [sortedByDate]);

  const handleLoadMore = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 6, displayBlogs.length));
      setLoading(false);
    }, 400);
  }, [displayBlogs.length]);

  const handleTagClick = useCallback((tag: string) => {
    setQuery(tag);
    setShowSuggestions(true);
  }, []);

  const lastUpdated = sortedByDate.length > 0 ? sortedByDate[0].publishedAt : "";

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/[0.07] via-transparent to-accent-cyan/[0.05] dark:from-primary-500/[0.12] dark:via-transparent dark:to-accent-cyan/[0.08]" />
        <div className="absolute top-0 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-accent-cyan rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "2s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-12 sm:pb-16">
          {/* Breadcrumb */}
          <div className="mb-6 sm:mb-8">
            <nav aria-label="Breadcrumb" className="flex items-center text-xs sm:text-sm text-text-secondary/60">
              <ol className="flex items-center gap-1">
                <li className="flex items-center gap-1">
                  <Link href="/" className="hover:text-text transition-colors" aria-label="Home">
                    <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Link>
                  <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 mx-0.5" aria-hidden="true" />
                </li>
                {breadcrumbItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-1">
                    {item.href ? (
                      <Link href={item.href} className="hover:text-text transition-colors">{item.label}</Link>
                    ) : (
                      <span className="text-text font-medium">{item.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6 border border-primary-500/20">
              <Sparkles className="h-4 w-4" />
              <span>{blogs.length} Articles & Guides</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              <span className="text-gradient">Measurely</span> Blog
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
              Discover tips, guides, and insights about calculators, measurements, financial planning, health metrics, and how to make the most of our tools.
            </p>

            {/* Search */}
            <div ref={searchRef} className="relative max-w-xl mx-auto mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary/60" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); if (isSearching) setVisibleCount(6); }}
                  onFocus={() => { if (query.trim()) setShowSuggestions(true); }}
                  placeholder="Search articles..."
                  aria-label="Search articles"
                  className="w-full pl-12 pr-10 py-3.5 rounded-2xl border border-border/60 bg-surface/80 backdrop-blur-sm text-text placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50 transition-all shadow-lg shadow-primary-500/5"
                />
                {isSearching && (
                  <button
                    onClick={() => { setQuery(""); setShowSuggestions(false); }}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-surface-secondary transition-colors text-text-secondary hover:text-text"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <AnimatePresence>
                {showSuggestions && isSearching && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute z-50 mt-2 w-full rounded-2xl border border-border/60 bg-surface shadow-xl shadow-black/5 overflow-hidden"
                  >
                    <div className="p-2">
                      <p className="text-xs font-medium text-text-secondary/60 px-3 py-1.5">Suggestions</p>
                      {suggestions.map((post) => (
                        <Link
                          key={post.slug}
                          href={`/${post.slug}`}
                          onClick={() => setShowSuggestions(false)}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-secondary transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-surface-secondary overflow-hidden shrink-0">
                            <Image src={getBlogImageUrl(post.slug, post.category)} alt="" width={32} height={32} className="object-cover w-full h-full" />
                          </div>
                          <div className="text-left min-w-0">
                            <p className="text-sm font-medium text-text line-clamp-1">{post.title}</p>
                            <p className="text-xs text-text-secondary">{post.category} · {post.readingTime} min read</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-text-secondary/40 shrink-0 ml-auto" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Popular Tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {POPULAR_TAGS.slice(0, 8).map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-surface-secondary/80 hover:bg-primary-500/10 hover:text-primary-600 border border-border/40 transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-primary-500" />
                {blogs.length} articles
              </span>
              {lastUpdated && (
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-primary-500" />
                  Updated {formatDate(lastUpdated)}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        {/* Featured Article */}
        {featuredBlog && !isSearching && selectedCategory === "all" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10 sm:mb-14"
          >
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="h-5 w-5 text-primary-600" />
              <h2 className="text-lg font-semibold text-text">Featured Article</h2>
            </div>
            <FeaturedArticleCard post={featuredBlog} />
          </motion.div>
        )}

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div
            ref={catScrollRef}
            className="flex items-center gap-2 overflow-x-auto scrollbar-custom pb-2 -mx-4 px-4 lg:mx-0 lg:px-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <button
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
                selectedCategory === "all"
                  ? "bg-primary-600 text-white shadow-lg shadow-primary-500/25"
                  : "bg-surface-secondary/80 text-text-secondary hover:text-text hover:bg-surface-secondary border border-border/40"
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={cn(
                  "shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1.5",
                  selectedCategory === cat.slug
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-500/25"
                    : "bg-surface-secondary/80 text-text-secondary hover:text-text hover:bg-surface-secondary border border-border/40"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Trending Section */}
        {!isSearching && selectedCategory === "all" && trendingBlogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 sm:mb-14"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <h2 className="text-lg font-semibold text-text">Trending Articles</h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <span>Swipe →</span>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-custom pb-2 -mx-4 px-4 lg:mx-0 lg:px-0">
              {trendingBlogs.slice(0, 8).map((post, i) => (
                <TrendingCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-8 lg:gap-10">
          {/* Articles */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-text">
                {isSearching ? `Search Results (${displayBlogs.length})` : selectedCategory === "all" ? "Latest Articles" : `${categories.find(c => c.slug === selectedCategory)?.name ?? selectedCategory}`}
              </h2>
              {isSearching && displayBlogs.length > 0 && (
                <button
                  onClick={() => { setQuery(""); setSelectedCategory("all"); }}
                  className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>

            {displayBlogs.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 rounded-2xl bg-surface-secondary mx-auto mb-5 flex items-center justify-center">
                  <Search className="h-8 w-8 text-text-secondary/40" />
                </div>
                <h3 className="text-xl font-semibold text-text mb-2">No articles found</h3>
                <p className="text-text-secondary max-w-md mx-auto mb-6">
                  {isSearching
                    ? `No results for "${query.trim()}". Try different keywords.`
                    : "No articles in this category yet."}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {categories.slice(0, 5).map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-surface-secondary/80 hover:bg-primary-500/10 hover:text-primary-600 border border-border/40 transition-all"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
                {isSearching && (
                  <button
                    onClick={() => { setQuery(""); setSelectedCategory("all"); }}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-all"
                  >
                    View all articles
                  </button>
                )}
              </motion.div>
            )}

            {displayBlogs.length > 0 && visibleCount === 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {displayBlogs.length > 0 && (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {displayed.map((post, i) => (
                    <ArticleCard key={post.slug} post={post} index={i} />
                  ))}
                </div>

                {hasMore && (
                  <div className="mt-8 text-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLoadMore}
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-primary-600 text-white font-medium hover:bg-primary-700 disabled:opacity-60 transition-all shadow-lg shadow-primary-500/20"
                    >
                      {loading ? (
                        <><RefreshCw className="h-4 w-4 animate-spin" /> Loading...</>
                      ) : (
                        <><ArrowRight className="h-4 w-4" /> Load More Articles</>
                      )}
                    </motion.button>
                    <p className="text-xs text-text-secondary/60 mt-3">
                      Showing {displayed.length} of {displayBlogs.length} articles
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          {!isSearching && (
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Search in Sidebar */}
                <div className="p-4 rounded-2xl border border-border/60 bg-surface">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary/60" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
                      placeholder="Search..."
                      aria-label="Search articles"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-border/60 bg-surface text-text placeholder:text-text-secondary/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* Popular Articles */}
                <div className="p-5 rounded-2xl border border-border/60 bg-surface">
                  <h3 className="text-sm font-semibold text-text flex items-center gap-2 mb-4">
                    <TrendingUp className="h-4 w-4 text-primary-500" />
                    Popular Articles
                  </h3>
                  <div className="space-y-1">
                    {popularPosts.slice(0, 5).map((post, i) => (
                      <Link
                        key={post.slug}
                        href={`/${post.slug}`}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-surface-secondary transition-colors group"
                      >
                        <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 text-[10px] font-bold shrink-0">
                          {i + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-text line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug">
                            {post.title}
                          </p>
                          <p className="text-xs text-text-secondary mt-0.5">{formatDate(post.publishedAt)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Recently Published */}
                <div className="p-5 rounded-2xl border border-border/60 bg-surface">
                  <h3 className="text-sm font-semibold text-text flex items-center gap-2 mb-4">
                    <Clock className="h-4 w-4 text-accent-cyan" />
                    Recently Published
                  </h3>
                  <div className="space-y-2">
                    {recentPosts.slice(0, 4).map((post) => (
                      <Link
                        key={post.slug}
                        href={`/${post.slug}`}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-secondary transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-surface-secondary overflow-hidden shrink-0">
                          <Image
                            src={getBlogImageUrl(post.slug, post.category)}
                            alt=""
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-text line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug">
                            {post.title}
                          </p>
                          <p className="text-xs text-text-secondary mt-0.5">{formatDate(post.publishedAt)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="p-5 rounded-2xl border border-border/60 bg-surface">
                  <h3 className="text-sm font-semibold text-text flex items-center gap-2 mb-4">
                    <LayoutGrid className="h-4 w-4 text-primary-500" />
                    Categories
                  </h3>
                  <PopularCategories />
                </div>

                {/* Newsletter */}
                <NewsletterSidebar />

                {/* Trending Tags */}
                <div className="p-5 rounded-2xl border border-border/60 bg-surface">
                  <h3 className="text-sm font-semibold text-text flex items-center gap-2 mb-4">
                    <Sparkles className="h-4 w-4 text-orange-500" />
                    Trending Tags
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {POPULAR_TAGS.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-surface-secondary/80 hover:bg-primary-500/10 hover:text-primary-600 border border-border/40 transition-all"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
