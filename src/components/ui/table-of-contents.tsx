"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";

interface TocItem {
  id: string;
  label: string;
  level: number;
}

interface TableOfContentsProps {
  contentSelector?: string;
  className?: string;
}

export function TableOfContents({ contentSelector = "[data-toc]", className }: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const container = contentSelector
      ? document.querySelector(contentSelector)
      : document;

    if (!container) {
      setItems([]);
      return;
    }

    const headings = container.querySelectorAll("h2, h3");
    const tocItems: TocItem[] = Array.from(headings).map((h) => ({
      id: h.id || h.textContent?.toLowerCase().replace(/\s+/g, "-") || "",
      label: h.textContent || "",
      level: h.tagName === "H2" ? 2 : 3,
    }));

    tocItems.forEach((item) => {
      if (item.id) {
        const el = document.getElementById(item.id);
        if (!el) {
          const heading = Array.from(container.querySelectorAll("h2, h3")).find(
            (h) => h.textContent === item.label
          );
          if (heading && !heading.id) {
            heading.id = item.id;
          }
        }
      }
    });

    setItems(tocItems.filter((i) => i.label));
  }, [contentSelector]);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className={cn("space-y-1", className)}>
      <h3 className="text-xs font-semibold text-text uppercase tracking-wider mb-3 flex items-center gap-2">
        <List className="h-3.5 w-3.5 text-muted" />
        On This Page
      </h3>
      <nav className="space-y-0.5">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(item.id);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
                setActiveId(item.id);
              }
            }}
            className={cn(
              "block text-xs py-1.5 px-3 rounded-lg transition-all duration-200",
              item.level === 3 && "ml-3",
              activeId === item.id
                ? "bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium"
                : "text-muted hover:text-text hover:bg-surface-secondary"
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
