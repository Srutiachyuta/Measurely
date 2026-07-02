"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "success" | "warning" | "info" | "gradient";
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  description,
  viewAllHref,
  viewAllLabel = "View All",
  badge,
  badgeVariant = "gradient",
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 mb-12",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {badge && (
        <Badge variant={badgeVariant} size="lg" className="shadow-sm">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors mt-2"
        >
          <span className="relative">
            {viewAllLabel}
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary-600 dark:bg-primary-400 transition-all duration-300 group-hover:w-full" />
          </span>
          <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
