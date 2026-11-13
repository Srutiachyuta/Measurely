"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calculator, RotateCcw, Copy, Check, Share2, Download, Printer,
  PiggyBank, DollarSign, Percent, TrendingUp,
  Sparkles, Info, ArrowLeft, FileSpreadsheet,
  Heart, Shield, Activity,
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
import Image from "next/image";
import dynamic from "next/dynamic";
import { HSA_2026 } from "@/data/hsa-limits";

const ChartComponent = dynamic(() => import("./calculator-chart"), {
  ssr: false,
  loading: () => <div className="h-48 rounded-xl bg-surface-secondary animate-pulse" />,
});

interface Inputs {
  age: number;
  retirementAge: number;
  filingStatus: string;
  state: string;
  salary: number;
  federalRate: number;
  stateRate: number;
  ficaEligible: boolean;
  currentBalance: number;
  annualContribution: number;
  employerContribution: number;
  annualWithdrawal: number;
  investmentReturn: number;
  inflationRate: number;
  increaseContribution: number;
  healthcareInflation: number;
}

interface Results {
  annualTaxSavings: number;
  federalTaxSavings: number;
  stateTaxSavings: number;
  ficaSavings: number;
  retirementValue: number;
  totalContributions: number;
  totalInvestmentGrowth: number;
  totalMedicalWithdrawals: number;
  lifetimeTaxBenefit: number;
  effectiveReturnAdvantage: number;
  totalEmployeeContributions: number;
  totalEmployerContributions: number;
  yearsToRetirement: number;
  hsaBalanceAfterWithdrawals: number;
  taxableEquivalent: number;
}

const defaultInputs: Inputs = {
  age: 30,
  retirementAge: 65,
  filingStatus: "single",
  state: "",
  salary: 75000,
  federalRate: 22,
  stateRate: 5,
  ficaEligible: true,
  currentBalance: 0,
  annualContribution: 3400,
  employerContribution: 1000,
  annualWithdrawal: 500,
  investmentReturn: 7,
  inflationRate: 3,
  increaseContribution: 0,
  healthcareInflation: 5,
};

const IRS_LIMITS_2026 = HSA_2026;

const stateNames: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
  MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
  OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
  SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
  VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
};

function calculate(inputs: Inputs): Results {
  const age = Math.max(18, inputs.age || 30);
  const retirementAge = Math.max(age + 1, inputs.retirementAge || 65);
  const yearsToRetirement = retirementAge - age;
  const federalRate = Math.max(0, Math.min(50, inputs.federalRate ?? 22)) / 100;
  const stateRate = Math.max(0, Math.min(15, inputs.stateRate || 0)) / 100;
  const investmentReturn = Math.max(0, Math.min(25, inputs.investmentReturn ?? 7)) / 100;
  const inflationRate = Math.max(0, Math.min(15, inputs.inflationRate || 3)) / 100;
  const healthcareInflation = Math.max(0, Math.min(20, inputs.healthcareInflation ?? 5)) / 100;
  const increasePct = Math.max(0, Math.min(20, inputs.increaseContribution || 0)) / 100;

  const ficaRate = inputs.ficaEligible ? 0.0765 : 0;
  const annualContribution = Math.max(0, inputs.annualContribution || 0);
  const employerContribution = Math.max(0, inputs.employerContribution || 0);
  const annualWithdrawal = Math.max(0, inputs.annualWithdrawal || 0);
  const currentBalance = Math.max(0, inputs.currentBalance || 0);

  const totalAnnualContribution = annualContribution + employerContribution;

  const federalTaxSavings = annualContribution * federalRate;
  const stateTaxSavings = annualContribution * (["CA", "NJ"].includes(inputs.state) ? 0 : stateRate);
  const ficaSavings = annualContribution * ficaRate;
  const annualTaxSavings = federalTaxSavings + stateTaxSavings + ficaSavings;

  let hsaBalance = currentBalance;
  let totalContributions = currentBalance;
  let totalInvestmentGrowth = 0;
  let totalMedicalWithdrawals = 0;
  let currentContribution = totalAnnualContribution;
  let currentWithdrawal = annualWithdrawal;

  for (let y = 0; y < yearsToRetirement; y++) {
    totalContributions += currentContribution;
    hsaBalance = (hsaBalance + currentContribution) * (1 + investmentReturn);
    const withdrawal = Math.min(hsaBalance, currentWithdrawal);
    currentWithdrawal *= 1 + healthcareInflation;
    hsaBalance = Math.max(0, hsaBalance - withdrawal);
    totalMedicalWithdrawals += withdrawal;
    currentContribution *= (1 + increasePct);
  }

  totalInvestmentGrowth = Math.max(0, hsaBalance - (totalContributions - totalMedicalWithdrawals));

  const lifetimeTaxBenefit = (federalTaxSavings + stateTaxSavings + ficaSavings) * yearsToRetirement;

  const taxableGrowth = hsaBalance * 0.8 * federalRate;
  const taxableEquivalent = hsaBalance - taxableGrowth;

  return {
    annualTaxSavings: Math.round(annualTaxSavings * 100) / 100,
    federalTaxSavings: Math.round(federalTaxSavings * 100) / 100,
    stateTaxSavings: Math.round(stateTaxSavings * 100) / 100,
    ficaSavings: Math.round(ficaSavings * 100) / 100,
    retirementValue: Math.round(hsaBalance * 100) / 100,
    totalContributions: Math.round(totalContributions * 100) / 100,
    totalInvestmentGrowth: Math.round(totalInvestmentGrowth * 100) / 100,
    totalMedicalWithdrawals: Math.round(totalMedicalWithdrawals * 100) / 100,
    lifetimeTaxBenefit: Math.round(lifetimeTaxBenefit * 100) / 100,
    effectiveReturnAdvantage: Math.round((investmentReturn + federalRate + stateRate + ficaRate) * 10000) / 100,
    totalEmployeeContributions: Math.round((currentBalance + annualContribution * yearsToRetirement) * 100) / 100,
    totalEmployerContributions: Math.round((employerContribution * yearsToRetirement) * 100) / 100,
    yearsToRetirement,
    hsaBalanceAfterWithdrawals: Math.round(hsaBalance * 100) / 100,
    taxableEquivalent: Math.round(taxableEquivalent * 100) / 100,
  };
}

function fmt(value: number): string {
  return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtCurrency(value: number): string {
  return "$" + fmt(value);
}

export function HsaTaxSavingsCalculator() {
  const [inputs, setInputs] = useState<Inputs>(defaultInputs);
  const [results, setResults] = useState<Results | null>(null);
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();

  const handleChange = useCallback((key: keyof Inputs, value: string | number | boolean) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleCalculate = useCallback(() => {
    const limit = (inputs.filingStatus === "single" ? HSA_2026.individual : HSA_2026.family) + (inputs.age >= 55 ? HSA_2026.catchUp : 0);
    if (inputs.annualContribution + inputs.employerContribution > limit) {
      addToast({ title: `Employee and employer contributions together must not exceed $${limit.toLocaleString()} for this coverage and age.`, variant: "error" });
      return;
    }
    const res = calculate(inputs);
    setResults(res);
  }, [inputs, addToast]);

  const handleReset = useCallback(() => {
    setInputs(defaultInputs);
    setResults(null);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCalculate();
  }, [handleCalculate]);

  const formatResultsText = useCallback(() => {
    if (!results) return "";
    return [
      "HSA Tax Savings Calculator Results",
      "=".repeat(40),
      "",
      `Annual Tax Savings: ${fmtCurrency(results.annualTaxSavings)}`,
      `Federal Tax Savings: ${fmtCurrency(results.federalTaxSavings)}`,
      `State Tax Savings: ${fmtCurrency(results.stateTaxSavings)}`,
      `FICA Savings: ${fmtCurrency(results.ficaSavings)}`,
      `Retirement HSA Value: ${fmtCurrency(results.retirementValue)}`,
      `Total Contributions: ${fmtCurrency(results.totalContributions)}`,
      `Total Investment Growth: ${fmtCurrency(results.totalInvestmentGrowth)}`,
      `Total Medical Withdrawals: ${fmtCurrency(results.totalMedicalWithdrawals)}`,
      `Lifetime Tax Benefit: ${fmtCurrency(results.lifetimeTaxBenefit)}`,
      `Effective Return Advantage: ${results.effectiveReturnAdvantage}%`,
      "",
      "Generated by Measurely HSA Tax Savings Calculator",
    ].join("\n");
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
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share({ title: "HSA Tax Savings Calculator", text: formatResultsText() }); } catch { /* ignore */ }
    } else {
      await copyToClipboard(window.location.href);
      addToast({ title: "Link copied", variant: "info" });
    }
  }, [formatResultsText, addToast]);

  const handleDownload = useCallback(() => {
    downloadAsFile(formatResultsText(), "hsa-tax-savings-estimate.txt");
    addToast({ title: "Downloaded", variant: "success" });
  }, [formatResultsText, addToast]);

  const handlePrint = useCallback(() => window.print(), []);

  const handleExportCSV = useCallback(() => {
    if (!results) return;
    const header = "Metric,Value\n";
    const rows = [
      `Annual Tax Savings,${results.annualTaxSavings}`,
      `Federal Tax Savings,${results.federalTaxSavings}`,
      `State Tax Savings,${results.stateTaxSavings}`,
      `FICA Savings,${results.ficaSavings}`,
      `Retirement HSA Value,${results.retirementValue}`,
      `Total Contributions,${results.totalContributions}`,
      `Total Investment Growth,${results.totalInvestmentGrowth}`,
      `Total Medical Withdrawals,${results.totalMedicalWithdrawals}`,
      `Lifetime Tax Benefit,${results.lifetimeTaxBenefit}`,
    ];
    downloadAsFile(header + rows.join("\n"), "hsa-tax-savings-estimate.csv", "text/csv");
    addToast({ title: "Exported CSV", variant: "success" });
  }, [results, addToast]);

  const growthChart = useMemo(() => {
    if (!results) return null;
    const years = Math.min(results.yearsToRetirement, 40);
    const data: number[] = [];
    const contributions: number[] = [];
    let balance = inputs.currentBalance;
    let currentContribution = inputs.annualContribution + inputs.employerContribution;
    const currentWithdrawal = inputs.annualWithdrawal;
    const invReturn = Math.max(0, Math.min(25, inputs.investmentReturn ?? 7)) / 100;
    const healthInf = Math.max(0, Math.min(20, inputs.healthcareInflation ?? 5)) / 100;
    const incPct = Math.max(0, Math.min(20, inputs.increaseContribution || 0)) / 100;
    let cumContributions = inputs.currentBalance;
    const labels: string[] = [];

    for (let y = 0; y < years; y++) {
      cumContributions += currentContribution;
      balance = (balance + currentContribution) * (1 + invReturn);
      const withdrawal = currentWithdrawal * (1 + healthInf);
      balance = Math.max(0, balance - withdrawal);
      data.push(Math.round(balance));
      contributions.push(Math.round(cumContributions));
      currentContribution *= (1 + incPct);
      labels.push(`Year ${y + 1}`);
    }

    return {
      type: "line" as const,
      data: {
        labels,
        datasets: [
          {
            label: "HSA Balance",
            data,
            borderColor: "rgba(34, 197, 94, 1)",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            fill: true,
            tension: 0.3,
            borderWidth: 2,
            pointRadius: 0,
          },
          {
            label: "Cumulative Contributions",
            data: contributions,
            borderColor: "rgba(99, 102, 241, 1)",
            backgroundColor: "rgba(99, 102, 241, 0.05)",
            fill: false,
            tension: 0.3,
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" as const, labels: { padding: 16, usePointStyle: true, font: { family: "Inter, sans-serif", size: 11 } } },
          tooltip: { callbacks: { label: (ctx: { dataset: { label: string }; parsed: { y: number } }) => ctx.dataset.label + ": $" + ctx.parsed.y.toLocaleString("en-US") } },
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: (v: string | number) => "$" + Number(v).toLocaleString(), maxTicksLimit: 8 } },
          x: { ticks: { maxTicksLimit: 10 } },
        },
      },
    };
  }, [results, inputs]);

  const taxBreakdownChart = useMemo(() => {
    if (!results) return null;
    return {
      type: "doughnut" as const,
      data: {
        labels: ["Federal Tax Savings", "State Tax Savings", "FICA Savings"],
        datasets: [{
          data: [
            Math.max(0, results.federalTaxSavings),
            Math.max(0, results.stateTaxSavings),
            Math.max(0, results.ficaSavings),
          ],
          backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(245, 158, 11, 0.8)", "rgba(34, 197, 94, 0.8)"],
          borderColor: ["rgba(99, 102, 241, 1)", "rgba(245, 158, 11, 1)", "rgba(34, 197, 94, 1)"],
          borderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" as const, labels: { padding: 16, usePointStyle: true, font: { family: "Inter, sans-serif", size: 11 } } },
          tooltip: { callbacks: { label: (ctx: { parsed: { raw: number } }) => "$" + ctx.parsed.raw.toLocaleString("en-US", { minimumFractionDigits: 2 }) } },
        },
      },
    };
  }, [results]);

  const retirementComparisonChart = useMemo(() => {
    if (!results) return null;
    return {
      type: "bar" as const,
      data: {
        labels: ["HSA (Tax-Free)", "Taxable Account"],
        datasets: [{
          label: "Retirement Value ($)",
          data: [results.retirementValue, results.taxableEquivalent],
          backgroundColor: ["rgba(34, 197, 94, 0.8)", "rgba(148, 163, 184, 0.8)"],
          borderColor: ["rgba(34, 197, 94, 1)", "rgba(148, 163, 184, 1)"],
          borderWidth: 2,
          borderRadius: 6,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx: { dataset: { label: string }; parsed: { y: number } }) => "$" + ctx.parsed.y.toLocaleString("en-US") } },
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: (v: string | number) => "$" + Number(v).toLocaleString() } },
        },
      },
    };
  }, [results]);

  const isValid = inputs.annualContribution >= 0 && inputs.employerContribution >= 0 && inputs.retirementAge > inputs.age && Object.values(inputs).every(value => typeof value !== "number" || Number.isFinite(value));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <nav className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link href="/calculators" className="hover:text-text transition-colors">Calculators</Link>
          <span>/</span>
          <span className="text-text">HSA Tax Savings Calculator</span>
        </nav>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text">HSA Triple Tax Savings Calculator</h1>
            <p className="text-sm text-muted mt-1">Estimate your HSA tax savings, investment growth, and retirement value</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="text-xs capitalize">Finance</Badge>
          <Badge variant="info" className="text-xs">Health Savings</Badge>
        </div>

        <div className="mb-8 rounded-2xl overflow-hidden border border-border/60 bg-surface-secondary/50">
          <div className="relative w-full h-48 sm:h-64 lg:h-72">
            <Image
              src="/images/blog/placeholders/how-to-maximize-your-hsa-tax-benefits.png"
              alt="HSA Tax Savings Calculator (2026) - Estimate your triple tax advantage"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 66vw"
              priority
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-surface rounded-2xl border border-border p-5 space-y-4">
              <h2 className="text-sm font-semibold text-text">Personal Information</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="age" className="text-sm font-medium text-text">Age</Label>
                  <Input onKeyDown={handleKeyDown} id="age" type="number" placeholder="e.g., 30" min={18} max={80} step={1} value={inputs.age} onChange={(e) => handleChange("age", e.target.value === "" ? 18 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="retirementAge" className="text-sm font-medium text-text">Retirement Age</Label>
                  <Input onKeyDown={handleKeyDown} id="retirementAge" type="number" placeholder="e.g., 65" min={inputs.age + 1} max={85} step={1} value={inputs.retirementAge} onChange={(e) => handleChange("retirementAge", e.target.value === "" ? 65 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="filingStatus" className="text-sm font-medium text-text">HSA Coverage</Label>
                  <Select value={inputs.filingStatus} onValueChange={(v) => handleChange("filingStatus", v)}>
                    <SelectTrigger id="filingStatus" className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Self-only coverage</SelectItem>
                      <SelectItem value="family">Family coverage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="state" className="text-sm font-medium text-text">State</Label>
                  <Select value={inputs.state} onValueChange={(v) => handleChange("state", v)}>
                    <SelectTrigger id="state" className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No selection</SelectItem>
                      {Object.entries(stateNames).map(([code, name]) => (
                        <SelectItem key={code} value={code}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="my-2" />
              <h2 className="text-sm font-semibold text-text">Income & Tax Settings</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="salary" className="text-sm font-medium text-text">Annual Salary ($)</Label>
                  <Input onKeyDown={handleKeyDown} id="salary" type="number" placeholder="e.g., 75000" min={0} step={5000} value={inputs.salary} onChange={(e) => handleChange("salary", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="federalRate" className="text-sm font-medium text-text">Marginal Federal Tax Rate (%)</Label>
                  <Input onKeyDown={handleKeyDown} id="federalRate" type="number" placeholder="e.g., 22" min={0} max={50} step={1} value={inputs.federalRate} onChange={(e) => handleChange("federalRate", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="stateRate" className="text-sm font-medium text-text">State Tax Rate (%)</Label>
                  <Input onKeyDown={handleKeyDown} id="stateRate" type="number" placeholder="e.g., 5" min={0} max={15} step={0.5} value={inputs.stateRate} onChange={(e) => handleChange("stateRate", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5 flex items-end pb-2">
                  <label className="relative inline-flex items-center cursor-pointer gap-2">
                    <input type="checkbox" checked={inputs.ficaEligible} onChange={(e) => handleChange("ficaEligible", e.target.checked)} className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 dark:bg-dark-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600" />
                    <span className="text-sm font-medium text-text">FICA Eligible (7.65%)</span>
                  </label>
                </div>
              </div>

              <Separator className="my-2" />
              <h2 className="text-sm font-semibold text-text">HSA Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="currentBalance" className="text-sm font-medium text-text">Current HSA Balance ($)</Label>
                  <Input onKeyDown={handleKeyDown} id="currentBalance" type="number" placeholder="e.g., 0" min={0} step={500} value={inputs.currentBalance} onChange={(e) => handleChange("currentBalance", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="annualContribution" className="text-sm font-medium text-text">Annual Contribution ($)</Label>
                  <Input onKeyDown={handleKeyDown} id="annualContribution" type="number" placeholder="e.g., 4150" min={0} step={100} value={inputs.annualContribution} onChange={(e) => handleChange("annualContribution", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="employerContribution" className="text-sm font-medium text-text">Employer Contribution ($)</Label>
                  <Input onKeyDown={handleKeyDown} id="employerContribution" type="number" placeholder="e.g., 1000" min={0} step={100} value={inputs.employerContribution} onChange={(e) => handleChange("employerContribution", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="annualWithdrawal" className="text-sm font-medium text-text">Annual Medical Withdrawal ($)</Label>
                  <Input onKeyDown={handleKeyDown} id="annualWithdrawal" type="number" placeholder="e.g., 500" min={0} step={100} value={inputs.annualWithdrawal} onChange={(e) => handleChange("annualWithdrawal", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>
              </div>

              <Separator className="my-2" />
              <h2 className="text-sm font-semibold text-text">Assumptions</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="investmentReturn" className="text-sm font-medium text-text">Expected Investment Return (%)</Label>
                  <Input onKeyDown={handleKeyDown} id="investmentReturn" type="number" placeholder="e.g., 7" min={0} max={25} step={0.5} value={inputs.investmentReturn} onChange={(e) => handleChange("investmentReturn", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="increaseContribution" className="text-sm font-medium text-text">Increase Contribution (%/yr)</Label>
                  <Input onKeyDown={handleKeyDown} id="increaseContribution" type="number" placeholder="e.g., 2" min={0} max={20} step={0.5} value={inputs.increaseContribution} onChange={(e) => handleChange("increaseContribution", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="inflationRate" className="text-sm font-medium text-text">Inflation Rate (%)</Label>
                  <Input onKeyDown={handleKeyDown} id="inflationRate" type="number" placeholder="e.g., 3" min={0} max={15} step={0.5} value={inputs.inflationRate} onChange={(e) => handleChange("inflationRate", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="healthcareInflation" className="text-sm font-medium text-text">Healthcare Inflation (%)</Label>
                  <Input onKeyDown={handleKeyDown} id="healthcareInflation" type="number" placeholder="e.g., 5" min={0} max={20} step={0.5} value={inputs.healthcareInflation} onChange={(e) => handleChange("healthcareInflation", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
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

                    <div className="relative p-6 sm:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-text">Your HSA Tax Savings</h3>
                            <p className="text-xs text-text-secondary">Triple tax advantage breakdown</p>
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
                            <DollarSign className="h-3.5 w-3.5" />
                          </div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary">Annual Tax Savings</p>
                        </div>
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary-600 dark:text-primary-400 break-words">
                            {fmtCurrency(results.annualTaxSavings)}
                          </span>
                          <span className="text-sm text-accent-green font-medium">
                            (\u2191 saves {fmtCurrency(results.federalTaxSavings)} federal)
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary mt-2">
                          Through the HSA triple tax advantage: tax-deductible contributions, tax-free growth, and tax-free withdrawals
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          { label: "Federal Tax Saved", key: "federalTaxSavings", value: results.federalTaxSavings, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200/50", iconBg: "bg-indigo-500", icon: Percent },
                          { label: "State Tax Saved", key: "stateTaxSavings", value: results.stateTaxSavings, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-200/50", iconBg: "bg-amber-500", icon: Shield },
                          { label: "FICA Savings", key: "ficaSavings", value: results.ficaSavings, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10 border-blue-200/50", iconBg: "bg-blue-500", icon: Activity },
                          { label: "Retirement HSA Value", key: "retirementValue", value: results.retirementValue, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200/50", iconBg: "bg-emerald-500", icon: PiggyBank },
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

                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                          <p className="text-xs text-text-secondary mb-1">Lifetime Tax Benefit</p>
                          <p className="text-base font-bold text-primary-600 dark:text-primary-400">{fmtCurrency(results.lifetimeTaxBenefit)}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                          <p className="text-xs text-text-secondary mb-1">Effective Return Advantage</p>
                          <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">{results.effectiveReturnAdvantage}%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className="p-5">
                      <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-primary-500" />
                        HSA Balance Growth
                      </h4>
                      <div className="h-56">{growthChart && <ChartComponent chart={growthChart} />}</div>
                    </Card>

                    <Card className="p-5">
                      <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                        <Percent className="w-4 h-4 text-primary-500" />
                        Tax Savings Breakdown
                      </h4>
                      <div className="h-56">{taxBreakdownChart && <ChartComponent chart={taxBreakdownChart} />}</div>
                    </Card>
                  </div>

                  <Card className="p-5">
                    <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                      <PiggyBank className="w-4 h-4 text-primary-500" />
                      HSA vs Taxable Account Comparison
                    </h4>
                    <div className="h-56 mb-4">{retirementComparisonChart && <ChartComponent chart={retirementComparisonChart} />}</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/50">
                        <span className="text-sm text-text-secondary">HSA Retirement Value (Tax-Free)</span>
                        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{fmtCurrency(results.retirementValue)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                        <span className="text-sm text-text-secondary">Taxable Account Equivalent</span>
                        <span className="text-sm font-semibold text-text">{fmtCurrency(results.taxableEquivalent)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200/50">
                        <span className="text-sm text-text-secondary">Total Contributions</span>
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{fmtCurrency(results.totalContributions)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200/50">
                        <span className="text-sm text-text-secondary">Total Medical Withdrawals</span>
                        <span className="text-sm font-semibold text-amber-500">{fmtCurrency(results.totalMedicalWithdrawals)}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            )}

            {!results && (
              <div className="bg-surface-secondary rounded-2xl border border-border p-8 text-center">
                <Heart className="h-10 w-10 text-muted mx-auto mb-3" />
                <h3 className="text-base font-semibold text-text mb-1">Ready to Calculate</h3>
                <p className="text-sm text-muted">Enter your personal details, income, and HSA information to estimate your triple tax savings.</p>
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
                  Estimate your full HSA triple tax advantage including federal, state, and FICA savings, plus long-term investment growth projections.
                </p>
                <Separator className="my-3" />
                <p className="text-xs text-muted">
                  <strong className="text-text">2026 IRS limits:</strong> <a href={HSA_2026.source} target="_blank" rel="noopener noreferrer" className="underline">IRS source</a>
                </p>
                <ul className="text-xs text-muted mt-1 space-y-1 list-disc list-inside">
                  <li><strong className="text-text">Individual:</strong> $4,400</li>
                  <li><strong className="text-text">Family:</strong> $8,750</li>
                  <li><strong className="text-text">Catch-up (55+):</strong> +$1,000</li>
                </ul>
                <Separator className="my-3" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">Category</span>
                  <Badge variant="secondary" className="text-[10px] capitalize">Finance</Badge>
                </div>
                <div className="flex items-center justify-between text-xs mt-2">
                  <span className="text-muted">Inputs</span>
                  <span className="text-text font-medium">13</span>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-accent-amber" />
                  Quick Example
                </h3>
                <p className="text-xs text-muted mb-2">$4,150/yr HSA contribution, 22% federal rate:</p>
                <div className="space-y-1">
                  {[
                    { label: "Federal Tax Saved", value: "$913/yr" },
                    { label: "State Tax Saved", value: "$208/yr" },
                    { label: "FICA Saved", value: "$317/yr" },
                    { label: "Total Annual Savings", value: "$1,438/yr" },
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
