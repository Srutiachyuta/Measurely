const slugAltMap: Record<string, string> = {
  "master-voltage-current-resistance-calculations": "Close-up of an electronic circuit board with microchips and components",
  "precision-voltage-division-circuits": "Electronic circuit board with resistors and capacitors",
  "comprehensive-guide-electrical-power-calculations": "Electrical power lines and energy grid at sunset",
  "complete-guide-resistor-values-color-codes": "Assorted electronic resistors with color-coded bands",
  "calculate-exactly-much-concrete-need": "Fresh concrete being poured into formwork at a construction site",
  "much-paint-need-project": "Paint roller applying fresh color to an interior wall",
  "plan-tiling-project-like-professional": "Professional tiling installation with ceramic tiles",
  "estimate-shingles-underlayment-costs-roof": "New roof being installed with asphalt shingles",
  "estimate-material-costs-any-floor-type": "Beautiful hardwood flooring installation in progress",
  "never-overpay-again-master-savings-calculations": "Shopping bag with sale tags and discounted items",
  "calculate-perfect-tip-any-service-every-time": "Fine dining restaurant table with meal and bill",
  "divide-expenses-fairly-every-time": "Group of friends sharing a meal at a restaurant",
  "plan-road-trip-budget-accurately": "Fuel pump nozzle at a gas station with price display",
  "complete-guide-to-emi-calculators": "Loan agreement documents with calculator and pen",
  "understanding-compound-interest": "Growing stack of coins with upward trend chart",
  "bmi-understanding-your-body-mass-index": "Person standing on a digital weight scale measuring body metrics",
  "bmr-and-weight-management": "Fresh healthy ingredients for balanced nutrition",
  "sip-vs-lumpsum-investing": "Stock market chart with upward trending investments",
  "daily-water-intake-guide": "Glass of fresh water with hydration drops",
  "tax-saving-tips-2026": "Tax forms and documents with calculator for filing",
  "percentage-calculator-everyday-uses": "Mathematical equations and formulas on a chalkboard",
  "measure-interpret-body-composition": "Person measuring body composition with fitness tracker",
  "many-calories-need-each-day": "Nutritious meal with portion control and calorie tracking",
  "track-pregnancy-week-by-week": "Expectant mother with ultrasound image of baby",
  "find-target-heart-rate-zones-optimal-fitness": "Heart rate monitor display during cardiovascular exercise",
  "healthy-weight-height-age": "Digital scale with healthy lifestyle concept",
  "gst-explained-for-small-business": "Business tax documents and financial reports",
  "calculate-monthly-payments-accurately": "Bank building with loan approval documents",
  "estimate-home-loan-payments-easily": "Dream home with mortgage contract and keys",
  "simple-vs-compound-interest-explained": "Bank interest rate chart with growing savings",
  "plan-systematic-withdrawals-retirement": "Retirement planning with steady income stream chart",
  "calculate-fixed-deposit-returns-accurately": "Bank passbook and fixed deposit certificate",
  "maximize-recurring-deposit-growth": "Recurring deposit savings plan document with coins",
  "calculate-hand-salary-tax-deductions": "Pay stub and salary breakdown document",
  "master-fractions-step-by-step-solutions": "Mathematical fractions illustrated with pizza slices",
  "master-advanced-math-trig-logs-exponents-more": "Scientific calculator with advanced functions display",
  "master-matrix-operations-step-by-step-solutions": "Matrix grid pattern with mathematical notation",
  "equation-solver-calculator": "Complex mathematical equations on a blackboard",
  "master-greatest-common-factor-least-common": "Number patterns and mathematical sequences",
  "check-list-generate-prime-numbers": "Visualization of prime numbers in number theory",
  "calculate-exact-age-years-months-days-hours": "Calendar pages marking important dates",
  "add-subtract-find-date-differences-ease": "Wall calendar with date markings and planner",
  "days-between-calculator": "Calendar with days counted between marked dates",
  "calculate-hours-minutes-seconds-between-times": "Stopwatch timer measuring time duration",
  "find-week-numbers-calculate-weeks-between-dates": "Weekly planner calendar with schedule",
  "calculate-months-between-dates-add-months-more": "Monthly calendar spread showing days and weeks",
  "calculate-grade-point-average-precision": "Report card with academic grades and GPA",
  "calculate-cumulative-grade-point-average": "Student academic transcript with cumulative grades",
  "calculate-final-grades-weighted-grades-more": "Exam papers with grading marks and scores",
  "complete-guide-calculating-take-home-pay": "Paycheck stub and salary breakdown document on desk",
  "much-house-can-afford": "Dream home with mortgage application documents",
  "which-option-saves-more-money": "Comparison between renting an apartment and buying a house",
  "401k-retirement-calculator": "Retirement savings graph showing 401k growth over time",
  "calculate-electric-vehicle-charging-expenses": "Electric vehicle plugged into a charging station",
  "estimate-creator-earnings": "YouTube creator workspace with analytics and earnings dashboard",
  "understanding-return-investment": "Investment growth chart showing positive return on investment",
  "price-services": "Freelancer working remotely with rate calculation documents",
  "how-to-calculate-tfsa-contribution-room-canada": "TFSA savings growth chart with contribution room calculation",
  "rrsp-contribution-tax-savings-guide": "RRSP tax refund calculation with money and tax documents",
  "ontario-take-home-pay-after-tax-guide": "Ontario paycheck stub showing net salary after tax deductions",
  "ontario-mortgage-stress-test-explained": "Canadian home with mortgage stress test qualification document",
  "canada-child-benefit-calculator-guide": "Canadian family with children and Canada Child Benefit payment illustration",
  "ontario-severance-pay-calculator-guide": "Ontario employment termination and severance pay calculation documents",
  "gst-hst-calculator-ontario-guide": "Ontario HST tax breakdown showing GST and PST components",
  "1099-tax-calculator-freelancers-guide": "Freelancer 1099 tax form with self-employment tax calculation",
  "overtime-pay-calculator-hourly-employees-guide": "Hourly employee timesheet showing overtime pay calculation",
  "debt-to-income-ratio-mortgage-guide": "Debt to income ratio chart for mortgage approval qualification",
  "how-much-does-ai-api-usage-cost-for-a-small-business": "AI API cost calculator dashboard showing token pricing and monthly estimates",
  "how-much-money-do-i-need-to-retire-early-in-india": "FIRE Number Calculator dashboard showing retirement chart, wealth growth graph, and financial independence planning for early retirement in India",
  "how-is-severance-pay-calculated-after-a-layoff": "Employment termination and severance pay calculation documents with calculator and compensation breakdown",
  "how-inheritance-tax-works": "Family estate planning documents with inheritance tax calculator and wealth distribution chart",
};

const pngSlugs = new Set([
  "how-to-build-a-cd-ladder",
  "how-much-emergency-fund-should-i-have",
  "how-is-severance-pay-calculated-after-a-layoff",
  "how-inheritance-tax-works",
  "how-to-pay-off-student-loans-faster-without-refinancing",
  "how-much-does-ai-api-usage-cost-for-a-small-business",
  "how-much-home-equity-can-i-borrow",
  "how-much-money-do-i-need-to-retire-early-in-india",
  "how-to-calculate-quarterly-estimated-taxes-for-self-employed",
  "how-to-forecast-business-cash-flow-accurately-in-2026-2027",
]);

export function getPlaceholderImage(slug: string): string {
  const ext = pngSlugs.has(slug) ? "png" : "svg";
  return `/images/blog/placeholders/${slug}.${ext}`;
}

function categoryToSlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export function getBlogImageUrl(slug: string, category: string): string {
  if (pngSlugs.has(slug)) {
    return getPlaceholderImage(slug);
  }
  return `/images/blog/category-${categoryToSlug(category)}.svg`;
}

export function getBlogImageAlt(slug: string, category: string): string {
  if (pngSlugs.has(slug)) {
    return slugAltMap[slug] ?? "Featured image for blog article";
  }
  return `${category} blog article illustration`;
}

export function getBlogImageDimensions(): { width: number; height: number } {
  return { width: 1200, height: 630 };
}
