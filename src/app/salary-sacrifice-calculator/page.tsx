import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import {
  BreadcrumbJsonLd,
  WebPageJsonLd,
  WebApplicationJsonLd,
  FAQJsonLd,
  HowToJsonLd,
} from "@/components/seo/json-ld";
import { SalarySacrificeCalculator } from "@/components/calculators/salary-sacrifice-calculator";
import { SalarySacrificeContent } from "@/components/calculators/salary-sacrifice-content";

export const metadata: Metadata = {
  title: "Salary Sacrifice Calculator UK (2026) | Free Tax & NI Savings Estimator | Measurely",
  description: "Free salary sacrifice calculator for UK employees. Estimate income tax savings, National Insurance savings, employer NI savings, pension contributions, and take-home pay. Supports pension, EV, cycle to work, and more.",
  openGraph: {
    title: "Salary Sacrifice Calculator UK (2026) | Free Tax & NI Savings Estimator",
    description: "Free salary sacrifice calculator for UK employees. Estimate income tax and NI savings from pension, EV, cycle to work, and other salary sacrifice arrangements.",
    url: `${SITE_CONFIG.url}/salary-sacrifice-calculator`,
    siteName: SITE_CONFIG.siteName,
    type: "website",
    images: [{ url: `${SITE_CONFIG.url}/images/blog/placeholders/how-salary-sacrifice-reduces-your-tax-bill.png`, width: 1600, height: 900, alt: "Salary Sacrifice Calculator UK (2026)" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Salary Sacrifice Calculator UK (2026) | Free Tax & NI Savings Estimator",
    description: "Free salary sacrifice calculator for UK employees. Estimate tax and NI savings from salary sacrifice arrangements.",
    images: [`${SITE_CONFIG.url}/images/blog/placeholders/how-salary-sacrifice-reduces-your-tax-bill.png`],
  },
  alternates: { canonical: `${SITE_CONFIG.url}/salary-sacrifice-calculator` },
  keywords: ["salary sacrifice calculator", "uk salary sacrifice calculator", "pension salary sacrifice calculator", "salary sacrifice tax calculator", "EV salary sacrifice calculator", "salary sacrifice pension calculator", "national insurance savings calculator", "salary packaging calculator"],
};

const faqs = [
  { question: "What is salary sacrifice?", answer: "Salary sacrifice is a formal agreement where you give up part of your pre-tax salary in exchange for a non-cash benefit from your employer. The sacrificed amount is not subject to Income Tax or National Insurance. Common examples include pension contributions, electric vehicle schemes, and cycle-to-work programs." },
  { question: "Does salary sacrifice reduce tax?", answer: "Yes. By reducing your taxable salary, you pay less Income Tax and National Insurance. A basic-rate taxpayer saves 28p for every £1 sacrificed (20p Income Tax + 8p NI). A higher-rate taxpayer saves 48p per £1 (40p + 8p NI)." },
  { question: "Is salary sacrifice worth it?", answer: "For most employees, yes. The tax and NI savings are immediate and significant. However, consider the impact on statutory payments (SSP, SMP, redundancy) and mortgage borrowing capacity. If you are a basic-rate or higher-rate taxpayer, salary sacrifice is almost certainly worthwhile." },
  { question: "How much National Insurance can I save?", answer: "Employee NI savings depend on your earnings. Between £12,570 and £50,270, you save 8% on every pound sacrificed. Above £50,270, you save 2%. Your employer saves 13.8% regardless of your tax band." },
  { question: "Does salary sacrifice affect pensions?", answer: "Yes, positively. The full sacrificed amount goes into your pension without being reduced by tax and NI. Your pension grows faster because more is invested from the start. However, the £60,000 annual allowance still applies." },
  { question: "Can salary sacrifice be cancelled?", answer: "It depends on your employer's policy and the benefit type. Pension sacrifice is usually flexible. EV schemes typically have fixed 2-4 year contracts. Check your employer's specific policy." },
  { question: "Does salary sacrifice affect mortgage applications?", answer: "It can. Mortgage lenders assess affordability based on your gross salary. Salary sacrifice reduces your reported gross salary, which may reduce borrowing capacity. Check with a mortgage advisor." },
  { question: "How does salary sacrifice affect statutory pay?", answer: "Statutory payments (SSP, SMP, redundancy) are based on gross earnings. A lower salary may reduce these. Many employers calculate statutory pay based on pre-sacrifice salary — check your contract." },
  { question: "What is the maximum I can sacrifice?", answer: "You cannot sacrifice below the National Minimum Wage. For 2026-27, the NLW is approximately £12.21/hour. For a full-time employee, that is roughly £23,800/year. Pension contributions must also stay within the £60,000 annual allowance." },
  { question: "How accurate is this calculator?", answer: "This calculator provides estimates based on 2026-27 UK tax rates and NI thresholds. Actual savings depend on your circumstances, employer policies, and HMRC rules. Use as a planning tool and consult a qualified advisor." },
];

const howToSteps = [
  { name: "Enter Your Salary", text: "Input your annual gross salary in GBP." },
  { name: "Set Sacrifice Amount", text: "Choose a percentage of your salary or a fixed monthly amount to sacrifice." },
  { name: "Select Purpose", text: "Choose the benefit type — pension, electric vehicle, bicycle, childcare, technology, or other." },
  { name: "Add Employer Settings", text: "Enter your employer pension match percentage and any NI sharing arrangement." },
  { name: "Calculate", text: "Press the Calculate button to view your tax savings, NI savings, take-home pay, and pension projections." },
];

export default function SalarySacrificeCalculatorPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: SITE_CONFIG.name, url: SITE_CONFIG.url },
          { name: "Finance Calculators", url: `${SITE_CONFIG.url}/finance` },
          { name: "Salary Sacrifice Calculator", url: `${SITE_CONFIG.url}/salary-sacrifice-calculator` },
        ]}
      />
      <WebPageJsonLd
        title="Salary Sacrifice Calculator UK (2026) | Free Tax & NI Savings Estimator"
        description="Free salary sacrifice calculator for UK employees. Estimate income tax savings, National Insurance savings, employer NI savings, and take-home pay."
        url={`${SITE_CONFIG.url}/salary-sacrifice-calculator`}
      />
      <WebApplicationJsonLd
        name="Salary Sacrifice Calculator"
        description="Free UK salary sacrifice calculator supporting pension, EV, cycle to work, and other benefit schemes with detailed tax and NI breakdowns."
        url={`${SITE_CONFIG.url}/salary-sacrifice-calculator`}
        category="Calculator"
      />
      <FAQJsonLd questions={faqs} url={`${SITE_CONFIG.url}/salary-sacrifice-calculator`} />
      <HowToJsonLd
        name="How to Use the Salary Sacrifice Calculator"
        description="Step-by-step guide for using the Salary Sacrifice Calculator to estimate your UK tax and NI savings."
        steps={howToSteps}
        url={`${SITE_CONFIG.url}/salary-sacrifice-calculator`}
      />
      <SalarySacrificeCalculator />
      <SalarySacrificeContent />
    </>
  );
}
