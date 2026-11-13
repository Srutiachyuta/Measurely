"use client";

import Link from "next/link";
import {
  Heart, PiggyBank, DollarSign, TrendingUp, Percent, Shield, HelpCircle,
} from "lucide-react";

export function HsaTaxSavingsContent() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-border/60">
      <article className="prose-content max-w-none">
        <p className="mb-4 text-sm text-muted">2026 limits verified against <a href="https://www.irs.gov/irb/2025-21_IRB" className="underline" target="_blank" rel="noopener noreferrer">IRS Revenue Procedure 2025-19</a>. Examples using $4,150 are illustrative contributions, not the current maximum.</p>
        <h2 className="text-2xl font-bold text-text mt-0">How to Maximize Your HSA Tax Benefits in 2026</h2>

        <div className="p-4 rounded-2xl bg-primary-50 dark:bg-primary-500/10 border border-primary-200/50 dark:border-primary-500/20 mb-6">
          <p className="text-sm font-medium text-primary-800 dark:text-primary-200 mb-1"><strong>Quick Answer:</strong> A Health Savings Account (HSA) offers a triple tax advantage: tax-deductible contributions, tax-free growth, and tax-free withdrawals for qualified medical expenses. In 2026, you can contribute up to $4,400 (individual) or $8,750 (family), plus a $1,000 catch-up if you are 55+. Maximizing your HSA can save you hundreds in taxes annually and build a significant retirement healthcare fund.</p>
        </div>

        <p className="text-text-secondary leading-relaxed mb-4">Health Savings Accounts (HSAs) are widely considered the most tax-advantaged account available to Americans — even more than 401(k)s and IRAs. The reason is the &quot;triple tax advantage&quot;: contributions are tax-deductible, growth is tax-free, and withdrawals for qualified medical expenses are tax-free.</p>

        <p className="text-text-secondary leading-relaxed mb-4">Despite this powerful tax treatment, millions of eligible Americans do not fully utilize their HSAs. Many contribute only enough to cover current medical expenses, missing out on the long-term investing potential. In 2026, with rising healthcare costs and updated IRS contribution limits, understanding how to maximize your HSA tax benefits is more valuable than ever.</p>

        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200/50 dark:border-amber-500/20 mb-6">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200"><strong>Key Takeaway:</strong> An HSA is the only account that offers tax-free contributions, growth, and withdrawals. Maxing out your HSA and investing the balance can save you tens of thousands in taxes over your lifetime.</p>
        </div>

        <h3 className="text-xl font-bold text-text mt-8 mb-3">What Is a Health Savings Account (HSA)?</h3>

        <div className="p-4 rounded-2xl bg-primary-50 dark:bg-primary-500/10 border border-primary-200/50 dark:border-primary-500/20 mb-6">
          <p className="text-sm font-medium text-primary-800 dark:text-primary-200"><strong>Quick Answer:</strong> An HSA is a tax-advantaged savings account that you pair with a qualifying High-Deductible Health Plan (HDHP). You contribute pre-tax dollars, invest them for growth, and withdraw tax-free for qualified medical expenses at any age.</p>
        </div>

        <p className="text-text-secondary leading-relaxed mb-4">An HSA is a personal savings account designed to help you pay for qualified medical expenses with significant tax advantages. Unlike Flexible Spending Accounts (FSAs), HSA funds roll over year to year and never expire. You own the account — it stays with you even if you change employers or health plans.</p>

        <p className="text-text-secondary leading-relaxed mb-4">To open and contribute to an HSA, you must be enrolled in a qualifying High-Deductible Health Plan (HDHP). For 2026, an HDHP is defined as a plan with a minimum deductible of $1,700 (individual) or $3,400 (family). You must also not be enrolled in Medicare and cannot be claimed as a dependent on someone else&apos;s tax return.</p>

        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200/50 dark:border-amber-500/20 mb-6">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200"><strong>Key Takeaway:</strong> To use an HSA, you need a qualifying HDHP. Once enrolled, you can contribute pre-tax dollars, invest them, and withdraw tax-free for medical expenses at any time.</p>
        </div>

        <h3 className="text-xl font-bold text-text mt-8 mb-3">Who Can Open an HSA?</h3>

        <p className="text-text-secondary leading-relaxed mb-4">You are eligible for an HSA if you meet all of these conditions:</p>

        <ul className="space-y-1.5 list-disc list-inside mb-4">
          <li className="text-text-secondary">Enrolled in a qualifying High-Deductible Health Plan (HDHP)</li>
          <li className="text-text-secondary">Not covered by any other non-HDHP health plan (including a spouse&apos;s plan)</li>
          <li className="text-text-secondary">Not enrolled in Medicare (Parts A, B, or C)</li>
          <li className="text-text-secondary">Cannot be claimed as a dependent on someone else&apos;s tax return</li>
          <li className="text-text-secondary">No general-purpose FSA or HRA that pays for medical expenses before the deductible is met</li>
        </ul>

        <p className="text-text-secondary leading-relaxed mb-4">If you meet these criteria, you can open an HSA at most banks, credit unions, or brokerage firms. Many employers offer HSA accounts through their benefits providers, often with employer contributions.</p>

        <h3 className="text-xl font-bold text-text mt-8 mb-3">How HSA Tax Advantages Work</h3>

        <p className="text-text-secondary leading-relaxed mb-4">The HSA triple tax advantage makes it uniquely powerful. Here is how each component works:</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/50">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-indigo-500" />
              <h4 className="text-sm font-semibold text-indigo-800 dark:text-indigo-200">1. Tax-Deductible Contributions</h4>
            </div>
            <p className="text-xs text-indigo-700 dark:text-indigo-300">Contributions reduce your taxable income. A $4,150 contribution at 22% federal rate saves $913 in federal tax alone. Plus state tax and potential FICA savings.</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/50">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              <h4 className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">2. Tax-Free Growth</h4>
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">Earnings on investments grow tax-free. At 7% annual return over 30 years, your HSA can grow from contributions to a substantial retirement healthcare fund with no tax on gains.</p>
          </div>

          <div className="p-4 rounded-2xl bg-primary-50 dark:bg-primary-500/10 border border-primary-200/50">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-primary-500" />
              <h4 className="text-sm font-semibold text-primary-800 dark:text-primary-200">3. Tax-Free Withdrawals</h4>
            </div>
            <p className="text-xs text-primary-700 dark:text-primary-300">Withdrawals for qualified medical expenses are completely tax-free. You can also reimburse yourself for past medical expenses if you kept receipts. After 65, non-medical withdrawals are taxed as income (but not penalized).</p>
          </div>
        </div>

        <p className="text-text-secondary leading-relaxed mb-4"><strong>Complete savings example:</strong> If you contribute $4,150 to your HSA, are in the 22% federal bracket, 5% state bracket, and are FICA-eligible (7.65%), your total tax savings are:</p>

        <ul className="space-y-1.5 list-disc list-inside mb-4">
          <li className="text-text-secondary">Federal tax saved: $913 (22% of $4,150)</li>
          <li className="text-text-secondary">State tax saved: $208 (5% of $4,150)</li>
          <li className="text-text-secondary">FICA saved: $317 (7.65% of $4,150)</li>
          <li className="text-text-secondary"><strong className="text-text">Total annual savings: $1,438</strong></li>
          <li className="text-text-secondary">Effective tax rate savings: 34.65%</li>
        </ul>

        <h3 className="text-xl font-bold text-text mt-8 mb-3">How Much Should You Contribute?</h3>

        <p className="text-text-secondary leading-relaxed mb-4">The answer depends on your financial situation, but here is a general priority framework:</p>

        <ol className="space-y-1.5 list-inside mb-4">
          <li className="text-text-secondary"><strong className="text-text">Contribute enough to get the full employer match</strong> — If your employer contributes to your HSA, that is free money. Always contribute enough to maximize it.</li>
          <li className="text-text-secondary"><strong className="text-text">Max out your HSA before a Traditional IRA</strong> — HSAs offer the same tax deduction as a Traditional IRA but with the added benefit of tax-free withdrawals for medical expenses.</li>
          <li className="text-text-secondary"><strong className="text-text">Consider maxing out before a 401(k) beyond the match</strong> — For those with high healthcare costs or who want maximum tax efficiency, the HSA triple tax advantage can beat even 401(k) tax treatment.</li>
          <li className="text-text-secondary"><strong className="text-text">At minimum, contribute enough to cover your expected annual medical expenses</strong> — If you cannot max out, at least fund the account enough to pay for doctor visits, prescriptions, and other predictable costs.</li>
        </ol>

        <p className="text-text-secondary leading-relaxed mb-4">For 2026, IRS limits are $4,400 for individual coverage and $8,750 for family coverage. If you are 55 or older, you can contribute an additional $1,000 catch-up contribution. These limits include both your contributions and any employer contributions.</p>

        <h3 className="text-xl font-bold text-text mt-8 mb-3">Should You Invest Your HSA?</h3>

        <p className="text-text-secondary leading-relaxed mb-4">Many HSA account holders keep their balance in cash, earning minimal interest. While this is fine for short-term medical expenses, it misses the most powerful part of the HSA — tax-free investment growth.</p>

        <p className="text-text-secondary leading-relaxed mb-4">The strategy used by savvy HSA investors is often called &quot;invest and reimburse later&quot;:</p>

        <ol className="space-y-1.5 list-inside mb-4">
          <li className="text-text-secondary">Max out your HSA contributions each year</li>
          <li className="text-text-secondary">Pay for current medical expenses out of pocket (not from the HSA)</li>
          <li className="text-text-secondary">Keep the receipts for all medical expenses you pay with after-tax dollars</li>
          <li className="text-text-secondary">Invest your HSA balance in low-cost index funds or target-date funds</li>
          <li className="text-text-secondary">Let the money grow tax-free for decades</li>
          <li className="text-text-secondary">In retirement, reimburse yourself tax-free for all those past medical expenses using the receipts you kept</li>
        </ol>

        <p className="text-text-secondary leading-relaxed mb-4">This strategy effectively turns your HSA into a supplemental retirement account with better tax treatment than a 401(k) or IRA. There is no time limit on when you can reimburse yourself, as long as the expense was qualified and you had an HSA at the time.</p>

        <h3 className="text-xl font-bold text-text mt-8 mb-3">HSA vs FSA vs Traditional Savings Account</h3>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border/60">
                <th className="text-left text-xs font-semibold text-text uppercase tracking-wider py-2.5 pr-4">Feature</th>
                <th className="text-left text-xs font-semibold text-text uppercase tracking-wider py-2.5 pr-4">HSA</th>
                <th className="text-left text-xs font-semibold text-text uppercase tracking-wider py-2.5 pr-4">FSA</th>
                <th className="text-left text-xs font-semibold text-text uppercase tracking-wider py-2.5 pr-4">Regular Savings</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60">
                <td className="text-text-secondary py-2.5 pr-4 font-semibold text-text">Tax on Contributions</td>
                <td className="text-text-secondary py-2.5 pr-4">Tax-deductible</td>
                <td className="text-text-secondary py-2.5 pr-4">Pre-tax</td>
                <td className="text-text-secondary py-2.5 pr-4">After-tax</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="text-text-secondary py-2.5 pr-4 font-semibold text-text">Tax on Growth</td>
                <td className="text-text-secondary py-2.5 pr-4">Tax-free</td>
                <td className="text-text-secondary py-2.5 pr-4">N/A</td>
                <td className="text-text-secondary py-2.5 pr-4">Taxable</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="text-text-secondary py-2.5 pr-4 font-semibold text-text">Tax on Withdrawals</td>
                <td className="text-text-secondary py-2.5 pr-4">Tax-free (qualified)</td>
                <td className="text-text-secondary py-2.5 pr-4">Tax-free</td>
                <td className="text-text-secondary py-2.5 pr-4">After-tax</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="text-text-secondary py-2.5 pr-4 font-semibold text-text">Funds Roll Over</td>
                <td className="text-text-secondary py-2.5 pr-4">Yes, forever</td>
                <td className="text-text-secondary py-2.5 pr-4">Limited ($610 max)</td>
                <td className="text-text-secondary py-2.5 pr-4">Yes</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="text-text-secondary py-2.5 pr-4 font-semibold text-text">Portability</td>
                <td className="text-text-secondary py-2.5 pr-4">Stays with you</td>
                <td className="text-text-secondary py-2.5 pr-4">Employer-owned</td>
                <td className="text-text-secondary py-2.5 pr-4">Stays with you</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="text-text-secondary py-2.5 pr-4 font-semibold text-text">Investment Option</td>
                <td className="text-text-secondary py-2.5 pr-4">Yes</td>
                <td className="text-text-secondary py-2.5 pr-4">No</td>
                <td className="text-text-secondary py-2.5 pr-4">Yes</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="text-text-secondary py-2.5 pr-4 font-semibold text-text">2026 Contribution Limit</td>
                <td className="text-text-secondary py-2.5 pr-4">$4,400/$8,750</td>
                <td className="text-text-secondary py-2.5 pr-4">$3,200</td>
                <td className="text-text-secondary py-2.5 pr-4">Unlimited</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold text-text mt-8 mb-3">Common HSA Mistakes</h3>

        <ul className="space-y-1.5 list-disc list-inside mb-4">
          <li className="text-text-secondary"><strong className="text-text">Not investing idle cash:</strong> The biggest mistake. Leaving HSA funds in cash earning 0.1% misses decades of tax-free compound growth.</li>
          <li className="text-text-secondary"><strong className="text-text">Missing annual contribution limits:</strong> Not contributing the maximum leaves tax savings on the table. Set up automatic contributions.</li>
          <li className="text-text-secondary"><strong className="text-text">Using funds for non-qualified expenses before 65:</strong> Non-medical withdrawals before 65 incur income tax plus a 20% penalty.</li>
          <li className="text-text-secondary"><strong className="text-text">Forgetting to keep receipts:</strong> You can reimburse yourself at any time for past qualified expenses — but only if you have the receipts. Keep a digital folder.</li>
          <li className="text-text-secondary"><strong className="text-text">Not using the account after 65:</strong> After 65, you can withdraw for any purpose without penalty (though non-medical withdrawals are taxed as income).</li>
          <li className="text-text-secondary"><strong className="text-text">Overlooking employer contributions:</strong> Some employers contribute to employee HSAs. Make sure you are capturing this free money.</li>
        </ul>

        <h3 className="text-xl font-bold text-text mt-8 mb-3">How Our HSA Tax Savings Calculator Works</h3>

        <p className="text-text-secondary leading-relaxed mb-4">Our <Link href="/hsa-tax-savings-calculator" className="text-primary-600 dark:text-primary-400 hover:underline">HSA Tax Savings Calculator</Link> estimates your full tax savings and long-term HSA growth in seconds:</p>

        <ol className="space-y-1.5 list-inside mb-4">
          <li className="text-text-secondary"><strong className="text-text">Enter your age and retirement age</strong> — For projecting long-term growth</li>
          <li className="text-text-secondary"><strong className="text-text">Set your filing status and state</strong> — For accurate tax calculations</li>
          <li className="text-text-secondary"><strong className="text-text">Input your marginal tax rates</strong> — Federal, state, and indicate FICA eligibility</li>
          <li className="text-text-secondary"><strong className="text-text">Enter HSA details</strong> — Current balance, annual contribution, employer contribution, and expected medical withdrawals</li>
          <li className="text-text-secondary"><strong className="text-text">Set assumptions</strong> — Investment return, contribution increases, inflation, and healthcare inflation</li>
          <li className="text-text-secondary"><strong className="text-text">Click Calculate</strong> — View annual tax savings, retirement HSA value, total contributions, growth, and lifetime tax benefit</li>
        </ol>

        <p className="text-text-secondary leading-relaxed mb-4"><strong>Example result for a 30-year-old contributing $4,150/year at 22% federal, 5% state, FICA eligible:</strong></p>
        <ul className="space-y-1.5 list-disc list-inside mb-4">
          <li className="text-text-secondary">Annual tax savings: $1,438 ($913 federal + $208 state + $317 FICA)</li>
          <li className="text-text-secondary">Retirement HSA value at 65: approximately $380,000 (at 7% return)</li>
          <li className="text-text-secondary">Lifetime tax benefit: approximately $50,000+</li>
          <li className="text-text-secondary">Effective return advantage: 34.65% (investment return + tax savings rate)</li>
        </ul>

        <h3 className="text-xl font-bold text-text mt-8 mb-3">Frequently Asked Questions</h3>

        <div className="space-y-4 mb-6">
          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer py-3 px-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60 hover:bg-surface transition-colors">
              <HelpCircle className="w-4 h-4 text-primary-500 shrink-0" />
              What is an HSA?
            </summary>
            <div className="pt-3 px-4 pb-4 text-sm text-text-secondary leading-relaxed">
              A Health Savings Account (HSA) is a tax-advantaged savings account available to individuals enrolled in a qualifying High-Deductible Health Plan (HDHP). It offers a triple tax advantage: contributions are tax-deductible, earnings grow tax-free, and withdrawals for qualified medical expenses are tax-free. HSAs are owned by the individual and funds roll over year to year with no expiration.
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer py-3 px-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60 hover:bg-surface transition-colors">
              <HelpCircle className="w-4 h-4 text-primary-500 shrink-0" />
              How much tax can an HSA save?
            </summary>
            <div className="pt-3 px-4 pb-4 text-sm text-text-secondary leading-relaxed">
            The savings depend on your tax bracket. At the 22% federal rate with 5% state tax and FICA eligibility, a $4,150 HSA contribution saves approximately $1,438 annually — $913 federal, $208 state, and $317 FICA. Over 30 years with investment growth, the total tax benefit can exceed $50,000.
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer py-3 px-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60 hover:bg-surface transition-colors">
              <HelpCircle className="w-4 h-4 text-primary-500 shrink-0" />
              Is an HSA better than an FSA?
            </summary>
            <div className="pt-3 px-4 pb-4 text-sm text-text-secondary leading-relaxed">
              Yes, for most people. HSAs offer the triple tax advantage, funds roll over forever, the account is portable (stays with you), and you can invest the balance. FSAs are use-it-or-lose-it (with limited carryover), employer-owned, and cannot be invested. The trade-off is that you need an HDHP to qualify for an HSA, which means higher deductibles.
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer py-3 px-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60 hover:bg-surface transition-colors">
              <HelpCircle className="w-4 h-4 text-primary-500 shrink-0" />
              Can an HSA be used for retirement?
            </summary>
            <div className="pt-3 px-4 pb-4 text-sm text-text-secondary leading-relaxed">
              Yes. After age 65, you can withdraw HSA funds for any purpose without the 20% penalty (though non-medical withdrawals are taxed as ordinary income). For medical expenses, withdrawals remain tax-free. Many people use their HSA as a supplemental retirement account by investing contributions and reimbursing themselves for past medical expenses in retirement.
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer py-3 px-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60 hover:bg-surface transition-colors">
              <HelpCircle className="w-4 h-4 text-primary-500 shrink-0" />
              Should I invest my HSA?
            </summary>
            <div className="pt-3 px-4 pb-4 text-sm text-text-secondary leading-relaxed">
              If you can pay current medical expenses out of pocket, investing your HSA is highly recommended. The tax-free growth over decades can turn modest contributions into a significant retirement healthcare fund. Most HSA providers offer investment options once your balance exceeds a threshold (typically $1,000-$2,000). Low-cost index funds or target-date funds are popular choices.
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer py-3 px-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60 hover:bg-surface transition-colors">
              <HelpCircle className="w-4 h-4 text-primary-500 shrink-0" />
              What happens to my HSA if I change jobs?
            </summary>
            <div className="pt-3 px-4 pb-4 text-sm text-text-secondary leading-relaxed">
              Your HSA stays with you. Unlike an FSA, the account is owned by you, not your employer. You can keep the existing account, roll it over to a new HSA provider, or leave it where it is. You can continue making contributions if you remain eligible through a new HDHP or self-only HDHP coverage.
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer py-3 px-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60 hover:bg-surface transition-colors">
              <HelpCircle className="w-4 h-4 text-primary-500 shrink-0" />
              What are qualified medical expenses?
            </summary>
            <div className="pt-3 px-4 pb-4 text-sm text-text-secondary leading-relaxed">
              Qualified medical expenses include most healthcare costs not covered by insurance: doctor visits, prescriptions, dental care, vision care, mental health services, chiropractic care, medical equipment, and long-term care services. The IRS also allows HSA funds for over-the-counter medications (since 2020) and menstrual care products (since 2020). Insurance premiums are generally not qualified except for COBRA, long-term care insurance, and premiums while receiving unemployment benefits.
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer py-3 px-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60 hover:bg-surface transition-colors">
              <HelpCircle className="w-4 h-4 text-primary-500 shrink-0" />
              Can I use HSA funds for my spouse or dependents?
            </summary>
            <div className="pt-3 px-4 pb-4 text-sm text-text-secondary leading-relaxed">
              Yes. You can use HSA funds tax-free for qualified medical expenses of your spouse and tax dependents, even if they are not covered by your HDHP. This makes the HSA a valuable tool for managing family healthcare costs across different insurance situations.
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer py-3 px-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60 hover:bg-surface transition-colors">
              <HelpCircle className="w-4 h-4 text-primary-500 shrink-0" />
              What is the penalty for non-qualified HSA withdrawals?
            </summary>
            <div className="pt-3 px-4 pb-4 text-sm text-text-secondary leading-relaxed">
              Before age 65, non-qualified withdrawals are subject to ordinary income tax plus a 20% penalty. After 65, non-qualified withdrawals are taxed as ordinary income but no longer penalized. This makes the HSA an effective retirement savings vehicle even if you do not have enough medical expenses.
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer py-3 px-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60 hover:bg-surface transition-colors">
              <HelpCircle className="w-4 h-4 text-primary-500 shrink-0" />
              How accurate is this calculator?
            </summary>
            <div className="pt-3 px-4 pb-4 text-sm text-text-secondary leading-relaxed">
              This calculator provides estimates based on IRS rules and common investment assumptions. Actual results depend on your specific tax situation, investment performance, healthcare costs, and changes in tax law. Use this as a planning tool and consult a qualified tax advisor or financial professional for personalized advice.
            </div>
          </details>
        </div>

        <h3 className="text-xl font-bold text-text mt-8 mb-3">Final Thoughts</h3>

        <p className="text-text-secondary leading-relaxed mb-4">The HSA is arguably the most powerful tax-advantaged account available. Its triple tax advantage — tax-deductible contributions, tax-free growth, and tax-free qualified withdrawals — is unmatched by any other retirement or savings vehicle.</p>

        <p className="text-text-secondary leading-relaxed mb-4">The key to maximizing HSA benefits is to treat it as a long-term investment account, not just a checking account for medical bills. Contribute the maximum, invest the balance, keep receipts for medical expenses, and let compounding work its magic over decades.</p>

        <p className="text-text-secondary leading-relaxed mb-4"><strong>Ready to estimate your HSA tax savings?</strong> Use our <Link href="/hsa-tax-savings-calculator" className="text-primary-600 dark:text-primary-400 hover:underline">free HSA Tax Savings Calculator</Link> to see your annual savings, projected growth, and lifetime tax benefit. Then explore our Retirement Calculator, <Link href="/compound-interest-calculator" className="text-primary-600 dark:text-primary-400 hover:underline">Compound Interest Calculator</Link>, and Net Worth Calculator for a complete financial picture.</p>

        <div className="p-4 text-xs text-muted bg-surface-secondary rounded-xl border border-border/60 mt-8">
          <strong className="text-text">Disclaimer:</strong> This calculator provides estimates for illustrative purposes only. Actual tax savings depend on your individual circumstances, tax filing status, and current IRS rules. Always consult a qualified tax advisor or financial professional before making decisions about HSA contributions and investments.
        </div>
      </article>
    </div>
  );
}
