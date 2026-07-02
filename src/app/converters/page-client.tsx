"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, ArrowLeftRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolCard } from "@/components/home/tool-card";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import type { BreadcrumbItem } from "@/types";
import { converters } from "@/data/converters";
import { ErrorBoundary } from "@/components/ui/error-boundary";

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Converters" },
];

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Length", value: "length" },
  { label: "Weight", value: "weight" },
  { label: "Area", value: "area" },
  { label: "Volume", value: "volume" },
  { label: "Speed", value: "speed" },
  { label: "Temperature", value: "temperature" },
  { label: "Others", value: "others" },
];

function getFilterCategory(slug: string): string {
  const map: Record<string, string> = {
    "length-converter": "length",
    "weight-converter": "weight",
    "area-converter": "area",
    "volume-converter": "volume",
    "speed-converter": "speed",
    "temperature-converter": "temperature",
  };
  return map[slug] || "others";
}

export function ConvertersPageClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(0);
  const perPage = 12;

  const filtered = useMemo(() => {
    let result = converters;
    if (!result || !Array.isArray(result)) return [];
    if (result.length === 0) return [];
    if (category !== "all") {
      result = result.filter((c) => c && getFilterCategory(c.slug) === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c && (
            (c.name && c.name.toLowerCase().includes(q)) ||
            (c.description && c.description.toLowerCase().includes(q))
          )
      );
    }
    return result;
  }, [category, search]);

  const paginated = useMemo(
    () => filtered.slice(0, (page + 1) * perPage),
    [filtered, page]
  );

  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />
        {/* Header */}
        <ErrorBoundary fallback={
          <div className="text-center py-16">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-500/10 mx-auto mb-4">
              <ArrowLeftRight className="h-7 w-7 text-primary-500" />
            </div>
            <h2 className="text-xl font-semibold text-text mb-2">Unit Converters</h2>
            <p className="text-text-secondary">Browse our complete collection of free online unit converters.</p>
          </div>
        }>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-600/5 dark:from-primary-500/20 dark:to-primary-600/10 text-primary-600 dark:text-primary-400 mx-auto mb-4">
            <ArrowLeftRight className="h-8 w-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-text mb-3">All Unit Converters</h1>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed">
            Browse our complete collection of free online unit converters. Convert between length, weight, area, volume, speed, temperature, and many more units instantly.
          </p>
        </motion.div>

        {/* Search and filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted" />
            <Input
              placeholder="Search converters..."
              aria-label="Search converters"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              className="pl-10 h-11"
            />
          </div>
          <div className="overflow-x-auto w-full sm:w-auto scrollbar-hide">
            <Tabs value={category} onValueChange={(v) => { setCategory(v); setPage(0); }}>
              <TabsList className="w-max">
                {CATEGORIES.map((cat) => (
                  <TabsTrigger key={cat.value} value={cat.value} className="whitespace-nowrap">
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </motion.div>

        {/* Results */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-secondary mx-auto mb-4">
              <SlidersHorizontal className="h-8 w-8 text-muted" />
            </div>
            <p className="text-lg text-text-secondary font-medium">No converters found</p>
            <p className="text-sm text-muted mt-1">Try adjusting your search or filter</p>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04 } },
              }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {paginated.map((conv, i) => (
                <motion.div
                  key={conv.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                >
                  <ToolCard
                    name={conv.name}
                    slug={conv.slug}
                    category="Converter"
                    categorySlug="unit-converters"
                    icon={conv.icon.displayName || "ArrowLeftRight"}
                    description={conv.description}
                  />
                </motion.div>
              ))}
            </motion.div>

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

            {totalPages > 1 && (
              <p className="text-center text-sm text-muted mt-4">
                Showing {paginated.length} of {filtered.length} converters
              </p>
            )}
          </>
        )}
        </ErrorBoundary>
      </div>
    </div>
  );
}
