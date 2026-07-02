"use client";

import { Globe, MessageSquareShare, Share2, Link as LinkIcon, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  text: string;
}

export function ShareButtons({ url, text }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface hover:bg-primary-500/10 text-text-secondary hover:text-primary-600 transition-all border border-border/60"
        aria-label="Share on Twitter"
      >
        <Globe className="h-4 w-4" />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface hover:bg-primary-500/10 text-text-secondary hover:text-primary-600 transition-all border border-border/60"
        aria-label="Share on Facebook"
      >
        <MessageSquareShare className="h-4 w-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface hover:bg-primary-500/10 text-text-secondary hover:text-primary-600 transition-all border border-border/60"
        aria-label="Share on LinkedIn"
      >
        <Share2 className="h-4 w-4" />
      </a>
      <button
        onClick={copyLink}
        className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface hover:bg-primary-500/10 text-text-secondary hover:text-primary-600 transition-all border border-border/60"
        aria-label="Copy link"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <LinkIcon className="h-4 w-4" />}
      </button>
    </div>
  );
}
