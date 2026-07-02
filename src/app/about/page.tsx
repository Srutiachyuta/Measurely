import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import type { BreadcrumbItem } from "@/types";
import { AdSlot } from "@/components/AdSlot";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ABOUT_BOTTOM } from "@/config/adPlacements";
import { Heart, Target, Shield, Zap, Users, Globe, BookOpen, Star, Award, Lightbulb } from "lucide-react";
import { calculators } from "@/data/calculators";
import { converters } from "@/data/converters";
import { blogs } from "@/data/blogs";

export const metadata: Metadata = {
  title: `About Us | ${SITE_CONFIG.name}`,
    description: `Learn about ${SITE_CONFIG.name} — our mission to provide free, accurate online calculators for everyone. Discover our story, values, team, and commitment to quality.`,
  openGraph: {
    title: `About Us | ${SITE_CONFIG.name}`,
    description: `Learn about ${SITE_CONFIG.name} — our mission to provide free, accurate online calculators for everyone.`,
    url: `${SITE_CONFIG.url}/about`,
    siteName: SITE_CONFIG.siteName,
    images: [{ url: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`, width: 1200, height: 630, alt: `About ${SITE_CONFIG.name}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `About Us | ${SITE_CONFIG.name}`,
    description: `Learn about ${SITE_CONFIG.name} — our mission to provide free, accurate online calculators for everyone.`,
    images: [`${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`],
  },
  alternates: { canonical: `${SITE_CONFIG.url}/about` },
  keywords: [
    "about measurely", "online calculators", "free tools", "measurement tools",
    "achyutananda meher", "online calculator platform",
  ],
};

const values = [
  {
    icon: Heart,
    title: "Free for Everyone",
    description: "All our calculators are completely free. No hidden charges, no subscription fees, no limits.",
  },
  {
    icon: Target,
    title: "Accuracy First",
    description: "Every formula is verified and tested for precision. We use industry-standard algorithms for reliable results.",
  },
  {
    icon: Shield,
    title: "Privacy Protected",
    description: "We don't track your calculations. Your privacy is our priority — no accounts needed, no data stored.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant calculations with no page reloads. Get results as you type with our real-time interface.",
  },
  {
    icon: Users,
    title: "User Focused",
    description: "Built with feedback from thousands of users worldwide. We continuously improve based on your needs.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Serving users in over 100 countries. Support for multiple languages, currencies, and measurement systems.",
  },
];

const toolsCount = calculators.length;
const blogPostsCount = blogs.length;
const categorySet = new Set<string>();
calculators.forEach(c => categorySet.add(c.category));
const categoriesCount = categorySet.size;

const stats = [
  { label: "Calculators", value: `${calculators.length}+` },
  { label: "Blog Posts", value: `${blogPostsCount}+` },
  { label: "Categories", value: `${categoriesCount}` },
];

const founder = {
  name: "Achyutananda Meher",
  role: "Founder & Developer",
  bio: "Passionate about building accessible tools that simplify everyday calculations. With a vision to make accurate measurements available to everyone, founded Measurely to create a comprehensive collection of free calculators.",
  avatar: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjGkUmyFriaxMmxWv-RInt4b9BtLB97ZdTM56rH8WaW4IuH11nxRgCSkUyNBRGPWilRQpM3p0XpfqjcUy-2RfTOmd9GUDkB4qETwDEnvpf96XQaBwId9htY4UppcXsTaInUMSlOj3qYFP3KnnsmK5g-JJB6hlQBb3SiQJsqP4Oi7lAbvRBLYYM0UnZmjCQ/s1024/pic_3.png",
  initials: "AM",
};

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "About Us" },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: SITE_CONFIG.name, url: SITE_CONFIG.url },
          { name: "About Us", url: `${SITE_CONFIG.url}/about` },
        ]}
      />
      <WebPageJsonLd
        title={`About Us | ${SITE_CONFIG.name}`}
        description={`Learn about ${SITE_CONFIG.name} — our mission to provide free, accurate online calculators for everyone.`}
        url={`${SITE_CONFIG.url}/about`}
      />
      <div className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} className="mb-8" />
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6 border border-primary-500/20">
              <Heart className="h-4 w-4" />
              <span>Our Story</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              About <span className="text-gradient">{SITE_CONFIG.name}</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
              We believe everyone deserves access to accurate, free calculation tools.
              Our mission is to simplify complex calculations and make measurement conversions
              accessible to all — from students and professionals to DIY enthusiasts and everyday users.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-2xl border border-border/60 bg-surface-secondary/50 dark:bg-dark-800/30">
                <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mission */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-text mb-4">Our Mission</h2>
            <p className="text-text-secondary leading-relaxed">
              {SITE_CONFIG.name} is an all-in-one platform that provides calculators and smart tools
              designed to simplify everyday calculations. Our mission is to make accurate and easy-to-use tools
              accessible for everyone, everywhere.
            </p>
            <p className="text-text-secondary leading-relaxed mt-4">
              We started with a simple idea: calculations should be effortless. Whether you are calculating
              your monthly EMI, converting units for a school project, tracking your health metrics, or planning
              a home renovation, {SITE_CONFIG.name} provides the tools you need — all in one place, all for free.
            </p>
          </div>

          {/* Vision */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-text mb-4">Our Vision</h2>
            <p className="text-text-secondary leading-relaxed">
              To build the most trusted online calculator platform. We believe everyone deserves
              access to accurate, free calculation tools. Our vision is to simplify complex calculations and
              make measurement conversions accessible to all.
            </p>
            <p className="text-text-secondary leading-relaxed mt-4">
              We envision a world where anyone, anywhere, can perform complex calculations instantly and confidently,
              without needing specialized software or professional expertise. By combining intuitive design with
              rigorous mathematical accuracy, we aim to be the go-to resource for online calculations.
            </p>
          </div>

          {/* Our Purpose */}
          <div className="mb-16 p-8 sm:p-10 rounded-3xl border border-primary-500/20 bg-gradient-to-br from-primary-500/5 to-accent-cyan/5 dark:from-primary-500/10 dark:to-accent-cyan/10">
            <h2 className="text-2xl font-bold text-text mb-4">Why We Built {SITE_CONFIG.name}</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              The internet is full of online calculators, but most suffer from one or more problems:
              they are cluttered with intrusive ads, require registration, provide inaccurate results, or are
              limited to a narrow set of functions. We built {SITE_CONFIG.name} to solve these problems.
            </p>
            <p className="text-text-secondary leading-relaxed mb-4">
              Our goal is to create a comprehensive, trustworthy, and user-friendly platform where you can find
              any calculator you need, without distractions or barriers. Every tool on {SITE_CONFIG.name}
              is designed with three principles in mind:
            </p>
            <ul className="space-y-3">
              {[
                { icon: Star, text: "Accuracy — Industry-standard formulas, rigorously tested against known cases." },
                { icon: Lightbulb, text: "Simplicity — Clean, intuitive interfaces that get you results in seconds." },
                { icon: Award, text: "Accessibility — Completely free, no accounts, works on every device." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.text} className="flex items-start gap-3 text-text-secondary">
                    <Icon className="h-5 w-5 text-primary-500 shrink-0 mt-0.5" />
                    <span>{item.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Founder */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-text mb-8 text-center">Founded By</h2>
            <div className="max-w-lg mx-auto p-8 rounded-3xl border border-border/60 bg-surface text-center">
              <div className="w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] rounded-full bg-gradient-to-br from-primary-400 to-primary-600 p-[3px] shadow-lg shadow-primary-500/20 mx-auto mb-4">
                <Avatar className="w-full h-full rounded-full overflow-hidden border-0">
                  <AvatarImage src={founder.avatar} alt={founder.name} className="object-cover" loading="lazy" />
                  <AvatarFallback className="bg-gradient-to-br from-primary-400 to-primary-600 text-white text-2xl font-bold">
                    {founder.initials}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h3 className="text-xl font-bold text-text mb-1">{founder.name}</h3>
              <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-4">{founder.role}</p>
              <p className="text-text-secondary leading-relaxed">{founder.bio}</p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-text mb-8 text-center">Our Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.title} className="p-6 rounded-2xl border border-border/60 bg-surface hover:shadow-elevation-md hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-500/10 text-primary-500 mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-text mb-2">{value.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* What Sets Us Apart */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-text mb-8 text-center">What Sets Us Apart</h2>
            <div className="space-y-4">
              {[
                {
                  icon: BookOpen,
                  title: "Comprehensive Collection",
                  description: "With over 100 calculators spanning finance, health, math, engineering, construction, and everyday life, we have one of the most extensive collections of free online tools available anywhere.",
                },
                {
                  icon: Target,
                  title: "Verified Accuracy",
                  description: "Every formula is cross-checked against authoritative sources — from WHO health guidelines to NIST measurement standards. Our tools undergo regular audits to ensure consistent precision.",
                },
                {
                  icon: Shield,
                  title: "Privacy by Design",
                  description: "We built our platform without user accounts. Your calculations stay on your device. We never track, store, or share your individual calculation inputs.",
                },
                {
                  icon: Users,
                  title: "Community Driven",
                  description: "Our development roadmap is shaped by real user feedback. If you need a tool that doesn't exist yet, tell us — we will consider adding it to our platform.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-4 p-6 rounded-2xl border border-border/60 bg-surface">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-500/10 text-primary-500 shrink-0 mt-1">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text mb-1">{item.title}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Why Measurely */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-text mb-8 text-center">Why {SITE_CONFIG.name}?</h2>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { title: "Always Free", description: "Every tool on this platform costs nothing. No subscriptions, no paywalls, no hidden charges — forever." },
                { title: "100+ Tools in One Place", description: "From finance to fitness, engineering to construction, all your calculation needs covered under a single roof." },
                { title: "Built for Real People", description: "Clean, distraction-free interfaces designed for quick results. No clutter, no confusion." },
                { title: "Regularly Updated", description: "We add new tools and refine existing ones based on real user feedback and emerging needs." },
              ].map((item) => (
                <div key={item.title} className="p-6 rounded-2xl border border-border/60 bg-surface">
                  <h3 className="font-semibold text-text mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sources and References */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-text mb-4">Sources and References</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              All calculators on {SITE_CONFIG.name} use well-established mathematical formulas and
              industry-standard conversion factors. Key sources include:
            </p>
            <ul className="space-y-2">
              {[
                { label: "Financial Formulas", detail: "Standard time-value-of-money equations (EMI, loan amortization, compound interest, SIP/SWP)" },
                { label: "Health Metrics", detail: "WHO-recommended BMI categories, Mifflin-St Jeor BMR equation, US Navy body-fat method" },
                { label: "Engineering Constants", detail: "Ohm's Law, voltage divider rule, resistor color codes per IEC 60062" },
                { label: "Unit Conversions", detail: "SI base-unit reference system; conversion factors from NIST and BIPM standards" },
                { label: "Tax Calculations", detail: "Indian income-tax slab rates (new and old regimes), GST provisions" },
              ].map((source) => (
                <li key={source.label} className="text-text-secondary leading-relaxed">
                  <span className="font-medium text-text">{source.label}:</span> {source.detail}
                </li>
              ))}
            </ul>
            <p className="text-text-secondary leading-relaxed mt-4 text-sm">
              Formulas are implemented using high-precision arithmetic and validated against known test cases.
              For critical decisions, consult a qualified professional.
            </p>
            <p className="text-text-secondary leading-relaxed mt-3 text-sm">
              We continuously review and update our formulas to align with the latest standards and regulatory changes.
              If you notice any discrepancy or have a suggestion for improvement, please{' '}
              <Link href="/contact" className="text-primary-500 hover:text-primary-400 transition-colors">contact us</Link>.
            </p>
          </div>

          {/* Last updated */}
          <p className="text-center text-xs text-text-secondary/60 mb-6">
            Last updated: June 22, 2026
          </p>

          {/* CTA */}
          <div className="text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-primary-500/5 to-accent-cyan/5 dark:from-primary-500/10 dark:to-accent-cyan/10 border border-primary-500/10">
            <h2 className="text-2xl sm:text-3xl font-bold text-text mb-3">Ready to Get Started?</h2>
            <p className="text-text-secondary mb-6 max-w-lg mx-auto">
              Explore our collection of 100+ free calculators.
            </p>
            <Link
              href="/calculators"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30"
            >
              Explore Calculators
            </Link>
          </div>

          <AdSlot placement={ABOUT_BOTTOM} />
        </div>
      </div>
    </>
  );
}
