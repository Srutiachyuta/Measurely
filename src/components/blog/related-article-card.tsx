"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, CalendarDays, ArrowRight } from "lucide-react";
import { formatDate, cn } from "@/lib/utils";
import { getBlogImageUrl, getBlogImageAlt } from "@/lib/blog-images";
import type { BlogPost } from "@/types";

interface RelatedArticleCardProps {
  post: BlogPost;
  index: number;
}

export function RelatedArticleCard({ post, index }: RelatedArticleCardProps) {
  const imgSrc = getBlogImageUrl(post.slug, post.category);
  const imgAlt = getBlogImageAlt(post.slug, post.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        href={`/${post.slug}`}
        className="group block rounded-2xl border border-border/60 bg-surface hover:shadow-elevation-md hover:border-primary-500/20 transition-all duration-300 overflow-hidden h-full"
      >
        <div className="relative aspect-video overflow-hidden bg-surface-secondary">
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 dark:bg-dark-800/90 text-primary-700 dark:text-primary-300 backdrop-blur-sm shadow-sm">
              {post.category}
            </span>
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <h3 className="font-semibold text-text group-hover:text-primary-600 transition-colors mb-1.5 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-2 mb-3">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-3 text-xs text-text-secondary">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime} min
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                {formatDate(post.publishedAt)}
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-text-secondary group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
