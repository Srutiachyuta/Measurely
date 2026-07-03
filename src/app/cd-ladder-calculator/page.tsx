import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import {
  BreadcrumbJsonLd,
  WebPageJsonLd,
  WebApplicationJsonLd,
  FAQJsonLd,
  HowToJsonLd,
} from "@/components/seo/json-ld";
import { CdLadderCalculator } from "@/components/calculators/cd-ladder-calculator";

export const metadata: Metadata = {
  title: "CD Ladder Calculator | Free Certificate of Deposit Ladder Calculator (2026) | Measurely",
  description: "Free CD ladder calculator. Build an optimized certificate of deposit ladder strategy to maximize returns while maintaining liquidity. Compare 3-rung and 5-rung strategies.",
  openGraph: {
    title: "CD Ladder Calculator | Free CD Ladder Strategy Calculator (2026)",
    description: "Build a CD ladder strategy to maximize returns with staggered maturities. Compare 3-rung and 5-rung CD ladders with growth projections and maturity calendar.",
    url: `${SITE_CONFIG.url}/cd-ladder-calculator`,
    siteName: SITE_CONFIG.siteName,
    type: "website",
    images: [{ url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`, width: 1200, height: 630, alt: "CD Ladder Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CD Ladder Calculator | Free CD Ladder Strategy Calculator (2026)",
    description: "Optimize your CD ladder strategy with our free calculator. Compare 3-rung and 5-rung CD ladders, view maturity schedules, and project growth.",
    images: [`${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`],
  },
  alternates: { canonical: `${SITE_CONFIG.url}/cd-ladder-calculator` },
  keywords: ["cd ladder calculator", "certificate of deposit ladder calculator", "CD ladder strategy", "CD maturity calculator", "CD investment calculator", "ladder savings calculator", "CD interest calculator"],
};

const faqs = [
  { question: "What is a CD ladder?", answer: "A CD ladder is a savings strategy where you split your money across multiple Certificates of Deposit with staggered maturity dates (e.g., 3-month, 6-month, 12-month). This gives you regular access to some of your money while earning higher rates on longer-term CDs." },
  { question: "How many CDs should I include?", answer: "A 3-rung ladder (3, 6, 12 months) is ideal for beginners seeking liquidity. A 5-rung ladder (3, 6, 12, 24, 36 months) offers higher yield potential. Choose based on your liquidity needs and interest rate outlook." },
  { question: "Is a CD ladder better than a savings account?", answer: "CD ladders typically offer higher interest rates than savings accounts, especially for longer terms. However, savings accounts offer instant liquidity without penalties. A CD ladder is better when you have a lump sum and want to maximize returns while maintaining periodic access." },
  { question: "Can I withdraw money early?", answer: "Early withdrawal from a CD typically incurs a penalty (usually 3-12 months of interest). CD ladders mitigate this by ensuring some money matures regularly, reducing the need for early withdrawals." },
  { question: "What happens when a CD matures?", answer: "When a CD matures, you can withdraw the principal and interest, or reinvest it into a new CD. With reinvestment enabled, the calculator projects growth by reinvesting at the estimated future rate." },
  { question: "Are CD ladder returns guaranteed?", answer: "CD returns are guaranteed for the initial term at the stated interest rate (FDIC insured up to $250,000 per depositor per bank). Future reinvestment rates are not guaranteed and depend on market conditions." },
  { question: "How often should I reinvest?", answer: "Reinvest each CD as it matures to maintain your ladder structure. This ensures you continuously benefit from prevailing interest rates while keeping your ladder strategy intact." },
  { question: "Is this calculator accurate?", answer: "This calculator provides estimates based on the inputs you provide. Actual returns depend on the specific CD rates, compounding methods, and future rate changes. Use this as a planning tool." },
];

const howToSteps = [
  { name: "Enter Investment Amount", text: "Input the total amount you want to invest in your CD ladder, e.g., $10,000." },
  { name: "Choose Ladder Type", text: "Select a 3-rung or 5-rung CD ladder. Each rung has a different term and interest rate." },
  { name: "Customize Rates", text: "Adjust the interest rate and principal allocation for each CD rung to match current offers." },
  { name: "Set Options", text: "Choose compounding frequency, enable reinvestment, and optionally enter tax rate for after-tax calculations." },
  { name: "Calculate", text: "Press Calculate to see your total future value, maturity calendar, cash flow timeline, and growth projections." },
];

export default function CdLadderCalculatorPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: SITE_CONFIG.name, url: SITE_CONFIG.url },
          { name: "Finance Calculators", url: `${SITE_CONFIG.url}/finance` },
          { name: "CD Ladder Calculator", url: `${SITE_CONFIG.url}/cd-ladder-calculator` },
        ]}
      />
      <WebPageJsonLd
        title="CD Ladder Calculator | Free Certificate of Deposit Ladder Calculator (2026)"
        description="Build an optimized CD ladder strategy with staggered maturities. Compare 3-rung and 5-rung CD ladders with growth projections."
        url={`${SITE_CONFIG.url}/cd-ladder-calculator`}
      />
      <WebApplicationJsonLd
        name="CD Ladder Calculator"
        description="Build and optimize a certificate of deposit ladder strategy with staggered maturity dates, reinvestment projections, and tax-adjusted returns."
        url={`${SITE_CONFIG.url}/cd-ladder-calculator`}
        category="Calculator"
      />
      <FAQJsonLd questions={faqs} url={`${SITE_CONFIG.url}/cd-ladder-calculator`} />
      <HowToJsonLd
        name="How to Use the CD Ladder Calculator"
        description="Step-by-step guide for using the CD Ladder Calculator to build an optimized certificate of deposit ladder strategy."
        steps={howToSteps}
        url={`${SITE_CONFIG.url}/cd-ladder-calculator`}
      />
      <CdLadderCalculator />
    </>
  );
}
