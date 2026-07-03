"use client";

import { motion } from "framer-motion";
import {
  Calculator, FileText, Globe, Sigma, BookOpen, AlertTriangle, ShieldCheck,
  PieChart, Gavel, Heart,
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

const countryRules = [
  {
    name: "United States",
    flag: "US",
    color: "from-blue-600 to-red-500",
    rules: [
      "Federal estate tax exemption of $13.61 million per individual (2026)",
      "Flat 40% tax rate on the taxable estate above the exemption",
      "Portability allows surviving spouse to use unused exemption",
      "No federal inheritance tax — only beneficiaries pay state-level inheritance tax",
      "Six states impose inheritance tax: IA, KY, MD, NE, NJ, PA",
      "Marital deduction is unlimited for transfers to a surviving spouse",
    ],
  },
  {
    name: "United Kingdom",
    flag: "UK",
    color: "from-blue-700 to-red-600",
    rules: [
      "Nil-rate band of £325,000 — estates below this pay no inheritance tax",
      "Residence nil-rate band of £175,000 for passing the main home to direct descendants",
      "40% tax rate on the taxable estate above the combined thresholds",
      "Gifts made more than 7 years before death fall outside the estate",
      "Annual gift allowance of £3,000 per year",
      "Reduced 36% rate if 10% or more of the estate is left to charity",
    ],
  },
  {
    name: "Canada",
    flag: "CA",
    color: "from-red-600 to-white",
    rules: [
      "No formal inheritance or estate tax at the federal or provincial level",
      "Deemed disposition — assets are treated as sold at fair market value at death",
      "Capital gains tax applies on the deemed sale of assets",
      "Spousal rollover allows tax-free transfer of assets to a surviving spouse",
      "Principal residence exemption may eliminate capital gains on the family home",
      "Provincial probate fees apply based on the estate value",
    ],
  },
  {
    name: "Australia",
    flag: "AU",
    color: "from-green-600 to-yellow-400",
    rules: [
      "Inheritance tax abolished in 1979 — no tax on inherited assets",
      "No estate duty, death duty, or inheritance tax at any government level",
      "Capital gains tax does not apply at death — beneficiaries inherit cost basis",
      "Superannuation death benefits may have tax implications",
      "Probate fees vary by state and territory",
      "Stamp duty may apply on property transfers in some states",
    ],
  },
  {
    name: "New Zealand",
    flag: "NZ",
    color: "from-blue-800 to-white",
    rules: [
      "Inheritance tax and estate duty abolished in 1992",
      "No tax on assets inherited from a deceased person's estate",
      "No estate tax, inheritance tax, or death duty at any level",
      "Beneficiaries inherit assets with the deceased's original cost basis",
      "No gift duty since 2011 — unlimited gifting allowed",
      "Probate and administration fees still apply",
    ],
  },
];

const faqItems = [
  {
    question: "What is inheritance tax?",
    answer: "Inheritance tax is a tax paid by beneficiaries on assets they inherit from a deceased person's estate. Unlike estate tax, which is levied on the total estate before distribution, inheritance tax is calculated based on each beneficiary's share and their relationship to the deceased. In the US, inheritance tax is imposed at the state level — only six states currently charge it. Internationally, countries like the UK charge inheritance tax at 40% above a threshold, while others like Australia and New Zealand have abolished it entirely.",
  },
  {
    question: "Who has to pay inheritance tax?",
    answer: "Inheritance tax is paid by the beneficiary who receives assets from the estate, not by the estate itself. Liability depends on the jurisdiction, the value of inherited assets, and the beneficiary's relationship to the deceased. Spouses are universally exempt. Direct descendants (children and grandchildren) usually receive the most favorable rates. Siblings, extended family, and non-relatives typically face higher rates with lower exemptions. In the six US states with inheritance tax, rates range from 0% to 18% depending on the relationship classification.",
  },
  {
    question: "Is inheritance tax different from estate tax?",
    answer: "Yes, they are fundamentally different. Estate tax is levied on the total value of the deceased person's estate before assets are distributed, and the estate itself pays the tax. Inheritance tax is paid by each beneficiary on the assets they personally receive. The United States has a federal estate tax (with a $13.61 million exemption in 2026) but no federal inheritance tax. Some states impose one or both types. The UK's inheritance tax functions more like an estate tax despite its name, as it is paid by the estate.",
  },
  {
    question: "Which countries have no inheritance tax?",
    answer: "Many countries have abolished inheritance and estate taxes entirely. Notable examples include Australia (abolished 1979), New Zealand (abolished 1992), Canada (no formal inheritance tax, though capital gains may apply at death), Sweden, Russia, Norway, Israel, and Portugal. In the United States, most states do not impose inheritance tax — only Iowa, Kentucky, Maryland, Nebraska, New Jersey, and Pennsylvania currently do. Several US states also lack an estate tax, making them more favorable for wealth transfer.",
  },
  {
    question: "Can debts reduce inheritance tax?",
    answer: "Yes, outstanding debts are subtracted from the gross estate value before calculating inheritance or estate tax. Allowable debts include mortgages on real estate, personal loans, credit card balances, medical bills, and other legally enforceable obligations of the deceased. Funeral expenses and estate administration costs are also deductible. This means a heavily indebted estate may owe little or no tax. Our calculator automatically subtracts debts, funeral expenses, and other deductions from the total estate value.",
  },
  {
    question: "What deductions are allowed?",
    answer: "Common allowable deductions include funeral expenses, outstanding debts and mortgages, estate administration costs (executor fees, legal fees, accounting fees), charitable bequests, certain medical expenses paid before death, and casualty losses. The marital deduction allows unlimited transfers to a surviving spouse without tax. In the UK, the residence nil-rate band provides an additional £175,000 deduction when passing the main home to direct descendants. Always consult a tax professional to identify all applicable deductions for your specific situation.",
  },
  {
    question: "How much can I inherit without paying tax?",
    answer: "In the US, there is no federal inheritance tax, so the amount depends on which state you live in. For federal estate tax, estates under $13.61 million (2026) owe nothing. In the UK, the first £325,000 is tax-free, plus up to £175,000 additional if passing a home to direct descendants — effectively up to £500,000 for a single person. In Canada, Australia, and New Zealand, there is no inheritance tax, though Canada applies capital gains tax on deemed disposition. Use our calculator to estimate your specific situation.",
  },
  {
    question: "Can I avoid inheritance tax through gifting?",
    answer: "Yes, strategic lifetime gifting is one of the most effective ways to reduce inheritance tax. In the US, you can give up to $18,000 per year per recipient (2026) without using your lifetime exemption. In the UK, gifts made more than 7 years before death typically fall outside the estate entirely under the seven-year rule. Canada has no gift tax, and New Zealand abolished gift duty in 2011. However, be cautious — certain gifts with retained benefits (like giving away a home but continuing to live in it) may still be counted as part of the estate.",
  },
  {
    question: "Is this calculator accurate?",
    answer: "This calculator provides estimates based on common tax rules for each supported jurisdiction. It applies country-specific exemptions, rates, and deduction logic to give you a reasonable approximation of potential tax liability. However, actual tax calculations can be affected by state-specific laws, recent legislative changes, complex family situations, trust structures, and professional valuations. Use this calculator as a planning and educational tool. For definitive tax advice, consult a qualified tax professional or estate attorney familiar with your jurisdiction.",
  },
  {
    question: "Does this calculator store my data?",
    answer: "No. All calculations are performed entirely in your browser. We do not store, transmit, or process any of the financial data you enter on our servers. Your estate value, deductions, and personal information remain on your device and are never sent over the internet. You can verify this by using the calculator in offline mode or checking the network tab in your browser's developer tools. This privacy-first approach ensures your sensitive financial information stays completely private.",
  },
];

export function InheritanceTaxContent() {
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
                Our Inheritance Tax Calculator applies country-specific tax rules to estimate the potential tax liability on an estate. The calculation follows a systematic process that mirrors how tax authorities in each jurisdiction determine inheritance and estate taxes.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">1</div>
                  <div>
                    <p className="text-sm font-medium text-text">Assess Gross Estate Value</p>
                    <p className="text-xs text-muted mt-0.5">The calculator takes the total value of all assets including property, investments, cash, and personal belongings.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">2</div>
                  <div>
                    <p className="text-sm font-medium text-text">Subtract Allowable Deductions</p>
                    <p className="text-xs text-muted mt-0.5">Outstanding debts, funeral expenses, charitable donations, and other allowable deductions reduce the taxable estate value.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">3</div>
                  <div>
                    <p className="text-sm font-medium text-text">Apply Jurisdiction Exemptions</p>
                    <p className="text-xs text-muted mt-0.5">Each country has specific tax-free thresholds. The US exempts up to $13.61M, the UK applies a £325K nil-rate band plus residence allowance, Canada uses spousal rollover, and Australia/NZ have no inheritance tax.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">4</div>
                  <div>
                    <p className="text-sm font-medium text-text">Calculate Tax on Taxable Estate</p>
                    <p className="text-xs text-muted mt-0.5">The remaining taxable amount is multiplied by the applicable tax rate — 40% for US and UK, or 0% for countries without inheritance tax.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">5</div>
                  <div>
                    <p className="text-sm font-medium text-text">Distribute Net Inheritance</p>
                    <p className="text-xs text-muted mt-0.5">After taxes and deductions, the remaining estate is divided by the number of beneficiaries to show each person's estimated inheritance.</p>
                  </div>
                </div>
              </div>
              <p>
                The calculator automatically detects which country's rules to apply based on your selection. It adjusts exemptions, tax rates, and spousal deductions accordingly. Visual charts and detailed breakdowns help you understand exactly how the tax is calculated and where every dollar goes.
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
              <h2 className="text-base font-semibold text-text">What Is Inheritance Tax?</h2>
            </div>
            <div className="text-sm text-muted leading-relaxed space-y-4">
              <p>
                Inheritance tax is a tax paid by individuals who receive money or property from someone who has died. Unlike estate tax, which is deducted from the estate before beneficiaries receive their share, inheritance tax is calculated based on what each individual beneficiary inherits. This distinction is important because it means the same estate can result in different tax outcomes for different beneficiaries, depending on their relationship to the deceased and the jurisdiction's rules.
              </p>
              <p>
                In the United States, inheritance tax exists only at the state level. Six states currently impose it: Iowa, Kentucky, Maryland, Nebraska, New Jersey, and Pennsylvania. Each state has its own rate structure, exemption thresholds, and relationship-based classifications. Spouses are universally exempt, and direct descendants generally receive the most favorable treatment. The federal government does not impose an inheritance tax — it levies an estate tax, which is paid by the estate itself rather than by beneficiaries.
              </p>
              <p>
                Internationally, inheritance tax rules vary dramatically. The United Kingdom charges inheritance tax at 40% on estates valued above £325,000, with additional allowances for passing a home to children. Canada does not have a formal inheritance tax but applies capital gains tax through deemed disposition rules at death. Australia and New Zealand abolished inheritance tax decades ago — in 1979 and 1992 respectively — making them tax-free jurisdictions for inheritance purposes.
              </p>
              <p>
                Whether inheritance tax applies depends on three factors: the deceased person's country or state of residence, the total value of the estate, and the relationship between each beneficiary and the deceased. Some jurisdictions exempt all transfers to close family members, while others tax even direct descendants. Understanding these rules is essential for effective estate planning and ensuring your assets pass to your loved ones with minimal tax burden.
              </p>
              <p>
                Why do countries have different rules? Inheritance tax policy reflects each nation's approach to wealth redistribution, family protection, and revenue generation. Countries with high inheritance taxes often fund social programs and aim to reduce wealth inequality. Countries without inheritance taxes tend to prioritize capital accumulation, family wealth preservation, and attracting wealthy residents. The trend in recent decades has been toward reducing or eliminating inheritance taxes — several countries have abolished them since 2000, and the US federal estate tax exemption has risen dramatically.
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
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Country Rules</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {countryRules.map((country) => (
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
                    {country.rules.map((rule, i) => (
                      <li key={i} className="text-xs text-muted flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                        {rule}
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
          <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                <Sigma className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Formula Used</h2>
            </div>
            <div className="text-sm text-muted leading-relaxed space-y-4">
              <p>The inheritance tax calculation follows two primary formulas applied sequentially:</p>
              <div className="bg-dark-800/40 dark:bg-dark-900/50 border border-border/60 rounded-xl p-4 sm:p-5 font-mono text-sm space-y-2">
                <div className="text-text font-semibold">Step 1: Calculate Taxable Estate</div>
                <div className="text-text-secondary pl-4 border-l-2 border-primary-500/50 space-y-0.5">
                  <p>Taxable Estate = Estate Value</p>
                  <p className="text-muted">− Outstanding Debts</p>
                  <p className="text-muted">− Funeral Expenses</p>
                  <p className="text-muted">− Charitable Donations</p>
                  <p className="text-muted">− Other Allowable Deductions</p>
                  <p className="text-muted">− Applicable Exemptions</p>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="text-text font-semibold">Step 2: Calculate Inheritance Tax</div>
                <div className="text-text-secondary pl-4 border-l-2 border-primary-500/50 space-y-0.5">
                  <p>Inheritance Tax = Taxable Estate × Applicable Tax Rate</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <p className="text-xs font-semibold text-text mb-1">Net Inheritance</p>
                  <p className="text-xs text-muted font-mono">Net Estate − Total Tax</p>
                </div>
                <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <p className="text-xs font-semibold text-text mb-1">Per Beneficiary</p>
                  <p className="text-xs text-muted font-mono">Net Inheritance ÷ Number of Beneficiaries</p>
                </div>
                <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <p className="text-xs font-semibold text-text mb-1">Effective Tax Rate</p>
                  <p className="text-xs text-muted font-mono">(Total Tax ÷ Net Estate) × 100</p>
                </div>
                <div className="p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                  <p className="text-xs font-semibold text-text mb-1">Total Deductions</p>
                  <p className="text-xs text-muted font-mono">Debts + Funeral + Charity + Other</p>
                </div>
              </div>
              <p className="text-xs text-muted border-t border-border pt-3">
                Note: Tax rates and exemptions vary by jurisdiction. The US applies a 40% rate above $13.61M. The UK applies 40% above £325K (£500K with residence allowance). Canada, Australia, and New Zealand have no inheritance tax.
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
              <h2 className="text-base font-semibold text-text">Example Calculation</h2>
            </div>
            <div className="text-sm text-muted leading-relaxed space-y-4">
              <p>This worked example demonstrates how inheritance tax is calculated for a US estate using our calculator.</p>

              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200/50 dark:border-amber-500/20 rounded-xl p-4 space-y-2">
                <p className="font-semibold text-text flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-amber-500" />
                  Scenario: $15 Million US Estate with Spouse and 2 Children
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-text uppercase tracking-wider">Input Values</p>
                  <div className="space-y-1">
                    {[
                      { label: "Gross Estate Value", value: "$15,000,000" },
                      { label: "Outstanding Debts", value: "$100,000" },
                      { label: "Funeral Expenses", value: "$20,000" },
                      { label: "Charitable Donations", value: "$200,000" },
                      { label: "Other Deductions", value: "$30,000" },
                      { label: "Spouse Exemption", value: "Yes (unlimited)" },
                      { label: "Beneficiaries", value: "3 (spouse + 2 children)" },
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
                      { label: "Gross Estate", value: "$15,000,000", color: "text-text" },
                      { label: "Total Deductions", value: "$350,000", color: "text-muted" },
                      { label: "Net Estate", value: "$14,650,000", color: "text-text" },
                      { label: "Federal Exemption", value: "$13,610,000", color: "text-emerald-600 dark:text-emerald-400" },
                      { label: "Taxable Estate", value: "$1,040,000", color: "text-amber-500" },
                      { label: "Estimated Tax (40%)", value: "$416,000", color: "text-red-500" },
                      { label: "Net Inheritance", value: "$14,234,000", color: "text-emerald-600 dark:text-emerald-400" },
                      { label: "Per Beneficiary", value: "$4,744,667", color: "text-primary-600 dark:text-primary-400" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                        <span className="text-xs text-muted">{item.label}</span>
                        <span className={`text-xs font-semibold ${item.color}`}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-primary-500/5 to-accent-cyan/5 border border-primary-500/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-1">Key Takeaway</p>
                    <p className="text-xs text-muted">In this example, the $15 million estate only pays $416,000 in federal estate tax — an effective tax rate of just 2.8% — thanks to the high $13.61 million exemption. The beneficiaries receive over $14.2 million, with each child inheriting approximately $4.74 million.</p>
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
                <Gavel className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-text">Tips to Reduce Estate Taxes</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  title: "Make Annual Gifts",
                  description: "Give up to $18,000 per person per year without using your lifetime exemption. A married couple can gift $36,000 per recipient annually, removing significant wealth from their taxable estate over time.",
                  icon: "🎁",
                },
                {
                  title: "Establish Trusts",
                  description: "Use a bypass trust to maximize both spouses' federal exemptions. An irrevocable life insurance trust (ILIT) keeps life insurance proceeds outside your taxable estate. Charitable trusts reduce taxes while supporting causes you care about.",
                  icon: "🔒",
                },
                {
                  title: "Leverage the Marital Deduction",
                  description: "Assets transferred to a surviving spouse are completely tax-free. Proper portability planning ensures the surviving spouse can use both federal exemptions, potentially sheltering over $27 million from estate tax.",
                  icon: "💍",
                },
                {
                  title: "Make Charitable Bequests",
                  description: "Leaving assets to qualified charities reduces your taxable estate. Options include outright bequests in your will, charitable remainder trusts that provide lifetime income, or donor-advised funds for ongoing charitable giving.",
                  icon: "❤️",
                },
                {
                  title: "Plan Life Insurance Ownership",
                  description: "Life insurance proceeds paid to your estate are taxable. Structure ownership through an irrevocable trust to keep proceeds outside your estate while providing tax-free liquidity for any estate taxes due.",
                  icon: "🛡️",
                },
                {
                  title: "Consider Relocation",
                  description: "If you live in a state with inheritance or estate tax, moving to a tax-free state can save millions. Internationally, choosing a residence in a country without inheritance tax can eliminate the tax entirely for your heirs.",
                  icon: "📍",
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
              <strong className="text-text">Important:</strong> Estate planning strategies should be implemented well in advance. Some strategies, like gifting, have look-back periods (7 years in the UK). Consult a qualified estate planning attorney or tax professional to develop a comprehensive plan tailored to your situation.
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
                The Inheritance Tax Calculator is provided for informational and educational purposes only. It produces estimates based on common tax rules for the selected jurisdictions and should not be considered as professional tax advice, legal guidance, or a substitute for consultation with qualified professionals.
              </p>
              <p>
                Tax laws are complex, vary significantly by jurisdiction, and are subject to change. This calculator may not account for all applicable state or local taxes, special circumstances, trust structures, business ownership arrangements, or recent legislative changes that could affect your actual tax liability.
              </p>
              <p>
                We strongly recommend consulting with a licensed tax professional, estate planning attorney, or financial advisor who is familiar with the laws in your specific jurisdiction before making any estate planning decisions or filing tax returns. The accuracy of the calculator depends on the accuracy of the information you provide, and actual results may vary.
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
