import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import {
  BreadcrumbJsonLd,
  WebPageJsonLd,
  WebApplicationJsonLd,
  FAQJsonLd,
  HowToJsonLd,
} from "@/components/seo/json-ld";
import { EmergencyFundCalculator } from "@/components/calculators/emergency-fund-calculator";
import { EmergencyFundContent } from "@/components/calculators/emergency-fund-content";

export const metadata: Metadata = {
  title: "Emergency Fund Calculator | Free Emergency Savings Calculator (2026) | Measurely",
  description: "Free emergency fund calculator. Determine how much you need in emergency savings based on monthly expenses, income stability, dependents, and debt. Personalized goal with milestone tracker.",
  openGraph: {
    title: "Emergency Fund Calculator | Free Emergency Savings Goal Calculator (2026)",
    description: "Find your ideal emergency fund size based on your expenses, employment type, and risk factors. Get a personalized savings plan with milestones and timeline.",
    url: `${SITE_CONFIG.url}/emergency-fund-calculator`,
    siteName: SITE_CONFIG.siteName,
    type: "website",
    images: [{ url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`, width: 1200, height: 630, alt: "Emergency Fund Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emergency Fund Calculator | Free Emergency Savings Calculator (2026)",
    description: "Find your ideal emergency fund size with a personalized savings plan. Free calculator with milestone tracking and savings timeline.",
    images: [`${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`],
  },
  alternates: { canonical: `${SITE_CONFIG.url}/emergency-fund-calculator` },
  keywords: ["emergency fund calculator", "emergency savings calculator", "emergency fund estimate", "how much emergency fund do I need", "emergency savings goal calculator", "financial emergency fund calculator", "rainy day fund calculator", "emergency fund planner"],
};

const faqs = [
  { question: "How much emergency fund do I really need?", answer: "Financial experts typically recommend 3 to 6 months of essential expenses for stable employment, 6 to 9 months for moderate risk, and 9 to 12 months for self-employed or high-risk situations. Our calculator personalizes this based on your specific circumstances including employment type, job stability, dependents, and debt obligations." },
  { question: "Is six months of expenses enough?", answer: "Six months of essential expenses is a standard recommendation for salaried employees with stable jobs. However, freelancers, self-employed individuals, and those with lower job stability may need 9 to 12 months of coverage. The right amount depends on your personal risk factors." },
  { question: "Where should I keep my emergency savings?", answer: "Emergency savings should be kept in a liquid, low-risk account like a high-yield savings account (HYSA), money market account, or cash management account. These offer easy access and FDIC insurance while earning competitive interest. Avoid investing emergency funds in volatile assets." },
  { question: "Should I invest my emergency fund?", answer: "No. Emergency funds should not be invested in volatile assets like stocks, crypto, or long-term bonds. The primary purpose is liquidity and capital preservation during emergencies. Keep your emergency fund in FDIC-insured savings accounts or money market accounts where the principal is safe." },
  { question: "What counts as an emergency?", answer: "An emergency is an unexpected, urgent expense such as job loss, medical emergency, urgent car repair, home appliance replacement, or unexpected travel. It should not include planned expenses like vacations, holiday gifts, or discretionary purchases." },
  { question: "Can I build an emergency fund while paying off debt?", answer: "Yes, but prioritize strategically. Build a small starter emergency fund of $1,000-$2,000 first, then focus on high-interest debt (credit cards, payday loans), and finally build a full emergency fund while making minimum payments on other debts." },
  { question: "How long does it take to build an emergency fund?", answer: "The timeline depends on your savings capacity and target amount. With consistent monthly savings, most people can build a 3-6 month emergency fund within 12-24 months. Our calculator provides a personalized timeline based on your savings rate." },
  { question: "How accurate is this calculator?", answer: "This calculator provides estimates based on financial best practices and your personal inputs. Actual emergency fund needs may vary based on your specific financial situation, local cost of living, and personal risk tolerance. Use this as a planning tool and consult a financial advisor for personalized advice." },
];

const howToSteps = [
  { name: "Enter Monthly Expenses", text: "Input your total monthly essential expenses including rent, food, utilities, insurance, and other necessities." },
  { name: "Select Employment Type", text: "Choose your employment situation and job stability level to determine income risk." },
  { name: "Enter Financial Details", text: "Add your existing emergency savings, debt payments, dependents, and insurance status for a personalized assessment." },
  { name: "Set Savings Capacity", text: "Enter how much you can save each month and optionally your expected annual return." },
  { name: "Calculate", text: "Press the Calculate button to see your target emergency fund, progress, risk score, and savings timeline." },
];

export default function EmergencyFundCalculatorPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: SITE_CONFIG.name, url: SITE_CONFIG.url },
          { name: "Finance Calculators", url: `${SITE_CONFIG.url}/finance` },
          { name: "Emergency Fund Calculator", url: `${SITE_CONFIG.url}/emergency-fund-calculator` },
        ]}
      />
      <WebPageJsonLd
        title="Emergency Fund Calculator | Free Emergency Savings Calculator (2026)"
        description="Free emergency fund calculator. Determine your ideal emergency savings goal based on expenses, income stability, and risk factors. Personalized milestone tracker."
        url={`${SITE_CONFIG.url}/emergency-fund-calculator`}
      />
      <WebApplicationJsonLd
        name="Emergency Fund Calculator"
        description="Free emergency fund calculator that determines your ideal emergency savings goal based on expenses, employment type, risk factors, and savings capacity."
        url={`${SITE_CONFIG.url}/emergency-fund-calculator`}
        category="Calculator"
      />
      <FAQJsonLd questions={faqs} url={`${SITE_CONFIG.url}/emergency-fund-calculator`} />
      <HowToJsonLd
        name="How to Use the Emergency Fund Calculator"
        description="Step-by-step guide for using the Emergency Fund Calculator to determine your ideal emergency savings goal."
        steps={howToSteps}
        url={`${SITE_CONFIG.url}/emergency-fund-calculator`}
      />
      <EmergencyFundCalculator />
      <EmergencyFundContent />
    </>
  );
}
