"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getBlogImageUrl, getBlogImageAlt } from "@/lib/blog-images";
import type { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const imgSrc = getBlogImageUrl(post.slug, post.category);
  const imgAlt = getBlogImageAlt(post.slug, post.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={`/${post.slug}`}
        className="group block rounded-2xl border border-border/60 bg-surface hover:shadow-elevation-md transition-all duration-300 overflow-hidden"
      >
        <div className="relative h-44 sm:h-48 overflow-hidden bg-surface-secondary">
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 dark:bg-dark-800/90 text-primary-700 dark:text-primary-300 backdrop-blur-sm shadow-sm">
              {post.category}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 text-xs text-white/80 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
              <Clock className="h-3 w-3" />
              {post.readingTime} min
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-text group-hover:text-primary-600 transition-colors mb-2 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-2 mb-4">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-[10px] font-bold text-white">
                {post.author.avatar}
              </div>
              <span className="text-xs text-text-secondary">{post.author.name}</span>
            </div>
            <span className="text-xs text-text-secondary">{formatDate(post.publishedAt)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

interface FeaturedBlogCardProps {
  post: BlogPost;
}

export function FeaturedBlogCard({ post }: FeaturedBlogCardProps) {
  const imgSrc = getBlogImageUrl(post.slug, post.category);
  const imgAlt = getBlogImageAlt(post.slug, post.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Link
        href={`/${post.slug}`}
        className="group block rounded-2xl border border-border/60 bg-surface hover:shadow-elevation-md transition-all duration-300 overflow-hidden"
      >
        <div className="grid sm:grid-cols-5 gap-0">
          <div className="sm:col-span-2 relative h-60 sm:h-full min-h-[240px] overflow-hidden bg-surface-secondary">
            <Image
              src={imgSrc}
              alt={imgAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 40vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
          </div>
          <div className="sm:col-span-3 p-6 sm:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-text-secondary">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime} min read
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text group-hover:text-primary-600 transition-colors mb-3">
              {post.title}
            </h2>
            <p className="text-text-secondary mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-xs font-bold text-white">
                  {post.author.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-text">{post.author.name}</p>
                  <p className="text-xs text-text-secondary">{post.author.role}</p>
                </div>
              </div>
              <span className="text-sm text-text-secondary">{formatDate(post.publishedAt)}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

interface PopularBlogCardProps {
  post: BlogPost;
  index: number;
}

export function PopularBlogCard({ post, index }: PopularBlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Link
        href={`/${post.slug}`}
        className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-secondary transition-colors group"
      >
        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold shrink-0">
          {index + 1}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-text line-clamp-2 group-hover:text-primary-600 transition-colors">
            {post.title}
          </p>
          <p className="text-xs text-text-secondary mt-1">
            {formatDate(post.publishedAt)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
