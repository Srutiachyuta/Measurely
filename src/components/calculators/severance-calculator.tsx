"use client";

import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calculator, RotateCcw, Copy, Check, Share2, Download, Printer,
  Wallet, Banknote, Receipt, PiggyBank, Percent,
  TrendingUp, Clock, CalendarDays, HandCoins, FileSpreadsheet,
  Sparkles, Info, ArrowLeft,
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

interface SeveranceInputs {
  annualSalary: number;
  payFrequency: string;
  yearsOfService: number;
  weeksPerYear: number;
  bonusIncluded: string;
  bonusAmount: number;
  unusedPTO: number;
  ptoRate: number;
  taxRate: number;
  otherBenefits: number;
  state: string;
}

interface ResultsData {
  grossSeverance: number;
  weeklyAmount: number;
  taxEstimate: number;
  netPay: number;
  ptoValue: number;
  bonusValue: number;
  otherBenefitsValue: number;
  totalExitPackage: number;
  totalBeforeTax: number;
}

const defaultInputs: SeveranceInputs = {
  annualSalary: 75000,
  payFrequency: "biweekly",
  yearsOfService: 5,
  weeksPerYear: 1,
  bonusIncluded: "no",
  bonusAmount: 0,
  unusedPTO: 80,
  ptoRate: 36.06,
  taxRate: 25,
  otherBenefits: 0,
  state: "",
};

const payPeriodNames: Record<string, string> = {
  weekly: "Weekly",
  biweekly: "Bi-Weekly",
  semimonthly: "Semi-Monthly",
  monthly: "Monthly",
};

const payPeriodWeeks: Record<string, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
};

function calculateSeverance(inputs: SeveranceInputs): ResultsData {
  const salary = Math.max(0, inputs.annualSalary || 0);
  const years = Math.max(0, inputs.yearsOfService || 0);
  const weeksPerYear = Math.max(0, inputs.weeksPerYear || 0);
  const taxRate = Math.max(0, Math.min(60, inputs.taxRate || 0));
  const bonusAmount = Math.max(0, inputs.bonusAmount || 0);
  const ptoHours = Math.max(0, inputs.unusedPTO || 0);
  const ptoRate = Math.max(0, inputs.ptoRate || 0);
  const otherBenefits = Math.max(0, inputs.otherBenefits || 0);

  const weeklySalary = salary / 52;
  const grossSeverance = weeklySalary * weeksPerYear * years;
  const bonusValue = inputs.bonusIncluded === "yes" ? bonusAmount : 0;
  const ptoValue = ptoHours * ptoRate;
  const totalBeforeTax = grossSeverance + bonusValue + ptoValue + otherBenefits;
  const taxEstimate = totalBeforeTax * (taxRate / 100);
  const netPay = totalBeforeTax - taxEstimate;
  const totalExitPackage = netPay + ptoValue + bonusValue + otherBenefits;
  const prescPto = ptoValue;
  const prescBonus = bonusValue;
  const prescOther = otherBenefits;
  const weeklyDisplay = years > 0 ? grossSeverance / years / 4 : 0;

  return {
    grossSeverance: Math.round(grossSeverance * 100) / 100,
    weeklyAmount: Math.round(weeklyDisplay * 100) / 100,
    taxEstimate: Math.round(taxEstimate * 100) / 100,
    netPay: Math.round(netPay * 100) / 100,
    ptoValue: Math.round(prescPto * 100) / 100,
    bonusValue: Math.round(prescBonus * 100) / 100,
    otherBenefitsValue: Math.round(prescOther * 100) / 100,
    totalExitPackage: Math.round(totalExitPackage * 100) / 100,
    totalBeforeTax: Math.round(totalBeforeTax * 100) / 100,
  };
}

function fmt(value: number): string {
  return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtCurrency(value: number): string {
  return "$" + fmt(value);
}

export function SeveranceCalculator() {
  const [inputs, setInputs] = useState<SeveranceInputs>(defaultInputs);
  const [results, setResults] = useState<ResultsData | null>(null);
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();

  const handleChange = useCallback((key: keyof SeveranceInputs, value: string | number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleCalculate = useCallback(() => {
    const res = calculateSeverance(inputs);
    setResults(res);
  }, [inputs]);

  const handleReset = useCallback(() => {
    setInputs(defaultInputs);
    setResults(null);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCalculate();
  }, [handleCalculate]);

  const formatResultsText = useCallback(() => {
    if (!results) return "";
    const lines = [
      "Severance Pay Calculator Results",
      "=".repeat(40),
      "",
      `Gross Severance: $${fmt(results.grossSeverance)}`,
      `Weekly Severance: $${fmt(results.weeklyAmount)}`,
      `PTO/Vacation Payout: $${fmt(results.ptoValue)}`,
      `Bonus Value: $${fmt(results.bonusValue)}`,
      `Other Benefits: $${fmt(results.otherBenefitsValue)}`,
      `Total Before Tax: $${fmt(results.totalBeforeTax)}`,
      `Estimated Tax: $${fmt(results.taxEstimate)}`,
      `---`,
      `Net Severance Pay: $${fmt(results.netPay)}`,
      `Total Exit Package: $${fmt(results.totalExitPackage)}`,
      "",
      "Generated by Measurely Severance Pay Calculator",
    ];
    return lines.join("\n");
  }, [results]);

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
      try { await navigator.share({ title: "Severance Pay Calculator", text }); } catch { /* ignore */ }
    } else {
      await copyToClipboard(window.location.href);
      addToast({ title: "Link copied to clipboard", variant: "info" });
    }
  }, [formatResultsText, addToast]);

  const handleDownload = useCallback(() => {
    downloadAsFile(formatResultsText(), "severance-pay-estimate.txt");
    addToast({ title: "Downloaded as TXT", variant: "success" });
  }, [formatResultsText, addToast]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleExportCSV = useCallback(() => {
    if (!results) return;
    const header = "Metric,Value (USD)\n";
    const rows = [
      `Gross Severance,${results.grossSeverance}`,
      `Weekly Severance Amount,${results.weeklyAmount}`,
      `PTO/Vacation Payout,${results.ptoValue}`,
      `Bonus Value,${results.bonusValue}`,
      `Other Benefits,${results.otherBenefitsValue}`,
      `Total Before Tax,${results.totalBeforeTax}`,
      `Estimated Tax,${results.taxEstimate}`,
      `Net Severance Pay,${results.netPay}`,
      `Total Exit Package,${results.totalExitPackage}`,
    ];
    downloadAsFile(header + rows.join("\n"), "severance-pay-estimate.csv", "text/csv");
    addToast({ title: "Exported as CSV", variant: "success" });
  }, [results, addToast]);

  const pieChart = useMemo(() => {
    if (!results) return null;
    const hasBonus = results.bonusValue > 0;
    const hasOther = results.otherBenefitsValue > 0;
    const labels = ["Gross Severance"];
    const data = [results.grossSeverance];
    const colors = ["rgba(99, 102, 241, 0.8)"];
    const borders = ["rgba(99, 102, 241, 1)"];

    if (results.ptoValue > 0) {
      labels.push("PTO Payout");
      data.push(results.ptoValue);
      colors.push("rgba(245, 158, 11, 0.8)");
      borders.push("rgba(245, 158, 11, 1)");
    }
    if (hasBonus) {
      labels.push("Bonus");
      data.push(results.bonusValue);
      colors.push("rgba(34, 197, 94, 0.8)");
      borders.push("rgba(34, 197, 94, 1)");
    }
    if (hasOther) {
      labels.push("Other Benefits");
      data.push(results.otherBenefitsValue);
      colors.push("rgba(148, 163, 184, 0.8)");
      borders.push("rgba(148, 163, 184, 1)");
    }

    return {
      type: "doughnut" as const,
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: colors,
          borderColor: borders,
          borderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" as const, labels: { padding: 16, usePointStyle: true, font: { family: "Inter, sans-serif", size: 12 } } },
          tooltip: {
            callbacks: {
              label: (ctx: { parsed: { raw: number } }) => "$" + ctx.parsed.raw.toLocaleString("en-US", { minimumFractionDigits: 2 }),
            },
          },
        },
      },
    };
  }, [results]);

  const barChart = useMemo(() => {
    if (!results) return null;
    return {
      type: "bar" as const,
      data: {
        labels: ["Gross Severance", "Total Taxes", "Net Severance"],
        datasets: [{
          label: "Amount ($)",
          data: [results.grossSeverance, results.taxEstimate, results.netPay],
          backgroundColor: [
            "rgba(99, 102, 241, 0.8)",
            "rgba(239, 68, 68, 0.8)",
            "rgba(34, 197, 94, 0.8)",
          ],
          borderColor: [
            "rgba(99, 102, 241, 1)",
            "rgba(239, 68, 68, 1)",
            "rgba(34, 197, 94, 1)",
          ],
          borderWidth: 2,
          borderRadius: 6,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx: { parsed: { y: number } }) => "$" + ctx.parsed.y.toLocaleString("en-US", { minimumFractionDigits: 2 }),
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { callback: (v: string | number) => "$" + Number(v).toLocaleString() },
          },
        },
      },
    };
  }, [results]);

  const timelineData = useMemo(() => {
    if (!results) return [];
    const weeks = Math.max(1, Math.ceil(results.grossSeverance / (results.weeklyAmount || 1)));
    const data: { label: string; amount: number; isTotal: boolean }[] = [];
    let remaining = results.grossSeverance;
    for (let i = 0; i < Math.min(weeks, 12); i++) {
      const installment = Math.min(results.weeklyAmount, remaining);
      data.push({ label: `Week ${i + 1}`, amount: Math.round(installment * 100) / 100, isTotal: false });
      remaining -= installment;
      if (remaining <= 0) break;
    }
    if (remaining > 0) {
      data.push({ label: "Remaining", amount: Math.round(remaining * 100) / 100, isTotal: false });
    }
    data.push({ label: "Total", amount: results.grossSeverance, isTotal: true });
    return data;
  }, [results]);

  const isValid = inputs.annualSalary > 0 && inputs.yearsOfService > 0 && inputs.weeksPerYear > 0;

  return (
    <div className="min-h-screen bg-background" onKeyDown={handleKeyDown}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <nav className="flex items-center gap-2 text-sm text-muted mb-6">
          <a href="/calculators" className="hover:text-text transition-colors">Calculators</a>
          <span>/</span>
          <span className="text-text">Severance Pay Calculator</span>
        </nav>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center shrink-0">
            <HandCoins className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text">Severance Pay Calculator</h1>
            <p className="text-sm text-muted mt-1">Estimate your severance package after layoffs or termination</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="secondary" className="text-xs capitalize">Finance</Badge>
          <Badge variant="info" className="text-xs">Calculator</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-surface rounded-2xl border border-border p-5 space-y-4">
              <h2 className="text-sm font-semibold text-text">Input Values</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="annualSalary" className="text-sm font-medium text-text">Annual Salary ($)<span className="text-red-400 ml-0.5">*</span></Label>
                  <Input id="annualSalary" type="number" placeholder="e.g., 75000" min={1} step={1000} value={inputs.annualSalary} onChange={(e) => handleChange("annualSalary", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="payFrequency" className="text-sm font-medium text-text">Pay Frequency</Label>
                  <Select value={inputs.payFrequency} onValueChange={(v) => handleChange("payFrequency", v)}>
                    <SelectTrigger id="payFrequency" className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly (52)</SelectItem>
                      <SelectItem value="biweekly">Bi-Weekly (26)</SelectItem>
                      <SelectItem value="semimonthly">Semi-Monthly (24)</SelectItem>
                      <SelectItem value="monthly">Monthly (12)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="yearsOfService" className="text-sm font-medium text-text">Years of Service<span className="text-red-400 ml-0.5">*</span></Label>
                  <Input id="yearsOfService" type="number" placeholder="e.g., 5" min={0} step={0.5} value={inputs.yearsOfService} onChange={(e) => handleChange("yearsOfService", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="weeksPerYear" className="text-sm font-medium text-text">Weeks Per Year of Service<span className="text-red-400 ml-0.5">*</span></Label>
                  <Input id="weeksPerYear" type="number" placeholder="e.g., 1" min={0} step={0.5} value={inputs.weeksPerYear} onChange={(e) => handleChange("weeksPerYear", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-text">Bonus Included?</Label>
                  <div className="flex gap-2">
                    {["yes", "no"].map((opt) => (
                      <label key={opt} className={cn(
                        "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all text-sm font-medium select-none",
                        "border-border/60 hover:border-primary-500/30 hover:bg-primary-500/5",
                        inputs.bonusIncluded === opt
                          ? "bg-primary-600 text-white border-primary-600 shadow-sm"
                          : "bg-white dark:bg-dark-800/50"
                      )}>
                        <input type="radio" name="bonusIncluded" value={opt} checked={inputs.bonusIncluded === opt} onChange={() => handleChange("bonusIncluded", opt)} className="sr-only" />
                        {opt === "yes" ? "Yes" : "No"}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="bonusAmount" className="text-sm font-medium text-text">Bonus Amount ($)</Label>
                  <Input id="bonusAmount" type="number" placeholder="e.g., 5000" min={0} step={100} value={inputs.bonusAmount} disabled={inputs.bonusIncluded !== "yes"} onChange={(e) => handleChange("bonusAmount", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono disabled:opacity-50" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="unusedPTO" className="text-sm font-medium text-text">Unused PTO Hours</Label>
                  <Input id="unusedPTO" type="number" placeholder="e.g., 80" min={0} step={1} value={inputs.unusedPTO} onChange={(e) => handleChange("unusedPTO", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="ptoRate" className="text-sm font-medium text-text">PTO Hourly Rate ($)</Label>
                  <Input id="ptoRate" type="number" placeholder="e.g., 36.06" min={0} step={0.01} value={inputs.ptoRate} onChange={(e) => handleChange("ptoRate", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="taxRate" className="text-sm font-medium text-text">Estimated Tax Rate (%)</Label>
                  <Input id="taxRate" type="number" placeholder="e.g., 25" min={0} max={60} step={0.5} value={inputs.taxRate} onChange={(e) => handleChange("taxRate", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="otherBenefits" className="text-sm font-medium text-text">Other Exit Benefits ($)</Label>
                  <Input id="otherBenefits" type="number" placeholder="e.g., 2000" min={0} step={100} value={inputs.otherBenefits} onChange={(e) => handleChange("otherBenefits", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="state" className="text-sm font-medium text-text">State <span className="text-muted">(Optional)</span></Label>
                  <Select value={inputs.state} onValueChange={(v) => handleChange("state", v)}>
                    <SelectTrigger id="state" className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl">
                      <SelectValue placeholder="Select state..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Select state...</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                      <SelectItem value="IL">Illinois</SelectItem>
                      <SelectItem value="PA">Pennsylvania</SelectItem>
                      <SelectItem value="OH">Ohio</SelectItem>
                      <SelectItem value="GA">Georgia</SelectItem>
                      <SelectItem value="NC">North Carolina</SelectItem>
                      <SelectItem value="MI">Michigan</SelectItem>
                    </SelectContent>
                  </Select>
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
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-primary-500/10 to-accent-cyan/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-tr from-accent-amber/5 to-primary-500/5 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative p-6 sm:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-text">Your Severance Estimate</h3>
                            <p className="text-xs text-text-secondary">Based on {inputs.yearsOfService} years of service</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <TooltipProvider>
                            <Tooltip><TooltipTrigger asChild>
                              <Button variant="ghost" size="icon-sm" onClick={handleCopy} className="rounded-lg">
                                {copied ? <Check className="h-4 w-4 text-accent-green" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </TooltipTrigger><TooltipContent>Copy</TooltipContent></Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip><TooltipTrigger asChild>
                              <Button variant="ghost" size="icon-sm" onClick={handleShare} className="rounded-lg">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger><TooltipContent>Share</TooltipContent></Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip><TooltipTrigger asChild>
                              <Button variant="ghost" size="icon-sm" onClick={handleDownload} className="rounded-lg">
                                <Download className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger><TooltipContent>Download TXT</TooltipContent></Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip><TooltipTrigger asChild>
                              <Button variant="ghost" size="icon-sm" onClick={handleExportCSV} className="rounded-lg">
                                <FileSpreadsheet className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger><TooltipContent>Export CSV</TooltipContent></Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip><TooltipTrigger asChild>
                              <Button variant="ghost" size="icon-sm" onClick={handlePrint} className="rounded-lg">
                                <Printer className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger><TooltipContent>Print</TooltipContent></Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>

                      <div className="p-5 sm:p-6 rounded-2xl mb-6 bg-gradient-to-br from-surface to-surface/60 border border-border/60">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-7 h-7 rounded-lg bg-primary-500 text-white flex items-center justify-center">
                            <Banknote className="h-3.5 w-3.5" />
                          </div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary">Gross Severance Pay</p>
                        </div>
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary-600 dark:text-primary-400 break-words">
                            {fmtCurrency(results.grossSeverance)}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary mt-3">
                          Based on {inputs.yearsOfService} years × {inputs.weeksPerYear} week{inputs.weeksPerYear > 1 ? "s" : ""} of pay per year at ${fmt(inputs.annualSalary / 52)}/week
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          { label: "Net Severance Pay", key: "netPay", value: results.netPay, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200/50", iconBg: "bg-emerald-500", icon: Wallet },
                          { label: "Estimated Taxes", key: "taxEstimate", value: results.taxEstimate, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10 border-red-200/50", iconBg: "bg-red-500", icon: Receipt },
                          { label: "PTO/Vacation Payout", key: "ptoValue", value: results.ptoValue, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-200/50", iconBg: "bg-amber-500", icon: Clock },
                          { label: "Total Exit Package", key: "totalExitPackage", value: results.totalExitPackage, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200/50", iconBg: "bg-emerald-500", icon: PiggyBank },
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
                                    {fmtCurrency(item.value)}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {results.bonusValue > 0 && (
                        <div className="mt-3 p-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-accent-green flex items-center justify-center shrink-0 shadow-sm">
                              <TrendingUp className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">Bonus Value</p>
                              <span className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums tracking-tight">
                                {fmtCurrency(results.bonusValue)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {results.otherBenefitsValue > 0 && (
                        <div className="mt-3 p-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0 shadow-sm">
                              <HandCoins className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1">Other Exit Benefits</p>
                              <span className="text-lg sm:text-xl font-bold text-text tabular-nums tracking-tight">
                                {fmtCurrency(results.otherBenefitsValue)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className="p-5">
                      <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                        <PiggyBank className="w-4 h-4 text-primary-500" />
                        Compensation Breakdown
                      </h4>
                      <div className="h-56">
                        {pieChart && <ChartComponent chart={pieChart} />}
                      </div>
                    </Card>

                    <Card className="p-5">
                      <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                        <Percent className="w-4 h-4 text-primary-500" />
                        Gross vs Net Comparison
                      </h4>
                      <div className="h-56">
                        {barChart && <ChartComponent chart={barChart} />}
                      </div>
                    </Card>
                  </div>

                  <Card className="p-5">
                    <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                      <Receipt className="w-4 h-4 text-primary-500" />
                      Tax Summary
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                        <span className="text-sm text-text-secondary">Estimated Tax Rate</span>
                        <span className="text-sm font-semibold text-text">{inputs.taxRate}%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200/50 dark:border-red-500/20">
                        <span className="text-sm text-text-secondary">Estimated Tax Withholding</span>
                        <span className="text-sm font-semibold text-red-500">{fmtCurrency(results.taxEstimate)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/50 dark:border-emerald-500/20">
                        <span className="text-sm text-text-secondary">Net Severance After Tax</span>
                        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{fmtCurrency(results.netPay)}</span>
                      </div>
                      <p className="text-xs text-muted mt-1">
                        Tax estimates are based on the rate you provided. Actual withholding may vary based on your total income, filing status, and state tax laws.
                      </p>
                    </div>
                  </Card>

                  <Card className="p-5">
                    <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                      <CalendarDays className="w-4 h-4 text-primary-500" />
                      Payment Timeline
                    </h4>
                    <div className="space-y-2">
                      {timelineData.map((item, i) => (
                        <div
                          key={i}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-xl border transition-colors",
                            item.isTotal
                              ? "bg-primary-50 dark:bg-primary-500/10 border-primary-200/50 dark:border-primary-500/20"
                              : "bg-surface-secondary dark:bg-dark-800/30 border-border/60"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            {!item.isTotal && (
                              <div className="w-6 h-6 rounded-full bg-primary-500/20 dark:bg-primary-500/30 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-primary-500" />
                              </div>
                            )}
                            <span className={cn("text-sm", item.isTotal ? "font-semibold text-primary-600 dark:text-primary-400" : "text-text-secondary")}>
                              {item.label}
                            </span>
                          </div>
                          <span className={cn("text-sm font-semibold tabular-nums", item.isTotal ? "text-primary-600 dark:text-primary-400" : "text-text")}>
                            {fmtCurrency(item.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted mt-3">
                      Weekly installment estimates based on {fmtCurrency(inputs.annualSalary / 52)} weekly salary.
                      Actual payment schedule depends on employer policy.
                    </p>
                  </Card>

                  <Card className="p-5">
                    <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                      <Wallet className="w-4 h-4 text-primary-500" />
                      Benefit Breakdown
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { label: "Severance Pay", value: results.grossSeverance, desc: "Based on salary and years of service", color: "text-primary-600 dark:text-primary-400" },
                        { label: "PTO Payout", value: results.ptoValue, desc: `${inputs.unusedPTO} hours at $${fmt(inputs.ptoRate)}/hr`, color: "text-amber-500" },
                        { label: "Bonus Compensation", value: results.bonusValue, desc: inputs.bonusIncluded === "yes" ? "Performance/retention bonus included" : "No bonus included", color: "text-emerald-600 dark:text-emerald-400" },
                        { label: "Other Benefits", value: results.otherBenefitsValue, desc: "Additional exit compensation", color: "text-text" },
                      ].map((item) => (
                        <div key={item.label} className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                          <p className="text-xs text-text-secondary mb-1">{item.label}</p>
                          <p className={cn("text-base font-bold tabular-nums", item.color)}>{fmtCurrency(item.value)}</p>
                          <p className="text-xs text-muted mt-1">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </motion.div>
            )}

            {!results && (
              <div className="bg-surface-secondary rounded-2xl border border-border p-8 text-center">
                <Calculator className="h-10 w-10 text-muted mx-auto mb-3" />
                <h3 className="text-base font-semibold text-text mb-1">Ready to Calculate</h3>
                <p className="text-sm text-muted">Enter your salary, years of service, and other details above, then click Calculate to estimate your severance package.</p>
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

            <div ref={stickyRef} className="lg:sticky lg:top-24 space-y-6">
              <Card className="p-5">
                <h3 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-primary-500" />
                  About This Tool
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Estimate your severance package after layoffs or termination. Calculate gross severance pay, estimated taxes, PTO payout, and total exit compensation.
                </p>
                <Separator className="my-3" />
                <p className="text-xs text-muted">
                  <strong className="text-text">Formula:</strong> Gross Severance = (Annual Salary ÷ 52) × Weeks Per Year × Years of Service. Net severance = Total compensation minus estimated taxes.
                </p>
                <Separator className="my-3" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">Category</span>
                  <Badge variant="secondary" className="text-[10px] capitalize">Finance</Badge>
                </div>
                <div className="flex items-center justify-between text-xs mt-2">
                  <span className="text-muted">Inputs</span>
                  <span className="text-text font-medium">11</span>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                  <HandCoins className="w-4 h-4 text-accent-amber" />
                  Quick Example
                </h3>
                <div className="space-y-2">
                  <p className="text-xs text-muted">Employee with $75,000 salary, 5 years of service:</p>
                  <div className="space-y-1">
                    {[
                      { label: "Annual Salary", value: "$75,000" },
                      { label: "Years of Service", value: "5" },
                      { label: "Weeks Per Year", value: "1" },
                      { label: "Gross Severance", value: "$7,211.54" },
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
                </div>
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
