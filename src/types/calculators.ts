import type { LucideIcon } from "lucide-react";
export type CalculatorInputType = "number" | "select" | "radio" | "date" | "time";

export interface CalculatorOption {
  label: string;
  value: string;
}

export interface CalculatorInput {
  label: string;
  key: string;
  type: CalculatorInputType;
  options?: CalculatorOption[];
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: string | number;
  required?: boolean;
}

export interface CalculatorResult {
  label: string;
  key: string;
  value: number | string;
  unit?: string;
  description?: string;
  color?: "green" | "red" | "amber" | "blue" | "default";
}

export interface ChartConfig {
  type: "bar" | "doughnut" | "pie" | "line";
  data: Record<string, unknown>;
  options?: Record<string, unknown>;
}

export interface CalculatorDefinition {
  icon: LucideIcon;
  name: string;
  slug: string;
  category: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  inputs: CalculatorInput[];
  compute: (inputs: Record<string, number | string>) => CalculatorResult[];
  chart?: (results: CalculatorResult[], inputs: Record<string, number | string>) => ChartConfig | null;
  example: {
    inputs: Record<string, number | string>;
    results: CalculatorResult[];
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedSlugs: string[];
  formula?: string;
}



export interface EMIInputs {
  loanAmount: number;
  interestRate: number;
  tenure: number;
  tenureType: "months" | "years";
}

export interface LoanInputs {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  termType: "months" | "years";
}

export interface BMIInputs {
  weight: number;
  height: number;
  weightUnit: "kg" | "lbs";
  heightUnit: "cm" | "ftin";
}

export interface BMRInputs {
  weight: number;
  height: number;
  age: number;
  gender: "male" | "female";
  weightUnit: "kg" | "lbs";
  heightUnit: "cm" | "ft";
}

export interface SIPInputs {
  monthlyInvestment: number;
  expectedReturn: number;
  tenure: number;
  tenureType: "months" | "years";
}
