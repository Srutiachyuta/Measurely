import { blogs } from "@/data/blogs";
import { calculators } from "@/data/calculators";
import type { CalculatorDefinition } from "@/types/calculators";
import type { BlogPost } from "@/types";

export function findBlogForTool(slug: string): BlogPost | undefined {
  return blogs.find((post) =>
    post.relatedTools?.some((tool) => tool.slug === slug)
  );
}

export function findBlogsForTool(slug: string): BlogPost[] {
  return blogs.filter((post) =>
    post.relatedTools?.some((tool) => tool.slug === slug)
  );
}

interface ContentSection {
  title: string;
  body: string;
}

function formatExampleInputs(calc: CalculatorDefinition): string {
  if (!calc.example.inputs) return "";
  return Object.entries(calc.example.inputs)
    .map(([key, val]) => {
      const input = calc.inputs.find((i) => i.key === key);
      return `${input?.label || key}: ${val}`;
    })
    .join(", ");
}

function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = {
    finance: "financial",
    health: "health and fitness",
    math: "mathematical",
    time: "time and date",
    engineering: "engineering",
    construction: "construction",
    "everyday-life": "everyday life",
    "real-estate": "real estate",
    retirement: "retirement",
    automotive: "automotive",
    "social-media": "social media",
    business: "business",
  };
  return map[category] || category;
}

const calculatorFormulas: Record<string, string> = {
  "emi-calculator": "EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is the loan amount, r is the monthly interest rate (annual rate divided by 12 and 100), and n is the total number of monthly installments.",
  "loan-calculator": "Monthly Payment = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is the loan principal, r is the monthly interest rate, and n is the total number of payments.",
  "mortgage-calculator": "Monthly Mortgage = (Principal × r × (1 + r)^n) / ((1 + r)^n - 1) + (Property Tax / 12) + (Insurance / 12), where r is the monthly interest rate and n is the total months.",
  "interest-calculator": "Simple Interest = P × R × T / 100, where P is the principal amount, R is the annual interest rate, and T is the time period in years. Total Amount = Principal + Interest.",
  "compound-interest-calculator": "A = P × (1 + r/n)^(n×t), where P is the principal, r is the annual rate, n is compounding frequency per year, and t is the time in years.",
  "sip-calculator": "M = P × ((1 + r)^n - 1) / r × (1 + r), where P is the monthly investment, r is the monthly rate of return, and n is the total number of investments.",
  "swp-calculator": "Each month: Balance = Previous Balance × (1 + r) - Withdrawal Amount, where r is the monthly rate of return. Iterated over the withdrawal period.",
  "fd-calculator": "Maturity Amount = P × (1 + R/(100×n))^(n×T), where P is the deposit amount, R is the annual rate, n is the compounding frequency, and T is the tenure in years.",
  "rd-calculator": "M = R × ((1 + r)^n - 1) / (1 - (1 + r)^(-1/3)), where R is the monthly deposit, r is the monthly rate, and n is the total months.",
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

const calculatorBenefits: Record<string, string> = {
  finance: "Financial planning, loan comparison, investment strategy development, budgeting, and understanding the true cost of borrowing. These calculators help you make informed decisions about loans, investments, and taxes without needing a financial advisor.",
  health: "Health monitoring, fitness tracking, weight management, nutritional planning, and understanding your body composition. These tools help you set realistic health goals and track progress toward them.",
  math: "Problem-solving, homework help, exam preparation, data analysis, and understanding mathematical concepts. These tools are invaluable for students, teachers, and professionals who work with numbers.",
  time: "Project planning, scheduling, deadline management, age verification, and time tracking. These calculators help you organize your schedule and understand time relationships.",
  engineering: "Circuit design, component selection, electrical troubleshooting, and understanding the relationships between electrical properties. These tools are essential for electronics hobbyists and professionals.",
  construction: "Project planning, material estimation, budgeting, and waste reduction. These calculators help contractors, DIY enthusiasts, and homeowners estimate materials accurately.",
  "everyday-life": "Personal finance management, shopping decisions, travel planning, and social activities. These tools simplify everyday calculations and help you save money.",
  retirement: "Retirement planning, FIRE goal setting, investment strategy development, and understanding how much you need to save for financial independence. These calculators help you plan your early retirement and track progress toward your FIRE target.",
  "real-estate": "Home buying decisions, mortgage qualification, rent vs buy analysis, and property investment planning. These calculators help you navigate the real estate market with confidence.",
  automotive: "Vehicle ownership cost analysis, charging expense estimation, depreciation tracking, and total cost of ownership comparisons. These tools help car buyers and owners make informed financial decisions.",
  "social-media": "Content monetization planning, earnings estimation, engagement analysis, and revenue optimization. These calculators help creators understand and maximize their online income.",
  business: "Business planning, pricing strategy, profitability analysis, cash flow management, and compensation planning. These tools help entrepreneurs and business owners make data-driven decisions.",
};

const calculatorMistakes: Record<string, string> = {
  finance: "- Using the wrong interest rate format (ensure you enter the annual rate, not monthly)\n- Confusing tenure types (years vs. months)\n- Not accounting for additional fees and charges not included in the calculator\n- Assuming past returns guarantee future performance for investment calculators\n- Forgetting to include cess and surcharges in tax calculations",
  health: "- Using incorrect units (kg vs. lbs, cm vs. ft)\n- Taking measurements at the wrong time of day (weight fluctuates)\n- Relying solely on BMI which does not account for muscle mass\n- Not measuring waist and neck at the correct positions\n- Using the gender setting incorrectly",
  math: "- Entering values in the wrong order (numerator vs. denominator, value vs. total)\n- Confusing mode selections (increase vs. decrease, percent of vs. change)\n- Forgetting to clear previous results before a new calculation\n- Misinterpreting the discriminant sign in quadratic equations",
  time: "- Using the wrong date format (the tool expects YYYY-MM-DD)\n- Forgetting that some months have different numbers of days\n- Confusing AM/PM when entering times\n- Not accounting for time zone differences\n- Assuming all months have 30 days for approximate calculations",
  engineering: "- Leaving all fields blank instead of entering exactly two values\n- Using the wrong unit prefix (kilo, mega, milli)\n- Misreading resistor color bands (confusing similar colors)\n- Not considering tolerance when selecting components",
  construction: "- Measuring in different units without converting\n- Not accounting for waste and offcuts (always add 10-15%)\n- Confusing depth/thickness measurements\n- Forgetting to include the pitch factor for roofing\n- Ordering materials before double-checking calculations",
  "everyday-life": "- Forgetting to include the tip percentage when splitting bills\n- Confusing discount percentage with savings amount\n- Using the wrong fuel efficiency unit (km/L vs. MPG)\n- Not accounting for currency differences in fuel price\n- Overlooking rounding differences when splitting uneven amounts",
  "real-estate": "- Not including property taxes and insurance in monthly cost estimates\n- Forgetting to account for maintenance costs (typically 1-2% of home value annually)\n- Overlooking closing costs (typically 2-5% of purchase price)\n- Using pre-qualification amount instead of actual budget\n- Not considering future interest rate changes for adjustable-rate mortgages",
  automotive: "- Using the wrong battery capacity for EV calculations\n- Confusing miles with kilometers in range estimates\n- Not accounting for charging losses (typically 10-15%)\n- Forgetting to include time-of-use electricity rates\n- Overestimating annual mileage for depreciation calculations",
  "social-media": "- Confusing CPM with RPM (RPM is actual earnings after YouTube's cut)\n- Not accounting for seasonal view fluctuations\n- Overestimating consistent monthly growth\n- Forgetting that ad revenue varies by content category\n- Not considering multiple revenue streams beyond ads",
  business: "- Confusing revenue with profit (forgetting to subtract expenses)\n- Not accounting for non-billable time in rate calculations\n- Underestimating tax obligations for self-employed income\n- Forgetting to include benefits and paid time off in compensation\n- Overlooking market rates when setting freelance prices",
};

const calculatorAdvantages: Record<string, string> = {
  finance: "Provides instant, accurate financial calculations without manual errors. Helps you compare different loan options, investment strategies, and tax scenarios side by side. Saves time and money by enabling informed decisions without needing to consult a financial advisor for every calculation. All tools are free to use with no hidden charges.",
  health: "Gives you immediate insights into your health metrics without expensive equipment or doctor visits. Tracks progress over time and helps you set realistic health goals. Empowers you to take control of your wellness journey with data-driven decisions. All calculations use validated medical formulas.",
  math: "Eliminates calculation errors and saves time on repetitive math problems. Provides step-by-step solutions that help you learn the underlying concepts. Perfect for students checking homework, teachers preparing materials, and professionals who need quick, accurate results.",
  time: "Handles complex date and time calculations instantly, accounting for leap years, month lengths, and time zones. Eliminates the mental effort of counting days or calculating durations manually. Ensures accuracy in scheduling, planning, and deadline management.",
  engineering: "Quickly computes electrical values using fundamental engineering laws. Eliminates manual calculation errors in circuit design and troubleshooting. Helps both hobbyists and professionals verify their work and select appropriate components.",
  construction: "Provides accurate material estimates that prevent costly over-ordering or frustrating shortages. Includes waste factors and industry-standard formulas used by professionals. Saves time and money on every project by eliminating guesswork.",
  "everyday-life": "Simplifies common financial decisions like tipping, splitting bills, and calculating discounts. Helps you save money by making smarter shopping and dining choices. All calculations are tailored for real-world scenarios.",
  "real-estate": "Helps you understand your true budget before house hunting, preventing financial strain. Compares renting vs buying with actual numbers specific to your situation. Qualifies you for the right mortgage programs by understanding DTI ratios.",
  automotive: "Provides accurate cost projections for vehicle ownership including depreciation, fuel, and charging. Helps EV owners optimize charging schedules for lowest electricity rates. Enables data-driven decisions about when to buy, sell, or trade vehicles.",
  "social-media": "Gives creators realistic earnings projections based on actual YouTube metrics. Helps set informed goals for view counts and engagement. Enables comparison of different content strategies and their revenue potential.",
  business: "Ensures your pricing covers all costs and desired profit margins. Helps freelancers set rates that reflect their true value and market position. Provides cash flow visibility that prevents business-threatening shortages.",
};

const calculatorWhenToUse: Record<string, string> = {
  finance: "Use this calculator whenever you need to evaluate a financial decision that involves numbers. Whether you are comparing loan offers, planning investments, estimating taxes, or creating a budget, this tool gives you the clarity you need to move forward with confidence.",
  health: "Use this tool when you want to understand your body better, set fitness goals, track health metrics, or monitor changes over time. It is ideal for regular health check-ins and before starting any new fitness or nutrition program.",
  math: "Reach for this tool when you need to solve math problems quickly and accurately. It is perfect for homework help, exam preparation, double-checking manual calculations, or exploring mathematical concepts through practical examples.",
  time: "Use this calculator for any situation requiring precise time or date calculations. Ideal for project planning, age verification, deadline management, travel coordination, and scheduling across different time zones.",
  engineering: "Use this tool when designing circuits, selecting components, troubleshooting electrical systems, or verifying your calculations. Essential for electronics projects, lab work, and any situation where accurate electrical values are critical.",
  construction: "Perfect for planning home improvement projects, estimating material costs, creating budgets, and avoiding waste. Use it before starting any construction, renovation, or DIY project to ensure you have accurate material quantities.",
  "everyday-life": "Use this calculator for everyday financial decisions like dining out, shopping, traveling, and managing household expenses. It helps you split bills fairly, calculate tips, find the best deals, and budget more effectively.",
  "real-estate": "Use this tool when you are considering buying a home, comparing mortgage options, or deciding whether to rent or buy. Essential during the house-hunting process to understand your budget and qualify for the right mortgage.",
  automotive: "Use this calculator when evaluating vehicle purchases, planning charging infrastructure, estimating ownership costs, or tracking depreciation. Ideal for both current owners and prospective buyers making informed vehicle decisions.",
  "social-media": "Use this tool to project your YouTube earnings, set view count goals, evaluate content strategy changes, and understand how different metrics affect your revenue. Essential for creators planning to monetize or grow their channel.",
  business: "Use this calculator when setting prices, planning budgets, forecasting cash flow, or evaluating business investments. Essential for freelancers setting rates, startups planning growth, and established businesses optimizing operations.",
};

const calculatorLimitations: Record<string, string> = {
  finance: "Results are estimates based on the inputs provided. Actual financial outcomes depend on market conditions, lender policies, and individual circumstances. This tool does not replace professional financial advice for complex situations. Always verify critical calculations with a qualified professional.",
  health: "Health calculations provide estimates based on population averages and validated formulas. Individual results may vary based on genetics, medical conditions, and other factors not captured by these tools. Always consult healthcare providers for medical decisions.",
  math: "While the calculations are accurate, some advanced mathematical concepts may have edge cases not covered by standard formulas. Results assume correct input formatting. Complex multi-step problems may require additional verification.",
  time: "Date and time calculations are based on standard calendar rules and may not account for historically observed calendar changes or region-specific daylight saving transitions. Always verify critical dates with official sources.",
  engineering: "Calculations assume ideal conditions and standard component values. Real-world factors like temperature, manufacturing tolerances, and parasitic effects are not included. Always prototype and test circuits before final implementation.",
  construction: "Material estimates include standard waste factors, but actual waste depends on project complexity, skill level, and site conditions. Always order slightly more than calculated and consult professionals for structural work.",
  "everyday-life": "Results are based on the specific inputs you provide. Currency conversions use current market rates which may differ from bank rates. Tip and split calculations assume equal sharing unless otherwise specified.",
  "real-estate": "Mortgage qualification estimates are based on standard guidelines. Actual approval depends on lender-specific criteria, credit history, and current market conditions. Pre-approval from a lender is required for accurate qualification.",
  automotive: "Depreciation estimates use industry averages and may vary significantly by make, model, and market conditions. Charging costs depend on actual electricity rates which vary by location and time of use. Real-world efficiency depends on driving habits and weather.",
  "social-media": "Earnings projections are estimates based on industry average RPM rates. Actual earnings vary significantly by niche, audience demographics, content type, and seasonal factors. YouTube policies and monetization requirements change over time.",
  "business": "Cash flow forecasts are based on projections and assumptions about future income and expenses. Actual business results depend on market conditions, customer behavior, and operational factors. Always maintain a cash reserve for unexpected events.",
};

const calculatorExpertTips: Record<string, string> = {
  finance: "- Always use the annual interest rate, not monthly, when entering rates\n- Consider both best-case and worst-case scenarios when planning investments\n- Factor in inflation when calculating long-term returns (historical average ~3%)\n- Review and update your financial plan at least annually\n- Keep an emergency fund of 3-6 months of expenses before investing aggressively",
  health: "- Take measurements at the same time each day, preferably in the morning after using the bathroom\n- Use consistent units throughout (metric or imperial, don\u0027t mix)\n- Track trends over time instead of focusing on single measurements\n- Combine multiple metrics (BMI, BMR, body fat %) for a complete picture\n- Recalculate after significant weight changes or lifestyle adjustments",
  math: "- Double-check your inputs, especially for fractions and percentages\n- Use parentheses in complex expressions to ensure correct order of operations\n- Verify results by doing a rough mental estimate first\n- Save time by using the 'Load Example' feature to understand the tool\n- Clear all fields before starting a new calculation to avoid confusion",
  time: "- Always use YYYY-MM-DD format for date inputs to avoid ambiguity\n- Remember that months have varying lengths (28-31 days)\n- Account for leap years when calculating spans across multiple years\n- Use the 'Include end date' option carefully depending on your needs\n- Double-check AM/PM settings for time calculations",
  engineering: "- Always enter at least two known values — the calculator derives the rest\n- Use consistent units throughout your calculations\n- Remember that real components have tolerance ranges (±5%, ±10%, etc.)\n- Verify resistor color codes under good lighting to avoid confusion\n- Double-check your circuit before applying power",
  construction: "- Always add 10-15% waste for cutting, mistakes, and future repairs\n- Measure twice, calculate once\n- Convert all measurements to the same unit before calculating\n- Consider the thickness of materials when measuring dimensions\n- Order materials in stages for large projects to avoid over-purchasing",
  "everyday-life": "- For tips, calculate on the pre-tax amount if you want to tip on the meal cost only\n- When splitting bills, decide ahead of time who pays for what\n- Look for discounts that compound (e.g., 20% off + 10% off, not 30% off)\n- Compare fuel costs per mile, not per tank, for accurate comparisons\n- Use currency converters at the time of transaction for accurate exchange rates",
  "real-estate": "- Get pre-approved before house hunting to know your exact budget\n- Include property taxes, insurance, and maintenance in your monthly calculations\n- Remember that condo fees can increase significantly over time\n- Consider future interest rate changes when choosing between fixed and variable rates\n- Factor in moving costs (typically 3-5% of home price) and closing costs (2-5%)",
  "automotive": "- For EVs, charging at off-peak hours can reduce costs by 30-50%\n- Consider total cost of ownership, not just purchase price\n- Vehicle depreciation is the largest cost of ownership, not fuel\n- Higher mileage vehicles depreciate less per mile than low-mileage ones\n- Regular maintenance preserves resale value regardless of vehicle type",
  "social-media": "- Focus on RPM (Revenue Per Mille), not CPM, for actual earnings\n- Diversify revenue streams beyond ads (sponsorships, merch, memberships)\n- Upload consistently — the algorithm favors regular creators\n- Engage with your audience to improve watch time and retention\n- Study your analytics to understand which content performs best",
  "business": "- Track all business expenses, not just major ones — small costs add up\n- Set your freelance rate at least 20% higher than your minimum acceptable rate\n- Review cash flow forecasts monthly, not just quarterly\n- Build a tax reserve of 25-30% of each payment received\n- Re-evaluate your rates annually based on experience and market changes",
};

function getIntroduction(calc: CalculatorDefinition): string {
  return `${calc.name} is a free online ${getCategoryEmoji(calc.category)} tool that helps you ${calc.description.toLowerCase()} This tool provides instant, accurate results with detailed breakdowns and visual charts to help you understand the numbers behind the calculation. Whether you are a professional, student, or someone who needs quick answers, this calculator simplifies complex calculations so you can focus on making informed decisions.`;
}

function getWhyItMatters(calc: CalculatorDefinition): string {
  const cat = calc.category;
  const mattersText: Record<string, string> = {
    finance: `In personal finance, accurate calculations can mean the difference between financial success and costly mistakes. The ${calc.name} helps you avoid errors that could cost you money, whether you are planning a loan, estimating taxes, or growing your investments. Getting these numbers right is essential for building wealth, managing debt, and achieving your financial goals.`,
    health: `Understanding your health metrics is the first step toward better wellness. The ${calc.name} gives you reliable, science-based measurements that help you track progress, set realistic goals, and make informed decisions about your diet, exercise, and lifestyle. Without accurate data, it is easy to plateau or pursue strategies that do not work for your body.`,
    math: `Mathematics is everywhere, from calculating tips to understanding statistics. The ${calc.name} takes the guesswork out of mathematical calculations, ensuring accuracy every time. Whether you are a student learning new concepts or a professional who needs reliable results, this tool helps you work smarter, not harder.`,
    time: `Time is our most valuable resource, and managing it accurately matters. The ${calc.name} eliminates confusion around dates, durations, and deadlines, helping you plan better and avoid costly scheduling mistakes. From project timelines to personal milestones, accurate time calculations keep everything on track.`,
    engineering: `Precision is non-negotiable in engineering. The ${calc.name} ensures your calculations are accurate, helping you design safe and effective circuits, select the right components, and troubleshoot problems efficiently. A small calculation error can lead to circuit failure or component damage — this tool prevents that.`,
    construction: `Building projects depend on accurate measurements and material estimates. The ${calc.name} helps you avoid the two most common and costly problems: ordering too much material (wasting money) or ordering too little (delaying your project). Professional results start with accurate planning.`,
    "everyday-life": `Everyday financial decisions add up over time. The ${calc.name} helps you make smarter choices about tipping, shopping, traveling, and splitting expenses. Small savings on everyday transactions can add up to significant amounts over a year, and this tool helps you maximize every rupee.`,
    "real-estate": `Buying a home is one of the biggest financial decisions you will ever make. The ${calc.name} gives you the clarity you need to understand your budget, compare options, and make an offer with confidence. Getting the numbers wrong can lead to years of financial strain — this tool helps you get them right.`,
    automotive: `Vehicle costs go far beyond the purchase price. The ${calc.name} helps you understand the full cost of ownership, from depreciation to charging costs, so you can make informed decisions about buying, owning, and maintaining vehicles. Knowledge is power when negotiating your next car purchase.`,
    "social-media": `Content creation is a business, and understanding your numbers is key to growth. The ${calc.name} helps you project earnings, set realistic goals, and understand which metrics actually drive revenue. Data-driven creators build sustainable careers, while guessing leads to burnout and disappointment.`,
    business: `Every business decision comes down to numbers. The ${calc.name} helps you set profitable prices, forecast cash flow, and plan for growth with confidence. Business owners who understand their numbers are far more likely to succeed than those who operate on intuition alone.`,
  };
  return mattersText[cat] || `The ${calc.name} provides accurate, reliable calculations that help you make better decisions. Whether you are planning, analyzing, or learning, getting the right answer matters, and this tool ensures you do.`;
}

function getWhenToUse(calc: CalculatorDefinition): string {
  const wtf = calculatorWhenToUse[calc.category];
  const inputRef = calc.inputs.length > 0 ? ` Specifically, use this tool when you need to calculate ${calc.inputs.slice(0, 3).map(i => i.label.toLowerCase()).join(", ")}.` : "";
  return wtf + inputRef;
}

function getHowItWorks(calc: CalculatorDefinition): string {
  const formula = calculatorFormulas[calc.slug];
  if (formula) {
    return `The ${calc.name} works by taking your input values and applying the standard mathematical formula for this type of calculation. You enter your numbers into the input fields above, and the calculator processes them instantly using the formula shown in the "Formula Used" section below. The results are displayed in a clear, organized format with visual charts where applicable, making it easy to understand what the numbers mean. The tool handles all the complex math behind the scenes, so you get accurate results with zero effort.`;
  }
  const inputCount = calc.inputs.length;
  if (inputCount === 0) {
    return `The ${calc.name} is an interactive tool that lets you perform calculations directly. You use the interface to input expressions and operations, and the tool evaluates them in real-time using standard mathematical rules. It handles everything from basic arithmetic to advanced functions, displaying results instantly as you work.`;
  }
  return `The ${calc.name} takes your input values — typically ${inputCount} key pieces of information — and processes them through a validated calculation engine. Simply fill in the fields above and click "Calculate" to see your results. The tool applies the correct mathematical or financial formula based on your inputs and presents the output in a clear, easy-to-understand format with relevant breakdowns and visualizations.`;
}

function getAdvantages(calc: CalculatorDefinition): string {
  const cat = calc.category;
  const baseAdvantages = calculatorAdvantages[cat] || "This tool provides instant, accurate calculations that save you time and eliminate manual errors. It is completely free to use with no registration required, accessible from any device, and designed to give you clear, actionable results.";
  return `${calc.name} offers several key advantages:\n\n${baseAdvantages}\n\nUnlike manual calculations that are prone to errors, this tool guarantees accuracy every time. It is available 24/7 from any device, requires no software installation, and is completely free to use with no hidden charges or registration requirements.`;
}

function getLimitations(calc: CalculatorDefinition): string {
  const cat = calc.category;
  const baseLimitations = calculatorLimitations[cat] || "While this tool provides accurate calculations based on standard formulas, results should be used as estimates. Real-world outcomes may vary based on factors not captured by the calculator. Always verify critical results through professional consultation or additional methods.";
  return `While the ${calc.name} is a powerful and accurate tool, it is important to understand its limitations:\n\n${baseLimitations}\n\nUse this calculator as a planning and reference tool, but always supplement it with professional advice for significant decisions.`;
}

function getBenefitsAndUseCases(calc: CalculatorDefinition): string {
  const cat = calc.category;
  const benefits = calculatorBenefits[cat] || "This calculator helps you perform accurate calculations quickly and efficiently.";
  const category = getCategoryEmoji(cat);
  const relatedNames = calc.relatedSlugs
    .map((slug) => calculators.find((c) => c.slug === slug)?.name)
    .filter(Boolean);
  const relatedRef = relatedNames.length > 0
    ? ` For related calculations, you can also use our ${relatedNames.join(", ")}.`
    : "";
  return `The ${calc.name} offers several benefits for ${category} planning and analysis:\n\n${benefits}${relatedRef}\n\nUse this tool whenever you need to calculate ${calc.inputs.slice(0, 2).map((i) => i.label.toLowerCase()).join(" or ")}. It is suitable for professionals, students, and anyone who needs quick, accurate results.`;
}

function getCommonMistakes(calc: CalculatorDefinition): string {
  const cat = calc.category;
  const common = calculatorMistakes[cat];
  if (!common) return "Always double-check your inputs for accuracy. Ensure you are using the correct units and that all required fields are filled in before calculating.";
  return `When using the ${calc.name}, be aware of these common mistakes:\n\n${common}\n\nTaking a moment to verify your inputs will ensure the most accurate results.`;
}

function getExpertTips(calc: CalculatorDefinition): string {
  const cat = calc.category;
  const tips = calculatorExpertTips[cat];
  if (!tips) return `To get the most out of the ${calc.name}, always double-check your inputs for accuracy, use consistent units, and review the results carefully. Try the "Load Example" feature to see how the calculator works with sample data before entering your own values.`;
  return `For the best results when using the ${calc.name}, follow these expert tips:\n\n${tips}`;
}

function getFormulaSection(calc: CalculatorDefinition): string | null {
  if (calc.inputs.length === 0) return null;
  const formula = calculatorFormulas[calc.slug];
  if (!formula) return null;
  return `The ${calc.name} uses the following formula${calc.slug.includes("calculator") ? "" : "s"}:\n\n${formula}\n\nThe calculation is performed automatically when you click the Calculate button, ensuring error-free results every time. Understanding the formula helps you interpret the results more effectively and see exactly how each input affects the final outcome.`;
}

function getHowToUse(calc: CalculatorDefinition): string {
  if (calc.inputs.length === 0) return "";
  const inputSteps = calc.inputs.map((input, i) => `${i + 1}. Enter the ${input.label.toLowerCase()} in the provided input field${input.placeholder ? ` (${input.placeholder})` : ""}.`).join("\n");
  return `Follow these steps to use the ${calc.name}:\n\n${inputSteps}\n${calc.inputs.length + 1}. Click the "Calculate" button to compute your results.\n${calc.inputs.length + 2}. Review the detailed results, including charts and breakdowns.\n${calc.inputs.length + 3}. Use the "Reset" button to clear all fields and start a new calculation.\n${calc.example.inputs && Object.keys(calc.example.inputs).length > 0 ? `${calc.inputs.length + 4}. Try the "Load Example" button to see a sample calculation with predefined values.` : ""}`;
}

function getExampleCalculation(calc: CalculatorDefinition): string | null {
  if (!calc.example.inputs || Object.keys(calc.example.inputs).length === 0) return null;
  const formatted = formatExampleInputs(calc);
  return `Here is a practical example to help you understand how the ${calc.name} works:\n\nExample inputs:\n${formatted}\n\nEnter these values into the calculator (or click "Load Example Values") to see how the formula produces accurate results. This example represents a typical use case and demonstrates the calculator's output format, including any charts or breakdowns. Try modifying the values to see how different inputs affect the results.`;
}

function getResultInterpretation(calc: CalculatorDefinition): string {
  const formula = calculatorFormulas[calc.slug];
  if (!formula) {
    return `Once you click "Calculate," the ${calc.name} displays your results in a clear, organized format. Each result is labeled and explained so you can understand what it means. The visual charts help you see patterns and relationships at a glance. Take time to review each output value and consider how it applies to your specific situation.`;
  }
  return `After calculating, the ${calc.name} presents your results with clear labels and visual charts. Each output value is calculated directly from your inputs using the formula. Review the results carefully: they show you the key outcomes of your calculation. The charts help visualize the relationship between your inputs and the results, making it easier to understand the impact of changing different variables.`;
}

function getConclusion(calc: CalculatorDefinition): string {
  const formula = calculatorFormulas[calc.slug];
  const formulaRef = formula ? " using the standard formula" : "";
  const relatedNames = calc.relatedSlugs
    .map((slug) => calculators.find((c) => c.slug === slug)?.name)
    .filter(Boolean);
  const relatedRef = relatedNames.length > 0
    ? ` For more calculations, try our ${relatedNames.slice(0, 3).join(", ")}.`
    : "";
  return `The ${calc.name} is a reliable, free tool that gives you instant, accurate results${formulaRef}. Whether you are planning, analyzing, or just curious, this calculator simplifies complex ${getCategoryEmoji(calc.category)} calculations so you can focus on making informed decisions.${relatedRef} Try it now with your own values above and see how easy it is to get the answers you need. Bookmark this page for future use — you will find yourself coming back whenever you need quick, reliable calculations.`;
}

function getRelatedToolLinks(calc: CalculatorDefinition): string {
  if (calc.relatedSlugs.length === 0) return "";
  const names = calc.relatedSlugs
    .map((slug) => calculators.find((c) => c.slug === slug))
    .filter(Boolean)
    .map((c) => c!.name);
  if (names.length === 0) return "";
  return `Related calculators: ${names.map((n) => `${n} (/${calc.relatedSlugs[calc.relatedSlugs.findIndex((s) => calculators.find((c) => c.slug === s)?.name === n)]})`).join(", ")}.`;
}

function getRelatedArticles(slug: string): string {
  const related = findBlogsForTool(slug);
  if (related.length === 0) return "";
  const articles = related.map((b) => `${b.title} (/${b.slug})`).join(", ");
  return `Read our related articles on this topic: ${articles}.`;
}

export function getCalculatorContent(calc: CalculatorDefinition): ContentSection[] {
  const sections: ContentSection[] = [];

  sections.push({
    title: `What is ${calc.name}?`,
    body: getIntroduction(calc),
  });

  sections.push({
    title: `Why ${calc.name} Matters`,
    body: getWhyItMatters(calc),
  });

  sections.push({
    title: "When to Use This Calculator",
    body: getWhenToUse(calc),
  });

  sections.push({
    title: "How the Calculator Works",
    body: getHowItWorks(calc),
  });

  if (calc.inputs.length > 0) {
    const formula = getFormulaSection(calc);
    if (formula) {
      sections.push({
        title: "Formula Used",
        body: formula,
      });
    }

    sections.push({
      title: "How to Use This Calculator",
      body: getHowToUse(calc),
    });
  }

  const example = getExampleCalculation(calc);
  if (example) {
    sections.push({
      title: "Example Calculation",
      body: example,
    });
  }

  sections.push({
    title: "Result Interpretation",
    body: getResultInterpretation(calc),
  });

  sections.push({
    title: `Advantages of ${calc.name}`,
    body: getAdvantages(calc),
  });

  sections.push({
    title: `Limitations to Keep in Mind`,
    body: getLimitations(calc),
  });

  sections.push({
    title: "Benefits and Use Cases",
    body: getBenefitsAndUseCases(calc),
  });

  sections.push({
    title: "Common Mistakes to Avoid",
    body: getCommonMistakes(calc),
  });

  sections.push({
    title: "Expert Tips for Best Results",
    body: getExpertTips(calc),
  });

  const toolLinks = getRelatedToolLinks(calc);
  if (toolLinks) {
    sections.push({
      title: "Related Tools",
      body: toolLinks,
    });
  }

  const articles = getRelatedArticles(calc.slug);
  if (articles) {
    sections.push({
      title: "Related Articles",
      body: articles,
    });
  }

  sections.push({
    title: "Frequently Asked Questions",
    body: `Below you will find answers to common questions about the ${calc.name}. These FAQs cover the most important topics users ask about, helping you get the most out of this tool.`,
  });

  sections.push({
    title: "Conclusion",
    body: getConclusion(calc),
  });

  return sections;
}
