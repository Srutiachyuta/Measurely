import { blogs } from "@/data/blogs";
import { calculators } from "@/data/calculators";
import { converters } from "@/data/converters";
import type { CalculatorDefinition } from "@/types/calculators";
import type { ConverterDefinition } from "@/types/converters";
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

function getRelatedConverterLinks(conv: ConverterDefinition): string {
  if (conv.relatedSlugs.length === 0) return "";
  const names = conv.relatedSlugs
    .map((slug) => converters.find((c) => c.slug === slug))
    .filter(Boolean)
    .map((c) => c!.name);
  if (names.length === 0) return "";
  return `Related converters: ${names.map((n) => `${n} (/${conv.relatedSlugs[conv.relatedSlugs.findIndex((s) => converters.find((c) => c.slug === s)?.name === n)]})`).join(", ")}.`;
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

const converterFormulas: Record<string, string> = {
  "length-converter": "Each length unit is converted to meters (the base SI unit) using a fixed conversion factor, then converted to the target unit. For example: 1 inch = 0.0254 meters, 1 foot = 0.3048 meters, 1 mile = 1609.344 meters.",
  "weight-converter": "Weight units are converted to grams as the base unit. For example: 1 kilogram = 1000 grams, 1 ounce = 28.3495 grams, 1 pound = 453.592 grams.",
  "area-converter": "Area units are converted to square meters. For example: 1 square foot = 0.0929 m², 1 acre = 4046.86 m², 1 hectare = 10000 m².",
  "volume-converter": "Volume units are converted to liters. For example: 1 US gallon = 3.785 liters, 1 UK gallon = 4.546 liters, 1 cubic meter = 1000 liters.",
  "speed-converter": "Speed units are converted to meters per second. For example: 1 km/h = 0.2778 m/s, 1 mph = 0.4470 m/s, Mach depends on the speed of sound (343 m/s at sea level).",
  "temperature-converter": "All temperature scales are first converted to Kelvin, then converted to the target scale. Celsius: K = °C + 273.15. Fahrenheit: K = (°F + 459.67) × 5/9. Rankine: K = °R × 5/9. Réaumur: K = °Ré × 5/4 + 273.15.",
  "pressure-converter": "Pressure units are converted to pascals. For example: 1 bar = 100,000 Pa, 1 psi = 6894.76 Pa, 1 atm = 101,325 Pa.",
  "energy-converter": "Energy units are converted to joules. For example: 1 calorie = 4.184 J, 1 kWh = 3,600,000 J, 1 BTU = 1055.06 J.",
  "time-converter": "Time units are converted to seconds. For example: 1 minute = 60 seconds, 1 hour = 3600 seconds, 1 day = 86400 seconds, 1 year = 31,557,600 seconds.",
  "data-storage-converter": "Data units use decimal prefixes: 1 KB = 1000 bytes, 1 MB = 1,000,000 bytes. Binary prefixes: 1 KiB = 1024 bytes, 1 MiB = 1,048,576 bytes. All values convert through bytes.",
  "fuel-economy-converter": "km/L is the base unit. L/100km = 100 / km/L. US MPG = km/L × 2.35215. UK MPG = km/L × 2.82481. The converter handles these nonlinear relationships.",
  "angle-converter": "All angle units convert through radians. Degrees: rad = ° × π/180. Gradians: rad = grad × π/200. Minutes of arc: rad = ' × π/10800. Turns: 1 turn = 2π radians.",
  "density-converter": "Density units convert through kg/m³. g/cm³ = kg/m³ × 1000. lb/ft³ = kg/m³ × 0.0624. g/L is equivalent to kg/m³.",
  "frequency-converter": "Frequency units convert through hertz. 1 kHz = 1000 Hz, 1 MHz = 1,000,000 Hz. RPM = Hz × 60. rad/s = Hz × 2π.",
  "power-converter": "Power units convert through watts. 1 kW = 1000 W, 1 hp = 745.7 W, 1 BTU/h = 0.293 W. The converter handles all standard power units.",
  "current-converter": "Electric current converts through amperes. 1 mA = 0.001 A, 1 kA = 1000 A, 1 µA = 0.000001 A. All units use standard SI prefixes.",
  "voltage-converter": "Voltage converts through volts. 1 mV = 0.001 V, 1 kV = 1000 V, 1 MV = 1,000,000 V, 1 µV = 0.000001 V.",
  "resistance-converter": "Resistance converts through ohms. 1 mΩ = 0.001 Ω, 1 kΩ = 1000 Ω, 1 MΩ = 1,000,000 Ω, 1 µΩ = 0.000001 Ω.",
  "capacitance-converter": "Capacitance converts through farads. 1 mF = 0.001 F, 1 µF = 0.000001 F, 1 nF = 10⁻⁹ F, 1 pF = 10⁻¹² F.",
  "inductance-converter": "Inductance converts through henries. 1 mH = 0.001 H, 1 µH = 0.000001 H, 1 nH = 10⁻⁹ H.",
  "force-converter": "Force converts through newtons. 1 kN = 1000 N, 1 dyne = 10⁻⁵ N, 1 lbf = 4.448 N, 1 kgf = 9.807 N.",
  "magnetic-field-converter": "Magnetic field converts through tesla. 1 gauss = 10⁻⁴ T, 1 mT = 0.001 T, 1 µT = 10⁻⁶ T, 1 nT = 10⁻⁹ T.",
  "concentration-converter": "Concentration units use glucose-based molar conversions: 1 mmol/L = 18.0182 mg/dL (for glucose). Other relationships: 1 ppm = 1 mg/L, 1% = 10,000 ppm.",
  "typography-converter": "Typography units convert through millimeters. 1 point = 0.3528 mm, 1 pica = 4.2333 mm, 1 pixel (at 96 DPI) = 0.2646 mm. em and rem default to 1 em = 12 pt.",
  "shoe-size-converter": "US Men: cm = (US M + 24) × 0.847. US Women: cm = (US W + 22) × 0.847. UK: cm = (UK + 25) × 0.847. EU: cm = EU × 0.667 - 2. All sizes convert through centimeters.",
  "clothing-size-converter": "All sizes are converted relative to US sizes as the base. UK = US - 2 (women's dresses), EU = US + 30, JP ≈ US + 7, FR ≈ EU, IT = EU + 4, RU = EU + 2. These are approximate conversions as sizing varies by brand.",
  "ring-size-converter": "All ring size systems convert through circumference in millimeters. US = (Circumference - 40.82) / 2.54. UK = (Circumference - 40.82) / 2.62. EU = Circumference - 40. Diameter = Circumference / π.",
};

const converterBenefits: Record<string, string> = {
  "length-converter": "Essential for construction, engineering, travel, shipping, and everyday measurements. Perfect for architects, engineers, students, and DIY enthusiasts who work with different measurement systems.",
  "weight-converter": "Vital for cooking, shipping, fitness, science experiments, and international trade. Useful for chefs, pharmacists, gym-goers, and anyone comparing products across different unit systems.",
  "area-converter": "Critical for real estate, construction, agriculture, land management, and interior design. Helps homeowners, agents, farmers, and contractors compare property sizes and material coverage.",
  "volume-converter": "Important for cooking, chemistry, automotive, brewing, and liquid measurement. Ideal for chefs, scientists, mechanics, and anyone working with recipes or fluids.",
  "speed-converter": "Useful for driving, aviation, sailing, sports science, and physics. Helps travelers, pilots, sailors, athletes, and students understand speed limits and performance metrics.",
  "temperature-converter": "Essential for cooking, weather, science, healthcare, and international travel. Used by chefs, meteorologists, scientists, and travelers navigating different temperature scales.",
  "pressure-converter": "Critical for automotive, HVAC, scuba diving, weather monitoring, and industrial processes. Important for mechanics, engineers, divers, and meteorologists.",
  "energy-converter": "Important for nutrition, electricity billing, physics, engineering, and comparing energy sources. Useful for dietitians, homeowners, students, and engineers.",
  "time-converter": "Essential for project management, programming, physics, payroll, and scheduling. Used by project managers, developers, scientists, and HR professionals.",
  "data-storage-converter": "Critical for IT, cloud computing, data backup planning, and understanding storage specifications. Essential for IT professionals, developers, and anyone comparing storage devices.",
  "fuel-economy-converter": "Important for car buyers, fleet managers, travelers comparing vehicles across regions, and understanding fuel efficiency standards in different countries.",
  "angle-converter": "Essential for trigonometry, navigation, surveying, robotics, and game development. Used by mathematicians, engineers, surveyors, and game developers.",
  "density-converter": "Important for material science, chemistry, fluid dynamics, and quality control. Used by scientists, engineers, and manufacturers working with material properties.",
  "frequency-converter": "Critical for audio engineering, radio communications, electronics, and vibration analysis. Essential for sound engineers, electricians, and RF technicians.",
  "power-converter": "Important for automotive, industrial equipment, HVAC, and comparing engine or motor specifications across different unit systems.",
  "current-converter": "Essential for electronics design, electrical engineering, circuit analysis, and component selection. Used by electricians, hobbyists, and engineers.",
  "voltage-converter": "Critical for electronics, power systems, automotive diagnostics, and understanding electrical specifications across different equipment.",
  "resistance-converter": "Essential for circuit design, electronics repair, component selection, and understanding resistor specifications in different unit ranges.",
  "capacitance-converter": "Important for electronics design, filter circuits, power supply design, and selecting the right capacitor for any application.",
  "inductance-converter": "Critical for RF circuit design, power electronics, filter design, and understanding inductor specifications across different value ranges.",
  "force-converter": "Important for physics, engineering, automotive, aerospace, and understanding mechanical specifications in different unit systems.",
  "magnetic-field-converter": "Essential for physics, electronics, geophysics, and understanding magnetic field measurements in scientific and industrial applications.",
  "concentration-converter": "Critical for medical diagnostics, laboratory work, environmental monitoring, and understanding chemical concentration reports across different measurement systems.",
  "typography-converter": "Essential for graphic design, web development, print publishing, and maintaining consistent font sizes across different media and measurement systems.",
  "shoe-size-converter": "Vital for online shopping, international travel, and ensuring correct shoe fit when ordering from brands that use different sizing systems.",
  "clothing-size-converter": "Essential for online shopping, international fashion retail, and finding the right fit when ordering clothes from different countries.",
  "ring-size-converter": "Important for jewelry shopping, gift giving, and ensuring the perfect ring fit when ordering from international jewelers.",
};

const converterMistakes: Record<string, string> = {
  "length-converter": "- Confusing US survey feet with international feet\n- Using the wrong decimal separator (comma vs. period)\n- Misreading millimeter and centimeter values\n- Forgetting that nautical miles differ from statute miles",
  "weight-converter": "- Confusing US tons with imperial (UK) tons\n- Mixing up ounces (weight) with fluid ounces (volume)\n- Using the wrong conversion factor for precious metals (troy ounces)\n- Assuming kilograms and pounds are linearly related by a simple round number",
  "area-converter": "- Confusing acres with hectares\n- Assuming square meters and square feet are linearly related by the same factor as meters and feet\n- Forgetting that area units square the linear conversion factor\n- Mixing up square inches with square feet",
  "volume-converter": "- Confusing US and UK gallons (they differ by about 20%)\n- Assuming milliliters and fluid ounces are 1:1\n- Using dry gallon measurements instead of liquid\n- Mixing up tablespoons with teaspoons",
  "speed-converter": "- Forgetting that Mach varies with altitude and temperature\n- Confusing knots with miles per hour\n- Using the wrong conversion direction (multiply vs. divide)\n- Assuming km/h to mph is a simple 1:1.6 relationship in all contexts",
  "temperature-converter": "- Forgetting to add/subtract the offset when converting between Celsius and Fahrenheit\n- Using the conversion factor but forgetting the +32/-32 for °C/°F\n- Confusing Rankine with Fahrenheit (same degree size but different zero point)\n- Assuming Kelvin uses degrees (it does not — just K)",
  "pressure-converter": "- Confusing bar with psi (they are very different magnitudes — 1 bar ≈ 14.5 psi)\n- Using the wrong reference (gauge pressure vs. absolute pressure)\n- Forgetting that mmHg and torr are slightly different at non-standard temperatures\n- Confusing mmH₂O with mmHg (water is much less dense than mercury)",
  "energy-converter": "- Confusing calories with kilocalories (food calories are actually kcal)\n- Assuming watt-hours and watt-seconds are the same\n- Using the wrong BTU definition (there are multiple variants)\n- Forgetting that electronvolts are extremely small (1 eV = 1.6 × 10⁻¹⁹ J)",
  "time-converter": "- Assuming all months have 30 days\n- Forgetting that leap years add an extra day to February\n- Confusing 12-hour and 24-hour clock formats\n- Assuming weeks are exactly 0.23 months (month length varies)",
  "data-storage-converter": "- Confusing binary (GiB) with decimal (GB) prefixes — 1 GB ≠ 1 GiB\n- Assuming hard drive manufacturers use binary prefixes (they use decimal)\n- Mixing up bits and bytes (1 byte = 8 bits)\n- Using the wrong prefix for network speeds (usually bits, not bytes)",
  "fuel-economy-converter": "- Confusing US MPG with UK MPG (different gallon sizes)\n- Assuming L/100km and km/L are reciprocals (they are, but the direction matters)\n- Using the wrong conversion formula between MPG and L/100km\n- Forgetting that lower L/100km means better efficiency",
  "angle-converter": "- Confusing degrees with radians (they are very different — 360° = 2π rad)\n- Assuming gradians are the same as degrees\n- Forgetting to convert between decimal degrees and DMS (degrees, minutes, seconds)\n- Mixing up minutes of arc with time minutes",
  "density-converter": "- Assuming g/cm³ and kg/m³ are the same number (they differ by a factor of 1000)\n- Confusing specific gravity with density\n- Using the wrong temperature reference (density changes with temperature)\n- Assuming lb/ft³ and kg/m³ are directly comparable without conversion",
  "frequency-converter": "- Confusing RPM with Hz (1 Hz = 60 RPM, not 1 RPM = 60 Hz)\n- Assuming kHz and MHz are 10x apart (they are 1000x apart)\n- Forgetting that rad/s is different from Hz (2π rad/s = 1 Hz)\n- Using frequency when angular frequency is required",
  "power-converter": "- Confusing mechanical horsepower with metric horsepower (they differ slightly)\n- Assuming watts and BTU/h are directly comparable (1 W ≈ 3.412 BTU/h)\n- Using the wrong conversion factor for older horsepower definitions\n- Confusing power (watts) with energy (watt-hours)",
  "current-converter": "- Confusing amperes with milliamperes (off by 1000x)\n- Assuming current conversion follows the same pattern as voltage\n- Using wrong SI prefix multipliers\n- Forgetting that current values can be negative (direction matters)",
  "voltage-converter": "- Confusing millivolts with microvolts (off by 1000x)\n- Assuming high voltage conversion is the same as low voltage\n- Using the wrong decimal places for very small or large values\n- Forgetting that voltage is always measured between two points",
  "resistance-converter": "- Confusing kilohms with megohms (off by 1000x)\n- Assuming resistance values follow a linear scale\n- Using wrong color code reading for 5-band vs 4-band resistors\n- Forgetting that zero-ohm resistors exist (they are jumpers)",
  "capacitance-converter": "- Confusing microfarads with picofarads (off by 1,000,000x)\n- Misreading capacitor markings (nF vs µF vs pF)\n- Assuming farads are common (most capacitors use µF, nF, or pF)\n- Forgetting that some capacitors use EIA code (three-digit markings)",
  "inductance-converter": "- Confusing millihenries with microhenries (off by 1000x)\n- Assuming inductor values follow the same pattern as capacitor values\n- Using the wrong frequency for impedance calculations\n- Forgetting that air-core and iron-core inductors behave differently",
  "force-converter": "- Confusing mass (kg) with force (N) — they are different physical quantities\n- Assuming kgf means the same everywhere (g varies slightly by location)\n- Using the wrong gravitational acceleration value (9.81 vs 9.8 vs 10)\n- Confusing pound-mass with pound-force",
  "magnetic-field-converter": "- Confusing tesla with gauss (1 T = 10,000 G, not 1000)\n- Assuming millitesla and microtesla are the same\n- Using the wrong scale for Earth's magnetic field (it is in µT, not T)\n- Forgetting that magnetic field strength (H) differs from flux density (B)",
  "concentration-converter": "- Assuming all molar conversions use the same factor (it depends on molecular weight)\n- Confusing mg/dL with mmol/L for blood glucose (use 18.0182 factor)\n- Using ppm when the solution density is not 1 g/mL\n- Confusing mass/volume percent with mass/mass percent",
  "typography-converter": "- Assuming 1 pt = 1 px (they are different — at 96 DPI, 1 pt = 1.333 px)\n- Confusing picas with points (1 pica = 12 points)\n- Using the wrong DPI for screen vs. print conversion\n- Assuming em and rem are fixed sizes (they are relative to font-size)",
  "shoe-size-converter": "- Assuming US Men and US Women sizes are the same (they differ by about 1.5-2 sizes)\n- Confusing UK sizes with US sizes (UK is typically 1 smaller)\n- Using the wrong conversion for children vs. adult sizes\n- Assuming all brands follow the same sizing standard",
  "clothing-size-converter": "- Assuming sizes are consistent across brands (they vary significantly)\n- Confusing women's sizing with men's sizing systems\n- Using the wrong conversion for different garment types (tops vs. bottoms)\n- Assuming EU sizes are the same as UK sizes (they are different systems)",
  "ring-size-converter": "- Measuring at the wrong time of day (fingers swell throughout the day)\n- Confusing diameter with circumference (the most common mistake — C = πD)\n- Assuming US and UK sizes follow the same numbering\n- Using the wrong finger measurement (dominant hand fingers are slightly larger)",
};

function getConverterBenefits(conv: ConverterDefinition): string {
  const cat = conv.slug;
  const benefits = converterBenefits[cat];
  if (!benefits) return `The ${conv.name} helps you quickly and accurately convert between different units of measurement. It is useful for professionals, students, and anyone working with international measurements.`;
  return benefits;
}

function getConverterMistakes(conv: ConverterDefinition): string {
  const cat = conv.slug;
  const mistakes = converterMistakes[cat];
  if (!mistakes) return `When using the ${conv.name}, always double-check your input value and selected units. Ensure you are converting in the correct direction (from → to).`;
  return `Avoid these common pitfalls when using the ${conv.name}:\n\n${mistakes}\n\nBeing aware of these issues will help you get accurate conversions every time.`;
}

function getConverterConclusion(conv: ConverterDefinition): string {
  const relatedNames = conv.relatedSlugs
    .map((slug) => converters.find((c) => c.slug === slug)?.name)
    .filter(Boolean);
  const relatedRef = relatedNames.length > 0
    ? ` For other conversions, try our ${relatedNames.slice(0, 2).join(" and ")}.`
    : "";
  return `The ${conv.name} is a free, accurate tool that handles all standard unit conversions instantly. Whether you are working on a project, studying, shopping internationally, or just curious, this converter ensures you get precise results every time.${relatedRef} Try it now with your own values above.`;
}

export function getConverterContent(conv: ConverterDefinition): ContentSection[] {
  const sections: ContentSection[] = [];

  sections.push({
    title: `What is ${conv.name}?`,
    body: `The ${conv.name} is a free online tool that helps you convert values between different units of ${conv.name.toLowerCase().replace(" converter", "")}. ${conv.description} This tool provides instant, accurate results with support for all major unit conversions in this category.`,
  });

  const formula = converterFormulas[conv.slug];
  if (formula) {
    sections.push({
      title: "How the Conversion Works",
      body: formula,
    });
  }

  const unitNames = conv.units.slice(0, 5).map((u) => `${u.name} (${u.symbol})`).join(", ");
  sections.push({
    title: "How to Use This Converter",
    body: `Using the ${conv.name} is simple:\n\n1. Enter the numeric value you want to convert in the input field\n2. Select the unit you are converting from using the first dropdown (available units: ${unitNames}${conv.units.length > 5 ? `, and ${conv.units.length - 5} more` : ""})\n3. Select the unit you are converting to using the second dropdown\n4. Click "Convert" to see the result instantly\n5. Use the "Swap" button to quickly reverse the conversion direction\n6. View the "All Conversions" table to see the value in every available unit`,
  });

  if (conv.popularConversions && conv.popularConversions.length > 0) {
    const popularExamples = conv.popularConversions.slice(0, 3).map((pc) => `1 ${pc.from} → ? ${pc.to}`).join(", ");
    sections.push({
      title: "Example Conversions",
      body: `Here are some common conversions you can perform with this tool:\n\n${popularExamples}\n\nTry clicking any of the "Popular Conversions" buttons above to instantly set up these conversions. For example, you can quickly convert between metric and imperial units, which is especially useful when working with international measurements or specifications.`,
    });
  }

  sections.push({
    title: "Benefits and Use Cases",
    body: getConverterBenefits(conv),
  });

  sections.push({
    title: "Common Mistakes to Avoid",
    body: getConverterMistakes(conv),
  });

  const toolLinks = getRelatedConverterLinks(conv);
  if (toolLinks) {
    sections.push({
      title: "Related Tools",
      body: toolLinks,
    });
  }

  const articles = getRelatedArticles(conv.slug);
  if (articles) {
    sections.push({
      title: "Related Articles",
      body: articles,
    });
  }

  sections.push({
    title: "Conclusion",
    body: getConverterConclusion(conv),
  });

  return sections;
}
