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
  "statistics-calculator": "Mean = Σx / n. Median is the middle value when sorted. Mode is the most frequent value. Variance = Σ(x - mean)^2 / n. Standard Deviation = √Variance.",
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
};

const calculatorMistakes: Record<string, string> = {
  finance: "- Using the wrong interest rate format (ensure you enter the annual rate, not monthly)\n- Confusing tenure types (years vs. months)\n- Not accounting for additional fees and charges not included in the calculator\n- Assuming past returns guarantee future performance for investment calculators\n- Forgetting to include cess and surcharges in tax calculations",
  health: "- Using incorrect units (kg vs. lbs, cm vs. ft)\n- Taking measurements at the wrong time of day (weight fluctuates)\n- Relying solely on BMI which does not account for muscle mass\n- Not measuring waist and neck at the correct positions\n- Using the gender setting incorrectly",
  math: "- Entering values in the wrong order (numerator vs. denominator, value vs. total)\n- Confusing mode selections (increase vs. decrease, percent of vs. change)\n- Forgetting to clear previous results before a new calculation\n- Misinterpreting the discriminant sign in quadratic equations",
  time: "- Using the wrong date format (the tool expects YYYY-MM-DD)\n- Forgetting that some months have different numbers of days\n- Confusing AM/PM when entering times\n- Not accounting for time zone differences\n- Assuming all months have 30 days for approximate calculations",
  engineering: "- Leaving all fields blank instead of entering exactly two values\n- Using the wrong unit prefix (kilo, mega, milli)\n- Misreading resistor color bands (confusing similar colors)\n- Not considering tolerance when selecting components",
  construction: "- Measuring in different units without converting\n- Not accounting for waste and offcuts (always add 10-15%)\n- Confusing depth/thickness measurements\n- Forgetting to include the pitch factor for roofing\n- Ordering materials before double-checking calculations",
  "everyday-life": "- Forgetting to include the tip percentage when splitting bills\n- Confusing discount percentage with savings amount\n- Using the wrong fuel efficiency unit (km/L vs. MPG)\n- Not accounting for currency differences in fuel price\n- Overlooking rounding differences when splitting uneven amounts",
};

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

function getFormulaSection(calc: CalculatorDefinition): string | null {
  if (calc.inputs.length === 0) return null;
  const formula = calculatorFormulas[calc.slug];
  if (!formula) return null;
  return `The ${calc.name} uses the following formula${calc.slug.includes("calculator") ? "" : "s"}:\n\n${formula}\n\nThe calculation is performed automatically when you click the Calculate button, ensuring error-free results every time.`;
}

function getHowToUse(calc: CalculatorDefinition): string {
  if (calc.inputs.length === 0) return "";
  const inputSteps = calc.inputs.map((input, i) => `${i + 1}. Enter the ${input.label.toLowerCase()} in the provided input field${input.placeholder ? ` (${input.placeholder})` : ""}.`).join("\n");
  return `Follow these steps to use the ${calc.name}:\n\n${inputSteps}\n${calc.inputs.length + 1}. Click the "Calculate" button to compute your results.\n${calc.inputs.length + 2}. Review the detailed results, including charts and breakdowns.\n${calc.inputs.length + 3}. Use the "Reset" button to clear all fields and start a new calculation.\n${calc.example.inputs && Object.keys(calc.example.inputs).length > 0 ? `${calc.inputs.length + 4}. Try the "Load Example" button to see a sample calculation with predefined values.` : ""}`;
}

function getExampleCalculation(calc: CalculatorDefinition): string | null {
  if (!calc.example.inputs || Object.keys(calc.example.inputs).length === 0) return null;
  const formatted = formatExampleInputs(calc);
  return `Here is a practical example to help you understand how the ${calc.name} works:\n\nExample inputs:\n${formatted}\n\nEnter these values into the calculator (or click "Load Example Values") to see how the formula produces accurate results. This example represents a typical use case and demonstrates the calculator's output format, including any charts or breakdowns.`;
}

function getConclusion(calc: CalculatorDefinition): string {
  const formula = calculatorFormulas[calc.slug];
  const formulaRef = formula ? " using the standard formula" : "";
  const relatedNames = calc.relatedSlugs
    .map((slug) => calculators.find((c) => c.slug === slug)?.name)
    .filter(Boolean);
  const relatedRef = relatedNames.length > 0
    ? ` For more calculations, try our ${relatedNames.slice(0, 2).join(" and ")}.`
    : "";
  return `The ${calc.name} is a reliable, free tool that gives you instant, accurate results${formulaRef}. Whether you are planning, analyzing, or just curious, this calculator simplifies complex ${getCategoryEmoji(calc.category)} calculations so you can focus on making informed decisions.${relatedRef} Try it now with your own values above.`;
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
    body: `${calc.name} is a free online ${getCategoryEmoji(calc.category)} tool that helps you ${calc.description.toLowerCase()} This tool provides instant, accurate results with detailed breakdowns and visual charts to help you understand the numbers behind the calculation.`,
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
    title: "Benefits and Use Cases",
    body: getBenefitsAndUseCases(calc),
  });

  sections.push({
    title: "Common Mistakes to Avoid",
    body: getCommonMistakes(calc),
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
    title: "Conclusion",
    body: getConclusion(calc),
  });

  return sections;
}


