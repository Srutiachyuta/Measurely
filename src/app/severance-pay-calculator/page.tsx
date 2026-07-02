import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import {
  BreadcrumbJsonLd,
  WebPageJsonLd,
  WebApplicationJsonLd,
  FAQJsonLd,
  HowToJsonLd,
} from "@/components/seo/json-ld";
import { SeveranceCalculator } from "@/components/calculators/severance-calculator";

export const metadata: Metadata = {
  title: "Severance Pay Calculator | Estimate Your Layoff Compensation (2026) | Measurely",
  description: "Free severance pay calculator. Estimate your gross severance, net payment after taxes, PTO payout, and total exit compensation package. Plan your finances after a layoff with confidence.",
  openGraph: {
    title: "Severance Pay Calculator | Estimate Your Layoff Compensation (2026)",
    description: "Free severance pay calculator. Calculate gross severance, net payment, PTO payout, and total exit package. Plan your finances after a layoff.",
    url: `${SITE_CONFIG.url}/severance-pay-calculator`,
    siteName: SITE_CONFIG.siteName,
    type: "website",
    images: [{ url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`, width: 1200, height: 630, alt: "Severance Pay Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Severance Pay Calculator | Estimate Your Layoff Compensation (2026)",
    description: "Free severance pay calculator. Estimate gross severance, net payment, PTO payout, and total exit package.",
    images: [`${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`],
  },
  alternates: { canonical: `${SITE_CONFIG.url}/severance-pay-calculator` },
  keywords: ["severance pay calculator", "severance package calculator", "layoff compensation calculator", "severance calculator USA", "severance pay estimate", "employee severance calculator", "termination pay calculator", "severance payout calculator"],
};

const faqs = [
  { question: "What is severance pay?", answer: "Severance pay is compensation an employer provides to an employee upon termination of employment. It typically includes a lump sum payment based on years of service, salary, and may also include continued benefits, PTO payout, and other compensation." },
  { question: "How many weeks of severance should I expect?", answer: "A common formula is one week of pay per year of service. However, some employers offer two weeks per year, or more for executives. The actual amount depends on company policy, employment contracts, and negotiation." },
  { question: "Is severance legally required?", answer: "In the United States, severance pay is not legally required under federal law. However, some states have specific requirements, and severance may be mandated by employment contracts, company policies, or collective bargaining agreements." },
  { question: "Is severance taxable?", answer: "Yes, severance pay is considered taxable income by the IRS. Employers typically withhold federal income tax, Social Security, and Medicare taxes. State income tax may also apply depending on your state of residence." },
  { question: "Does unused PTO increase severance?", answer: "Yes, unused PTO is typically paid out separately from severance. Many states require employers to pay out accrued unused vacation time upon termination. This payout is in addition to any severance compensation." },
  { question: "Can I negotiate my severance package?", answer: "Yes, severance packages are often negotiable. You can negotiate for more weeks of pay, extended health benefits, accelerated stock vesting, outplacement services, and a favorable reference. Having an attorney review the agreement can be beneficial." },
  { question: "Will severance affect unemployment benefits?", answer: "Severance pay may affect unemployment benefits depending on state laws. Some states reduce unemployment benefits by the amount of severance received, while others allow you to receive both without reduction." },
  { question: "How accurate is this calculator?", answer: "This calculator provides estimates based on common severance formulas. Actual severance packages vary by employer policy, employment contracts, state laws, and individual circumstances. Use this as a planning tool and consult with an attorney for your specific situation." },
];

const howToSteps = [
  { name: "Enter Annual Salary", text: "Input your current annual salary before taxes (e.g., $75,000)." },
  { name: "Select Pay Frequency", text: "Choose how often you are paid (weekly, bi-weekly, semi-monthly, or monthly)." },
  { name: "Enter Years of Service", text: "Input the total number of years you have worked for your employer." },
  { name: "Set Weeks of Pay Per Year", text: "Enter the number of weeks of severance pay offered per year of service (commonly 1 or 2 weeks)." },
  { name: "Add Additional Compensation", text: "Include any bonuses, unused PTO hours, hourly rate, and other exit benefits." },
  { name: "Calculate", text: "Press the Calculate button to estimate your gross severance, net payment, taxes, and total exit package." },
];

export default function SeverancePayCalculatorPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: SITE_CONFIG.name, url: SITE_CONFIG.url },
          { name: "Finance Calculators", url: `${SITE_CONFIG.url}/finance` },
          { name: "Severance Pay Calculator", url: `${SITE_CONFIG.url}/severance-pay-calculator` },
        ]}
      />
      <WebPageJsonLd
        title="Severance Pay Calculator | Estimate Your Layoff Compensation (2026)"
        description="Free severance pay calculator. Estimate your gross severance, net payment after taxes, PTO payout, and total exit compensation package."
        url={`${SITE_CONFIG.url}/severance-pay-calculator`}
      />
      <WebApplicationJsonLd
        name="Severance Pay Calculator"
        description="Free severance pay calculator that estimates gross severance, net payment, taxes, PTO payout, and total exit compensation."
        url={`${SITE_CONFIG.url}/severance-pay-calculator`}
        category="Calculator"
      />
      <FAQJsonLd questions={faqs} url={`${SITE_CONFIG.url}/severance-pay-calculator`} />
      <HowToJsonLd
        name="How to Use the Severance Pay Calculator"
        description="Step-by-step guide for using the Severance Pay Calculator to estimate your layoff compensation."
        steps={howToSteps}
        url={`${SITE_CONFIG.url}/severance-pay-calculator`}
      />
      <SeveranceCalculator />
    </>
  );
}
