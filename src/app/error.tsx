"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="relative max-w-lg w-full text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-amber-500/5 dark:from-red-500/10 dark:to-amber-500/10 rounded-3xl -z-10" />
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -z-10" />

        <div className="p-8 sm:p-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-text mb-3">Something went wrong!</h1>
          <p className="text-text-secondary mb-2">
            An unexpected error occurred. Our team has been notified.
          </p>
          {error.digest && (
            <p className="text-xs text-muted mb-8 font-mono bg-surface-secondary dark:bg-dark-800 inline-block px-3 py-1 rounded-lg">
              Error ID: {error.digest}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl border border-border/60 text-text text-sm font-medium hover:bg-surface-secondary transition-all"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
