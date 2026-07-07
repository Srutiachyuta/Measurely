import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import {
  BreadcrumbJsonLd,
  WebPageJsonLd,
  WebApplicationJsonLd,
  FAQJsonLd,
  HowToJsonLd,
} from "@/components/seo/json-ld";
import { RothConversionTaxCalculator } from "@/components/calculators/roth-conversion-tax-calculator";
import { RothConversionTaxContent } from "@/components/calculators/roth-conversion-tax-content";

export const metadata: Metadata = {
  title: "Roth Conversion Tax Calculator (2026) | Free Roth IRA Conversion Estimator | Measurely",
  description: "Free Roth conversion tax calculator. Estimate federal and state tax due on a Roth IRA conversion, lifetime tax savings, break-even period, and retirement withdrawal tax comparison.",
  openGraph: {
    title: "Roth Conversion Tax Calculator (2026) | Free Roth IRA Conversion Estimator",
    description: "Free Roth conversion tax calculator showing federal and state tax impact, lifetime savings, break-even year, and Traditional vs Roth IRA comparison.",
    url: `${SITE_CONFIG.url}/roth-conversion-tax-calculator`,
    siteName: SITE_CONFIG.siteName,
    type: "website",
    images: [{ url: `${SITE_CONFIG.url}/images/blog/placeholders/best-time-to-do-a-roth-ira-conversion.png`, width: 1600, height: 900, alt: "Roth Conversion Tax Calculator (2026)" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roth Conversion Tax Calculator (2026) | Free Roth IRA Conversion Estimator",
    description: "Free Roth conversion tax calculator showing federal and state tax impact, lifetime savings, and Traditional vs Roth IRA comparison.",
    images: [`${SITE_CONFIG.url}/images/blog/placeholders/best-time-to-do-a-roth-ira-conversion.png`],
  },
  alternates: { canonical: `${SITE_CONFIG.url}/roth-conversion-tax-calculator` },
  keywords: ["roth conversion tax calculator", "roth ira conversion calculator", "roth conversion estimator", "roth conversion tax estimator", "roth conversion strategy calculator", "retirement tax calculator", "traditional ira to roth calculator", "roth conversion planner"],
};

const faqs = [
  { question: "What is a Roth IRA conversion?", answer: "A Roth IRA conversion is the process of moving funds from a Traditional IRA (pre-tax) to a Roth IRA (after-tax). You pay income tax on the converted amount in the year of conversion, but future qualified withdrawals from the Roth IRA are tax-free." },
  { question: "How is conversion tax calculated?", answer: "The converted amount is added to your ordinary income for the year and taxed at your marginal tax rate using the progressive federal tax brackets plus any applicable state income tax. The total additional tax equals the conversion amount multiplied by your effective marginal rate." },
  { question: "Can I convert only part of my IRA?", answer: "Yes, partial conversions are allowed and often recommended. By converting smaller amounts over multiple years, you can stay within lower tax brackets and avoid pushing yourself into higher brackets. This strategy is called a partial or ladder conversion." },
  { question: "Is there an income limit for Roth conversions?", answer: "No. Unlike direct Roth IRA contributions (which have income limits), Roth conversions have no income restrictions. High earners cannot contribute directly to a Roth IRA but can use the backdoor Roth strategy via conversion." },
  { question: "Does a Roth conversion affect Medicare premiums?", answer: "Yes. The converted amount increases your modified adjusted gross income (MAGI), which can trigger higher Medicare Part B and Part D premiums through IRMAA (Income-Related Monthly Adjustment Amounts) in the conversion year." },
  { question: "Can I undo a Roth conversion?", answer: "Before the SECURE Act 2.0, you could recharacterize (undo) a Roth conversion. Under current tax law, recharacterization of conversions is no longer allowed. A conversion is permanent — you cannot reverse it." },
  { question: "Should I convert before retirement?", answer: "Often yes. Converting during lower-income years (between jobs, after retirement but before RMDs, or during market downturns) can significantly reduce the tax cost. The key is to fill up lower tax brackets each year." },
  { question: "Is state tax included in the calculation?", answer: "It depends on your state. Some states (TX, FL, NV, WA, SD, TN, WY, AK, NH) have no income tax and no tax on conversions. Others fully tax conversions at your state rate. A few states offer deductions or exemptions for retirement income." },
  { question: "How long until I break even on a conversion?", answer: "The break-even period depends on the tax paid today versus the taxes avoided in retirement. Typically, break-even occurs within 5-15 years. Younger investors with longer time horizons benefit more from conversions due to decades of tax-free growth." },
  { question: "Who benefits the most from Roth conversions?", answer: "Early-career professionals in low tax brackets, mid-career investors in lower-income years, anyone expecting higher future tax rates, those with large Traditional IRA balances facing large RMDs, and investors with 20+ year time horizons." },
  { question: "Can I convert every year?", answer: "Yes, you can convert as often as you like. Many financial advisors recommend partial conversions each year, converting just enough to fill up your current tax bracket without pushing into the next one." },
  { question: "How does inflation affect the calculation?", answer: "Inflation reduces the real value of future tax savings. Our calculator accounts for inflation when projecting future portfolio values and comparing after-tax wealth in today's dollars. Higher inflation slightly favors earlier conversions." },
  { question: "Does a Roth conversion increase my taxable income?", answer: "Yes. The converted amount is treated as ordinary income in the year of conversion. It increases your adjusted gross income (AGI), which can affect tax credits, deductions, and other income-based calculations." },
  { question: "Can I pay the conversion tax from the IRA?", answer: "Technically yes, but it is strongly discouraged. Funds withdrawn from the IRA to pay taxes are considered an early distribution subject to both income tax AND a 10% early withdrawal penalty if under 59½. Always pay conversion taxes from outside funds." },
  { question: "Is professional tax advice recommended?", answer: "Yes. Roth conversions involve complex trade-offs including current vs future tax rates, IRMAA surcharges, RMD planning, state tax considerations, and estate planning goals. A qualified CPA or financial advisor can model your specific situation." },
  { question: "What is the five-year rule for Roth conversions?", answer: "Each Roth conversion has its own five-year clock. You must wait five years from the conversion date before you can withdraw the converted funds penalty-free. The clock starts January 1 of the conversion year." },
  { question: "Do Roth conversions affect financial aid?", answer: "Yes. The converted amount counts as parent income on the FAFSA, which can significantly reduce financial aid eligibility. Families with college-bound children should plan conversions carefully." },
  { question: "How does a Roth conversion affect RMDs?", answer: "Roth IRAs are not subject to Required Minimum Distributions (RMDs) during the original owner's lifetime. Converting Traditional IRA funds to Roth reduces future RMD amounts, which can lower your taxable income in retirement and prevent bracket creep." },
  { question: "What happens to a Roth conversion if the market drops?", answer: "Converting during a market downturn can be advantageous because you pay tax on a lower asset value. If the market recovers inside the Roth IRA, all subsequent growth is tax-free — effectively locking in a lower tax cost." },
  { question: "Can I convert employer retirement plans to Roth?", answer: "Yes. Many employer plans (401k, 403b, 457b) allow in-plan Roth conversions or rollovers to a Roth IRA after separation from service. Some plans also allow in-plan Roth rollovers while still employed." },
];

const howToSteps = [
  { name: "Enter Personal Information", text: "Input your age, planned retirement age, filing status, and state of residence." },
  { name: "Add Income Details", text: "Enter your annual taxable income, other income sources, and optional Social Security benefits." },
  { name: "Set IRA Information", text: "Input your Traditional IRA balance, desired conversion amount, annual planned conversion, and expected investment return." },
  { name: "Configure Tax Settings", text: "Set your current federal tax bracket, state tax rate, inflation assumption, and expected future tax bracket." },
  { name: "Calculate", text: "Press the Calculate button to view your conversion tax, lifetime tax savings, break-even year, and Traditional vs Roth comparison." },
];

export default function RothConversionTaxCalculatorPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: SITE_CONFIG.name, url: SITE_CONFIG.url },
          { name: "Finance Calculators", url: `${SITE_CONFIG.url}/finance` },
          { name: "Roth Conversion Tax Calculator", url: `${SITE_CONFIG.url}/roth-conversion-tax-calculator` },
        ]}
      />
      <WebPageJsonLd
        title="Roth Conversion Tax Calculator (2026) | Free Roth IRA Conversion Estimator"
        description="Free Roth conversion tax calculator. Estimate federal and state tax due on a Roth IRA conversion, lifetime tax savings, break-even period, and retirement withdrawal tax comparison."
        url={`${SITE_CONFIG.url}/roth-conversion-tax-calculator`}
      />
      <WebApplicationJsonLd
        name="Roth Conversion Tax Calculator"
        description="Free Roth conversion tax calculator showing federal and state tax impact, lifetime savings, break-even year, and Traditional vs Roth IRA portfolio comparison."
        url={`${SITE_CONFIG.url}/roth-conversion-tax-calculator`}
        category="Calculator"
      />
      <FAQJsonLd questions={faqs} url={`${SITE_CONFIG.url}/roth-conversion-tax-calculator`} />
      <HowToJsonLd
        name="How to Use the Roth Conversion Tax Calculator"
        description="Step-by-step guide for using the Roth Conversion Tax Calculator to estimate your conversion tax and lifetime savings."
        steps={howToSteps}
        url={`${SITE_CONFIG.url}/roth-conversion-tax-calculator`}
      />
      <RothConversionTaxCalculator />
      <RothConversionTaxContent />
    </>
  );
}
