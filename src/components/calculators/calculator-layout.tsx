"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator as CalcIcon, Sparkles, RotateCcw, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PremiumSkeleton } from "@/components/ui/premium-skeleton";
import { CalculatorForm } from "./calculator-form";
import { CalculatorResults } from "./calculator-results";
import { AdSlot } from "@/components/AdSlot";
import { CALCULATOR_AFTER_RESULT, CALCULATOR_BEFORE_FAQ } from "@/config/adPlacements";
import type { CalculatorDefinition, CalculatorResult, ChartConfig } from "@/types/calculators";
import { calculators } from "@/data/calculators";
import { ToolBlogLink, ToolContentSections } from "@/components/tool-content";
import { findBlogsForTool } from "@/lib/tool-content";
import { getRelatedToolsByCategory, getRelatedArticlesByCategory } from "@/lib/tool-relations";
import { RelatedTools } from "@/components/tool/related-tools";
import { RelatedArticles } from "@/components/tool/related-articles";
import { ToolFAQ } from "@/components/tool/tool-faq";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { ShareButtons } from "@/components/ui/share-buttons";
import { RecentlyUsed, trackRecentlyUsed } from "@/components/ui/recently-used";
import { TableOfContents } from "@/components/ui/table-of-contents";
import { motion } from "framer-motion";

interface CalculatorLayoutProps {
  slug: string;
}

export function CalculatorLayout({ slug }: CalculatorLayoutProps) {
  const definition = calculators.find((c) => c.slug === slug)!;

  const [values, setValues] = useState<Record<string, number | string>>(() => {
    const initial: Record<string, number | string> = {};
    for (const input of definition.inputs) {
      initial[input.key] = input.defaultValue ?? "";
    }
    return initial;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [results, setResults] = useState<CalculatorResult[]>([]);
  const [chart, setChart] = useState<ChartConfig | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const calcTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(calcTimeoutRef.current), []);

  useEffect(() => { trackRecentlyUsed(slug, definition.name); }, [slug, definition.name]);

  const validate = useCallback(
    (vals: Record<string, number | string>): Record<string, string> => {
      const errs: Record<string, string> = {};
      for (const input of definition.inputs) {
        const val = vals[input.key];
        if (input.required === false && (!val || val === "")) continue;
        if (input.type === "date" || input.type === "time") {
          if (!val || val === "") {
            errs[input.key] = `Please select a ${input.label.toLowerCase()}`;
          }
        } else if (input.type === "number" && val !== "") {
          const num = Number(val);
          if (isNaN(num)) errs[input.key] = "Please enter a valid value";
          else if (input.min !== undefined && num < input.min)
            errs[input.key] = `Minimum value is ${input.min}`;
          else if (input.max !== undefined && num > input.max)
            errs[input.key] = `Maximum value is ${input.max}`;
        } else if (input.type !== "select" && input.type !== "radio") {
          if (val === "" || val === undefined) {
            errs[input.key] = "Input cannot be empty";
          }
        }
      }
      return errs;
    },
    [definition.inputs]
  );

  const handleChange = useCallback(
    (key: string, value: number | string) => {
      const newValues = { ...values, [key]: value };
      setValues(newValues);
      const errs = validate(newValues);
      setErrors(errs);
    },
    [values, validate]
  );

  const handleCalculate = useCallback(() => {
    const errs = validate(values);
    setErrors(errs);
    const hasErrors = Object.keys(errs).length > 0;
    if (hasErrors) {
      setResults([]);
      setChart(null);
      setHasCalculated(false);
      return;
    }

    const allFilled = definition.inputs.every((input) => {
      if (input.required === false) return true;
      const val = values[input.key];
      return val !== "" && val !== undefined;
    });

    if (!allFilled) {
      setResults([]);
      setChart(null);
      setHasCalculated(false);
      return;
    }

    setIsCalculating(true);

    calcTimeoutRef.current = setTimeout(() => {
      try {
        const computed = definition.compute(values);
        const mapped = computed.map((r) => ({
          ...r,
          value: typeof r.value === "number" && isNaN(r.value) ? "---" : r.value,
        }));
        setResults(mapped);

        if (definition.chart) {
          const chartConfig = definition.chart(mapped, values);
          setChart(chartConfig);
        } else {
          setChart(null);
        }

        setHasCalculated(true);
      } catch {
        setResults([]);
        setChart(null);
      } finally {
        setIsCalculating(false);
      }
    }, 300);
  }, [values, definition, validate]);

  const handleReset = useCallback(() => {
    const initial: Record<string, number | string> = {};
    for (const input of definition.inputs) {
      initial[input.key] = input.defaultValue ?? "";
    }
    setValues(initial);
    setErrors({});
    setResults([]);
    setChart(null);
    setHasCalculated(false);
  }, [definition.inputs]);

  const handleLoadExample = useCallback(() => {
    if (definition.example.inputs) {
      const newVals: Record<string, number | string> = {};
      for (const [key, value] of Object.entries(definition.example.inputs)) {
        newVals[key] = value;
      }
      setValues(newVals);
      setErrors({});
      setResults([]);
      setChart(null);
      setHasCalculated(false);
    }
  }, [definition.example.inputs]);

  const relatedTools = useMemo(
    () =>
      definition.relatedSlugs
        .map((slug) => calculators.find((c) => c.slug === slug))
        .filter(Boolean) as CalculatorDefinition[],
    [definition.relatedSlugs]
  );

  const relatedBlogs = useMemo(() => findBlogsForTool(slug), [slug]);

  const autoRelatedTools = useMemo(() => getRelatedToolsByCategory(slug, 6), [slug]);
  const autoRelatedArticles = useMemo(() => getRelatedArticlesByCategory(slug, 6), [slug]);

  const displayRelatedTools = relatedTools.length > 0 ? relatedTools : autoRelatedTools;
  const displayRelatedArticles = relatedBlogs.length > 0 ? relatedBlogs : autoRelatedArticles;

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <nav className="flex items-center gap-2 text-sm text-muted">
            <a href="/calculators" className="hover:text-text transition-colors">Calculators</a>
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
            <Badge variant="info" className="text-xs">Calculator</Badge>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left column */}
          <div className="lg:col-span-3 space-y-6">
            {/* Inputs */}
            <div className="bg-surface rounded-2xl border border-border p-5 space-y-4">
              <h2 className="text-sm font-semibold text-text">Input Values</h2>
              <CalculatorForm
                definition={definition}
                values={values}
                onChange={handleChange}
                errors={errors}
                onCalculate={handleCalculate}
                onReset={handleReset}
                isCalculating={isCalculating}
                hasCalculated={hasCalculated}
              />
            </div>

            {/* Results */}
            {isCalculating ? (
              <PremiumSkeleton variant="result" />
            ) : hasCalculated && results.length > 0 ? (
              <CalculatorResults
                results={results}
                chart={chart}
                onReset={handleReset}
              />
            ) : (
              <div className="bg-surface-secondary rounded-2xl border border-border p-8 text-center">
                <CalcIcon className="h-10 w-10 text-muted mx-auto mb-3" />
                <h3 className="text-base font-semibold text-text mb-1">Ready to Calculate</h3>
                <p className="text-sm text-muted">Enter values and click Calculate to see results.</p>
              </div>
            )}

            {/* Example */}
            {definition.example.inputs && Object.keys(definition.example.inputs).length > 0 && (
              <div className="bg-surface rounded-2xl border border-border p-5 space-y-4">
                <h2 className="text-sm font-semibold text-text flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent-amber" />
                  Example
                </h2>
                <div className="space-y-2">
                  {Object.entries(definition.example.inputs).map(([key, value]) => {
                    const input = definition.inputs.find((i) => i.key === key);
                    return (
                      <div key={key} className="flex items-center justify-between py-2 px-3 rounded-lg bg-surface-secondary border border-border">
                        <span className="text-sm text-muted">{input?.label || key}</span>
                        <span className="text-sm font-semibold text-text text-right">{String(value)}</span>
                      </div>
                    );
                  })}
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button variant="outline" size="sm" onClick={handleLoadExample}>
                      Load Example Values
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleReset}>
                      <RotateCcw className="h-3.5 w-3.5" />
                      Reset All
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <AdSlot placement={CALCULATOR_AFTER_RESULT} />
          </div>

          {/* Right column - Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {hasCalculated && (
              <Button variant="outline" size="lg" fullWidth onClick={handleReset} className="h-11">
                <RotateCcw className="h-4 w-4" />
                New Calculation
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
                {definition.formula && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <span className="text-muted text-[10px] uppercase tracking-wider font-semibold">Formula</span>
                    <code className="mt-1 block text-xs text-text font-mono bg-surface-secondary rounded px-2 py-1.5 leading-relaxed">
                      {definition.formula}
                    </code>
                  </div>
                )}
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted">Category</span>
                    <Badge variant="secondary" className="text-[10px] capitalize">{definition.category}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-muted">Inputs</span>
                    <span className="text-text font-medium">{definition.inputs.length}</span>
                  </div>
                </div>
              </div>

              <RecentlyUsed />
              <RelatedTools tools={displayRelatedTools} maxCount={8} />
              <RelatedArticles articles={displayRelatedArticles} maxCount={6} />
              <ToolBlogLink slug={slug} />
              <TableOfContents contentSelector="[data-tool-content]" />

              <Link
                href="/calculators"
                className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all calculators
              </Link>
            </div>
          </div>
        </div>

        <AdSlot placement={CALCULATOR_BEFORE_FAQ} />

        <div data-tool-content>
          <ToolContentSections slug={slug} type="calculator" />
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
