"use client";

import { motion } from "framer-motion";
import {
  Calculator, FileText, Sigma, BookOpen, AlertTriangle, ShieldCheck,
  Heart, PiggyBank, Target, Layers, CalendarDays, TrendingUp,
  Sparkles, Banknote, Percent, Receipt,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Link from "next/link";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.25, 0, 1] as const },
  },
};

const ladderTypes = [
  {
    title: "3-Rung Ladder",
    icon: "🔢",
    gradient: "from-blue-500 to-indigo-500",
    months: "3 / 6 / 12 months",
    description: "The most popular and beginner-friendly CD ladder. Split your investment across three CDs with maturities of 3, 6, and 12 months. Every 3 months, one CD matures, giving you regular liquidity while earning higher rates on longer terms.",
    pros: ["Simple to set up and manage", "Fast liquidity every 3 months", "Easy to roll over maturing CDs", "Ideal for short-term savings goals"],
    cons: ["Lower overall yield than longer ladders", "Less rate diversification", "More frequent management required"],
  },
  {
    title: "5-Rung Ladder",
    icon: "🖐️",
    gradient: "from-purple-500 to-pink-500",
    months: "3 / 6 / 12 / 24 / 36 months",
    description: "A more diversified ladder that spreads your investment across five CDs with terms from 3 months to 3 years. This strategy captures higher long-term rates while maintaining regular liquidity access.",
    pros: ["Higher yield potential from long-term CDs", "Greater rate diversification", "Less frequent reinvestment decisions", "Good balance of liquidity and returns"],
    cons: ["More CDs to manage", "Longer commitment required", "Early withdrawal penalties on longer terms"],
  },
  {
    title: "Monthly Ladder",
    icon: "📅",
    gradient: "from-emerald-500 to-teal-500",
    months: "1 / 2 / 3 / 4 / 5 / 6 months",
    description: "A short-term ladder with CDs maturing every month. Maximizes liquidity while still earning better rates than a standard savings account. Best for emergency funds or near-term cash needs.",
    pros: ["Maximum liquidity with monthly access", "Better rates than savings accounts", "Minimal early withdrawal risk"],
    cons: ["Lowest yield of all ladder types", "More frequent rollovers needed", "Rates locked for short durations only"],
  },
  {
    title: "Annual Ladder",
    icon: "📆",
    gradient: "from-amber-500 to-orange-500",
    months: "1 / 2 / 3 / 4 / 5 years",
    description: "A long-term ladder with one CD maturing each year. This strategy is designed for investors who want predictable annual cash flow while maximizing returns through longer-term CD rates.",
    pros: ["Highest yield potential", "Predictable annual cash flow", "Less frequent management", "Ideal for retirement planning"],
    cons: ["Longest commitment required", "Significant early withdrawal penalties", "Less flexible for short-term needs"],
  },
  {
    title: "Long-Term Ladder",
    icon: "📈",
    gradient: "from-rose-500 to-red-500",
    months: "2 / 3 / 4 / 5 years",
    description: "An extended ladder focused on maximizing yield by concentrating on longer-term CDs. Suitable for investors with a longer time horizon who do not need frequent access to their principal.",
    pros: ["Maximum potential returns", "Locks in high rates for extended periods", "Minimal ongoing management"],
    cons: ["Very low liquidity between maturities", "High early withdrawal penalties", "Rate risk if market rates rise significantly"],
  },
];

const comparisonData = [
  { feature: "Liquidity", cdLadder: "Regular access as each rung matures (every 3–12 months)", traditionalCd: "No access until maturity without penalty" },
  { feature: "Returns", cdLadder: "Blended rate across terms; competitive overall", traditionalCd: "Fixed rate for a single term; potentially higher for long terms" },
  { feature: "Flexibility", cdLadder: "High — reinvest or withdraw at each maturity", traditionalCd: "Low — locked in for the full term" },
  { feature: "Risk", cdLadder: "Low — diversified across multiple maturities", traditionalCd: "Low but concentrated in one term" },
  { feature: "Cash Flow", cdLadder: "Predictable and staggered cash flow", traditionalCd: "Single lump sum at maturity" },
  { feature: "Reinvestment", cdLadder: "Opportunity to reinvest at prevailing rates regularly", traditionalCd: "Reinvest only at final maturity" },
  { feature: "Best Use Case", cdLadder: "Building a balanced savings strategy with periodic access", traditionalCd: "Locking away a lump sum for a known future date" },
];

const benefits = [
  {
    title: "Better Liquidity",
    description: "With staggered maturities, a portion of your money becomes available at regular intervals — typically every 3 to 12 months. This gives you ongoing access to cash without paying early withdrawal penalties on the entire balance.",
    icon: PiggyBank,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    title: "Predictable Cash Flow",
    description: "Each maturing CD provides a known payout at a scheduled date. This predictable cash flow makes CD ladders ideal for retirees, supplementing income, or funding planned expenses at known intervals throughout the year.",
    icon: CalendarDays,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Reduced Reinvestment Risk",
    description: "By maturing at different times, you spread your reinvestment across multiple dates rather than having to reinvest a large sum all at once. This reduces the impact of a single low-rate environment on your entire portfolio.",
    icon: TrendingUp,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Interest Rate Diversification",
    description: "A CD ladder captures rates across different term lengths. Short-term CDs benefit from rising rates, while long-term CDs lock in higher rates when available. This blended approach smooths out rate fluctuations over time.",
    icon: Percent,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Stable Returns",
    description: "Unlike stocks or bonds, CDs offer guaranteed returns backed by FDIC insurance up to $250,000 per depositor per bank. A CD ladder provides this stability while offering a higher blended yield than a single short-term CD.",
    icon: ShieldCheck,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Lower Investment Risk",
    description: "CDs are among the safest investments available. A CD ladder diversifies this low risk across multiple institutions and maturity dates, further reducing concentration risk while preserving FDIC coverage limits.",
    icon: Banknote,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Flexible Reinvestment",
    description: "When each CD matures, you choose whether to withdraw the funds or reinvest into a new CD at the current market rate. This flexibility lets you adapt your strategy to changing financial needs and interest rate environments.",
    icon: Layers,
    gradient: "from-violet-500 to-purple-500",
  },
];

const tips = [
  {
    title: "Diversify Maturities Across Terms",
    description: "Spread your CD terms across different lengths to balance liquidity and yield. A good starting point is 3, 6, and 12 months for beginners, expanding to longer terms as you become more comfortable with the strategy.",
    icon: "🔀",
  },
  {
    title: "Compare Bank Rates Regularly",
    description: "CD rates vary significantly between banks and credit unions. Online banks often offer 1–2% higher rates than traditional brick-and-mortar banks. Shop around and do not automatically renew at your current bank's standard rate.",
    icon: "🏦",
  },
  {
    title: "Reinvest Wisely at Maturity",
    description: "When a CD matures, evaluate current market rates before reinvesting. If rates have risen, reinvest at the new higher rate. If rates have fallen, consider whether a different term or investment type is more attractive.",
    icon: "🔄",
  },
  {
    title: "Consider Inflation Impact",
    description: "CD rates may not always keep pace with inflation, especially on longer terms. Factor in expected inflation when choosing ladder duration. For multi-year ladders, shorter rungs allow you to adjust as inflation changes.",
    icon: "📊",
  },
  {
    title: "Avoid Unnecessary Early Withdrawals",
    description: "Early withdrawal penalties can erase months of interest earnings. Structure your ladder so that a CD matures before you need the money. Keep a separate emergency fund for truly unexpected expenses.",
    icon: "🛡️",
  },
  {
    title: "Review and Adjust Annually",
    description: "Your financial goals and interest rate outlook change over time. Review your CD ladder at least once per year. Adjust rung allocations, term lengths, and bank partners to align with your current strategy and market conditions.",
    icon: "📋",
  },
  {
    title: "Keep Emergency Savings Separate",
    description: "Your CD ladder should complement — not replace — your emergency fund. CDs impose penalties for early withdrawal that make them unsuitable for emergency access. Maintain 3–6 months of expenses in a liquid high-yield savings account outside your ladder.",
    icon: "💰",
  },
];

const faqs = [
  {
    question: "What is a CD ladder?",
    answer: "A CD ladder is an investment strategy where you divide your money across multiple Certificates of Deposit with different maturity dates — for example, splitting $10,000 across 3-month, 6-month, and 12-month CDs. As each CD matures, you can reinvest the proceeds into a new long-term CD, maintaining the ladder structure while earning higher blended interest rates than a single short-term CD would provide.",
  },
  {
    question: "Is CD laddering worth it?",
    answer: "CD laddering is worth it for savers who want higher returns than savings accounts while maintaining regular access to their money. The strategy works best when you have a lump sum you do not need immediately but want the flexibility to access portions periodically. It is especially valuable during rising interest rate environments, as maturing CDs can be reinvested at higher rates, and during uncertain markets, as CD returns are guaranteed and FDIC insured.",
  },
  {
    question: "How many CDs should I have in my ladder?",
    answer: "A 3-rung ladder (3 CDs) is ideal for beginners due to its simplicity and fast liquidity cycle. A 5-rung ladder (5 CDs) offers better yield potential and rate diversification. Some advanced investors use 7–10 rungs for maximum diversification, though this requires more capital to maintain FDIC coverage limits. Start with 3 rungs and expand as you become more confident with the strategy.",
  },
  {
    question: "Which ladder length is best?",
    answer: "The best ladder length depends on your financial goals. A 3-rung ladder (3–12 months) is best for short-term savings and emergency buffer funds. A 5-rung ladder (3–36 months) offers the best balance of liquidity and yield for most investors. Annual ladders (1–5 years) are ideal for retirement planning and long-term goals. Monthly ladders suit those who need frequent access while earning more than a savings account.",
  },
  {
    question: "Can I withdraw money from a CD ladder early?",
    answer: "Yes, but early withdrawal from a CD typically incurs a penalty — usually 3 to 12 months of interest depending on the CD term. This is why CD ladders are designed to stagger maturities: you avoid penalties by waiting for each CD to mature naturally. If you need emergency funds, use a separate savings account rather than breaking a CD early.",
  },
  {
    question: "Is CD interest taxable?",
    answer: "Yes, CD interest is taxable as ordinary income at both the federal and state level. The interest earned on each CD is reported on Form 1099-INT and must be included in your annual tax return. Our calculator includes an optional tax rate input so you can see your after-tax returns. Consider holding CDs in tax-advantaged accounts like IRAs for tax-deferred or tax-free growth.",
  },
  {
    question: "Are CDs FDIC insured?",
    answer: "Yes, CDs are FDIC insured up to $250,000 per depositor per institution. This means even if the bank fails, your principal and accrued interest are protected by the full faith and credit of the US government. For CD ladders exceeding $250,000, spread your CDs across multiple banks to ensure full FDIC coverage, or use a CD ladder strategy within a single institution if your total is under the limit.",
  },
  {
    question: "How often should I update my CD ladder?",
    answer: "Review your CD ladder every 6 to 12 months or whenever market interest rates change significantly. Each time a CD matures, evaluate current rates before deciding whether to reinvest in the same term, switch to a different term, or take the cash. An annual review in January also helps you plan for the upcoming year's maturity schedule and align it with your financial goals.",
  },
  {
    question: "Is this calculator accurate?",
    answer: "This calculator provides estimates based on the inputs you provide including investment amount, CD rates, compounding frequency, and tax rate. It accurately projects the future value of each CD rung and the total ladder value. However, actual returns depend on the specific CD rates offered by your bank, the exact compounding method used, future rate changes upon reinvestment, and your actual tax situation. Use this calculator as a planning tool and consult a financial advisor for personalized investment advice.",
  },
  {
    question: "Does this calculator save my data?",
    answer: "No. All calculations are performed entirely in your browser. We do not store, transmit, or process any of the financial data you enter on our servers. Your investment amount, CD rates, and ladder configuration remain on your device and are never sent over the internet. You can verify this by using the calculator in offline mode or checking the network tab in your browser's developer tools. Your privacy is important to us.",
  },
  {
    question: "What happens when interest rates change?",
    answer: "When market interest rates change, only CDs that have not yet been purchased are affected. Existing CDs in your ladder are locked in at their original rate until maturity. This is both an advantage and a limitation — you are protected from rate drops on existing CDs, but you miss out on rate increases until your CDs mature and can be reinvested. A CD ladder mitigates this by having CDs maturing at regular intervals, so some portion of your money is always available to take advantage of rising rates.",
  },
  {
    question: "Can I build a CD ladder in a retirement account?",
    answer: "Yes. Many brokerages and banks allow you to hold CDs within IRAs, Roth IRAs, and other tax-advantaged retirement accounts. Holding CDs in an IRA allows the interest to grow tax-deferred (traditional IRA) or tax-free (Roth IRA), which can significantly enhance your after-tax returns. This is particularly useful for retirees who want stable, predictable income from their retirement savings.",
  },
];

const relatedCalculators = [
  { name: "Compound Interest Calculator", slug: "compound-interest-calculator", description: "Project how your savings grow with compound interest over any time period." },
  { name: "Fixed Deposit Calculator", slug: "fd-calculator", description: "Calculate maturity amounts and interest earned on fixed deposit investments." },
  { name: "SIP Calculator", slug: "sip-calculator", description: "Plan systematic investments and project their future value with step-up options." },
  { name: "Recurring Deposit Calculator", slug: "rd-calculator", description: "Estimate returns on recurring deposit accounts with monthly contributions and compound interest." },
  { name: "Interest Calculator", slug: "interest-calculator", description: "Calculate simple and compound interest for any principal amount, rate, and time period." },
  { name: "Loan Calculator", slug: "loan-calculator", description: "Compare loan scenarios with detailed amortization schedules and total cost analysis." },
];

export function CdLadderContent() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
      <div className="mt-8 sm:mt-12 space-y-8">
        {/* Section 1: How This Calculator Works */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={sectionVariants}
        >
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center shrink-0">
                <Calculator className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">How This CD Ladder Calculator Works</h2>
            </div>
            <div className="text-sm text-muted leading-relaxed space-y-4">
              <p>
                Our CD Ladder Calculator simulates a complete certificate of deposit ladder strategy from initial investment through final maturity. It accounts for every variable that affects your returns — CD terms, interest rates, compounding frequency, reinvestment decisions, taxes, and future rate assumptions — to give you an accurate projection of your ladder&apos;s performance.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">1</div>
                  <div>
                    <p className="text-sm font-medium text-text">Enter Your Total Investment</p>
                    <p className="text-xs text-muted mt-0.5">Input the total amount you want to allocate to your CD ladder. This is the principal that will be divided across the CD rungs according to your chosen allocation strategy.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">2</div>
                  <div>
                    <p className="text-sm font-medium text-text">Choose Ladder Type</p>
                    <p className="text-xs text-muted mt-0.5">Select a 3-rung or 5-rung CD ladder. The 3-rung ladder uses terms of 3, 6, and 12 months for quick liquidity. The 5-rung ladder extends to 24 and 36 months for higher yield potential with staggered access.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">3</div>
                  <div>
                    <p className="text-sm font-medium text-text">Customize CD Terms and Rates</p>
                    <p className="text-xs text-muted mt-0.5">Adjust the interest rate and principal allocation for each CD rung to match current offers from your bank. You can set different rates for each term and decide what percentage of your total investment goes into each rung.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">4</div>
                  <div>
                    <p className="text-sm font-medium text-text">Set Compounding and Reinvestment</p>
                    <p className="text-xs text-muted mt-0.5">Choose how frequently interest compounds (monthly, quarterly, semi-annually, or annually). Enable reinvestment to automatically roll maturing CDs into new ones at a projected future rate, showing long-term compounding effects.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">5</div>
                  <div>
                    <p className="text-sm font-medium text-text">Enter Tax Rate and Calculate</p>
                    <p className="text-xs text-muted mt-0.5">Optionally enter your estimated tax rate to see after-tax returns. Press Calculate to see the future value of each rung, total ladder value, maturity calendar, cash flow timeline, and interactive growth chart.</p>
                  </div>
                </div>
              </div>
              <p>
                The calculator projects each CD rung independently using the compound interest formula, then sums all rungs to show the total ladder value. With reinvestment enabled, it simulates rolling each matured CD into a new one at your estimated future rate, showing how your ladder grows through multiple cycles.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section 2: What Is a CD Ladder? */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={sectionVariants}
        >
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">What Is a CD Ladder?</h2>
            </div>
            <div className="text-sm text-muted leading-relaxed space-y-4">
              <p>
                A Certificate of Deposit (CD) is a time deposit offered by banks and credit unions that pays a fixed interest rate for a specified term — ranging from one month to five years or more. In exchange for locking your money away for the agreed term, CDs typically offer higher interest rates than regular savings accounts. However, withdrawing money before the CD matures usually incurs a penalty, typically several months of interest.
              </p>
              <p>
                A CD ladder is a strategic investing approach where you split your total investment across multiple CDs with different maturity dates rather than putting all your money into a single CD. For example, instead of investing $10,000 in one 12-month CD, you might divide it into three CDs: $3,333 in a 3-month CD, $3,333 in a 6-month CD, and $3,334 in a 12-month CD. As each CD matures, you reinvest the proceeds into a new long-term CD, maintaining the ladder structure indefinitely.
              </p>
              <p>
                This staggered approach solves the fundamental problem of traditional CDs: the trade-off between liquidity and yield. Short-term CDs offer frequent access but lower rates. Long-term CDs offer higher rates but lock your money away. A CD ladder captures the best of both worlds — some money matures regularly (providing liquidity) while the rest earns higher long-term rates (maximizing yield).
              </p>
              <p>
                Why do investors use CD ladders? The primary advantage is interest rate risk management. If you put all your money into a single 5-year CD and rates rise dramatically next year, you are stuck earning the old lower rate for four more years — or you pay a penalty to break it. With a ladder, some CDs mature each year, allowing you to reinvest at the new higher rates. Conversely, if rates fall, your longer-term CDs continue earning the older higher rates, protecting your returns.
              </p>
              <p>
                CD laddering makes the most sense for conservative investors who prioritize capital preservation and predictable returns over maximum growth. It is particularly well-suited for retirees seeking steady income, savers building a diversified cash reserve, and anyone who wants higher yields than savings accounts with guarantees rather than market risk. In 2026, with interest rates fluctuating and economic uncertainty persisting, CD ladders offer a compelling balance of safety, liquidity, and return.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section 3: Formula Used */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={sectionVariants}
        >
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                <Sigma className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Formula Used</h2>
            </div>
            <div className="text-sm text-muted leading-relaxed space-y-4">
              <p>The CD ladder calculator uses the compound interest formula to project the future value of each individual CD rung, then sums them to calculate the total ladder value.</p>
              <div className="bg-dark-800/40 dark:bg-dark-900/50 border border-border/60 rounded-xl p-4 sm:p-5 font-mono text-sm space-y-2">
                <div className="text-text font-semibold">Step 1: Calculate Future Value of Each CD Rung</div>
                <div className="text-text-secondary pl-4 border-l-2 border-primary-500/50">
                  <p>Future Value = Principal × (1 + r / n)^(n × t)</p>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="text-text font-semibold">Step 2: Calculate Total Ladder Value</div>
                <div className="text-text-secondary pl-4 border-l-2 border-primary-500/50">
                  <p>Total Ladder Value = Sum of All CD Future Values</p>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="text-text font-semibold">Step 3: Calculate Net Return After Tax</div>
                <div className="text-text-secondary pl-4 border-l-2 border-primary-500/50 space-y-0.5">
                  <p>Net Return = Total Ladder Value − Taxes on Interest Earned</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <p className="text-xs font-semibold text-text mb-1">Interest Earned</p>
                  <p className="text-xs text-muted font-mono">Future Value − Principal</p>
                </div>
                <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <p className="text-xs font-semibold text-text mb-1">Tax on Interest</p>
                  <p className="text-xs text-muted font-mono">Interest Earned × Tax Rate</p>
                </div>
                <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <p className="text-xs font-semibold text-text mb-1">Total Return</p>
                  <p className="text-xs text-muted font-mono">Total Ladder Value − Total Investment</p>
                </div>
                <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <p className="text-xs font-semibold text-text mb-1">Effective Annual Yield</p>
                  <p className="text-xs text-muted font-mono">(Total Return ÷ Total Investment) × 100</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong className="text-text">Variable Explanations:</strong></p>
                <ul className="space-y-1.5 list-disc list-inside text-xs text-muted">
                  <li><strong className="text-text">Principal:</strong> The amount allocated to each CD rung based on your chosen allocation percentages.</li>
                  <li><strong className="text-text">r (Annual Interest Rate):</strong> The annual percentage yield (APY) offered by the bank for each CD term, expressed as a decimal (e.g., 5% = 0.05).</li>
                  <li><strong className="text-text">n (Compounding Frequency):</strong> The number of times interest is compounded per year — monthly (12), quarterly (4), semi-annually (2), or annually (1).</li>
                  <li><strong className="text-text">t (Time in Years):</strong> The CD term expressed in years. For a 3-month CD, t = 0.25 years. For a 12-month CD, t = 1 year.</li>
                  <li><strong className="text-text">Future Value:</strong> The total value of each CD at maturity, including both the original principal and all accrued interest.</li>
                  <li><strong className="text-text">Tax Rate:</strong> Your marginal income tax rate applied to the interest earned, since CD interest is taxed as ordinary income.</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 4: Types of CD Ladders */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={sectionVariants}
        >
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Types of CD Ladders</h2>
            </div>
            <p className="text-sm text-muted">Different CD ladder strategies suit different financial goals. Choose the one that best matches your liquidity needs, time horizon, and return expectations.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ladderTypes.map((ladder) => (
                <div
                  key={ladder.title}
                  className="p-4 rounded-xl border border-border/80 bg-surface-secondary dark:bg-dark-800/30 hover:border-primary-500/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${ladder.gradient} flex items-center justify-center text-white text-base`}>
                      <span className="text-sm">{ladder.icon}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-text">{ladder.title}</h3>
                  </div>
                  <div className="mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-primary-500/10 text-primary-600 dark:text-primary-400">
                      {ladder.months}
                    </span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed mb-2">{ladder.description}</p>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-text">Pros:</p>
                    <ul className="space-y-0.5">
                      {ladder.pros.map((pro, i) => (
                        <li key={i} className="text-xs text-emerald-600 dark:text-emerald-400 flex items-start gap-1">
                          <span className="mt-0.5 w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-1 mt-1">
                    <p className="text-xs font-semibold text-text">Cons:</p>
                    <ul className="space-y-0.5">
                      {ladder.cons.map((con, i) => (
                        <li key={i} className="text-xs text-red-500 dark:text-red-400 flex items-start gap-1">
                          <span className="mt-0.5 w-1 h-1 rounded-full bg-red-500 shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section 5: Benefits of CD Laddering */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={sectionVariants}
        >
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Benefits of CD Laddering</h2>
            </div>
            <p className="text-sm text-muted">CD laddering offers several compelling advantages over traditional single-CD investments. Here is why smart savers use this strategy.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="p-4 rounded-xl border border-border/80 bg-surface-secondary dark:bg-dark-800/30 hover:border-primary-500/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shrink-0`}>
                      <benefit.icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold text-text">{benefit.title}</h3>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section 6: Example Calculation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={sectionVariants}
        >
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Example Calculation</h2>
            </div>
            <div className="text-sm text-muted leading-relaxed space-y-4">
              <p>This worked example demonstrates how a 3-rung CD ladder performs using realistic rates available in the current market.</p>

              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200/50 dark:border-amber-500/20 rounded-xl p-4 space-y-2">
                <p className="font-semibold text-text flex items-center gap-2">
                  <PiggyBank className="w-4 h-4 text-amber-500" />
                  Scenario: $10,000 Invested in a 3-Rung CD Ladder
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-text uppercase tracking-wider">Ladder Configuration</p>
                  <div className="space-y-1">
                    {[
                      { label: "Total Investment", value: "$10,000" },
                      { label: "Ladder Type", value: "3-Rung" },
                      { label: "Compounding", value: "Monthly" },
                      { label: "Reinvestment", value: "Enabled" },
                      { label: "Future Rate Estimate", value: "4.5%" },
                      { label: "Tax Rate", value: "22%" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                        <span className="text-xs text-muted">{item.label}</span>
                        <span className="text-xs font-semibold text-text">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs font-semibold text-text uppercase tracking-wider mt-2">Rung Details</p>
                  <div className="space-y-1">
                    {[
                      { label: "Rung 1 — 3-Month CD (33%)", value: "$3,333 @ 4.25%" },
                      { label: "Rung 2 — 6-Month CD (33%)", value: "$3,333 @ 4.50%" },
                      { label: "Rung 3 — 12-Month CD (34%)", value: "$3,334 @ 4.75%" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                        <span className="text-xs text-muted">{item.label}</span>
                        <span className="text-xs font-semibold text-text">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-text uppercase tracking-wider">Results (First Cycle)</p>
                  <div className="space-y-1">
                    {[
                      { label: "3-Month CD Future Value", value: "$3,368.51", color: "text-blue-500" },
                      { label: "6-Month CD Future Value", value: "$3,407.54", color: "text-purple-500" },
                      { label: "12-Month CD Future Value", value: "$3,494.97", color: "text-primary-600 dark:text-primary-400" },
                      { label: "Total Ladder Value", value: "$10,271.02", color: "text-primary-600 dark:text-primary-400" },
                      { label: "Total Interest Earned", value: "$271.02", color: "text-emerald-600 dark:text-emerald-400" },
                      { label: "Estimated Tax (22%)", value: "$59.62", color: "text-red-500" },
                      { label: "Net After-Tax Value", value: "$10,211.40", color: "text-amber-500" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                        <span className="text-xs text-muted">{item.label}</span>
                        <span className={`text-xs font-semibold ${item.color}`}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p><strong className="text-text">Step-by-step breakdown:</strong></p>
                <ol className="space-y-1.5 list-decimal list-inside text-xs text-muted">
                  <li><strong className="text-text">Rung 1 (3-Month CD):</strong> $3,333 × (1 + 0.0425/12)^(12×0.25) = $3,368.51 — matures first, providing quick liquidity.</li>
                  <li><strong className="text-text">Rung 2 (6-Month CD):</strong> $3,333 × (1 + 0.0450/12)^(12×0.5) = $3,407.54 — mid-term rung with a slightly higher rate.</li>
                  <li><strong className="text-text">Rung 3 (12-Month CD):</strong> $3,334 × (1 + 0.0475/12)^(12×1) = $3,494.97 — highest rate, locked in for a full year.</li>
                  <li><strong className="text-text">Total ladder value:</strong> $3,368.51 + $3,407.54 + $3,494.97 = $10,271.02 at the end of the first cycle.</li>
                  <li><strong className="text-text">Interest earned:</strong> $10,271.02 − $10,000 = $271.02 in interest over the first year of the ladder.</li>
                  <li><strong className="text-text">After-tax return:</strong> $271.02 − ($271.02 × 22%) = $211.40 net, giving a total after-tax value of $10,211.40.</li>
                  <li><strong className="text-text">With reinvestment:</strong> As each rung matures, it is reinvested at the estimated 4.5% future rate, growing the ladder through subsequent cycles and compounding returns over time.</li>
                </ol>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-primary-500/5 to-accent-cyan/5 border border-primary-500/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-1">Key Takeaway</p>
                    <p className="text-xs text-muted">This $10,000 3-rung CD ladder generates $271.02 in interest during the first year — equivalent to a blended APY of approximately 2.71%. With reinvestment enabled, future cycles compound on this growth. After taxes, the net return is $211.40, providing a safe, predictable return that outperforms most savings accounts while maintaining regular liquidity access every 3 months.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 7: CD Ladder vs Traditional CD */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={sectionVariants}
        >
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center shrink-0">
                <Receipt className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">CD Ladder vs Traditional CD</h2>
            </div>
            <p className="text-sm text-muted">Understanding the differences between a CD ladder and a single traditional CD helps you choose the right strategy for your financial goals.</p>
            <div className="overflow-x-auto rounded-xl border border-border/80">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-secondary dark:bg-dark-800/30 border-b border-border/80">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text uppercase tracking-wider">Feature</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text uppercase tracking-wider">CD Ladder</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-text uppercase tracking-wider">Traditional CD</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row) => (
                    <tr key={row.feature} className="border-b border-border/60 last:border-b-0 hover:bg-surface-secondary/50 transition-colors">
                      <td className="py-2.5 px-4 text-xs font-semibold text-text">{row.feature}</td>
                      <td className="py-2.5 px-4 text-xs text-muted">{row.cdLadder}</td>
                      <td className="py-2.5 px-4 text-xs text-muted">{row.traditionalCd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Section 8: Tips for Building a Better CD Ladder */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={sectionVariants}
        >
          <div className="bg-gradient-to-br from-primary-500/5 to-accent-cyan/5 rounded-2xl border border-primary-500/20 p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-500 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Tips for Building a Better CD Ladder</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tips.map((tip) => (
                <div key={tip.title} className="p-4 rounded-xl bg-surface dark:bg-dark-800/20 border border-border/60 hover:border-primary-500/30 transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="text-lg shrink-0 mt-0.5">{tip.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-text mb-1">{tip.title}</p>
                      <p className="text-xs text-muted leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section 9: Frequently Asked Questions */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={sectionVariants}
        >
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Frequently Asked Questions</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-sm font-medium text-text hover:text-primary-600 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>

        {/* Section 10: Related Investment Calculators */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={sectionVariants}
        >
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shrink-0">
                <Target className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Related Investment Calculators</h2>
            </div>
            <p className="text-sm text-muted">Explore these related calculators to build a comprehensive investment strategy and maximize your savings growth.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {relatedCalculators.map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/${calc.slug}`}
                  className="block p-4 rounded-xl border border-border/80 bg-surface-secondary dark:bg-dark-800/30 hover:border-primary-500/30 hover:bg-surface dark:hover:bg-dark-800/50 transition-all duration-200 group"
                >
                  <h3 className="text-sm font-semibold text-text group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-1">
                    {calc.name}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">{calc.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section 11: Disclaimer */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={sectionVariants}
        >
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Disclaimer</h2>
            </div>
            <div className="text-sm text-muted leading-relaxed space-y-3">
              <p>
                The CD Ladder Calculator is provided for informational and educational purposes only. It produces estimates based on the inputs you provide, including CD interest rates, compounding frequency, reinvestment assumptions, and tax rates, and should not be considered as professional investment advice, financial planning guidance, or a substitute for consultation with qualified financial professionals.
              </p>
              <p>
                CD interest rates vary by bank, institution, account type, and market conditions. Actual returns depend on the specific CD products you select, the exact compounding methods used by your financial institution, future interest rate changes that affect reinvestment, and your actual tax situation. This calculator may not account for all factors relevant to your investment decisions, including early withdrawal penalties, account fees, minimum balance requirements, or institution-specific policies.
              </p>
              <p>
                We strongly recommend consulting with a certified financial planner, investment advisor, or qualified tax professional before making significant investment decisions based on these estimates. CD ladder strategies should be reviewed and adjusted periodically as interest rates, financial goals, and personal circumstances change.
              </p>
              <p className="text-xs text-muted border-t border-border pt-3">
                By using this calculator, you acknowledge that Measurely and its operators assume no liability for any losses, damages, or decisions made based on the calculations provided. Past performance and projections shown are not guarantees of future results. CDs are FDIC insured up to $250,000 per depositor per institution — verify your coverage limits when building a CD ladder across multiple banks.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
