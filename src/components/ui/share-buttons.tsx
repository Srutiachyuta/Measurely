"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  Link2,
  Check,
  Mail,
  Share2,
} from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

export function ShareButtons({ url, title, description, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description || title);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  const shareItems = [
    {
      label: "Copy Link",
      icon: copied ? Check : Link2,
      onClick: handleCopyLink,
      className: copied
        ? "bg-accent-green/15 text-accent-green border-accent-green/30"
        : "hover:bg-surface-secondary hover:text-text",
    },
    {
      label: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      className: "hover:bg-sky-50 dark:hover:bg-sky-950/30 hover:text-sky-500",
    },
    {
      label: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      className: "hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      className: "hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-700",
    },
    {
      label: "Email",
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=${encodedDesc}%0A%0A${encodedUrl}`,
      className: "hover:bg-surface-secondary hover:text-text",
    },
  ];

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span className="text-xs text-muted flex items-center gap-1.5 mr-1">
        <Share2 className="h-3.5 w-3.5" />
        Share
      </span>
      {shareItems.map((item) => (
        <div key={item.label}>
          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                window.open(item.href!, "_blank", "width=600,height=400");
              }}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-lg text-muted transition-all duration-200",
                item.className
              )}
              aria-label={`Share on ${item.label}`}
            >
              <item.icon className="h-4 w-4" />
            </a>
          ) : (
            <button
              onClick={item.onClick}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-lg text-muted transition-all duration-200",
                item.className
              )}
              aria-label={item.label}
            >
              <item.icon className="h-4 w-4" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function Twitter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function Facebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
