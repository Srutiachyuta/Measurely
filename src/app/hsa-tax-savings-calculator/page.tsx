import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import {
  BreadcrumbJsonLd,
  WebPageJsonLd,
  WebApplicationJsonLd,
  FAQJsonLd,
  HowToJsonLd,
} from "@/components/seo/json-ld";
import { HsaTaxSavingsCalculator } from "@/components/calculators/hsa-tax-savings-calculator";
import { HsaTaxSavingsContent } from "@/components/calculators/hsa-tax-savings-content";

export const metadata: Metadata = {
  title: "HSA Tax Savings Calculator (2026) | Free Triple Tax Advantage Estimator | Measurely",
  description: "Free HSA tax savings calculator. Estimate federal, state, and FICA tax savings, investment growth, and retirement HSA value. See the full triple tax advantage of Health Savings Accounts.",
  openGraph: {
    title: "HSA Tax Savings Calculator (2026) | Free Triple Tax Advantage Estimator",
    description: "Free HSA tax savings calculator showing federal, state, and FICA savings plus long-term investment growth projections.",
    url: `${SITE_CONFIG.url}/hsa-tax-savings-calculator`,
    siteName: SITE_CONFIG.siteName,
    type: "website",
    images: [{ url: `${SITE_CONFIG.url}/images/blog/placeholders/how-to-maximize-your-hsa-tax-benefits.png`, width: 1600, height: 900, alt: "HSA Tax Savings Calculator (2026)" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HSA Tax Savings Calculator (2026) | Free Triple Tax Advantage Estimator",
    description: "Free HSA tax savings calculator showing federal, state, and FICA savings plus long-term investment growth projections.",
    images: [`${SITE_CONFIG.url}/images/blog/placeholders/how-to-maximize-your-hsa-tax-benefits.png`],
  },
  alternates: { canonical: `${SITE_CONFIG.url}/hsa-tax-savings-calculator` },
  keywords: ["hsa tax savings calculator", "hsa calculator", "hsa investment calculator", "hsa contribution calculator", "health savings account calculator", "hsa retirement calculator", "hsa tax benefit calculator", "hsa growth calculator"],
};

const faqs = [
  { question: "What is an HSA?", answer: "A Health Savings Account (HSA) is a tax-advantaged savings account for individuals with qualifying High-Deductible Health Plans (HDHPs). It offers a triple tax advantage: tax-deductible contributions, tax-free growth, and tax-free withdrawals for qualified medical expenses." },
  { question: "How much tax can an HSA save?", answer: "At the 22% federal rate with 5% state tax and FICA eligibility, a $4,150 HSA contribution saves approximately $1,438 annually — $913 federal, $208 state, and $317 FICA. Over time with compound growth, the lifetime savings can exceed $50,000." },
  { question: "Is an HSA better than an FSA?", answer: "Yes, for most people. HSAs offer the triple tax advantage, funds roll over forever, the account is portable, and you can invest the balance. FSAs are use-it-or-lose-it and employer-owned. However, HSAs require an HDHP." },
  { question: "Can an HSA be used for retirement?", answer: "Yes. After 65, you can withdraw HSA funds for any purpose without penalty (non-medical withdrawals are taxed as income). Medical withdrawals remain tax-free. This makes HSAs excellent supplemental retirement accounts." },
  { question: "Should I invest my HSA?", answer: "If you can pay current medical expenses out of pocket, investing your HSA is highly recommended. Tax-free compound growth over decades can turn modest contributions into a significant retirement healthcare fund." },
  { question: "What is the HSA contribution limit for 2026?", answer: "For 2026, the HSA contribution limit is $4,150 for individual coverage and $8,300 for family coverage. Individuals aged 55+ can contribute an additional $1,000 catch-up. These limits include both employee and employer contributions." },
  { question: "What happens to my HSA if I change jobs?", answer: "Your HSA stays with you — it is not tied to your employer. You can keep the existing account, transfer it to a new provider, or leave it where it is." },
  { question: "What are qualified medical expenses for HSA?", answer: "Qualified expenses include doctor visits, prescriptions, dental care, vision care, mental health services, medical equipment, over-the-counter medications, and menstrual care products. Insurance premiums are generally not qualified except COBRA and long-term care insurance." },
  { question: "Can I use HSA funds for my family?", answer: "Yes. You can use HSA funds tax-free for qualified medical expenses of your spouse and tax dependents, even if they are not covered by your HDHP." },
  { question: "How accurate is this calculator?", answer: "This calculator provides estimates based on IRS rules and common investment assumptions. Actual results depend on your specific tax situation, investment performance, and healthcare costs. Use as a planning tool." },
];

const howToSteps = [
  { name: "Enter Personal Details", text: "Input your age, retirement age, filing status, and state for accurate tax calculations." },
  { name: "Set Tax Rates", text: "Enter your marginal federal and state tax rates, and indicate whether you are FICA eligible." },
  { name: "Add HSA Details", text: "Input your current HSA balance, annual contribution, employer contribution, and expected medical withdrawals." },
  { name: "Set Assumptions", text: "Enter expected investment return, inflation rate, and healthcare inflation for long-term projections." },
  { name: "Calculate", text: "Press Calculate to view annual tax savings, retirement HSA value, total growth, and lifetime tax benefit." },
];

export default function HsaTaxSavingsCalculatorPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: SITE_CONFIG.name, url: SITE_CONFIG.url },
          { name: "Finance Calculators", url: `${SITE_CONFIG.url}/finance` },
          { name: "HSA Tax Savings Calculator", url: `${SITE_CONFIG.url}/hsa-tax-savings-calculator` },
        ]}
      />
      <WebPageJsonLd
        title="HSA Tax Savings Calculator (2026) | Free Triple Tax Advantage Estimator"
        description="Free HSA tax savings calculator. Estimate federal, state, and FICA tax savings from Health Savings Account contributions with investment growth projections."
        url={`${SITE_CONFIG.url}/hsa-tax-savings-calculator`}
      />
      <WebApplicationJsonLd
        name="HSA Tax Savings Calculator"
        description="Free HSA triple tax advantage calculator showing federal, state, and FICA savings, investment growth, and retirement projections."
        url={`${SITE_CONFIG.url}/hsa-tax-savings-calculator`}
        category="Calculator"
      />
      <FAQJsonLd questions={faqs} url={`${SITE_CONFIG.url}/hsa-tax-savings-calculator`} />
      <HowToJsonLd
        name="How to Use the HSA Tax Savings Calculator"
        description="Step-by-step guide for using the HSA Tax Savings Calculator to estimate your triple tax advantage."
        steps={howToSteps}
        url={`${SITE_CONFIG.url}/hsa-tax-savings-calculator`}
      />
      <HsaTaxSavingsCalculator />
      <HsaTaxSavingsContent />
    </>
  );
}
