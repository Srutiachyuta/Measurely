export interface CategoryFaq {
  question: string;
  answer: string;
}

export interface CategoryContent {
  intro: string;
  faqs: CategoryFaq[];
  comparisonSlugs: string[];
}

export const categoryContent: Record<string, CategoryContent> = {
  finance: {
    intro:
      "Make smarter financial decisions with our comprehensive suite of finance calculators. From loan EMIs and investment planning to tax calculations and currency conversions, these tools help you plan your personal and business finances with confidence. Whether you're evaluating a home loan, comparing investment options, or estimating tax liability, our calculators provide accurate results in seconds.",
    faqs: [
      { question: "How accurate are these finance calculators?", answer: "Our calculators use standard financial formulas and provide accurate estimates. Always consult a financial advisor for personalized advice." },
      { question: "Can I use these calculators for business planning?", answer: "Yes, tools like the ROI calculator, salary calculator, and GST calculator are designed for both personal and business use." },
      { question: "Are the results saved anywhere?", answer: "No, all calculations are processed client-side in your browser. We do not store any financial data you enter." },
    ],
    comparisonSlugs: ["sip-vs-fd", "simple-vs-compound-interest", "old-vs-new-tax-regime", "rd-vs-sip"],
  },
  health: {
    intro:
      "Track and improve your health with our evidence-based health calculators. Calculate your BMI, body fat percentage, daily calorie needs, and more. These tools help you set fitness goals, monitor progress, and understand key health metrics. All calculators use widely accepted medical formulas and standards.",
    faqs: [
      { question: "Are these health calculators medically accurate?", answer: "Yes, they use established medical formulas. However, they provide estimates and should not replace professional medical advice." },
      { question: "How often should I check my BMI?", answer: "Checking every 2-4 weeks is reasonable when tracking changes. BMI is most useful as a screening tool, not a diagnostic one." },
      { question: "What is a healthy body fat percentage?", answer: "For men, 10-20% is considered healthy. For women, 18-28% is healthy. Athletes may have lower percentages." },
    ],
    comparisonSlugs: ["bmi-vs-body-fat"],
  },
  math: {
    intro:
      "Solve mathematical problems quickly with our collection of math calculators. From basic percentage calculations and fraction arithmetic to advanced matrix operations and equation solving, these tools handle everything from homework help to complex statistical analysis.",
    faqs: [
      { question: "Can I use these for exam preparation?", answer: "Yes, our calculators are great for checking your work and understanding mathematical concepts." },
      { question: "Do you support higher-level math?", answer: "Yes, we have tools for matrix operations, equation solving, statistics, and scientific calculations." },
    ],
    comparisonSlugs: [],
  },
  "unit-converters": {
    intro:
      "Convert between any units of measurement with our comprehensive collection of unit converters. From everyday conversions like length, weight, and temperature to specialized converters for pressure, energy, and electrical units, these tools cover every measurement need. Each converter supports multiple units with metric prefixes for maximum flexibility.",
    faqs: [
      { question: "How many units does each converter support?", answer: "Most converters support 10-20 units with common metric prefixes (milli, centi, kilo, etc.) for comprehensive coverage." },
      { question: "Are the conversion formulas accurate?", answer: "Yes, all conversions use standard international formulas and are verified for accuracy." },
    ],
    comparisonSlugs: [],
  },
  time: {
    intro:
      "Master time and date calculations with our time calculator suite. Calculate exact ages, find durations between dates or times, and perform date arithmetic. Whether you're planning an event, calculating project timelines, or tracking milestones, these tools provide precise results for all your time-based calculations.",
    faqs: [
      { question: "Can I calculate my exact age down to seconds?", answer: "Yes, our age calculator provides age in years, months, weeks, days, hours, minutes, and seconds." },
      { question: "How accurate are date calculations?", answer: "Date calculations account for leap years and month length variations for 100% accuracy." },
    ],
    comparisonSlugs: [],
  },
  engineering: {
    intro:
      "Solve engineering problems with specialized calculators for electrical, mechanical, and physics applications. Calculate power, resistance, voltage, and more with our Ohm's Law calculator, voltage divider, power calculator, and resistor calculator. These tools are essential for students, hobbyists, and professionals.",
    faqs: [
      { question: "Are these suitable for professional use?", answer: "Yes, the calculators use standard engineering formulas. However, always verify critical designs with professional software." },
      { question: "What electrical units are supported?", answer: "We support volts, amps, ohms, watts, farads, henries, and their metric prefixes for comprehensive electrical calculations." },
    ],
    comparisonSlugs: [],
  },
  construction: {
    intro:
      "Plan your construction and home improvement projects accurately with our construction calculators. Estimate concrete volume, paint quantity, tile requirements, roofing materials, and flooring needs. These tools save time and money by helping you buy the right amount of materials for any project.",
    faqs: [
      { question: "How accurate are material estimates?", answer: "Estimates are based on standard formulas and include typical waste factors. Add 5-10% for offcuts and mistakes." },
      { question: "Can I save my project calculations?", answer: "Calculations are done in your browser and are not saved. We recommend noting down your results." },
    ],
    comparisonSlugs: [],
  },
  "everyday-life": {
    intro:
      "Simplify everyday calculations with practical tools for discounts, tips, bill splitting, and fuel costs. These calculators help you make quick decisions while shopping, dining out, traveling, or managing daily expenses. No complex inputs needed — just enter your numbers and get instant results.",
    faqs: [
      { question: "How is the tip calculated?", answer: "Tips are calculated as a percentage of the bill amount. You can customize the percentage (typically 10-20%)." },
      { question: "Can I split a bill unevenly?", answer: "Our bill split calculator divides the total evenly. For uneven splits, you can calculate each person's share separately." },
    ],
    comparisonSlugs: [],
  },
  "real-estate": {
    intro:
      "Make informed real estate decisions with calculators for mortgage payments, home affordability, rent vs buy analysis, and Canadian mortgage stress tests. Whether you're a first-time homebuyer or evaluating a property investment, these tools help you understand the financial implications of your decision.",
    faqs: [
      { question: "What is a good debt-to-income ratio for a mortgage?", answer: "Most lenders prefer a front-end ratio (housing costs/income) below 28% and a back-end ratio (total debt/income) below 36%." },
      { question: "How much down payment do I need?", answer: "In India, minimum down payment is typically 10-20% of the property value. In Canada, minimum is 5% for homes under $500K." },
    ],
    comparisonSlugs: [],
  },
  retirement: {
    intro:
      "Plan your retirement with confidence using our retirement calculators. Estimate how much you need to save, how long your savings will last, and whether you're on track for the retirement lifestyle you want. These tools help you make informed decisions about your retirement savings strategy.",
    faqs: [
      { question: "How much do I need to retire?", answer: "A common rule is to aim for 25-30 times your annual expenses. Use our retirement calculator for a personalized estimate." },
      { question: "What is the 4% rule?", answer: "The 4% rule suggests withdrawing 4% of your retirement savings annually for a 30-year retirement, adjusting for inflation." },
    ],
    comparisonSlugs: [],
  },
  automotive: {
    intro:
      "Calculate vehicle-related costs, efficiency, and running expenses with our automotive calculators. From EV charging costs and fuel economy to trip fuel estimates, these tools help you understand and optimize your transportation spending.",
    faqs: [
      { question: "How is EV charging cost calculated?", answer: "Charging cost = battery capacity (kWh) × electricity rate. Public charging rates may be higher than home rates." },
      { question: "Is fuel economy the same as fuel efficiency?", answer: "Fuel economy measures distance per unit fuel (km/L or MPG). Fuel efficiency considers energy wasted during operation." },
    ],
    comparisonSlugs: [],
  },
  "social-media": {
    intro:
      "Estimate your social media earnings and optimize your content strategy with our social media calculators. Whether you're a YouTuber estimating ad revenue or a creator planning your monetization strategy, these tools provide realistic earnings estimates based on current industry rates.",
    faqs: [
      { question: "How accurate are YouTube earnings estimates?", answer: "Estimates are based on industry average CPM rates and may vary based on niche, audience location, and engagement." },
      { question: "What is a good CPM rate?", answer: "CPM rates typically range from $1-$20 depending on your content niche and audience demographics." },
    ],
    comparisonSlugs: [],
  },
  business: {
    intro:
      "Grow your business with our suite of business calculators. Measure return on investment, calculate your freelance rates, and analyze profit margins. These tools help entrepreneurs, freelancers, and small business owners make data-driven financial decisions.",
    faqs: [
      { question: "How is ROI calculated?", answer: "ROI = (Net Profit / Cost of Investment) × 100%. A positive ROI means the investment generated more than it cost." },
      { question: "What should I charge as a freelancer?", answer: "Consider your desired annual income, business expenses, billable hours, and market rates. Our freelance rate calculator does the math for you." },
    ],
    comparisonSlugs: [],
  },
};
