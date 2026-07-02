"use client";

import { ChevronsUpDown } from "lucide-react";
import { SectionCard } from "./section-card";

interface FAQItem {
  question: string;
  answer: string;
}

interface ToolFAQProps {
  items: FAQItem[];
  title?: string;
}

export function ToolFAQ({ items, title = "Frequently Asked Questions" }: ToolFAQProps) {
  if (items.length === 0) return null;

  return (
    <SectionCard title={title}>
      <div className="space-y-3">
        {items.map((faq, i) => (
          <details key={i} className="group">
            <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-text py-2 list-none">
              {faq.question}
              <ChevronsUpDown className="w-4 h-4 text-muted group-open:rotate-180 transition-transform shrink-0" />
            </summary>
            <p className="text-sm text-muted mt-1 pb-2">{faq.answer}</p>
          </details>
        ))}
      </div>
    </SectionCard>
  );
}
