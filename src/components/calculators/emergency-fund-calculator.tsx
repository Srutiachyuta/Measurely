"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calculator, RotateCcw, Copy, Check, Share2, Download, Printer, FileSpreadsheet,
  Shield, AlertTriangle, PiggyBank, Target, CalendarDays, TrendingUp,
  Banknote, Landmark, Sparkles, Info, ArrowLeft, Users, Receipt, Wallet, Gauge,
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

interface Inputs {
  monthlyExpenses: number;
  monthlyIncome: number;
  employmentType: string;
  jobStability: string;
  existingSavings: number;
  monthlyDebtPayments: number;
  dependents: number;
  healthInsurance: string;
  housingStatus: string;
  dualIncome: string;
  monthlySavings: number;
  annualReturn: number;
}

interface Milestone {
  percent: number;
  amount: number;
  reached: boolean;
}

interface TimelinePoint {
  month: number;
  savings: number;
  target: number;
}

interface Results {
  targetFund: number;
  recommendedMonths: number;
  existingSavings: number;
  remainingGoal: number;
  progressPercent: number;
  monthlySavingsNeeded: number;
  estimatedMonthsToGoal: number;
  estimatedCompletionDate: string;
  totalContributions: number;
  riskScore: number;
  riskLabel: string;
  riskColor: string;
  milestones: Milestone[];
  timeline: TimelinePoint[];
}

const defaultInputs: Inputs = {
  monthlyExpenses: 3000,
  monthlyIncome: 5000,
  employmentType: "salaried",
  jobStability: "medium",
  existingSavings: 5000,
  monthlyDebtPayments: 500,
  dependents: 0,
  healthInsurance: "yes",
  housingStatus: "renter",
  dualIncome: "yes",
  monthlySavings: 500,
  annualReturn: 4,
};

function calculate(inputs: Inputs): Results {
  const monthlyExpenses = Math.max(0, inputs.monthlyExpenses || 0);
  const monthlyIncome = Math.max(0, inputs.monthlyIncome || 0);
  const existingSavings = Math.max(0, inputs.existingSavings || 0);
  const monthlyDebtPayments = Math.max(0, inputs.monthlyDebtPayments || 0);
  const dependents = Math.max(0, Math.round(inputs.dependents || 0));
  const monthlySavings = Math.max(0, inputs.monthlySavings || 0);
  const annualReturn = Math.max(0, inputs.annualReturn || 0);

  let riskScore = 0;

  const empType = inputs.employmentType || "salaried";
  if (empType === "salaried") riskScore += 10;
  else if (empType === "freelancer") riskScore += 35;
  else if (empType === "self-employed") riskScore += 35;
  else if (empType === "business-owner") riskScore += 30;

  const stab = inputs.jobStability || "medium";
  if (stab === "high") riskScore += 0;
  else if (stab === "medium") riskScore += 15;
  else riskScore += 30;

  if (dependents === 0) riskScore += 0;
  else if (dependents <= 2) riskScore += 5;
  else riskScore += 10;

  if (inputs.healthInsurance === "no") riskScore += 15;

  if (inputs.housingStatus === "homeowner") riskScore += 5;
  else riskScore += 10;

  if (inputs.dualIncome === "no") riskScore += 10;

  const debtRatio = monthlyIncome > 0 ? monthlyDebtPayments / monthlyIncome : 0;
  if (debtRatio < 0.1) riskScore += 0;
  else if (debtRatio < 0.2) riskScore += 5;
  else riskScore += 10;

  riskScore = Math.min(100, Math.max(0, riskScore));

  let recommendedMonths: number;
  if (riskScore <= 20) recommendedMonths = 3;
  else if (riskScore <= 35) recommendedMonths = 4;
  else if (riskScore <= 50) recommendedMonths = 6;
  else if (riskScore <= 65) recommendedMonths = 8;
  else if (riskScore <= 80) recommendedMonths = 10;
  else recommendedMonths = 12;

  const targetFund = monthlyExpenses * recommendedMonths;
  const remainingGoal = Math.max(0, targetFund - existingSavings);
  const progressPercent = targetFund > 0 ? Math.min(100, (existingSavings / targetFund) * 100) : 0;

  const monthlyReturnRate = annualReturn / 100 / 12;
  let projectedSavings = existingSavings;
  let monthsToGoal = 0;
  const timeline: TimelinePoint[] = [];

  timeline.push({ month: 0, savings: projectedSavings, target: targetFund });

  const maxIterations = 1200;

  for (let m = 1; m <= maxIterations; m++) {
    projectedSavings = projectedSavings * (1 + monthlyReturnRate) + monthlySavings;
    timeline.push({ month: m, savings: Math.round(projectedSavings * 100) / 100, target: targetFund });
    if (projectedSavings >= targetFund && monthsToGoal === 0) {
      monthsToGoal = m;
    }
    if (m >= 60 && monthsToGoal > 0) break;
  }

  if (monthsToGoal === 0) monthsToGoal = maxIterations;

  const estDate = new Date();
  estDate.setMonth(estDate.getMonth() + monthsToGoal);
  const estimatedCompletionDate = estDate.toLocaleDateString("en-US", {
    month: "long", year: "numeric",
  });

  const totalContributions = existingSavings + monthlySavings * monthsToGoal;

  const milestones: Milestone[] = [25, 50, 75, 100].map((pct) => ({
    percent: pct,
    amount: (targetFund * pct) / 100,
    reached: existingSavings >= (targetFund * pct) / 100,
  }));

  let riskLabel: string;
  let riskColor: string;
  if (riskScore <= 25) { riskLabel = "Low Risk"; riskColor = "text-accent-green"; }
  else if (riskScore <= 50) { riskLabel = "Moderate Risk"; riskColor = "text-accent-amber"; }
  else if (riskScore <= 75) { riskLabel = "High Risk"; riskColor = "text-accent-orange"; }
  else { riskLabel = "Critical Risk"; riskColor = "text-red-500"; }

  const monthlySavingsNeeded = monthsToGoal > 0 ? remainingGoal / monthsToGoal : 0;

  return {
    targetFund: Math.round(targetFund * 100) / 100,
    recommendedMonths,
    existingSavings: Math.round(existingSavings * 100) / 100,
    remainingGoal: Math.round(remainingGoal * 100) / 100,
    progressPercent: Math.round(progressPercent * 10) / 10,
    monthlySavingsNeeded: Math.round(monthlySavingsNeeded * 100) / 100,
    estimatedMonthsToGoal: monthsToGoal,
    estimatedCompletionDate,
    totalContributions: Math.round(totalContributions * 100) / 100,
    riskScore,
    riskLabel,
    riskColor,
    milestones,
    timeline,
  };
}

function fmt(value: number): string {
  return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtCurrency(value: number): string {
  return "$" + fmt(value);
}

export function EmergencyFundCalculator() {
  const [inputs, setInputs] = useState<Inputs>(defaultInputs);
  const [results, setResults] = useState<Results | null>(null);
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();

  const handleChange = useCallback((key: keyof Inputs, value: string | number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
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
    if (e.key === "Enter" && inputs.monthlyExpenses > 0 && inputs.monthlyIncome > 0) {
      handleCalculate();
    }
  }, [handleCalculate, inputs]);

  const formatResultsText = useCallback(() => {
    if (!results) return "";
    const lines = [
      "Emergency Fund Calculator Results",
      "=".repeat(45),
      "",
      `Target Emergency Fund: $${fmt(results.targetFund)} (${results.recommendedMonths} months)`,
      `Current Savings: $${fmt(results.existingSavings)} (${results.progressPercent}% of goal)`,
      `Remaining Goal: $${fmt(results.remainingGoal)}`,
      `Risk Score: ${results.riskScore}/100 (${results.riskLabel})`,
      `Estimated Time to Goal: ${results.estimatedMonthsToGoal} months (${results.estimatedCompletionDate})`,
      `Monthly Savings Needed: $${fmt(results.monthlySavingsNeeded)}`,
      `Total Contributions: $${fmt(results.totalContributions)}`,
      "",
      "Milestones:",
      ...results.milestones.map((m) => `  ${m.percent}%: $${fmt(m.amount)} ${m.reached ? "[ACHIEVED]" : ""}`),
      "",
      "Generated by Measurely Emergency Fund Calculator",
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
      try { await navigator.share({ title: "Emergency Fund Calculator", text }); } catch { /* ignore */ }
    } else {
      await copyToClipboard(window.location.href);
      addToast({ title: "Link copied", variant: "info" });
    }
  }, [formatResultsText, addToast]);

  const handleDownload = useCallback(() => {
    downloadAsFile(formatResultsText(), "emergency-fund-estimate.txt");
    addToast({ title: "Downloaded", variant: "success" });
  }, [formatResultsText, addToast]);

  const handlePrint = useCallback(() => window.print(), []);

  const handleExportCSV = useCallback(() => {
    if (!results) return;
    const header = "Metric,Value\n";
    const rows = [
      `Target Emergency Fund,${results.targetFund}`,
      `Recommended Months,${results.recommendedMonths}`,
      `Current Savings,${results.existingSavings}`,
      `Remaining Goal,${results.remainingGoal}`,
      `Progress (%),${results.progressPercent}`,
      `Risk Score,${results.riskScore}`,
      `Risk Level,${results.riskLabel}`,
      `Estimated Months to Goal,${results.estimatedMonthsToGoal}`,
      `Monthly Savings Needed,${results.monthlySavingsNeeded}`,
      `Total Contributions,${results.totalContributions}`,
    ];
    downloadAsFile(header + rows.join("\n"), "emergency-fund-estimate.csv", "text/csv");
    addToast({ title: "Exported CSV", variant: "success" });
  }, [results, addToast]);

  const savingsChart = useMemo(() => {
    if (!results || results.timeline.length === 0) return null;
    const sampleEvery = Math.max(1, Math.floor(results.timeline.length / 24));
    const sampled = results.timeline.filter((_, i) => i % sampleEvery === 0 || i === results.timeline.length - 1);
    return {
      type: "line" as const,
      data: {
        labels: sampled.map((p) => `Month ${p.month}`),
        datasets: [
          {
            label: "Projected Savings",
            data: sampled.map((p) => p.savings),
            borderColor: "rgba(99, 102, 241, 0.9)",
            backgroundColor: "rgba(99, 102, 241, 0.1)",
            fill: true,
            tension: 0.3,
            pointRadius: 3,
            pointHoverRadius: 6,
            borderWidth: 2,
          },
          {
            label: "Target Fund",
            data: sampled.map(() => results.targetFund),
            borderColor: "rgba(239, 68, 68, 0.6)",
            borderDash: [6, 4],
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" as const, labels: { usePointStyle: true, padding: 12, font: { size: 11 } } },
          tooltip: {
            callbacks: {
              label: (ctx: { parsed: { y: number }; dataset: { label?: string } }) => {
                return (ctx.dataset.label || "") + ": $" + ctx.parsed.y.toLocaleString("en-US", { minimumFractionDigits: 2 });
              },
            },
          },
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: (v: string | number) => "$" + Number(v).toLocaleString() } },
          x: { ticks: { maxTicksLimit: 12 } },
        },
      },
    };
  }, [results]);

  const allocationChart = useMemo(() => {
    if (!results) return null;
    const savingsPart = results.existingSavings;
    const remainingPart = results.remainingGoal;
    if (savingsPart + remainingPart === 0) return null;
    return {
      type: "doughnut" as const,
      data: {
        labels: ["Current Savings", "Remaining Goal"],
        datasets: [{
          data: [savingsPart, remainingPart],
          backgroundColor: ["rgba(34, 197, 94, 0.8)", "rgba(99, 102, 241, 0.8)"],
          borderColor: ["rgba(34, 197, 94, 1)", "rgba(99, 102, 241, 1)"],
          borderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" as const, labels: { padding: 16, usePointStyle: true, font: { size: 12 } } },
          tooltip: {
            callbacks: {
              label: (ctx: { parsed: { raw: number } }) => "$" + ctx.parsed.raw.toLocaleString("en-US", { minimumFractionDigits: 2 }),
            },
          },
        },
      },
    };
  }, [results]);

  const isValid = inputs.monthlyExpenses > 0 && inputs.monthlyIncome > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <nav className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link href="/calculators" className="hover:text-text transition-colors">Calculators</Link>
          <span>/</span>
          <span className="text-text">Emergency Fund Calculator</span>
        </nav>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-green to-primary-500 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text">Emergency Fund Calculator</h1>
            <p className="text-sm text-muted mt-1">Find your ideal emergency savings goal based on your expenses and risk profile</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="secondary" className="text-xs capitalize">Finance</Badge>
          <Badge variant="info" className="text-xs">Calculator</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-surface rounded-2xl border border-border p-5 space-y-4">
              <h2 className="text-sm font-semibold text-text">Your Financial Profile</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="monthlyExpenses" className="text-sm font-medium text-text">
                    Monthly Essential Expenses ($)<span className="text-red-400 ml-0.5">*</span>
                    <TooltipProvider><Tooltip><TooltipTrigger><Info className="w-3.5 h-3.5 inline ml-1 text-muted" /></TooltipTrigger><TooltipContent>Rent, food, utilities, insurance, transport, minimum debt payments</TooltipContent></Tooltip></TooltipProvider>
                  </Label>
                  <Input onKeyDown={handleKeyDown} id="monthlyExpenses" type="number" placeholder="e.g., 3000" min={1} step={100} value={inputs.monthlyExpenses} onChange={(e) => handleChange("monthlyExpenses", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="monthlyIncome" className="text-sm font-medium text-text">Monthly Income ($)<span className="text-red-400 ml-0.5">*</span></Label>
                  <Input onKeyDown={handleKeyDown} id="monthlyIncome" type="number" placeholder="e.g., 5000" min={1} step={100} value={inputs.monthlyIncome} onChange={(e) => handleChange("monthlyIncome", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="employmentType" className="text-sm font-medium text-text">Employment Type<span className="text-red-400 ml-0.5">*</span></Label>
                  <Select value={inputs.employmentType} onValueChange={(v) => handleChange("employmentType", v)}>
                    <SelectTrigger id="employmentType" className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salaried">Salaried</SelectItem>
                      <SelectItem value="freelancer">Freelancer</SelectItem>
                      <SelectItem value="self-employed">Self-employed</SelectItem>
                      <SelectItem value="business-owner">Business Owner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="jobStability" className="text-sm font-medium text-text">Job Stability<span className="text-red-400 ml-0.5">*</span></Label>
                  <Select value={inputs.jobStability} onValueChange={(v) => handleChange("jobStability", v)}>
                    <SelectTrigger id="jobStability" className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-2xl border border-border p-5 space-y-4">
              <h2 className="text-sm font-semibold text-text">Financial Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="existingSavings" className="text-sm font-medium text-text">Existing Emergency Savings ($)</Label>
                  <Input onKeyDown={handleKeyDown} id="existingSavings" type="number" placeholder="e.g., 5000" min={0} step={100} value={inputs.existingSavings} onChange={(e) => handleChange("existingSavings", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="monthlyDebtPayments" className="text-sm font-medium text-text">Monthly Debt Payments ($)</Label>
                  <Input onKeyDown={handleKeyDown} id="monthlyDebtPayments" type="number" placeholder="e.g., 500" min={0} step={50} value={inputs.monthlyDebtPayments} onChange={(e) => handleChange("monthlyDebtPayments", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="dependents" className="text-sm font-medium text-text">Number of Dependents</Label>
                  <Input onKeyDown={handleKeyDown} id="dependents" type="number" placeholder="e.g., 0" min={0} max={20} step={1} value={inputs.dependents} onChange={(e) => handleChange("dependents", e.target.value === "" ? 0 : Math.max(0, Number(e.target.value)))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-text">Health Insurance</Label>
                  <div className="flex gap-2">
                    {["yes", "no"].map((opt) => (
                      <label key={opt} className={cn(
                        "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all text-sm font-medium select-none",
                        "border-border/60 hover:border-primary-500/30 hover:bg-primary-500/5",
                        inputs.healthInsurance === opt
                          ? "bg-primary-600 text-white border-primary-600 shadow-sm"
                          : "bg-white dark:bg-dark-800/50"
                      )}>
                        <input type="radio" name="healthInsurance" value={opt} checked={inputs.healthInsurance === opt} onChange={() => handleChange("healthInsurance", opt)} className="sr-only" />
                        {opt === "yes" ? "Insured" : "Uninsured"}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-text">Housing Status</Label>
                  <div className="flex gap-2">
                    {["homeowner", "renter"].map((opt) => (
                      <label key={opt} className={cn(
                        "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all text-sm font-medium select-none",
                        "border-border/60 hover:border-primary-500/30 hover:bg-primary-500/5",
                        inputs.housingStatus === opt
                          ? "bg-primary-600 text-white border-primary-600 shadow-sm"
                          : "bg-white dark:bg-dark-800/50"
                      )}>
                        <input type="radio" name="housingStatus" value={opt} checked={inputs.housingStatus === opt} onChange={() => handleChange("housingStatus", opt)} className="sr-only" />
                        {opt === "homeowner" ? "Homeowner" : "Renter"}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-text">Dual Income Household</Label>
                  <div className="flex gap-2">
                    {["yes", "no"].map((opt) => (
                      <label key={opt} className={cn(
                        "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all text-sm font-medium select-none",
                        "border-border/60 hover:border-primary-500/30 hover:bg-primary-500/5",
                        inputs.dualIncome === opt
                          ? "bg-primary-600 text-white border-primary-600 shadow-sm"
                          : "bg-white dark:bg-dark-800/50"
                      )}>
                        <input type="radio" name="dualIncome" value={opt} checked={inputs.dualIncome === opt} onChange={() => handleChange("dualIncome", opt)} className="sr-only" />
                        {opt === "yes" ? "Yes" : "No"}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-2xl border border-border p-5 space-y-4">
              <h2 className="text-sm font-semibold text-text">Savings Capacity</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="monthlySavings" className="text-sm font-medium text-text">Monthly Savings Amount ($)</Label>
                  <Input onKeyDown={handleKeyDown} id="monthlySavings" type="number" placeholder="e.g., 500" min={0} step={50} value={inputs.monthlySavings} onChange={(e) => handleChange("monthlySavings", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="annualReturn" className="text-sm font-medium text-text">Expected Annual Return (%) <span className="text-muted font-normal">(optional)</span></Label>
                  <Input onKeyDown={handleKeyDown} id="annualReturn" type="number" placeholder="e.g., 4" min={0} max={100} step={0.1} value={inputs.annualReturn} onChange={(e) => handleChange("annualReturn", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
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
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-accent-green/10 to-primary-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative p-6 sm:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-green to-primary-500 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-text">Your Emergency Fund Plan</h3>
                            <p className="text-xs text-text-secondary">Personalized savings goal & timeline</p>
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
                          <div className="w-7 h-7 rounded-lg bg-accent-green text-white flex items-center justify-center">
                            <Shield className="h-3.5 w-3.5" />
                          </div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary">Target Emergency Fund</p>
                        </div>
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text break-words">
                            {fmtCurrency(results.targetFund)}
                          </span>
                          <span className="text-sm text-muted">
                            ({results.recommendedMonths} months of expenses)
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary mt-2">
                          Based on your risk profile, we recommend saving {fmtCurrency(results.targetFund)} to cover {results.recommendedMonths} months of essential expenses.
                        </p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2 mb-4">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1, duration: 0.4 }}
                          className="relative p-5 rounded-xl bg-surface-secondary border border-border/60 flex flex-col items-center text-center"
                        >
                          <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">Progress</p>
                          <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-3">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                              <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="8" className="text-border/60" />
                              <circle
                                cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="8"
                                strokeDasharray={`${2 * Math.PI * 50}`}
                                strokeDashoffset={`${2 * Math.PI * 50 * (1 - results.progressPercent / 100)}`}
                                className="text-accent-green"
                                strokeLinecap="round"
                                style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-2xl sm:text-3xl font-bold text-text">{results.progressPercent}%</span>
                              <span className="text-[10px] text-muted">funded</span>
                            </div>
                          </div>
                          <p className="text-xs text-text-secondary">
                            <span className="font-semibold text-text">{fmtCurrency(results.existingSavings)}</span> saved of{" "}
                            <span className="font-semibold text-text">{fmtCurrency(results.targetFund)}</span>
                          </p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15, duration: 0.35 }}
                          className="flex flex-col gap-3"
                        >
                          <div className="flex-1 p-4 rounded-xl bg-surface-secondary border border-border/60">
                            <div className="flex items-center gap-2 mb-1">
                              <AlertTriangle className="w-4 h-4 text-accent-amber" />
                              <span className="text-xs text-text-secondary">Risk Level</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 rounded-full bg-border/60 overflow-hidden">
                                <div
                                  className="h-full rounded-full transition-all duration-700"
                                  style={{
                                    width: `${results.riskScore}%`,
                                    background: results.riskScore <= 25
                                      ? "rgb(34, 197, 94)"
                                      : results.riskScore <= 50
                                      ? "rgb(234, 179, 8)"
                                      : results.riskScore <= 75
                                      ? "rgb(249, 115, 22)"
                                      : "rgb(239, 68, 68)",
                                  }}
                                />
                              </div>
                              <span className={cn("text-sm font-bold shrink-0", results.riskColor)}>
                                {results.riskLabel}
                              </span>
                            </div>
                            <p className="text-[10px] text-muted mt-1">Score: {results.riskScore}/100</p>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl bg-surface-secondary border border-border/60">
                              <p className="text-[10px] text-text-secondary mb-1">Remaining Goal</p>
                              <p className="text-sm font-bold text-primary-600 dark:text-primary-400">{fmtCurrency(results.remainingGoal)}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-surface-secondary border border-border/60">
                              <p className="text-[10px] text-text-secondary mb-1">Monthly Needed</p>
                              <p className="text-sm font-bold text-text">{fmtCurrency(results.monthlySavingsNeeded)}</p>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          { label: "Estimated Completion", key: "completion", value: results.estimatedCompletionDate, color: "text-text", bg: "bg-surface-secondary dark:bg-dark-800/30 border-border/60", iconBg: "bg-primary-500", icon: CalendarDays },
                          { label: "Months to Goal", key: "monthsToGoal", value: results.estimatedMonthsToGoal, color: "text-text", bg: "bg-surface-secondary dark:bg-dark-800/30 border-border/60", iconBg: "bg-primary-500", icon: Gauge },
                          { label: "Recommended Coverage", key: "coverage", value: `${results.recommendedMonths} months`, color: "text-accent-green", bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200/50", iconBg: "bg-accent-green", icon: Shield },
                          { label: "Total Contributions", key: "totalContributions", value: fmtCurrency(results.totalContributions), color: "text-text", bg: "bg-surface-secondary dark:bg-dark-800/30 border-border/60", iconBg: "bg-accent-amber", icon: PiggyBank },
                        ].map((item, i) => {
                          const Icon = item.icon;
                          return (
                            <motion.div
                              key={item.key}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 + i * 0.04, duration: 0.35 }}
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
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className="p-5">
                      <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-primary-500" />
                        Savings Growth Projection
                      </h4>
                      <div className="h-56">{savingsChart && <ChartComponent chart={savingsChart} />}</div>
                    </Card>

                    <Card className="p-5">
                      <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                        <PiggyBank className="w-4 h-4 text-primary-500" />
                        Savings Allocation
                      </h4>
                      <div className="h-56">{allocationChart && <ChartComponent chart={allocationChart} />}</div>
                    </Card>
                  </div>

                  <Card className="p-5">
                    <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                      <Target className="w-4 h-4 text-primary-500" />
                      Savings Milestones
                    </h4>
                    <div className="space-y-3">
                      {results.milestones.map((m, i) => (
                        <motion.div
                          key={m.percent}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06, duration: 0.3 }}
                          className={cn(
                            "flex items-center gap-4 p-3 rounded-xl border transition-all",
                            m.reached
                              ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200/50 dark:border-emerald-500/20"
                              : "bg-surface-secondary dark:bg-dark-800/30 border-border/60"
                          )}
                        >
                          <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                            m.reached
                              ? "bg-accent-green text-white"
                              : "bg-border/40 text-muted"
                          )}>
                            {m.percent}%
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={cn("text-sm font-medium", m.reached ? "text-accent-green" : "text-text")}>
                              {fmtCurrency(m.amount)}
                            </p>
                            <p className="text-xs text-text-secondary">
                              {m.reached ? "Achieved" : `${fmtCurrency(Math.max(0, m.amount - results.existingSavings))} remaining`}
                            </p>
                          </div>
                          <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
                            m.reached ? "bg-accent-green/20" : "bg-border/40"
                          )}>
                            {m.reached ? (
                              <Check className="w-3.5 h-3.5 text-accent-green" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-muted" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-5">
                    <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                      <Receipt className="w-4 h-4 text-primary-500" />
                      Financial Summary
                    </h4>
                    <div className="space-y-2">
                      {[
                        { label: "Monthly Essential Expenses", value: inputs.monthlyExpenses },
                        { label: "Monthly Income", value: inputs.monthlyIncome },
                        { label: "Monthly Debt Payments", value: inputs.monthlyDebtPayments },
                        { label: "Disposable Income", value: Math.max(0, inputs.monthlyIncome - inputs.monthlyExpenses - inputs.monthlyDebtPayments), highlight: true },
                        { label: "Monthly Savings Capacity", value: inputs.monthlySavings },
                        { label: "Target Emergency Fund", value: results.targetFund, isTarget: true },
                        { label: "Current Emergency Savings", value: results.existingSavings, isSavings: true },
                        { label: "Remaining to Save", value: results.remainingGoal, isRemaining: true },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-xl border transition-colors",
                            item.highlight ? "bg-primary-50 dark:bg-primary-500/10 border-primary-200/50 dark:border-primary-500/20" :
                            item.isTarget ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200/50 dark:border-emerald-500/20" :
                            item.isSavings ? "bg-blue-50 dark:bg-blue-500/10 border-blue-200/50 dark:border-blue-500/20" :
                            item.isRemaining ? "bg-amber-50 dark:bg-amber-500/10 border-amber-200/50 dark:border-amber-500/20" :
                            "bg-surface-secondary dark:bg-dark-800/30 border-border/60"
                          )}
                        >
                          <span className={cn("text-sm", item.highlight || item.isTarget || item.isSavings || item.isRemaining ? "font-semibold" : "text-text-secondary")}>
                            {item.label}
                          </span>
                          <span className={cn(
                            "text-sm font-semibold tabular-nums",
                            item.highlight ? "text-primary-600 dark:text-primary-400" :
                            item.isTarget ? "text-emerald-600 dark:text-emerald-400" :
                            item.isSavings ? "text-blue-600 dark:text-blue-400" :
                            item.isRemaining ? "text-amber-500" :
                            "text-text"
                          )}>
                            {fmtCurrency(item.value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-5">
                    <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                      <Users className="w-4 h-4 text-primary-500" />
                      Risk Assessment Breakdown
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                        <div className="flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-muted" />
                          <span className="text-sm text-text-secondary">Employment: {inputs.employmentType === "salaried" ? "Salaried" : inputs.employmentType === "freelancer" ? "Freelancer" : inputs.employmentType === "self-employed" ? "Self-employed" : "Business Owner"}</span>
                        </div>
                        <span className="text-sm font-medium text-text">{inputs.employmentType === "salaried" ? "Low" : "High"} risk</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                        <div className="flex items-center gap-2">
                          <Gauge className="w-4 h-4 text-muted" />
                          <span className="text-sm text-text-secondary">Job Stability: {inputs.jobStability === "high" ? "High" : inputs.jobStability === "medium" ? "Medium" : "Low"}</span>
                        </div>
                        <span className={cn("text-sm font-medium", inputs.jobStability === "high" ? "text-accent-green" : inputs.jobStability === "medium" ? "text-accent-amber" : "text-red-500")}>
                          {inputs.jobStability === "high" ? "Low risk" : inputs.jobStability === "medium" ? "Moderate" : "High risk"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted" />
                          <span className="text-sm text-text-secondary">Dependents: {inputs.dependents}</span>
                        </div>
                        <span className={cn("text-sm font-medium", inputs.dependents > 0 ? "text-accent-amber" : "text-accent-green")}>
                          {inputs.dependents > 0 ? "Added risk" : "No added risk"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-muted" />
                          <span className="text-sm text-text-secondary">Health Insurance: {inputs.healthInsurance === "yes" ? "Insured" : "Uninsured"}</span>
                        </div>
                        <span className={cn("text-sm font-medium", inputs.healthInsurance === "no" ? "text-red-500" : "text-accent-green")}>
                          {inputs.healthInsurance === "no" ? "High risk" : "Protected"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                        <div className="flex items-center gap-2">
                          <Landmark className="w-4 h-4 text-muted" />
                          <span className="text-sm text-text-secondary">Dual Income: {inputs.dualIncome === "yes" ? "Yes" : "No"}</span>
                        </div>
                        <span className={cn("text-sm font-medium", inputs.dualIncome === "no" ? "text-accent-amber" : "text-accent-green")}>
                          {inputs.dualIncome === "no" ? "Higher risk" : "Lower risk"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                        <div className="flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-muted" />
                          <span className="text-sm text-text-secondary">Debt-to-Income Ratio: {inputs.monthlyIncome > 0 ? `${(inputs.monthlyDebtPayments / inputs.monthlyIncome * 100).toFixed(1)}%` : "N/A"}</span>
                        </div>
                        <span className={cn("text-sm font-medium", inputs.monthlyIncome > 0 && inputs.monthlyDebtPayments / inputs.monthlyIncome > 0.2 ? "text-red-500" : inputs.monthlyDebtPayments / inputs.monthlyIncome > 0.1 ? "text-accent-amber" : "text-accent-green")}>
                          {inputs.monthlyIncome > 0 && inputs.monthlyDebtPayments / inputs.monthlyIncome > 0.2 ? "High" : inputs.monthlyDebtPayments / inputs.monthlyIncome > 0.1 ? "Moderate" : "Low"}
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            )}

            {!results && (
              <div className="bg-surface-secondary rounded-2xl border border-border p-8 text-center">
                <Shield className="h-10 w-10 text-muted mx-auto mb-3" />
                <h3 className="text-base font-semibold text-text mb-1">Ready to Calculate</h3>
                <p className="text-sm text-muted">Enter your financial details and click Calculate to see your personalized emergency fund goal and savings plan.</p>
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
                  Determine your ideal emergency fund based on your monthly expenses, income stability, dependents, and debt obligations. Get a personalized savings plan with milestones and timeline.
                </p>
                <Separator className="my-3" />
                <p className="text-xs text-muted font-medium mb-2">Risk factors considered:</p>
                <ul className="text-xs text-muted space-y-1 list-disc list-inside">
                  <li>Employment type & stability</li>
                  <li>Number of dependents</li>
                  <li>Health insurance status</li>
                  <li>Housing situation</li>
                  <li>Dual vs single income</li>
                  <li>Debt-to-income ratio</li>
                </ul>
                <Separator className="my-3" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">Category</span>
                  <Badge variant="secondary" className="text-[10px] capitalize">Finance</Badge>
                </div>
                <div className="flex items-center justify-between text-xs mt-2">
                  <span className="text-muted">Inputs</span>
                  <span className="text-text font-medium">12</span>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-accent-amber" />
                  Quick Example
                </h3>
                <p className="text-xs text-muted mb-2">Salaried employee with $3,000 monthly expenses:</p>
                <div className="space-y-1">
                  {[
                    { label: "Monthly Expenses", value: "$3,000" },
                    { label: "Risk Profile", value: "Moderate" },
                    { label: "Recommended Months", value: "6 months" },
                    { label: "Target Fund", value: "$18,000" },
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
