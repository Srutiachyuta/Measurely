"use client";

import { useState, useMemo, useCallback } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import type { BlogPost } from "@/types";

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

  for (const tag of post.tags) {
    score += matchesField(queryWords, tag) * 4;
  }

  for (const kw of post.keywords) {
    score += matchesField(queryWords, kw) * 3;
  }

  score += matchesField(queryWords, post.author.name) * 3;

  return score;
}

interface BlogSearchContentProps {
  blogs: BlogPost[];
}

export function BlogSearchContent({ blogs }: BlogSearchContentProps) {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const isSearching = query.trim().length > 0;
  const queryWords = useMemo(
    () =>
      query
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean),
    [query]
  );

  const filtered = useMemo(() => {
    if (!isSearching) return blogs;

    const scored = blogs
      .map((post) => ({
        post,
        score: scoreBlogPost(post, queryWords),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);

    return scored.map((item) => item.post);
  }, [blogs, queryWords, isSearching]);

  const displayed = useMemo(
    () => (isSearching ? filtered : filtered.slice(0, visibleCount)),
    [filtered, visibleCount, isSearching]
  );

  const hasMore = visibleCount < blogs.length;

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + 6, blogs.length));
  }, [blogs.length]);

  const handleClear = useCallback(() => {
    setQuery("");
    setVisibleCount(6);
  }, []);

  return (
    <div>
      <div className="relative mb-8 max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (isSearching) setVisibleCount(6);
          }}
          placeholder="Search articles..."
          aria-label="Search articles"
          className="w-full pl-12 pr-10 py-3 rounded-xl border border-border/60 bg-surface text-text placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500/50 transition-all"
        />
        {isSearching && (
          <button
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-surface-secondary transition-colors text-text-secondary hover:text-text"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isSearching && filtered.length === 0 && (
        <div className="text-center py-16">
          <Search className="h-12 w-12 text-text-secondary/40 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text mb-2">No posts found</h3>
          <p className="text-text-secondary max-w-md mx-auto">
            No articles match &ldquo;{query.trim()}&rdquo;. Try searching with different keywords.
          </p>
        </div>
      )}

      {displayed.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-5">
          {displayed.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {!isSearching && hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={handleLoadMore}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/60 bg-surface text-text font-medium hover:border-primary-500/30 hover:text-primary-600 transition-all"
          >
            Load More Articles <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
