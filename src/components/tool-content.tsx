"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, ArrowRight, Calculator, FileText, Sigma, Sparkles,
  AlertTriangle, Target,
} from "lucide-react";
import { calculators } from "@/data/calculators";
import {
  findBlogForTool,
  getCalculatorContent,
} from "@/lib/tool-content";
import { cn } from "@/lib/utils";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.25, 0, 1] as const },
  },
};

interface SectionIcon {
  icon: React.ElementType;
  gradient: string;
}

function getSectionMeta(title: string): SectionIcon {
  const lower = title.toLowerCase();
  if (lower.includes("formula")) return { icon: Sigma, gradient: "from-purple-500 to-pink-500" };
  if (lower.includes("how to") || lower.includes("how to use")) return { icon: Calculator, gradient: "from-primary-500 to-accent-cyan" };
  if (lower.includes("example")) return { icon: BookOpen, gradient: "from-blue-500 to-indigo-500" };
  if (lower.includes("benefit") || lower.includes("use case")) return { icon: Sparkles, gradient: "from-emerald-500 to-teal-500" };
  if (lower.includes("mistake") || lower.includes("avoid")) return { icon: AlertTriangle, gradient: "from-red-500 to-orange-500" };
  if (lower.includes("conclusion")) return { icon: Target, gradient: "from-violet-500 to-purple-500" };
  return { icon: FileText, gradient: "from-amber-500 to-orange-500" };
}

function hasNumberedLines(body: string): boolean {
  return /^\d+\.\s/m.test(body);
}

function extractSteps(body: string): { num: number; text: string }[] {
  const lines = body.split("\n").map((l) => l.trim()).filter(Boolean);
  const steps: { num: number; text: string }[] = [];
  for (const line of lines) {
    const match = line.match(/^(\d+)\.\s+(.+)/);
    if (match) {
      steps.push({ num: parseInt(match[1]), text: match[2] });
    } else if (steps.length > 0) {
      steps[steps.length - 1].text += " " + line;
    }
  }
  return steps;
}

function hasFormulaNotation(body: string): boolean {
  return /[=×÷±√∑∏∫]/.test(body) || /\(1\s*\+/.test(body) || /_[a-z]/.test(body);
}

function detectHasBullets(body: string): boolean {
  return /^[-•]/m.test(body) || /^\- /m.test(body);
}

function extractBullets(body: string): string[] {
  return body.split("\n")
    .map((l) => l.trim())
    .filter((l) => /^[-•]/.test(l) || /^\- /.test(l))
    .map((l) => l.replace(/^[-•]\s*/, "").replace(/^- /, ""));
}

function isFormulaSection(title: string): boolean {
  return title.toLowerCase().includes("formula");
}

function isHowToSection(title: string): boolean {
  return title.toLowerCase().includes("how to");
}

function isExampleSection(title: string): boolean {
  return title.toLowerCase().includes("example");
}

export function ToolContentSections({ slug }: { slug: string }) {
  const definition = calculators.find((c) => c.slug === slug);
  if (!definition) return null;

  const contentSections = getCalculatorContent(definition);
  if (contentSections.length === 0) return null;

  return (
    <div className="mt-8 sm:mt-12 space-y-8">
      {contentSections.map((section, i) => {
        if (section.title === "Related Tools" || section.title === "Related Articles") return null;

        const meta = getSectionMeta(section.title);
        const Icon = meta.icon;
        const steps = hasNumberedLines(section.body) ? extractSteps(section.body) : [];
        const bullets = detectHasBullets(section.body) ? extractBullets(section.body) : [];

        return (
          <motion.div
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={sectionVariants}
          >
            <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-8 h-8 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0",
                  meta.gradient
                )}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-base font-semibold text-text">{section.title}</h2>
              </div>

              {/* Formula section */}
              {isFormulaSection(section.title) && hasFormulaNotation(section.body) ? (
                <div className="bg-dark-800/40 dark:bg-dark-900/50 border border-border/60 rounded-xl p-4 sm:p-5 font-mono text-sm space-y-2">
                  {section.body.split("\n").filter(Boolean).map((line, j) => {
                    const trimmed = line.trim();
                    if (!trimmed) return null;
                    const hasEquals = /[=]/.test(trimmed);
                    const isSubtext = trimmed.startsWith("(") || trimmed.startsWith("-") || trimmed.startsWith("where") || trimmed.startsWith("For") || trimmed.startsWith("Each") || trimmed.startsWith("The calculation");
                    if (isSubtext) {
                      return (
                        <p key={j} className="text-xs text-muted leading-relaxed">
                          {trimmed}
                        </p>
                      );
                    }
                    if (hasEquals) {
                      const indent = /^[A-Z]/.test(trimmed) ? "" : "pl-4";
                      return (
                        <div key={j} className={cn("text-text-secondary", indent)}>
                          {trimmed}
                        </div>
                      );
                    }
                    return (
                      <p key={j} className="text-xs text-text-secondary">
                        {trimmed}
                      </p>
                    );
                  })}
                </div>
              ) : isFormulaSection(section.title) ? (
                <div className="text-sm text-muted leading-relaxed whitespace-pre-line">
                  {section.body}
                </div>
              ) : null}

              {/* How-to section with numbered steps */}
              {isHowToSection(section.title) && steps.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted leading-relaxed">{section.body.split("\n")[0]}</p>
                  <div className="space-y-2">
                    {steps.map((step) => (
                      <div
                        key={step.num}
                        className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary dark:bg-dark-800/30 border border-border/60"
                      >
                        <div className="w-6 h-6 rounded-lg bg-primary-500 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                          {step.num}
                        </div>
                        <p className="text-sm text-muted leading-relaxed">{step.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : isHowToSection(section.title) ? (
                <div className="text-sm text-muted leading-relaxed whitespace-pre-line">
                  {section.body}
                </div>
              ) : null}

              {/* Example section */}
              {isExampleSection(section.title) && section.body.includes("Example inputs:") ? (
                <div className="text-sm text-muted leading-relaxed space-y-4">
                  <p className="text-sm text-muted leading-relaxed">
                    Here is a practical example to help you understand how the {definition.name} works.
                  </p>
                  <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200/50 dark:border-amber-500/20 rounded-xl p-4 space-y-2">
                    <div className="text-sm font-semibold text-text flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      Example Values
                    </div>
                    <div className="space-y-1.5">
                      {section.body.split("\n")
                        .filter((l) => l.includes(":"))
                        .filter((l) => !l.toLowerCase().includes("example") && !l.toLowerCase().includes("enter these"))
                        .map((line, j) => {
                          const colonIdx = line.indexOf(":");
                          if (colonIdx === -1) return null;
                          const label = line.substring(0, colonIdx).trim();
                          const value = line.substring(colonIdx + 1).trim();
                          return (
                            <div key={j} className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-surface-secondary dark:bg-dark-800/30 border border-border/60">
                              <span className="text-xs text-muted">{label}</span>
                              <span className="text-xs font-semibold text-text">{value}</span>
                            </div>
                          );
                        })
                      }
                    </div>
                  </div>
                  <p className="text-xs text-muted">
                    Enter these values into the calculator (or click &ldquo;Load Example Values&rdquo;) to see how the formula produces accurate results.
                  </p>
                </div>
              ) : isExampleSection(section.title) ? (
                <div className="text-sm text-muted leading-relaxed whitespace-pre-line">
                  {section.body}
                </div>
              ) : null}

              {/* Default content rendering */}
              {!isFormulaSection(section.title) && !isHowToSection(section.title) && !isExampleSection(section.title) && (
                <>
                  {bullets.length > 0 ? (
                    <div className="text-sm text-muted leading-relaxed space-y-4">
                      {section.body.split("\n").filter((l) => !/^[-•]/.test(l.trim())).filter(Boolean).map((line, j) => (
                        <p key={j}>{line}</p>
                      ))}
                      <ul className="space-y-1.5">
                        {bullets.map((bullet, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                            <span className="text-sm text-muted">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="text-sm text-muted leading-relaxed space-y-3 whitespace-pre-line">
                      {section.body}
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
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
