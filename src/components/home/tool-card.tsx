"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getCategoryTheme, slugToCategorySlug } from "@/lib/card-theme";
import {
  Calculator,
  TrendingUp,
  Percent,
  ArrowLeftRight,
  Receipt,
  PiggyBank,
  Clock,
  DollarSign,
  Sigma,
  Heart as HeartIcon,
  GraduationCap,
  Cpu,
  Hammer,
  Sparkles,
  Landmark,
  Flame,
  Droplets,
  Baby,
  Activity,
  Scale,
  Ruler,
  Divide,
  Grid3x3,
  FileX,
  Ship,
  Hash,
  BarChart3,
  CalendarDays,
  Timer,
  Zap,
  CircuitBoard,
  Paintbrush,
  House,
  Tag,
  HandCoins,
  Car,
  Kanban,
  Gauge,
  Award,
  BookOpen,
  LayoutGrid,
  Home,
  Wallet,
  Weight,
  Thermometer,
  Repeat,
  Calendar,
  ShoppingBag,
  ArrowUpRight,
  Heart,
  Bot,
} from "lucide-react";
import { useState } from "react";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Percent, ArrowLeftRight, Receipt, PiggyBank,
  Clock, DollarSign, Heart: HeartIcon, Calculator, Sigma,
  GraduationCap, Cpu, Hammer, Sparkles, Landmark,
  Flame, Droplets, Baby, Activity, Scale, Ruler, Divide,
  Grid3x3, FileX, Ship, Hash, BarChart3, CalendarDays, Timer,
  Zap, CircuitBoard, Paintbrush, House, Tag, HandCoins, Car,
  Kanban, Gauge, Award, BookOpen, LayoutGrid, Home, Wallet,
  Weight, Thermometer, Repeat, Calendar, ShoppingBag, Bot,
};

const toolIcons: Record<string, React.ElementType> = {
  "emi-calculator": Calculator,
  "loan-calculator": Landmark,
  "interest-calculator": Percent,
  "mortgage-calculator": Home,
  "sip-calculator": TrendingUp,
  "fd-calculator": Wallet,
  "rd-calculator": PiggyBank,
  "gst-calculator": Receipt,
  "tax-calculator": DollarSign,
  "salary-calculator": DollarSign,
  "bmi-calculator": Weight,
  "bmr-calculator": Flame,
  "body-fat-calculator": Scale,
  "calorie-calculator": Activity,
  "water-intake-calculator": Droplets,
  "pregnancy-calculator": Baby,
  "heart-rate-calculator": HeartIcon,
  "ideal-weight-calculator": Award,
  "percentage-calculator": Percent,
  "fraction-calculator": Divide,
  "scientific-calculator": Calculator,
  "matrix-calculator": Grid3x3,
  "equation-solver": FileX,
  "gcf-lcm-calculator": Hash,
  "prime-number-calculator": Ship,
  "statistics-calculator": BarChart3,
  "age-calculator": CalendarDays,
  "date-calculator": Calendar,
  "days-between-dates": CalendarDays,
  "time-duration-calculator": Timer,
  "week-calculator": Calendar,
  "month-calculator": Calendar,
  "ohms-law-calculator": Zap,
  "voltage-divider-calculator": CircuitBoard,
  "power-calculator": Zap,
  "resistor-calculator": Cpu,
  "watt-calculator": Gauge,
  "concrete-calculator": Hammer,
  "paint-calculator": Paintbrush,
  "tile-calculator": LayoutGrid,
  "roofing-calculator": House,
  "flooring-calculator": Kanban,
  "discount-calculator": Tag,
  "tip-calculator": HandCoins,
  "split-bill-calculator": ShoppingBag,
  "fuel-cost-calculator": Car,
  "currency-converter": DollarSign,
  "length-converter": Ruler,
  "weight-converter": Scale,
  "area-converter": LayoutGrid,
  "volume-converter": Kanban,
  "speed-converter": Gauge,
  "pressure-converter": Gauge,
  "temperature-converter": Thermometer,
  "energy-converter": Zap,
  "time-converter": Clock,
  "data-storage-converter": Hash,
  "fuel-economy-converter": Car,
  "angle-converter": Ruler,
  "density-converter": Scale,
  "frequency-converter": Activity,
  "power-converter": Zap,
  "current-converter": Activity,
  "voltage-converter": Zap,
  "resistance-converter": CircuitBoard,
  "capacitance-converter": CircuitBoard,
  "inductance-converter": CircuitBoard,
  "force-converter": Activity,
  "magnetic-field-converter": Activity,
  "concentration-converter": Droplets,
  "typography-converter": Ruler,
  "shoe-size-converter": Ruler,
  "clothing-size-converter": LayoutGrid,
  "ring-size-converter": Award,
  "paycheck-calculator": DollarSign,
  "home-affordability-calculator": Home,
  "rent-vs-buy-calculator": ArrowLeftRight,
  "401k": TrendingUp,
  "ev-charging-cost-calculator": Zap,
  "youtube-money-calculator": BarChart3,
  "roi-calculator": TrendingUp,
  "freelance-rate-calculator": HandCoins,
  "tfsa-contribution-room-calculator-canada": PiggyBank,
  "rrsp-contribution-tax-savings-calculator": TrendingUp,
  "ontario-take-home-pay-calculator-after-tax": DollarSign,
  "canada-mortgage-stress-test-calculator": House,
  "canada-child-benefit-calculator-by-income": Baby,
  "ontario-severance-pay-calculator": HandCoins,
  "gst-hst-calculator-ontario": Receipt,
  "1099-tax-calculator-for-freelancers": Calculator,
  "overtime-pay-calculator-for-hourly-employees": Clock,
  "debt-to-income-ratio-calculator-for-mortgage-approval": Percent,
};

interface ToolCardProps {
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  icon: string;
  description: string;
  usageCount?: string;
  isNew?: boolean;
  isTrending?: boolean;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

export function ToolCard({
  name,
  slug,
  category,
  icon,
  description,
  usageCount,
  isNew,
  isTrending,
  variant = "default",
  className,
}: ToolCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const IconComponent = toolIcons[slug] || iconMap[icon] || Calculator;
  const href = `/${slug}`;
  const theme = getCategoryTheme(slugToCategorySlug(slug));
  const isCompact = variant === "compact";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.25, 0.25, 0, 1] }}
      className={cn("group block relative", className)}
    >
      <Link href={href} className="block h-full">
        <div
          className={cn(
            "relative h-full rounded-2xl border border-border/50 bg-white/70 dark:bg-dark-800/40 backdrop-blur-sm",
            "p-5 transition-all duration-400",
            "hover:shadow-xl hover:-translate-y-1.5 hover:bg-white/90 dark:hover:bg-dark-800/60",
            theme.borderGlow
          )}
        >
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />

          {/* Colored gradient accent top */}
          <div
            className={cn(
              "absolute top-0 left-4 right-4 h-0.5 rounded-full bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500",
              theme.iconGradient.replace("from-", "from-").replace("to-", "/0 via-").replace("to-", "/40 to-").replace("to-", "/0")
            )}
          />

          {(isNew || isTrending) && (
            <div className={cn(
              "absolute z-10",
              isCompact ? "top-3 right-3" : "top-3 sm:top-4 right-3 sm:right-4"
            )}>
              <Badge
                variant={isNew ? "success" : "warning"}
                size="sm"
                className="shadow-sm"
              >
                {isNew ? "New" : "Trending"}
              </Badge>
            </div>
          )}

          <div className={cn(
            "relative z-10",
            isCompact ? "flex items-center gap-4" : "flex items-start gap-4"
          )}>
            {/* Icon with gradient */}
            <div
              className={cn(
                "shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300",
                theme.iconGradient,
                isCompact ? "w-10 h-10" : "w-11 h-11 sm:w-12 sm:h-12"
              )}
            >
              <IconComponent className={cn(isCompact ? "h-4 w-4" : "h-5 w-5 sm:h-6 sm:w-6")} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className={cn(
                  "font-semibold text-text truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors",
                  isCompact ? "text-sm" : "text-base"
                )}>
                  {name}
                </h3>
              </div>
              {!isCompact && (
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                  {description}
                </p>
              )}

              <div className={cn(
                "flex items-center justify-between",
                isCompact ? "mt-0" : "mt-3.5"
              )}>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    size="sm"
                    className={cn(
                      "border font-medium",
                      theme.iconBg.replace("bg-", "bg-").replace("/10", "/15 dark:bg-").replace("/20", "/20"),
                      theme.textColor,
                      "border-current/20"
                    )}
                  >
                    {category}
                  </Badge>
                  {usageCount && (
                    <span className="text-xs text-text-secondary/60">{usageCount} uses</span>
                  )}
                </div>

                {/* Arrow on hover */}
                {!isCompact && (
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0 bg-primary-500/10 text-primary-500">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsFavorited(!isFavorited);
        }}
        className={cn(
          "absolute top-4 right-4 flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-200 z-20",
          "hover:bg-red-50 dark:hover:bg-red-950/30",
          isFavorited && "text-red-500"
        )}
        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={cn(
            "h-3.5 w-3.5 transition-all duration-200",
            isFavorited ? "fill-red-500 text-red-500 scale-110" : "text-text-secondary/40 hover:text-red-400"
          )}
        />
      </button>
    </motion.div>
  );
}


