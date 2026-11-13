import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import { SectionHeader } from "./section-header";
import { TrendingUp, Heart, Sigma, ArrowLeftRight, Clock, GraduationCap, Cpu, Hammer, Sparkles, Home, PiggyBank, Car, BarChart3, ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Heart, Sigma, ArrowLeftRight, Clock, GraduationCap,
  Cpu, Hammer, Sparkles, Home, PiggyBank, Car, BarChart3,
};

export function CategoryGrid({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section className="py-12 sm:py-16 bg-surface-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && <SectionHeader title="Browse by Category" description="Find the right tool for any task, organized by category" viewAllHref="/categories" />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {CATEGORIES.map(category => {
            const Icon = iconMap[category.icon] || Sparkles;
            return (
              <Link href={`/${category.slug}`} key={category.slug} className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 shadow-sm transition-colors duration-200 hover:border-primary-400 focus-visible:ring-2 focus-visible:ring-primary-400">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface-secondary text-primary-700 dark:text-primary-300"><Icon className="h-5 w-5" strokeWidth={1.7} /></div>
                  <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-text">{category.name}</h3>
                <p className="flex-1 text-sm leading-relaxed text-text-secondary">{category.description}</p>
                <span className="mt-5 text-xs font-medium text-primary-700 dark:text-primary-300">Explore calculators</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
