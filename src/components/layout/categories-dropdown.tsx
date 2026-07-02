"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";
import {
  TrendingUp,
  Heart,
  Sigma,
  ArrowLeftRight,
  Clock,
  GraduationCap,
  Cpu,
  Hammer,
  Sparkles,
  Home,
  PiggyBank,
  Car,
  BarChart3,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Heart, Sigma, ArrowLeftRight, Clock, GraduationCap,
  Cpu, Hammer, Sparkles, Home, PiggyBank, Car, BarChart3,
};

const fallbackIcon = ArrowRight;

const MAX_TOOLS_PER_CATEGORY = 4;

export function CategoriesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  const isActive = pathname === "/categories";

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        close();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, close]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 1024) close();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [close]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={close}
    >
      <button
        className={cn(
          "relative px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 inline-flex items-center gap-1",
          isActive || isOpen
            ? "text-primary-600 dark:text-primary-400"
            : "text-[#111827] dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Categories menu"
      >
        Categories
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ width: "min(92vw, 1440px)" }}
            className="fixed left-1/2 -translate-x-1/2 top-[calc(4rem+0.5rem)] mt-0 bg-white dark:bg-dark-800 rounded-[20px] shadow-xl shadow-black/8 dark:shadow-black/30 border border-border/40 z-50 max-h-[80vh] overflow-y-auto overflow-x-hidden"
            role="menu"
            aria-label="Categories"
          >
            <div className="p-6 lg:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 lg:gap-6 items-start">
                {CATEGORIES.map((cat) => {
                  const Icon = iconMap[cat.icon] || fallbackIcon;
                  const totalTools = cat.tools.length;
                  const displayTools = cat.tools.slice(0, MAX_TOOLS_PER_CATEGORY);
                  return (
                    <div key={cat.slug} className="min-w-0 flex flex-col">
                      <Link
                        href={`/${cat.slug}`}
                        className="group flex items-center rounded-xl px-3 py-2 -mx-3 transition-all duration-200 hover:bg-primary-50/60 dark:hover:bg-primary-500/8"
                        onClick={close}
                        role="menuitem"
                      >
                        <span className="text-sm font-semibold text-text dark:text-dark-100 break-words leading-snug">{cat.name}</span>
                      </Link>
                      <div className="mt-2 space-y-0.5">
                        {displayTools.map((tool) => (
                          <Link
                            key={tool.slug}
                            href={`/${tool.slug}`}
                            className="block text-xs text-muted hover:text-text dark:hover:text-dark-100 hover:bg-primary-50/40 dark:hover:bg-primary-500/8 transition-all duration-150 py-1.5 px-2.5 rounded-lg -mx-2.5"
                            onClick={close}
                            role="menuitem"
                          >
                            <span className="break-words leading-relaxed">{tool.name}</span>
                          </Link>
                        ))}
                        {totalTools > MAX_TOOLS_PER_CATEGORY && (
                          <Link
                            href={`/${cat.slug}`}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors pt-1.5 px-2.5 -mx-2.5 group/link"
                            onClick={close}
                            role="menuitem"
                          >
                            View all {totalTools} tools
                            <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="px-8 lg:px-10 py-3.5 bg-surface-secondary/50 dark:bg-dark-900/30 border-t border-border/30">
              <Link
                href="/categories"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors group"
                onClick={close}
                role="menuitem"
              >
                Browse All Categories
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
