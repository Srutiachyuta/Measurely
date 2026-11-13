"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calculator, RotateCcw, Copy, Check, Share2, Download, Printer,
  PiggyBank, PoundSterling, Percent, TrendingUp,
  Sparkles, Info, ArrowLeft, FileSpreadsheet,
  Car, Bike, Baby, Monitor, Briefcase,
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

const ChartComponent = dynamic(() => import("./calculator-chart"), {
  ssr: false,
  loading: () => <div className="h-48 rounded-xl bg-surface-secondary animate-pulse" />,
});

interface Inputs {
  salary: number;
  age: number;
  taxYear: string;
  sacrificeAmount: number;
  sacrificeMode: "percentage" | "fixed";
  purpose: string;
  employerMatch: number;
  employerNiShare: number;
  bonusIncluded: boolean;
  salaryGrowth: number;
  investmentReturn: number;
  retirementAge: number;
}

interface Results {
  grossSalary: number;
  taxableSalary: number;
  monthlyTakeHome: number;
  annualTakeHome: number;
  incomeTaxSaved: number;
  niSaved: number;
  employerNiSaved: number;
  pensionContribution: number;
  estimatedPensionAtRetirement: number;
  lifetimeTaxBenefit: number;
  newGrossSalary: number;
  newTaxableSalary: number;
  totalEmployeeNi: number;
  totalIncomeTax: number;
  employeeNiAfter: number;
  incomeTaxAfter: number;
  sacrificeAmountActual: number;
  yearsToRetirement: number;
}

const defaultInputs: Inputs = {
  salary: 50000,
  age: 30,
  taxYear: "2026-27",
  sacrificeAmount: 5,
  sacrificeMode: "percentage",
  purpose: "pension",
  employerMatch: 3,
  employerNiShare: 0,
  bonusIncluded: false,
  salaryGrowth: 2,
  investmentReturn: 5,
  retirementAge: 68,
};


const NI_BANDS_2026 = [
  { from: 0, to: 12570, employeeRate: 0, employerRate: 0 },
  { from: 12570, to: 50270, employeeRate: 0.08, employerRate: 0.138 },
  { from: 50270, to: Infinity, employeeRate: 0.02, employerRate: 0.138 },
];

function calculateTax(taxableIncome: number): number {
  // Standard allowance tapers by £1 for every £2 of income above £100,000.
  const allowance = Math.max(0, 12570 - Math.max(0, taxableIncome - 100000) / 2);
  const taxable = Math.max(0, taxableIncome - allowance);
  return Math.min(taxable, 37700) * .2
    + Math.max(0, Math.min(taxable - 37700, 87440)) * .4
    + Math.max(0, taxable - 125140) * .45;
}

function calculateNi(income: number, isEmployer: boolean): number {
  if (isEmployer) return Math.max(0, income - 5000) * 0.15;
  let totalNi = 0;
  for (const band of NI_BANDS_2026) {
    if (income > band.from) {
      const niInBand = Math.min(income, band.to) - band.from;
      if (niInBand > 0) {
        totalNi += niInBand * (isEmployer ? band.employerRate : band.employeeRate);
      }
    }
  }
  return totalNi;
}

function calculate(inputs: Inputs): Results {
  const salary = Math.max(0, inputs.salary || 0);
  const age = Math.max(18, inputs.age || 30);
  const retirementAge = Math.max(age + 1, inputs.retirementAge || 68);
  const yearsToRetirement = retirementAge - age;
  const salaryGrowth = Math.max(0, Math.min(20, inputs.salaryGrowth || 0)) / 100;
  const investmentReturn = Math.max(0, Math.min(20, inputs.investmentReturn || 0)) / 100;
  const employerMatch = Math.max(0, Math.min(100, inputs.employerMatch || 0)) / 100;
  const employerNiShare = Math.max(0, Math.min(100, inputs.employerNiShare || 0)) / 100;

  let sacrificeAmount: number;
  if (inputs.sacrificeMode === "percentage") {
    sacrificeAmount = salary * (Math.max(0, Math.min(100, inputs.sacrificeAmount || 0)) / 100);
  } else {
    sacrificeAmount = Math.max(0, (inputs.sacrificeAmount || 0)) * 12;
  }

  const sacrificeMonthly = sacrificeAmount / 12;
  const adjustedSalary = Math.max(0, salary - sacrificeAmount);

  const incomeTaxBefore = calculateTax(salary);
  const incomeTaxAfter = calculateTax(adjustedSalary);
  const incomeTaxSaved = incomeTaxBefore - incomeTaxAfter;

  const employeeNiBefore = calculateNi(salary, false);
  const employeeNiAfter = calculateNi(adjustedSalary, false);
  const niSaved = employeeNiBefore - employeeNiAfter;

  const employerNiBefore = calculateNi(salary, true);
  const employerNiAfter = calculateNi(adjustedSalary, true);
  const employerNiSaved = employerNiBefore - employerNiAfter;
  const employerNiShared = employerNiSaved * employerNiShare;

  const employerPensionContribution = salary * employerMatch;
  const totalPensionContribution = sacrificeAmount + employerPensionContribution;

  const monthlyTakeHomeBefore = (salary - incomeTaxBefore - employeeNiBefore) / 12;
  const monthlyTakeHomeAfter = (adjustedSalary - incomeTaxAfter - employeeNiAfter) / 12;

  let projectedPension = 0;
  let runningContribution = sacrificeAmount + employerPensionContribution;
  for (let y = 0; y < yearsToRetirement; y++) {
    projectedPension = (projectedPension + runningContribution) * (1 + investmentReturn);
    runningContribution *= (1 + salaryGrowth);
  }

  const lifetimeTaxBenefit = (incomeTaxSaved + niSaved + employerNiShared) * yearsToRetirement;

  return {
    grossSalary: Math.round(salary * 100) / 100,
    taxableSalary: Math.round(adjustedSalary * 100) / 100,
    monthlyTakeHome: Math.round(monthlyTakeHomeAfter * 100) / 100,
    annualTakeHome: Math.round(monthlyTakeHomeAfter * 12 * 100) / 100,
    incomeTaxSaved: Math.round(incomeTaxSaved * 100) / 100,
    niSaved: Math.round(niSaved * 100) / 100,
    employerNiSaved: Math.round(employerNiSaved * 100) / 100,
    pensionContribution: Math.round(totalPensionContribution * 100) / 100,
    estimatedPensionAtRetirement: Math.round(projectedPension * 100) / 100,
    lifetimeTaxBenefit: Math.round(lifetimeTaxBenefit * 100) / 100,
    newGrossSalary: Math.round(adjustedSalary * 100) / 100,
    newTaxableSalary: Math.round(adjustedSalary * 100) / 100,
    totalEmployeeNi: Math.round(employeeNiBefore * 100) / 100,
    totalIncomeTax: Math.round(incomeTaxBefore * 100) / 100,
    employeeNiAfter: Math.round(employeeNiAfter * 100) / 100,
    incomeTaxAfter: Math.round(incomeTaxAfter * 100) / 100,
    sacrificeAmountActual: Math.round(sacrificeAmount * 100) / 100,
    yearsToRetirement,
  };
}

function fmt(value: number): string {
  return value.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtCurrency(value: number): string {
  return "\u00A3" + fmt(value);
}

const purposeIcons: Record<string, typeof PiggyBank> = {
  pension: PiggyBank,
  "electric-vehicle": Car,
  bicycle: Bike,
  childcare: Baby,
  technology: Monitor,
  other: Briefcase,
};

const purposeLabels: Record<string, string> = {
  pension: "Pension",
  "electric-vehicle": "Electric Vehicle",
  bicycle: "Bicycle Scheme",
  childcare: "Childcare",
  technology: "Technology Scheme",
  other: "Other Benefits",
};

export function SalarySacrificeCalculator() {
  const [inputs, setInputs] = useState<Inputs>(defaultInputs);
  const [results, setResults] = useState<Results | null>(null);
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();

  const handleChange = useCallback((key: keyof Inputs, value: string | number | boolean) => {
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
    if (e.key === "Enter") handleCalculate();
  }, [handleCalculate]);

  const formatResultsText = useCallback(() => {
    if (!results) return "";
    return [
      "Salary Sacrifice Calculator Results",
      "=".repeat(40),
      "",
      `Gross Salary: ${fmtCurrency(results.grossSalary)}`,
      `New Gross Salary: ${fmtCurrency(results.newGrossSalary)}`,
      `Monthly Take-home Pay: ${fmtCurrency(results.monthlyTakeHome)}`,
      `Annual Take-home Pay: ${fmtCurrency(results.annualTakeHome)}`,
      `Income Tax Saved: ${fmtCurrency(results.incomeTaxSaved)}`,
      `National Insurance Saved: ${fmtCurrency(results.niSaved)}`,
      `Employer NI Saving: ${fmtCurrency(results.employerNiSaved)}`,
      `Pension Contribution: ${fmtCurrency(results.pensionContribution)}`,
      `Estimated Pension at Retirement: ${fmtCurrency(results.estimatedPensionAtRetirement)}`,
      `Lifetime Tax Benefit: ${fmtCurrency(results.lifetimeTaxBenefit)}`,
      "",
      "Generated by Measurely Salary Sacrifice Calculator",
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
      try { await navigator.share({ title: "Salary Sacrifice Calculator", text: formatResultsText() }); } catch { /* ignore */ }
    } else {
      await copyToClipboard(window.location.href);
      addToast({ title: "Link copied", variant: "info" });
    }
  }, [formatResultsText, addToast]);

  const handleDownload = useCallback(() => {
    downloadAsFile(formatResultsText(), "salary-sacrifice-estimate.txt");
    addToast({ title: "Downloaded", variant: "success" });
  }, [formatResultsText, addToast]);

  const handlePrint = useCallback(() => window.print(), []);

  const handleExportCSV = useCallback(() => {
    if (!results) return;
    const header = "Metric,Value\n";
    const rows = [
      `Gross Salary,${results.grossSalary}`,
      `New Gross Salary,${results.newGrossSalary}`,
      `Monthly Take-home Pay,${results.monthlyTakeHome}`,
      `Annual Take-home Pay,${results.annualTakeHome}`,
      `Income Tax Saved,${results.incomeTaxSaved}`,
      `National Insurance Saved,${results.niSaved}`,
      `Employer NI Saved,${results.employerNiSaved}`,
      `Pension Contribution,${results.pensionContribution}`,
      `Estimated Pension at Retirement,${results.estimatedPensionAtRetirement}`,
      `Lifetime Tax Benefit,${results.lifetimeTaxBenefit}`,
    ];
    downloadAsFile(header + rows.join("\n"), "salary-sacrifice-estimate.csv", "text/csv");
    addToast({ title: "Exported CSV", variant: "success" });
  }, [results, addToast]);

  const salaryBreakdownChart = useMemo(() => {
    if (!results) return null;
    return {
      type: "doughnut" as const,
      data: {
        labels: ["Take-home Pay", "Income Tax", "National Insurance", "Salary Sacrifice"],
        datasets: [{
          data: [
            results.annualTakeHome,
            results.incomeTaxAfter,
            results.employeeNiAfter,
            results.sacrificeAmountActual,
          ],
          backgroundColor: [
            "rgba(34, 197, 94, 0.8)",
            "rgba(239, 68, 68, 0.8)",
            "rgba(59, 130, 246, 0.8)",
            "rgba(245, 158, 11, 0.8)",
          ],
          borderColor: [
            "rgba(34, 197, 94, 1)",
            "rgba(239, 68, 68, 1)",
            "rgba(59, 130, 246, 1)",
            "rgba(245, 158, 11, 1)",
          ],
          borderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" as const, labels: { padding: 16, usePointStyle: true, font: { family: "Inter, sans-serif", size: 11 } } },
          tooltip: {
            callbacks: { label: (ctx: { parsed: { raw: number } }) => "\u00A3" + ctx.parsed.raw.toLocaleString("en-GB", { minimumFractionDigits: 2 }) },
          },
        },
      },
    };
  }, [results]);

  const taxComparisonChart = useMemo(() => {
    if (!results) return null;
    return {
      type: "bar" as const,
      data: {
        labels: ["Income Tax", "Employee NI", "Employer NI"],
        datasets: [
          {
            label: "Before Sacrifice",
            data: [results.totalIncomeTax, results.totalEmployeeNi, 0],
            backgroundColor: "rgba(239, 68, 68, 0.7)",
            borderColor: "rgba(239, 68, 68, 1)",
            borderWidth: 2,
            borderRadius: 4,
          },
          {
            label: "After Sacrifice",
            data: [results.incomeTaxAfter, results.employeeNiAfter, 0],
            backgroundColor: "rgba(34, 197, 94, 0.7)",
            borderColor: "rgba(34, 197, 94, 1)",
            borderWidth: 2,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" as const, labels: { padding: 16, usePointStyle: true, font: { family: "Inter, sans-serif", size: 11 } } },
          tooltip: { callbacks: { label: (ctx: { dataset: { label: string }; parsed: { y: number } }) => ctx.dataset.label + ": \u00A3" + ctx.parsed.y.toLocaleString("en-GB") } },
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: (v: string | number) => "\u00A3" + Number(v).toLocaleString() } },
        },
      },
    };
  }, [results]);

  const pensionGrowthChart = useMemo(() => {
    if (!results || !results.yearsToRetirement) return null;
    const years = Math.min(results.yearsToRetirement, 40);
    const data: number[] = [];
    let balance = 0;
    const annualContribution = results.pensionContribution;
    for (let y = 0; y < years; y++) {
      balance = (balance + annualContribution) * (1 + (inputs.investmentReturn / 100));
      data.push(Math.round(balance));
    }
    const labels = Array.from({ length: years }, (_, i) => `Year ${i + 1}`);
    return {
      type: "line" as const,
      data: {
        labels,
        datasets: [{
          label: "Pension Value (\u00A3)",
          data,
          borderColor: "rgba(34, 197, 94, 1)",
          backgroundColor: "rgba(34, 197, 94, 0.1)",
          fill: true,
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 0,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx: { parsed: { y: number } }) => "\u00A3" + ctx.parsed.y.toLocaleString("en-GB") } },
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: (v: string | number) => "\u00A3" + Number(v).toLocaleString(), maxTicksLimit: 8 } },
          x: { ticks: { maxTicksLimit: 10 } },
        },
      },
    };
  }, [results, inputs.investmentReturn]);

  const PurposeIcon = purposeIcons[inputs.purpose] || PiggyBank;

  const isValid = inputs.salary > 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <nav className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link href="/calculators" className="hover:text-text transition-colors">Calculators</Link>
          <span>/</span>
          <span className="text-text">Salary Sacrifice Calculator</span>
        </nav>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center shrink-0">
            <PoundSterling className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text">Salary Sacrifice Calculator (UK)</h1>
            <p className="text-sm text-muted mt-1">Estimate your tax and NI savings from salary sacrifice arrangements</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="text-xs capitalize">Finance</Badge>
          <Badge variant="info" className="text-xs">UK Tax</Badge>
        </div>

        <div className="mb-8 rounded-2xl overflow-hidden border border-border/60 bg-surface-secondary/50">
          <div className="relative w-full h-48 sm:h-64 lg:h-72">
            <Image
              src="/images/blog/placeholders/how-salary-sacrifice-reduces-your-tax-bill.png"
              alt="Salary Sacrifice Calculator UK (2026) - Estimate your tax and NI savings"
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
              <h2 className="text-sm font-semibold text-text">Your Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="salary" className="text-sm font-medium text-text">Annual Gross Salary (\u00A3)<span className="text-red-400 ml-0.5">*</span></Label>
                  <Input onKeyDown={handleKeyDown} id="salary" type="number" placeholder="e.g., 50000" min={0} step={1000} value={inputs.salary} onChange={(e) => handleChange("salary", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="age" className="text-sm font-medium text-text">Age</Label>
                  <Input onKeyDown={handleKeyDown} id="age" type="number" placeholder="e.g., 30" min={18} max={80} step={1} value={inputs.age} onChange={(e) => handleChange("age", e.target.value === "" ? 18 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="taxYear" className="text-sm font-medium text-text">Tax Year</Label>
                  <Select value={inputs.taxYear} onValueChange={(v) => handleChange("taxYear", v)}>
                    <SelectTrigger id="taxYear" className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2026-27">2026-27</SelectItem>
                      <SelectItem value="2027-28">2027-28</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label className="text-sm font-medium text-text">Salary Sacrifice Amount</Label>
                  <div className="flex gap-2">
                    {["percentage", "fixed"].map((opt) => (
                      <label key={opt} className={cn(
                        "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all text-sm font-medium select-none",
                        "border-border/60 hover:border-primary-500/30 hover:bg-primary-500/5",
                        inputs.sacrificeMode === opt
                          ? "bg-primary-600 text-white border-primary-600 shadow-sm"
                          : "bg-white dark:bg-dark-800/50"
                      )}>
                        <input type="radio" name="sacrificeMode" value={opt} checked={inputs.sacrificeMode === opt} onChange={() => handleChange("sacrificeMode", opt)} className="sr-only" />
                        {opt === "percentage" ? "% of Salary" : "Fixed Monthly Amount"}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="sacrificeAmount" className="text-sm font-medium text-text">
                    {inputs.sacrificeMode === "percentage" ? "Sacrifice Percentage (%)" : "Monthly Amount (\u00A3)"}
                  </Label>
                  <Input
                    id="sacrificeAmount"
                    type="number"
                    placeholder={inputs.sacrificeMode === "percentage" ? "e.g., 5" : "e.g., 200"}
                    min={0}
                    step={inputs.sacrificeMode === "percentage" ? 0.5 : 10}
                    value={inputs.sacrificeAmount}
                    onChange={(e) => handleChange("sacrificeAmount", e.target.value === "" ? 0 : Number(e.target.value))}
                    className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="purpose" className="text-sm font-medium text-text">Purpose</Label>
                  <Select value={inputs.purpose} onValueChange={(v) => handleChange("purpose", v)}>
                    <SelectTrigger id="purpose" className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pension">Pension</SelectItem>
                      <SelectItem value="electric-vehicle">Electric Vehicle</SelectItem>
                      <SelectItem value="bicycle">Bicycle Scheme</SelectItem>
                      <SelectItem value="childcare">Childcare</SelectItem>
                      <SelectItem value="technology">Technology Scheme</SelectItem>
                      <SelectItem value="other">Other Benefits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="my-2" />
              <h2 className="text-sm font-semibold text-text">Employer Settings</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="employerMatch" className="text-sm font-medium text-text">Employer Pension Match (%)</Label>
                  <Input onKeyDown={handleKeyDown} id="employerMatch" type="number" placeholder="e.g., 3" min={0} max={100} step={0.5} value={inputs.employerMatch} onChange={(e) => handleChange("employerMatch", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="employerNiShare" className="text-sm font-medium text-text">Employer NI Share to You (%)</Label>
                  <Input onKeyDown={handleKeyDown} id="employerNiShare" type="number" placeholder="e.g., 50" min={0} max={100} step={10} value={inputs.employerNiShare} onChange={(e) => handleChange("employerNiShare", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>
              </div>

              <Separator className="my-2" />
              <h2 className="text-sm font-semibold text-text">Optional Projections</h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="salaryGrowth" className="text-sm font-medium text-text">Salary Growth (%/yr)</Label>
                  <Input onKeyDown={handleKeyDown} id="salaryGrowth" type="number" placeholder="e.g., 2" min={0} max={20} step={0.5} value={inputs.salaryGrowth} onChange={(e) => handleChange("salaryGrowth", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="investmentReturn" className="text-sm font-medium text-text">Investment Return (%/yr)</Label>
                  <Input onKeyDown={handleKeyDown} id="investmentReturn" type="number" placeholder="e.g., 5" min={0} max={20} step={0.5} value={inputs.investmentReturn} onChange={(e) => handleChange("investmentReturn", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="retirementAge" className="text-sm font-medium text-text">Retirement Age</Label>
                  <Input onKeyDown={handleKeyDown} id="retirementAge" type="number" placeholder="e.g., 68" min={inputs.age + 1} max={85} step={1} value={inputs.retirementAge} onChange={(e) => handleChange("retirementAge", e.target.value === "" ? 68 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={inputs.bonusIncluded} onChange={(e) => handleChange("bonusIncluded", e.target.checked)} className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 dark:bg-dark-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600" />
                </label>
                <span className="text-sm text-text">Include bonus in sacrifice calculation</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button size="lg" fullWidth onClick={handleCalculate} disabled={!isValid} className="h-12 text-base font-semibold rounded-xl shadow-sm shadow-primary-500/20">
                  <Calculator className="h-5 w-5" />
                  Calculate Savings
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
                            <h3 className="text-base font-semibold text-text">Your Savings Summary</h3>
                            <p className="text-xs text-text-secondary">UK Salary Sacrifice — {purposeLabels[inputs.purpose]}</p>
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
                            <PoundSterling className="h-3.5 w-3.5" />
                          </div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary">Annual Take-home Pay</p>
                        </div>
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary-600 dark:text-primary-400 break-words">
                            {fmtCurrency(results.annualTakeHome)}
                          </span>
                          <span className="text-sm text-accent-green font-medium">
                            (\u2191 saves {fmtCurrency(results.incomeTaxSaved + results.niSaved)} in tax & NI)
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary mt-2">
                          New gross salary: {fmtCurrency(results.newGrossSalary)}
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          { label: "Income Tax Saved", key: "incomeTaxSaved", value: results.incomeTaxSaved, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200/50", iconBg: "bg-emerald-500", icon: Percent },
                          { label: "NI Saved (You)", key: "niSaved", value: results.niSaved, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10 border-blue-200/50", iconBg: "bg-blue-500", icon: TrendingUp },
                          { label: "Employer NI Saved", key: "employerNiSaved", value: results.employerNiSaved, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10 border-purple-200/50", iconBg: "bg-purple-500", icon: Briefcase },
                          { label: "Pension Contribution", key: "pensionContribution", value: results.pensionContribution, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-200/50", iconBg: "bg-amber-500", icon: PiggyBank },
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
                          <p className="text-xs text-text-secondary mb-1">Monthly Take-home</p>
                          <p className="text-base font-bold text-text">{fmtCurrency(results.monthlyTakeHome)}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                          <p className="text-xs text-text-secondary mb-1">Lifetime Tax Benefit</p>
                          <p className="text-base font-bold text-primary-600 dark:text-primary-400">{fmtCurrency(results.lifetimeTaxBenefit)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className="p-5">
                      <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                        <PiggyBank className="w-4 h-4 text-primary-500" />
                        Salary Breakdown
                      </h4>
                      <div className="h-56">{salaryBreakdownChart && <ChartComponent chart={salaryBreakdownChart} />}</div>
                    </Card>

                    <Card className="p-5">
                      <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-primary-500" />
                        Tax & NI Comparison
                      </h4>
                      <div className="h-56">{taxComparisonChart && <ChartComponent chart={taxComparisonChart} />}</div>
                    </Card>
                  </div>

                  <Card className="p-5">
                    <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                      <TrendingUp className="w-4 h-4 text-primary-500" />
                      Pension Growth Projection
                    </h4>
                    <div className="h-56 mb-4">{pensionGrowthChart && <ChartComponent chart={pensionGrowthChart} />}</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                        <span className="text-sm text-text-secondary">Estimated Pension at Retirement</span>
                        <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">{fmtCurrency(results.estimatedPensionAtRetirement)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/50">
                        <span className="text-sm text-text-secondary">Annual Pension Contribution</span>
                        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{fmtCurrency(results.pensionContribution)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200/50">
                        <span className="text-sm text-text-secondary">Years Until Retirement</span>
                        <span className="text-sm font-semibold text-amber-500">{results.yearsToRetirement} years</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-5">
                    <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                      <PoundSterling className="w-4 h-4 text-primary-500" />
                      Full Breakdown
                    </h4>
                    <div className="space-y-2">
                      {[
                        { label: "Gross Salary", value: results.grossSalary, isBefore: true },
                        { label: "Salary Sacrifice", value: results.sacrificeAmountActual, isSacrifice: true },
                        { label: "New Gross Salary", value: results.newGrossSalary, isNew: true },
                        { label: "Income Tax (after)", value: results.incomeTaxAfter, isTax: true },
                        { label: "Employee NI (after)", value: results.employeeNiAfter, isNi: true },
                        { label: "Annual Take-home Pay", value: results.annualTakeHome, isTakeHome: true },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-xl border transition-colors",
                            item.isTakeHome ? "bg-primary-50 dark:bg-primary-500/10 border-primary-200/50 dark:border-primary-500/20" :
                            item.isNew ? "bg-surface-secondary dark:bg-dark-800/30 border-border/60" :
                            item.isSacrifice ? "bg-amber-50 dark:bg-amber-500/10 border-amber-200/50 dark:border-amber-500/20" :
                            item.isBefore ? "bg-surface-secondary dark:bg-dark-800/30 border-border/60" :
                            item.isTax ? "bg-red-50 dark:bg-red-500/10 border-red-200/50 dark:border-red-500/20" :
                            item.isNi ? "bg-blue-50 dark:bg-blue-500/10 border-blue-200/50 dark:border-blue-500/20" :
                            "bg-surface-secondary dark:bg-dark-800/30 border-border/60"
                          )}
                        >
                          <span className={cn("text-sm", item.isTakeHome ? "font-semibold text-primary-600 dark:text-primary-400" : "text-text-secondary")}>
                            {item.label}
                          </span>
                          <span className={cn("text-sm font-semibold tabular-nums", item.isTakeHome ? "text-primary-600 dark:text-primary-400" : item.isSacrifice ? "text-amber-500" : item.isTax ? "text-red-500" : item.isNi ? "text-blue-600 dark:text-blue-400" : "text-text")}>
                            {fmtCurrency(item.value)}
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
                <PoundSterling className="h-10 w-10 text-muted mx-auto mb-3" />
                <h3 className="text-base font-semibold text-text mb-1">Ready to Calculate</h3>
                <p className="text-sm text-muted">Enter your salary and sacrifice details, then click Calculate Savings to see your tax and NI savings.</p>
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
                  Pension-style estimate using standard England, Wales and Northern Ireland rates. Scotland, student loans, minimum-wage checks and benefit-in-kind charges are excluded. Selecting another benefit does not calculate its special tax rules; confirm those separately before relying on the result.
                </p>
                <Separator className="my-3" />
                <p className="text-xs text-muted">
                  <strong className="text-text">2026-27 UK rates applied:</strong>
                </p>
                <ul className="text-xs text-muted mt-1 space-y-1 list-disc list-inside">
                  <li><strong className="text-text">Income Tax:</strong> 0%, 20%, 40%, 45% bands</li>
                  <li><strong className="text-text">Employee NI:</strong> 8% / 2% above \u00A312,570</li>
                  <li><strong className="text-text">Employer NI:</strong> 15% above \u00A35,000</li>
                  <li><strong className="text-text">Personal Allowance:</strong> \u00A312,570</li>
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
                <p className="text-xs text-muted mb-2">\u00A350,000 salary, 5% pension sacrifice:</p>
                <div className="space-y-1">
                  {[
                    { label: "Sacrifice Amount", value: "\u00A32,500/yr" },
                    { label: "Income Tax Saved", value: "\u00A3500" },
                    { label: "NI Saved", value: "\u00A3200" },
                    { label: "Employer NI Saved", value: "\u00A3345" },
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
