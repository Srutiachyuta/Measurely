"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { calculators } from "@/data/calculators";
import { Search, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

const chips = [
  { name: "EMI Calculator", slug: "emi-calculator" },
  { name: "BMI Calculator", slug: "bmi-calculator" },
  { name: "SIP Calculator", slug: "sip-calculator" },
  { name: "FD Calculator", slug: "fd-calculator" },
  { name: "Tax Calculator", slug: "tax-calculator" },
  { name: "GST Calculator", slug: "gst-calculator" },
  { name: "Salary Calculator", slug: "salary-calculator" },
  { name: "Compound Interest", slug: "compound-interest-calculator" },
];

const trustItems = [
  "Free Forever",
  "No Signup Required",
  "Fast & Accurate",
  "Mobile Friendly",
];

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/[0.04] via-transparent to-transparent dark:from-primary-500/[0.08]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/[0.03] via-transparent to-accent-amber/[0.03] dark:from-accent-cyan/[0.06] dark:to-accent-amber/[0.06]" />
      <div className="absolute inset-0 grid-pattern opacity-[0.03] dark:opacity-[0.05]" />

      <div className="absolute top-1/4 -left-24 w-72 h-72 bg-primary-500/10 dark:bg-primary-500/15 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDuration: "8s" }} />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-accent-cyan/10 dark:bg-accent-cyan/15 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDuration: "10s", animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-purple-500/8 dark:bg-purple-500/12 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDuration: "12s", animationDelay: "2s" }} />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.08) 0%, rgba(6,182,212,0.04) 30%, transparent 60%)",
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-12 pb-20 sm:pb-28 lg:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 text-xs sm:text-sm font-medium mb-6 border border-primary-500/20"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{calculators.length}+ Free Calculators & AI Tools</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
          >
            The Smartest Place for{" "}
            <span className="text-gradient">Online Calculators</span>
            <br className="hidden sm:block" />
            <span className="text-text">& </span>
            <span className="text-gradient-cyan">AI Tools</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed mx-auto max-w-[700px]"
          >
            Access hundreds of powerful free calculators and AI-powered tools
            for finance, health, math, engineering, and everyday life. Instant
            results, no signup required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="mt-10 mx-auto max-w-xl"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
              <Input
                placeholder="Search calculators, tools or articles..."
                aria-label="Search calculators"
                className="pl-12 h-14 sm:h-16 text-base sm:text-lg rounded-2xl border-border bg-surface-secondary/80 shadow-sm hover:shadow-md focus:shadow-md transition-all cursor-pointer"
                readOnly
                onClick={() => router.push("/search")}
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
              <Button
                variant="gradient-cyan"
                size="xl"
                onClick={() => router.push("/search")}
                className="w-full sm:w-auto group shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30"
              >
                Search Tools
                <Search className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => router.push("/categories")}
                className="w-full sm:w-auto"
              >
                Browse Categories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="mt-8"
          >
            <span className="text-xs sm:text-sm text-muted mr-2">Popular:</span>
            <div className="inline-flex flex-wrap items-center justify-center gap-2 mt-2">
              {chips.map((chip) => (
                <button
                  key={chip.slug}
                  onClick={() => router.push(`/${chip.slug}`)}
                  className="px-3 py-1.5 text-xs sm:text-sm rounded-full border border-border bg-surface-secondary/60 hover:bg-surface-secondary hover:border-primary-500/30 text-text-secondary hover:text-text transition-all duration-200"
                >
                  {chip.name}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted"
          >
            {trustItems.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-accent-green" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
