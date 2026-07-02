import type { UnitDefinition, ConverterDefinition, ConversionResult } from "@/types/converters";

export function makeUnit(name: string, symbol: string, factor: number): UnitDefinition {
  return {
    name,
    symbol,
    toBase: (v: number) => v * factor,
    fromBase: (v: number) => v / factor,
  };
}

export function makeCustomUnit(
  name: string,
  symbol: string,
  toBase: (v: number) => number,
  fromBase: (v: number) => number
): UnitDefinition {
  return { name, symbol, toBase, fromBase };
}

export function convert(
  value: number,
  fromUnit: string,
  toUnit: string,
  units: UnitDefinition[]
): number {
  const from = units.find((u) => u.symbol === fromUnit);
  const to = units.find((u) => u.symbol === toUnit);
  if (!from || !to) return 0;
  const baseValue = from.toBase(value);
  return to.fromBase(baseValue);
}

export function getAllConversions(
  value: number,
  fromUnit: string,
  units: UnitDefinition[]
): ConversionResult[] {
  const from = units.find((u) => u.symbol === fromUnit);
  if (!from) return [];
  const baseValue = from.toBase(value);
  return units.map((unit) => {
    const result = unit.fromBase(baseValue);
    return {
      value: result,
      unit: unit.symbol,
      formatted: formatUnitValue(result),
    };
  });
}

export function formatUnitValue(value: number, decimals?: number): string {
  if (!isFinite(value) || isNaN(value)) return "—";
  const abs = Math.abs(value);
  let dec: number;
  if (decimals !== undefined) {
    dec = decimals;
  } else if (abs === 0) {
    dec = 0;
  } else if (abs >= 10000) {
    dec = 0;
  } else if (abs >= 1000) {
    dec = 2;
  } else if (abs >= 1) {
    dec = 4;
  } else if (abs >= 0.01) {
    dec = 6;
  } else if (abs >= 0.0001) {
    dec = 8;
  } else {
    dec = 10;
  }
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: dec,
    useGrouping: true,
  });
}

// Temperature conversion functions using Kelvin as base
export function celsiusToKelvin(c: number): number { return c + 273.15; }
export function kelvinToCelsius(k: number): number { return k - 273.15; }
export function fahrenheitToKelvin(f: number): number { return (f - 32) * 5 / 9 + 273.15; }
export function kelvinToFahrenheit(k: number): number { return (k - 273.15) * 9 / 5 + 32; }
export function rankineToKelvin(r: number): number { return r * 5 / 9; }
export function kelvinToRankine(k: number): number { return k * 9 / 5; }
export function reaumurToKelvin(re: number): number { return re * 5 / 4 + 273.15; }
export function kelvinToReaumur(k: number): number { return (k - 273.15) * 4 / 5; }

// Shoe size helpers (base: cm)
const BARLEYCORN_CM = 0.846667;
export function usMenToCm(size: number): number { return (size + 24) / 3 * BARLEYCORN_CM; }
export function cmToUsMen(cm: number): number { return (cm / BARLEYCORN_CM) * 3 - 24; }
export function usWomenToCm(size: number): number { return (size + 23) / 3 * BARLEYCORN_CM; }
export function cmToUsWomen(cm: number): number { return (cm / BARLEYCORN_CM) * 3 - 23; }
export function ukShoeToCm(size: number): number { return (size + 23) / 3 * BARLEYCORN_CM; }
export function cmToUkShoe(cm: number): number { return (cm / BARLEYCORN_CM) * 3 - 23; }
export function euShoeToCm(size: number): number { return BARLEYCORN_CM * (2 * size / 3 - 1); }
export function cmToEuShoe(cm: number): number { return (cm / BARLEYCORN_CM + 1) * 1.5; }

// Ring size helpers (base: circumference in mm)
export function usRingToCirc(size: number): number { return 40.75 + size * 2.55; }
export function circToUsRing(mm: number): number { return (mm - 40.75) / 2.55; }
export function ukRingToCirc(size: number): number { return 38 + size * 2.55; }
export function circToUkRing(mm: number): number { return (mm - 38) / 2.55; }
export function euRingToCirc(size: number): number { return size + 40; }
export function circToEuRing(mm: number): number { return mm - 40; }
export function jpRingToCirc(size: number): number { return size + 40; }
export function circToJpRing(mm: number): number { return mm - 40; }

// Clothing size helpers (base: US)
export function clothingUkFromUs(us: number): number { return us - 2; }
export function clothingUsFromUk(uk: number): number { return uk + 2; }
export function clothingEuFromUs(us: number): number { return us + 30; }
export function clothingUsFromEu(eu: number): number { return eu - 30; }
export function clothingJpFromUs(us: number): number { return us + 7; }
export function clothingUsFromJp(jp: number): number { return jp - 7; }
export function clothingFrFromUs(us: number): number { return us + 30; }
export function clothingUsFromFr(fr: number): number { return fr - 30; }
export function clothingItFromUs(us: number): number { return us + 34; }
export function clothingUsFromIt(it: number): number { return it - 34; }
export function clothingRuFromUs(us: number): number { return us + 12; }
export function clothingUsFromRu(ru: number): number { return ru - 12; }

export function findConverterBySlug(slug: string, converters: ConverterDefinition[]): ConverterDefinition | undefined {
  return converters.find((c) => c.slug === slug);
}

export function getRelatedConverters(slug: string, converters: ConverterDefinition[]): ConverterDefinition[] {
  const current = findConverterBySlug(slug, converters);
  if (!current) return [];
  return current.relatedSlugs
    .map((s) => findConverterBySlug(s, converters))
    .filter(Boolean) as ConverterDefinition[];
}
