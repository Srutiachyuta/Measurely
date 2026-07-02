"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./section-header";
import { Badge } from "@/components/ui/badge";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { getCategoryTheme } from "@/lib/card-theme";
import {
  ArrowLeftRight,
  Ruler,
  Weight,
  Thermometer,
  Gauge,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const featuredConverters = [
  {
    name: "Length Converter",
    slug: "length-converter",
    description: "Convert between meters, feet, inches, kilometers, miles, and more with high precision.",
    examples: ["1 inch = 2.54 cm", "1 foot = 0.3048 m", "1 mile = 1.609 km"],
    icon: Ruler,
    categorySlug: "unit-converters",
  },
  {
    name: "Weight Converter",
    slug: "weight-converter",
    description: "Effortlessly convert between kilograms, pounds, ounces, tons, and other weight units.",
    examples: ["1 kg = 2.20462 lbs", "1 oz = 28.3495 g", "1 stone = 6.35 kg"],
    icon: Weight,
    categorySlug: "unit-converters",
  },
  {
    name: "Temperature Converter",
    slug: "temperature-converter",
    description: "Convert temperatures between Celsius, Fahrenheit, Kelvin, and Rankine instantly.",
    examples: ["0°C = 32°F", "100°C = 212°F", "0°C = 273.15 K"],
    icon: Thermometer,
    categorySlug: "unit-converters",
  },
  {
    name: "Speed Converter",
    slug: "speed-converter",
    description: "Convert between km/h, mph, knots, mach, and speed of light with ease.",
    examples: ["100 km/h = 62.14 mph", "1 knot = 1.852 km/h", "Mach 1 = 1,225 km/h"],
    icon: Gauge,
    categorySlug: "unit-converters",
  },
  {
    name: "Pressure Converter",
    slug: "pressure-converter",
    description: "Convert between pascals, bar, psi, atmospheres, and other pressure units.",
    examples: ["1 bar = 14.504 psi", "1 atm = 101.325 kPa", "1 psi = 6.895 kPa"],
    icon: Zap,
    categorySlug: "unit-converters",
  },
  {
    name: "Area Converter",
    slug: "area-converter",
    description: "Convert between square meters, acres, hectares, square feet, and more.",
    examples: ["1 acre = 4,047 m²", "1 ha = 10,000 m²", "1 ft² = 0.0929 m²"],
    icon: ArrowLeftRight,
    categorySlug: "unit-converters",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.25, 0, 1] as const },
  },
};

export function FeaturedConverters() {
  return (
    <section className="py-20 sm:py-28 bg-surface-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Featured Converters"
          description="Quick and accurate unit conversions at your fingertips"
          viewAllHref="/converters"
        />

        <ErrorBoundary fallback={
          <div className="text-center py-12">
            <p className="text-text-secondary">Browse our converters below.</p>
          </div>
        }>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {featuredConverters.map((conv) => {
              const theme = getCategoryTheme(conv.categorySlug);
              return (
                <motion.div key={conv.slug} variants={itemVariants}>
                  <Link href={`/${conv.slug}`} className="group block h-full">
                    <div
                      className={cn(
                        "relative h-full rounded-2xl border border-border/50",
                        "bg-white/70 dark:bg-dark-800/40 backdrop-blur-sm p-6",
                        "transition-all duration-400",
                        "hover:shadow-xl hover:-translate-y-1.5 hover:bg-white/90 dark:hover:bg-dark-800/60",
                        theme.borderGlow,
                        "overflow-hidden"
                      )}
                    >
                      {/* Glass overlay */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />

                      {/* Gradient corner decoration */}
                      <div
                        className={cn(
                          "absolute top-0 right-0 w-40 h-40 bg-gradient-to-br rounded-bl-[64px] opacity-[0.06] group-hover:opacity-[0.15] transition-opacity duration-500",
                          theme.iconGradient
                        )}
                      />

                      {/* Blur glow */}
                      <div
                        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-15 blur-3xl transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(circle, ${theme.color}, transparent)` }}
                      />

                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={cn(
                              "flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br text-white shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300",
                              theme.iconGradient
                            )}
                          >
                            <conv.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-text group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {conv.name}
                            </h3>
                            <Badge
                              variant="success"
                              size="sm"
                              className={cn(
                                "border font-medium",
                                theme.iconBg.replace("bg-", "bg-").replace("/10", "/15 dark:bg-").replace("/20", "/20"),
                                theme.textColor,
                                "border-current/20"
                              )}
                            >
                              Converter
                            </Badge>
                          </div>
                        </div>

                        <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-1">
                          {conv.description}
                        </p>

                        <div className="space-y-2 mb-4">
                          {conv.examples.map((example, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2.5 text-xs font-mono text-text-secondary bg-surface-secondary/50 dark:bg-dark-800/30 rounded-lg px-3 py-2 border border-border/40"
                            >
                              <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", theme.textColor.replace("text-", "bg-"))} />
                              {example}
                            </div>
                          ))}
                        </div>

                        <span className={cn(
                          "inline-flex items-center gap-2 self-start h-9 px-4 text-sm font-medium rounded-lg transition-all duration-200 group/btn",
                          "bg-gradient-to-r text-white shadow-sm hover:shadow-md",
                          theme.iconGradient
                        )}>
                          Convert Now
                          <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </ErrorBoundary>
      </div>
    </section>
  );
}
