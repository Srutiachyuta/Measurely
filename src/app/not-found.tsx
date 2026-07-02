import Link from "next/link";
import type { Metadata } from "next";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="relative max-w-lg w-full text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-cyan/5 dark:from-primary-500/10 dark:to-accent-cyan/10 rounded-3xl -z-10" />
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-accent-cyan/10 rounded-full blur-3xl -z-10" />

        <div className="p-8 sm:p-12">
          <div className="relative mx-auto mb-8 flex h-36 w-36 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-cyan/20 animate-pulse-glow" />
            <div className="relative flex flex-col items-center">
              <span className="text-7xl font-bold">
                <span className="text-gradient">404</span>
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-text mb-3">Page not found</h1>
          <p className="text-text-secondary mb-8 max-w-sm mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. 
            Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl border border-border/60 text-text text-sm font-medium hover:bg-surface-secondary transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Contact Support
            </Link>
          </div>

          <div className="relative max-w-sm mx-auto">
            <Search className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted" />
            <Input
              placeholder="Search for what you need..."
              className="pl-10 h-12 text-base bg-surface-secondary/50"
              readOnly
            />
          </div>

          <p className="mt-4 text-xs text-muted">
            Try searching for a calculator instead
          </p>
        </div>
      </div>
    </div>
  );
}
