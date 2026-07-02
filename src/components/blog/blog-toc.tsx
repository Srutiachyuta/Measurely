"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface BlogTableOfContentsProps {
  items: TocItem[];
}

const NAVBAR_HEIGHT = 64;

export function BlogTableOfContents({ items }: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: 0 }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    if (!activeId) return;
    const el = itemRefs.current.get(activeId);
    if (el && listRef.current) {
      const container = listRef.current;
      const itemTop = el.offsetTop;
      const itemBottom = itemTop + el.offsetHeight;
      const containerTop = container.scrollTop;
      const containerBottom = containerTop + container.clientHeight;

      if (itemTop < containerTop || itemBottom > containerBottom) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [activeId]);

  useEffect(() => {
    const handleScroll = () => {
      const docEl = document.documentElement;
      const scrollTop = docEl.scrollTop || document.body.scrollTop;
      const scrollHeight = docEl.scrollHeight - docEl.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        const top =
          el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT - 24;
        window.scrollTo({ top, behavior: "smooth" });
        setActiveId(id);
      }
    },
    []
  );

  const setItemRef = useCallback(
    (id: string, el: HTMLAnchorElement | null) => {
      if (el) {
        itemRefs.current.set(id, el);
      } else {
        itemRefs.current.delete(id);
      }
    },
    []
  );

  if (items.length === 0) return null;

  return (
    <div
      className="p-5 rounded-2xl border border-border/60 bg-surface"
      style={{ position: "sticky", top: "90px" }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-text uppercase tracking-wider flex items-center gap-2">
          <List className="h-4 w-4 text-muted shrink-0" />
          On This Page
        </span>
        <span className="text-xs tabular-nums text-muted">{Math.round(scrollProgress)}%</span>
      </div>

      {/* Scroll progress bar */}
      <div className="h-1 rounded-full bg-border/40 mb-3">
        <div
          className="h-full rounded-full bg-primary-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        ref={listRef}
        className="overflow-y-auto scrollbar-custom"
        style={{ maxHeight: "calc(100vh - 280px)" }}
        role="navigation"
        aria-label="Table of contents"
      >
        <ul className="space-y-0.5 border-l-2 border-border/40">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                ref={(el) => setItemRef(item.id, el)}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  "block text-sm py-1.5 pr-3 rounded-r-lg transition-all duration-200 border-l-2 -ml-[2px]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40 focus-visible:ring-offset-1",
                  item.level === 3 && "ml-4",
                  item.level === 4 && "ml-8",
                  activeId === item.id
                    ? "border-primary-500 bg-primary-500/10 text-primary-600 dark:text-primary-400 font-semibold"
                    : "border-transparent text-muted hover:text-text hover:bg-surface-secondary hover:border-border"
                )}
                aria-current={activeId === item.id ? "true" : undefined}
              >
                <span
                  className={cn(
                    "leading-snug break-words",
                    item.level === 2 && "font-medium"
                  )}
                >
                  {item.text}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
