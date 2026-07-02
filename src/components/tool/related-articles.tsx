"use client";

import Link from "next/link";
import { BookOpen, CalendarDays, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

interface RelatedArticlesProps {
  articles: BlogPost[];
  maxCount?: number;
}

export function RelatedArticles({ articles, maxCount = 6 }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  const display = articles.slice(0, maxCount);

  return (
    <div className="bg-surface rounded-2xl border border-border p-5 space-y-3">
      <h3 className="text-sm font-semibold text-text flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-accent-cyan" />
        Related Articles
      </h3>
      <div className="space-y-1">
        {display.map((article) => (
          <Link
            key={article.slug}
            href={`/${article.slug}`}
            className={cn(
              "flex items-center gap-3 p-2.5 rounded-xl transition-colors",
              "hover:bg-surface-secondary group"
            )}
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shrink-0 text-white text-xs font-bold">
              {article.author.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-text line-clamp-1 group-hover:text-primary-500 transition-colors">
                {article.title}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted mt-0.5">
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="w-3 h-3" />
                  {formatDate(article.publishedAt, { style: "short" })}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readingTime} min
                </span>
              </div>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-muted group-hover:text-accent-cyan group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
