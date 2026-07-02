"use client";

import { cn } from "@/lib/utils";
import { FAQS } from "@/lib/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "./section-header";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export function FAQSection() {
  return (
    <section className="py-20 sm:py-28 bg-surface-secondary/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <SectionHeader
          title="Frequently Asked Questions"
          description="Everything you need to know about Measurely"
        />

        <div className="rounded-2xl border border-border/60 bg-surface p-2 sm:p-4 transition-all duration-300 hover:shadow-elevation-sm">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={cn(
                  "border-b border-border/40 last:border-b-0",
                  "data-[state=open]:bg-surface-secondary/50 data-[state=open]:rounded-xl data-[state=open]:px-4 data-[state=open]:mx-0",
                  "transition-all duration-200"
                )}
              >
                <AccordionTrigger className="text-left text-base font-semibold py-4 px-2 hover:no-underline">
                  <span className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed px-2 pb-4">
                  <div className="pl-9 text-text-secondary">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}


