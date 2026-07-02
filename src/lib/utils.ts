import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatIndianNumber(value: number): string {
  const numStr = Math.round(value * 100) / 100 + "";
  const parts = numStr.split(".");
  let intPart = parts[0];
  const lastThree = intPart.slice(-3);
  const rest = intPart.slice(0, -3);
  if (rest) {
    intPart = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
  }
  return (value < 0 ? "-" : "") + "₹" + intPart + (parts[1] ? "." + parts[1].padEnd(2, "0") : ".00");
}

export function formatNumber(
  value: number,
  options: {
    decimals?: number;
    compact?: boolean;
    currency?: string;
    style?: "decimal" | "currency" | "percent";
    locale?: string;
  } = {}
): string {
  const {
    decimals = 2,
    compact = false,
    currency,
    style = "decimal",
    locale = "en-US",
  } = options;

  const formatter = new Intl.NumberFormat(locale, {
    style,
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    notation: compact ? "compact" : "standard",
    compactDisplay: compact ? "short" : undefined,
  });

  return formatter.format(value);
}

export function formatDate(
  date: Date | string | number,
  options: {
    style?: "full" | "long" | "medium" | "short";
    includeTime?: boolean;
    locale?: string;
  } = {}
): string {
  const { style = "medium", includeTime = false, locale = "en-US" } = options;
  const dateObj = date instanceof Date ? date : new Date(date);

  const dateOptions: Intl.DateTimeFormatOptions = {
    dateStyle: style,
    ...(includeTime && { timeStyle: style }),
  };

  return new Intl.DateTimeFormat(locale, dateOptions).format(dateObj);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number = 100): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "...";
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function generateMeta({
  title,
  description,
  image,
  url,
  type = "website",
  publishedTime,
  authors,
  tags,
}: {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  tags?: string[];
}) {
  const siteName = "Measurely";
  const defaultImage = "/og-image.png";
  const defaultUrl = "https://measurely.app";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type,
      siteName,
      url: url ?? defaultUrl,
      images: [{ url: image ?? defaultImage, width: 1200, height: 630 }],
      ...(publishedTime && { publishedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image ?? defaultImage],
    },
    ...(tags && { keywords: tags.join(", ") }),
    alternates: { canonical: url ?? defaultUrl },
  };
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textArea);
    return success;
  } catch {
    return false;
  }
}

export function downloadAsFile(content: string, filename: string, type: string = "text/plain") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function printElement(elementId: string) {
  const printContent = document.getElementById(elementId);
  if (!printContent) return;

  const originalTitle = document.title;
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${originalTitle}</title>
        <style>
          body { font-family: system-ui, sans-serif; padding: 2rem; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>${printContent.innerHTML}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}
