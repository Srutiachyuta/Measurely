"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID || typeof window === "undefined" || typeof window.gtag !== "function") return;
    try {
      if (!JSON.parse(localStorage.getItem("cookiePreferences") || "null")?.analytics) return;
    } catch { return; }
    window.gtag("config", GA_ID, {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
