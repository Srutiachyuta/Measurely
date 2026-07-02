"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calculator, RotateCcw, Copy, Check, Share2, Download, Printer,
  Landmark, Banknote, Receipt, PiggyBank, Percent,
  TrendingUp, Users, Scale, FileSpreadsheet,
  Sparkles, Info, ArrowLeft, HandCoins,
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
  country: string;
  state: string;
  estateValue: number;
  debts: number;
  funeralExpenses: number;
  charitableDonations: number;
  spouseExemption: string;
  numBeneficiaries: number;
  lifetimeGifts: number;
  otherDeductions: number;
}

interface Results {
  grossEstate: number;
  totalDeductions: number;
  taxableEstate: number;
  estimatedTax: number;
  netInheritance: number;
  perBeneficiary: number;
  effectiveTaxRate: number;
  spouseDeduction: number;
  taxExemption: number;
  taxRatePercent: number;
  countryLabel: string;
}

const defaultInputs: Inputs = {
  country: "US",
  state: "",
  estateValue: 2000000,
  debts: 50000,
  funeralExpenses: 15000,
  charitableDonations: 100000,
  spouseExemption: "yes",
  numBeneficiaries: 2,
  lifetimeGifts: 50000,
  otherDeductions: 10000,
};

const countryNames: Record<string, string> = {
  US: "United States",
  UK: "United Kingdom",
  CA: "Canada",
  AU: "Australia",
  NZ: "New Zealand",
};

function calculate(inputs: Inputs): Results {
  const estateValue = Math.max(0, inputs.estateValue || 0);
  const debts = Math.max(0, inputs.debts || 0);
  const funeralExpenses = Math.max(0, inputs.funeralExpenses || 0);
  const charitableDonations = Math.max(0, inputs.charitableDonations || 0);
  const spouseExemption = inputs.spouseExemption === "yes";
  const numBeneficiaries = Math.max(1, inputs.numBeneficiaries || 1);
  const otherDeductions = Math.max(0, inputs.otherDeductions || 0);

  const totalDeductions = debts + funeralExpenses + charitableDonations + otherDeductions;
  const netEstate = Math.max(0, estateValue - totalDeductions);

  let taxExemption = 0;
  let taxRate = 0;
  let taxableEstate = 0;
  let estimatedTax = 0;

  const country = inputs.country;

  if (country === "US") {
    taxExemption = spouseExemption ? 13610000 : 13610000;
    const taxableBeforeExemption = Math.max(0, netEstate - taxExemption);
    taxableEstate = taxableBeforeExemption;
    taxRate = 0.40;
    estimatedTax = taxableEstate * taxRate;
  } else if (country === "UK") {
    const nilRateBand = 325000;
    const residenceBand = spouseExemption ? 175000 : 0;
    taxExemption = nilRateBand + residenceBand;
    taxableEstate = Math.max(0, netEstate - taxExemption);
    taxRate = 0.40;
    estimatedTax = taxableEstate * taxRate;
  } else if (country === "CA") {
    taxExemption = spouseExemption ? netEstate : 0;
    taxableEstate = spouseExemption ? 0 : netEstate * 0.5;
    taxRate = 0.25;
    estimatedTax = taxableEstate * taxRate;
  } else {
    taxExemption = netEstate;
    taxableEstate = 0;
    taxRate = 0;
    estimatedTax = 0;
  }

  const totalTaxLiability = Math.max(0, estimatedTax);
  const netInheritance = Math.max(0, netEstate - totalTaxLiability);
  const perBeneficiary = numBeneficiaries > 0 ? netInheritance / numBeneficiaries : netInheritance;
  const effectiveTaxRate = netEstate > 0 ? (totalTaxLiability / netEstate) * 100 : 0;

  return {
    grossEstate: Math.round(estateValue * 100) / 100,
    totalDeductions: Math.round(totalDeductions * 100) / 100,
    taxableEstate: Math.round(taxableEstate * 100) / 100,
    estimatedTax: Math.round(totalTaxLiability * 100) / 100,
    netInheritance: Math.round(netInheritance * 100) / 100,
    perBeneficiary: Math.round(perBeneficiary * 100) / 100,
    effectiveTaxRate: Math.round(effectiveTaxRate * 100) / 100,
    spouseDeduction: Math.round((spouseExemption ? netEstate : 0) * 100) / 100,
    taxExemption: Math.round(taxExemption * 100) / 100,
    taxRatePercent: Math.round(taxRate * 10000) / 100,
    countryLabel: countryNames[country] || country,
  };
}

function fmt(value: number): string {
  return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtCurrency(value: number): string {
  return "$" + fmt(value);
}

export function InheritanceTaxCalculator() {
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
    if (e.key === "Enter") handleCalculate();
  }, [handleCalculate]);

  const formatResultsText = useCallback(() => {
    if (!results) return "";
    return [
      "Inheritance Tax Calculator Results",
      "=".repeat(40),
      "",
      `Country: ${results.countryLabel}`,
      `Gross Estate: $${fmt(results.grossEstate)}`,
      `Total Deductions: $${fmt(results.totalDeductions)}`,
      `Taxable Estate: $${fmt(results.taxableEstate)}`,
      `Estimated Tax: $${fmt(results.estimatedTax)}`,
      `Net Inheritance: $${fmt(results.netInheritance)}`,
      `Amount Per Beneficiary: $${fmt(results.perBeneficiary)}`,
      `Effective Tax Rate: ${results.effectiveTaxRate}%`,
      "",
      "Generated by Measurely Inheritance Tax Calculator",
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
    const text = formatResultsText();
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share({ title: "Inheritance Tax Calculator", text }); } catch { /* ignore */ }
    } else {
      await copyToClipboard(window.location.href);
      addToast({ title: "Link copied", variant: "info" });
    }
  }, [formatResultsText, addToast]);

  const handleDownload = useCallback(() => {
    downloadAsFile(formatResultsText(), "inheritance-tax-estimate.txt");
    addToast({ title: "Downloaded", variant: "success" });
  }, [formatResultsText, addToast]);

  const handlePrint = useCallback(() => window.print(), []);

  const handleExportCSV = useCallback(() => {
    if (!results) return;
    const header = "Metric,Value\n";
    const rows = [
      `Gross Estate,${results.grossEstate}`,
      `Total Deductions,${results.totalDeductions}`,
      `Taxable Estate,${results.taxableEstate}`,
      `Estimated Tax,${results.estimatedTax}`,
      `Net Inheritance,${results.netInheritance}`,
      `Per Beneficiary,${results.perBeneficiary}`,
      `Effective Tax Rate,${results.effectiveTaxRate}`,
    ];
    downloadAsFile(header + rows.join("\n"), "inheritance-tax-estimate.csv", "text/csv");
    addToast({ title: "Exported CSV", variant: "success" });
  }, [results, addToast]);

  const allocationChart = useMemo(() => {
    if (!results) return null;
    const data: number[] = [results.netInheritance, results.estimatedTax, results.totalDeductions];
    if (data.every((v) => v === 0)) return null;
    return {
      type: "doughnut" as const,
      data: {
        labels: ["Net Inheritance", "Taxes", "Deductions"],
        datasets: [{
          data,
          backgroundColor: ["rgba(34, 197, 94, 0.8)", "rgba(239, 68, 68, 0.8)", "rgba(148, 163, 184, 0.8)"],
          borderColor: ["rgba(34, 197, 94, 1)", "rgba(239, 68, 68, 1)", "rgba(148, 163, 184, 1)"],
          borderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" as const, labels: { padding: 16, usePointStyle: true, font: { family: "Inter, sans-serif", size: 12 } } },
          tooltip: {
            callbacks: { label: (ctx: { parsed: { raw: number } }) => "$" + ctx.parsed.raw.toLocaleString("en-US", { minimumFractionDigits: 2 }) },
          },
        },
      },
    };
  }, [results]);

  const netVsGrossChart = useMemo(() => {
    if (!results) return null;
    return {
      type: "bar" as const,
      data: {
        labels: ["Gross Estate", "Total Deductions", "Net Inheritance"],
        datasets: [{
          label: "Amount ($)",
          data: [results.grossEstate, results.totalDeductions, results.netInheritance],
          backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(148, 163, 184, 0.8)", "rgba(34, 197, 94, 0.8)"],
          borderColor: ["rgba(99, 102, 241, 1)", "rgba(148, 163, 184, 1)", "rgba(34, 197, 94, 1)"],
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

  const taxBreakdownChart = useMemo(() => {
    if (!results) return null;
    return {
      type: "bar" as const,
      data: {
        labels: ["Taxable Estate", "Estimated Tax", "Tax Exemption"],
        datasets: [{
          label: "Amount ($)",
          data: [results.taxableEstate, results.estimatedTax, results.taxExemption],
          backgroundColor: ["rgba(245, 158, 11, 0.8)", "rgba(239, 68, 68, 0.8)", "rgba(34, 197, 94, 0.8)"],
          borderColor: ["rgba(245, 158, 11, 1)", "rgba(239, 68, 68, 1)", "rgba(34, 197, 94, 1)"],
          borderWidth: 2,
          borderRadius: 6,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx: { parsed: { y: number } }) => "$" + ctx.parsed.y.toLocaleString() } },
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: (v: string | number) => "$" + Number(v).toLocaleString() } },
        },
      },
    };
  }, [results]);

  const isValid = inputs.estateValue > 0;

  const isNoTaxCountry = inputs.country === "AU" || inputs.country === "NZ";

  return (
    <div className="min-h-screen bg-background" onKeyDown={handleKeyDown}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <nav className="flex items-center gap-2 text-sm text-muted mb-6">
          <a href="/calculators" className="hover:text-text transition-colors">Calculators</a>
          <span>/</span>
          <span className="text-text">Inheritance Tax Calculator</span>
        </nav>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center shrink-0">
            <Landmark className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text">Inheritance Tax Calculator</h1>
            <p className="text-sm text-muted mt-1">Estimate inheritance taxes, estate taxes, and net inheritance by jurisdiction</p>
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
                <div className="space-y-1.5">
                  <Label htmlFor="country" className="text-sm font-medium text-text">Country<span className="text-red-400 ml-0.5">*</span></Label>
                  <Select value={inputs.country} onValueChange={(v) => handleChange("country", v)}>
                    <SelectTrigger id="country" className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                      <SelectItem value="NZ">New Zealand</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="state" className="text-sm font-medium text-text">State/Province <span className="text-muted">(optional)</span></Label>
                  <Select value={inputs.state} onValueChange={(v) => handleChange("state", v)}>
                    <SelectTrigger id="state" className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Select...</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                      <SelectItem value="IL">Illinois</SelectItem>
                      <SelectItem value="PA">Pennsylvania</SelectItem>
                      <SelectItem value="MD">Maryland</SelectItem>
                      <SelectItem value="NJ">New Jersey</SelectItem>
                      <SelectItem value="ON">Ontario</SelectItem>
                      <SelectItem value="BC">British Columbia</SelectItem>
                      <SelectItem value="AB">Alberta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="estateValue" className="text-sm font-medium text-text">Total Estate Value ($)<span className="text-red-400 ml-0.5">*</span></Label>
                  <Input id="estateValue" type="number" placeholder="e.g., 2000000" min={0} step={10000} value={inputs.estateValue} onChange={(e) => handleChange("estateValue", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="debts" className="text-sm font-medium text-text">Outstanding Debts ($)</Label>
                  <Input id="debts" type="number" placeholder="e.g., 50000" min={0} step={1000} value={inputs.debts} onChange={(e) => handleChange("debts", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="funeralExpenses" className="text-sm font-medium text-text">Funeral Expenses ($)</Label>
                  <Input id="funeralExpenses" type="number" placeholder="e.g., 15000" min={0} step={1000} value={inputs.funeralExpenses} onChange={(e) => handleChange("funeralExpenses", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="charitableDonations" className="text-sm font-medium text-text">Charitable Donations ($)</Label>
                  <Input id="charitableDonations" type="number" placeholder="e.g., 100000" min={0} step={1000} value={inputs.charitableDonations} onChange={(e) => handleChange("charitableDonations", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium text-text">Spouse Exemption?</Label>
                  <div className="flex gap-2">
                    {["yes", "no"].map((opt) => (
                      <label key={opt} className={cn(
                        "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all text-sm font-medium select-none",
                        "border-border/60 hover:border-primary-500/30 hover:bg-primary-500/5",
                        inputs.spouseExemption === opt
                          ? "bg-primary-600 text-white border-primary-600 shadow-sm"
                          : "bg-white dark:bg-dark-800/50"
                      )}>
                        <input type="radio" name="spouseExemption" value={opt} checked={inputs.spouseExemption === opt} onChange={() => handleChange("spouseExemption", opt)} className="sr-only" />
                        {opt === "yes" ? "Yes" : "No"}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="numBeneficiaries" className="text-sm font-medium text-text">Number of Beneficiaries</Label>
                  <Input id="numBeneficiaries" type="number" placeholder="e.g., 2" min={1} max={100} step={1} value={inputs.numBeneficiaries} onChange={(e) => handleChange("numBeneficiaries", e.target.value === "" ? 1 : Math.max(1, Number(e.target.value)))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="lifetimeGifts" className="text-sm font-medium text-text">Lifetime Gifts Made ($)</Label>
                  <Input id="lifetimeGifts" type="number" placeholder="e.g., 50000" min={0} step={1000} value={inputs.lifetimeGifts} onChange={(e) => handleChange("lifetimeGifts", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="otherDeductions" className="text-sm font-medium text-text">Other Allowable Deductions ($)</Label>
                  <Input id="otherDeductions" type="number" placeholder="e.g., 10000" min={0} step={1000} value={inputs.otherDeductions} onChange={(e) => handleChange("otherDeductions", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
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
                            <h3 className="text-base font-semibold text-text">Estate Tax Estimate</h3>
                            <p className="text-xs text-text-secondary">{results.countryLabel}</p>
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
                            <Banknote className="h-3.5 w-3.5" />
                          </div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary">Gross Estate Value</p>
                        </div>
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary-600 dark:text-primary-400 break-words">
                            {fmtCurrency(results.grossEstate)}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary mt-2">
                          {results.countryLabel} — Tax rate: {results.taxRatePercent}%, Tax exemption: {fmtCurrency(results.taxExemption)}
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          { label: "Taxable Estate", key: "taxableEstate", value: results.taxableEstate, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-200/50", iconBg: "bg-amber-500", icon: Scale },
                          { label: "Estimated Tax", key: "estimatedTax", value: results.estimatedTax, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10 border-red-200/50", iconBg: "bg-red-500", icon: Receipt },
                          { label: "Net Inheritance", key: "netInheritance", value: results.netInheritance, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200/50", iconBg: "bg-emerald-500", icon: PiggyBank },
                          { label: "Per Beneficiary", key: "perBeneficiary", value: results.perBeneficiary, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200/50", iconBg: "bg-emerald-500", icon: Users },
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
                          <p className="text-xs text-text-secondary mb-1">Effective Tax Rate</p>
                          <p className="text-base font-bold text-text">{results.effectiveTaxRate}%</p>
                        </div>
                        <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                          <p className="text-xs text-text-secondary mb-1">Tax Exemption Applied</p>
                          <p className="text-base font-bold text-primary-600 dark:text-primary-400">{fmtCurrency(results.taxExemption)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className="p-5">
                      <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                        <PiggyBank className="w-4 h-4 text-primary-500" />
                        Estate Allocation
                      </h4>
                      <div className="h-56">{allocationChart && <ChartComponent chart={allocationChart} />}</div>
                    </Card>

                    <Card className="p-5">
                      <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                        <TrendingUp className="w-4 h-4 text-primary-500" />
                        Net vs Gross Comparison
                      </h4>
                      <div className="h-56">{netVsGrossChart && <ChartComponent chart={netVsGrossChart} />}</div>
                    </Card>
                  </div>

                  <Card className="p-5">
                    <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                      <Receipt className="w-4 h-4 text-primary-500" />
                      Tax Breakdown
                    </h4>
                    <div className="h-56 mb-4">{taxBreakdownChart && <ChartComponent chart={taxBreakdownChart} />}</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                        <span className="text-sm text-text-secondary">Tax Rate</span>
                        <span className="text-sm font-semibold text-text">{results.taxRatePercent}%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200/50">
                        <span className="text-sm text-text-secondary">Taxable Estate</span>
                        <span className="text-sm font-semibold text-amber-500">{fmtCurrency(results.taxableEstate)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200/50">
                        <span className="text-sm text-text-secondary">Estimated Tax Owed</span>
                        <span className="text-sm font-semibold text-red-500">{fmtCurrency(results.estimatedTax)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/50">
                        <span className="text-sm text-text-secondary">Tax Exemption Applied</span>
                        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{fmtCurrency(results.taxExemption)}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-5">
                    <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                      <HandCoins className="w-4 h-4 text-primary-500" />
                      Deduction Summary
                    </h4>
                    <div className="space-y-2">
                      {[
                        { label: "Gross Estate", value: results.grossEstate },
                        { label: "Outstanding Debts", value: inputs.debts },
                        { label: "Funeral Expenses", value: inputs.funeralExpenses },
                        { label: "Charitable Donations", value: inputs.charitableDonations },
                        { label: "Other Deductions", value: inputs.otherDeductions },
                        { label: "Total Deductions", value: results.totalDeductions, isTotal: true },
                        { label: "Tax Exemption", value: results.taxExemption, isExemption: true },
                        { label: "Taxable Estate", value: results.taxableEstate, isTaxable: true },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-xl border transition-colors",
                            item.isTotal ? "bg-primary-50 dark:bg-primary-500/10 border-primary-200/50 dark:border-primary-500/20" :
                            item.isExemption ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200/50 dark:border-emerald-500/20" :
                            item.isTaxable ? "bg-amber-50 dark:bg-amber-500/10 border-amber-200/50 dark:border-amber-500/20" :
                            "bg-surface-secondary dark:bg-dark-800/30 border-border/60"
                          )}
                        >
                          <span className={cn("text-sm", item.isTotal ? "font-semibold text-primary-600 dark:text-primary-400" : "text-text-secondary")}>
                            {item.label}
                          </span>
                          <span className={cn("text-sm font-semibold tabular-nums", item.isTotal ? "text-primary-600 dark:text-primary-400" : item.isExemption ? "text-emerald-600 dark:text-emerald-400" : item.isTaxable ? "text-amber-500" : "text-text")}>
                            {fmtCurrency(item.value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-5">
                    <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                      <Users className="w-4 h-4 text-primary-500" />
                      Beneficiary Distribution
                    </h4>
                    <div className="space-y-2">
                      {Array.from({ length: Math.min(inputs.numBeneficiaries, 10) }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold">
                              {i + 1}
                            </div>
                            <span className="text-sm text-text-secondary">Beneficiary {i + 1}</span>
                          </div>
                          <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                            {fmtCurrency(results.perBeneficiary)}
                          </span>
                        </div>
                      ))}
                      {inputs.numBeneficiaries > 10 && (
                        <p className="text-xs text-muted text-center">Showing first 10 of {inputs.numBeneficiaries} beneficiaries</p>
                      )}
                    </div>
                  </Card>
                </div>
              </motion.div>
            )}

            {!results && (
              <div className="bg-surface-secondary rounded-2xl border border-border p-8 text-center">
                <Landmark className="h-10 w-10 text-muted mx-auto mb-3" />
                <h3 className="text-base font-semibold text-text mb-1">Ready to Calculate</h3>
                <p className="text-sm text-muted">Enter estate details, select your country, and click Calculate to estimate inheritance taxes and net inheritance.</p>
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
                  Estimate inheritance and estate taxes based on your jurisdiction. The calculator applies country-specific tax rules, exemptions, and rates.
                </p>
                <Separator className="my-3" />
                <p className="text-xs text-muted">
                  <strong className="text-text">Country rules applied:</strong>
                </p>
                <ul className="text-xs text-muted mt-1 space-y-1 list-disc list-inside">
                  <li><strong className="text-text">US:</strong> $13.61M exemption, 40% rate</li>
                  <li><strong className="text-text">UK:</strong> £325K threshold, 40% rate</li>
                  <li><strong className="text-text">Canada:</strong> Capital gains model</li>
                  <li><strong className="text-text">AU/NZ:</strong> No inheritance tax</li>
                </ul>
                <Separator className="my-3" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">Category</span>
                  <Badge variant="secondary" className="text-[10px] capitalize">Finance</Badge>
                </div>
                <div className="flex items-center justify-between text-xs mt-2">
                  <span className="text-muted">Inputs</span>
                  <span className="text-text font-medium">10</span>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-accent-amber" />
                  Quick Example
                </h3>
                <p className="text-xs text-muted mb-2">$2M estate in the United States with 2 beneficiaries:</p>
                <div className="space-y-1">
                  {[
                    { label: "Estate Value", value: "$2,000,000" },
                    { label: "Deductions", value: "$175,000" },
                    { label: "Tax Exemption", value: "$13,610,000" },
                    { label: "Tax Due", value: "$0 (under limit)" },
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
