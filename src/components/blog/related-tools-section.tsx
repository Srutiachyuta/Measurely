import { Calculator } from "lucide-react";
import type { BlogPost } from "@/types";
import { getRelatedTools } from "@/lib/recommendations";
import { RelatedToolCard } from "./related-tool-card";

interface RelatedToolsSectionProps {
  current: BlogPost;
}

export function RelatedToolsSection({ current }: RelatedToolsSectionProps) {
  const tools = getRelatedTools(current, 6);

  if (tools.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center text-white">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-text">
            Related Tools
          </h2>
          <p className="text-sm text-text-secondary">
            Try these helpful calculators and converters
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((tool, i) => (
          <RelatedToolCard key={tool.slug} tool={tool} index={i} />
        ))}
      </div>
    </section>
  );
}
