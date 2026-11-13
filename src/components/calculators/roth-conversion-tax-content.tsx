"use client";

import { motion } from "framer-motion";
import {
  Calculator, RefreshCw, TrendingUp, DollarSign, Users, BookOpen,
  AlertTriangle, ShieldCheck, ArrowRight, PiggyBank, Scale,
  Lightbulb, ChevronRight, FileText,
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

const userProfiles = [
  {
    title: "Early Career (20s–30s)",
    icon: "🚀",
    description: "Low current income means you can convert at lower tax rates. Decades of tax-free growth ahead make this the most powerful time to convert. Small conversions now can save hundreds of thousands in future taxes.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Mid-Career (40s–50s)",
    icon: "💼",
    description: "Higher income may push you into higher brackets, but strategic partial conversions during market downturns or lower-income years can still be highly beneficial. Focus on converting up to the top of your current bracket.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Pre-Retirees (50s–60s)",
    icon: "🏖️",
    description: "The window before RMDs begin is critical. Converting before claiming Social Security can keep Medicare IRMAA surcharges in check. This is often the last chance for large-scale conversions at controlled tax rates.",
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "High-Income Earners",
    icon: "💰",
    description: "If you are in the highest tax brackets now, conversions may be less beneficial. Focus on tax-efficient investing and consider Roth conversions only in lower-income years or after retirement when your tax rate drops.",
    color: "from-purple-500 to-pink-500",
  },
];

const faqItems = [
  {
    question: "What is a Roth IRA conversion?",
    answer: "A Roth IRA conversion is the process of moving funds from a traditional pre-tax retirement account (such as a Traditional IRA, 401(k), 403(b), or SEP IRA) into a Roth IRA. When you convert, you pay income tax on the amount converted in the year of the conversion. Once in the Roth IRA, the money grows tax-free, and qualified withdrawals in retirement are completely tax-free. There is no limit on how much you can convert, and unlike Roth contributions, there are no income limits for conversions.",
  },
  {
    question: "How is the conversion tax calculated?",
    answer: "The converted amount is added to your ordinary income for the year and taxed at your marginal income tax rate. For example, if you earn $80,000 and convert $50,000, your total taxable income becomes $130,000. The tax on the conversion depends on which tax bracket(s) the additional $50,000 falls into under the progressive tax system. This calculator estimates the additional tax you would owe based on your income, filing status, and the amount you plan to convert.",
  },
  {
    question: "Is a Roth conversion taxable?",
    answer: "Yes, a Roth conversion is a taxable event. The amount you convert from a pre-tax traditional account to a Roth IRA is treated as ordinary income in the year you make the conversion. You will owe federal income tax on the converted amount, and possibly state income tax as well. However, once the conversion is complete and the five-year aging period is satisfied, all future growth and qualified withdrawals are entirely tax-free. This is the fundamental trade-off: paying taxes now to avoid taxes later.",
  },
  {
    question: "When does a Roth conversion make sense?",
    answer: "A Roth conversion makes the most sense when you expect your future tax rate to be higher than your current tax rate. Common scenarios include: you are early in your career with low income, you are in a low-income year (due to job transition, sabbatical, or business losses), tax rates are historically low, you expect RMDs to push you into higher brackets later, or you want to leave tax-free inheritance to your heirs. It is generally less beneficial if you are in your peak earning years in a high tax bracket.",
  },
  {
    question: "Is there a limit on how much I can convert?",
    answer: "No, there is no dollar limit on Roth IRA conversions. You can convert any amount, from a few hundred dollars to your entire retirement account balance, in a single year. However, you should be strategic about how much you convert because the converted amount counts as ordinary income. Converting too much in one year could push you into a higher tax bracket or trigger Medicare IRMAA surcharges. Many people use a multi-year strategy, converting smaller amounts annually to stay within their target tax bracket.",
  },
  {
    question: "Can I undo a Roth conversion?",
    answer: "The ability to recharacterize (undo) a Roth conversion was eliminated by the Tax Cuts and Jobs Act of 2017 for conversions made after December 31, 2017. Once you complete a Roth conversion, it is permanent and cannot be reversed. However, you can still recharacterize Roth contributions (not conversions) back to a Traditional IRA. This makes it especially important to carefully plan your conversion amount and understand the tax implications before proceeding.",
  },
  {
    question: "What is the five-year rule for Roth conversions?",
    answer: "The five-year rule states that you must wait five years from the date of your first Roth conversion before you can withdraw the converted funds penalty-free. This rule applies to each conversion you make, but the five-year clock starts on January 1 of the year you make the conversion. If you withdraw converted funds before the five-year period ends, you may owe a 10% early withdrawal penalty on the converted amount. Note that this is separate from the five-year rule for Roth contributions.",
  },
  {
    question: "How does a Roth conversion affect Medicare premiums?",
    answer: "The additional income from a Roth conversion can trigger higher Medicare Part B and Part D premiums through the Income-Related Monthly Adjustment Amount (IRMAA). IRMAA is based on your modified adjusted gross income from two years prior. A large conversion could push you into a higher IRMAA bracket, increasing your monthly premiums significantly for both yourself and your spouse. This is an important consideration when planning the size and timing of conversions, especially for those approaching Medicare eligibility.",
  },
  {
    question: "Do Roth conversions affect Required Minimum Distributions (RMDs)?",
    answer: "Yes, Roth conversions can reduce future RMDs. Traditional IRAs and 401(k)s require you to begin taking RMDs at age 73 (or 75 for those born after 1960), which can push you into higher tax brackets. By converting pre-tax funds to a Roth IRA, you reduce the balance in your traditional accounts, thereby reducing future RMD amounts. Roth IRAs themselves have no RMDs during the original owner's lifetime, making conversions an effective strategy for managing your tax burden in retirement.",
  },
  {
    question: "Should I pay conversion taxes from the converted funds?",
    answer: "It is generally not recommended to use the converted funds themselves to pay the tax bill. If you withdraw money from your traditional IRA to pay the taxes, that amount is considered a distribution and is subject to both income tax and potentially a 10% early withdrawal penalty. This reduces the amount that ends up in your Roth IRA, defeating the purpose of the conversion. The ideal approach is to pay the conversion tax using funds from a separate taxable savings account.",
  },
  {
    question: "Can I convert my 401(k) to a Roth IRA while still employed?",
    answer: "It depends on your employer's plan rules. Some 401(k) plans allow in-plan Roth conversions (converting pre-tax 401(k) funds to the Roth portion of the same plan). Others allow in-service distributions that let you roll funds from your 401(k) to a Roth IRA while still employed. Many plans do not permit either option until you leave the employer. Check with your plan administrator. If you are no longer employed, you can freely roll your 401(k) into a Traditional IRA and then convert to a Roth IRA.",
  },
  {
    question: "How does filing status affect Roth conversion taxes?",
    answer: "Your filing status determines the tax brackets and standard deduction that apply to your conversion. Married couples filing jointly have significantly wider tax brackets than single filers, allowing for larger conversions at lower marginal rates. For example, in 2026, a married couple can have up to roughly $94,300 in taxable income and still be in the 12% bracket, while a single filer reaches the 22% bracket at around $47,150. Head of household filers fall between these two. Our calculator accounts for your filing status to provide accurate tax estimates.",
  },
  {
    question: "What is the pro-rata rule and how does it affect conversions?",
    answer: "The pro-rata rule applies when you have both pre-tax and after-tax funds in your Traditional IRAs. The IRS treats all your Traditional IRA funds as one pool for tax purposes. When you convert, you cannot convert only the after-tax portion — each conversion includes a proportional mix of pre-tax and after-tax funds based on the ratio across all your Traditional IRAs. This rule can make conversions less tax-efficient if you have significant after-tax basis. The pro-rata rule does not apply to employer-sponsored plans like 401(k)s.",
  },
  {
    question: "Does the calculator store my financial information?",
    answer: "No. All calculations are performed entirely in your browser. We do not store, transmit, or process any of the financial data you enter on our servers. Your income, conversion amount, and other personal financial information remain on your device and are never sent over the internet. You can verify this by using the calculator in offline mode or checking the network tab in your browser's developer tools. This privacy-first approach ensures your sensitive financial information stays completely private.",
  },
  {
    question: "Is this calculator accurate for my specific situation?",
    answer: "This calculator provides estimates based on current federal income tax brackets, standard deductions, and common tax rules. It applies your filing status, income, and conversion amount to estimate the additional tax you would owe on a Roth conversion. However, actual tax liability can be affected by state taxes, itemized deductions, credits, the Net Investment Income Tax (NIIT), AMT, IRMAA surcharges, and other individual factors. Use this calculator as a planning and educational tool. For definitive tax advice, consult a qualified tax professional.",
  },
];

export function RothConversionTaxContent() {
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
              <h2 className="text-base font-semibold text-text">How This Calculator Works</h2>
            </div>
            <div className="text-sm text-muted leading-relaxed space-y-4">
              <p>
                Our Roth Conversion Tax Calculator estimates the federal income tax you would owe when converting funds from a traditional pre-tax retirement account to a Roth IRA. The calculation follows the same progressive tax structure the IRS uses, applying current tax brackets, your filing status, and the standard deduction to determine the tax impact of your conversion.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">1</div>
                  <div>
                    <p className="text-sm font-medium text-text">Enter Your Current Income</p>
                    <p className="text-xs text-muted mt-0.5">Provide your total taxable income for the year (excluding the conversion). This establishes your baseline tax bracket before the conversion.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">2</div>
                  <div>
                    <p className="text-sm font-medium text-text">Select Your Filing Status</p>
                    <p className="text-xs text-muted mt-0.5">Choose from Single, Married Filing Jointly, Married Filing Separately, or Head of Household. Your filing status determines the applicable tax brackets and standard deduction.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">3</div>
                  <div>
                    <p className="text-sm font-medium text-text">Specify the Conversion Amount</p>
                    <p className="text-xs text-muted mt-0.5">Enter how much you plan to convert from your traditional IRA or 401(k) to a Roth IRA. The entire converted amount is treated as ordinary income.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">4</div>
                  <div>
                    <p className="text-sm font-medium text-text">Calculate Tax Owed and Effective Rate</p>
                    <p className="text-xs text-muted mt-0.5">The calculator adds the conversion to your income, applies the standard deduction, and calculates the total federal tax with and without the conversion. The difference is your conversion tax.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">5</div>
                  <div>
                    <p className="text-sm font-medium text-text">Review the Detailed Breakdown</p>
                    <p className="text-xs text-muted mt-0.5">See your tax brackets before and after conversion, the marginal rate applied to your conversion, the effective tax rate, and a chart showing how the tax burden is distributed across brackets.</p>
                  </div>
                </div>
              </div>
              <p>
                What makes this calculator different? Most basic calculators simply multiply your conversion amount by a single tax rate. Our calculator applies the actual progressive tax system — each portion of your conversion is taxed at the appropriate marginal rate as it fills each bracket from the bottom up. This gives you a far more accurate picture of your true tax cost.
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
                <Users className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Who Should Consider a Roth Conversion</h2>
            </div>
            <div className="text-sm text-muted leading-relaxed space-y-4">
              <p>
                Roth conversions are not right for everyone. The decision depends on your current tax rate, expected future tax rate, time horizon, and overall financial situation. Here is how different profiles typically compare:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {userProfiles.map((profile, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-border/80 bg-surface-secondary dark:bg-dark-800/30 hover:border-primary-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${profile.color} flex items-center justify-center text-white text-sm`}>
                        {profile.icon}
                      </div>
                      <h3 className="text-sm font-semibold text-text">{profile.title}</h3>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">{profile.description}</p>
                  </div>
                ))}
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
                <RefreshCw className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Understanding Roth Conversion Tax</h2>
            </div>
            <div className="text-sm text-muted leading-relaxed space-y-4">
              <p>
                When you convert pre-tax retirement funds to a Roth IRA, the entire converted amount is added to your ordinary income for the year. This means the conversion is taxed at your marginal income tax rate — the rate applied to your last dollar of income. Understanding how this interacts with the progressive tax system is essential for planning an efficient conversion.
              </p>
              <p>
                The United States uses a progressive tax system with seven federal brackets (10%, 12%, 22%, 24%, 32%, 35%, and 37%). Your income is not all taxed at the same rate. Instead, each portion of your income falls into the corresponding bracket. When you add a conversion, it fills the brackets from the bottom up, starting where your ordinary income leaves off. This means the tax on your conversion is typically lower than your highest marginal rate would suggest, because only the portion that reaches into the highest bracket is taxed at that rate.
              </p>
              <p>
                For example, if you are a single filer earning $60,000 and you convert $40,000, your total income becomes $100,000. After the standard deduction, your taxable income is about $85,000. The first $11,600 is taxed at 10%, the next $35,550 at 12%, and the remaining $37,850 at 22%. The conversion itself spans the 12% and 22% brackets, giving you an effective tax rate on the conversion well below 22%.
              </p>
              <p>
                Strategic conversion planning involves managing which tax brackets your conversion fills. The most common strategy is to convert up to the top of your current marginal bracket. For instance, if you have room in the 12% bracket before reaching 22%, converting exactly that amount maximizes tax efficiency. Over multiple years, you can gradually shift funds from traditional to Roth accounts while staying in lower brackets.
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
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Step-by-Step Guide</h2>
            </div>
            <div className="text-sm text-muted leading-relaxed space-y-4">
              <p>Follow these steps to use the Roth Conversion Tax Calculator effectively:</p>

              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200/50 dark:border-amber-500/20 rounded-xl p-4 space-y-2">
                <p className="font-semibold text-text flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Before You Start
                </p>
                <p className="text-xs text-muted">Gather your most recent tax return, know your filing status, and have a clear picture of your total income for the current year.</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">1</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text">Enter your annual income</p>
                    <p className="text-xs text-muted mt-0.5">Input your total expected ordinary income for the current year, excluding the Roth conversion. Include salary, freelance income, business income, rental income, and any other taxable sources.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">2</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text">Select your filing status</p>
                    <p className="text-xs text-muted mt-0.5">Choose Single, Married Filing Jointly, Married Filing Separately, or Head of Household. Your choice affects tax bracket thresholds and standard deduction amounts.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">3</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text">Enter the amount you want to convert</p>
                    <p className="text-xs text-muted mt-0.5">This is the dollar amount of pre-tax retirement funds you are considering moving to a Roth IRA. Start with a conservative amount and adjust as you see the tax impact.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">4</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text">Review the results</p>
                    <p className="text-xs text-muted mt-0.5">The calculator shows your estimated tax on conversion, the effective tax rate, a breakdown of which brackets the conversion spans, and a comparison of your tax situation with and without the conversion.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">5</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text">Adjust and optimize</p>
                    <p className="text-xs text-muted mt-0.5">Try different conversion amounts to find the sweet spot where you are maximizing the use of lower tax brackets without pushing too much income into higher brackets. Use the breakdown chart to visualize the impact.</p>
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
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Key Factors to Consider</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl border border-border/80 bg-surface-secondary dark:bg-dark-800/30 hover:border-primary-500/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center text-white text-xs font-bold">$</div>
                  <h3 className="text-sm font-semibold text-text">IRMAA Surcharges</h3>
                </div>
                <p className="text-xs text-muted leading-relaxed">The additional income from a Roth conversion can trigger higher Medicare Part B and Part D premiums through IRMAA. These surcharges apply to individuals with modified adjusted gross income above $103,000 (single) or $206,000 (married filing jointly) in 2026. A large one-time conversion could increase your premiums for two years. Plan conversions to stay below IRMAA thresholds or account for the added cost.</p>
              </div>
              <div className="p-4 rounded-xl border border-border/80 bg-surface-secondary dark:bg-dark-800/30 hover:border-primary-500/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">R</div>
                  <h3 className="text-sm font-semibold text-text">RMDs and Future Tax Brackets</h3>
                </div>
                <p className="text-xs text-muted leading-relaxed">Required Minimum Distributions from traditional retirement accounts begin at age 73 or 75, and they can push you into significantly higher tax brackets in retirement. By converting to Roth now, you reduce your future RMDs and potentially avoid higher taxes later. Consider projecting your RMDs at age 75 and 80 to see how conversions today reduce your future tax burden.</p>
              </div>
              <div className="p-4 rounded-xl border border-border/80 bg-surface-secondary dark:bg-dark-800/30 hover:border-primary-500/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">S</div>
                  <h3 className="text-sm font-semibold text-text">State Taxes</h3>
                </div>
                <p className="text-xs text-muted leading-relaxed">Most states tax Roth conversions as ordinary income, but nine states have no income tax (AK, FL, NV, NH, SD, TN, TX, WA, WY). Some states offer special treatment for retirement income or conversions. Consider how your state treats Roth conversions — moving to a tax-free state before converting could save you an additional 5–10% in state taxes on the converted amount.</p>
              </div>
              <div className="p-4 rounded-xl border border-border/80 bg-surface-secondary dark:bg-dark-800/30 hover:border-primary-500/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold">F</div>
                  <h3 className="text-sm font-semibold text-text">Future Tax Rate Uncertainty</h3>
                </div>
                <p className="text-xs text-muted leading-relaxed">The Tax Cuts and Jobs Act of 2017 lowered individual tax rates through 2025. After 2025, rates are scheduled to revert to higher 2017 levels unless Congress acts. This creates a powerful incentive to convert before rates potentially increase. Even if rates stay the same, converting during a temporary dip in your income or during a market downturn (when account values are lower) reduces the tax cost per dollar converted.</p>
              </div>
              <div className="p-4 rounded-xl border border-border/80 bg-surface-secondary dark:bg-dark-800/30 hover:border-primary-500/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white text-xs font-bold">T</div>
                  <h3 className="text-sm font-semibold text-text">Time Horizon for Growth</h3>
                </div>
                <p className="text-xs text-muted leading-relaxed">The longer your time horizon, the more powerful a Roth conversion becomes. Tax-free growth over 20–30 years can dramatically outweigh the upfront tax cost. A $50,000 conversion costing $6,000 in taxes today could grow to $200,000 tax-free over 25 years. If your time horizon is short (under 5 years), the math is less compelling since there is less time for tax-free compounding to offset the conversion cost.</p>
              </div>
              <div className="p-4 rounded-xl border border-border/80 bg-surface-secondary dark:bg-dark-800/30 hover:border-primary-500/30 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center text-white text-xs font-bold">H</div>
                  <h3 className="text-sm font-semibold text-text">Inheritance and Estate Planning</h3>
                </div>
                <p className="text-xs text-muted leading-relaxed">Roth IRAs are powerful estate planning tools. Heirs who inherit a Roth IRA can take tax-free distributions over their lifetime (under the SECURE Act&apos;s 10-year rule), whereas inherited Traditional IRA distributions are fully taxable. Converting to Roth not only benefits you but also leaves a tax-free legacy for your beneficiaries. This can be especially valuable if you plan to leave retirement accounts to children who are in their peak earning years.</p>
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
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-white" />
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
          <div className="bg-gradient-to-br from-primary-500/5 to-accent-cyan/5 rounded-2xl border border-primary-500/20 p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-500 flex items-center justify-center shrink-0">
                <PiggyBank className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Strategies for a Successful Roth Conversion</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-surface dark:bg-dark-800/20 border border-border/60 hover:border-primary-500/30 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-lg shrink-0 mt-0.5">📅</span>
                  <div>
                    <p className="text-sm font-semibold text-text mb-1">Convert During Low-Income Years</p>
                    <p className="text-xs text-muted leading-relaxed">Take advantage of years when your income is temporarily lower — between jobs, during a sabbatical, after a business loss, or in early retirement before Social Security and RMDs begin. These windows allow you to convert large amounts at lower marginal rates.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-surface dark:bg-dark-800/20 border border-border/60 hover:border-primary-500/30 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-lg shrink-0 mt-0.5">📉</span>
                  <div>
                    <p className="text-sm font-semibold text-text mb-1">Convert During Market Downturns</p>
                    <p className="text-xs text-muted leading-relaxed">When account values drop, you can convert more shares for the same tax cost. A market correction effectively discounts your conversion tax. When the market recovers, that growth happens entirely inside your Roth IRA, tax-free.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-surface dark:bg-dark-800/20 border border-border/60 hover:border-primary-500/30 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-lg shrink-0 mt-0.5">📊</span>
                  <div>
                    <p className="text-sm font-semibold text-text mb-1">Fill the Bracket Gap</p>
                    <p className="text-xs text-muted leading-relaxed">Identify the gap between your current taxable income and the top of your current marginal bracket. Convert exactly that amount each year to maximize the use of your lowest available rates. This multi-year approach minimizes overall tax cost.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-surface dark:bg-dark-800/20 border border-border/60 hover:border-primary-500/30 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-lg shrink-0 mt-0.5">🔄</span>
                  <div>
                    <p className="text-sm font-semibold text-text mb-1">Pay Taxes from Taxable Accounts</p>
                    <p className="text-xs text-muted leading-relaxed">Always pay the conversion tax using funds from a taxable savings or brokerage account. Withholding taxes from the conversion itself reduces your Roth balance and may trigger early withdrawal penalties. Using external funds preserves the full benefit of the conversion.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-surface dark:bg-dark-800/20 border border-border/60 hover:border-primary-500/30 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-lg shrink-0 mt-0.5">🧩</span>
                  <div>
                    <p className="text-sm font-semibold text-text mb-1">Combine with Tax-Loss Harvesting</p>
                    <p className="text-xs text-muted leading-relaxed">If you have capital losses in your taxable accounts, use tax-loss harvesting to offset up to $3,000 of ordinary income per year (plus capital gains). This reduces your taxable income, creating more room in lower brackets for a Roth conversion.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-surface dark:bg-dark-800/20 border border-border/60 hover:border-primary-500/30 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-lg shrink-0 mt-0.5">👨‍👩‍👧‍👦</span>
                  <div>
                    <p className="text-sm font-semibold text-text mb-1">Use the Spousal IRA Strategy</p>
                    <p className="text-xs text-muted leading-relaxed">If you are married and have both Traditional and Roth IRAs, consider converting each spouse&apos;s accounts separately. You can optimize each spouse&apos;s bracket filling independently. A non-working spouse can also convert based on the couple&apos;s joint filing status.</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted border-t border-primary-500/20 pt-3">
              <strong className="text-text">Important:</strong> Roth conversion rules and tax implications are complex. The optimal strategy depends on your unique financial situation, including your current and projected future tax rates, retirement timeline, state of residence, and estate planning goals. Consult a qualified tax professional or financial advisor before implementing any conversion strategy.
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
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Disclaimer</h2>
            </div>
            <div className="text-sm text-muted leading-relaxed space-y-3">
              <p>
                The Roth Conversion Tax Calculator is provided for informational and educational purposes only. It produces estimates based on current federal income tax brackets and standard tax rules and should not be considered as professional tax advice, financial planning guidance, or a substitute for consultation with qualified professionals.
              </p>
              <p>
                Tax laws are complex, vary by state and locality, and are subject to change. This calculator may not account for all factors that could affect your actual tax liability, including the Net Investment Income Tax (NIIT), Alternative Minimum Tax (AMT), state and local income taxes, Medicare IRMAA surcharges, the pro-rata rule for after-tax IRA basis, the impact of Roth conversions on financial aid eligibility, or specific provisions of your employer&apos;s retirement plan.
              </p>
              <p>
                We strongly recommend consulting with a licensed tax professional, certified financial planner, or retirement planning specialist who is familiar with your specific financial situation before making any Roth conversion decisions. The accuracy of the calculator depends on the accuracy of the information you provide, and actual tax results may vary based on your complete tax picture.
              </p>
              <p className="text-xs text-muted border-t border-border pt-3">
                By using this calculator, you acknowledge that Measurely and its operators assume no liability for any losses, taxes, penalties, or decisions made based on the calculations provided.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
