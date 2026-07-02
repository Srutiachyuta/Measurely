"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ToolCard } from "./tool-card";
import { SkeletonCard } from "@/components/ui/skeleton";
import { PackageSearch } from "lucide-react";

interface Tool {
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  icon: string;
  description: string;
  usageCount?: string;
  isNew?: boolean;
  isTrending?: boolean;
}

interface ToolGridProps {
  tools: Tool[];
  loading?: boolean;
  emptyMessage?: string;
  columns?: 2 | 3 | 4;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

export function ToolGrid({
  tools,
  loading = false,
  emptyMessage = "No tools found",
  columns = 3,
  variant = "default",
  className,
}: ToolGridProps) {
  if (loading) {
    return (
      <div
        className={cn(
          "grid gap-4",
          columns === 2 && "grid-cols-1 sm:grid-cols-2",
          columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          className
        )}
      >
        {Array.from({ length: columns * 2 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-secondary mb-4">
          <PackageSearch className="h-8 w-8 text-muted" />
        </div>
        <p className="text-lg font-medium text-text">{emptyMessage}</p>
        <p className="text-sm text-text-secondary mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "grid gap-4",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
    >
      {tools.map((tool) => (
        <motion.div key={tool.slug} variants={itemVariants}>
          <ToolCard {...tool} variant={variant} />
        </motion.div>
      ))}
    </motion.div>
  );
}
