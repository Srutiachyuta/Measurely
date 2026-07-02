"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  House,
  Calculator,

  Grid3X3,
  FileText,
  Info,
  Mail,
  Sun,
  Moon,
  Menu,
  Search,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE, NAV_ITEMS, CATEGORIES } from "@/lib/constants";
import { useSearchStore } from "@/hooks/use-search-store";
import { CategoriesDropdown } from "./categories-dropdown";

const mobileIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home: House,
  Calculator,

  Grid3X3,
  FileText,
  Info,
  Mail,
};

function ThemeToggle({ mobile }: { mobile?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  if (!mounted) {
    if (mobile) {
      return (
        <button
          className="w-full flex items-center justify-center gap-2.5 h-12 rounded-2xl bg-surface border border-border text-text text-sm font-semibold shadow-sm"
          aria-label="Toggle theme"
        />
      );
    }
    return (
      <button
        className="relative h-9 w-9 items-center justify-center rounded-xl hidden lg:flex"
        aria-label="Toggle theme"
      />
    );
  }

  if (mobile) {
    return (
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-full flex items-center justify-center gap-2.5 h-12 rounded-2xl bg-surface border border-border text-text text-sm font-semibold hover:bg-surface-secondary transition-all duration-200 shadow-sm"
      >
        {theme === "dark" ? (
          <><Sun className="h-4.5 w-4.5 text-accent-amber" /> Light Mode</>
        ) : (
          <><Moon className="h-4.5 w-4.5 text-primary-500" /> Dark Mode</>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-9 w-9 items-center justify-center rounded-xl text-muted hover:text-text hover:bg-surface-secondary transition-all hidden lg:flex"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <Sun className="h-4.5 w-4.5 absolute transition-all duration-200 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Moon className="h-4.5 w-4.5 absolute transition-all duration-200 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const pathname = usePathname();
  const { setIsOpen } = useSearchStore();

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setCategoriesOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setIsOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-white dark:bg-dark-900 shadow-sm border-b border-border/60 transition-all duration-300",
        scrolled && "shadow-md"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="relative shrink-0 flex items-center"
          aria-label={SITE.name}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Image
            src="/logo-light.webp"
            alt={SITE.name}
            width={170}
            height={46}
            className="block dark:hidden h-[36px] sm:h-[46px] w-auto object-contain"
            priority
          />
          <Image
            src="/logo-dark.webp"
            alt={SITE.name}
            width={170}
            height={46}
            className="hidden dark:block h-[36px] sm:h-[46px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {/* Home, Calculators */}
          {NAV_ITEMS.slice(0, 3).map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200",
                  isActive
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-[#111827] dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400"
                )}
                onClick={item.href === "/" ? () => window.scrollTo({ top: 0, behavior: "smooth" }) : undefined}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layout
                    layoutId="navbar-active"
                    className="absolute -bottom-0.5 left-2 right-2 h-0.5 rounded-full bg-primary-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          {/* Categories dropdown */}
          <CategoriesDropdown />

          {/* Blog, About, Contact */}
          {NAV_ITEMS.slice(3).map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200",
                  isActive
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-[#111827] dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400"
                )}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layout
                    layoutId="navbar-active"
                    className="absolute -bottom-0.5 left-2 right-2 h-0.5 rounded-full bg-primary-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Search */}
          <button
            onClick={() => setIsOpen(true)}
            onPointerDown={(e) => { if (e.pointerType === "touch") { e.preventDefault(); setIsOpen(true); } }}
            className="hidden sm:flex tap-target items-center gap-2 h-9 rounded-xl border border-border bg-surface-secondary px-3 text-sm text-muted hover:text-text hover:border-primary-500/30 transition-all duration-200 w-36 lg:w-48 xl:w-56"
            aria-label="Search tools"
          >
            <Search className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-left">Search...</span>
            <kbd className="hidden lg:inline-flex items-center gap-1 rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium text-muted">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>

          <button
            onClick={() => setIsOpen(true)}
            onPointerDown={(e) => { if (e.pointerType === "touch") { e.preventDefault(); setIsOpen(true); } }}
            className="sm:hidden tap-target flex h-9 w-9 items-center justify-center rounded-xl text-muted hover:text-text hover:bg-surface-secondary transition-all"
            aria-label="Search"
          >
            <Search className="h-4.5 w-4.5" />
          </button>

          {/* Theme toggle - Desktop */}
          <ThemeToggle />

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            onPointerDown={(e) => { if (e.pointerType === "touch") { e.preventDefault(); setMobileMenuOpen(true); } }}
            className="lg:hidden tap-target flex h-9 w-9 items-center justify-center rounded-xl text-muted hover:text-text hover:bg-surface-secondary transition-all"
            aria-label="Open menu"
          >
            <Menu className="h-4.5 w-4.5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-0 z-40 bg-black/20 dark:bg-black/40 lg:hidden"
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-[#fcfcfd] dark:bg-dark-900 shadow-2xl shadow-black/10 dark:shadow-black/40 lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between px-5 pt-5 pb-3">
                  <span className="text-base font-bold text-text">Menu</span>
                  <button
                    onClick={closeMenu}
                    onPointerDown={(e) => { if (e.pointerType === "touch") { e.preventDefault(); closeMenu(); } }}
                    className="tap-target flex h-9 w-9 items-center justify-center rounded-xl text-muted hover:text-text hover:bg-surface-secondary transition-all"
                    aria-label="Close menu"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                {/* Navigation items */}
                <nav className="flex-1 px-3 pb-2 space-y-0.5">
                  {NAV_ITEMS.slice(0, 3).map((item, index) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon ? mobileIconMap[item.icon] : null;
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => {
                            closeMenu();
                            if (item.href === "/") {
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                          }}
                          className={cn(
                            "flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200",
                            isActive
                              ? "bg-primary-500/10 text-primary-600 dark:text-primary-400 shadow-sm"
                              : "text-text-secondary hover:text-text hover:bg-surface-secondary"
                          )}
                        >
                          {Icon && (
                            <div className={cn(
                              "flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200",
                              isActive
                                ? "bg-primary-500/15 text-primary-600 dark:text-primary-400"
                                : "bg-surface text-muted"
                            )}>
                              <Icon className="h-4.5 w-4.5" />
                            </div>
                          )}
                          <span>{item.label}</span>
                          {isActive && (
                            <motion.div
                              layout
                              layoutId="mobile-active"
                              className="ml-auto h-2 w-2 rounded-full bg-primary-500"
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Categories dropdown */}
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 3 * 0.04 }}
                  >
                    <button
                      onClick={() => setCategoriesOpen(!categoriesOpen)}
                      className={cn(
                        "flex w-full items-center gap-3.5 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200",
                        categoriesOpen
                          ? "text-text bg-surface-secondary"
                          : "text-text-secondary hover:text-text hover:bg-surface-secondary"
                      )}
                    >
                      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-surface text-muted">
                        <Grid3X3 className="h-4.5 w-4.5" />
                      </div>
                      <span>Categories</span>
                      <motion.div
                        animate={{ rotate: categoriesOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-auto"
                      >
                        <ChevronDown className="h-4.5 w-4.5 text-muted" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {categoriesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pr-2 space-y-0.5 mt-0.5 ml-4 border-l-2 border-border">
                            {CATEGORIES.map((cat) => (
                              <Link
                                key={cat.slug}
                                href={`/${cat.slug}`}
                                onClick={closeMenu}
                                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-text-secondary hover:text-text hover:bg-surface-secondary transition-all"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-primary-500/60 shrink-0" />
                                {cat.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {NAV_ITEMS.slice(3).map((item, index) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon ? mobileIconMap[item.icon] : null;
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (4 + index) * 0.04 }}
                      >
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className={cn(
                            "flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200",
                            isActive
                              ? "bg-primary-500/10 text-primary-600 dark:text-primary-400 shadow-sm"
                              : "text-text-secondary hover:text-text hover:bg-surface-secondary"
                          )}
                        >
                          {Icon && (
                            <div className={cn(
                              "flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200",
                              isActive
                                ? "bg-primary-500/15 text-primary-600 dark:text-primary-400"
                                : "bg-surface text-muted"
                            )}>
                              <Icon className="h-4.5 w-4.5" />
                            </div>
                          )}
                          <span>{item.label}</span>
                          {isActive && (
                            <motion.div
                              layout
                              layoutId="mobile-active"
                              className="ml-auto h-2 w-2 rounded-full bg-primary-500"
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Bottom section */}
                <div className="px-3 pb-6 pt-3 border-t border-border/50 mt-auto">
                  <ThemeToggle mobile />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
