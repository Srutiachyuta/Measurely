"use client";

import { motion } from "framer-motion";
import {
  Calculator, FileText, Sigma, BookOpen, AlertTriangle, ShieldCheck,
  Gavel, Heart, PiggyBank, Target, Users, Wallet, Gauge, Sparkles,
  Baby, Home,
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

const profileCards = [
  {
    title: "Salaried Employee",
    icon: "👔",
    gradient: "from-blue-500 to-indigo-500",
    months: "3–6 months",
    description: "With a steady paycheck and employer benefits, salaried employees typically need 3–6 months of essential expenses. Lower-end if job security is strong and skills are in demand; higher-end if industry volatility exists or role specialization makes re-employment slower.",
  },
  {
    title: "Freelancer",
    icon: "✏️",
    gradient: "from-purple-500 to-pink-500",
    months: "6–9 months",
    description: "Freelancers face variable income and no employer benefits. A 6–9 month cushion accounts for slow periods, client payment delays, and self-funded health insurance. Prioritize building toward the higher end if you have dependents or work in a seasonal industry.",
  },
  {
    title: "Self-Employed",
    icon: "🏪",
    gradient: "from-amber-500 to-orange-500",
    months: "6–12 months",
    description: "Self-employed individuals bear full business and personal financial risk. Income depends on business performance, and rebuilding after a disruption takes longer. Aim for 9–12 months if your business requires significant capital or specialized knowledge.",
  },
  {
    title: "Business Owner",
    icon: "🏢",
    gradient: "from-emerald-500 to-teal-500",
    months: "9–12 months",
    description: "Business owners must cover both personal and business operating expenses during emergencies. A 9–12 month fund protects against revenue drops, equipment failures, market shifts, and personal health issues that could threaten both income streams.",
  },
  {
    title: "Family with Children",
    icon: "👨‍👩‍👧‍👦",
    gradient: "from-pink-500 to-rose-500",
    months: "6–9 months",
    description: "Families have higher fixed costs (childcare, education, healthcare) and less financial flexibility. A 6–9 month fund is recommended for single-income families, while dual-income families may manage with 4–6 months if both incomes are stable.",
  },
  {
    title: "Single Individual",
    icon: "🧑",
    gradient: "from-cyan-500 to-blue-500",
    months: "3–6 months",
    description: "Singles with lower fixed costs and no dependents can often manage with 3–6 months of expenses. Those with high rent burdens, contract work, or limited family support should target the higher end for greater financial security.",
  },
  {
    title: "Retired Person",
    icon: "🧓",
    gradient: "from-slate-500 to-slate-600",
    months: "12–24 months",
    description: "Retirees on fixed incomes cannot replace lost income through employment. A 12–24 month fund prevents forced asset sales during market downturns, covers unexpected healthcare costs, and provides peace of mind without drawing from retirement accounts.",
  },
];

const riskFactors = [
  {
    title: "Job Stability",
    description: "The stability of your employment directly affects how much you need to save. Probationary periods, contract roles, industries undergoing automation, and companies with financial struggles all increase your emergency fund requirements.",
    icon: Gauge,
    gradient: "from-red-500 to-orange-500",
  },
  {
    title: "Income Consistency",
    description: "Variable income from commissions, tips, freelance work, or seasonal employment requires a larger cushion to smooth out income gaps. The less predictable your income, the more months of expenses you should reserve.",
    icon: Wallet,
    gradient: "from-amber-500 to-yellow-500",
  },
  {
    title: "Number of Dependents",
    description: "Each dependent adds to your monthly essential expenses and financial responsibility. More dependents mean higher childcare costs, larger food budgets, and increased healthcare needs, all of which require a larger emergency fund.",
    icon: Baby,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Medical Expenses",
    description: "Uninsured or underinsured medical coverage creates significant financial vulnerability. Even with insurance, high deductibles, copays, and uncovered treatments can quickly deplete savings. Health insurance status is a critical factor.",
    icon: Heart,
    gradient: "from-red-500 to-pink-500",
  },
  {
    title: "Existing Debt",
    description: "Debt payments reduce your monthly cash flow flexibility. High-interest debt (credit cards, payday loans) can spiral during income disruptions. Lower debt ratios mean more buffer, while high debt levels demand a larger fund.",
    icon: Gavel,
    gradient: "from-purple-500 to-violet-500",
  },
  {
    title: "Housing Costs",
    description: "Renters face eviction risk without payment while homeowners must cover mortgages, property taxes, insurance, and maintenance. High housing cost burdens (over 30% of income) significantly increase emergency fund requirements.",
    icon: Home,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    title: "Insurance Coverage",
    description: "Health, disability, and life insurance dramatically reduce financial risk. Comprehensive coverage means smaller emergency funds suffice. Without adequate insurance, any medical issue or accident can become a financial catastrophe.",
    icon: ShieldCheck,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Economic Uncertainty",
    description: "During recessions, layoffs increase, job searches take longer, and asset values may drop. High economic uncertainty demands a larger emergency fund regardless of personal circumstances. Proactive saving during good times protects during downturns.",
    icon: AlertTriangle,
    gradient: "from-amber-500 to-red-500",
  },
];

const tips = [
  {
    title: "Automate Your Savings",
    description: "Set up an automatic transfer from your checking to your savings account on every payday. Even $50 per pay period adds up to $1,300 per year. Automation removes the temptation to spend and makes saving effortless.",
    icon: "🔄",
  },
  {
    title: "Reduce Unnecessary Expenses",
    description: "Review subscriptions, dining out, entertainment, and impulse purchases. Cutting just $200 per month in discretionary spending adds $2,400 annually to your emergency fund. Small sacrifices compound into meaningful progress.",
    icon: "✂️",
  },
  {
    title: "Use Bonuses and Windfalls Wisely",
    description: "Tax refunds, work bonuses, gifts, and unexpected income should go directly to your emergency fund. Treating windfalls as savings accelerators rather than spending money can fast-track your goal by months or even years.",
    icon: "🎁",
  },
  {
    title: "Build Gradually",
    description: "Start with a mini-goal of $1,000, then one month of expenses, then three months. Breaking a large target into smaller milestones makes the process manageable and provides psychological wins that keep you motivated.",
    icon: "📈",
  },
  {
    title: "Keep Funds Separate",
    description: "Maintain your emergency fund in a dedicated high-yield savings account, not your everyday checking account. Physical and mental separation reduces the temptation to dip into savings for non-emergencies and helps track progress.",
    icon: "🔒",
  },
  {
    title: "Avoid Risky Investments",
    description: "Emergency funds belong in safe, liquid accounts — not stocks, crypto, or long-term bonds. High-yield savings accounts, money market accounts, and short-term CDs offer FDIC insurance, competitive rates, and immediate access when needed.",
    icon: "🛡️",
  },
  {
    title: "Review Every 6 Months",
    description: "Life changes — new job, marriage, children, mortgage — all affect your emergency fund target. Review your fund every six months and adjust the goal based on changes in expenses, income, dependents, and risk factors.",
    icon: "📅",
  },
];

const faqs = [
  {
    question: "What is an emergency fund?",
    answer: "An emergency fund is a dedicated pool of easily accessible cash set aside to cover unexpected expenses or financial emergencies. It acts as a financial safety net that protects you from going into debt when life throws unexpected costs your way — such as job loss, medical emergencies, urgent car repairs, or home appliance failures. Financial experts universally recommend building an emergency fund before investing or paying down low-interest debt.",
  },
  {
    question: "How much emergency savings do I need?",
    answer: "The right amount depends on your personal circumstances. Financial experts typically recommend 3 to 6 months of essential expenses for salaried employees with stable jobs, 6 to 9 months for freelancers and moderate-risk situations, and 9 to 12 months for self-employed individuals or those with high-risk factors. Our Emergency Fund Calculator personalizes this recommendation based on your specific inputs including employment type, job stability, monthly expenses, dependents, health insurance, housing situation, and existing debt.",
  },
  {
    question: "Is 3 months of expenses enough?",
    answer: "Three months of essential expenses is the minimum recommended emergency fund for most people. It provides basic protection against common emergencies like car repairs, medical bills, or brief income disruptions. However, three months may not be sufficient if you have dependents, work in a volatile industry, have high debt obligations, or are self-employed. During economic downturns, job searches can take 6 months or longer, making a larger fund essential for true financial security.",
  },
  {
    question: "Where should I keep my emergency savings?",
    answer: "Emergency savings should be kept in a liquid, low-risk account that offers easy access and capital preservation. High-yield savings accounts (HYSAs) are the most popular choice, offering competitive interest rates (currently 4–5% APY), FDIC insurance up to $250,000, and instant withdrawal capability. Money market accounts and no-penalty certificates of deposit are good alternatives. Avoid investing emergency funds in stocks, bonds, or crypto — volatility could mean losing principal exactly when you need it most.",
  },
  {
    question: "Should emergency funds be invested?",
    answer: "No. Emergency funds should never be invested in volatile assets like stocks, cryptocurrency, long-term bonds, or real estate. The purpose of an emergency fund is capital preservation and immediate liquidity, not growth. Investing emergency savings risks losing value at the exact moment you need to withdraw. Keep your emergency fund in FDIC-insured accounts earning competitive interest. Once your emergency fund is fully funded, additional savings can be invested for long-term growth.",
  },
  {
    question: "Can I use credit cards instead of an emergency fund?",
    answer: "Relying on credit cards as your emergency fund is risky. Credit cards have high interest rates (typically 18–30% APR), meaning any unpaid balance grows quickly and can trap you in a debt cycle. Credit limits can be reduced or cards frozen during economic crises. Using credit cards also damages your credit utilization ratio. While having a credit card as a short-term bridge is fine, you should never consider it a substitute for actual cash savings in an accessible account.",
  },
  {
    question: "How often should I update my emergency fund target?",
    answer: "Review and update your emergency fund target at least every six months, or whenever a major life change occurs. Events that should trigger a recalculation include changing jobs, getting married or divorced, having a child, buying or selling a home, starting a business, or experiencing a significant change in monthly expenses or income. Our calculator makes it easy to recalculate your target anytime circumstances change.",
  },
  {
    question: "How quickly should I build my emergency fund?",
    answer: "Build your emergency fund as quickly as your budget allows without sacrificing essential needs. A good approach is to save 10–20% of each paycheck until your fund is complete. If that is too aggressive, start with a mini-goal of $1,000, then build up one month of expenses at a time. Most people can reach a 3-month fund within 12–18 months with consistent saving. The key is to start now and stay consistent rather than waiting for the perfect plan.",
  },
  {
    question: "Is this calculator accurate?",
    answer: "This calculator provides estimates based on established financial best practices and your personal inputs. It applies a risk-based methodology that accounts for employment type, job stability, dependents, health insurance, housing costs, debt obligations, and existing savings to determine a personalized emergency fund target. While the recommendations follow financial industry guidelines, your actual needs may vary based on local cost of living, personal risk tolerance, and specific circumstances not captured by the calculator. Use this as a planning tool and consult a financial advisor for personalized guidance.",
  },
  {
    question: "Does this calculator save my information?",
    answer: "No. All calculations are performed entirely in your browser. We do not store, transmit, or process any of the financial data you enter on our servers. Your monthly expenses, income, savings, and personal information remain on your device and are never sent over the internet. You can verify this by using the calculator in offline mode or checking the network tab in your browser's developer tools. This privacy-first approach ensures your sensitive financial data stays completely private and secure.",
  },
  {
    question: "What counts as an emergency for using this fund?",
    answer: "An emergency is an unexpected, urgent, and necessary expense that you could not have reasonably planned for. Legitimate emergency fund uses include job loss, medical emergencies, urgent car repairs needed for commuting, major home repairs (like a broken water heater or roof leak), unexpected travel for family emergencies, and essential living expenses during income disruption. Planned expenses — vacations, holiday gifts, home renovations, new electronics — should be budgeted separately.",
  },
  {
    question: "Can I build an emergency fund while paying off debt?",
    answer: "Yes, and doing both simultaneously is often the smartest approach. Start with a small starter emergency fund of $1,000–$2,000 to cover minor emergencies. Then focus on high-interest debt (credit cards, payday loans) which is financially urgent. Once high-interest debt is under control, build your full emergency fund while making minimum payments on low-interest debt (student loans, mortgages). This balanced approach protects against new debt while systematically reducing existing obligations.",
  },
];

const relatedCalculators = [
  { name: "Savings Calculator", slug: "savings-calculator", description: "Plan your savings growth with compound interest projections and goal tracking." },
  { name: "Budget Calculator", slug: "budget-calculator", description: "Create a detailed personal budget to track income, expenses, and savings goals." },
  { name: "Debt Payoff Calculator", slug: "debt-payoff-calculator", description: "Compare debt payoff strategies and find the fastest way to become debt-free." },
  { name: "Retirement Calculator", slug: "retirement-calculator", description: "Estimate how much you need to save for a comfortable retirement." },
  { name: "Investment Calculator", slug: "investment-calculator", description: "Project investment growth and analyze compound returns over time." },
  { name: "Net Worth Calculator", slug: "net-worth-calculator", description: "Track your total net worth by calculating assets minus liabilities." },
];

export function EmergencyFundContent() {
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
              <h2 className="text-base font-semibold text-text">How This Emergency Fund Calculator Works</h2>
            </div>
            <div className="text-sm text-muted leading-relaxed space-y-4">
              <p>
                Our Emergency Fund Calculator uses a comprehensive risk-based methodology to determine your personalized emergency savings target. Unlike simple rules of thumb that suggest a fixed number of months, this calculator evaluates your unique financial situation across ten critical dimensions to deliver a tailored recommendation.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">1</div>
                  <div>
                    <p className="text-sm font-medium text-text">Enter Monthly Essential Expenses</p>
                    <p className="text-xs text-muted mt-0.5">Input your total monthly essential spending including rent or mortgage, groceries, utilities, transportation, insurance, minimum debt payments, and other non-discretionary costs. This forms the baseline for your emergency fund calculation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">2</div>
                  <div>
                    <p className="text-sm font-medium text-text">Provide Monthly Income</p>
                    <p className="text-xs text-muted mt-0.5">Your monthly after-tax income helps the calculator assess your financial capacity and determines how easily you can rebuild savings after an emergency. Higher income relative to expenses generally means faster recovery capability.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">3</div>
                  <div>
                    <p className="text-sm font-medium text-text">Select Employment and Risk Factors</p>
                    <p className="text-xs text-muted mt-0.5">Choose your employment type (salaried, freelancer, self-employed, business owner), job stability level, number of dependents, health insurance status, and housing situation. Each factor adjusts your risk score and recommended months of coverage.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">4</div>
                  <div>
                    <p className="text-sm font-medium text-text">Add Existing Savings and Debt</p>
                    <p className="text-xs text-muted mt-0.5">Enter your current emergency savings and monthly debt payments. Existing savings are subtracted from the target to show your remaining gap. Higher debt payments increase financial vulnerability and adjust your recommended fund size upward.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">5</div>
                  <div>
                    <p className="text-sm font-medium text-text">Set Savings Capacity and Calculate</p>
                    <p className="text-xs text-muted mt-0.5">Enter how much you can save each month and optionally your expected annual return. Press Calculate to see your personalized target fund, recommended months of coverage, risk score, progress toward goal, milestone tracker, and projected savings timeline.</p>
                  </div>
                </div>
              </div>
              <p>
                The calculator updates instantly as you adjust inputs, allowing you to explore how different scenarios — changing jobs, reducing expenses, or increasing savings — affect your emergency fund target and timeline.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section 2: What Is an Emergency Fund? */}
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
              <h2 className="text-base font-semibold text-text">What Is an Emergency Fund?</h2>
            </div>
            <div className="text-sm text-muted leading-relaxed space-y-4">
              <p>
                An emergency fund is a dedicated reserve of easily accessible cash specifically set aside to cover unexpected financial emergencies. It is your first line of defense against life&apos;s inevitable surprises — job loss, medical emergencies, urgent home repairs, car breakdowns, or any unplanned expense that would otherwise strain your regular budget or force you into debt.
              </p>
              <p>
                Think of your emergency fund as financial insurance. Just as you insure your home against fire and your car against accidents, your emergency fund insures your financial stability against the unexpected. It transforms a potential financial crisis into a manageable inconvenience. Without one, a $1,000 car repair or a two-week gap in income can trigger a cascade of credit card debt, late fees, and financial stress that takes years to overcome.
              </p>
              <p>
                Why does everyone need an emergency fund? Because financial emergencies are not a matter of <em>if</em> but <em>when</em>. Statistics show that approximately 40% of Americans cannot cover a $400 emergency with cash. The Federal Reserve reports that one in five adults has a major unexpected medical expense each year. The average car repair costs $500–$600, the average home repair is $1,000–$3,000, and in 2026 — with ongoing economic uncertainty — job security is less predictable than ever across nearly every industry.
              </p>
              <p>
                The benefits of an emergency fund extend far beyond the immediate financial coverage. Knowing you have a safety net reduces financial anxiety and stress, which studies show is one of the leading causes of mental health issues. An emergency fund gives you the freedom to make better decisions during a crisis — you can take time to find the right new job instead of accepting the first offer, choose a reputable mechanic instead of the cheapest option, or negotiate from a position of strength rather than desperation.
              </p>
              <p>
                How much should most people save? Financial experts have traditionally recommended 3 to 6 months of essential living expenses. However, this one-size-fits-all approach fails to account for individual circumstances. A single person with a stable government job, low rent, and good health insurance needs far less than a freelancer with three children, a variable income, and high monthly debt payments. Modern financial planning recognizes that the right emergency fund size depends on your unique combination of income stability, expenses, dependents, insurance coverage, debt obligations, and personal risk tolerance.
              </p>
              <p>
                This is why personalized calculators like our Emergency Fund Calculator are essential tools for modern financial planning. By evaluating your specific situation across multiple risk dimensions, you get a recommendation that reflects your actual financial reality — not a generic rule of thumb that may leave you dangerously underfunded or unnecessarily overtargeted.
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
              <p>The emergency fund calculation follows two primary formulas that work together to determine your target savings goal and the monthly commitment required to reach it.</p>
              <div className="bg-dark-800/40 dark:bg-dark-900/50 border border-border/60 rounded-xl p-4 sm:p-5 font-mono text-sm space-y-2">
                <div className="text-text font-semibold">Step 1: Calculate Target Emergency Fund</div>
                <div className="text-text-secondary pl-4 border-l-2 border-primary-500/50">
                  <p>Target Emergency Fund = Monthly Essential Expenses × Recommended Months</p>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="text-text font-semibold">Step 2: Calculate Monthly Savings Required</div>
                <div className="text-text-secondary pl-4 border-l-2 border-primary-500/50 space-y-0.5">
                  <p>Monthly Savings Required = (Target Fund − Current Savings) ÷ Target Timeline</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <p className="text-xs font-semibold text-text mb-1">Recommended Months</p>
                  <p className="text-xs text-muted font-mono">Base Months × Risk Multiplier</p>
                </div>
                <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <p className="text-xs font-semibold text-text mb-1">Risk Score</p>
                  <p className="text-xs text-muted font-mono">Sum of all risk factor scores (0–100)</p>
                </div>
                <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <p className="text-xs font-semibold text-text mb-1">Progress Percentage</p>
                  <p className="text-xs text-muted font-mono">(Current Savings ÷ Target Fund) × 100</p>
                </div>
                <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <p className="text-xs font-semibold text-text mb-1">Savings Gap</p>
                  <p className="text-xs text-muted font-mono">Target Fund − Current Savings</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong className="text-text">Variable Explanations:</strong></p>
                <ul className="space-y-1.5 list-disc list-inside text-xs text-muted">
                  <li><strong className="text-text">Monthly Essential Expenses:</strong> Your total non-discretionary monthly spending including housing, food, utilities, transportation, insurance, minimum debt payments, and other necessary costs.</li>
                  <li><strong className="text-text">Recommended Months:</strong> The number of months of expenses your fund should cover, calculated by applying a risk multiplier to a base recommendation based on your employment type and financial profile.</li>
                  <li><strong className="text-text">Base Months:</strong> A starting recommendation based on employment type — 3 months for salaried employees, 6 months for freelancers, 9 months for self-employed, and 12 months for retirees.</li>
                  <li><strong className="text-text">Risk Multiplier:</strong> An adjustment factor between 0.8 and 2.0 that increases or decreases the base recommendation based on job stability, dependents, health insurance, housing costs, and debt levels.</li>
                  <li><strong className="text-text">Current Savings:</strong> The amount you have already set aside in your emergency fund. This is subtracted from the target to calculate your remaining savings gap.</li>
                  <li><strong className="text-text">Target Timeline:</strong> The number of months you want to take to reach your emergency fund goal, used to calculate the monthly savings requirement.</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 4: Recommended Emergency Fund by Situation */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={sectionVariants}
        >
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Recommended Emergency Fund by Situation</h2>
            </div>
            <p className="text-sm text-muted">Your ideal emergency fund size depends heavily on your employment situation and personal circumstances. Below are general guidelines for common profiles.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {profileCards.map((profile) => (
                <div
                  key={profile.title}
                  className="p-4 rounded-xl border border-border/80 bg-surface-secondary dark:bg-dark-800/30 hover:border-primary-500/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${profile.gradient} flex items-center justify-center text-white text-base`}>
                      <span className="text-sm">{profile.icon}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-text">{profile.title}</h3>
                  </div>
                  <div className="mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-primary-500/10 text-primary-600 dark:text-primary-400">
                      {profile.months}
                    </span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{profile.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Section 5: Risk Factors Considered */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={sectionVariants}
        >
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Risk Factors Considered</h2>
            </div>
            <p className="text-sm text-muted">Our calculator evaluates eight critical risk factors to determine your personalized emergency fund recommendation. Each factor contributes to your overall risk score, which directly influences the number of months of expenses you should save.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {riskFactors.map((factor) => (
                <div
                  key={factor.title}
                  className="p-4 rounded-xl border border-border/80 bg-surface-secondary dark:bg-dark-800/30 hover:border-primary-500/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${factor.gradient} flex items-center justify-center shrink-0`}>
                      <factor.icon className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-sm font-semibold text-text">{factor.title}</h3>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{factor.description}</p>
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
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Example Calculation</h2>
            </div>
            <div className="text-sm text-muted leading-relaxed space-y-4">
              <p>This worked example demonstrates how the Emergency Fund Calculator determines a personalized savings target based on a realistic financial profile.</p>

              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200/50 dark:border-amber-500/20 rounded-xl p-4 space-y-2">
                <p className="font-semibold text-text flex items-center gap-2">
                  <PiggyBank className="w-4 h-4 text-amber-500" />
                  Scenario: Freelance Graphic Designer in Toronto
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-text uppercase tracking-wider">Input Values</p>
                  <div className="space-y-1">
                    {[
                      { label: "Monthly Essential Expenses", value: "$4,200" },
                      { label: "Monthly Income (After Tax)", value: "$6,500" },
                      { label: "Employment Type", value: "Freelancer" },
                      { label: "Job Stability", value: "Moderate" },
                      { label: "Number of Dependents", value: "1 (child)" },
                      { label: "Health Insurance", value: "Self-funded (high deductible)" },
                      { label: "Housing Situation", value: "Renting" },
                      { label: "Existing Savings", value: "$5,000" },
                      { label: "Monthly Debt Payments", value: "$800" },
                      { label: "Monthly Savings Capacity", value: "$1,200" },
                      { label: "Target Timeline", value: "24 months" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                        <span className="text-xs text-muted">{item.label}</span>
                        <span className="text-xs font-semibold text-text">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-text uppercase tracking-wider">Calculation Results</p>
                  <div className="space-y-1">
                    {[
                      { label: "Base Recommendation", value: "6 months", color: "text-muted" },
                      { label: "Risk Score", value: "72/100 (High)", color: "text-amber-500" },
                      { label: "Risk Multiplier Applied", value: "1.4×", color: "text-amber-500" },
                      { label: "Recommended Months", value: "8 months", color: "text-primary-600 dark:text-primary-400" },
                      { label: "Target Emergency Fund", value: "$33,600", color: "text-primary-600 dark:text-primary-400" },
                      { label: "Existing Savings", value: "$5,000", color: "text-emerald-600 dark:text-emerald-400" },
                      { label: "Remaining Savings Gap", value: "$28,600", color: "text-red-500" },
                      { label: "Monthly Savings Required", value: "$1,192", color: "text-amber-500" },
                      { label: "Estimated Time to Goal", value: "24 months", color: "text-emerald-600 dark:text-emerald-400" },
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
                  <li><strong className="text-text">Risk assessment:</strong> As a freelancer with moderate stability, one dependent, high-deductible health insurance, renting status, and $800/month in debt payments, the risk score is calculated at 72 out of 100.</li>
                  <li><strong className="text-text">Base months:</strong> Freelancer profile starts with a base of 6 months of expenses.</li>
                  <li><strong className="text-text">Risk multiplier:</strong> The 72/100 risk score applies a 1.4× multiplier to the base, increasing recommended coverage to 8 months (rounded up from 8.4).</li>
                  <li><strong className="text-text">Target fund:</strong> $4,200 monthly expenses × 8 months = $33,600 target emergency fund.</li>
                  <li><strong className="text-text">Savings gap:</strong> $33,600 target − $5,000 existing savings = $28,600 remaining to save.</li>
                  <li><strong className="text-text">Monthly commitment:</strong> $28,600 ÷ 24 months = $1,192 per month to reach the goal within the 24-month timeline.</li>
                </ol>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-primary-500/5 to-accent-cyan/5 border border-primary-500/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-1">Key Takeaway</p>
                    <p className="text-xs text-muted">This freelancer&apos;s emergency fund target of $33,600 is significantly higher than the standard &ldquo;3–6 months&rdquo; rule of thumb would suggest. The personalized approach accounts for their higher-risk profile — variable income, a dependent, high-deductible insurance, and existing debt — revealing that 8 months of expenses is the appropriate safety net. With consistent monthly savings of $1,192, they can reach their goal within the planned 24-month timeline.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 7: Tips to Build an Emergency Fund Faster */}
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
              <h2 className="text-base font-semibold text-text">Tips to Build an Emergency Fund Faster</h2>
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

        {/* Section 8: Frequently Asked Questions */}
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

        {/* Section 9: Related Financial Calculators */}
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
              <h2 className="text-base font-semibold text-text">Related Financial Calculators</h2>
            </div>
            <p className="text-sm text-muted">Explore these related calculators to build a complete financial plan and strengthen your overall financial health.</p>
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

        {/* Section 10: Disclaimer */}
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
                The Emergency Fund Calculator is provided for informational and educational purposes only. It produces estimates based on established financial best practices and the personal inputs you provide, and should not be considered as professional financial advice, investment guidance, or a substitute for consultation with qualified financial professionals.
              </p>
              <p>
                Financial situations vary significantly based on individual circumstances, local cost of living, personal risk tolerance, and specific life goals. This calculator may not account for all factors relevant to your situation, including but not limited to unique employment arrangements, complex family structures, business ownership considerations, or special healthcare needs.
              </p>
              <p>
                We strongly recommend consulting with a certified financial planner, financial advisor, or other qualified professional before making significant financial decisions based on these estimates. Emergency fund recommendations should be reviewed and adjusted periodically as your circumstances change.
              </p>
              <p className="text-xs text-muted border-t border-border pt-3">
                By using this calculator, you acknowledge that Measurely and its operators assume no liability for any losses, damages, or decisions made based on the calculations provided. Past performance and projections shown are not guarantees of future results.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
