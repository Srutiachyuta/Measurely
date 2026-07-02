import { BookOpen } from "lucide-react";
import type { BlogPost } from "@/types";
import { getRelatedArticles } from "@/lib/recommendations";
import { RelatedArticleCard } from "./related-article-card";

interface RelatedArticlesSectionProps {
  current: BlogPost;
  allBlogs: BlogPost[];
}

export function RelatedArticlesSection({ current, allBlogs }: RelatedArticlesSectionProps) {
  const articles = getRelatedArticles(current, allBlogs, 6);

  if (articles.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white">
          <BookOpen className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-text">
            Related Articles
          </h2>
          <p className="text-sm text-text-secondary">
            Continue reading from the same topic
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((post, i) => (
          <RelatedArticleCard key={post.slug} post={post} index={i} />
        ))}
      </div>
    </section>
  );
}
