"use client";

import { motion } from "framer-motion";
import { POPULAR_TOOLS, CATEGORIES } from "@/lib/constants";
import { SectionHeader } from "./section-header";
import { ToolCard } from "./tool-card";
import { ErrorBoundary } from "@/components/ui/error-boundary";

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.25, 0, 1] as const },
  },
};

export function PopularTools() {
  const tools = Array.isArray(POPULAR_TOOLS) && POPULAR_TOOLS.length > 0
    ? POPULAR_TOOLS
    : CATEGORIES.flatMap((cat) =>
        cat.tools.slice(0, 2).map((tool) => ({
          name: tool.name,
          slug: tool.slug,
          category: cat.name.replace(" Calculators", "").replace(" Converters", ""),
          categorySlug: cat.slug,
          icon: cat.icon,
          description: `Free online ${tool.name.toLowerCase()}`,
        }))
      ).slice(0, 8);

  if (tools.length === 0) {
    return (
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Popular Tools"
            description="Most used calculators"
            viewAllHref="/categories"
            viewAllLabel="See all tools"
          />
          <div className="text-center py-12">
            <p className="text-text-secondary">Loading tools...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Popular Tools"
            description="Most used calculators"
          viewAllHref="/categories"
          viewAllLabel="See all tools"
        />

        <ErrorBoundary fallback={
          <div className="text-center py-12">
            <p className="text-text-secondary">Browse our calculators below.</p>
          </div>
        }>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {tools.map((tool, i) => (
            <motion.div key={tool.slug || i} variants={itemVariants}>
              <ToolCard {...tool} />
            </motion.div>
          ))}
        </motion.div>
        </ErrorBoundary>
      </div>
    </section>
  );
}
