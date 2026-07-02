"use client";

import { useCallback, useState, useRef, forwardRef } from "react";
import type { LucideProps } from "lucide-react";
import { motion } from "framer-motion";
import {
  Copy,
  Check,
  Share2,
  Download,
  RotateCcw,
  Wallet,
  Calendar,
  Clock,
  TrendingUp,
  Banknote,
  Heart,
  Cake,
  PiggyBank,
  Percent,
  Activity,
  Droplets,
  Baby,
  Flame,
  Award,
  Divide,
  Zap,
  PaintBucket,
  Calculator,
  Gauge,
  GraduationCap,
  Receipt,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { copyToClipboard, downloadAsFile, formatIndianNumber } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import type { CalculatorResult, ChartConfig } from "@/types/calculators";
import dynamic from "next/dynamic";

const ChartComponent = dynamic(() => import("./calculator-chart"), {
  ssr: false,
  loading: () => (
    <div className="h-48 rounded-xl bg-surface-secondary dark:bg-dark-800/50 animate-pulse" />
  ),
});

interface CalculatorResultsProps {
  results: CalculatorResult[];
  chart?: ChartConfig | null;
  onReset?: () => void;
  title?: string;
}

const colorMap: Record<string, string> = {
  green: "text-emerald-600 dark:text-emerald-400",
  red: "text-red-500",
  amber: "text-amber-500",
  blue: "text-sky-600 dark:text-sky-400",
  default: "text-text",
};

const bgMap: Record<string, string> = {
  green: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200/50 dark:border-emerald-500/20",
  red: "bg-red-50 dark:bg-red-500/10 border-red-200/50 dark:border-red-500/20",
  amber: "bg-amber-50 dark:bg-amber-500/10 border-amber-200/50 dark:border-amber-500/20",
  blue: "bg-sky-50 dark:bg-sky-500/10 border-sky-200/50 dark:border-sky-500/20",
  default: "bg-surface-secondary dark:bg-dark-800/30 border-border/60",
};

const iconBgMap: Record<string, string> = {
  green: "bg-emerald-500 text-white",
  red: "bg-red-500 text-white",
  amber: "bg-amber-500 text-white",
  blue: "bg-sky-500 text-white",
  default: "bg-primary-500 text-white",
};

const Grid3x3 = forwardRef<SVGSVGElement, LucideProps>(({ className, ...props }, ref) => (
  <svg ref={ref} className={className} {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
));
Grid3x3.displayName = "Grid3x3";

const CircuitBoard = forwardRef<SVGSVGElement, LucideProps>(({ className, ...props }, ref) => (
  <svg ref={ref} className={className} {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M11 9h4a2 2 0 0 1 2 2v4" /><path d="M9 11v4" /><path d="M13 13h-2" />
  </svg>
));
CircuitBoard.displayName = "CircuitBoard";

const iconMap: Record<string, LucideIcon> = {
  emi: Wallet,
  monthlyPayment: Wallet,
  totalInterest: TrendingUp,
  totalPayment: Banknote,
  principalInterest: Banknote,
  propertyTaxMonth: Receipt,
  insuranceMonth: Heart,
  totalMonthly: Banknote,
  monthlyGross: Wallet,
  annualGross: Banknote,
  inHandMonthly: Wallet,
  inHandAnnual: PiggyBank,
  maturityAmount: PiggyBank,
  maturityValue: PiggyBank,
  interestEarned: TrendingUp,
  interest: TrendingUp,
  investedAmount: Banknote,
  totalInvested: Banknote,
  estimatedReturns: TrendingUp,
  totalWithdrawn: Banknote,
  remainingBalance: PiggyBank,
  totalReturns: TrendingUp,
  bmi: Activity,
  bmr: Flame,
  bodyFat: Percent,
  category: Award,
  age: Cake,
  inMonths: Calendar,
  inWeeks: Calendar,
  totalDays: Calendar,
  totalHours: Clock,
  totalMinutes: Clock,
  totalSeconds: Clock,
  nextBday: Cake,
  daysUntilNext: Calendar,
  dueDate: Calendar,
  currentWeek: Baby,
  weeksLeft: Clock,
  trimester: Heart,
  gpa: GraduationCap,
  cgpa: GraduationCap,
  percentage: Percent,
  gradePoint: Award,
  letterGrade: Award,
  gcf: Divide,
  lcm: Divide,
  maxHR: Heart,
  restingHR: Heart,
  moderate: Activity,
  vigorous: Gauge,
  fatBurn: Flame,
  cardio: Heart,
  peak: Zap,
  voltage: Zap,
  current: Zap,
  resistance: CircuitBoard,
  power: Gauge,
  volume: Calculator,
  roofArea: Calculator,
  paintLiters: PaintBucket,
  tiles: Grid3x3,
  planks: Gauge,
  discountAmount: Percent,
  finalPrice: Banknote,
  savings: PiggyBank,
  tipAmount: Wallet,
  eachPays: Wallet,
  perPerson: Wallet,
  fuelNeeded: Droplets,
  totalCost: Banknote,
  costPerKm: TrendingUp,
};

function PrimaryIcon({ resultKey, className }: { resultKey: string; className?: string }) {
  const Icon = iconMap[resultKey] || Sparkles;
  return <Icon className={className} />;
}

function formatCalculatedValue(value: number | string, unit?: string): string {
  if (typeof value === "number") {
    if (unit === "₹" || unit?.startsWith("₹/")) {
      return formatIndianNumber(value);
    }
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return String(value);
}

export function CalculatorResults({ results, chart, onReset, title = "Results" }: CalculatorResultsProps) {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const formatResults = useCallback(() => {
    return results
      .map((r) => `${r.label}: ${isNaN(Number(r.value)) ? "---" : r.value}${r.unit ? " " + r.unit : ""}`)
      .join("\n");
  }, [results]);

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard(formatResults());
    if (ok) {
      setCopied(true);
      addToast({ title: "Copied to clipboard", variant: "success" });
      setTimeout(() => setCopied(false), 2000);
    }
  }, [formatResults, addToast]);

  const handleShare = useCallback(async () => {
    const text = formatResults();
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share({ title: document.title, text }); } catch {}
    } else {
      await copyToClipboard(window.location.href);
      addToast({ title: "Link copied to clipboard", variant: "info" });
    }
  }, [formatResults, addToast]);

  const handleDownload = useCallback(() => {
    const header = `${document.title}\n${"=".repeat(40)}\n\n`;
    downloadAsFile(header + formatResults(), `${title.toLowerCase().replace(/\s+/g, "-")}.txt`);
    addToast({ title: "Downloaded", variant: "success" });
  }, [formatResults, title, addToast]);

  const primaryResult = results[0];
  const secondaryResults = results.slice(1);

  if (results.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      ref={resultsRef}
    >
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-dark-800/80 border border-border/40 shadow-elevation-lg">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-primary-500/10 to-accent-cyan/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-tr from-accent-amber/5 to-primary-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative p-6 sm:p-8">
          {/* Header row */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-sm shadow-primary-500/20">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-text">{title}</h3>
                <p className="text-xs text-text-secondary">{results.length} value{results.length > 1 ? "s" : ""}</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <TooltipProvider><Tooltip><TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" onClick={handleCopy} className="hover:bg-white/50 dark:hover:bg-dark-800/50 rounded-lg">
                  {copied ? <Check className="h-4 w-4 text-accent-green" /> : <Copy className="h-4 w-4" />}
                </Button>
              </TooltipTrigger><TooltipContent>Copy</TooltipContent></Tooltip></TooltipProvider>
              <TooltipProvider><Tooltip><TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" onClick={handleShare} className="hover:bg-white/50 dark:hover:bg-dark-800/50 rounded-lg">
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger><TooltipContent>Share</TooltipContent></Tooltip></TooltipProvider>
              <TooltipProvider><Tooltip><TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" onClick={handleDownload} className="hover:bg-white/50 dark:hover:bg-dark-800/50 rounded-lg">
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger><TooltipContent>Download</TooltipContent></Tooltip></TooltipProvider>
              {onReset && <TooltipProvider><Tooltip><TooltipTrigger asChild>
                <Button variant="ghost" size="icon-sm" onClick={onReset} className="hover:bg-white/50 dark:hover:bg-dark-800/50 rounded-lg">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger><TooltipContent>Reset</TooltipContent></Tooltip></TooltipProvider>}
            </div>
          </div>

          {/* Hero Result Card */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative p-5 sm:p-6 rounded-2xl mb-6 overflow-hidden",
              "bg-gradient-to-br from-white to-white/60 dark:from-dark-800 dark:to-dark-800/60",
              "border border-border/60",
              "shadow-sm",
              "before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-br before:from-primary-500/20 before:to-accent-cyan/20 before:mask-border before:-z-10"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/[0.02] to-transparent pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <div className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center",
                  iconBgMap[primaryResult.color || "default"]
                )}>
                  <PrimaryIcon resultKey={primaryResult.key} className="h-3.5 w-3.5" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
                  {primaryResult.label}
                </p>
              </div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className={cn(
                  "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-full min-w-0",
                  colorMap[primaryResult.color || "default"],
                  "break-words"
                )}>
                  {formatCalculatedValue(primaryResult.value, primaryResult.unit)}
                </span>
                {primaryResult.unit && (
                  <span className="text-lg sm:text-xl text-text-secondary font-medium">
                    {primaryResult.unit}
                  </span>
                )}
              </div>
              {primaryResult.description && (
                <p className="text-sm text-text-secondary mt-3 max-w-full leading-relaxed break-words">
                  {primaryResult.description}
                </p>
              )}
            </div>
          </motion.div>

          {/* Chart */}
          {chart && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="mb-6"
            >
              <div className="p-4 sm:p-5 rounded-xl bg-surface-secondary dark:bg-dark-800/40 border border-border/50">
                <ChartComponent chart={chart} />
              </div>
            </motion.div>
          )}

          {/* Secondary Results Grid */}
          {secondaryResults.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {secondaryResults.map((result, index) => {
                const Icon = iconMap[result.key] || Sparkles;
                return (
                  <motion.div
                    key={result.key}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + index * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      "relative p-4 sm:p-5 rounded-xl overflow-hidden",
                      "border transition-all duration-200",
                      bgMap[result.color || "default"],
                      "hover:shadow-sm"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                        iconBgMap[result.color || "default"]
                      )}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">
                          {result.label}
                        </p>
                        <div className="flex items-baseline gap-1.5 flex-wrap">
                          <span className={cn(
                            "text-lg sm:text-xl font-bold tabular-nums tracking-tight max-w-full min-w-0",
                            colorMap[result.color || "default"],
                            "break-words"
                          )}>
                            {formatCalculatedValue(result.value, result.unit)}
                          </span>
                          {result.unit && (
                            <span className="text-xs text-text-secondary font-medium">
                              {result.unit}
                            </span>
                          )}
                        </div>
                        {result.description && (
                          <p className="text-xs text-text-secondary mt-1 break-words">{result.description}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
