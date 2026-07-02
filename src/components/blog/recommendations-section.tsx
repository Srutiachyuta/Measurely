import type { BlogPost } from "@/types";
import { RelatedArticlesSection } from "./related-articles-section";
import { RelatedToolsSection } from "./related-tools-section";

interface RecommendationsSectionProps {
  current: BlogPost;
  allBlogs: BlogPost[];
}

export function RecommendationsSection({ current, allBlogs }: RecommendationsSectionProps) {
  return (
    <div className="mt-12 pt-8 border-t border-border/60">
      <RelatedArticlesSection current={current} allBlogs={allBlogs} />
      <RelatedToolsSection current={current} />
    </div>
  );
}
