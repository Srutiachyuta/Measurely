export function loanPayment(principal: number, periodicRate: number, periods: number): number {
  if (!Number.isFinite(principal) || !Number.isFinite(periodicRate) || !Number.isFinite(periods) || periods <= 0 || periodicRate < 0) throw new Error("Enter a valid loan amount, rate and duration.");
  return periodicRate === 0 ? principal / periods : principal * periodicRate / -Math.expm1(-periods * Math.log1p(periodicRate));
}

export function annuityValue(payment: number, periodicRate: number, periods: number, beginning = false): number {
  const growth = periodicRate === 0 ? periods : Math.expm1(periods * Math.log1p(periodicRate)) / periodicRate;
  return payment * growth * (beginning ? 1 + periodicRate : 1);
}
