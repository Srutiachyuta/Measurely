import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd, WebApplicationJsonLd, FAQJsonLd } from "@/components/seo/json-ld";
import { AITokenCalculator } from "@/components/calculators/ai-token-calculator";

export const metadata: Metadata = {
  title: "AI Token Cost Calculator | Compare GPT, Claude, Gemini & More | Measurely",
  description: "Free AI token cost calculator. Compare pricing across 50+ AI models including GPT-5, GPT-4o, Claude Opus 4, Gemini 2.5 Pro, DeepSeek R1, Llama 4, and more. Estimate API costs with advanced comparison mode.",
  openGraph: {
    title: "AI Token Cost Calculator | Compare 50+ AI Model Prices",
    description: "Free AI token cost calculator with comparison mode. Estimate API costs for GPT-5, GPT-4o, Claude, Gemini, Llama, DeepSeek, and 40+ other models.",
    url: `${SITE_CONFIG.url}/ai-token-cost-calculator`,
    siteName: SITE_CONFIG.siteName,
    images: [{ url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`, width: 1200, height: 630, alt: "AI Token Cost Calculator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Token Cost Calculator | Compare 50+ AI Model Prices",
    description: "Free AI token cost calculator. Estimate API costs across 50+ models with comparison mode.",
    images: [`${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`],
  },
  alternates: { canonical: `${SITE_CONFIG.url}/ai-token-cost-calculator` },
  keywords: ["AI token cost calculator", "GPT pricing", "Claude API cost", "Gemini pricing", "LLM cost estimator", "AI API calculator", "model comparison", "token pricing", "OpenAI vs Anthropic cost", "DeepSeek pricing"],
};

const faqs = [
  { question: "What is an AI token?", answer: "A token is the basic unit of text that AI models process. One token equals approximately 0.75 words in English. Tokenization breaks text into words, subwords, punctuation, and spaces." },
  { question: "How much does GPT-5 cost?", answer: "GPT-5 costs $15 per million input tokens and $60 per million output tokens, with cached input at $7.50 per million tokens." },
  { question: "Which AI model is the cheapest?", answer: "Amazon Nova Micro is the cheapest at $0.035 per million input tokens and $0.14 per million output tokens. Other budget options include Gemini 2.5 Flash Lite ($0.075/$0.30) and GPT-4o Mini ($0.15/$0.60)." },
  { question: "How do I calculate AI API costs?", answer: "Use our AI Token Cost Calculator. Enter your model, input/output tokens per request, and daily request volume. The calculator shows cost per request, daily, monthly, and annual projections." },
  { question: "What affects AI token costs?", answer: "Key factors: model choice (premium vs budget), input/output token ratio, request volume, cached vs uncached tokens, context window size, and prompt optimization." },
  { question: "Can I compare multiple AI models?", answer: "Yes. Our comparison mode lets you see costs across multiple models side by side, highlighting the cheapest option and potential savings." },
  { question: "What is prompt caching?", answer: "Prompt caching allows you to reuse previously processed input tokens at a discounted rate (typically 50-90% off). Models like GPT-4o, Claude, and Gemini support caching." },
  { question: "How many tokens does a chatbot use?", answer: "A typical chatbot uses 500-1,500 input tokens (conversation history + system prompt) and 100-500 output tokens per request. Content generation uses 2,000-8,000+ tokens." },
];

const breadcrumbItems = [
  { name: SITE_CONFIG.name, url: SITE_CONFIG.url },
  { name: "AI Token Cost Calculator", url: `${SITE_CONFIG.url}/ai-token-cost-calculator` },
];

export default function AITokenCostCalculatorPage() {
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <WebPageJsonLd
        title="AI Token Cost Calculator | Compare 50+ AI Model Prices"
        description="Free AI token cost calculator with comparison mode. Estimate API costs for 50+ AI models."
        url={`${SITE_CONFIG.url}/ai-token-cost-calculator`}
      />
      <WebApplicationJsonLd
        name="AI Token Cost Calculator"
        description="Free AI token cost calculator with comparison mode supporting 50+ models."
        url={`${SITE_CONFIG.url}/ai-token-cost-calculator`}
        category="Calculator"
      />
      <FAQJsonLd questions={faqs} url={`${SITE_CONFIG.url}/ai-token-cost-calculator`} />
      <AITokenCalculator />
    </>
  );
}
