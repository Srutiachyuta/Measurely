"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calculator, RotateCcw, Copy, Check, Share2, Download, Printer, FileSpreadsheet,
  Layers, CalendarDays, TrendingUp, PiggyBank, Banknote, Percent,
  Sparkles, Info, ArrowLeft, Landmark, Gauge, RefreshCw, Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { copyToClipboard, downloadAsFile } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";
import Link from "next/link";
import dynamic from "next/dynamic";

const ChartComponent = dynamic(() => import("./calculator-chart"), {
  ssr: false,
  loading: () => <div className="h-48 rounded-xl bg-surface-secondary animate-pulse" />,
});

interface CdRung {
  termMonths: number;
  rate: number;
  allocation: number;
}

interface Inputs {
  totalInvestment: number;
  numCds: string;
  rungs: CdRung[];
  compounding: string;
  reinvest: string;
  futureRate: number;
  taxRate: number;
}

interface CdResult {
  termMonths: number;
  rate: number;
  principal: number;
  interest: number;
  futureValue: number;
  maturityDate: string;
  maturityMonth: number;
}

interface Results {
  rungs: CdResult[];
  totalInvestment: number;
  totalInterest: number;
  totalFutureValue: number;
  effectiveYield: number;
  taxAdjustedReturn: number;
  maturitySchedule: { month: number; date: string; amount: number }[];
  annualCashFlow: { year: number; amount: number }[];
  reinvestedValue: number;
  reinvestedInterest: number;
  singleCdValue: number;
  ladderVsSingle: number;
}

function getDefaultRungs(numCds: string): CdRung[] {
  if (numCds === "3") {
    return [
      { termMonths: 3, rate: 3.5, allocation: 33.33 },
      { termMonths: 6, rate: 4.0, allocation: 33.33 },
      { termMonths: 12, rate: 4.5, allocation: 33.34 },
    ];
  }
  return [
    { termMonths: 3, rate: 3.0, allocation: 20 },
    { termMonths: 6, rate: 3.5, allocation: 20 },
    { termMonths: 12, rate: 4.0, allocation: 20 },
    { termMonths: 24, rate: 4.5, allocation: 20 },
    { termMonths: 36, rate: 5.0, allocation: 20 },
  ];
}

function calculateCdValue(principal: number, rate: number, termMonths: number, compounding: number): number {
  const t = termMonths / 12;
  return principal * Math.pow(1 + rate / 100 / compounding, compounding * t);
}

function calculate(inputs: Inputs): Results {
  const totalInvestment = Math.max(0, inputs.totalInvestment || 0);
  const compounding = Number(inputs.compounding) || 12;
  const reinvest = inputs.reinvest === "yes";
  const futureRate = Math.max(0, inputs.futureRate || 0);
  const taxRate = Math.max(0, Math.min(100, inputs.taxRate || 0));

  const rungs = inputs.rungs.map((rung) => {
    const principal = totalInvestment * (rung.allocation / 100);
    const fv = calculateCdValue(principal, rung.rate, rung.termMonths, compounding);
    const interest = fv - principal;
    const now = new Date();
    const maturityDate = new Date(now);
    maturityDate.setMonth(maturityDate.getMonth() + rung.termMonths);
    return {
      termMonths: rung.termMonths,
      rate: rung.rate,
      principal: Math.round(principal * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      futureValue: Math.round(fv * 100) / 100,
      maturityDate: maturityDate.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      maturityMonth: rung.termMonths,
    };
  });

  const totalInterest = rungs.reduce((s, r) => s + r.interest, 0);
  const totalFutureValue = rungs.reduce((s, r) => s + r.futureValue, 0);
  const maxTerm = Math.max(...rungs.map((r) => r.termMonths));
  const effectiveYield = totalInvestment > 0 && maxTerm > 0
    ? (Math.pow(totalFutureValue / totalInvestment, 12 / maxTerm) - 1) * 100
    : 0;

  const taxAdjustedReturn = totalFutureValue - (totalInterest * taxRate / 100);

  const maturityMonths = [...new Set(rungs.map((r) => r.termMonths))].sort((a, b) => a - b);
  const maturitySchedule = maturityMonths.map((m) => {
    const date = new Date();
    date.setMonth(date.getMonth() + m);
    const amount = rungs.filter((r) => r.termMonths === m).reduce((s, r) => s + r.futureValue, 0);
    return {
      month: m,
      date: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      amount: Math.round(amount * 100) / 100,
    };
  });

  let reinvestedValue = totalFutureValue;
  let reinvestedInterest = totalInterest;

  if (reinvest && futureRate > 0) {
    const maxTermYears = maxTerm / 12;
    const reinvestYears = Math.max(1, Math.floor(maxTermYears));

    let runningValue = totalFutureValue;
    let addedInterest = 0;

    for (let y = 0; y < reinvestYears; y++) {
      const reinvested = runningValue * Math.pow(1 + futureRate / 100 / compounding, compounding);
      addedInterest += reinvested - runningValue;
      runningValue = reinvested;
    }
    reinvestedValue = Math.round(runningValue * 100) / 100;
    reinvestedInterest = Math.round((totalInterest + addedInterest) * 100) / 100;
  }

  const singleCdTerm = maxTerm;
  const singleCdRate = inputs.rungs.reduce((max, r) => Math.max(max, r.rate), 0);
  const singleCdValue = calculateCdValue(totalInvestment, singleCdRate, singleCdTerm, compounding);
  const ladderVsSingle = totalFutureValue - singleCdValue;

  const annualCashFlow = maturityMonths.map((m) => {
    const year = Math.ceil(m / 12);
    const amount = rungs.filter((r) => r.termMonths === m).reduce((s, r) => s + r.futureValue, 0);
    return { year, amount: Math.round(amount * 100) / 100 };
  });

  return {
    rungs,
    totalInvestment,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalFutureValue: Math.round(totalFutureValue * 100) / 100,
    effectiveYield: Math.round(effectiveYield * 100) / 100,
    taxAdjustedReturn: Math.round(taxAdjustedReturn * 100) / 100,
    maturitySchedule,
    annualCashFlow,
    reinvestedValue,
    reinvestedInterest,
    singleCdValue: Math.round(singleCdValue * 100) / 100,
    ladderVsSingle: Math.round(ladderVsSingle * 100) / 100,
  };
}

function fmt(value: number): string {
  return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtCurrency(value: number): string {
  return "$" + fmt(value);
}

const defaultRungs = getDefaultRungs("3");

const defaultInputs: Inputs = {
  totalInvestment: 10000,
  numCds: "3",
  rungs: defaultRungs,
  compounding: "12",
  reinvest: "yes",
  futureRate: 4,
  taxRate: 0,
};

export function CdLadderCalculator() {
  const [inputs, setInputs] = useState<Inputs>(defaultInputs);
  const [results, setResults] = useState<Results | null>(null);
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();

  const handleChange = useCallback((key: keyof Inputs, value: string | number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleNumCdsChange = useCallback((value: string) => {
    setInputs((prev) => ({
      ...prev,
      numCds: value,
      rungs: getDefaultRungs(value),
    }));
  }, []);

  const handleRungChange = useCallback((index: number, key: keyof CdRung, value: string | number) => {
    setInputs((prev) => {
      const rungs = prev.rungs.map((r, i) =>
        i === index ? { ...r, [key]: key === "termMonths" || key === "allocation" ? Number(value) : value } : r
      );
      if (key === "termMonths") {
        rungs[index] = { ...rungs[index], termMonths: Number(value) };
      } else if (key === "rate") {
        rungs[index] = { ...rungs[index], rate: Number(value) };
      } else if (key === "allocation") {
        rungs[index] = { ...rungs[index], allocation: Number(value) };
      }
      return { ...prev, rungs };
    });
  }, []);

  const handleCalculate = useCallback(() => {
    const res = calculate(inputs);
    setResults(res);
  }, [inputs]);

  const handleReset = useCallback(() => {
    setInputs(defaultInputs);
    setResults(null);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputs.totalInvestment > 0) {
      handleCalculate();
    }
  }, [handleCalculate, inputs]);

  const formatResultsText = useCallback(() => {
    if (!results) return "";
    const lines = [
      "CD Ladder Calculator Results",
      "=".repeat(45),
      "",
      `Total Investment: $${fmt(results.totalInvestment)}`,
      `Total Interest Earned: $${fmt(results.totalInterest)}`,
      `Total Future Value: $${fmt(results.totalFutureValue)}`,
      `Effective Annual Yield: ${results.effectiveYield}%`,
      `Tax-Adjusted Return: $${fmt(results.taxAdjustedReturn)}`,
      "",
      "CD Details:",
      ...results.rungs.map((r, i) =>
        `  CD ${i + 1}: ${r.termMonths} months at ${r.rate}% -> $${fmt(r.futureValue)} (matures ${r.maturityDate})`
      ),
      "",
      `Reinvested Value (with ${inputs.futureRate}% future rate): $${fmt(results.reinvestedValue)}`,
      `Ladder vs Single CD Advantage: $${fmt(results.ladderVsSingle)}`,
      "",
      "Maturity Schedule:",
      ...results.maturitySchedule.map((m) => `  ${m.date}: $${fmt(m.amount)}`),
      "",
      "Generated by Measurely CD Ladder Calculator",
    ];
    return lines.join("\n");
  }, [results, inputs]);

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard(formatResultsText());
    if (ok) {
      setCopied(true);
      addToast({ title: "Copied to clipboard", variant: "success" });
      setTimeout(() => setCopied(false), 2000);
    }
  }, [formatResultsText, addToast]);

  const handleShare = useCallback(async () => {
    const text = formatResultsText();
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share({ title: "CD Ladder Calculator", text }); } catch { /* ignore */ }
    } else {
      await copyToClipboard(window.location.href);
      addToast({ title: "Link copied", variant: "info" });
    }
  }, [formatResultsText, addToast]);

  const handleDownload = useCallback(() => {
    downloadAsFile(formatResultsText(), "cd-ladder-estimate.txt");
    addToast({ title: "Downloaded", variant: "success" });
  }, [formatResultsText, addToast]);

  const handlePrint = useCallback(() => window.print(), []);

  const handleExportCSV = useCallback(() => {
    if (!results) return;
    const header = "Metric,Value\n";
    const rows = [
      `Total Investment,${results.totalInvestment}`,
      `Total Interest,${results.totalInterest}`,
      `Total Future Value,${results.totalFutureValue}`,
      `Effective Yield,${results.effectiveYield}`,
      `Tax-Adjusted Return,${results.taxAdjustedReturn}`,
      `Reinvested Value,${results.reinvestedValue}`,
      `Ladder vs Single CD Advantage,${results.ladderVsSingle}`,
    ];
    downloadAsFile(header + rows.join("\n"), "cd-ladder-estimate.csv", "text/csv");
    addToast({ title: "Exported CSV", variant: "success" });
  }, [results, addToast]);

  const allocationChart = useMemo(() => {
    if (!results) return null;
    const labels = results.rungs.map((r) => `${r.termMonths}-month`);
    const data = results.rungs.map((r) => r.principal);
    if (data.every((v) => v === 0)) return null;
    const colors = ["rgba(99, 102, 241, 0.8)", "rgba(34, 197, 94, 0.8)", "rgba(234, 179, 8, 0.8)", "rgba(249, 115, 22, 0.8)", "rgba(239, 68, 68, 0.8)"];
    return {
      type: "doughnut" as const,
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: colors.slice(0, data.length),
          borderColor: colors.slice(0, data.length).map((c) => c.replace("0.8", "1")),
          borderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" as const, labels: { padding: 12, usePointStyle: true, font: { size: 11 } } },
          tooltip: { callbacks: { label: (ctx: { parsed: { raw: number } }) => "$" + ctx.parsed.raw.toLocaleString("en-US", { minimumFractionDigits: 2 }) } },
        },
      },
    };
  }, [results]);

  const maturityChart = useMemo(() => {
    if (!results || results.maturitySchedule.length === 0) return null;
    return {
      type: "bar" as const,
      data: {
        labels: results.maturitySchedule.map((m) => m.date),
        datasets: [{
          label: "Maturity Value ($)",
          data: results.maturitySchedule.map((m) => m.amount),
          backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(34, 197, 94, 0.8)", "rgba(234, 179, 8, 0.8)", "rgba(249, 115, 22, 0.8)", "rgba(239, 68, 68, 0.8)"].slice(0, results.maturitySchedule.length),
          borderColor: ["rgba(99, 102, 241, 1)", "rgba(34, 197, 94, 1)", "rgba(234, 179, 8, 1)", "rgba(249, 115, 22, 1)", "rgba(239, 68, 68, 1)"].slice(0, results.maturitySchedule.length),
          borderWidth: 2,
          borderRadius: 6,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx: { parsed: { y: number } }) => "$" + ctx.parsed.y.toLocaleString("en-US", { minimumFractionDigits: 2 }) } },
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: (v: string | number) => "$" + Number(v).toLocaleString() } },
        },
      },
    };
  }, [results]);

  const growthChart = useMemo(() => {
    if (!results) return null;
    const maxTerm = Math.max(...results.rungs.map((r) => r.termMonths));
    const monthlyData = Array.from({ length: maxTerm + 1 }, (_, m) => {
      const ladder = results.rungs.reduce((sum, r) => {
        if (m >= r.termMonths) return sum + r.futureValue;
        const progress = m / r.termMonths;
        return sum + r.principal * Math.pow(1 + r.rate / 100 / 12, m);
      }, 0);
      return { month: m, ladder: Math.round(ladder * 100) / 100 };
    });
    const sampleEvery = Math.max(1, Math.floor(monthlyData.length / 12));
    const sampled = monthlyData.filter((_, i) => i % sampleEvery === 0 || i === monthlyData.length - 1);
    return {
      type: "line" as const,
      data: {
        labels: sampled.map((d) => `Month ${d.month}`),
        datasets: [{
          label: "CD Ladder Growth",
          data: sampled.map((d) => d.ladder),
          borderColor: "rgba(99, 102, 241, 0.9)",
          backgroundColor: "rgba(99, 102, 241, 0.1)",
          fill: true,
          tension: 0.3,
          pointRadius: 3,
          borderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" as const, labels: { usePointStyle: true, padding: 12, font: { size: 11 } } },
          tooltip: { callbacks: { label: (ctx: { parsed: { y: number } }) => "$" + ctx.parsed.y.toLocaleString("en-US", { minimumFractionDigits: 2 }) } },
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: (v: string | number) => "$" + Number(v).toLocaleString() } },
        },
      },
    };
  }, [results]);

  const isValid = inputs.totalInvestment > 0;

  const rungLabels: Record<string, string> = {
    "3": "3-Rung Ladder",
    "5": "5-Rung Ladder",
  };

  return (
    <div className="min-h-screen bg-background" onKeyDown={handleKeyDown}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <nav className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link href="/calculators" className="hover:text-text transition-colors">Calculators</Link>
          <span>/</span>
          <span className="text-text">CD Ladder Calculator</span>
        </nav>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-amber flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text">CD Ladder Calculator</h1>
            <p className="text-sm text-muted mt-1">Build an optimized CD ladder strategy to maximize returns while maintaining liquidity</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="secondary" className="text-xs capitalize">Finance</Badge>
          <Badge variant="info" className="text-xs">Calculator</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-surface rounded-2xl border border-border p-5 space-y-4">
              <h2 className="text-sm font-semibold text-text">Investment Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="totalInvestment" className="text-sm font-medium text-text">Total Investment Amount ($)<span className="text-red-400 ml-0.5">*</span></Label>
                  <Input id="totalInvestment" type="number" placeholder="e.g., 10000" min={100} step={500} value={inputs.totalInvestment} onChange={(e) => handleChange("totalInvestment", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="numCds" className="text-sm font-medium text-text">Ladder Type<span className="text-red-400 ml-0.5">*</span></Label>
                  <Select value={inputs.numCds} onValueChange={handleNumCdsChange}>
                    <SelectTrigger id="numCds" className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3-Rung Ladder</SelectItem>
                      <SelectItem value="5">5-Rung Ladder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="compounding" className="text-sm font-medium text-text">Compounding Frequency</Label>
                  <Select value={inputs.compounding} onValueChange={(v) => handleChange("compounding", v)}>
                    <SelectTrigger id="compounding" className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="365">Daily</SelectItem>
                      <SelectItem value="12">Monthly</SelectItem>
                      <SelectItem value="4">Quarterly</SelectItem>
                      <SelectItem value="1">Annually</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-2xl border border-border p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-text">CD Rungs</h2>
                <Badge variant="secondary" className="text-[10px]">{rungLabels[inputs.numCds] || `${inputs.numCds}-Rung`}</Badge>
              </div>
              <div className="space-y-3">
                {inputs.rungs.map((rung, i) => (
                  <div key={i} className="p-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                    <p className="text-xs font-semibold text-text mb-3">CD #{i + 1}</p>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-[11px] text-muted">Term (months)</Label>
                        <Input type="number" min={1} max={120} step={1} value={rung.termMonths} onChange={(e) => handleRungChange(i, "termMonths", e.target.value === "" ? 0 : Number(e.target.value))} className="h-10 text-sm bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[11px] text-muted">Rate (%)</Label>
                        <Input type="number" min={0} max={100} step={0.1} value={rung.rate} onChange={(e) => handleRungChange(i, "rate", e.target.value === "" ? 0 : Number(e.target.value))} className="h-10 text-sm bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[11px] text-muted">Allocation (%)</Label>
                        <Input type="number" min={0} max={100} step={0.01} value={rung.allocation} onChange={(e) => handleRungChange(i, "allocation", e.target.value === "" ? 0 : Number(e.target.value))} className="h-10 text-sm bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                      </div>
                    </div>
                  </div>
                ))}
                <p className="text-[11px] text-muted text-right">
                  Total allocation: {inputs.rungs.reduce((s, r) => s + r.allocation, 0).toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="bg-surface rounded-2xl border border-border p-5 space-y-4">
              <h2 className="text-sm font-semibold text-text">Options</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-text">Reinvest at Maturity</Label>
                  <div className="flex gap-2">
                    {["yes", "no"].map((opt) => (
                      <label key={opt} className={cn(
                        "flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer transition-all text-sm font-medium select-none",
                        "border-border/60 hover:border-primary-500/30 hover:bg-primary-500/5",
                        inputs.reinvest === opt
                          ? "bg-primary-600 text-white border-primary-600 shadow-sm"
                          : "bg-white dark:bg-dark-800/50"
                      )}>
                        <input type="radio" name="reinvest" value={opt} checked={inputs.reinvest === opt} onChange={() => handleChange("reinvest", opt)} className="sr-only" />
                        {opt === "yes" ? "Yes" : "No"}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="futureRate" className="text-sm font-medium text-text">Future Rate (%)</Label>
                  <Input id="futureRate" type="number" placeholder="e.g., 4" min={0} max={100} step={0.1} value={inputs.futureRate} onChange={(e) => handleChange("futureRate", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="taxRate" className="text-sm font-medium text-text">Tax Rate (%)</Label>
                  <Input id="taxRate" type="number" placeholder="e.g., 22" min={0} max={100} step={0.1} value={inputs.taxRate} onChange={(e) => handleChange("taxRate", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button size="lg" fullWidth onClick={handleCalculate} disabled={!isValid} className="h-12 text-base font-semibold rounded-xl shadow-sm shadow-primary-500/20">
                  <Calculator className="h-5 w-5" />
                  Calculate
                </Button>
                <Button variant="outline" size="lg" onClick={handleReset} className="h-12 sm:w-auto rounded-xl border-border/60">
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>

            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div ref={resultsRef} className="space-y-6" id="results-content">
                  <div className="relative overflow-hidden rounded-3xl bg-surface border border-border/40 shadow-elevation-lg">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-primary-500/10 to-accent-amber/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative p-6 sm:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-amber flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-text">CD Ladder Projection</h3>
                            <p className="text-xs text-text-secondary">{rungLabels[inputs.numCds]}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <TooltipProvider>
                            <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon-sm" onClick={handleCopy} className="rounded-lg">{copied ? <Check className="h-4 w-4 text-accent-green" /> : <Copy className="h-4 w-4" />}</Button></TooltipTrigger><TooltipContent>Copy</TooltipContent></Tooltip>
                            <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon-sm" onClick={handleShare} className="rounded-lg"><Share2 className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>Share</TooltipContent></Tooltip>
                            <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon-sm" onClick={handleDownload} className="rounded-lg"><Download className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>Download</TooltipContent></Tooltip>
                            <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon-sm" onClick={handleExportCSV} className="rounded-lg"><FileSpreadsheet className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>CSV</TooltipContent></Tooltip>
                            <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon-sm" onClick={handlePrint} className="rounded-lg"><Printer className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>Print</TooltipContent></Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>

                      <div className="p-5 sm:p-6 rounded-2xl mb-6 bg-gradient-to-br from-surface to-surface/60 border border-border/60">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-7 h-7 rounded-lg bg-primary-500 text-white flex items-center justify-center">
                            <Layers className="h-3.5 w-3.5" />
                          </div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary">Total Future Value</p>
                        </div>
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text break-words">
                            {fmtCurrency(results.totalFutureValue)}
                          </span>
                          <span className="text-sm text-muted">
                            (${fmt(results.totalInterest)} interest earned)
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary mt-2">
                          Effective Annual Yield: <strong className="text-accent-green">{results.effectiveYield}%</strong>
                          {inputs.taxRate > 0 && (
                            <> &middot; After-tax: <strong className="text-amber-500">{fmtCurrency(results.taxAdjustedReturn)}</strong></>
                          )}
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          { label: "Total Investment", key: "totalInvestment", value: results.totalInvestment, color: "text-text", bg: "bg-surface-secondary dark:bg-dark-800/30 border-border/60", iconBg: "bg-primary-500", icon: Banknote },
                          { label: "Total Interest", key: "totalInterest", value: results.totalInterest, color: "text-accent-green", bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200/50", iconBg: "bg-accent-green", icon: TrendingUp },
                          { label: "Effective Yield", key: "effectiveYield", value: `${results.effectiveYield}%`, color: "text-primary-600 dark:text-primary-400", bg: "bg-blue-50 dark:bg-blue-500/10 border-blue-200/50", iconBg: "bg-primary-500", icon: Percent },
                          { label: "Ladder Advantage", key: "ladderVsSingle", value: fmtCurrency(results.ladderVsSingle), color: results.ladderVsSingle >= 0 ? "text-accent-green" : "text-red-500", bg: results.ladderVsSingle >= 0 ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200/50" : "bg-red-50 dark:bg-red-500/10 border-red-200/50", iconBg: results.ladderVsSingle >= 0 ? "bg-accent-green" : "bg-red-500", icon: Gauge },
                        ].map((item, i) => {
                          const Icon = item.icon;
                          return (
                            <motion.div
                              key={item.key}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.08 + i * 0.04, duration: 0.35 }}
                              className={cn("relative p-4 sm:p-5 rounded-xl border transition-all duration-200", item.bg)}
                            >
                              <div className="flex items-start gap-3">
                                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm", item.iconBg)}>
                                  <Icon className="h-4 w-4 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">{item.label}</p>
                                  <span className={cn("text-lg sm:text-xl font-bold tabular-nums tracking-tight", item.color)}>
                                    {item.value}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                          <p className="text-[10px] text-text-secondary mb-1">Reinvested Value</p>
                          <p className="text-sm font-bold text-text">{fmtCurrency(results.reinvestedValue)}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                          <p className="text-[10px] text-text-secondary mb-1">Reinvested Interest</p>
                          <p className="text-sm font-bold text-accent-green">{fmtCurrency(results.reinvestedInterest)}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                          <p className="text-[10px] text-text-secondary mb-1">Single CD Value</p>
                          <p className="text-sm font-bold text-text">{fmtCurrency(results.singleCdValue)}</p>
                        </div>
                        <div className={cn("p-3 rounded-xl border", results.ladderVsSingle >= 0 ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200/50" : "bg-red-50 dark:bg-red-500/10 border-red-200/50")}>
                          <p className="text-[10px] text-text-secondary mb-1">Ladder Advantage</p>
                          <p className={cn("text-sm font-bold", results.ladderVsSingle >= 0 ? "text-accent-green" : "text-red-500")}>
                            {results.ladderVsSingle >= 0 ? "+" : ""}{fmtCurrency(results.ladderVsSingle)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className="p-5">
                      <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                        <CalendarDays className="w-4 h-4 text-primary-500" />
                        Maturity Schedule
                      </h4>
                      <div className="h-56">{maturityChart && <ChartComponent chart={maturityChart} />}</div>
                    </Card>

                    <Card className="p-5">
                      <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                        <PiggyBank className="w-4 h-4 text-primary-500" />
                        CD Allocation
                      </h4>
                      <div className="h-56">{allocationChart && <ChartComponent chart={allocationChart} />}</div>
                    </Card>
                  </div>

                  <Card className="p-5">
                    <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                      <TrendingUp className="w-4 h-4 text-primary-500" />
                      Growth Projection
                    </h4>
                    <div className="h-56">{growthChart && <ChartComponent chart={growthChart} />}</div>
                  </Card>

                  <Card className="p-5">
                    <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                      <Layers className="w-4 h-4 text-primary-500" />
                      CD Breakdown
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border/60">
                            <th className="text-left py-2 px-2 text-muted font-medium text-xs">CD</th>
                            <th className="text-right py-2 px-2 text-muted font-medium text-xs">Term</th>
                            <th className="text-right py-2 px-2 text-muted font-medium text-xs">Rate</th>
                            <th className="text-right py-2 px-2 text-muted font-medium text-xs">Principal</th>
                            <th className="text-right py-2 px-2 text-muted font-medium text-xs">Interest</th>
                            <th className="text-right py-2 px-2 text-muted font-medium text-xs">Future Value</th>
                            <th className="text-right py-2 px-2 text-muted font-medium text-xs">Matures</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.rungs.map((r, i) => (
                            <tr key={i} className="border-b border-border/30 hover:bg-surface-secondary/50 transition-colors">
                              <td className="py-2.5 px-2 font-medium text-text">CD #{i + 1}</td>
                              <td className="py-2.5 px-2 text-right text-text">{r.termMonths}mo</td>
                              <td className="py-2.5 px-2 text-right text-accent-green">{r.rate}%</td>
                              <td className="py-2.5 px-2 text-right text-text font-mono">{fmtCurrency(r.principal)}</td>
                              <td className="py-2.5 px-2 text-right text-accent-green font-mono">{fmtCurrency(r.interest)}</td>
                              <td className="py-2.5 px-2 text-right font-semibold text-text font-mono">{fmtCurrency(r.futureValue)}</td>
                              <td className="py-2.5 px-2 text-right text-muted text-xs">{r.maturityDate}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="border-t-2 border-border/60">
                            <td colSpan={3} className="py-2.5 px-2 font-semibold text-text">Total</td>
                            <td className="py-2.5 px-2 text-right font-semibold text-text font-mono">{fmtCurrency(results.totalInvestment)}</td>
                            <td className="py-2.5 px-2 text-right font-semibold text-accent-green font-mono">{fmtCurrency(results.totalInterest)}</td>
                            <td className="py-2.5 px-2 text-right font-semibold text-text font-mono">{fmtCurrency(results.totalFutureValue)}</td>
                            <td className="py-2.5 px-2" />
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </Card>

                  <Card className="p-5">
                    <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                      <Receipt className="w-4 h-4 text-primary-500" />
                      Financial Summary
                    </h4>
                    <div className="space-y-2">
                      {[
                        { label: "Total Investment", value: results.totalInvestment, highlight: false },
                        { label: "Total Interest Earned", value: results.totalInterest, isGreen: true },
                        { label: "Total Future Value", value: results.totalFutureValue, isBold: true },
                        { label: "Effective Annual Yield", value: `${results.effectiveYield}%`, isBold: true },
                        ...(inputs.taxRate > 0 ? [{ label: `After-Tax Return (${inputs.taxRate}% rate)`, value: results.taxAdjustedReturn, isYellow: true }] : []),
                        { label: "Reinvested Value", value: results.reinvestedValue, isReinvest: true },
                        { label: "Single CD (Best Rate)", value: results.singleCdValue, isBlue: true },
                        { label: "Ladder Advantage", value: results.ladderVsSingle, isGreen: results.ladderVsSingle >= 0 },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-xl border transition-colors",
                            item.highlight ? "bg-primary-50 dark:bg-primary-500/10 border-primary-200/50 dark:border-primary-500/20" :
                            "isGreen" in item && item.isGreen ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200/50 dark:border-emerald-500/20" :
                            "isBold" in item && item.isBold ? "bg-surface-secondary dark:bg-dark-800/30 border-border/60" :
                            "isYellow" in item && item.isYellow ? "bg-amber-50 dark:bg-amber-500/10 border-amber-200/50" :
                            "isReinvest" in item && item.isReinvest ? "bg-blue-50 dark:bg-blue-500/10 border-blue-200/50" :
                            "isBlue" in item && item.isBlue ? "bg-blue-50 dark:bg-blue-500/10 border-blue-200/50" :
                            "bg-surface-secondary dark:bg-dark-800/30 border-border/60"
                          )}
                        >
                          <span className="text-sm text-text-secondary">{item.label}</span>
                          <span className={cn(
                            "text-sm font-semibold tabular-nums",
                            "isGreen" in item && item.isGreen ? "text-emerald-600 dark:text-emerald-400" :
                            "isBold" in item && item.isBold ? "text-text" :
                            "isYellow" in item && item.isYellow ? "text-amber-600 dark:text-amber-400" :
                            "isReinvest" in item && item.isReinvest ? "text-blue-600 dark:text-blue-400" :
                            "isBlue" in item && item.isBlue ? "text-blue-600 dark:text-blue-400" :
                            "text-text"
                          )}>
                            {typeof item.value === "number" ? fmtCurrency(item.value) : item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </motion.div>
            )}

            {!results && (
              <div className="bg-surface-secondary rounded-2xl border border-border p-8 text-center">
                <Layers className="h-10 w-10 text-muted mx-auto mb-3" />
                <h3 className="text-base font-semibold text-text mb-1">Ready to Build Your CD Ladder</h3>
                <p className="text-sm text-muted">Enter your investment amount, choose a ladder type, customize rates, and click Calculate to see your optimized CD ladder strategy.</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            {results && (
              <Button variant="outline" size="lg" fullWidth onClick={handleReset} className="h-11">
                <RotateCcw className="h-4 w-4" />
                New Calculation
              </Button>
            )}

            <div className="lg:sticky lg:top-24 space-y-6">
              <Card className="p-5">
                <h3 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-primary-500" />
                  About This Tool
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Build an optimized CD ladder strategy to maximize returns while maintaining liquidity. Compare 3-rung and 5-rung ladders with customizable terms, rates, and allocations.
                </p>
                <Separator className="my-3" />
                <p className="text-xs text-muted font-medium mb-2">Key features:</p>
                <ul className="text-xs text-muted space-y-1 list-disc list-inside">
                  <li>3-rung and 5-rung ladder strategies</li>
                  <li>Custom term, rate & allocation per CD</li>
                  <li>Compound interest calculation</li>
                  <li>Reinvestment projections</li>
                  <li>Ladder vs single CD comparison</li>
                  <li>Maturity calendar & cash flow</li>
                </ul>
                <Separator className="my-3" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">Category</span>
                  <Badge variant="secondary" className="text-[10px] capitalize">Finance</Badge>
                </div>
                <div className="flex items-center justify-between text-xs mt-2">
                  <span className="text-muted">Inputs</span>
                  <span className="text-text font-medium">8+</span>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-accent-amber" />
                  Quick Example
                </h3>
                <p className="text-xs text-muted mb-2">$10,000 in a 3-rung CD ladder:</p>
                <div className="space-y-1">
                  {[
                    { label: "3-month CD at 3.5%", value: "$3,333" },
                    { label: "6-month CD at 4.0%", value: "$3,333" },
                    { label: "12-month CD at 4.5%", value: "$3,334" },
                    { label: "Total Future Value", value: "$10,400+" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-surface-secondary dark:bg-dark-800/30">
                      <span className="text-xs text-muted">{item.label}</span>
                      <span className="text-xs font-semibold text-text">{item.value}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" fullWidth onClick={() => { setInputs(defaultInputs); setResults(null); }} className="mt-2">
                  Load Example Values
                </Button>
              </Card>

              <Link href="/calculators" className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to all calculators
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
