"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeftRight, History,
  Star, ArrowLeft, RotateCcw, Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PremiumSkeleton } from "@/components/ui/premium-skeleton";
import { ConverterInput } from "./converter-input";
import { ConverterResults } from "./converter-results";
import { convert, getAllConversions, findConverterBySlug, getRelatedConverters } from "@/lib/converter-utils";
import { AdSlot } from "@/components/AdSlot";
import { CONVERTER_BELOW_CARD } from "@/config/adPlacements";
import type { ConversionResult } from "@/types/converters";
import { converters } from "@/data/converters";
import { ToolBlogLink, ToolContentSections } from "@/components/tool-content";
import { findBlogsForTool } from "@/lib/tool-content";
import { getRelatedConvertersByCategory, getRelatedArticlesByCategory } from "@/lib/tool-relations";
import { RelatedTools } from "@/components/tool/related-tools";
import { RelatedArticles } from "@/components/tool/related-articles";
import { ToolFAQ } from "@/components/tool/tool-faq";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { ShareButtons } from "@/components/ui/share-buttons";
import { RecentlyUsed, trackRecentlyUsed } from "@/components/ui/recently-used";
import { TableOfContents } from "@/components/ui/table-of-contents";

interface ConverterLayoutProps {
  slug: string;
}

function useLocalStorage<T>(key: string, initial: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored) as T);
      }
    } catch {}
  }, [key]);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);

  return [value, setValue];
}

export function ConverterLayout({ slug }: ConverterLayoutProps) {
  const definition = useMemo(() => findConverterBySlug(slug, converters), [slug]);

  const [unitGroup, setUnitGroup] = useState(() => definition?.unitGroups?.[0]?.label ?? "");

  const displayUnits = useMemo(() => {
    if (definition?.unitGroups && definition.unitGroups.length > 0) {
      const group = definition.unitGroups.find((g) => g.label === unitGroup);
      return group?.units ?? definition.units;
    }
    return definition?.units ?? [];
  }, [definition, unitGroup]);

  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState(
    definition?.unitGroups?.[0]?.units?.[0]?.symbol ?? definition?.units[0]?.symbol ?? ""
  );
  const [toUnit, setToUnit] = useState(
    (() => {
      const units = definition?.units;
      const firstGroup = definition?.unitGroups?.[0]?.units;
      if (firstGroup) return firstGroup.length > 1 ? firstGroup[1].symbol : firstGroup[0].symbol;
      if (units && units.length > 1) return units[1].symbol;
      return units?.[0]?.symbol ?? "";
    })()
  );
  const [hasConverted, setHasConverted] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [resultValue, setResultValue] = useState("—");
  const [allResults, setAllResults] = useState<ConversionResult[]>([]);
  const [recent, setRecent] = useLocalStorage<{ from: string; to: string; value: string; result?: string }[]>("recent-conversions", []);

  const handleGroupChange = useCallback((label: string) => {
    setUnitGroup(label);
    setValue("");
    setResultValue("—");
    setAllResults([]);
    setHasConverted(false);
    const group = definition?.unitGroups?.find((g) => g.label === label);
    if (group && group.units.length > 0) {
      setFromUnit(group.units[0].symbol);
      setToUnit(group.units.length > 1 ? group.units[1].symbol : group.units[0].symbol);
    }
  }, [definition]);
  const convertTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(convertTimeoutRef.current), []);

  useEffect(() => { if (definition) trackRecentlyUsed(slug, definition.name); }, [slug, definition]);

  const handleConvert = useCallback(() => {
    if (!definition || !value || isNaN(Number(value))) return;

    setIsConverting(true);
    setHasConverted(false);

    convertTimeoutRef.current = setTimeout(() => {
      try {
        const numValue = parseFloat(value);
        const res = convert(numValue, fromUnit, toUnit, displayUnits);
        const formatted = res.toLocaleString("en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 10,
          useGrouping: true,
        });
        setResultValue(formatted);

        const all = getAllConversions(numValue, fromUnit, displayUnits);
        setAllResults(all);

        setHasConverted(true);

        const entry = { from: fromUnit, to: toUnit, value, result: formatted };
        setRecent((prev) => {
          const filtered = prev.filter(
            (r) => !(r.from === entry.from && r.to === entry.to && r.value === entry.value)
          );
          return [entry, ...filtered].slice(0, 5);
        });
      } catch {
        setResultValue("—");
        setAllResults([]);
      } finally {
        setIsConverting(false);
      }
    }, 300);
  }, [definition, value, fromUnit, toUnit, displayUnits, setRecent]);

  const handleSwap = useCallback(() => {
    setFromUnit((prev) => {
      setToUnit(prev);
      return toUnit;
    });
  }, [toUnit]);

  const handleReset = useCallback(() => {
    setValue("");
    setResultValue("—");
    setAllResults([]);
    setHasConverted(false);
    if (displayUnits.length > 0) {
      setFromUnit(displayUnits[0].symbol);
      setToUnit(displayUnits.length > 1 ? displayUnits[1].symbol : displayUnits[0].symbol);
    }
  }, [displayUnits]);

  const showRecent = recent.length > 0 && !hasConverted;

  if (!definition) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-96 mb-8" />
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Skeleton className="h-64 rounded-2xl" />
            </div>
            <div className="lg:col-span-2">
              <Skeleton className="h-96 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const related = getRelatedConverters(slug, converters);
  const relatedBlogs = findBlogsForTool(slug);
  const autoRelated = getRelatedConvertersByCategory(slug, 6);
  const autoRelatedArticles = getRelatedArticlesByCategory(slug, 6);

  const displayRelatedTools = related.length > 0 ? related : autoRelated;
  const displayRelatedArticles = relatedBlogs.length > 0 ? relatedBlogs : autoRelatedArticles;

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <nav className="flex items-center gap-2 text-sm text-muted">
            <a href="/converters" className="hover:text-text transition-colors">Converters</a>
            <span>/</span>
            <span className="text-text">{definition.name}</span>
          </nav>
          <ShareButtons url={typeof window !== "undefined" ? window.location.href : ""} title={definition.name} description={definition.description} className="hidden sm:flex" />
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center shrink-0">
              <definition.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text">{definition.name}</h1>
              <p className="text-sm text-muted mt-1">{definition.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs capitalize">{definition.category}</Badge>
            <Badge variant="success" className="text-xs">Converter</Badge>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left column */}
          <div className="lg:col-span-3 space-y-6">
            {/* Converter input */}
            <div className="bg-surface rounded-2xl border border-border p-5 space-y-4">
              <h2 className="text-sm font-semibold text-text">Converter</h2>

              {definition.unitGroups && definition.unitGroups.length > 0 && (
                <div className="flex flex-wrap gap-1.5 -mx-0.5">
                  {definition.unitGroups.map((group) => (
                    <button
                      key={group.label}
                      onClick={() => handleGroupChange(group.label)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                        unitGroup === group.label
                          ? "bg-primary-500 text-white shadow-sm"
                          : "bg-surface-secondary text-text-secondary hover:bg-surface-secondary/80"
                      }`}
                    >
                      {group.label}
                    </button>
                  ))}
                </div>
              )}

              <ConverterInput
                value={value}
                fromUnit={fromUnit}
                toUnit={toUnit}
                units={displayUnits}
                result={resultValue}
                onValueChange={setValue}
                onFromUnitChange={setFromUnit}
                onToUnitChange={setToUnit}
                onSwap={handleSwap}
                onConvert={handleConvert}
                onReset={handleReset}
                isConverting={isConverting}
                hasConverted={hasConverted}
              />
            </div>

            {/* Results */}
            {isConverting ? (
              <PremiumSkeleton variant="result" />
            ) : hasConverted && allResults.length > 0 ? (
              <ConverterResults
                results={allResults}
                selectedUnit={toUnit}
                onReset={handleReset}
              />
            ) : (
              <div className="bg-surface-secondary rounded-2xl border border-border p-8 text-center">
                <ArrowLeftRight className="h-10 w-10 text-muted mx-auto mb-3" />
                <h3 className="text-base font-semibold text-text mb-1">Ready to Convert</h3>
                <p className="text-sm text-muted">Enter a value and click Convert to see all conversions.</p>
              </div>
            )}

            {/* Recent conversions */}
            {showRecent && recent.length > 0 && (
              <div className="bg-surface rounded-2xl border border-border p-5 space-y-3">
                <h2 className="text-sm font-semibold text-text flex items-center gap-2">
                  <History className="w-4 h-4 text-muted" />
                  Recent Conversions
                </h2>
                <div className="space-y-1">
                  {recent.slice(0, 3).map((r, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setValue(r.value);
                        setFromUnit(r.from);
                        setToUnit(r.to);
                      }}
                      className="flex items-center gap-2 w-full p-2.5 rounded-xl hover:bg-surface-secondary text-sm text-muted transition-colors"
                    >
                      <ArrowLeftRight className="h-3.5 w-3.5 text-muted" />
                      <span>{r.value} {r.from} → {r.to}</span>
                      {r.result && (
                        <span className="ml-auto text-xs font-mono text-primary-500">
                          = {r.result}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular conversions */}
            {definition.popularConversions && definition.popularConversions.length > 0 && (
              <div className="bg-surface rounded-2xl border border-border p-5 space-y-3">
                <h2 className="text-sm font-semibold text-text flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent-amber" />
                  Popular Conversions
                </h2>
                <div className="flex flex-wrap gap-2">
                  {definition.popularConversions.map((pc, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setFromUnit(pc.from);
                        setToUnit(pc.to);
                        if (!value) setValue("1");
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-secondary hover:bg-dark-200 dark:hover:bg-dark-700 text-xs text-muted transition-colors border border-border"
                    >
                      <ArrowLeftRight className="h-3 w-3" />
                      {pc.from} → {pc.to}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column - Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {hasConverted && allResults.length > 0 && (
              <ConverterResults
                results={allResults.filter((r) => r.unit === toUnit)}
                selectedUnit={toUnit}
              />
            )}

            {hasConverted && (
              <Button variant="outline" size="lg" fullWidth onClick={handleReset} className="h-11">
                <RotateCcw className="h-4 w-4" />
                New Conversion
              </Button>
            )}

            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Quick Info */}
              <div className="bg-surface rounded-2xl border border-border p-5">
                <h3 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-primary-500" />
                  About This Tool
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  {definition.description}
                </p>
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted">Category</span>
                    <Badge variant="secondary" className="text-[10px] capitalize">{definition.category}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-muted">Units</span>
                    <span className="text-text font-medium">{definition.units.length}</span>
                  </div>
                </div>
              </div>

              <RecentlyUsed />
              <RelatedTools tools={displayRelatedTools} maxCount={8} />
              <RelatedArticles articles={displayRelatedArticles} maxCount={6} />
              <ToolBlogLink slug={slug} />
              <TableOfContents contentSelector="[data-tool-content]" />

              <Link
                href="/converters"
                className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all converters
              </Link>
            </div>
          </div>
        </div>

        <AdSlot placement={CONVERTER_BELOW_CARD} />

        <div data-tool-content>
          <ToolContentSections slug={slug} type="converter" />
        </div>

        {/* FAQ */}
        {definition.faqs.length > 0 && (
          <div className="mt-8">
            <ToolFAQ items={definition.faqs} />
          </div>
        )}

        <Separator className="my-12" />
      </div>
    </div>
  );
}
