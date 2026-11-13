"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calculator, RotateCcw, Copy, Check, Share2, Download, Printer,
  ArrowLeft, Sparkles, Info, RefreshCw, TrendingUp, PiggyBank,
  Receipt, Percent, Calendar, DollarSign, Banknote, Landmark,
  FileSpreadsheet, RefreshCcw,
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
  age: number;
  retirementAge: number;
  filingStatus: string;
  state: string;
  annualIncome: number;
  otherIncome: number;
  socialSecurity: number;
  traditionalIraBalance: number;
  conversionAmount: number;
  annualPlannedConversion: number;
  expectedReturn: number;
  federalRate: number;
  stateRate: number;
  inflationAssumption: number;
  expectedFutureRate: number;
  irmmaConsideration: boolean;
  rmdStartAge: number;
  yearsUntilRetirement: number;
}

interface Results {
  currentTaxableIncome: number;
  newTaxableIncome: number;
  conversionTax: number;
  federalTax: number;
  stateTax: number;
  newTaxBracket: number;
  lifetimeTaxSavings: number;
  retirementPortfolio: number;
  afterTaxWealthComparison: number;
  breakEvenYear: number;
  recommendedConversionRange: string;
  traditionalIraValue: number;
  rothIraValue: number;
}

const defaultInputs: Inputs = {
  age: 40,
  retirementAge: 65,
  filingStatus: "single",
  state: "",
  annualIncome: 120000,
  otherIncome: 5000,
  socialSecurity: 0,
  traditionalIraBalance: 500000,
  conversionAmount: 50000,
  annualPlannedConversion: 0,
  expectedReturn: 7,
  federalRate: 24,
  stateRate: 5,
  inflationAssumption: 3,
  expectedFutureRate: 22,
  irmmaConsideration: false,
  rmdStartAge: 73,
  yearsUntilRetirement: 25,
};

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

const stateTaxRates: Record<string, { type: "flat" | "marginal"; rates: [number, number][] }> = {
  CA: { type: "marginal", rates: [[0, 0.01], [18686, 0.02], [44324, 0.04], [70060, 0.06], [98672, 0.08], [129714, 0.093], [169858, 0.103], [542553, 0.113], [698272, 0.123], [1000000, 0.133], [5000000, 0.143]] },
  NY: { type: "marginal", rates: [[0, 0.04], [17150, 0.045], [23600, 0.0525], [27900, 0.055], [50000, 0.06], [250000, 0.0685], [500000, 0.0825], [5000000, 0.0882], [25000000, 0.109]] },
  TX: { type: "flat", rates: [[0, 0]] },
  FL: { type: "flat", rates: [[0, 0]] },
  IL: { type: "flat", rates: [[0, 0.0495]] },
  PA: { type: "flat", rates: [[0, 0.0307]] },
  OH: { type: "marginal", rates: [[0, 0], [26050, 0.0277], [52100, 0.0333], [78200, 0.0388], [104250, 0.0436], [130300, 0.0474], [156350, 0.0495], [208450, 0.0509], [260550, 0.0571]] },
  GA: { type: "flat", rates: [[0, 0.0549]] },
  NC: { type: "flat", rates: [[0, 0.0475]] },
  MI: { type: "flat", rates: [[0, 0.0425]] },
  NJ: { type: "marginal", rates: [[0, 0.014], [20000, 0.0175], [35000, 0.035], [40000, 0.0553], [75000, 0.0637], [500000, 0.0897], [1000000, 0.1075], [5000000, 0.1238]] },
  VA: { type: "marginal", rates: [[0, 0.02], [3000, 0.03], [5000, 0.05], [17000, 0.0575]] },
  CO: { type: "flat", rates: [[0, 0.044]] },
  AZ: { type: "flat", rates: [[0, 0.025]] },
  MN: { type: "marginal", rates: [[0, 0.0535], [30620, 0.068], [108600, 0.0785], [196630, 0.0985], [327860, 0.1085]] },
  OR: { type: "marginal", rates: [[0, 0.0475], [4100, 0.0675], [10350, 0.0875], [125000, 0.099], [500000, 0.099]] },
  MD: { type: "marginal", rates: [[0, 0.02], [1000, 0.03], [2000, 0.04], [3000, 0.0475], [100000, 0.05], [125000, 0.0525], [150000, 0.055], [250000, 0.0575]] },
  MA: { type: "flat", rates: [[0, 0.05]] },
  CT: { type: "marginal", rates: [[0, 0.03], [10000, 0.05], [50000, 0.055], [100000, 0.06], [200000, 0.065], [250000, 0.069], [500000, 0.0699], [1000000, 0.0699]] },
};

const brackets_2026_single: [number, number][] = [
  [0, 0.10], [11600, 0.12], [47150, 0.22], [100525, 0.24],
  [191950, 0.32], [243725, 0.35], [609350, 0.37],
];

const brackets_2026_married_joint: [number, number][] = [
  [0, 0.10], [23200, 0.12], [94300, 0.22], [201050, 0.24],
  [383900, 0.32], [487450, 0.35], [731200, 0.37],
];

const brackets_2026_married_separate: [number, number][] = [
  [0, 0.10], [11600, 0.12], [47150, 0.22], [100525, 0.24],
  [191950, 0.32], [243725, 0.35], [365600, 0.37],
];

const brackets_2026_head_household: [number, number][] = [
  [0, 0.10], [16550, 0.12], [63100, 0.22], [100500, 0.24],
  [191950, 0.32], [243700, 0.35], [609350, 0.37],
];

const standardDeduction_2026_single = 14600;
const standardDeduction_2026_married_joint = 29200;
const standardDeduction_2026_married_separate = 14600;
const standardDeduction_2026_head_household = 21900;

function getBrackets(status: string): [number, number][] {
  switch (status) {
    case "married-joint": return brackets_2026_married_joint;
    case "married-separate": return brackets_2026_married_separate;
    case "head-household": return brackets_2026_head_household;
    default: return brackets_2026_single;
  }
}

function getStandardDeduction(status: string): number {
  switch (status) {
    case "married-joint": return standardDeduction_2026_married_joint;
    case "married-separate": return standardDeduction_2026_married_separate;
    case "head-household": return standardDeduction_2026_head_household;
    default: return standardDeduction_2026_single;
  }
}

function calculateFederalTax(income: number, status: string): number {
  const brackets = getBrackets(status);
  let tax = 0;
  let remaining = income;
  for (let i = brackets.length - 1; i >= 0; i--) {
    const [threshold, rate] = brackets[i];
    const nextThreshold = i < brackets.length - 1 ? brackets[i + 1][0] : Infinity;
    const bracketTop = nextThreshold - threshold;
    if (remaining > bracketTop) {
      tax += bracketTop * rate;
      remaining -= bracketTop;
    } else {
      tax += remaining * rate;
      remaining = 0;
      break;
    }
  }
  return Math.max(0, tax);
}

function getBracketForIncome(income: number, status: string): number {
  const brackets = getBrackets(status);
  for (let i = brackets.length - 1; i >= 0; i--) {
    if (income >= brackets[i][0]) {
      return brackets[i][1] * 100;
    }
  }
  return brackets[0][1] * 100;
}

function calculateStateTax(income: number, state: string): number {
  const config = stateTaxRates[state];
  if (!config) return 0;
  if (config.type === "flat") {
    return income * config.rates[0][1];
  }
  let tax = 0;
  let remaining = income;
  const rates = config.rates;
  for (let i = rates.length - 1; i >= 0; i--) {
    const [threshold, rate] = rates[i];
    const nextThreshold = i < rates.length - 1 ? rates[i + 1][0] : Infinity;
    const bracketTop = nextThreshold - threshold;
    if (remaining > bracketTop) {
      tax += bracketTop * rate;
      remaining -= bracketTop;
    } else {
      tax += remaining * rate;
      remaining = 0;
      break;
    }
  }
  return Math.max(0, tax);
}

function calculate(inputs: Inputs): Results {
  const age = Math.max(0, inputs.age || 0);
  const retirementAge = Math.max(age + 1, inputs.retirementAge || 65);
  const annualIncome = Math.max(0, inputs.annualIncome || 0);
  const otherIncome = Math.max(0, inputs.otherIncome || 0);
  const socialSecurity = Math.max(0, inputs.socialSecurity || 0);
  const traditionalIraBalance = Math.max(0, inputs.traditionalIraBalance || 0);
  const conversionAmount = Math.max(0, inputs.conversionAmount || 0);
  const annualPlannedConversion = Math.max(0, inputs.annualPlannedConversion || 0);
  const expectedReturn = Math.max(0, inputs.expectedReturn || 0) / 100;
  const stateRate = Math.max(0, inputs.stateRate || 0) / 100;
  const inflationAssumption = Math.max(0, inputs.inflationAssumption || 0) / 100;
  const expectedFutureRate = Math.max(0, inputs.expectedFutureRate || 0) / 100;
  const yearsUntilRetirement = Math.max(0, inputs.yearsUntilRetirement || 0);
  const status = inputs.filingStatus;
  const state = inputs.state;

  const grossIncome = annualIncome + otherIncome + socialSecurity;
  const standardDeduction = getStandardDeduction(status);
  const currentTaxableIncome = Math.max(0, grossIncome - standardDeduction);
  const newTaxableIncome = Math.max(0, currentTaxableIncome + conversionAmount);

  const fedTaxCurrent = calculateFederalTax(currentTaxableIncome, status);
  const fedTaxWithConversion = calculateFederalTax(newTaxableIncome, status);
  const federalTax = Math.max(0, fedTaxWithConversion - fedTaxCurrent);

  const stateTaxCurrent = state ? calculateStateTax(currentTaxableIncome, state) : 0;
  const stateTaxWithConversion = state ? calculateStateTax(newTaxableIncome, state) : 0;
  const stateTax = Math.max(0, stateTaxWithConversion - stateTaxCurrent);

  const conversionTax = federalTax + stateTax;
  const newTaxBracket = getBracketForIncome(newTaxableIncome, status);

  const growthRate = (1 + expectedReturn) / (1 + inflationAssumption) - 1;
  const yearsToRetirement = Math.max(1, retirementAge - age);

  let rothIraValue = 0;
  if (conversionAmount > 0) {
    rothIraValue = conversionAmount * Math.pow(1 + expectedReturn, yearsToRetirement);
  }

  const traditionalIraValue = traditionalIraBalance * Math.pow(1 + expectedReturn, yearsToRetirement);

  let taxOnTraditionalAtRetirement = 0;
  if (traditionalIraValue > 0) {
    const estimatedRetirementIncome = annualIncome * Math.pow(1 + inflationAssumption, yearsToRetirement) * 0.7;
    const taxableAtRetirement = Math.max(0, estimatedRetirementIncome - standardDeduction);
    const rmdPortion = traditionalIraValue / 30;
    const totalRetirementTaxable = taxableAtRetirement + rmdPortion * expectedFutureRate;
    taxOnTraditionalAtRetirement = calculateFederalTax(totalRetirementTaxable, status) * 0.5;
  }

  const afterTaxTraditional = traditionalIraValue - taxOnTraditionalAtRetirement;
  const afterTaxRoth = rothIraValue;
  const afterTaxWealthComparison = Math.max(0, afterTaxRoth - afterTaxTraditional);

  let breakEvenYear = 0;
  if (conversionAmount > 0 && conversionTax > 0) {
    const annualBenefit = afterTaxRoth - afterTaxTraditional;
    if (annualBenefit > 0) {
      breakEvenYear = Math.ceil(conversionTax / (annualBenefit / yearsToRetirement));
    } else {
      breakEvenYear = yearsToRetirement;
    }
  } else {
    breakEvenYear = 0;
  }

  const lifetimeTaxSavings = Math.max(0, taxOnTraditionalAtRetirement - conversionTax);

  const portfolioGrowthTraditional = traditionalIraBalance * Math.pow(1 + expectedReturn, yearsToRetirement);
  const retirementPortfolio = portfolioGrowthTraditional;

  const rangeLow = Math.max(5000, Math.floor(currentTaxableIncome * 0.05 / 1000) * 1000);
  let rangeHigh = Math.min(traditionalIraBalance, Math.ceil(currentTaxableIncome * 0.15 / 1000) * 1000);
  if (rangeLow >= rangeHigh) {
    rangeHigh = rangeLow + 10000;
  }
  const recommendedConversionRange = `$${rangeLow.toLocaleString()} – $${rangeHigh.toLocaleString()} per year`;

  return {
    currentTaxableIncome: Math.round(currentTaxableIncome * 100) / 100,
    newTaxableIncome: Math.round(newTaxableIncome * 100) / 100,
    conversionTax: Math.round(conversionTax * 100) / 100,
    federalTax: Math.round(federalTax * 100) / 100,
    stateTax: Math.round(stateTax * 100) / 100,
    newTaxBracket: Math.round(newTaxBracket * 100) / 100,
    lifetimeTaxSavings: Math.round(lifetimeTaxSavings * 100) / 100,
    retirementPortfolio: Math.round(retirementPortfolio * 100) / 100,
    afterTaxWealthComparison: Math.round(afterTaxWealthComparison * 100) / 100,
    breakEvenYear: Math.round(breakEvenYear),
    recommendedConversionRange,
    traditionalIraValue: Math.round(traditionalIraValue * 100) / 100,
    rothIraValue: Math.round(rothIraValue * 100) / 100,
  };
}

function fmt(value: number): string {
  return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtCurrency(value: number): string {
  return "$" + fmt(value);
}

export function RothConversionTaxCalculator() {
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
      "Roth Conversion Tax Calculator Results",
      "=".repeat(40),
      "",
      `Current Taxable Income: $${fmt(results.currentTaxableIncome)}`,
      `New Taxable Income (after conversion): $${fmt(results.newTaxableIncome)}`,
      `Conversion Tax Owed: $${fmt(results.conversionTax)}`,
      `  Federal Tax: $${fmt(results.federalTax)}`,
      `  State Tax: $${fmt(results.stateTax)}`,
      `New Tax Bracket: ${results.newTaxBracket}%`,
      `Lifetime Tax Savings: $${fmt(results.lifetimeTaxSavings)}`,
      `Traditional IRA Value at Retirement: $${fmt(results.traditionalIraValue)}`,
      `Roth IRA Value at Retirement: $${fmt(results.rothIraValue)}`,
      `Break-Even Year: ${results.breakEvenYear > 0 ? results.breakEvenYear + " years" : "Immediate"}`,
      `Recommended Conversion Range: ${results.recommendedConversionRange}`,
      "",
      "Disclaimers: This is an estimate for educational purposes only.",
      "Consult a qualified tax professional for personalized advice.",
      "",
      "Generated by Measurely Roth Conversion Tax Calculator",
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
      try { await navigator.share({ title: "Roth Conversion Tax Calculator", text }); } catch { /* ignore */ }
    } else {
      await copyToClipboard(window.location.href);
      addToast({ title: "Link copied", variant: "info" });
    }
  }, [formatResultsText, addToast]);

  const handleDownload = useCallback(() => {
    downloadAsFile(formatResultsText(), "roth-conversion-tax-estimate.txt");
    addToast({ title: "Downloaded", variant: "success" });
  }, [formatResultsText, addToast]);

  const handlePrint = useCallback(() => window.print(), []);

  const handleExportCSV = useCallback(() => {
    if (!results) return;
    const header = "Metric,Value\n";
    const rows = [
      `Current Taxable Income,${results.currentTaxableIncome}`,
      `New Taxable Income,${results.newTaxableIncome}`,
      `Conversion Tax,${results.conversionTax}`,
      `Federal Tax,${results.federalTax}`,
      `State Tax,${results.stateTax}`,
      `New Tax Bracket,${results.newTaxBracket}`,
      `Lifetime Tax Savings,${results.lifetimeTaxSavings}`,
      `Traditional IRA at Retirement,${results.traditionalIraValue}`,
      `Roth IRA at Retirement,${results.rothIraValue}`,
      `Break-Even Year,${results.breakEvenYear}`,
    ];
    downloadAsFile(header + rows.join("\n"), "roth-conversion-tax-estimate.csv", "text/csv");
    addToast({ title: "Exported CSV", variant: "success" });
  }, [results, addToast]);

  const taxBreakdownChart = useMemo(() => {
    if (!results) return null;
    const data: number[] = [results.federalTax, results.stateTax, results.currentTaxableIncome];
    if (data.every((v) => v === 0)) return null;
    return {
      type: "doughnut" as const,
      data: {
        labels: ["Federal Tax", "State Tax", "Remaining Income"],
        datasets: [{
          data,
          backgroundColor: ["rgba(239, 68, 68, 0.8)", "rgba(245, 158, 11, 0.8)", "rgba(34, 197, 94, 0.8)"],
          borderColor: ["rgba(239, 68, 68, 1)", "rgba(245, 158, 11, 1)", "rgba(34, 197, 94, 1)"],
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

  const iraComparisonChart = useMemo(() => {
    if (!results) return null;
    return {
      type: "bar" as const,
      data: {
        labels: ["Traditional IRA", "Roth IRA"],
        datasets: [{
          label: "Value at Retirement ($)",
          data: [results.traditionalIraValue, results.rothIraValue],
          backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(34, 197, 94, 0.8)"],
          borderColor: ["rgba(99, 102, 241, 1)", "rgba(34, 197, 94, 1)"],
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

  const portfolioGrowthChart = useMemo(() => {
    if (!results) return null;
    const yearsToProject = Math.max(1, inputs.retirementAge - inputs.age);
    const labels: string[] = [];
    const traditionalData: number[] = [];
    const rothData: number[] = [];
    const convAmount = Math.max(0, inputs.conversionAmount || 0);
    const tradBalance = Math.max(0, inputs.traditionalIraBalance || 0);
    const returnRate = Math.max(0, inputs.expectedReturn || 0) / 100;
    const annualPlanned = Math.max(0, inputs.annualPlannedConversion || 0);

    for (let y = 0; y <= yearsToProject; y += Math.max(1, Math.floor(yearsToProject / 10))) {
      labels.push(`Year ${y}`);
      const tradGrowth = tradBalance * Math.pow(1 + returnRate, y);
      const rothGrowth = convAmount * Math.pow(1 + returnRate, y) + (annualPlanned > 0 ? annualPlanned * ((Math.pow(1 + returnRate, y) - 1) / returnRate) : 0);
      traditionalData.push(Math.round(tradGrowth * 100) / 100);
      rothData.push(Math.round(rothGrowth * 100) / 100);
    }

    return {
      type: "line" as const,
      data: {
        labels,
        datasets: [
          {
            label: "Traditional IRA",
            data: traditionalData,
            borderColor: "rgba(99, 102, 241, 1)",
            backgroundColor: "rgba(99, 102, 241, 0.1)",
            fill: true,
            tension: 0.3,
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 2,
          },
          {
            label: "Roth IRA",
            data: rothData,
            borderColor: "rgba(34, 197, 94, 1)",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            fill: true,
            tension: 0.3,
            pointRadius: 4,
            pointHoverRadius: 6,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "bottom" as const, labels: { padding: 16, usePointStyle: true, font: { family: "Inter, sans-serif", size: 12 } } },
          tooltip: { callbacks: { label: (ctx: { parsed: { y: number }; dataset: { label: string } }) => ctx.dataset.label + ": $" + ctx.parsed.y.toLocaleString("en-US", { minimumFractionDigits: 2 }) } },
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: (v: string | number) => "$" + Number(v).toLocaleString() } },
        },
      },
    };
  }, [results, inputs]);

  const isValid = inputs.annualIncome >= 0 && inputs.traditionalIraBalance >= 0;

  const currentFilingStatusLabel =
    inputs.filingStatus === "single" ? "Single" :
    inputs.filingStatus === "married-joint" ? "Married Filing Jointly" :
    inputs.filingStatus === "married-separate" ? "Married Filing Separately" :
    "Head of Household";

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <nav className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link href="/calculators" className="hover:text-text transition-colors">Calculators</Link>
          <span>/</span>
          <span className="text-text">Roth Conversion Tax Calculator</span>
        </nav>

        <div className="relative mb-8 overflow-hidden rounded-3xl bg-surface border border-border/40 shadow-elevation-lg">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-primary-500/10 to-accent-cyan/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-text">Roth Conversion Tax Calculator</h1>
                <p className="text-sm text-muted mt-1">Estimate taxes on converting a Traditional IRA to a Roth IRA and compare long-term wealth outcomes</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs capitalize">Finance</Badge>
              <Badge variant="info" className="text-xs">Calculator</Badge>
              <Badge variant="info" className="text-xs text-[10px] bg-accent-amber/20 text-accent-amber border-accent-amber/30">Retirement</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-surface rounded-2xl border border-border p-5 space-y-4">
              <h2 className="text-sm font-semibold text-text">Input Values</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="age" className="text-sm font-medium text-text">Age<span className="text-red-400 ml-0.5">*</span></Label>
                  <Input onKeyDown={handleKeyDown} id="age" type="number" placeholder="e.g., 40" min={0} max={120} step={1} value={inputs.age} onChange={(e) => handleChange("age", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="retirementAge" className="text-sm font-medium text-text">Retirement Age<span className="text-red-400 ml-0.5">*</span></Label>
                  <Input onKeyDown={handleKeyDown} id="retirementAge" type="number" placeholder="e.g., 65" min={1} max={120} step={1} value={inputs.retirementAge} onChange={(e) => handleChange("retirementAge", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="filingStatus" className="text-sm font-medium text-text">Filing Status<span className="text-red-400 ml-0.5">*</span></Label>
                  <Select value={inputs.filingStatus} onValueChange={(v) => handleChange("filingStatus", v)}>
                    <SelectTrigger id="filingStatus" className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married-joint">Married Filing Jointly</SelectItem>
                      <SelectItem value="married-separate">Married Filing Separately</SelectItem>
                      <SelectItem value="head-household">Head of Household</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="state" className="text-sm font-medium text-text">State <span className="text-muted">(optional)</span></Label>
                  <Select value={inputs.state} onValueChange={(v) => handleChange("state", v)}>
                    <SelectTrigger id="state" className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No state / tax-free</SelectItem>
                      {Object.entries(stateNames).filter(([code]) => stateTaxRates[code]).map(([code, name]) => (
                        <SelectItem key={code} value={code}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="annualIncome" className="text-sm font-medium text-text">Annual Income ($)<span className="text-red-400 ml-0.5">*</span></Label>
                  <Input onKeyDown={handleKeyDown} id="annualIncome" type="number" placeholder="e.g., 120000" min={0} step={1000} value={inputs.annualIncome} onChange={(e) => handleChange("annualIncome", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="otherIncome" className="text-sm font-medium text-text">Other Income ($)</Label>
                  <Input onKeyDown={handleKeyDown} id="otherIncome" type="number" placeholder="e.g., 5000" min={0} step={500} value={inputs.otherIncome} onChange={(e) => handleChange("otherIncome", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="socialSecurity" className="text-sm font-medium text-text">Social Security Income ($)</Label>
                  <Input onKeyDown={handleKeyDown} id="socialSecurity" type="number" placeholder="e.g., 0" min={0} step={500} value={inputs.socialSecurity} onChange={(e) => handleChange("socialSecurity", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="traditionalIraBalance" className="text-sm font-medium text-text">Traditional IRA Balance ($)<span className="text-red-400 ml-0.5">*</span></Label>
                  <Input onKeyDown={handleKeyDown} id="traditionalIraBalance" type="number" placeholder="e.g., 500000" min={0} step={10000} value={inputs.traditionalIraBalance} onChange={(e) => handleChange("traditionalIraBalance", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="conversionAmount" className="text-sm font-medium text-text">One-Time Conversion Amount ($)</Label>
                  <div className="relative">
                    <Input onKeyDown={handleKeyDown} id="conversionAmount" type="number" placeholder="e.g., 50000" min={0} step={1000} value={inputs.conversionAmount} onChange={(e) => handleChange("conversionAmount", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="annualPlannedConversion" className="text-sm font-medium text-text">Annual Planned Conversion ($)</Label>
                  <div className="relative">
                    <Input onKeyDown={handleKeyDown} id="annualPlannedConversion" type="number" placeholder="e.g., 0" min={0} step={1000} value={inputs.annualPlannedConversion} onChange={(e) => handleChange("annualPlannedConversion", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="expectedReturn" className="text-sm font-medium text-text">
                    Expected Return (%)
                    <TooltipProvider><Tooltip><TooltipTrigger><Info className="h-3.5 w-3.5 text-muted ml-1 inline-block align-middle" /></TooltipTrigger><TooltipContent>Average annual investment return before retirement</TooltipContent></Tooltip></TooltipProvider>
                  </Label>
                  <Input onKeyDown={handleKeyDown} id="expectedReturn" type="number" placeholder="e.g., 7" min={0} max={30} step={0.25} value={inputs.expectedReturn} onChange={(e) => handleChange("expectedReturn", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="federalRate" className="text-sm font-medium text-text">
                    Current Marginal Tax Rate (%)
                    <TooltipProvider><Tooltip><TooltipTrigger><Info className="h-3.5 w-3.5 text-muted ml-1 inline-block align-middle" /></TooltipTrigger><TooltipContent>Your current top federal tax bracket</TooltipContent></Tooltip></TooltipProvider>
                  </Label>
                  <Input onKeyDown={handleKeyDown} id="federalRate" type="number" placeholder="e.g., 24" min={0} max={50} step={1} value={inputs.federalRate} onChange={(e) => handleChange("federalRate", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="stateRate" className="text-sm font-medium text-text">
                    State Tax Rate (%)
                    <TooltipProvider><Tooltip><TooltipTrigger><Info className="h-3.5 w-3.5 text-muted ml-1 inline-block align-middle" /></TooltipTrigger><TooltipContent>Your state income tax rate</TooltipContent></Tooltip></TooltipProvider>
                  </Label>
                  <Input onKeyDown={handleKeyDown} id="stateRate" type="number" placeholder="e.g., 5" min={0} max={15} step={0.25} value={inputs.stateRate} onChange={(e) => handleChange("stateRate", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="inflationAssumption" className="text-sm font-medium text-text">
                    Inflation Assumption (%)
                    <TooltipProvider><Tooltip><TooltipTrigger><Info className="h-3.5 w-3.5 text-muted ml-1 inline-block align-middle" /></TooltipTrigger><TooltipContent>Expected long-term inflation rate</TooltipContent></Tooltip></TooltipProvider>
                  </Label>
                  <Input onKeyDown={handleKeyDown} id="inflationAssumption" type="number" placeholder="e.g., 3" min={0} max={20} step={0.25} value={inputs.inflationAssumption} onChange={(e) => handleChange("inflationAssumption", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="expectedFutureRate" className="text-sm font-medium text-text">
                    Expected Future Tax Rate (%)
                    <TooltipProvider><Tooltip><TooltipTrigger><Info className="h-3.5 w-3.5 text-muted ml-1 inline-block align-middle" /></TooltipTrigger><TooltipContent>Estimated tax bracket in retirement</TooltipContent></Tooltip></TooltipProvider>
                  </Label>
                  <Input onKeyDown={handleKeyDown} id="expectedFutureRate" type="number" placeholder="e.g., 22" min={0} max={50} step={1} value={inputs.expectedFutureRate} onChange={(e) => handleChange("expectedFutureRate", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="rmdStartAge" className="text-sm font-medium text-text">RMD Start Age</Label>
                  <Input onKeyDown={handleKeyDown} id="rmdStartAge" type="number" placeholder="e.g., 73" min={55} max={85} step={1} value={inputs.rmdStartAge} onChange={(e) => handleChange("rmdStartAge", e.target.value === "" ? 0 : Number(e.target.value))} className="h-12 text-base bg-white dark:bg-dark-800/50 border-border/60 rounded-xl font-mono" />
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
                            <h3 className="text-base font-semibold text-text">Roth Conversion Estimate</h3>
                            <p className="text-xs text-text-secondary">{currentFilingStatusLabel}{inputs.state ? ` • ${stateNames[inputs.state] || inputs.state}` : ""}</p>
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
                            <Receipt className="h-3.5 w-3.5" />
                          </div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary">Conversion Tax Impact</p>
                        </div>
                        <div className="flex items-baseline gap-4 flex-wrap">
                          <div>
                            <p className="text-xs text-text-secondary mb-1">Tax Owed on Conversion</p>
                            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary-600 dark:text-primary-400 break-words">
                              {fmtCurrency(results.conversionTax)}
                            </span>
                          </div>
                          <div className="h-12 w-px bg-border/60 hidden sm:block" />
                          <div>
                            <p className="text-xs text-text-secondary mb-1">Lifetime Tax Savings</p>
                            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                              {fmtCurrency(results.lifetimeTaxSavings)}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-text-secondary mt-2">
                          Filing as {currentFilingStatusLabel.toLowerCase()} — Break-even in {results.breakEvenYear > 0 ? `${results.breakEvenYear} years` : "immediate"}
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          { label: "Current Taxable Income", key: "currentTaxableIncome", value: results.currentTaxableIncome, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10 border-blue-200/50", iconBg: "bg-blue-500", icon: DollarSign },
                          { label: "New Taxable Income", key: "newTaxableIncome", value: results.newTaxableIncome, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200/50", iconBg: "bg-indigo-500", icon: TrendingUp },
                          { label: "Federal Tax", key: "federalTax", value: results.federalTax, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10 border-red-200/50", iconBg: "bg-red-500", icon: Landmark },
                          { label: "State Tax", key: "stateTax", value: results.stateTax, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-200/50", iconBg: "bg-amber-500", icon: Percent },
                          { label: "Roth IRA Value at Retirement", key: "rothIraValue", value: results.rothIraValue, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200/50", iconBg: "bg-emerald-500", icon: PiggyBank },
                          { label: "Traditional IRA at Retirement", key: "traditionalIraValue", value: results.traditionalIraValue, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10 border-purple-200/50", iconBg: "bg-purple-500", icon: Banknote },
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
                          <p className="text-xs text-text-secondary mb-1">New Tax Bracket</p>
                          <p className="text-base font-bold text-text">{results.newTaxBracket}%</p>
                        </div>
                        <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                          <p className="text-xs text-text-secondary mb-1">Break-Even Year</p>
                          <p className="text-base font-bold text-primary-600 dark:text-primary-400">{results.breakEvenYear > 0 ? `Year ${results.breakEvenYear}` : "Immediate"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className="p-5">
                      <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                        <Receipt className="w-4 h-4 text-primary-500" />
                        Tax Breakdown
                      </h4>
                      <div className="h-56">{taxBreakdownChart && <ChartComponent chart={taxBreakdownChart} />}</div>
                    </Card>

                    <Card className="p-5">
                      <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                        <PiggyBank className="w-4 h-4 text-primary-500" />
                        IRA Value Comparison
                      </h4>
                      <div className="h-56">{iraComparisonChart && <ChartComponent chart={iraComparisonChart} />}</div>
                    </Card>
                  </div>

                  <Card className="p-5">
                    <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                      <TrendingUp className="w-4 h-4 text-primary-500" />
                      Portfolio Growth Timeline
                    </h4>
                    <div className="h-56 mb-4">{portfolioGrowthChart && <ChartComponent chart={portfolioGrowthChart} />}</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                        <span className="text-sm text-text-secondary">Recommended Conversion Range</span>
                        <span className="text-sm font-semibold text-text">{results.recommendedConversionRange}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/50">
                        <span className="text-sm text-text-secondary">Lifetime Tax Savings</span>
                        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">{fmtCurrency(results.lifetimeTaxSavings)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200/50">
                        <span className="text-sm text-text-secondary">Conversion Tax</span>
                        <span className="text-sm font-semibold text-red-500 tabular-nums">{fmtCurrency(results.conversionTax)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200/50">
                        <span className="text-sm text-text-secondary">Current Taxable Income</span>
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 tabular-nums">{fmtCurrency(results.currentTaxableIncome)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/50">
                        <span className="text-sm text-text-secondary">New Taxable Income</span>
                        <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 tabular-nums">{fmtCurrency(results.newTaxableIncome)}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-5">
                    <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-primary-500" />
                      Tax Projection Summary
                    </h4>
                    <div className="space-y-2">
                      {[
                        { label: "Current Taxable Income", value: results.currentTaxableIncome, status: "current" },
                        { label: "Conversion Amount", value: inputs.conversionAmount, status: "current" },
                        { label: "New Taxable Income", value: results.newTaxableIncome, status: "new" },
                        { label: "Federal Tax on Conversion", value: results.federalTax, status: "tax" },
                        { label: "State Tax on Conversion", value: results.stateTax, status: "tax" },
                        { label: "Total Conversion Tax", value: results.conversionTax, status: "tax" },
                        { label: "Tax Bracket After Conversion", value: results.newTaxBracket + "%", status: "bracket" },
                        { label: "Break-Even Year", value: results.breakEvenYear > 0 ? `Year ${results.breakEvenYear}` : "Immediate", status: "bracket" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-xl border transition-colors",
                            item.status === "current" ? "bg-surface-secondary dark:bg-dark-800/30 border-border/60" :
                            item.status === "new" ? "bg-primary-50 dark:bg-primary-500/10 border-primary-200/50 dark:border-primary-500/20" :
                            item.status === "tax" ? "bg-red-50 dark:bg-red-500/10 border-red-200/50 dark:border-red-500/20" :
                            "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200/50 dark:border-indigo-500/20"
                          )}
                        >
                          <span className={cn("text-sm", item.status === "new" ? "font-semibold text-primary-600 dark:text-primary-400" : item.status === "tax" ? "font-semibold text-red-600 dark:text-red-400" : item.status === "bracket" ? "font-semibold text-indigo-600 dark:text-indigo-400" : "text-text-secondary")}>
                            {item.label}
                          </span>
                          <span className={cn("text-sm font-semibold tabular-nums", item.status === "new" ? "text-primary-600 dark:text-primary-400" : item.status === "tax" ? "text-red-600 dark:text-red-400" : item.status === "bracket" ? "text-indigo-600 dark:text-indigo-400" : "text-text")}>
                            {typeof item.value === "number" && item.status !== "bracket" ? fmtCurrency(item.value) : String(item.value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="p-5">
                    <h4 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                      <TrendingUp className="w-4 h-4 text-primary-500" />
                      Retirement Wealth Comparison
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-purple-500 flex items-center justify-center text-white">
                            <Banknote className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-sm text-text-secondary">Traditional IRA Value at Retirement</span>
                        </div>
                        <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 tabular-nums">
                          {fmtCurrency(results.traditionalIraValue)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                            <PiggyBank className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-sm text-text-secondary">Roth IRA Value at Retirement</span>
                        </div>
                        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                          {fmtCurrency(results.rothIraValue)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-primary-50 dark:bg-primary-500/10 border border-primary-200/50 dark:border-primary-500/20">
                        <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">Wealth Difference (Roth - Traditional)</span>
                        <span className={cn("text-sm font-bold tabular-nums", results.afterTaxWealthComparison >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400")}>
                          {results.afterTaxWealthComparison >= 0 ? "+" : "-"}{fmtCurrency(Math.abs(results.afterTaxWealthComparison))}
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            )}

            {!results && (
              <div className="bg-surface-secondary rounded-2xl border border-border p-8 text-center">
                <RefreshCw className="h-10 w-10 text-muted mx-auto mb-3" />
                <h3 className="text-base font-semibold text-text mb-1">Ready to Calculate</h3>
                <p className="text-sm text-muted">Enter your income details, IRA balance, and tax information, then click Calculate to estimate the cost and benefit of converting to a Roth IRA.</p>
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
                  Estimate the tax impact of converting a Traditional IRA to a Roth IRA. The calculator applies 2026 federal tax brackets, state income tax rates, and projects long-term wealth under both scenarios.
                </p>
                <Separator className="my-3" />
                <p className="text-xs text-muted">
                  <strong className="text-text">Key assumptions:</strong>
                </p>
                <ul className="text-xs text-muted mt-1 space-y-1 list-disc list-inside">
                  <li>2026 federal progressive tax brackets</li>
                  <li>Standard deduction applied</li>
                  <li>State tax estimated where available</li>
                  <li>Roth grows tax-free</li>
                  <li>Traditional IRA withdrawals taxed at future rate</li>
                </ul>
                <Separator className="my-3" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">Category</span>
                  <Badge variant="secondary" className="text-[10px] capitalize">Finance</Badge>
                </div>
                <div className="flex items-center justify-between text-xs mt-2">
                  <span className="text-muted">Inputs</span>
                  <span className="text-text font-medium">18</span>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="text-sm font-semibold text-text flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-accent-amber" />
                  Quick Example
                </h3>
                <p className="text-xs text-muted mb-2">40-year-old single filer, $120K income, $500K IRA:</p>
                <div className="space-y-1">
                  {[
                    { label: "Income", value: "$125,000" },
                    { label: "Current Taxable", value: "$110,400" },
                    { label: "Conversion", value: "$50,000" },
                    { label: "Tax to Convert", value: "~$11,000" },
                    { label: "Lifetime Savings", value: "~$45,000" },
                    { label: "Break-Even", value: "~5 years" },
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
