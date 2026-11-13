import { Ruler } from "lucide-react";
import type { CalculatorDefinition } from "@/types/calculators";

export const UNIT_GROUPS = {
  length: { label: "Length", units: [{ value: "m", label: "Metres (m)", factor: 1 }, { value: "cm", label: "Centimetres (cm)", factor: .01 }, { value: "km", label: "Kilometres (km)", factor: 1000 }, { value: "in", label: "Inches (in)", factor: .0254 }, { value: "ft", label: "Feet (ft)", factor: .3048 }, { value: "mi", label: "Miles (mi)", factor: 1609.344 }] },
  mass: { label: "Weight", units: [{ value: "kg", label: "Kilograms (kg)", factor: 1 }, { value: "g", label: "Grams (g)", factor: .001 }, { value: "lb", label: "Pounds (lb)", factor: .45359237 }, { value: "oz", label: "Ounces (oz)", factor: .028349523125 }] },
  area: { label: "Area", units: [{ value: "m²", label: "Square metres (m²)", factor: 1 }, { value: "ft²", label: "Square feet (ft²)", factor: .09290304 }, { value: "ha", label: "Hectares (ha)", factor: 10000 }, { value: "acre", label: "Acres", factor: 4046.8564224 }] },
  volume: { label: "Volume", units: [{ value: "L", label: "Litres (L)", factor: 1 }, { value: "mL", label: "Millilitres (mL)", factor: .001 }, { value: "m³", label: "Cubic metres (m³)", factor: 1000 }] },
  speed: { label: "Speed", units: [{ value: "km/h", label: "Kilometres per hour", factor: 1 }, { value: "mph", label: "Miles per hour", factor: 1.609344 }, { value: "m/s", label: "Metres per second", factor: 3.6 }] },
  temperature: { label: "Temperature", units: [{ value: "°C", label: "Celsius (°C)", factor: 1 }, { value: "°F", label: "Fahrenheit (°F)", factor: 1 }, { value: "K", label: "Kelvin (K)", factor: 1 }] },
};
export type UnitGroup = keyof typeof UNIT_GROUPS;

export function convertUnit(amount: number, group: string, from: string, to: string) {
  if (!Number.isFinite(amount)) throw new Error("Enter a finite number.");
  if (!Object.hasOwn(UNIT_GROUPS, group)) throw new Error("Choose a measurement type.");
  const units = UNIT_GROUPS[group as UnitGroup].units;
  const source = units.find(unit => unit.value === from);
  const target = units.find(unit => unit.value === to);
  if (!source || !target) throw new Error("Choose units from the same measurement type.");
  let result: number;
  if (group === "temperature") {
    const celsius = from === "°F" ? (amount - 32) * 5 / 9 : from === "K" ? amount - 273.15 : amount;
    if (celsius < -273.1500000001) throw new Error("Temperature cannot be below absolute zero.");
    result = to === "°F" ? celsius * 9 / 5 + 32 : to === "K" ? celsius + 273.15 : celsius;
  } else {
    if (amount < 0) throw new Error("Use zero or a positive measurement.");
    result = amount * source.factor / target.factor;
  }
  if (!Number.isFinite(result)) throw new Error("This measurement is too large. Use a smaller value.");
  return Number(result.toPrecision(12));
}

export const unitConverter: CalculatorDefinition = {
  icon: Ruler, name: "Unit Converter", slug: "unit-converter", category: "everyday-life",
  description: "Convert length, weight, area, volume, speed and temperature in one place.",
  metaTitle: "Unit Converter | Length, Weight, Area & Temperature | Measurely",
  metaDescription: "Convert metric and imperial measurements with one free tool. Includes length, weight, area, volume, speed and temperature, with clear conversion results.",
  inputs: [
    { key: "group", label: "Measurement", type: "select", defaultValue: "length", options: Object.entries(UNIT_GROUPS).map(([value, group]) => ({ value, label: group.label })) },
    { key: "amount", label: "Value to convert", type: "number", defaultValue: 1, step: .01 },
    { key: "from", label: "From", type: "select", defaultValue: "m", options: Object.values(UNIT_GROUPS).flatMap(group => group.units.map(({ value, label }) => ({ value, label }))) },
    { key: "to", label: "To", type: "select", defaultValue: "ft", options: Object.values(UNIT_GROUPS).flatMap(group => group.units.map(({ value, label }) => ({ value, label }))) },
  ],
  compute: inputs => [{ key: "converted", label: "Converted value", value: convertUnit(Number(inputs.amount), String(inputs.group), String(inputs.from), String(inputs.to)), unit: String(inputs.to), color: "green" }],
  example: { inputs: { group: "length", amount: 1, from: "m", to: "ft" }, results: [] },
  formula: "For scaled units: value × source factor ÷ target factor. Temperature uses an offset and a scale.",
  faqs: [
    { question: "Which measurements can I convert?", answer: "Choose length, weight, area, volume, speed or temperature. The From and To menus show only units for your chosen measurement." },
    { question: "How precise is the result?", answer: "Results are rounded to 12 significant digits. Defined conversion factors are used, but results are subject to normal floating-point rounding and the precision of your original measurement." },
    { question: "Can I convert negative temperatures?", answer: "Yes. Celsius and Fahrenheit can be negative, provided the temperature is not below absolute zero. Other measurement types accept zero or positive values." },
  ],
  relatedSlugs: ["percentage-calculator", "scientific-calculator", "concrete-calculator"],
};
