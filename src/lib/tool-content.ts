import { blogs } from "@/data/blogs";
import { calculators } from "@/data/calculators";
import type { CalculatorDefinition } from "@/types/calculators";

export function findBlogForTool(slug: string) { return findBlogsForTool(slug)[0]; }
export function findBlogsForTool(slug: string) { return blogs.filter(post => post.relatedTools?.some(tool => tool.slug === slug)); }

const calculatorFormulas: Record<string, string> = {
  "emi-calculator": "EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is the loan amount, r is the monthly interest rate (annual rate divided by 12 and 100), and n is the total number of monthly installments.",
  "loan-calculator": "Monthly Payment = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is the loan principal, r is the monthly interest rate, and n is the total number of payments.",
  "mortgage-calculator": "Monthly Mortgage = (Principal × r × (1 + r)^n) / ((1 + r)^n - 1) + (Property Tax / 12) + (Insurance / 12), where r is the monthly interest rate and n is the total months.",
  "interest-calculator": "Simple Interest = P × R × T / 100, where P is the principal amount, R is the annual interest rate, and T is the time period in years. Total Amount = Principal + Interest.",
  "compound-interest-calculator": "A = P × (1 + r/n)^(n×t), where P is the principal, r is the annual rate, n is compounding frequency per year, and t is the time in years.",
  "sip-calculator": "M = P × ((1 + r)^n - 1) / r × (1 + r), where P is the monthly investment, r is the monthly rate of return, and n is the total number of investments.",
  "swp-calculator": "Each month: Balance = Previous Balance × (1 + r) - Withdrawal Amount, where r is the monthly rate of return. Iterated over the withdrawal period.",
  "fd-calculator": "Maturity Amount = P × (1 + R/(100×n))^(n×T), where P is the deposit amount, R is the annual rate, n is the compounding frequency, and T is the tenure in years.",
  "rd-calculator": "Monthly effective rate i = (1 + annual rate / 400)^(1/3) - 1. For beginning-of-month deposits: maturity = deposit × ((1+i)^n - 1) / i × (1+i). At zero interest, maturity equals deposit × n.",
  "gst-calculator": "For Exclusive: GST Amount = Base × Rate / 100. For Inclusive: Base = Total × 100 / (100 + Rate), GST Amount = Total - Base.",
  "tax-calculator": "Tax is computed using progressive tax slabs. For the new regime: 0% up to 3L, 5% from 3-6L, 10% from 6-9L, 15% from 9-12L, 20% from 12-15L, 30% above 15L (with rebate up to 12L). For the old regime: standard deduction and 80C deductions applied before slab calculation.",
  "salary-calculator": "Annual Gross = Basic + HRA. Basic = CTC × Basic%. HRA = Basic × HRA%. PF = min(Basic × 12%, 180000). In-Hand = Gross - PF.",
  "currency-converter": "Converted Amount = (Amount / Rate from) × Rate to. All rates are relative to USD as the base currency.",
  "bmi-calculator": "BMI = Weight (kg) / (Height (m))^2. BMI categories: Underweight (<18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (≥30).",
  "bmr-calculator": "Mifflin-St Jeor Equation: For men: BMR = 10W + 6.25H - 5A + 5. For women: BMR = 10W + 6.25H - 5A - 161, where W is weight in kg, H is height in cm, and A is age in years. TDEE = BMR × Activity Multiplier.",
  "body-fat-calculator": "US Navy Method: For men: BF% = 495 / (1.0324 - 0.19077 × log10(Waist - Neck) + 0.15456 × log10(Height)) - 450. For women: BF% = 495 / (1.29579 - 0.35004 × log10(Waist + Hip - Neck) + 0.221 × log10(Height)) - 450.",
  "calorie-calculator": "BMR = (10W + 6.25H - 5A + 5) for men or (10W + 6.25H - 5A - 161) for women. TDEE = BMR × Activity Factor. Cutting = TDEE - 500, Bulking = TDEE + 300.",
  "water-intake-calculator": "Daily Water (ml) = Weight (kg) × 33 + (Exercise Minutes / 30) × 350. Additional water is needed for physical activity.",
  "pregnancy-calculator": "Due Date = LMP + 280 days (40 weeks) adjusted for cycle length. Weeks Left = 40 - Current Week (adjusted for cycle length).",
  "heart-rate-calculator": "Maximum HR = 220 - Age. Heart Rate Reserve = Max HR - Resting HR. Target Zone = HRR × Intensity% + Resting HR. Uses the Karvonen formula for personalized zones.",
  "ideal-weight-calculator": "Devine Formula: For men: Ideal Weight (kg) = 50 + 2.3 × (Height in inches - 60). For women: Ideal Weight (kg) = 45.5 + 2.3 × (Height in inches - 60). Range = Ideal ± 5 kg.",
  "percentage-calculator": "Percentage = (Value / Total) × 100. Percentage Change = ((New - Old) / Old) × 100. For increase/decrease: Difference / Original × 100.",
  "fraction-calculator": "Addition: a/b + c/d = (ad + bc)/bd. Subtraction: a/b - c/d = (ad - bc)/bd. Multiplication: a/b × c/d = ac/bd. Division: a/b ÷ c/d = ad/bc. Results are simplified using the greatest common divisor.",
  "gcf-lcm-calculator": "GCF: Euclidean algorithm — repeatedly subtract or divide until remainder is zero. LCM = |a × b| / GCF(a, b). GCF × LCM = a × b always holds.",
  "prime-number-calculator": "A number n is prime if it has no divisors other than 1 and itself. This is checked by testing divisibility by all integers from 2 to √n. Prime factorization divides the number by successive primes.",
  "equation-solver": "Linear: ax + b = 0 → x = -b/a. Quadratic: ax² + bx + c = 0 → x = (-b ± √(b² - 4ac)) / 2a. The discriminant D = b² - 4ac determines the nature of roots.",
  "age-calculator": "Age = Target Date - Birth Date. The calculation accounts for month lengths, leap years, and calendar quirks. Results are exact to the day and can be displayed in multiple units.",
  "date-calculator": "Result Date = Start Date + Number of Days. Negative values subtract days. The JavaScript Date object handles all calendar edge cases including leap years and month boundaries.",
  "days-between-dates": "Total Days = |End Date - Start Date| in milliseconds / 86400000. Weekdays and weekends are counted by iterating through the range.",
  "time-duration-calculator": "Duration = End Time - Start Time in minutes. If End < Start, 24 hours (1440 min) are added. Results are also expressed in decimal hours.",
  "week-calculator": "Week Number = ceil(Day of Year / 7). Day of Year = (Date - Jan 1) + 1. Week starts Monday. Week End = Week Start + 6 days.",
  "month-calculator": "Month Difference = (Year2 - Year1) × 12 + (Month2 - Month1). The first and last days of the start month are determined from the date object.",
  "ohms-law-calculator": "Ohm's Law: V = I × R, where V is voltage in volts, I is current in amperes, and R is resistance in ohms. Power: P = V × I = I² × R = V² / R.",
  "voltage-divider-calculator": "Vout = Vin × R2 / (R1 + R2). The voltage divides proportionally across the resistors. Ratio = R2 / (R1 + R2).",
  "power-calculator": "P = V × I, P = I² × R, P = V² / R. Given any two of the four values (P, V, I, R), the remaining two are calculated automatically.",
  "resistor-calculator": "Resistance = (Digit1 × 10 + Digit2) × Multiplier. Color bands represent digits: Black=0, Brown=1, Red=2, Orange=3, Yellow=4, Green=5, Blue=6, Violet=7, Grey=8, White=9.",
  "watt-calculator": "Watts = Volts × Amps. Using the power wheel, entering any two values (watts, volts, amps, ohms) automatically computes the remaining two values.",
  "concrete-calculator": "Volume = Length × Width × Depth. Materials based on 1:2:4 mix ratio: Cement = Volume × 350 kg/m³, Sand = Volume × 700 kg/m³, Aggregate = Volume × 1200 kg/m³.",
  "paint-calculator": "Paint Needed (L) = Area (sq ft) / 350 × Number of Coats. One liter covers approximately 350 sq ft for smooth surfaces. Primer coverage: 400 sq ft per liter.",
  "tile-calculator": "Number of Tiles = (Area × 144) / (Tile Length × Tile Width) in inches. Total = Tiles + 10% Waste. Boxes = Ceil(Total / 10).",
  "roofing-calculator": "Roof Area = Floor Area × Pitch Factor. Pitch Factor = √(1 + (Rise/12)²). The slope multiplier accounts for the increased surface area of a pitched roof.",
  "flooring-calculator": "Planks Needed = (Area × 144) / (Plank Length × Plank Width in inches). Total = Planks + 10% Waste. Boxes = Ceil(Total / 20).",
  "discount-calculator": "Discount Amount = Original Price × Discount% / 100. Final Price = Original Price - Discount Amount. Savings Percentage = Discount%.",
  "tip-calculator": "Tip Amount = Bill Amount × Tip% / 100. Total Bill = Bill Amount + Tip. Each Pays = Total Bill / Number of People.",
  "split-bill-calculator": "Each Person Pays = Total Amount / Number of People. Remainder = Total Amount - (Each × People), accounting for rounding differences.",
  "fuel-cost-calculator": "Fuel Needed = Distance / Fuel Efficiency. Total Cost = Fuel Needed × Price per Liter. All units are converted to metric for consistent calculation.",
  "ai-token-cost-calculator": "Input Cost = (Input Tokens / 1,000,000) × Input Price. Output Cost = (Output Tokens / 1,000,000) × Output Price. Cost Per Request = Input Cost + Output Cost. Daily Cost = Cost Per Request × Requests Per Day. Monthly Cost = Daily Cost × Days Per Month. Annual Cost = Monthly Cost × 12.",
  "fire-number-calculator": "FIRE Number = Annual Expenses / Safe Withdrawal Rate. For example, ₹10,00,000 annual expenses at 4% withdrawal rate gives a FIRE target of ₹2.5 Crore. Portfolio Growth: FV = P(1+r)^n + PMT × [((1+r)^n - 1)/r], where P is current investments, PMT is annual contributions, r is expected return, and n is years until retirement.",
  "student-loan-repayment-calculator": "Standard Monthly Payment: M = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is the loan amount, r is the monthly interest rate (annual rate / 12 / 100), and n is the total number of months. IBR Payment: 10% of discretionary income / 12, where discretionary income = max(0, AGI - 150% of poverty line). Forgiveness: remaining balance after 25 years (IBR) or 10 years (PSLF) of qualifying payments is forgiven.",
  "estimated-tax-calculator-self-employed": "Net Business Income = Revenue - Expenses. Self-Employment Tax = Net Business Income × 0.9235 × 0.153 (12.4% SS + 2.9% Medicare). SE Deduction = SE Tax / 2. Federal Tax = Progressive brackets applied to (Net Income + Other Income - Standard Deduction - Additional Deductions). Quarterly Payment = (Total Annual Tax - Tax Already Paid) × Quarter Factor. Safe Harbor: Pay 100% of previous year's tax (110% if AGI > $150k) to avoid underpayment penalties.",
  "home-equity-loan-calculator": "Monthly Payment = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is the loan amount, r is the monthly interest rate (annual rate / 12 / 100), and n is the total number of months. Available Equity = Home Value - Mortgage Balance. Combined LTV = (Mortgage Balance + New Loan) / Home Value × 100. Maximum Borrowing = (Home Value × 80% LTV Limit) - Mortgage Balance.",
  "scientific-calculator": "The Scientific Calculator evaluates expressions using standard operator precedence: Parentheses first, then Exponents, Multiplication/Division (left to right), and Addition/Subtraction (left to right). Trigonometric functions (sin, cos, tan) accept degrees or radians. Logarithmic functions use base 10 (log) or natural base e (ln). Factorial n! = n × (n-1) × (n-2) × ... × 1.",
  "matrix-calculator": "Matrix Addition: C[i][j] = A[i][j] + B[i][j]. Matrix Subtraction: C[i][j] = A[i][j] - B[i][j]. Matrix Multiplication: C[i][j] = Σ(A[i][k] × B[k][j]) for k = 1 to n. Scalar Multiplication: C[i][j] = k × A[i][j]. The identity matrix I has 1s on the diagonal and 0s elsewhere.",
  "paycheck-calculator": "Gross Pay = Annual Salary / Pay Periods Per Year. Federal Income Tax = Progressive brackets applied to taxable income (gross - pre-tax deductions). FICA = 6.2% Social Security + 1.45% Medicare. State Tax = State-specific brackets. Net Pay = Gross Pay - (Federal Tax + FICA + State Tax + Pre-tax Deductions + Post-tax Deductions).",
  "home-affordability-calculator": "Maximum Affordable Price = (Affordable Monthly Payment × (1 - (1 + r)^-n) / r) + Down Payment. Affordable Monthly Payment = Monthly Income × 28% (front-end ratio). Total Debt-to-Income = (Housing Payment + Monthly Debts) / Monthly Income. Most lenders require front-end ≤ 28% and back-end ≤ 36%.",
  "rent-vs-buy-calculator": "Buying: Total Cost = (Monthly Mortgage + Property Tax + Insurance + Maintenance) × Months - Home Appreciation. Renting: Total Cost = (Monthly Rent × (1 + Rent Increase)^Years) + Invested Down Payment Returns. Breakeven Year = The year when cumulative buying cost becomes less than cumulative renting cost. The 5% rule: buy if rent exceeds 5% of home price annually.",
  "401k-calculator": "Your Contribution = Annual Salary × Your Contribution %. Employer Match = Annual Salary × Employer Match % (up to company limit). Annual Growth = (Starting Balance + Contributions) × (1 + Annual Return %). Future Value = Sum of all yearly projections until retirement age using compound growth.",
  "ev-charging-cost-calculator": "Energy Needed (kWh) = Battery Capacity × (Target % - Current %) / 100 × (1 / Charger Efficiency % × 100). Home Cost = Energy Needed × Home Electricity Rate. Public Cost = Energy Needed × Public Charging Rate. Monthly Cost = (Energy Needed × Rate × Charges Per Month). Cost Per Mile = Cost Per Charge / (Battery Capacity × Efficiency).",
  "youtube-money-calculator": "Estimated Revenue = Total Views × RPM / 1000. CPM-Based Revenue = (Total Views / 1000) × CPM. Monthly Revenue = (Views Per Video × Videos Per Month) × RPM / 1000. YouTube's cut is 45% of ad revenue, leaving the creator with 55%. RPM is the actual earnings per 1000 views after YouTube's share.",
  "roi-calculator": "ROI = ((Final Value - Initial Investment - Additional Costs) / (Initial Investment + Additional Costs)) × 100. Annualized ROI = ((1 + ROI)^(1/Years) - 1) × 100. Net Profit = Final Value - Initial Investment - Additional Costs. A positive ROI indicates profit; negative indicates loss.",
  "freelance-rate-calculator": "Hourly Rate = (Desired Annual Income + Business Expenses + (Desired Income × Tax Rate / 100)) / (Billable Hours Per Week × (52 - Vacation Weeks)). Required Annual Revenue = Desired Income + Business Expenses + Taxes. Break-even Rate = Total Annual Costs / Total Billable Hours.",
  "tfsa-contribution-room-calculator-canada": "Current Year Limit = Annual TFSA Limit set by CRA ($7,000 in 2025, $6,500 in 2024, $6,000 for 2023, and varies by year since 2009). Unused Room = Cumulative Limit - Total Contributions Made + Previous Year Withdrawals. Contribution Room Available = Current Year Limit + Unused Room from Previous Years + Withdrawals from Previous Year.",
  "rrsp-contribution-tax-savings-calculator": "RRSP Deduction Limit = Lesser of (18% of Previous Year Earned Income) or (Annual Dollar Limit). Tax Savings = RRSP Contribution Amount × Marginal Tax Rate. Refund = Tax Savings - Any Withholding Tax. The marginal tax rate depends on province and income level, ranging from ~20% to ~53% in Canada.",
  "ontario-take-home-pay-calculator-after-tax": "Gross Annual = Annual Salary. CPP Contribution = 5.95% of (Gross - $3,500 Basic Exemption) up to $66,600 pensionable earnings. EI Premiums = 1.63% of Gross up to $63,200. Federal Tax = Progressive brackets (15% to 33%). Ontario Tax = Progressive brackets (5.05% to 13.16%). Net Pay = Gross - CPP - EI - Federal Tax - Ontario Tax.",
  "canada-mortgage-stress-test-calculator": "Stress Test Rate = Greater of (Contract Rate + 2%) or 5.25%. GDS Ratio = (Mortgage Payment + Property Tax + Heating + 50% Condo Fees) / Gross Household Income. TDS Ratio = (Housing Costs + All Debt Payments) / Gross Household Income. GDS must be ≤ 39% and TDS must be ≤ 44% to qualify under the B-20 guidelines.",
  "canada-child-benefit-calculator-by-income": "CCB Base Amount per child under 6: $7,787 per year. CCB Base per child 6-17: $6,570 per year. Reduction begins when AFNI exceeds $36,502. Reduction rate: 7% for first child, 3.2% for second child, etc. Ontario Child Benefit: up to $1,563 per child for families with AFNI under $24,228. Payments are tax-free and issued monthly.",
  "ontario-severance-pay-calculator": "ESA Notice Pay = 1 week per year of service × Regular Weekly Pay (max 8 weeks if less than 5 years, max 12 weeks if 5+ years). Statutory Severance = 1 week per year of service × Regular Weekly Pay (if payroll > $2.5M or severance > $500k). Common Law Entitlement = 1 month per year of service (rough guideline, varies significantly by age, position, and job market). Total = Notice + Severance + Benefits Continuation.",
  "gst-hst-calculator-ontario": "Ontario HST = 13% (5% Federal GST + 8% Provincial PST). GST Amount = Amount × 5/105 (for tax-inclusive). PST Amount = Amount × 8/108 (for tax-inclusive). HST Added = Amount × 13%. HST Included = Amount - (Amount × 100/113). The HST applies to most goods and services in Ontario.",
  "1099-tax-calculator-for-freelancers": "Net Self-Employment Income = Total 1099 Income - Business Expenses. Self-Employment Tax = Net SE Income × 0.9235 × 0.153 (12.4% Social Security up to annual limit + 2.9% Medicare no limit). Deductible SE Tax = SE Tax × 0.5. AGI = Net SE Income + Other Income - Deductible SE Tax - 50% SE Tax. Total Tax = SE Tax + Federal Income Tax + State Income Tax - Estimated Payments Made.",
  "overtime-pay-calculator-for-hourly-employees": "Regular Pay = Regular Hours × Hourly Rate. Overtime Pay = Overtime Hours × Hourly Rate × Overtime Multiplier (typically 1.5x). Double Time Pay = Double Time Hours × Hourly Rate × 2. Gross Pay = Regular Pay + Overtime Pay + Double Time Pay. Per Period: Gross Pay is multiplied by pay periods per year for annual totals.",
  "debt-to-income-ratio-calculator-for-mortgage-approval": "Front-End DTI (Housing Ratio) = Monthly Housing Payment / Gross Monthly Income × 100. Back-End DTI (Total Debt Ratio) = (Monthly Housing Payment + Other Monthly Debts) / Gross Monthly Income × 100. Conventional loans require front-end ≤ 28% and back-end ≤ 36%. FHA allows up to 31%/43%. USDA up to 29%/41%. VA has no front-end limit but back-end ≤ 41%.",
  "cash-flow-forecast-calculator": "Net Cash Flow = Total Income - Total Expenses. Ending Balance = Opening Balance + Net Cash Flow. Running Balance = Previous Month's Ending Balance + Current Month's Net Cash Flow. Cash Runway = Current Cash / Average Monthly Burn Rate. A negative net cash flow indicates a potential cash shortage that needs to be addressed.",
  "car-depreciation-calculator": "Year 1 Depreciation: 15-25% of purchase price depending on make and model. Year 2-5 Depreciation: 10-15% per year. After 5 years, most vehicles retain 40-60% of original value. Higher mileage reduces value by approximately $0.10-0.20 per mile above average. Poor condition can reduce value by an additional 15-25%.",
  "severance-pay-calculator": "Gross Severance = (Annual Salary / 52) × Weeks of Pay Per Year of Service × Years of Service. Bonus Payout = Full Bonus Amount if applicable. PTO Payout = Unused PTO Hours × Hourly Rate. Total Gross = Gross Severance + Bonus Payout + PTO Payout + Other Benefits. Estimated Net = Total Gross × (1 - Tax Rate / 100). Lump Sum = Total Net if paid as one-time payment.",
  "inheritance-tax-calculator": "Taxable Estate = Total Estate Value - Debts - Funeral Expenses - Charitable Donations - Spouse Exemption - Other Deductions - Lifetime Gifts. Federal Estate Tax (US): 40% on taxable estate above $13.61 million exemption (2024). State Inheritance Tax: Varies by state, 0-20% depending on relationship to deceased. Per Beneficiary Share = (Taxable Estate - Total Tax) / Number of Beneficiaries.",
  "emergency-fund-calculator": "Target Emergency Fund = Monthly Essential Expenses × (3 to 12 months depending on job stability). Stability Multiplier: Salaried = 3x, Contract = 6x, Self-Employed = 9x, Variable Income = 12x. Monthly Savings Needed = (Target Fund - Existing Savings) / (Months to Save). Total Protection = Existing Savings + (Monthly Savings × Months Saved) × (1 + Annual Return / 12)^Months.",
  "cd-ladder-calculator": "Per CD Maturity Value = (Investment Per CD) × (1 + Annual Rate / Compounding Periods)^(Compounding Periods × Term in Years). Total Maturity = Sum of all CD maturity values. Rollover Value = Maturing CD + Interest reinvested at new rate. Average Yield = (Total Interest / Total Investment) / Average Term × 100. A 3-rung ladder with 1-year CDs has one CD maturing every 4 months.",
};

function exampleContent(calc: CalculatorDefinition, inputs: Record<string, string | number>): string | null {
  try {
    const outputs = calc.compute(inputs);
    if (!outputs.length || outputs.some(output => typeof output.value === "number" && !Number.isFinite(output.value))) return null;
    const inputText = Object.entries(inputs).map(([key, value]) => {
      const input = calc.inputs.find(entry => entry.key === key);
      const display = input?.options?.find(option => option.value === value)?.label ?? value;
      return (input?.label ?? key) + ": " + display;
    }).join("\n");
    const outputText = outputs.map(output => output.label + ": " + (typeof output.value === "number" ? output.value.toLocaleString("en-US", {maximumFractionDigits: 2}) : output.value) + (output.unit ? " " + output.unit : "")).join("\n");
    return "Inputs\n" + inputText + "\n\nCalculated outputs\n" + outputText + "\n\nThese outputs illustrate the model and its rounding; they are not a quote, diagnosis or guarantee.";
  } catch { return null; }
}

export function getCalculatorContent(calc: CalculatorDefinition): {title: string; body: string}[] {
  const sections = [{ title: "About this calculator", body: calc.description }];
  const formula = calc.slug === "rd-calculator" ? calculatorFormulas[calc.slug] : (calc.formula || calculatorFormulas[calc.slug]);
  if (formula) sections.push({ title: "Formula and method", body: formula + "\nUse consistent units. Rates and durations must use the same time basis. At a zero interest rate, loan payments equal principal divided by the number of payments." });
  sections.push({ title: "How to use", body: calc.inputs.map((input, index) => (index + 1) + ". " + input.label + (input.type === "select" ? ": choose the option that matches your situation." : ": enter a value in the displayed units.")).join("\n") + "\n" + (calc.inputs.length + 1) + ". Select Calculate, review the breakdown, and check the assumptions before using the result." });
  const inputs = Object.fromEntries(calc.inputs.map(input => [input.key, input.defaultValue ?? ""]));
  Object.assign(inputs, calc.example.inputs);
  const example = exampleContent(calc, inputs);
  if (example) sections.push({ title: "Worked example", body: example });
  const variable = calc.inputs.find(input => input.type === "number" && typeof inputs[input.key] === "number" && Number(inputs[input.key]) > 0 && input.key !== "age");
  if (variable) {
    const value = Number(inputs[variable.key]);
    const adjusted = Math.min(variable.max ?? Infinity, Math.max(variable.min ?? 0, value + (variable.step ?? 1)));
    if (adjusted !== value) {
      const comparison = exampleContent(calc, {...inputs, [variable.key]: adjusted});
      if (comparison) sections.push({title: "Compare a different input", body: "Change only " + variable.label + " from " + value + " to " + adjusted + ". All other assumptions stay the same.\n\n" + comparison});
    }
  }
  const limitations: Record<string,string> = {
    finance: "Financial outputs are estimates. Confirm the jurisdiction, tax year, fees, compounding convention and eligibility before acting. A fixed rate is an assumption, not a predicted investment return.",
    health: "Health metrics are screening or planning estimates for general education. They do not diagnose conditions or replace a clinician. Age, pregnancy, medication and individual physiology can affect interpretation.",
    construction: "Material estimates depend on the measurements and geometry entered. Allow for cuts, waste, local standards and manufacturer requirements before ordering.",
    engineering: "Results assume the ideal relationships described above. Component tolerances, temperature, AC behavior and safety ratings can change real-world performance.",
  };
  sections.push({title:"Assumptions and limitations", body: limitations[calc.category] ?? "Results follow the selected inputs and model. Rounding, units and omitted real-world factors can affect interpretation. Verify important results independently."});
  if (calc.slug === "currency-converter") sections.push({title:"Reference-rate warning", body:"This converter uses illustrative fixed reference rates, not live trading quotes. No rate date or feed is available. Confirm a current executable rate and provider fees before exchanging money."});
  return sections;
}
