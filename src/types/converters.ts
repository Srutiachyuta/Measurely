import type { LucideIcon } from "lucide-react";

export interface UnitDefinition {
  name: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export interface UnitGroup {
  label: string;
  units: UnitDefinition[];
}

export interface ConverterDefinition {
  icon: LucideIcon;
  name: string;
  slug: string;
  category: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  units: UnitDefinition[];
  unitGroups?: UnitGroup[];
  relatedSlugs: string[];
  popularConversions?: { from: string; to: string }[];
  faqs: { question: string; answer: string }[];
}

export interface ConversionResult {
  value: number;
  unit: string;
  formatted: string;
}

export interface ConverterState {
  value: string;
  fromUnit: string;
  toUnit: string;
}

export interface RecentConversion {
  from: string;
  to: string;
  value: string;
  result?: string;
}
