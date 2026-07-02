"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Download, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function FooterInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    setIsInstalled(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    const onMediaChange = (e: MediaQueryListEvent) => setIsInstalled(e.matches);
    mediaQuery.addEventListener("change", onMediaChange);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    const onInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", onInstalled);
      mediaQuery.removeEventListener("change", onMediaChange);
    };
  }, [setDeferredPrompt]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    try {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === "accepted") {
        setIsInstalled(true);
      }
    } catch {
      // PWA prompt unavailable or dismissed
    } finally {
      setDeferredPrompt(null);
    }
  };

  if (isInstalled) {
    return (
      <div className="flex items-center gap-3 p-4 sm:p-5 rounded-2xl border border-green-500/20 bg-green-500/[0.04]">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-dark-800">
          <Image
            src="/logo-light.webp"
            alt="Measurely logo"
            width={40}
            height={11}
            className="block dark:hidden h-[11px] w-auto object-contain"
          />
          <Image
            src="/logo-dark.webp"
            alt="Measurely logo"
            width={40}
            height={11}
            className="hidden dark:block h-[11px] w-auto object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text">App Installed</p>
          <p className="text-xs text-text-secondary mt-0.5">Measurely is installed on your device</p>
        </div>
        <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl border border-border/60 bg-gradient-to-br from-primary-500/[0.04] to-accent-cyan/[0.04] dark:from-primary-500/[0.07] dark:to-accent-cyan/[0.07]">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-dark-800 border border-border/40">
          <Image
            src="/logo-light.webp"
            alt="Measurely logo"
            width={44}
            height={12}
            className="block dark:hidden h-[12px] w-auto object-contain"
          />
          <Image
            src="/logo-dark.webp"
            alt="Measurely logo"
            width={44}
            height={12}
            className="hidden dark:block h-[12px] w-auto object-contain"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-text">Install Measurely App</p>
          <p className="text-xs text-text-secondary mt-1 leading-relaxed">
            Install Measurely for faster access and an app-like experience.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
        <button
          onClick={handleInstall}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
          style={
            deferredPrompt
              ? { backgroundColor: "rgb(79 70 229)", color: "white", boxShadow: "0 4px 6px -1px rgba(79 70 229, 0.2)" }
              : { backgroundColor: "rgba(79 70 229, 0.1)", color: "rgb(79 70 229)" }
          }
          onMouseEnter={(e) => {
            if (deferredPrompt) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgb(67 56 202)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 15px -3px rgba(79 70 229, 0.3)";
            }
          }}
          onMouseLeave={(e) => {
            if (deferredPrompt) {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgb(79 70 229)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 6px -1px rgba(79 70 229, 0.2)";
            }
          }}
        >
          <Download className="h-4 w-4" />
          Install App
        </button>
        <Link
          href="/about"
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-500/10 transition-all"
        >
          Learn More
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
