const categoryImageMap: Record<string, string> = {
  Engineering: "/images/blog/category-engineering.svg",
  Construction: "/images/blog/category-construction.svg",
  "Daily Life": "/images/blog/category-daily-life.svg",
  Finance: "/images/blog/category-finance.svg",
  Health: "/images/blog/category-health.svg",
  Math: "/images/blog/category-math.svg",
  "Unit Conversion": "/images/blog/category-unit-conversion.svg",
  "Real Estate": "/images/blog/category-real-estate.svg",
  Automotive: "/images/blog/category-automotive.svg",
  Business: "/images/blog/category-business.svg",
  "Social Media": "/images/blog/category-social-media.svg",
  Retirement: "/images/blog/category-retirement.svg",
};

const slugImageMap: Record<string, { alt: string }> = {
  "master-voltage-current-resistance-calculations": {
    alt: "Close-up of an electronic circuit board with microchips and components",
  },
  "precision-voltage-division-circuits": {
    alt: "Electronic circuit board with resistors and capacitors",
  },
  "comprehensive-guide-electrical-power-calculations": {
    alt: "Electrical power lines and energy grid at sunset",
  },
  "complete-guide-resistor-values-color-codes": {
    alt: "Assorted electronic resistors with color-coded bands",
  },
  "calculate-exactly-much-concrete-need": {
    alt: "Fresh concrete being poured into formwork at a construction site",
  },
  "much-paint-need-project": {
    alt: "Paint roller applying fresh color to an interior wall",
  },
  "plan-tiling-project-like-professional": {
    alt: "Professional tiling installation with ceramic tiles",
  },
  "estimate-shingles-underlayment-costs-roof": {
    alt: "New roof being installed with asphalt shingles",
  },
  "estimate-material-costs-any-floor-type": {
    alt: "Beautiful hardwood flooring installation in progress",
  },
  "never-overpay-again-master-savings-calculations": {
    alt: "Shopping bag with sale tags and discounted items",
  },
  "calculate-perfect-tip-any-service-every-time": {
    alt: "Fine dining restaurant table with meal and bill",
  },
  "divide-expenses-fairly-every-time": {
    alt: "Group of friends sharing a meal at a restaurant",
  },
  "plan-road-trip-budget-accurately": {
    alt: "Fuel pump nozzle at a gas station with price display",
  },
  "complete-guide-to-emi-calculators": {
    alt: "Loan agreement documents with calculator and pen",
  },
  "understanding-compound-interest": {
    alt: "Growing stack of coins with upward trend chart",
  },
  "bmi-understanding-your-body-mass-index": {
    alt: "Person standing on a digital weight scale measuring body metrics",
  },
  "bmr-and-weight-management": {
    alt: "Fresh healthy ingredients for balanced nutrition",
  },
  "sip-vs-lumpsum-investing": {
    alt: "Stock market chart with upward trending investments",
  },
  "daily-water-intake-guide": {
    alt: "Glass of fresh water with hydration drops",
  },
  "tax-saving-tips-2026": {
    alt: "Tax forms and documents with calculator for filing",
  },
  "percentage-calculator-everyday-uses": {
    alt: "Mathematical equations and formulas on a chalkboard",
  },
"measure-interpret-body-composition": {
    alt: "Person measuring body composition with fitness tracker",
  },
  "many-calories-need-each-day": {
    alt: "Nutritious meal with portion control and calorie tracking",
  },
  "track-pregnancy-week-by-week": {
    alt: "Expectant mother with ultrasound image of baby",
  },
  "find-target-heart-rate-zones-optimal-fitness": {
    alt: "Heart rate monitor display during cardiovascular exercise",
  },
  "healthy-weight-height-age": {
    alt: "Digital scale with healthy lifestyle concept",
  },
  "gst-explained-for-small-business": {
    alt: "Business tax documents and financial reports",
  },
  "calculate-monthly-payments-accurately": {
    alt: "Bank building with loan approval documents",
  },
  "estimate-home-loan-payments-easily": {
    alt: "Dream home with mortgage contract and keys",
  },
  "simple-vs-compound-interest-explained": {
    alt: "Bank interest rate chart with growing savings",
  },
  "plan-systematic-withdrawals-retirement": {
    alt: "Retirement planning with steady income stream chart",
  },
  "calculate-fixed-deposit-returns-accurately": {
    alt: "Bank passbook and fixed deposit certificate",
  },
  "maximize-recurring-deposit-growth": {
    alt: "Recurring deposit savings plan document with coins",
  },
  "calculate-hand-salary-tax-deductions": {
    alt: "Pay stub and salary breakdown document",
  },
  "master-fractions-step-by-step-solutions": {
    alt: "Mathematical fractions illustrated with pizza slices",
  },
  "master-advanced-math-trig-logs-exponents-more": {
    alt: "Scientific calculator with advanced functions display",
  },
  "master-matrix-operations-step-by-step-solutions": {
    alt: "Matrix grid pattern with mathematical notation",
  },
  "equation-solver-calculator": {
    alt: "Complex mathematical equations on a blackboard",
  },
  "master-greatest-common-factor-least-common": {
    alt: "Number patterns and mathematical sequences",
  },
  "check-list-generate-prime-numbers": {
    alt: "Visualization of prime numbers in number theory",
  },
  "mean-median-mode-standard-deviation-more": {
    alt: "Data analysis charts and statistical graphs",
  },
  "calculate-exact-age-years-months-days-hours": {
    alt: "Calendar pages marking important dates",
  },
  "add-subtract-find-date-differences-ease": {
    alt: "Wall calendar with date markings and planner",
  },
  "days-between-calculator": {
    alt: "Calendar with days counted between marked dates",
  },
  "calculate-hours-minutes-seconds-between-times": {
    alt: "Stopwatch timer measuring time duration",
  },
  "find-week-numbers-calculate-weeks-between-dates": {
    alt: "Weekly planner calendar with schedule",
  },
  "calculate-months-between-dates-add-months-more": {
    alt: "Monthly calendar spread showing days and weeks",
  },
  "calculate-grade-point-average-precision": {
    alt: "Report card with academic grades and GPA",
  },
  "calculate-cumulative-grade-point-average": {
    alt: "Student academic transcript with cumulative grades",
  },
  "calculate-final-grades-weighted-grades-more": {
    alt: "Exam papers with grading marks and scores",
  },
  "complete-guide-calculating-take-home-pay": {
    alt: "Paycheck stub and salary breakdown document on desk",
  },
  "much-house-can-afford": {
    alt: "Dream home with mortgage application documents",
  },
  "which-option-saves-more-money": {
    alt: "Comparison between renting an apartment and buying a house",
  },
  "401k-retirement-calculator": {
    alt: "Retirement savings graph showing 401k growth over time",
  },
  "calculate-electric-vehicle-charging-expenses": {
    alt: "Electric vehicle plugged into a charging station",
  },
  "estimate-creator-earnings": {
    alt: "YouTube creator workspace with analytics and earnings dashboard",
  },
  "understanding-return-investment": {
    alt: "Investment growth chart showing positive return on investment",
  },
  "price-services": {
    alt: "Freelancer working remotely with rate calculation documents",
  },
  "how-to-calculate-tfsa-contribution-room-canada": {
    alt: "TFSA savings growth chart with contribution room calculation",
  },
  "rrsp-contribution-tax-savings-guide": {
    alt: "RRSP tax refund calculation with money and tax documents",
  },
  "ontario-take-home-pay-after-tax-guide": {
    alt: "Ontario paycheck stub showing net salary after tax deductions",
  },
  "ontario-mortgage-stress-test-explained": {
    alt: "Canadian home with mortgage stress test qualification document",
  },
  "canada-child-benefit-calculator-guide": {
    alt: "Canadian family with children and Canada Child Benefit payment illustration",
  },
  "ontario-severance-pay-calculator-guide": {
    alt: "Ontario employment termination and severance pay calculation documents",
  },
  "gst-hst-calculator-ontario-guide": {
    alt: "Ontario HST tax breakdown showing GST and PST components",
  },
  "1099-tax-calculator-freelancers-guide": {
    alt: "Freelancer 1099 tax form with self-employment tax calculation",
  },
  "overtime-pay-calculator-hourly-employees-guide": {
    alt: "Hourly employee timesheet showing overtime pay calculation",
  },
  "debt-to-income-ratio-mortgage-guide": {
    alt: "Debt to income ratio chart for mortgage approval qualification",
  },
  "how-much-does-ai-api-usage-cost-for-a-small-business": {
    alt: "AI API cost calculator dashboard showing token pricing and monthly estimates",
  },
  "how-much-money-do-i-need-to-retire-early-in-india": {
    alt: "FIRE Number Calculator dashboard showing retirement chart, wealth growth graph, and financial independence planning for early retirement in India",
  },
  "how-is-severance-pay-calculated-after-a-layoff": {
    alt: "Employment termination and severance pay calculation documents with calculator and compensation breakdown",
  },
  "how-inheritance-tax-works": {
    alt: "Family estate planning documents with inheritance tax calculator and wealth distribution chart",
  },
};

const categoryAltFallbacks: Record<string, string> = {
  Engineering: "Engineering and technology concept illustration",
  Construction: "Construction site with building materials",
  "Daily Life": "Modern everyday life concept",
  Finance: "Finance and banking concept with money",
  Health: "Health and wellness concept",
  Math: "Mathematics and formulas concept",
  "Unit Conversion": "Measurement and unit conversion tools",
  Education: "Education and learning concept",
  "Real Estate": "Real estate and property concept illustration",
  Automotive: "Automotive and vehicle concept illustration",
  Business: "Business and entrepreneurship concept illustration",
  "Social Media": "Social media and digital marketing concept illustration",
  Retirement: "Retirement planning and savings concept illustration",
};

const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 630;

function getCategoryImagePath(category: string): string {
  return categoryImageMap[category] ?? "/images/blog/category-default.svg";
}

export function getBlogImageUrl(slug: string, category: string): string {
  return getCategoryImagePath(category);
}

export function getBlogImageAlt(slug: string, category: string): string {
  const map = slugImageMap[slug];
  return map?.alt ?? categoryAltFallbacks[category] ?? "Featured image for blog article";
}

export function getBlogOgImageUrl(slug: string, category: string): string {
  return getCategoryImagePath(category);
}

export function getBlogImageDimensions(): { width: number; height: number } {
  return { width: IMAGE_WIDTH, height: IMAGE_HEIGHT };
}
