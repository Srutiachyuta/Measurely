export function validateNumber(
  value: unknown,
  min?: number,
  max?: number
): value is number {
  if (typeof value !== "number" || isNaN(value) || !isFinite(value)) return false;
  if (min !== undefined && value < min) return false;
  if (max !== undefined && value > max) return false;
  return true;
}

export function roundTo(value: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function formatCurrency(
  value: number,
  currency: string = "USD"
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

export function calculateEMI(
  P: number,
  R: number,
  N: number
): { emi: number; totalInterest: number; totalPayment: number } {
  const monthlyRate = R / 12 / 100;
  const emi = P * monthlyRate * Math.pow(1 + monthlyRate, N) / (Math.pow(1 + monthlyRate, N) - 1);
  const totalPayment = emi * N;
  const totalInterest = totalPayment - P;
  return {
    emi: roundTo(emi),
    totalInterest: roundTo(totalInterest),
    totalPayment: roundTo(totalPayment),
  };
}

export function calculateSimpleInterest(
  P: number,
  R: number,
  T: number
): { interest: number; total: number } {
  const interest = P * R * T / 100;
  return {
    interest: roundTo(interest),
    total: roundTo(P + interest),
  };
}

export function calculateCompoundInterest(
  P: number,
  R: number,
  T: number,
  n: number = 12
): { interest: number; total: number } {
  const rate = R / 100;
  const total = P * Math.pow(1 + rate / n, n * T);
  return {
    interest: roundTo(total - P),
    total: roundTo(total),
  };
}

export function calculateBMI(weight: number, height: number): { bmi: number; category: string } {
  const bmi = weight / Math.pow(height / 100, 2);
  const rounded = roundTo(bmi, 1);
  let category: string;
  if (rounded < 18.5) category = "Underweight";
  else if (rounded < 25) category = "Normal";
  else if (rounded < 30) category = "Overweight";
  else category = "Obese";
  return { bmi: rounded, category };
}

export function calculateBMR(
  weight: number,
  height: number,
  age: number,
  gender: "male" | "female"
): { bmr: number; tdee: number } {
  let bmr: number;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  bmr = roundTo(bmr);
  const tdee = roundTo(bmr * 1.55);
  return { bmr, tdee };
}

export function calculateSIP(
  monthlyInvestment: number,
  expectedReturn: number,
  tenureMonths: number
): { invested: number; returns: number; maturityValue: number } {
  const monthlyRate = expectedReturn / 12 / 100;
  const maturityValue = monthlyInvestment * (Math.pow(1 + monthlyRate, tenureMonths) - 1) / monthlyRate * (1 + monthlyRate);
  const invested = monthlyInvestment * tenureMonths;
  const returns = maturityValue - invested;
  return {
    invested: roundTo(invested),
    returns: roundTo(returns),
    maturityValue: roundTo(maturityValue),
  };
}

export function calculateSWP(
  totalInvestment: number,
  withdrawalAmount: number,
  expectedReturn: number,
  tenureMonths: number
): { totalWithdrawn: number; remainingBalance: number; totalReturns: number } {
  const monthlyRate = expectedReturn / 12 / 100;
  let balance = totalInvestment;
  let totalWithdrawn = 0;
  for (let i = 0; i < tenureMonths; i++) {
    balance = balance * (1 + monthlyRate) - withdrawalAmount;
    totalWithdrawn += withdrawalAmount;
    if (balance <= 0) break;
  }
  if (balance < 0) balance = 0;
  return {
    totalWithdrawn: roundTo(totalWithdrawn),
    remainingBalance: roundTo(balance),
    totalReturns: roundTo(totalWithdrawn + balance - totalInvestment),
  };
}

export function calculateFD(
  principal: number,
  rate: number,
  tenureYears: number,
  compoundingFrequency: "yearly" | "half_yearly" | "quarterly" | "monthly" = "yearly"
): { maturityAmount: number; interestEarned: number } {
  const freqMap = { yearly: 1, half_yearly: 2, quarterly: 4, monthly: 12 };
  const n = freqMap[compoundingFrequency];
  const amount = principal * Math.pow(1 + rate / 100 / n, n * tenureYears);
  return {
    maturityAmount: roundTo(amount),
    interestEarned: roundTo(amount - principal),
  };
}

export function calculateRD(
  monthlyDeposit: number,
  rate: number,
  tenureYears: number
): { maturityAmount: number; totalInvested: number; interestEarned: number } {
  const n = tenureYears * 12;
  const monthlyRate = rate / 12 / 100;
  const maturity = monthlyDeposit * (Math.pow(1 + monthlyRate, n) - 1) / (1 - Math.pow(1 + monthlyRate, -1 / 3));
  const totalInvested = monthlyDeposit * n;
  return {
    maturityAmount: roundTo(maturity),
    totalInvested: roundTo(totalInvested),
    interestEarned: roundTo(maturity - totalInvested),
  };
}

export function calculateGST(
  amount: number,
  gstRate: number,
  mode: "inclusive" | "exclusive"
): { baseAmount: number; gstAmount: number; total: number } {
  if (mode === "exclusive") {
    const gstAmount = amount * gstRate / 100;
    return {
      baseAmount: roundTo(amount),
      gstAmount: roundTo(gstAmount),
      total: roundTo(amount + gstAmount),
    };
  }
  const baseAmount = amount * 100 / (100 + gstRate);
  return {
    baseAmount: roundTo(baseAmount),
    gstAmount: roundTo(amount - baseAmount),
    total: roundTo(amount),
  };
}

export function calculateIncomeTax(
  income: number,
  regime: "old" | "new" = "new"
): { tax: number; cess: number; totalTax: number; effectiveRate: number } {
  let tax = 0;
  if (regime === "new") {
    const slabs = [
      { limit: 300000, rate: 0 },
      { limit: 600000, rate: 5 },
      { limit: 900000, rate: 10 },
      { limit: 1200000, rate: 15 },
      { limit: 1500000, rate: 20 },
    ];
    const remaining = income;
    let prevLimit = 0;
    for (const slab of slabs) {
      const taxable = Math.min(Math.max(remaining - prevLimit, 0), slab.limit - prevLimit);
      tax += taxable * slab.rate / 100;
      prevLimit = slab.limit;
      if (remaining <= slab.limit) break;
    }
    if (remaining > 1500000) {
      tax += (remaining - 1500000) * 30 / 100;
    }
    if (income <= 1200000) tax = 0;
  } else {
    const deduction80C = 150000;
    const standardDeduction = 50000;
    let taxableIncome = income - standardDeduction - deduction80C;
    if (taxableIncome < 0) taxableIncome = 0;
    const slabs = [
      { limit: 250000, rate: 0 },
      { limit: 500000, rate: 5 },
      { limit: 1000000, rate: 20 },
    ];
    const remaining = taxableIncome;
    let prevLimit = 0;
    for (const slab of slabs) {
      const taxable = Math.min(Math.max(remaining - prevLimit, 0), slab.limit - prevLimit);
      tax += taxable * slab.rate / 100;
      prevLimit = slab.limit;
      if (remaining <= slab.limit) break;
    }
    if (remaining > 1000000) {
      tax += (remaining - 1000000) * 30 / 100;
    }
    if (taxableIncome <= 500000) tax = 0;
  }
  const cess = roundTo(tax * 4 / 100);
  tax = roundTo(tax);
  const totalTax = roundTo(tax + cess);
  const effectiveRate = income > 0 ? roundTo(totalTax / income * 100, 1) : 0;
  return { tax, cess, totalTax, effectiveRate };
}

export function calculateSalary(
  ctc: number,
  basicPercent: number = 50,
  hraPercent: number = 50,
  daPercent: number = 0
): { monthlyGross: number; annualGross: number; monthlyDeductions: number; annualDeductions: number; inHandMonthly: number; inHandAnnual: number } {
  const annualBasic = roundTo(ctc * basicPercent / 100);
  const annualHRA = roundTo(annualBasic * hraPercent / 100);
  const annualDA = roundTo(annualBasic * daPercent / 100);
  const annualGross = roundTo(annualBasic + annualHRA + annualDA);
  const annualPF = roundTo(Math.min(annualBasic * 12 / 100, 180000));
  const monthlyGross = roundTo(annualGross / 12);
  const monthlyDeductions = roundTo(annualPF / 12);
  const inHandAnnual = roundTo(annualGross - annualPF);
  const inHandMonthly = roundTo(inHandAnnual / 12);
  return {
    monthlyGross,
    annualGross,
    monthlyDeductions,
    annualDeductions: annualPF,
    inHandMonthly,
    inHandAnnual,
  };
}

export function calculateIdealWeight(
  height: number,
  gender: "male" | "female"
): { minWeight: number; maxWeight: number } {
  if (gender === "male") {
    return {
      minWeight: roundTo(50 + 2.3 * ((height - 152.4) / 2.54)),
      maxWeight: roundTo(50 + 2.3 * ((height - 152.4) / 2.54) + 10),
    };
  }
  return {
    minWeight: roundTo(45.5 + 2.3 * ((height - 152.4) / 2.54)),
    maxWeight: roundTo(45.5 + 2.3 * ((height - 152.4) / 2.54) + 10),
  };
}

export function calculateBodyFat(
  waist: number,
  neck: number,
  height: number,
  gender: "male" | "female",
  hip?: number
): { bodyFat: number; category: string } {
  let bodyFat: number;
  if (gender === "male") {
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else {
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + (hip ?? waist) - neck) + 0.221 * Math.log10(height)) - 450;
  }
  bodyFat = roundTo(bodyFat, 1);
  let category: string;
  if (gender === "male") {
    if (bodyFat < 6) category = "Essential fat";
    else if (bodyFat < 14) category = "Athletic";
    else if (bodyFat < 18) category = "Fit";
    else if (bodyFat < 25) category = "Average";
    else category = "Obese";
  } else {
    if (bodyFat < 14) category = "Essential fat";
    else if (bodyFat < 21) category = "Athletic";
    else if (bodyFat < 25) category = "Fit";
    else if (bodyFat < 32) category = "Average";
    else category = "Obese";
  }
  return { bodyFat, category };
}

export function calculateCalories(
  weight: number,
  height: number,
  age: number,
  gender: "male" | "female",
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active"
): { bmr: number; maintenance: number; cutting: number; bulking: number } {
  const bmr = gender === "male"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  const activityMultipliers = {
    sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9,
  };
  const maintenance = roundTo(bmr * activityMultipliers[activityLevel]);
  return {
    bmr: roundTo(bmr),
    maintenance,
    cutting: roundTo(maintenance - 500),
    bulking: roundTo(maintenance + 300),
  };
}

export function calculateWaterIntake(
  weight: number,
  weightUnit: "kg" | "lbs",
  activityMinutes: number
): { dailyWaterML: number; dailyWaterOz: number; dailyWaterCups: number } {
  const weightKg = weightUnit === "lbs" ? weight * 0.453592 : weight;
  const baseWater = weightKg * 33;
  const additionalWater = (activityMinutes / 30) * 350;
  const dailyWaterML = roundTo(baseWater + additionalWater);
  return {
    dailyWaterML,
    dailyWaterOz: roundTo(dailyWaterML / 29.5735, 1),
    dailyWaterCups: roundTo(dailyWaterML / 240, 1),
  };
}

export function calculatePregnancyDueDate(
  lastMenstrualPeriod: string,
  cycleLength: number = 28
): { dueDate: string; currentWeek: number; trimester: string; weeksLeft: number } {
  const lmp = new Date(lastMenstrualPeriod);
  const dueDate = new Date(lmp);
  dueDate.setDate(dueDate.getDate() + 280 + (cycleLength - 28));
  const today = new Date();
  const diffMs = today.getTime() - lmp.getTime();
  const currentWeek = Math.max(0, Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000)));
  const weeksLeft = Math.max(0, 40 - currentWeek);
  let trimester: string;
  if (currentWeek <= 13) trimester = "First Trimester";
  else if (currentWeek <= 27) trimester = "Second Trimester";
  else trimester = "Third Trimester";
  return {
    dueDate: dueDate.toISOString().split("T")[0],
    currentWeek: Math.min(currentWeek, 42),
    trimester,
    weeksLeft,
  };
}

export function calculateHeartRate(age: number): {
  maxHR: number;
  moderateMin: number;
  moderateMax: number;
  vigorousMin: number;
  vigorousMax: number;
} {
  const maxHR = 220 - age;
  return {
    maxHR,
    moderateMin: roundTo(maxHR * 0.64),
    moderateMax: roundTo(maxHR * 0.76),
    vigorousMin: roundTo(maxHR * 0.77),
    vigorousMax: roundTo(maxHR * 0.93),
  };
}

export function calculatePercentage(
  value: number,
  total: number
): { percentage: number; formatted: string } {
  const pct = total !== 0 ? roundTo((value / total) * 100, 2) : 0;
  return { percentage: pct, formatted: `${pct}%` };
}

export function calculatePercentageChange(
  oldValue: number,
  newValue: number
): { change: number; percentage: number } {
  const change = roundTo(newValue - oldValue);
  const percentage = oldValue !== 0 ? roundTo((change / oldValue) * 100, 2) : 0;
  return { change, percentage };
}

export function addFractions(
  num1: number, den1: number,
  num2: number, den2: number
): { numerator: number; denominator: number; simplified: string } {
  const num = num1 * den2 + num2 * den1;
  const den = den1 * den2;
  const gcd = findGCD(Math.abs(num), Math.abs(den));
  const sn = num / gcd;
  const sd = den / gcd;
  return {
    numerator: num,
    denominator: den,
    simplified: sd === 1 ? `${sn}` : `${sn}/${sd}`,
  };
}

export function subtractFractions(
  num1: number, den1: number,
  num2: number, den2: number
): { numerator: number; denominator: number; simplified: string } {
  const num = num1 * den2 - num2 * den1;
  const den = den1 * den2;
  const gcd = findGCD(Math.abs(num), Math.abs(den));
  const sn = num / gcd;
  const sd = den / gcd;
  return {
    numerator: num,
    denominator: den,
    simplified: sd === 1 ? `${sn}` : `${sn}/${sd}`,
  };
}

export function multiplyFractions(
  num1: number, den1: number,
  num2: number, den2: number
): { numerator: number; denominator: number; simplified: string } {
  const num = num1 * num2;
  const den = den1 * den2;
  const gcd = findGCD(Math.abs(num), Math.abs(den));
  const sn = num / gcd;
  const sd = den / gcd;
  return {
    numerator: num,
    denominator: den,
    simplified: sd === 1 ? `${sn}` : `${sn}/${sd}`,
  };
}

export function divideFractions(
  num1: number, den1: number,
  num2: number, den2: number
): { numerator: number; denominator: number; simplified: string } {
  return multiplyFractions(num1, den1, den2, num2);
}

export function findGCD(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function findLCM(a: number, b: number): number {
  return Math.abs(a * b) / findGCD(a, b);
}

export function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

export function getPrimesInRange(min: number, max: number): number[] {
  const primes: number[] = [];
  for (let n = Math.max(2, min); n <= max; n++) {
    if (isPrime(n)) primes.push(n);
  }
  return primes;
}

export function calculateMean(values: number[]): number {
  return values.length > 0 ? roundTo(values.reduce((a, b) => a + b, 0) / values.length, 2) : 0;
}

export function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? roundTo(sorted[mid], 2)
    : roundTo((sorted[mid - 1] + sorted[mid]) / 2, 2);
}

export function calculateMode(values: number[]): number[] {
  if (values.length === 0) return [];
  const freq = new Map<number, number>();
  values.forEach(v => freq.set(v, (freq.get(v) || 0) + 1));
  const maxFreq = Math.max(...freq.values());
  if (maxFreq === 1) return [];
  return Array.from(freq.entries())
    .filter(([, count]) => count === maxFreq)
    .map(([v]) => v)
    .sort((a, b) => a - b);
}

export function calculateStdDev(values: number[]): { stdDev: number; variance: number; mean: number } {
  const mean = calculateMean(values);
  if (values.length === 0) return { stdDev: 0, variance: 0, mean: 0 };
  const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
  return { stdDev: roundTo(Math.sqrt(variance), 2), variance: roundTo(variance, 2), mean };
}

export function matrixAdd(A: number[][], B: number[][]): number[][] | null {
  if (A.length !== B.length || A[0]?.length !== B[0]?.length) return null;
  return A.map((row, i) => row.map((val, j) => val + B[i][j]));
}

export function matrixSubtract(A: number[][], B: number[][]): number[][] | null {
  if (A.length !== B.length || A[0]?.length !== B[0]?.length) return null;
  return A.map((row, i) => row.map((val, j) => val - B[i][j]));
}

export function matrixMultiply(A: number[][], B: number[][]): number[][] | null {
  const aRows = A.length, aCols = A[0]?.length ?? 0;
  const bRows = B.length, bCols = B[0]?.length ?? 0;
  if (aCols !== bRows) return null;
  const result: number[][] = Array.from({ length: aRows }, () => Array(bCols).fill(0));
  for (let i = 0; i < aRows; i++) {
    for (let j = 0; j < bCols; j++) {
      for (let k = 0; k < aCols; k++) {
        result[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return result.map(row => row.map(v => roundTo(v)));
}

export function solveQuadratic(a: number, b: number, c: number): { root1: number | string; root2: number | string; discriminant: number } {
  const disc = roundTo(b * b - 4 * a * c);
  if (disc < 0) {
    const real = roundTo(-b / (2 * a));
    const imag = roundTo(Math.sqrt(Math.abs(disc)) / (2 * a));
    return { root1: `${real} + ${imag}i`, root2: `${real} - ${imag}i`, discriminant: disc };
  }
  const sqrtDisc = Math.sqrt(disc);
  return {
    root1: roundTo((-b + sqrtDisc) / (2 * a)),
    root2: roundTo((-b - sqrtDisc) / (2 * a)),
    discriminant: disc,
  };
}

export function solveLinear(a: number, b: number): { root: number | string } {
  if (a === 0) return { root: b === 0 ? "Infinite solutions" : "No solution" };
  return { root: roundTo(-b / a) };
}

export function calculateOhmsLaw(v: number | null, i: number | null, r: number | null): { voltage: number; current: number; resistance: number } {
  if (v === null && i !== null && r !== null) v = i * r;
  if (i === null && v !== null && r !== null) i = v / r;
  if (r === null && v !== null && i !== null) r = v / i;
  return {
    voltage: roundTo(v ?? 0),
    current: roundTo(i ?? 0, 4),
    resistance: roundTo(r ?? 0, 2),
  };
}

export function calculatePower(p: number | null, v: number | null, i: number | null, r: number | null): {
  power: number; voltage: number; current: number; resistance: number
} {
  if (p === null && v !== null && i !== null) p = v * i;
  else if (p === null && i !== null && r !== null) p = i * i * r;
  else if (p === null && v !== null && r !== null) p = v * v / r;
  if (v === null && p !== null && i !== null) v = p / i;
  else if (v === null && p !== null && r !== null) v = Math.sqrt(p * r);
  if (i === null && p !== null && v !== null) i = p / v;
  else if (i === null && p !== null && r !== null) i = Math.sqrt(p / r);
  if (r === null && v !== null && i !== null) r = v / i;
  else if (r === null && p !== null && i !== null) r = p / (i * i);
  else if (r === null && v !== null && p !== null) r = v * v / p;
  return {
    power: roundTo(p ?? 0, 2),
    voltage: roundTo(v ?? 0, 2),
    current: roundTo(i ?? 0, 4),
    resistance: roundTo(r ?? 0, 2),
  };
}

export function calculateVoltageDivider(
  vin: number, r1: number, r2: number
): { vout: number; ratio: number } {
  const vout = roundTo(vin * r2 / (r1 + r2));
  const ratio = roundTo(r2 / (r1 + r2), 4);
  return { vout, ratio };
}

export const RESISTOR_COLORS: Record<string, number> = {
  black: 0, brown: 1, red: 2, orange: 3, yellow: 4,
  green: 5, blue: 6, violet: 7, grey: 8, white: 9,
};

export const RESISTOR_MULTIPLIERS: Record<string, number> = {
  black: 1, brown: 10, red: 100, orange: 1000, yellow: 10000,
  green: 100000, blue: 1000000, violet: 10000000, grey: 100000000, white: 1000000000,
  gold: 0.1, silver: 0.01,
};

export function calculateResistor(
  band1: string, band2: string, multiplier: string, tolerance: string
): { resistance: number; tolerance: number; formatted: string } {
  const value = (RESISTOR_COLORS[band1] * 10 + RESISTOR_COLORS[band2]) * (RESISTOR_MULTIPLIERS[multiplier] ?? 1);
  const toleranceMap: Record<string, number> = { brown: 1, red: 2, gold: 5, silver: 10 };
  const tol = toleranceMap[tolerance] ?? 20;
  const formatted = value >= 1000000
    ? `${roundTo(value / 1000000, 2)} M\u2126`
    : value >= 1000
      ? `${roundTo(value / 1000, 2)} k\u2126`
      : `${value} \u2126`;
  return { resistance: value, tolerance: tol, formatted };
}

export function calculateConcrete(
  length: number, width: number, depth: number, unit: "ft" | "m"
): { volume: number; volumeUnit: string; cement: number; sand: number; aggregate: number } {
  const l = unit === "ft" ? length * 0.3048 : length;
  const w = unit === "ft" ? width * 0.3048 : width;
  const d = unit === "ft" ? depth * 0.3048 : depth;
  const volumeM3 = roundTo(l * w * d, 2);
  const volumeYd3 = roundTo(volumeM3 * 1.30795, 2);
  const cement = roundTo(volumeM3 * 350);
  const sand = roundTo(volumeM3 * 700);
  const aggregate = roundTo(volumeM3 * 1200);
  return { volume: volumeYd3, volumeUnit: "yd\u00B3", cement, sand, aggregate };
}

export function calculatePaint(
  wallArea: number, coats: number, areaUnit: "sqft" | "sqm"
): { paintLiters: number; paintGallons: number; primerLiters: number } {
  const area = areaUnit === "sqft" ? wallArea : wallArea * 10.7639;
  const paintLiters = roundTo((area / 350) * coats, 1);
  return {
    paintLiters,
    paintGallons: roundTo(paintLiters / 3.785, 1),
    primerLiters: roundTo(area / 400, 1),
  };
}

export function calculateTiles(
  area: number, tileLength: number, tileWidth: number, areaUnit: "sqft" | "sqm", tileUnit: "in" | "cm"
): { tilesNeeded: number; totalArea: number; wasteTiles: number; boxesNeeded: number } {
  const areaSqIn = areaUnit === "sqm" ? area * 1550 : area * 144;
  const tileAreaSqIn = tileUnit === "cm" ? (tileLength / 2.54) * (tileWidth / 2.54) : tileLength * tileWidth;
  const tilesNeeded = Math.ceil(areaSqIn / tileAreaSqIn);
  const wasteTiles = Math.ceil(tilesNeeded * 0.1);
  return {
    tilesNeeded,
    totalArea: roundTo(area),
    wasteTiles,
    boxesNeeded: Math.ceil((tilesNeeded + wasteTiles) / 10),
  };
}

export function calculateRoofing(
  length: number, width: number, pitch: number, unit: "ft" | "m"
): { roofArea: number; roofAreaUnit: string; sheetsNeeded: number; nails: number } {
  const l = unit === "m" ? length * 3.28084 : length;
  const w = unit === "m" ? width * 3.28084 : width;
  const pitchFactor = Math.sqrt(1 + Math.pow(pitch / 12, 2));
  const roofArea = roundTo(l * w * pitchFactor, 2);
  const sheetsNeeded = Math.ceil(roofArea / 32);
  return { roofArea, roofAreaUnit: "sq ft", sheetsNeeded, nails: sheetsNeeded * 80 };
}

export function calculateFlooring(
  area: number, areaUnit: "sqft" | "sqm", plankLength: number, plankWidth: number, plankUnit: "in" | "cm"
): { planksNeeded: number; waste: number; boxesNeeded: number; totalCostMultiplier: number } {
  const areaSqIn = areaUnit === "sqm" ? area * 1550 : area * 144;
  const plankAreaSqIn = plankUnit === "cm" ? (plankLength / 2.54) * (plankWidth / 2.54) : plankLength * plankWidth;
  const planksNeeded = Math.ceil(areaSqIn / plankAreaSqIn);
  const waste = Math.ceil(planksNeeded * 0.1);
  return { planksNeeded, waste, boxesNeeded: Math.ceil((planksNeeded + waste) / 20), totalCostMultiplier: 1.1 };
}

export function calculateDiscount(
  originalPrice: number, discountPercent: number
): { discountAmount: number; finalPrice: number; savings: number } {
  const discountAmount = roundTo(originalPrice * discountPercent / 100);
  return {
    discountAmount,
    finalPrice: roundTo(originalPrice - discountAmount),
    savings: discountAmount,
  };
}

export function calculateTip(
  billAmount: number, tipPercent: number, splitCount: number = 1
): { tipAmount: number; total: number; perPerson: number } {
  const tipAmount = roundTo(billAmount * tipPercent / 100);
  const total = roundTo(billAmount + tipAmount);
  return { tipAmount, total, perPerson: roundTo(total / splitCount) };
}

export function calculateFuelCost(
  distance: number, mileage: number, fuelPrice: number,
  distanceUnit: "km" | "mi", mileageUnit: "kmpl" | "mpg"
): { fuelNeeded: number; totalCost: number; costPerKm: number } {
  const d = distanceUnit === "mi" ? distance * 1.60934 : distance;
  const m = mileageUnit === "mpg" ? mileage * 0.425144 : mileage;
  const fuelNeeded = roundTo(d / m, 2);
  return {
    fuelNeeded,
    totalCost: roundTo(fuelNeeded * fuelPrice),
    costPerKm: roundTo(fuelNeeded * fuelPrice / d, 2),
  };
}

export function calculateAge(
  birthDate: string,
  ageAtDate?: string
): { years: number; months: number; days: number; weeks: number; totalDays: number; totalHours: number; totalMinutes: number; totalSeconds: number; nextBirthday: string } {
  const birth = new Date(birthDate);
  const target = ageAtDate ? new Date(ageAtDate) : new Date();
  let years = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth() - birth.getMonth();
  let days = target.getDate() - birth.getDate();
  if (days < 0) {
    months--;
    const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
  const totalHours = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60));
  const totalMinutes = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60));
  const totalSeconds = Math.floor((target.getTime() - birth.getTime()) / 1000);
  const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday <= target) {
    nextBirthday.setFullYear(target.getFullYear() + 1);
  }
  return {
    years, months, days,
    weeks: Math.floor(totalDays / 7),
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    nextBirthday: nextBirthday.toISOString().split("T")[0],
  };
}

export function calculateDateAdd(
  date: string, days: number
): { resultDate: string; dayOfWeek: string } {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return {
    resultDate: d.toISOString().split("T")[0],
    dayOfWeek: daysOfWeek[d.getDay()],
  };
}

export function calculateDaysBetween(
  date1: string, date2: string
): { totalDays: number; weeks: number; months: number; years: number; weekdays: number; weekends: number } {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffMs = Math.abs(d2.getTime() - d1.getTime());
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  let weekdays = 0;
  let weekends = 0;
  const start = new Date(Math.min(d1.getTime(), d2.getTime()));
  const end = new Date(Math.max(d1.getTime(), d2.getTime()));
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const day = d.getDay();
    if (day === 0 || day === 6) weekends++;
    else weekdays++;
  }
  return {
    totalDays,
    weeks: Math.floor(totalDays / 7),
    months: Math.floor(totalDays / 30.44),
    years: Math.floor(totalDays / 365.25),
    weekdays,
    weekends,
  };
}

export function calculateTimeDuration(
  startTime: string, endTime: string
): { hours: number; minutes: number; totalMinutes: number; inHours: number } {
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  const startMinutes = sh * 60 + sm;
  const endMinutes = eh * 60 + em;
  let diff = endMinutes - startMinutes;
  if (diff < 0) diff += 24 * 60;
  return {
    hours: Math.floor(diff / 60),
    minutes: diff % 60,
    totalMinutes: diff,
    inHours: roundTo(diff / 60, 2),
  };
}

export function calculateWeek(
  date: string
): { weekNumber: number; year: number; weekStart: string; weekEnd: string; month: number; dayOfYear: number } {
  const d = new Date(date);
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((d.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const weekNumber = Math.ceil(dayOfYear / 7);
  const dayOfWeek = d.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const weekStart = new Date(d);
  weekStart.setDate(d.getDate() + mondayOffset);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  return {
    weekNumber,
    year: d.getFullYear(),
    weekStart: weekStart.toISOString().split("T")[0],
    weekEnd: weekEnd.toISOString().split("T")[0],
    month: d.getMonth() + 1,
    dayOfYear,
  };
}

export function calculateMonthDifference(
  date1: string, date2: string
): { totalMonths: number; totalDays: number; firstDayOfMonth: string; lastDayOfMonth: string; calendar: number[][] } {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const totalMonths = (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth());
  const totalDays = Math.floor(Math.abs(d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  const firstDay = new Date(d1.getFullYear(), d1.getMonth(), 1);
  const lastDay = new Date(d1.getFullYear(), d1.getMonth() + 1, 0);
  const calendar: number[][] = [];
  const startDay = firstDay.getDay();
  let row: number[] = Array(startDay).fill(0);
  for (let i = 1; i <= lastDay.getDate(); i++) {
    row.push(i);
    if (row.length === 7) {
      calendar.push(row);
      row = [];
    }
  }
  if (row.length > 0) {
    while (row.length < 7) row.push(0);
    calendar.push(row);
  }
  return {
    totalMonths,
    totalDays,
    firstDayOfMonth: firstDay.toISOString().split("T")[0],
    lastDayOfMonth: lastDay.toISOString().split("T")[0],
    calendar,
  };
}

export function calculateGPA(
  grades: { credit: number; gradePoint: number }[]
): { gpa: number; totalCredits: number; totalGradePoints: number } {
  const totalCredits = grades.reduce((s, g) => s + g.credit, 0);
  const totalGradePoints = grades.reduce((s, g) => s + g.credit * g.gradePoint, 0);
  return {
    gpa: totalCredits > 0 ? roundTo(totalGradePoints / totalCredits, 2) : 0,
    totalCredits,
    totalGradePoints,
  };
}

export function calculateCGPA(
  semesters: { credits: number; gpa: number }[]
): { cgpa: number; totalCredits: number } {
  const totalCredits = semesters.reduce((s, sem) => s + sem.credits, 0);
  const totalGradePoints = semesters.reduce((s, sem) => s + sem.credits * sem.gpa, 0);
  return {
    cgpa: totalCredits > 0 ? roundTo(totalGradePoints / totalCredits, 2) : 0,
    totalCredits,
  };
}

export function calculateGrade(
  score: number, total: number
): { percentage: number; letterGrade: string; gradePoint: number; pass: boolean } {
  const percentage = total > 0 ? roundTo((score / total) * 100, 1) : 0;
  let letterGrade: string;
  let gradePoint: number;
  if (percentage >= 90) { letterGrade = "A+"; gradePoint = 4.0; }
  else if (percentage >= 80) { letterGrade = "A"; gradePoint = 3.7; }
  else if (percentage >= 70) { letterGrade = "B+"; gradePoint = 3.3; }
  else if (percentage >= 60) { letterGrade = "B"; gradePoint = 3.0; }
  else if (percentage >= 50) { letterGrade = "C"; gradePoint = 2.0; }
  else if (percentage >= 40) { letterGrade = "D"; gradePoint = 1.0; }
  else { letterGrade = "F"; gradePoint = 0.0; }
  return { percentage, letterGrade, gradePoint, pass: percentage >= 40 };
}

export const EXCHANGE_RATES: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.50, INR: 83.15,
  CAD: 1.36, AUD: 1.53, CNY: 7.24, BRL: 5.05, KRW: 1320.00,
  SGD: 1.34, CHF: 0.88, MXN: 17.15, HKD: 7.82, NZD: 1.62,
  SEK: 10.45, NOK: 10.65, DKK: 6.88, ZAR: 18.50, TRY: 30.25,
  RUB: 91.00, PLN: 4.02, THB: 35.50, IDR: 15700, HUF: 355.00,
  CZK: 23.00, ILS: 3.68, CLP: 935.00, PHP: 56.00, AED: 3.67,
  SAR: 3.75, MYR: 4.72, RON: 4.58,
};

export const CURRENCY_NAMES: Record<string, string> = {
  USD: "US Dollar", EUR: "Euro", GBP: "British Pound", JPY: "Japanese Yen",
  INR: "Indian Rupee", CAD: "Canadian Dollar", AUD: "Australian Dollar",
  CNY: "Chinese Yuan", BRL: "Brazilian Real", KRW: "South Korean Won",
  SGD: "Singapore Dollar", CHF: "Swiss Franc", MXN: "Mexican Peso",
  HKD: "Hong Kong Dollar", NZD: "New Zealand Dollar", SEK: "Swedish Krona",
  NOK: "Norwegian Krone", DKK: "Danish Krone", ZAR: "South African Rand",
  TRY: "Turkish Lira", RUB: "Russian Ruble", PLN: "Polish Zloty",
  THB: "Thai Baht", IDR: "Indonesian Rupiah", HUF: "Hungarian Forint",
  CZK: "Czech Koruna", ILS: "Israeli Shekel", CLP: "Chilean Peso",
  PHP: "Philippine Peso", AED: "UAE Dirham", SAR: "Saudi Riyal",
  MYR: "Malaysian Ringgit", RON: "Romanian Leu",
};

export function convertCurrency(
  amount: number, from: string, to: string
): { converted: number; rate: number; formatted: string } {
  const usdAmount = amount / EXCHANGE_RATES[from];
  const converted = roundTo(usdAmount * EXCHANGE_RATES[to], 2);
  const rate = roundTo(EXCHANGE_RATES[to] / EXCHANGE_RATES[from], 6);
  return { converted, rate, formatted: converted.toFixed(2) };
}
