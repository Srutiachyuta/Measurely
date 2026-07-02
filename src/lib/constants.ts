import type { NavItem, FAQItem } from "@/types";
import { ALL_CATEGORIES } from "@/data/tool-registry";

export const SITE = {
  name: "Measurely",
  tagline: "Smart Tools for Smart Measurements",
  description:
    "Measurely is a comprehensive collection of free online calculators, unit converters, and measurement tools for finance, health, math, engineering, and everyday life.",
  url: "https://measurely.in",
  locale: "en_US",
  siteName: "Measurely",
  siteLogo: "/logo-light.webp",
  ogImage: "/og-image.png",
  twitterHandle: "@measurely",
  author: "Measurely Team",
  keywords: [
    "calculators",
    "unit converters",
    "math tools",
    "finance calculators",
    "health calculators",
    "BMI calculator",
    "EMI calculator",
    "measurement tools",
    "free online tools",
    "paycheck calculator",
    "home affordability calculator",
    "rent vs buy calculator",
    "401k retirement calculator",
    "EV charging cost calculator",
    "YouTube money calculator",
    "ROI calculator",
    "freelance rate calculator",
  ],
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", icon: "Home" },
  { label: "Calculators", href: "/calculators", icon: "Calculator" },
  { label: "Converters", href: "/converters", icon: "Repeat" },
  { label: "Blog", href: "/blog", icon: "FileText" },
  { label: "About", href: "/about", icon: "Info" },
  { label: "Contact", href: "/contact", icon: "Mail" },
];

export const CATEGORIES = ALL_CATEGORIES;

export const SOCIAL_LINKS = {
  youtube: "https://youtube.com/@measurely_yt",
  instagram: "https://instagram.com/mr.achyutananda",
  telegram: "https://t.me/Measurely_Help",
  whatsapp: "https://wa.me/message/2A6XEXOODKCFP1",
} as const;

export const CONTACT_INFO = {
  email: "hello@measurely.in",
  supportEmail: "hello@measurely.in",
  address: "Bhubaneswar, Odisha, India",
  phone: "+91 9692690256",
  founderName: "Achyutananda Meher",
} as const;

export const NEWSLETTER_FORM = {
  actionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdiglPuk9EgDbxVxDnNhN6iYgi9cnd20QkIXPqHdpf0kCPaXg/formResponse",
  fieldEmail: "entry.1331847009",
} as const;

// Google Forms configuration for contact form submissions
// To set up: Create a Google Form with fields: Full Name, Email, Subject, Message, Timestamp
// Then replace the URL and entry IDs below with values from your form.
// After implementing, replace the GOOGLE_FORM_ACTION_URL and entry IDs below.
export const GOOGLE_FORM = {
  actionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSchi388858M7VGKgH7XSpw3hCXlF-v3PuQPlawBESSbYs2Uvw/formResponse",
  fields: {
    name: "entry.1382431330",
    email: "entry.468745184",
    subject: "entry.130213847",
    message: "entry.844882503",
  },
} as const;

export const DEFAULT_SEO = {
  title: SITE.name,
  description: SITE.description,
  openGraph: {
    type: "website" as const,
    locale: SITE.locale,
    siteName: SITE.siteName,
    title: SITE.name,
    description: SITE.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: SITE.name,
    description: SITE.description,
    images: [SITE.ogImage],
    creator: SITE.twitterHandle,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE.url },
};

export const SITE_CONFIG = {
  ...SITE,
  tagline: "Smart Tools for Smart Measurements",
};

export const POPULAR_TOOLS = [
  { name: "EMI Calculator", slug: "emi-calculator", category: "Finance", categorySlug: "finance", icon: "TrendingUp", description: "Calculate your monthly EMI, total interest, and payment schedule for loans.", usageCount: "125K" },
  { name: "BMI Calculator", slug: "bmi-calculator", category: "Health", categorySlug: "health", icon: "Heart", description: "Calculate your Body Mass Index and understand your health metrics.", usageCount: "98K" },
  { name: "Percentage Calculator", slug: "percentage-calculator", category: "Math", categorySlug: "math", icon: "Percent", description: "Calculate percentages quickly with our easy-to-use percentage calculator.", usageCount: "87K" },
  { name: "Ontario Take Home Pay Calculator", slug: "ontario-take-home-pay-calculator-after-tax", category: "Finance", categorySlug: "finance", icon: "DollarSign", description: "Calculate your net take-home pay after CPP, EI, federal tax, and Ontario provincial tax deductions.", usageCount: "15K" },
  { name: "Canada Mortgage Stress Test Calculator", slug: "canada-mortgage-stress-test-calculator", category: "Real Estate", categorySlug: "real-estate", icon: "House", description: "Check if you qualify for a mortgage under Canada's stress test rules with GDS and TDS ratio calculations.", usageCount: "12K" },
  { name: "TFSA Contribution Room Calculator", slug: "tfsa-contribution-room-calculator-canada", category: "Finance", categorySlug: "finance", icon: "PiggyBank", description: "Calculate your available TFSA contribution room including annual limits, cumulative room, and remaining space.", usageCount: "10K" },
  { name: "RRSP Contribution Tax Savings Calculator", slug: "rrsp-contribution-tax-savings-calculator", category: "Finance", categorySlug: "finance", icon: "TrendingUp", description: "Calculate your tax savings from RRSP contributions based on your income, marginal tax rate, and contribution amount.", usageCount: "8K" },
  { name: "1099 Tax Calculator for Freelancers", slug: "1099-tax-calculator-for-freelancers", category: "Business", categorySlug: "business", icon: "Calculator", description: "Estimate your quarterly and annual self-employment tax, federal income tax, and balance due as a 1099 freelancer.", usageCount: "7K" },
];


export const FAQS: FAQItem[] = [
  {
    question: "What is Measurely?",
    answer: "Measurely is a comprehensive collection of free online calculators, unit converters, and measurement tools covering finance, health, math, engineering, and everyday life. Our mission is to make calculations simple, accurate, and accessible to everyone.",
  },
  {
    question: "Are the calculators free to use?",
    answer: "Yes, absolutely! All calculators and converters on Measurely are completely free to use. There are no hidden charges, subscription fees, or usage limits. We believe essential calculation tools should be accessible to everyone.",
  },
  {
    question: "How accurate are the calculations?",
    answer: "Our calculators use industry-standard formulas and are regularly audited for accuracy. We use high-precision arithmetic to ensure reliable results. However, for critical decisions, we recommend consulting with a qualified professional.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No account is needed to use our calculators. All tools are completely free and accessible instantly without registration.",
  },
  {
    question: "How often are new calculators added?",
    answer: "We add new calculators and converters regularly based on user requests and emerging needs. Check our 'Recently Added' section or follow us on social media to stay updated on the latest tools.",
  },
  {
    question: "Can I use Measurely on mobile devices?",
    answer: "Yes! Measurely is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktops. You can also install it as a Progressive Web App (PWA) for an app-like experience.",
  },
  {
    question: "How do I report an error or suggest a new calculator?",
    answer: "We welcome user feedback! You can reach us through our Contact page, email us at hello@measurely.in, or submit suggestions through our feedback form. We typically respond within 24-48 hours.",
  },
];
