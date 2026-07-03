"use client";

import { motion } from "framer-motion";
import {
  Calculator, FileText, BookOpen, Sigma, Globe, AlertTriangle, ShieldCheck,
  Wallet, Gavel, Scale, PieChart, Heart, Briefcase,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.25, 0, 1] as const },
  },
};

const factorCards = [
  {
    title: "Company Policy",
    description: "Each employer has its own severance policy. Large corporations typically have formal written policies that apply uniformly, while smaller companies handle severance on a case-by-case basis.",
    icon: "🏢",
  },
  {
    title: "Employment Contract",
    description: "Your offer letter, employment agreement, or employee handbook may specify exact severance terms. Contractual provisions generally govern your entitlement and calculation method.",
    icon: "📄",
  },
  {
    title: "Country & State Laws",
    description: "Some jurisdictions mandate minimum severance. US states like California and New York have specific rules. Canada's ESA provides statutory minimums. UK law requires minimum statutory redundancy pay.",
    icon: "⚖️",
  },
  {
    title: "Years of Service",
    description: "Tenure is the primary factor in most severance formulas. Longer-serving employees receive proportionally more severance. Most companies require 6–12 months minimum before eligibility.",
    icon: "📅",
  },
  {
    title: "Salary Level",
    description: "Higher-paid employees typically receive larger absolute severance amounts. Executive packages often use monthly rather than weekly multipliers and include additional perks like equity acceleration.",
    icon: "💰",
  },
  {
    title: "Bonus Eligibility",
    description: "Earned but unpaid bonuses, prorated annual bonuses, and retention bonuses may be included in your severance package. Executive severance often guarantees bonus amounts.",
    icon: "🎯",
  },
  {
    title: "PTO Balance",
    description: "Unused vacation and PTO hours are typically paid out separately from severance. Several states legally require employers to pay accrued vacation time upon termination regardless of policy.",
    icon: "🏖️",
  },
  {
    title: "Layoff vs Termination",
    description: "Layoffs and reductions in force (RIFs) almost always qualify for severance. Termination for cause, misconduct, or poor performance generally disqualifies you from receiving severance.",
    icon: "🔴",
  },
];

const countryCards = [
  {
    name: "United States",
    flag: "US",
    color: "from-blue-600 to-red-500",
    points: [
      "No federal law requires severance pay — it is voluntary",
      "Standard formula: 1 week of pay per year of service",
      "COBRA allows continued health coverage for up to 18 months",
      "WARN Act requires 60-day notice for mass layoffs (100+ employees)",
      "State laws vary — California and New York have specific protections",
      "Severance is fully taxable as ordinary income",
    ],
  },
  {
    name: "Canada",
    flag: "CA",
    color: "from-red-600 to-white",
    points: [
      "Employment Standards Act (ESA) governs minimum severance",
      "Statutory notice: 1 week per year of service (up to 8 weeks)",
      "ESA severance: 1 week per year for 5+ years (companies with $2.5M+ payroll)",
      "Common law reasonable notice can be much higher than ESA minimums",
      "Constructive dismissal claims may enhance entitlements",
      "Severance is taxed as employment income",
    ],
  },
  {
    name: "United Kingdom",
    flag: "UK",
    color: "from-blue-700 to-red-600",
    points: [
      "Statutory redundancy pay is legally required after 2 years of service",
      "Formula: 1 week per year of service (ages 18–21), 1.5 weeks (22–40), 2 weeks (41+)",
      "Maximum statutory redundancy pay is capped at £643 per week (2026)",
      "Employees can negotiate enhanced contractual severance",
      "Notice periods are protected by the Employment Rights Act",
      "Unfair dismissal claims can significantly increase compensation",
    ],
  },
  {
    name: "Australia",
    flag: "AU",
    color: "from-green-600 to-yellow-400",
    points: [
      "National Employment Standards (NES) govern redundancy pay",
      "Formula: 4 weeks for 1 year, up to 16 weeks for 9+ years",
      "Employers with fewer than 15 employees may have reduced obligations",
      "Redundancy pay is tax-free up to certain limits",
      "Award and enterprise agreements may provide better terms",
      "Genuine redundancy requires consultation and alternative job search",
    ],
  },
  {
    name: "India",
    flag: "IN",
    color: "from-orange-500 to-green-600",
    points: [
      "Industrial Disputes Act governs retrenchment compensation",
      "15 days of pay for each year of service is the legal minimum",
      "Applies to workers with 240+ days of continuous service",
      "Notice period of 30–90 days required depending on employee type",
      "Shop and establishment acts in each state add additional rules",
      "Voluntary retirement schemes (VRS) offer higher payouts",
    ],
  },
];

const faqItems = [
  {
    question: "What is severance pay?",
    answer: "Severance pay is compensation that an employer provides to an employee whose employment is terminated involuntarily, typically due to a layoff, reduction in force, or no-fault termination. It is separate from your final paycheck (which covers wages earned up to your last day) and is designed to provide financial support during your job transition. Most severance packages include a cash payment based on salary and tenure, and may also include continued health benefits, PTO payout, outplacement services, and equity considerations.",
  },
  {
    question: "Is severance pay taxable?",
    answer: "Yes, severance pay is fully taxable as ordinary income by the IRS. Employers typically withhold federal income tax at the supplemental wage rate (flat 22% for amounts under $1 million), Social Security at 6.2%, Medicare at 1.45%, and applicable state income tax. Your total withholding rate typically falls between 25% and 35%. If your severance pushes you into a higher tax bracket for the year, you may owe additional taxes when you file. Our calculator estimates these deductions automatically.",
  },
  {
    question: "How is severance calculated?",
    answer: "The most common severance formula is: (Annual Salary ÷ 52) × Weeks of Pay Per Year of Service × Years of Service. For example, an employee earning $75,000 with 5 years of service and a 1-week-per-year policy would receive approximately $7,212 in gross severance. Total compensation then adds PTO payout, bonuses, and other benefits, minus estimated taxes. Some employers use tiered approaches (e.g., 2 weeks for 0–3 years, 4 weeks for 4–6 years) rather than flat multipliers.",
  },
  {
    question: "Can I negotiate my severance package?",
    answer: "Yes, severance packages are almost always negotiable. Employers expect some degree of negotiation, especially for professional and executive positions. You can negotiate for more weeks of pay, extended health insurance coverage, accelerated stock vesting, outplacement services, a positive reference letter, and equipment retention. Your strongest leverage is before signing the separation agreement. Having an employment attorney review the package is recommended for packages over $10,000.",
  },
  {
    question: "Do all employees receive severance pay?",
    answer: "No. Severance pay is not legally required under US federal law, and eligibility varies by employer. Full-time regular employees are most likely to receive severance. Part-time, temporary, and contract workers are often excluded. Most companies require a minimum tenure (typically 6–12 months) before severance eligibility. Employees terminated for cause, misconduct, or poor performance rarely receive severance. However, many employers offer severance in exchange for signing a release of claims, even without a formal policy.",
  },
  {
    question: "Does unused PTO increase severance?",
    answer: "Yes, unused PTO is typically paid out separately from severance and increases your total exit compensation. The payout is calculated as: Unused PTO Hours × Hourly Rate. Several states including California, Illinois, and Massachusetts legally require employers to pay out accrued vacation time upon separation. This payout is in addition to your severance and is subject to regular income tax withholding. Our calculator includes an optional PTO payout field to estimate this amount.",
  },
  {
    question: "What happens if I resign instead of accepting a layoff?",
    answer: "If you voluntarily resign, you generally forfeit any right to severance pay. Severance is designed for involuntary terminations initiated by the employer. However, if you are facing constructive dismissal (where the employer makes such fundamental changes to your role that resignation is justified), you may still be entitled to severance. Always consult with an employment attorney before making a decision, as the distinction between resignation and constructive dismissal can have significant financial implications.",
  },
  {
    question: "Can severance affect unemployment benefits?",
    answer: "It depends on your state's laws. Some states reduce unemployment benefits by the amount of severance received, effectively delaying the start of payments until the severance period ends. Other states allow you to receive both severance and unemployment without reduction. The interaction between severance and unemployment is complex and varies significantly by jurisdiction. We recommend checking with your state's unemployment office for specific rules before applying.",
  },
  {
    question: "Is this calculator accurate?",
    answer: "This calculator provides estimates based on common severance formulas and typical tax withholding rates. It gives you a reasonable approximation of what your severance package might look like based on your salary, years of service, and other inputs. However, actual severance packages vary by employer policy, employment contracts, state laws, and individual circumstances. Use this calculator as a planning and negotiation tool, and consult with an attorney or HR professional for your specific situation.",
  },
  {
    question: "Does this calculator store my data?",
    answer: "No. All calculations are performed entirely in your browser. We do not store, transmit, or process any of the financial data you enter on our servers. Your salary, years of service, and personal information remain on your device and are never sent over the internet. You can verify this by using the calculator in offline mode or checking the network tab in your browser's developer tools. Your privacy is important to us, and we designed this calculator to keep your sensitive financial information completely private.",
  },
];

export function SeverancePayContent() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
      <div className="mt-8 sm:mt-12 space-y-8">
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
              <h2 className="text-base font-semibold text-text">How the Severance Pay Calculator Works</h2>
            </div>
            <div className="text-sm text-muted leading-relaxed space-y-4">
              <p>
                Our Severance Pay Calculator follows a systematic process to estimate the total compensation you may receive after a layoff or termination. It factors in your salary, years of service, employer's severance policy, and additional benefits to give you a comprehensive picture of your exit package.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">1</div>
                  <div>
                    <p className="text-sm font-medium text-text">Enter Your Annual Salary</p>
                    <p className="text-xs text-muted mt-0.5">Your gross annual salary before taxes is the starting point. The calculator divides this by 52 to determine your weekly compensation rate.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">2</div>
                  <div>
                    <p className="text-sm font-medium text-text">Set Years of Service and Multiplier</p>
                    <p className="text-xs text-muted mt-0.5">Enter how long you have worked for your employer and your expected weeks of severance per year of service — typically 1 or 2 weeks. The calculator multiplies these to determine gross severance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">3</div>
                  <div>
                    <p className="text-sm font-medium text-text">Include Additional Compensation</p>
                    <p className="text-xs text-muted mt-0.5">Add any bonuses, unused PTO hours, and other exit benefits. The calculator values PTO at your hourly rate and adds bonuses and other compensation to the total package.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">4</div>
                  <div>
                    <p className="text-sm font-medium text-text">Apply Tax Withholding</p>
                    <p className="text-xs text-muted mt-0.5">The calculator applies your estimated tax rate to account for federal, state, and FICA withholding. This shows you the net amount you will actually receive in your pocket.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">5</div>
                  <div>
                    <p className="text-sm font-medium text-text">Review Your Total Exit Package</p>
                    <p className="text-xs text-muted mt-0.5">The results page shows gross severance, PTO payout, bonus compensation, tax estimate, net payment, and total before-tax package — plus visual charts and detailed breakdowns.</p>
                  </div>
                </div>
              </div>
              <p>
                The calculator updates instantly when you change any input, allowing you to experiment with different scenarios — such as negotiating additional weeks of severance or estimating the impact of a higher tax rate — so you can walk into negotiations fully informed.
              </p>
            </div>
          </div>
        </motion.div>

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
              <h2 className="text-base font-semibold text-text">What Is Severance Pay?</h2>
            </div>
            <div className="text-sm text-muted leading-relaxed space-y-4">
              <p>
                Severance pay is financial and benefits compensation that an employer provides to an employee whose job is eliminated through no fault of their own. It serves as a bridge between employment and the next opportunity, giving you financial runway while you search for a new position. Severance packages typically include a lump sum cash payment, continued health insurance benefits, outplacement services, and payout of accrued but unused vacation time.
              </p>
              <p>
                Employers offer severance for several reasons. First, it maintains goodwill and protects the company's reputation during difficult transitions. Second, severance serves as consideration in exchange for signing a separation agreement that typically includes a release of legal claims against the employer. This means you give up your right to sue in exchange for the severance package. Third, severance helps retain and motivate remaining employees by demonstrating that the company treats departing staff fairly.
              </p>
              <p>
                It is important to understand that severance pay is not the same as your final paycheck. Your final paycheck covers wages and compensation earned up to your last day of employment — including your final week's pay, commissions already earned, and reimbursable expenses. Severance is additional compensation provided beyond what you have already earned, and it comes with legal strings attached through the separation agreement.
              </p>
              <p>
                Legally, severance pay is not required under US federal law. The Fair Labor Standards Act does not mandate severance, and no federal statute requires employers to provide it. However, severance may be required by your employment contract, company policy, or state law in certain circumstances. Some states like New York have specific rules about severance timing, and the WARN Act requires advance notice for mass layoffs. In other countries like Canada, the UK, and Australia, minimum severance or redundancy pay is legally mandated.
              </p>
              <p>
                For employees, severance provides critical financial stability during the job search process. It covers living expenses, health insurance, and other costs while you find your next role. Beyond the cash value, severance packages often include valuable non-cash components like extended health coverage, career counseling, resume writing services, and job placement assistance. Understanding the full value of your severance package — not just the cash component — is essential for making informed decisions about your separation agreement.
              </p>
              <p>
                In 2026, with ongoing economic shifts and corporate restructuring across industries, knowing your severance rights and understanding how packages are calculated has never been more important. Whether you are facing an imminent layoff or preparing for the possibility, arming yourself with knowledge is the best way to ensure you receive fair treatment and maximum compensation.
              </p>
            </div>
          </div>
        </motion.div>

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
              <h2 className="text-base font-semibold text-text">How Severance Is Calculated</h2>
            </div>
            <div className="text-sm text-muted leading-relaxed space-y-4">
              <p>Severance pay follows a straightforward formula that starts with your weekly salary and applies your employer's severance multiplier. Here is the complete calculation broken down step by step:</p>

              <div className="bg-dark-800/40 dark:bg-dark-900/50 border border-border/60 rounded-xl p-4 sm:p-5 font-mono text-sm space-y-2">
                <div className="text-text font-semibold">Step 1: Calculate Weekly Salary</div>
                <div className="text-text-secondary pl-4 border-l-2 border-primary-500/50">
                  <p>Weekly Salary = Annual Salary ÷ 52</p>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="text-text font-semibold">Step 2: Calculate Gross Severance</div>
                <div className="text-text-secondary pl-4 border-l-2 border-primary-500/50 space-y-0.5">
                  <p>Gross Severance = Weekly Salary × Weeks Per Year × Years of Service</p>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="text-text font-semibold">Step 3: Calculate Total Before Tax</div>
                <div className="text-text-secondary pl-4 border-l-2 border-primary-500/50 space-y-0.5">
                  <p>Total Before Tax = Gross Severance + Bonus + PTO Payout + Other Benefits</p>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="text-text font-semibold">Step 4: Calculate Net Severance</div>
                <div className="text-text-secondary pl-4 border-l-2 border-primary-500/50 space-y-0.5">
                  <p>Net Severance = Total Before Tax − Estimated Tax Withholding</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <p className="text-xs font-semibold text-text mb-1">PTO Payout</p>
                  <p className="text-xs text-muted font-mono">Unused PTO Hours × Hourly Rate</p>
                </div>
                <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <p className="text-xs font-semibold text-text mb-1">Tax Withholding</p>
                  <p className="text-xs text-muted font-mono">Total Before Tax × Tax Rate %</p>
                </div>
                <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <p className="text-xs font-semibold text-text mb-1">Total Exit Package</p>
                  <p className="text-xs text-muted font-mono">Total Before Tax − Estimated Tax</p>
                </div>
                <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <p className="text-xs font-semibold text-text mb-1">Weekly Equivalent</p>
                  <p className="text-xs text-muted font-mono">Gross Severance ÷ Weeks of Coverage</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

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
              <p>This worked example demonstrates how severance pay is calculated for a typical employee using our calculator.</p>

              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200/50 dark:border-amber-500/20 rounded-xl p-4 space-y-2">
                <p className="font-semibold text-text flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-amber-500" />
                  Scenario: Marketing Manager with 8 Years of Service
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-text uppercase tracking-wider">Input Values</p>
                  <div className="space-y-1">
                    {[
                      { label: "Annual Salary", value: "$85,000" },
                      { label: "Pay Frequency", value: "Bi-Weekly" },
                      { label: "Years of Service", value: "8" },
                      { label: "Weeks Per Year", value: "1" },
                      { label: "Bonus Included", value: "Yes ($4,000)" },
                      { label: "Unused PTO", value: "120 hours" },
                      { label: "Hourly PTO Rate", value: "$40.87" },
                      { label: "Estimated Tax Rate", value: "25%" },
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
                      { label: "Weekly Salary", value: "$1,634.62", color: "text-muted" },
                      { label: "Gross Severance", value: "$13,076.92", color: "text-primary-600 dark:text-primary-400" },
                      { label: "PTO Payout", value: "$4,904.40", color: "text-amber-500" },
                      { label: "Bonus Compensation", value: "$4,000.00", color: "text-emerald-600 dark:text-emerald-400" },
                      { label: "Total Before Tax", value: "$21,981.32", color: "text-text" },
                      { label: "Estimated Tax (25%)", value: "$5,495.33", color: "text-red-500" },
                      { label: "Net Severance", value: "$16,485.99", color: "text-emerald-600 dark:text-emerald-400" },
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
                  <li><strong className="text-text">Weekly salary:</strong> $85,000 ÷ 52 = $1,634.62</li>
                  <li><strong className="text-text">Gross severance:</strong> $1,634.62 × 1 week × 8 years = $13,076.92</li>
                  <li><strong className="text-text">PTO payout:</strong> 120 hours × $40.87/hr = $4,904.40</li>
                  <li><strong className="text-text">Total before tax:</strong> $13,076.92 + $4,000 + $4,904.40 + $0 = $21,981.32</li>
                  <li><strong className="text-text">Tax withholding:</strong> $21,981.32 × 25% = $5,495.33</li>
                  <li><strong className="text-text">Net severance:</strong> $21,981.32 − $5,495.33 = $16,485.99</li>
                </ol>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-primary-500/5 to-accent-cyan/5 border border-primary-500/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-1">Key Takeaway</p>
                    <p className="text-xs text-muted">This marketing manager's gross severance is $13,077 (about 1.5 months of salary), but the total exit package reaches $21,981 when PTO and bonus are included. After 25% tax withholding, they receive approximately $16,486 in net compensation, providing roughly 10 weeks of income replacement during their job search.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={sectionVariants}
        >
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0">
                <Scale className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Factors That Affect Severance Pay</h2>
            </div>
            <p className="text-sm text-muted">Several factors influence the size and structure of your severance package. Understanding these can help you evaluate an offer and identify negotiation opportunities.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {factorCards.map((factor) => (
                <div
                  key={factor.title}
                  className="p-4 rounded-xl border border-border/80 bg-surface-secondary dark:bg-dark-800/30 hover:border-primary-500/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg shrink-0">{factor.icon}</span>
                    <h3 className="text-sm font-semibold text-text">{factor.title}</h3>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{factor.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={sectionVariants}
        >
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shrink-0">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Severance Pay by Country</h2>
            </div>
            <p className="text-sm text-muted">Severance rules vary significantly around the world. Some countries mandate minimum payments by law, while others leave it entirely to employer discretion.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {countryCards.map((country) => (
                <div
                  key={country.name}
                  className="p-4 rounded-xl border border-border/80 bg-surface-secondary dark:bg-dark-800/30 hover:border-primary-500/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${country.color} flex items-center justify-center text-white text-xs font-bold`}>
                      {country.flag}
                    </div>
                    <h3 className="text-sm font-semibold text-text">{country.name}</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {country.points.map((point, i) => (
                      <li key={i} className="text-xs text-muted flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={sectionVariants}
        >
          <div className="bg-gradient-to-br from-primary-500/5 to-accent-cyan/5 rounded-2xl border border-primary-500/20 p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-500 flex items-center justify-center shrink-0">
                <Gavel className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Tips Before Accepting a Severance Package</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  title: "Review the Agreement Carefully",
                  description: "Read every page of the separation agreement before signing. Pay special attention to the release of claims, non-compete clauses, confidentiality provisions, and any clauses that affect your future employment options.",
                  icon: "📋",
                },
                {
                  title: "Understand Tax Implications",
                  description: "Severance is taxed as ordinary income at your marginal rate. The 22% supplemental withholding may not cover your full tax bill. Consider how the lump sum affects your annual tax bracket and plan accordingly.",
                  icon: "🧾",
                },
                {
                  title: "Check Benefits Continuation",
                  description: "Health insurance is often the most valuable non-cash benefit. Determine if your employer will pay COBRA premiums and for how long. Factor in the cost of replacing coverage when evaluating your offer.",
                  icon: "🛡️",
                },
                {
                  title: "Negotiate If Appropriate",
                  description: "Most severance offers are opening bids, not final offers. Common negotiation points include additional weeks of pay, extended benefits, outplacement services, and equity treatment. The employer expects some back-and-forth.",
                  icon: "🤝",
                },
                {
                  title: "Consult an Employment Lawyer",
                  description: "For packages over $10,000 or if you suspect discrimination, an employment attorney's review is worth the investment. They can identify hidden risks, negotiate improvements, and ensure your rights are protected.",
                  icon: "⚖️",
                },
                {
                  title: "Document Everything",
                  description: "Save all correspondence, performance reviews, and employment documents. These can support your leverage during negotiations and may be important if you need to challenge the terms or timing of your termination.",
                  icon: "📁",
                },
              ].map((tip, i) => (
                <div key={i} className="p-4 rounded-xl bg-surface dark:bg-dark-800/20 border border-border/60 hover:border-primary-500/30 transition-colors">
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
            <p className="text-xs text-muted border-t border-primary-500/20 pt-3">
              <strong className="text-text">Remember:</strong> You typically have 21 to 45 days to review a severance agreement under federal law (depending on your age and circumstances). Take this time to fully understand the terms, consult with professionals, and negotiate confidently before signing.
            </p>
          </div>
        </motion.div>

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
              {faqItems.map((faq, i) => (
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
                The Severance Pay Calculator is provided for informational and educational purposes only. It produces estimates based on common severance formulas and typical tax withholding rates, and should not be considered as professional legal advice, tax guidance, or a substitute for consultation with qualified professionals.
              </p>
              <p>
                Employment laws vary significantly by country, state, and municipality. Severance policies differ by employer, industry, and individual employment contracts. This calculator may not account for all applicable laws, contractual provisions, collective bargaining agreements, or special circumstances that could affect your actual severance entitlement.
              </p>
              <p>
                We strongly recommend consulting with an employment attorney or qualified HR professional before signing any separation agreement or making decisions based on these estimates. Tax laws are complex and subject to change — consult a tax professional for accurate withholding and liability calculations specific to your situation.
              </p>
              <p className="text-xs text-muted border-t border-border pt-3">
                By using this calculator, you acknowledge that Measurely and its operators assume no liability for any losses, damages, or decisions made based on the calculations provided.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
