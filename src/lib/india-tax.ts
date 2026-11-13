export const INDIA_TAX_SOURCE = "https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/itr-2/itr-2-faqs";

export function indianSalaryTax(income: number, regime: string, oldDeductions = 0) {
  if (!Number.isFinite(income) || income < 0 || income > 5000000) throw new Error("This simplified AY 2026–27 estimate supports salary income up to ₹50 lakh, without surcharge or special-rate income.");
  const isNew = regime === "new";
  const taxable = Math.max(0, income - (isNew ? 75000 : 50000) - (isNew ? 0 : Math.max(0, oldDeductions)));
  const bands = isNew ? [[400000,0],[800000,0.05],[1200000,0.10],[1600000,0.15],[2000000,0.20],[2400000,0.25],[Infinity,0.30]] : [[250000,0],[500000,0.05],[1000000,0.20],[Infinity,0.30]];
  let tax = 0;
  let previous = 0;
  for (const [ceiling, rate] of bands) { tax += Math.max(0, Math.min(taxable, ceiling) - previous) * rate; previous = ceiling; if (taxable <= ceiling) break; }
  if (isNew) tax = taxable <= 1200000 ? 0 : Math.min(tax, taxable - 1200000);
  else if (taxable <= 500000) tax = 0;
  return { taxable, tax: Math.round(tax * 100) / 100 };
}
