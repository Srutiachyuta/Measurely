import Link from "next/link";
import { BookOpen } from "lucide-react";
import { calculators } from "@/data/calculators";
import { findBlogForTool, getCalculatorContent } from "@/lib/tool-content";

export function ToolContentSections({slug}: {slug: string}) {
  const calculator = calculators.find(tool => tool.slug === slug);
  if (!calculator) return null;
  const references = calculator.slug === "tax-calculator" ? [{label:"Income Tax Department: AY 2026–27 rates and rebate",url:"https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/itr-2/itr-2-faqs"}] : calculator.category === "health" ? [{label:"WHO: body mass index and health context",url:"https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight"}] : ["finance","retirement","real-estate","business"].includes(calculator.category) ? [{label:"Investor.gov: compound interest and financial education",url:"https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator"}] : [{label:"NIST: units and measurement references",url:"https://www.nist.gov/pml/special-publication-811"}];
  return <div className="mt-10 space-y-6">{getCalculatorContent(calculator).map(section => <section key={section.title} className="rounded-2xl border border-border bg-surface p-5 sm:p-7"><h2 className="mb-4 text-xl font-semibold text-text">{section.title}</h2><p className="whitespace-pre-line break-words text-sm leading-7 text-text-secondary">{section.body}</p></section>)}<section className="rounded-2xl border border-border bg-surface p-5 sm:p-7"><h2 className="mb-3 text-xl font-semibold">Further reading</h2><p className="mb-3 text-sm text-muted">Background references; these organizations do not endorse this calculator.</p>{references.map(reference => <a key={reference.url} href={reference.url} target="_blank" rel="noopener noreferrer" className="block text-sm text-primary-600 underline underline-offset-4 dark:text-primary-300">{reference.label}</a>)}</section></div>;
}

export function ToolBlogLink({slug}: {slug:string}) {
  const article=findBlogForTool(slug);
  if (!article) return null;
  return <Link href={"/"+article.slug} className="flex items-center gap-2 rounded-xl border border-border p-4 text-sm"><BookOpen className="h-4 w-4" />Read the guide: {article.title}</Link>;
}
