"use client";

import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCategoryTheme } from "@/lib/card-theme";
import type { CalculatorDefinition } from "@/types/calculators";

interface RelatedToolsProps {
  tools: CalculatorDefinition[];
  maxCount?: number;
}

export function RelatedTools({ tools, maxCount = 8 }: RelatedToolsProps) {
  if (tools.length === 0) return null;

  const display = tools.slice(0, maxCount);

  return (
    <div className="bg-surface rounded-2xl border border-border p-5 space-y-3">
      <h3 className="text-sm font-semibold text-text flex items-center gap-2">
        <FileText className="w-4 h-4 text-primary-500" />
        Related Tools
      </h3>
      <div className="space-y-1">
        {display.map((tool) => {
          const theme = getCategoryTheme(tool.category);
          return (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className={cn(
                "flex items-center gap-3 p-2.5 rounded-xl transition-colors",
                "hover:bg-surface-secondary group"
              )}
            >
              <div className={cn(
                "w-9 h-9 rounded-lg bg-gradient-to-br flex items-center justify-center shrink-0 text-white",
                theme.iconGradient
              )}>
                <tool.icon className="h-4 w-4" />
              </div>
              <span className={cn("text-sm font-medium flex-1 line-clamp-1", theme.textColor)}>
                {tool.name}
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-muted group-hover:text-primary-500 group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
