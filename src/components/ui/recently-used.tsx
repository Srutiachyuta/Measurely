"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecentlyUsedItem {
  slug: string;
  name: string;
  timestamp: number;
}

export function RecentlyUsed({ maxItems = 4, className }: { maxItems?: number; className?: string }) {
  const [items, setItems] = useState<RecentlyUsedItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("recently-used-tools");
      if (stored) {
        const parsed: RecentlyUsedItem[] = JSON.parse(stored);
        setItems(parsed.slice(0, maxItems));
      }
    } catch {}
  }, [maxItems]);

  if (items.length === 0) return null;

  return (
    <div className={cn("space-y-2", className)}>
      <h3 className="text-xs font-semibold text-text uppercase tracking-wider flex items-center gap-2 mb-3">
        <Clock className="h-3.5 w-3.5 text-muted" />
        Recently Used
      </h3>
      <div className="space-y-1">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/${item.slug}`}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-muted hover:text-text hover:bg-surface-secondary transition-all duration-200 group"
          >
            <span className="truncate">{item.name}</span>
            <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export function trackRecentlyUsed(slug: string, name: string) {
  try {
    const stored = localStorage.getItem("recently-used-tools");
    const items: RecentlyUsedItem[] = stored ? JSON.parse(stored) : [];
    const filtered = items.filter((i) => i.slug !== slug);
    filtered.unshift({ slug, name, timestamp: Date.now() });
    localStorage.setItem("recently-used-tools", JSON.stringify(filtered.slice(0, 10)));
  } catch {}
}
