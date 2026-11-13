"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PoundSterling, PiggyBank, Car, Bike, Baby, Monitor,
  TrendingUp, Percent, Shield, HelpCircle,
} from "lucide-react";

export function SalarySacrificeContent() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-border/60">
      <article className="prose-content max-w-none">
        <h2 className="text-2xl font-bold text-text mt-0">How Salary Sacrifice Can Reduce Your Tax Bill in the UK (2026 Guide)</h2>

        <div className="p-4 rounded-2xl bg-primary-50 dark:bg-primary-500/10 border border-primary-200/50 dark:border-primary-500/20 mb-6">
          <p className="text-sm font-medium text-primary-800 dark:text-primary-200 mb-1"><strong>Quick Answer:</strong> Salary sacrifice lets you swap part of your pre-tax salary for a non-cash benefit, reducing your taxable income and National Insurance contributions. You can save up to 47% (income tax + employee NI) on every pound sacrificed, plus your employer saves 13.8% in employer NI.</p>
        </div>

        <p className="text-text-secondary leading-relaxed mb-4">Salary sacrifice is one of the most tax-efficient ways to structure your compensation in the UK. By agreeing to give up a portion of your pre-tax salary in exchange for a workplace benefit — such as pension contributions, an electric vehicle, or childcare vouchers — you reduce your taxable income, pay less Income Tax and National Insurance, and often receive a valuable benefit in return.</p>

        <p className="text-text-secondary leading-relaxed mb-4">With the 2026-27 tax year bringing updated thresholds and continued employer focus on benefits packages, understanding how salary sacrifice works has never been more important. This guide explains everything you need to know, complete with worked examples and a free calculator.</p>

        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200/50 dark:border-amber-500/20 mb-6">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200"><strong>Key Takeaway:</strong> Salary sacrifice reduces your taxable income, saving you Income Tax (20-45%) and National Insurance (8-2%), while your employer saves 13.8% in employer NI. These savings can be shared or reinvested into your benefit.</p>
        </div>

        <h3 className="text-xl font-bold text-text mt-8 mb-3">What Is Salary Sacrifice?</h3>

        <div className="p-4 rounded-2xl bg-primary-50 dark:bg-primary-500/10 border border-primary-200/50 dark:border-primary-500/20 mb-6">
          <p className="text-sm font-medium text-primary-800 dark:text-primary-200"><strong>Quick Answer:</strong> Salary sacrifice is a formal agreement between you and your employer where you give up part of your salary in exchange for a non-cash benefit. Your taxable pay reduces, so you pay less Income Tax and NI, and the benefit you receive is often tax-free.</p>
        </div>

        <p className="text-text-secondary leading-relaxed mb-4">Salary sacrifice (also called &quot;salary exchange&quot; or &quot;salary swap&quot;) is an arrangement where an employee agrees to reduce their contractual salary by a certain amount. In return, the employer provides a non-cash benefit of equivalent value. The key financial advantage is that the sacrificed amount is not subject to Income Tax or National Insurance, creating immediate savings for both employee and employer.</p>

        <p className="text-text-secondary leading-relaxed mb-4">Common examples include pension salary sacrifice (the most popular), electric vehicle schemes, cycle-to-work programs, childcare vouchers, and technology schemes. Each type has specific rules and tax treatments, but the underlying principle is the same: you pay less tax by earning less taxable income.</p>

        <p className="text-text-secondary leading-relaxed mb-4">Salary sacrifice is not the same as simply opting out of a benefit. It is a contractual change to your terms of employment. Your employer must agree to the arrangement, and you should understand how it affects your contractual rights, statutory payments (maternity pay, redundancy pay), and pension contributions.</p>

        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200/50 dark:border-amber-500/20 mb-6">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200"><strong>Key Takeaway:</strong> Salary sacrifice is a contractual reduction in salary for a non-cash benefit. It reduces your taxable income, saving tax and NI, but may affect certain statutory payments and pension contributions.</p>
        </div>

        <h3 className="text-xl font-bold text-text mt-8 mb-3">How Salary Sacrifice Works</h3>

        <div className="p-4 rounded-2xl bg-primary-50 dark:bg-primary-500/10 border border-primary-200/50 dark:border-primary-500/20 mb-6">
          <p className="text-sm font-medium text-primary-800 dark:text-primary-200"><strong>Quick Answer:</strong> You agree to reduce your salary by a set amount (e.g., \u00A3200/month). That amount is no longer subject to Income Tax or NI. Your employer provides the benefit (e.g., pays it into your pension). Your payslip shows a lower gross pay, meaning less tax and NI deducted.</p>
        </div>

        <p className="text-text-secondary leading-relaxed mb-4">The mechanics are straightforward. Before salary sacrifice, your \u00A350,000 salary is taxed as usual. After agreeing to sacrifice \u00A32,500 per year into your pension, your taxable salary becomes \u00A347,500. You pay Income Tax and NI only on \u00A347,500, saving you a combined 32-47% on the sacrificed amount (depending on your tax band).</p>

        <p className="text-text-secondary leading-relaxed mb-4">The benefit is that the \u00A32,500 goes into your pension (or pays for your electric vehicle, bike, etc.) without being reduced by tax and NI. If you had taken that \u00A32,500 as cash, you would only receive around \u00A31,700-2,000 after tax and NI. The salary sacrifice route means the full \u00A32,500 works for you.</p>

        <p className="text-text-secondary leading-relaxed mb-4"><strong>Impact on your payslip:</strong> Your payslip will show a lower gross pay figure. Income Tax and NI deductions will be lower. The benefit (e.g., pension contribution) may appear as a separate line item or be handled by your employer directly.</p>

        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200/50 dark:border-amber-500/20 mb-6">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200"><strong>Key Takeaway:</strong> Every pound you sacrifice saves you Income Tax (20-45%) and Employee NI (8-2%). A basic-rate taxpayer saves 28% on every pound sacrificed. A higher-rate taxpayer saves 48%.</p>
        </div>

        <h3 className="text-xl font-bold text-text mt-8 mb-3">Which Benefits Can Be Included?</h3>

        <p className="text-text-secondary leading-relaxed mb-4">Not all benefits qualify for salary sacrifice, and the tax treatment varies by benefit type. Here are the most common qualifying arrangements:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center">
                <PiggyBank className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-semibold text-text">Pension Contributions</h4>
            </div>
            <p className="text-xs text-muted">The most common and tax-efficient form. Employer pays your sacrificed salary into your workplace pension. Full tax and NI savings apply.</p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center">
                <Car className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-semibold text-text">Electric Vehicles</h4>
            </div>
            <p className="text-xs text-muted">EV salary sacrifice schemes are growing rapidly. Low Benefit-in-Kind tax rates (2% in 2026) make EVs very attractive through salary sacrifice.</p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center">
                <Bike className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-semibold text-text">Cycle to Work</h4>
            </div>
            <p className="text-xs text-muted">Tax-free bikes and equipment up to \u00A31,000 (higher for e-bikes). Employer owns the bike during the hire period, then transfers it to you.</p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center">
                <Baby className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-semibold text-text">Childcare</h4>
            </div>
            <p className="text-xs text-muted">Tax-free childcare up to \u00A355 per week (basic rate) through employer-provided childcare vouchers or directly contracted childcare.</p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center">
                <Monitor className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-semibold text-text">Technology Schemes</h4>
            </div>
            <p className="text-xs text-muted">Laptops, tablets, and home office equipment through salary sacrifice. Employer owns the equipment during the agreement period.</p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center">
                <Shield className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-semibold text-text">Other Benefits</h4>
            </div>
            <p className="text-xs text-muted">Includes additional pension AVCs, life insurance, health screenings, and some employer-provided benefits. Check specific tax treatment.</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-text mt-8 mb-3">Tax and National Insurance Savings</h3>

        <p className="text-text-secondary leading-relaxed mb-4">The savings from salary sacrifice depend on your Income Tax band and National Insurance category. Here is how the math works for different taxpayers in 2026-27:</p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border/60">
                <th className="text-left text-xs font-semibold text-text uppercase tracking-wider py-2.5 pr-4">Taxpayer Type</th>
                <th className="text-left text-xs font-semibold text-text uppercase tracking-wider py-2.5 pr-4">Salary</th>
                <th className="text-left text-xs font-semibold text-text uppercase tracking-wider py-2.5 pr-4">Sacrifice (\u00A3100/mo)</th>
                <th className="text-left text-xs font-semibold text-text uppercase tracking-wider py-2.5 pr-4">Tax Saved</th>
                <th className="text-left text-xs font-semibold text-text uppercase tracking-wider py-2.5 pr-4">NI Saved</th>
                <th className="text-left text-xs font-semibold text-text uppercase tracking-wider py-2.5 pr-4">Total Saved</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60">
                <td className="text-text-secondary py-2.5 pr-4">Basic Rate</td>
                <td className="text-text-secondary py-2.5 pr-4">\u00A330,000</td>
                <td className="text-text-secondary py-2.5 pr-4">\u00A31,200</td>
                <td className="text-text-secondary py-2.5 pr-4">\u00A3240</td>
                <td className="text-text-secondary py-2.5 pr-4">\u00A396</td>
                <td className="text-text-secondary py-2.5 pr-4 font-semibold text-text">\u00A3336</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="text-text-secondary py-2.5 pr-4">Higher Rate</td>
                <td className="text-text-secondary py-2.5 pr-4">\u00A360,000</td>
                <td className="text-text-secondary py-2.5 pr-4">\u00A31,200</td>
                <td className="text-text-secondary py-2.5 pr-4">\u00A3480</td>
                <td className="text-text-secondary py-2.5 pr-4">\u00A396</td>
                <td className="text-text-secondary py-2.5 pr-4 font-semibold text-text">\u00A3576</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="text-text-secondary py-2.5 pr-4">Additional Rate</td>
                <td className="text-text-secondary py-2.5 pr-4">\u00A3150,000</td>
                <td className="text-text-secondary py-2.5 pr-4">\u00A31,200</td>
                <td className="text-text-secondary py-2.5 pr-4">\u00A3540</td>
                <td className="text-text-secondary py-2.5 pr-4">\u00A324</td>
                <td className="text-text-secondary py-2.5 pr-4 font-semibold text-text">\u00A3564</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary leading-relaxed mb-4"><strong>Worked example — Basic-rate taxpayer (\u00A330,000 salary, 5% sacrifice):</strong> Sacrificing \u00A31,500/year into your pension saves \u00A3300 in Income Tax (20% of \u00A31,500) and \u00A3120 in Employee NI (8% of \u00A31,500). Total saving: \u00A3420. Your pension receives the full \u00A31,500 plus your employer&apos;s NI saving if shared.</p>

        <p className="text-text-secondary leading-relaxed mb-4"><strong>Worked example — Higher-rate taxpayer (\u00A360,000 salary, 5% sacrifice):</strong> Sacrificing \u00A33,000/year saves \u00A31,200 in Income Tax (40% of \u00A33,000) and \u00A3240 in Employee NI (8% of first \u00A32,270, 2% of remaining \u00A3730). Total saving: \u00A31,440. Your effective cost is just \u00A31,560 for a \u00A33,000 pension contribution.</p>

        <p className="text-text-secondary leading-relaxed mb-4"><strong>Worked example — Additional-rate taxpayer (\u00A3150,000 salary, 5% sacrifice):</strong> Sacrificing \u00A37,500/year saves \u00A33,375 in Income Tax (45% of \u00A37,500) and \u00A3150 in Employee NI (2% above upper earnings limit). Total saving: \u00A33,525. Your effective cost is just \u00A33,975 for a \u00A37,500 pension contribution.</p>

        <h3 className="text-xl font-bold text-text mt-8 mb-3">Advantages and Disadvantages</h3>

        <p className="text-text-secondary leading-relaxed mb-4">Salary sacrifice offers significant tax savings, but it is important to understand the trade-offs before committing.</p>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border/60">
                <th className="text-left text-xs font-semibold text-text uppercase tracking-wider py-2.5 pr-4">Aspect</th>
                <th className="text-left text-xs font-semibold text-text uppercase tracking-wider py-2.5 pr-4">Advantage</th>
                <th className="text-left text-xs font-semibold text-text uppercase tracking-wider py-2.5 pr-4">Disadvantage</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60">
                <td className="text-text-secondary py-2.5 pr-4 font-semibold text-text">Tax</td>
                <td className="text-text-secondary py-2.5 pr-4">Save 20-45% Income Tax + 2-8% NI</td>
                <td className="text-text-secondary py-2.5 pr-4">Reduced taxable income may limit pension annual allowance</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="text-text-secondary py-2.5 pr-4 font-semibold text-text">Employer NI</td>
                <td className="text-text-secondary py-2.5 pr-4">Employer saves 13.8%, may share savings</td>
                <td className="text-text-secondary py-2.5 pr-4">Savings depend on employer policy</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="text-text-secondary py-2.5 pr-4 font-semibold text-text">Statutory Pay</td>
                <td className="text-text-secondary py-2.5 pr-4">Reduced salary may lower SSP, SMP, and redundancy pay</td>
                <td className="text-text-secondary py-2.5 pr-4">Check your contract and statutory rights</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="text-text-secondary py-2.5 pr-4 font-semibold text-text">Pension</td>
                <td className="text-text-secondary py-2.5 pr-4">Full sacrificed amount goes to pension</td>
                <td className="text-text-secondary py-2.5 pr-4">May exceed annual allowance (\u00A360,000)</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="text-text-secondary py-2.5 pr-4 font-semibold text-text">Flexibility</td>
                <td className="text-text-secondary py-2.5 pr-4">Choose amount and benefit type</td>
                <td className="text-text-secondary py-2.5 pr-4">Contractual change — cannot easily reverse</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="text-text-secondary py-2.5 pr-4 font-semibold text-text">Borrowing</td>
                <td className="text-text-secondary py-2.5 pr-4">Lower salary may reduce mortgage borrowing capacity</td>
                <td className="text-text-secondary py-2.5 pr-4">Lenders assess sacrificed salary differently</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold text-text mt-8 mb-3">Who Should Consider Salary Sacrifice?</h3>

        <p className="text-text-secondary leading-relaxed mb-4">Salary sacrifice is particularly beneficial for:</p>

        <ul className="space-y-1.5 list-disc list-inside mb-4">
          <li className="text-text-secondary"><strong className="text-text">Basic-rate taxpayers</strong> — Still save 28% combined (20% tax + 8% NI) on every pound sacrificed</li>
          <li className="text-text-secondary"><strong className="text-text">Higher-rate taxpayers</strong> — Save 48% combined (40% tax + 8% NI), making salary sacrifice extremely efficient</li>
          <li className="text-text-secondary"><strong className="text-text">Additional-rate taxpayers</strong> — Save 47% combined (45% tax + 2% NI), though the pension annual allowance taper may apply</li>
          <li className="text-text-secondary"><strong className="text-text">Employees with employer NI sharing</strong> — Some employers pass on all or part of their NI saving to employees</li>
          <li className="text-text-secondary"><strong className="text-text">Those approaching retirement</strong> — Maximising pension contributions through salary sacrifice before retirement</li>
          <li className="text-text-secondary"><strong className="text-text">Employees with EV schemes</strong> — Low BiK rates make EV salary sacrifice very cost-effective</li>
        </ul>

        <p className="text-text-secondary leading-relaxed mb-4">However, salary sacrifice may not be suitable if you are near the National Minimum Wage (you cannot sacrifice below NMW), need maximum borrowing capacity for a mortgage, value statutory payments at your full salary level, or are already at risk of exceeding the pension annual allowance or lifetime allowance.</p>

        <h3 className="text-xl font-bold text-text mt-8 mb-3">How Our Salary Sacrifice Calculator Works</h3>

        <p className="text-text-secondary leading-relaxed mb-4">Our <Link href="/salary-sacrifice-calculator" className="text-primary-600 dark:text-primary-400 hover:underline">Salary Sacrifice Calculator</Link> estimates your full tax and NI savings in seconds:</p>

        <ol className="space-y-1.5 list-inside mb-4">
          <li className="text-text-secondary"><strong className="text-text">Enter your annual gross salary</strong> — Your current pre-tax salary</li>
          <li className="text-text-secondary"><strong className="text-text">Choose your sacrifice amount</strong> — As a percentage of salary or fixed monthly amount</li>
          <li className="text-text-secondary"><strong className="text-text">Select the purpose</strong> — Pension, EV, bicycle, childcare, technology, or other</li>
          <li className="text-text-secondary"><strong className="text-text">Set employer parameters</strong> — Employer pension match and NI sharing percentage</li>
          <li className="text-text-secondary"><strong className="text-text">Add optional projections</strong> — Salary growth, investment return, and retirement age for long-term pension projections</li>
          <li className="text-text-secondary"><strong className="text-text">Click Calculate</strong> — View your new gross salary, take-home pay, tax saved, NI saved, employer savings, pension contribution, and projected retirement value</li>
        </ol>

        <p className="text-text-secondary leading-relaxed mb-4"><strong>Example result for \u00A350,000 salary with 5% pension sacrifice:</strong></p>
        <ul className="space-y-1.5 list-disc list-inside mb-4">
          <li className="text-text-secondary">Sacrifice amount: \u00A32,500/year</li>
          <li className="text-text-secondary">Income Tax saved: \u00A3500 (20% of \u00A32,500)</li>
          <li className="text-text-secondary">Employee NI saved: \u00A3200 (8% of \u00A32,500)</li>
          <li className="text-text-secondary">Employer NI saved: \u00A3345 (13.8% of \u00A32,500)</li>
          <li className="text-text-secondary">Total pension contribution: \u00A33,500 (your \u00A32,500 + employer match)</li>
          <li className="text-text-secondary">Effective cost to you: just \u00A31,800 (\u00A32,500 - \u00A3500 - \u00A3200)</li>
        </ul>

        <h3 className="text-xl font-bold text-text mt-8 mb-3">Frequently Asked Questions</h3>

        <div className="space-y-4 mb-6">
          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer py-3 px-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60 hover:bg-surface transition-colors">
              <HelpCircle className="w-4 h-4 text-primary-500 shrink-0" />
              What is salary sacrifice?
            </summary>
            <div className="pt-3 px-4 pb-4 text-sm text-text-secondary leading-relaxed">
              Salary sacrifice is a formal agreement where you give up part of your pre-tax salary in exchange for a non-cash benefit provided by your employer. The sacrificed amount is not subject to Income Tax or National Insurance, creating immediate tax savings. Common examples include pension contributions, electric vehicle schemes, and cycle-to-work programs.
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer py-3 px-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60 hover:bg-surface transition-colors">
              <HelpCircle className="w-4 h-4 text-primary-500 shrink-0" />
              Does salary sacrifice reduce tax?
            </summary>
            <div className="pt-3 px-4 pb-4 text-sm text-text-secondary leading-relaxed">
              Yes. By reducing your taxable salary, you pay less Income Tax and National Insurance. A basic-rate taxpayer saves 28p for every \u00A31 sacrificed (20p Income Tax + 8p NI). A higher-rate taxpayer saves 48p per \u00A31 (40p + 8p NI). The sacrificed amount goes directly to your chosen benefit tax-free.
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer py-3 px-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60 hover:bg-surface transition-colors">
              <HelpCircle className="w-4 h-4 text-primary-500 shrink-0" />
              Is salary sacrifice worth it?
            </summary>
            <div className="pt-3 px-4 pb-4 text-sm text-text-secondary leading-relaxed">
              For most employees, yes. The tax and NI savings are immediate and significant. However, consider the impact on your contractual rights (statutory maternity pay, redundancy pay, pension contributions) and borrowing capacity. If you are a basic-rate or higher-rate taxpayer with a workplace pension or EV scheme, salary sacrifice is almost certainly worthwhile.
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer py-3 px-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60 hover:bg-surface transition-colors">
              <HelpCircle className="w-4 h-4 text-primary-500 shrink-0" />
              How much National Insurance can I save?
            </summary>
            <div className="pt-3 px-4 pb-4 text-sm text-text-secondary leading-relaxed">
              Employee NI savings depend on your earnings. If you earn between \u00A312,570 and \u00A350,270, you save 8% on every pound sacrificed (the main NI rate). Above \u00A350,270, you save 2%. For a basic-rate taxpayer sacrificing \u00A33,000/year, you save \u00A3240 in NI. Your employer saves 13.8% regardless of your tax band.
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer py-3 px-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60 hover:bg-surface transition-colors">
              <HelpCircle className="w-4 h-4 text-primary-500 shrink-0" />
              Does salary sacrifice affect pensions?
            </summary>
            <div className="pt-3 px-4 pb-4 text-sm text-text-secondary leading-relaxed">
              Yes, positively. Salary sacrifice into a pension means the full sacrificed amount goes into your pension without being reduced by tax and NI. Your pension grows faster because more money is invested from the start. Your employer may also contribute their NI savings to your pension. However, your pension annual allowance (\u00A360,000 for most people) still applies, and the money is locked away until age 55 (57 from 2028).
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer py-3 px-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60 hover:bg-surface transition-colors">
              <HelpCircle className="w-4 h-4 text-primary-500 shrink-0" />
              Can I cancel a salary sacrifice agreement?
            </summary>
            <div className="pt-3 px-4 pb-4 text-sm text-text-secondary leading-relaxed">
              It depends on your employer&apos;s policy and the type of benefit. Pension salary sacrifice is usually flexible — you can change or stop contributions at any time. EV schemes typically have fixed 2-4 year contracts. Cycle-to-work agreements usually run for 12 months. Check your employer&apos;s salary sacrifice policy for specific terms.
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer py-3 px-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60 hover:bg-surface transition-colors">
              <HelpCircle className="w-4 h-4 text-primary-500 shrink-0" />
              Does salary sacrifice affect my mortgage application?
            </summary>
            <div className="pt-3 px-4 pb-4 text-sm text-text-secondary leading-relaxed">
              It can. Mortgage lenders assess your affordability based on your gross salary. Salary sacrifice reduces your reported gross salary, which may reduce the amount you can borrow. Some lenders add back pension contributions when calculating affordability, but not all. Speak to a mortgage advisor before entering a significant salary sacrifice arrangement if you plan to apply for a mortgage.
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer py-3 px-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60 hover:bg-surface transition-colors">
              <HelpCircle className="w-4 h-4 text-primary-500 shrink-0" />
              How does salary sacrifice affect statutory pay?
            </summary>
            <div className="pt-3 px-4 pb-4 text-sm text-text-secondary leading-relaxed">
              Statutory payments (Statutory Sick Pay, Statutory Maternity Pay, Statutory Paternity Pay, and redundancy pay) are based on your gross earnings. A lower gross salary from salary sacrifice may reduce these benefits. However, many employers calculate statutory pay based on your pre-sacrifice salary. Check your employment contract and employer policy.
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer py-3 px-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60 hover:bg-surface transition-colors">
              <HelpCircle className="w-4 h-4 text-primary-500 shrink-0" />
              Is salary sacrifice the same as pension tax relief?
            </summary>
            <div className="pt-3 px-4 pb-4 text-sm text-text-secondary leading-relaxed">
              No, they work differently. With salary sacrifice, you reduce your salary before tax and NI are calculated — you never pay tax on the sacrificed amount. With pension tax relief (Relief at Source or Net Pay), you contribute from your after-tax salary and the government adds tax relief. Salary sacrifice also saves NI, which pension tax relief does not.
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer py-3 px-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60 hover:bg-surface transition-colors">
              <HelpCircle className="w-4 h-4 text-primary-500 shrink-0" />
              What is the maximum I can sacrifice?
            </summary>
            <div className="pt-3 px-4 pb-4 text-sm text-text-secondary leading-relaxed">
              You cannot sacrifice below the National Minimum Wage (NMW) or National Living Wage. For 2026-27, the NLW is approximately \u00A312.21/hour for workers aged 23+. For a full-time employee (37.5 hours/week), that is roughly \u00A323,800/year. You also need to ensure pension contributions do not exceed the \u00A360,000 annual allowance (or lower if tapered). Your employer may set their own limits.
            </div>
          </details>

          <details className="group">
            <summary className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer py-3 px-4 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60 hover:bg-surface transition-colors">
              <HelpCircle className="w-4 h-4 text-primary-500 shrink-0" />
              How accurate is this calculator?
            </summary>
            <div className="pt-3 px-4 pb-4 text-sm text-text-secondary leading-relaxed">
              This calculator provides estimates based on 2026-27 UK tax rates, NI thresholds, and standard salary sacrifice rules. Actual savings depend on your specific circumstances, employer policies, pension scheme rules, and HMRC regulations. Use this as a planning tool and consult a qualified financial advisor or tax professional for personalised advice.
            </div>
          </details>
        </div>

        <h3 className="text-xl font-bold text-text mt-8 mb-3">Conclusion</h3>

        <p className="text-text-secondary leading-relaxed mb-4">Salary sacrifice is one of the most effective ways to reduce your tax bill while building valuable benefits. Whether you are contributing to your pension, leasing an electric vehicle, or joining a cycle-to-work scheme, the tax and NI savings are immediate and significant.</p>

        <p className="text-text-secondary leading-relaxed mb-4">The key is understanding your personal tax position, choosing the right benefit, and being aware of the trade-offs with statutory payments and borrowing capacity. For most employees, the savings far outweigh the drawbacks.</p>

        <p className="text-text-secondary leading-relaxed mb-4"><strong>Ready to see your potential savings?</strong> Use our <Link href="/salary-sacrifice-calculator" className="text-primary-600 dark:text-primary-400 hover:underline">free Salary Sacrifice Calculator</Link> to estimate your tax and NI savings instantly. Then explore our <Link href="/tax-calculator" className="text-primary-600 dark:text-primary-400 hover:underline">Income Tax Calculator</Link>, <Link href="/salary-calculator" className="text-primary-600 dark:text-primary-400 hover:underline">Take Home Pay Calculator</Link>, and Pension Calculator for a complete picture of your finances.</p>

        <div className="p-4 text-xs text-muted bg-surface-secondary rounded-xl border border-border/60 mt-8">
          <strong className="text-text">Disclaimer:</strong> This calculator provides estimates for illustrative purposes only. Actual tax and NI savings depend on your individual circumstances, employer policies, and current HMRC rules. Always consult a qualified tax advisor or financial professional before making decisions about salary sacrifice arrangements.
        </div>
      </article>
    </div>
  );
}
