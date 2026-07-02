"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { ChevronRight, Home, MoreHorizontal, Slash } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BreadcrumbItem } from "@/types";

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: "chevron" | "slash";
  showHome?: boolean;
  maxItems?: number;
}

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, items, separator = "chevron", showHome = true, maxItems = 6, ...props }, ref) => {
    const SeparatorIcon = separator === "slash" ? Slash : ChevronRight;

    const visibleItems = items.length > maxItems
      ? [items[0], { label: "..." }, ...items.slice(-(maxItems - 2))]
      : items;

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn("flex items-center text-sm text-muted", className)}
        {...props}
      >
        <ol className="flex items-center flex-wrap gap-1">
          {showHome && (
            <li className="flex items-center gap-1">
              <Link
                href="/"
                className="hover:text-text transition-colors"
                aria-label="Home"
              >
                <Home className="h-4 w-4" />
              </Link>
              {visibleItems.length > 0 && (
                <SeparatorIcon className="h-4 w-4 mx-0.5" aria-hidden="true" />
              )}
            </li>
          )}
          {visibleItems.map((item, index) => (
            <li key={index} className="flex items-center gap-1">
              {item.href === "..." ? (
                <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
              ) : item.href ? (
                <Link
                  href={item.href}
                  className={cn(
                    "hover:text-text transition-colors",
                    index === visibleItems.length - 1 && "text-text font-medium"
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-text font-medium">{item.label}</span>
              )}
              {index < visibleItems.length - 1 && (
                <SeparatorIcon className="h-4 w-4 mx-0.5" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }
);
Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };
