"use client";

import { cn } from "@/lib/utils";

interface PremiumSkeletonProps {
  className?: string;
  variant?: "card" | "text" | "avatar" | "chart" | "result";
}

export function PremiumSkeleton({ className, variant = "text" }: PremiumSkeletonProps) {
  if (variant === "card") {
    return (
      <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-surface p-5", className)}>
        <div className="absolute inset-0 shimmer-overlay" />
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-dark-200 dark:bg-dark-700" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded-lg bg-dark-200 dark:bg-dark-700" />
            <div className="h-3 w-1/2 rounded-lg bg-dark-200 dark:bg-dark-700" />
          </div>
        </div>
        <div className="space-y-2.5">
          <div className="h-3 w-full rounded-lg bg-dark-200 dark:bg-dark-700" />
          <div className="h-3 w-5/6 rounded-lg bg-dark-200 dark:bg-dark-700" />
          <div className="h-3 w-2/3 rounded-lg bg-dark-200 dark:bg-dark-700" />
        </div>
      </div>
    );
  }

  if (variant === "chart") {
    return (
      <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-surface p-5", className)}>
        <div className="absolute inset-0 shimmer-overlay" />
        <div className="h-4 w-24 rounded-lg bg-dark-200 dark:bg-dark-700 mb-4" />
        <div className="flex items-end gap-2 h-32">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-md bg-dark-200 dark:bg-dark-700"
              style={{ height: `${30 + Math.random() * 70}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "result") {
    return (
      <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-surface p-6", className)}>
        <div className="absolute inset-0 shimmer-overlay" />
        <div className="h-3 w-20 rounded-lg bg-dark-200 dark:bg-dark-700 mb-3" />
        <div className="h-10 w-48 rounded-xl bg-dark-200 dark:bg-dark-700 mb-4" />
        <div className="h-3 w-full rounded-lg bg-dark-200 dark:bg-dark-700" />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-xl", className)}>
      <div className="absolute inset-0 shimmer-overlay" />
      <div className="h-full w-full bg-dark-200 dark:bg-dark-700" />
    </div>
  );
}
