"use client";

import { useEffect, useCallback, useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Calculator,
  Repeat,
  FileText,
  Grid3X3,
  TrendingUp,
  Heart,
  Sigma,
  ArrowLeftRight,
  Clock,
  GraduationCap,
  Cpu,
  Hammer,
  Sparkles,
  History,
  Search,
  HelpCircle,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { DialogTitle } from "@/components/ui/dialog";
import { useSearchStore } from "@/hooks/use-search-store";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { buildSearchIndex, searchIndex as searchIndexFn, getHighlightSegments } from "@/lib/search";
import type { SearchableItem } from "@/lib/search";

const categoryIcons: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="h-4 w-4" />,
  Heart: <Heart className="h-4 w-4" />,
  Sigma: <Sigma className="h-4 w-4" />,
  ArrowLeftRight: <ArrowLeftRight className="h-4 w-4" />,
  Clock: <Clock className="h-4 w-4" />,
  GraduationCap: <GraduationCap className="h-4 w-4" />,
  Cpu: <Cpu className="h-4 w-4" />,
  Hammer: <Hammer className="h-4 w-4" />,
  Sparkles: <Sparkles className="h-4 w-4" />,
};

function getTypeIcon(type: string): React.ReactNode {
  switch (type) {
    case "tool":
      return <Calculator className="h-4 w-4" />;
    case "blog":
      return <FileText className="h-4 w-4" />;
    case "faq":
      return <HelpCircle className="h-4 w-4" />;
    default:
      return <Search className="h-4 w-4" />;
  }
}

function getTypeBadgeColor(type: string): string {
  switch (type) {
    case "tool":
      return "bg-primary-500/10 text-primary-600 dark:text-primary-400 border-primary-500/20";
    case "blog":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    case "faq":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    default:
      return "bg-surface-secondary text-muted border-border/60";
  }
}

function HighlightText({ text, query }: { text: string; query: string }) {
  const segments = useMemo(
    () => getHighlightSegments(text, query),
    [text, query]
  );

  return (
    <>
      {segments.map((seg, i) =>
        seg.highlighted ? (
          <mark
            key={i}
            className="bg-primary-200/60 dark:bg-primary-500/30 text-inherit rounded-sm px-0.5"
          >
            {seg.text}
          </mark>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </>
  );
}

interface ResultItemProps {
  item: SearchableItem;
  query: string;
  onSelect: (href: string, title: string) => void;
  type: "recent" | "search";
}

function ResultItem({ item, query, onSelect, type }: ResultItemProps) {
  const icon = getTypeIcon(item.type);
  const badgeColor = getTypeBadgeColor(item.type);
  const badgeLabel = item.type === "tool" ? "Tool" : item.type === "blog" ? "Article" : "FAQ";

  return (
    <CommandItem
      key={`${type}-${item.id}`}
      value={item.title}
      onSelect={() => onSelect(item.href, item.title)}
      className="rounded-xl px-3 py-3 cursor-pointer"
    >
      <span className="mr-3 flex items-center justify-center w-8 h-8 rounded-lg bg-surface dark:bg-dark-700 text-muted shrink-0">
        {icon}
      </span>
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm truncate">
            {type === "recent" ? (
              item.title
            ) : (
              <HighlightText text={item.title} query={query} />
            )}
          </span>
          <span
            className={`shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${badgeColor}`}
          >
            {badgeLabel}
          </span>
        </div>
        <span className="text-xs text-muted-foreground truncate mt-0.5">
          {item.description}
        </span>
        <span className="text-[10px] text-muted mt-0.5">{item.category}</span>
      </div>
    </CommandItem>
  );
}

const searchIndexItems = buildSearchIndex();

export function SearchCommand() {
  const { isOpen, setIsOpen } = useSearchStore();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useLocalStorage<string[]>("recent-searches", []);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(
    () => searchIndexFn(query, searchIndexItems),
    [query]
  );

  const toolResults = useMemo(
    () => results.filter((r) => r.item.type === "tool"),
    [results]
  );

  const blogResults = useMemo(
    () => results.filter((r) => r.item.type === "blog"),
    [results]
  );

  const faqResults = useMemo(
    () => results.filter((r) => r.item.type === "faq"),
    [results]
  );

  const recentItems = useMemo(
    () =>
      recent
        .map((title) => searchIndexItems.find((item) => item.title === title))
        .filter((item): item is SearchableItem => item !== undefined),
    [recent]
  );

  const popularTools = useMemo(
    () => searchIndexItems.filter((item) => item.type === "tool").slice(0, 5),
    []
  );

  const handleSelect = useCallback(
    (href: string, title: string) => {
      setRecent((prev) => {
        const next = [title, ...prev.filter((r) => r !== title)];
        return next.slice(0, 5);
      });
      setIsOpen(false);
      setQuery("");
      setTimeout(() => {
        router.push(href);
      }, 150);
    },
    [router, setIsOpen, setRecent]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "/" && !isOpen && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setIsOpen(true);
      }
    },
    [isOpen, setIsOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTitle className="sr-only">Search</DialogTitle>
      <CommandInput
        ref={inputRef}
        placeholder="Search calculators, articles..."
        className="text-base"
        onValueChange={setQuery}
      />
      <CommandList>
        {query.trim().length < 2 && recentItems.length > 0 && (
          <>
            <CommandGroup heading="Recent Searches">
              {recentItems.map((item) => (
                <ResultItem
                  key={`recent-${item.id}`}
                  item={item}
                  query={query}
                  onSelect={handleSelect}
                  type="recent"
                />
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {query.trim().length < 2 && recentItems.length === 0 && popularTools.length > 0 && (
          <>
            <CommandGroup heading="Popular Tools">
              {popularTools.map((item) => (
                <ResultItem
                  key={`popular-${item.id}`}
                  item={item}
                  query={query}
                  onSelect={handleSelect}
                  type="search"
                />
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {query.trim().length >= 2 && results.length === 0 && (
          <CommandEmpty>
            <div className="flex flex-col items-center py-8">
              <Search className="h-10 w-10 text-muted/50 mb-3" />
              <p className="text-sm font-medium text-text">No results found</p>
              <p className="text-xs text-muted mt-1 max-w-xs text-center">
                No results for &ldquo;{query.trim()}&rdquo;. Try different keywords.
              </p>
            </div>
          </CommandEmpty>
        )}

        {query.trim().length >= 2 && toolResults.length > 0 && (
          <CommandGroup heading={`Tools (${toolResults.length})`}>
            {toolResults.slice(0, 6).map(({ item }) => (
              <ResultItem
                key={`tool-${item.id}`}
                item={item}
                query={query}
                onSelect={handleSelect}
                type="search"
              />
            ))}
          </CommandGroup>
        )}

        {query.trim().length >= 2 && blogResults.length > 0 && (
          <CommandGroup heading={`Articles (${blogResults.length})`}>
            {blogResults.slice(0, 4).map(({ item }) => (
              <ResultItem
                key={`blog-${item.id}`}
                item={item}
                query={query}
                onSelect={handleSelect}
                type="search"
              />
            ))}
          </CommandGroup>
        )}

        {query.trim().length >= 2 && faqResults.length > 0 && (
          <CommandGroup heading={`FAQs (${faqResults.length})`}>
            {faqResults.slice(0, 3).map(({ item }) => (
              <ResultItem
                key={`faq-${item.id}`}
                item={item}
                query={query}
                onSelect={handleSelect}
                type="search"
              />
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}

export default SearchCommand;
