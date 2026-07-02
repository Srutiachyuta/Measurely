export interface ComparisonRow {
  feature: string;
  a: string;
  b: string;
}

export interface ComparisonFaq {
  question: string;
  answer: string;
}

export interface ComparisonDefinition {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  toolA: { slug: string; name: string };
  toolB: { slug: string; name: string };
  overview: string;
  keyDifferences: string[];
  table: ComparisonRow[];
  faqs: ComparisonFaq[];
  relatedSlugs: string[];
}

export const comparisons: ComparisonDefinition[] = [
  {
    slug: "sip-vs-fd",
    name: "SIP vs FD",
    metaTitle: "SIP vs FD: Which Investment is Better? | Compare Returns | Measurely",
    metaDescription: "Compare Systematic Investment Plan (SIP) vs Fixed Deposit (FD) returns. Understand the differences in returns, risk, liquidity, and tax treatment to make an informed decision.",
    description: "Compare SIP vs FD investments — returns, risk, liquidity, tax, and which is better for your financial goals.",
    toolA: { slug: "sip-calculator", name: "SIP Calculator" },
    toolB: { slug: "fd-calculator", name: "FD Calculator" },
    overview:
      "SIP (Systematic Investment Plan) and FD (Fixed Deposit) are two of the most popular investment options in India, but they cater to very different financial needs. SIP involves investing a fixed amount regularly in mutual funds, offering market-linked returns with higher risk. FD offers guaranteed returns at a fixed interest rate with virtually no risk. The choice depends on your financial goals, risk appetite, and investment horizon.",
    keyDifferences: [
      "Returns: SIP returns are market-linked and variable (8-15% historically), while FD returns are fixed and guaranteed (5-8% depending on the bank and tenure).",
      "Risk: SIP carries market risk — your capital is not guaranteed. FD is virtually risk-free with deposit insurance coverage.",
      "Liquidity: SIP investments can be redeemed anytime (exit load may apply in the first year). FD offers premature withdrawal with a penalty.",
      "Tax Treatment: SIP gains are taxed as capital gains (LTCG over 1L at 10%, STCG at slab rate). FD interest is added to income and taxed per slab.",
      "Lock-in: ELSS SIPs have a 3-year lock-in. FDs have a minimum tenure but no lock-in beyond that.",
    ],
    table: [
      { feature: "Returns", a: "Market-linked, 8-15% historical", b: "Fixed, 5-8% depending on bank" },
      { feature: "Risk Level", a: "Moderate to High", b: "Very Low (guaranteed)" },
      { feature: "Liquidity", a: "High (exit load in year 1)", b: "Moderate (penalty for premature withdrawal)" },
      { feature: "Minimum Investment", a: "₹500/month", b: "₹1,000 lump sum" },
      { feature: "Tenure", a: "Flexible (no fixed tenure)", b: "7 days to 10 years" },
      { feature: "Tax on Returns", a: "Capital gains tax (LTCG/STCG)", b: "Added to income, taxed per slab" },
      { feature: "TDS", a: "None", b: "10% (if interest > ₹40,000)" },
      { feature: "Best For", a: "Long-term wealth creation", b: "Short-term goals, emergency fund" },
      { feature: "Inflation Protection", a: "Good (historically beats inflation)", b: "Poor (returns often below inflation)" },
      { feature: "Capital Protection", a: "Not guaranteed", b: "Guaranteed" },
    ],
    faqs: [
      { question: "Which gives better returns, SIP or FD?", answer: "SIP in equity mutual funds has historically delivered 8-15% annualized returns over the long term, while FDs typically offer 5-8%. However, SIP returns are not guaranteed and carry market risk." },
      { question: "Is SIP safer than FD?", answer: "No, FD is safer. FD returns are guaranteed and insured up to ₹5 lakh by DICGC. SIP in equity funds carries market risk and capital is not protected." },
      { question: "Can I lose money in SIP?", answer: "Yes, SIP in equity mutual funds can lose value if the market declines, especially over short periods. However, regular investing through market cycles reduces the average cost." },
      { question: "Which is better for a 5-year goal — SIP or FD?", answer: "For 5-year goals, SIP in a balanced fund or large-cap fund may offer better post-tax returns, while FD provides certainty. If you need guaranteed returns, choose FD." },
      { question: "Should I do both SIP and FD?", answer: "Yes, a balanced approach works well. Use FD for emergency funds and short-term goals, and SIP for long-term wealth creation." },
    ],
    relatedSlugs: ["sip-calculator", "fd-calculator", "swp-calculator", "compound-interest-calculator", "rd-calculator"],
  },
  {
    slug: "simple-vs-compound-interest",
    name: "Simple vs Compound Interest",
    metaTitle: "Simple Interest vs Compound Interest: Key Differences | Compare Calculator",
    metaDescription: "Understand the difference between simple and compound interest. See how compounding grows your money faster with our comparison guide.",
    description: "Compare simple interest and compound interest — how they work, which earns more, and when each is used.",
    toolA: { slug: "interest-calculator", name: "Interest Calculator" },
    toolB: { slug: "compound-interest-calculator", name: "Compound Interest Calculator" },
    overview:
      "Simple interest and compound interest are two ways of calculating interest on loans and investments. Simple interest is calculated only on the principal amount, while compound interest is calculated on both the principal and accumulated interest. Over time, compounding creates exponential growth, making it a powerful tool for long-term investing.",
    keyDifferences: [
      "Simple interest is calculated on the principal only each period. Compound interest is calculated on principal + accumulated interest from previous periods.",
      "Simple interest grows linearly (straight line). Compound interest grows exponentially (curve).",
      "For the same principal, rate, and time, compound interest always yields more than simple interest.",
      "Simple interest is commonly used for short-term loans, car loans, and some bonds. Compound interest is used for investments, savings accounts, and credit cards.",
    ],
    table: [
      { feature: "Formula", a: "A = P(1 + rt)", b: "A = P(1 + r)^t" },
      { feature: "Growth Pattern", a: "Linear", b: "Exponential" },
      { feature: "Interest on Interest", a: "No", b: "Yes" },
      { feature: "Same Principal & Rate", a: "Lower returns", b: "Higher returns" },
      { feature: "Common Uses", a: "Car loans, short-term loans, bonds", b: "Investments, savings accounts, credit cards" },
      { feature: "Best For", a: "Short-term borrowing", b: "Long-term investing" },
    ],
    faqs: [
      { question: "Which is better, simple or compound interest?", answer: "For investors, compound interest is better because it grows money faster. For borrowers, simple interest means lower total interest paid over the loan term." },
      { question: "How often is interest compounded?", answer: "Interest can be compounded daily, monthly, quarterly, half-yearly, or annually. More frequent compounding results in higher effective returns." },
      { question: "What is the Rule of 72?", answer: "The Rule of 72 estimates how long it takes to double your money with compound interest: divide 72 by the annual rate. At 8%, money doubles in about 9 years." },
    ],
    relatedSlugs: ["interest-calculator", "compound-interest-calculator", "sip-calculator", "fd-calculator"],
  },
  {
    slug: "bmi-vs-body-fat",
    name: "BMI vs Body Fat",
    metaTitle: "BMI vs Body Fat Percentage: Differences & Accuracy | Compare | Measurely",
    metaDescription: "Compare BMI vs Body Fat Percentage — understand the differences, accuracy, and which metric is better for assessing your health.",
    description: "Compare BMI and body fat percentage — accuracy, limitations, and which metric better reflects your health.",
    toolA: { slug: "bmi-calculator", name: "BMI Calculator" },
    toolB: { slug: "body-fat-calculator", name: "Body Fat Calculator" },
    overview:
      "BMI (Body Mass Index) and body fat percentage are two different ways to assess body composition and health. BMI uses height and weight to categorize individuals into weight ranges, while body fat percentage directly measures the proportion of fat in your body. While BMI is simpler and widely used, body fat percentage is generally more accurate for assessing health, especially for athletes and muscular individuals.",
    keyDifferences: [
      "BMI uses only height and weight. Body fat percentage directly measures fat mass vs lean mass.",
      "BMI can misclassify muscular individuals as overweight. Body fat percentage accounts for muscle mass.",
      "BMI is calculated with a simple formula. Body fat percentage requires measurements (skinfold, circumference, or device).",
      "Body fat percentage is a better predictor of metabolic health risks than BMI alone.",
    ],
    table: [
      { feature: "What It Measures", a: "Weight relative to height", b: "Proportion of fat in the body" },
      { feature: "Formula", a: "Weight (kg) / Height² (m²)", b: "Circumference measurements + formula" },
      { feature: "Ease of Measurement", a: "Very easy (scale + height)", b: "Moderate (requires measuring tape)" },
      { feature: "Accuracy", a: "Limited (doesn't distinguish fat vs muscle)", b: "Good (direct fat estimation)" },
      { feature: "Athletes", a: "Often misclassified as overweight", b: "Accurate for all body types" },
      { feature: "Health Risk Correlation", a: "Good at population level", b: "Better at individual level" },
      { feature: "Cost", a: "Free", b: "Free (self-measurement)" },
      { feature: "Best For", a: "Quick screening, large populations", b: "Personal health tracking, fitness" },
    ],
    faqs: [
      { question: "Which is more accurate, BMI or body fat percentage?", answer: "Body fat percentage is more accurate for individuals, especially athletes and muscular people. BMI is useful for population-level screening but can misclassify individuals." },
      { question: "Can I have a healthy BMI but high body fat?", answer: "Yes, this is called normal-weight obesity. Someone with low muscle mass may have a normal BMI but unhealthy body fat percentage." },
      { question: "What is a healthy body fat percentage?", answer: "For men, 10-20% is healthy. For women, 18-28% is healthy. Athletes may have lower percentages." },
      { question: "Should I use BMI or body fat to track progress?", answer: "Body fat percentage is better for tracking fitness progress since it shows body composition changes. BMI only tracks weight changes." },
    ],
    relatedSlugs: ["bmi-calculator", "body-fat-calculator", "calorie-calculator", "ideal-weight-calculator", "bmr-calculator"],
  },
  {
    slug: "old-vs-new-tax-regime",
    name: "Old vs New Tax Regime",
    metaTitle: "Old vs New Tax Regime India: Which is Better? | Compare | Measurely",
    metaDescription: "Compare India's old and new tax regimes. See which regime saves more tax based on your income, deductions, and exemptions.",
    description: "Compare India's old and new tax regimes — tax slabs, deductions, exemptions, and which regime saves you more tax.",
    toolA: { slug: "tax-calculator", name: "Tax Calculator" },
    toolB: { slug: "salary-calculator", name: "Salary Calculator" },
    overview:
      "India's income tax system offers two regimes: the old regime (with deductions and exemptions) and the new regime (lower tax rates but no deductions). The old regime allows deductions under 80C (₹1.5L), 80D (health insurance), HRA exemption, and more. The new regime introduced in 2020 offers lower tax rates but eliminates most deductions and exemptions. The choice depends on how much you invest in tax-saving instruments.",
    keyDifferences: [
      "Old regime has higher tax rates but allows deductions up to ₹1.5L under 80C, HRA exemption, standard deduction, and more. New regime has lower rates but no deductions.",
      "Old regime benefits those who invest heavily in tax-saving instruments. New regime benefits those who prefer simplicity and don't claim many deductions.",
      "Standard deduction of ₹50,000 is available in both regimes (old regime for salaried, new regime from 2023).",
      "The new regime is the default from FY 2023-24. Taxpayers must actively opt for the old regime.",
    ],
    table: [
      { feature: "Tax Slabs (₹0-3L)", a: "Nil", b: "Nil" },
      { feature: "Tax Slabs (₹3-6L)", a: "5%", b: "5% (rebate under 87A up to ₹7L)" },
      { feature: "Tax Slabs (₹6-9L)", a: "20%", b: "10%" },
      { feature: "Tax Slabs (₹9-12L)", a: "20%", b: "15%" },
      { feature: "Tax Slabs (₹12-15L)", a: "30%", b: "20%" },
      { feature: "Tax Slabs (Above ₹15L)", a: "30%", b: "30%" },
      { feature: "Standard Deduction", a: "₹50,000", b: "₹50,000" },
      { feature: "Section 80C Deduction", a: "Up to ₹1.5L", b: "Not available" },
      { feature: "HRA Exemption", a: "Available", b: "Not available" },
      { feature: "Health Insurance (80D)", a: "Up to ₹25K-50K", b: "Not available" },
      { feature: "Home Loan Interest (24(b))", a: "Up to ₹2L", b: "Not available" },
    ],
    faqs: [
      { question: "Which tax regime is better for salaried employees?", answer: "If you claim deductions of ₹2.5L or more (80C, HRA, 80D, home loan), the old regime likely saves more tax. If you claim fewer deductions, the new regime may be better." },
      { question: "Can I switch between old and new regime every year?", answer: "Salaried individuals can switch between regimes each year when filing returns. Business owners must choose one regime and cannot switch annually." },
      { question: "Is the new regime really tax-free up to ₹7 lakh?", answer: "Yes, under Section 87A rebate in the new regime, no tax is payable if taxable income is up to ₹7 lakh. However, this is a rebate, not an exemption." },
      { question: "What happens if I don't choose a regime?", answer: "The new regime is the default from FY 2023-24. If you want the old regime, you must actively opt for it when filing your return." },
    ],
    relatedSlugs: ["tax-calculator", "salary-calculator", "fd-calculator", "sip-calculator"],
  },
  {
    slug: "rd-vs-sip",
    name: "RD vs SIP",
    metaTitle: "RD vs SIP: Which Recurring Investment is Better? | Compare | Measurely",
    metaDescription: "Compare Recurring Deposit (RD) vs Systematic Investment Plan (SIP). Understand the differences in returns, risk, and taxation.",
    description: "Compare RD vs SIP — two popular recurring investment options with very different risk and return profiles.",
    toolA: { slug: "rd-calculator", name: "RD Calculator" },
    toolB: { slug: "sip-calculator", name: "SIP Calculator" },
    overview:
      "RD (Recurring Deposit) and SIP (Systematic Investment Plan) both involve investing a fixed amount regularly. RD is a bank deposit product with guaranteed returns, while SIP routes investments into mutual funds with market-linked returns. RD is ideal for conservative investors with short-term goals, while SIP is suited for wealth creation over the long term.",
    keyDifferences: [
      "RD offers guaranteed returns (fixed interest rate). SIP returns are market-linked and variable.",
      "RD interest is taxable as per income slab. SIP returns are taxed as capital gains.",
      "RD is suitable for 6-month to 10-year tenures. SIP has no fixed tenure.",
      "RDs are available at all banks and post offices. SIPs require a demat account and mutual fund investment.",
    ],
    table: [
      { feature: "Returns", a: "Fixed (5-8% per annum)", b: "Market-linked (8-15% historically)" },
      { feature: "Risk", a: "Very Low", b: "Moderate to High" },
      { feature: "Investment Type", a: "Bank deposit", b: "Mutual fund investment" },
      { feature: "Minimum Monthly", a: "₹100-500", b: "₹500" },
      { feature: "Tenure", a: "6 months to 10 years", b: "No fixed tenure (recommended 5+ years)" },
      { feature: "Liquidity", a: "Penalty for premature withdrawal", b: "Can redeem anytime (exit load may apply)" },
      { feature: "Taxation", a: "Interest added to income, taxed per slab", b: "Capital gains tax (LTCG/STCG)" },
      { feature: "Best For", a: "Short-term goals, emergency savings", b: "Long-term wealth creation" },
    ],
    faqs: [
      { question: "Which is better, RD or SIP?", answer: "For short-term goals (under 3 years), RD is better. For long-term wealth creation (5+ years), SIP in equity mutual funds historically delivers higher returns." },
      { question: "Can I do both RD and SIP?", answer: "Yes, many people use RD for emergency funds and short-term goals, while using SIP for long-term retirement or wealth building." },
      { question: "Is SIP riskier than RD?", answer: "Yes, SIP in equity funds carries market risk. Your investment value can go down in the short term, but historically outperforms RD over 5+ year periods." },
    ],
    relatedSlugs: ["rd-calculator", "sip-calculator", "fd-calculator", "compound-interest-calculator"],
  },
];
