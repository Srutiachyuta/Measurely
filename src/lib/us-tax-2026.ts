// IRS Publication 505 (2026), SSA 2026 contribution and benefit base.
export const US_TAX_YEAR = 2026;
export const SOCIAL_SECURITY_BASE = 184500;
export function standardDeduction2026(status: string): number {
  return status === "married" ? 32200 : status === "head" || status === "head-of-household" ? 24150 : 16100;
}
export function federalBrackets2026(status: string) {
  const limits = status === "married"
    ? [24800, 100800, 211400, 403550, 512450, 768700]
    : status === "head" || status === "head-of-household"
      ? [17700, 67450, 105700, 201750, 256200, 640600]
      : [12400, 50400, 105700, 201775, 256225, 640600];
  return limits.map((limit, index) => ({ limit, rate: [10, 12, 22, 24, 32, 35][index] }));
}
export function federalIncomeTax2026(income: number, status: string): number {
  let previous = 0, tax = 0;
  for (const bracket of federalBrackets2026(status)) {
    tax += Math.max(0, Math.min(income, bracket.limit) - previous) * bracket.rate / 100;
    previous = bracket.limit;
  }
  return tax + Math.max(0, income - previous) * 0.37;
}
