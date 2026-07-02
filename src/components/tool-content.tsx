"use client";

import Link from "next/link";
import { BookOpen, ArrowRight, FileText } from "lucide-react";
import { calculators } from "@/data/calculators";
import { converters } from "@/data/converters";
import {
  findBlogForTool,
  findBlogsForTool,
  getCalculatorContent,
  getConverterContent,
} from "@/lib/tool-content";
import { cn } from "@/lib/utils";
import { getCategoryTheme } from "@/lib/card-theme";
import type { CalculatorDefinition } from "@/types/calculators";
import type { ConverterDefinition } from "@/types/converters";

interface ToolContentSectionsProps {
  slug: string;
  type?: "calculator" | "converter";
}

export function ToolContentSections({ slug, type = "calculator" }: ToolContentSectionsProps) {
  const definition = type === "calculator"
    ? calculators.find((c) => c.slug === slug)
    : converters.find((c) => c.slug === slug);
  if (!definition) return null;

  const contentSections = type === "calculator"
    ? getCalculatorContent(definition as any)
    : getConverterContent(definition as any);
  if (contentSections.length === 0) return null;

  return (
    <div className="mt-8 space-y-6">
      {contentSections.map((section, i) => {
        if (section.title === "Related Tools" || section.title === "Related Articles") return null;

        return (
          <div key={i} className="bg-surface rounded-2xl border border-border p-5 space-y-3">
            <h2 className="text-base font-semibold text-text">{section.title}</h2>
            <div className="text-sm text-muted leading-relaxed space-y-3 whitespace-pre-line">
              {section.body}
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface ToolBlogLinkProps {
  slug: string;
}

export function ToolBlogLink({ slug }: ToolBlogLinkProps) {
  const blog = findBlogForTool(slug);
  if (!blog) return null;

  return (
    <div className="bg-surface rounded-2xl border border-border p-5 space-y-3">
      <h2 className="text-sm font-semibold text-text flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-accent-cyan" />
        Read the Guide
      </h2>
      <p className="text-sm text-muted line-clamp-3">{blog.excerpt}</p>
      <Link
        href={`/${blog.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors"
      >
        Read full article <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
