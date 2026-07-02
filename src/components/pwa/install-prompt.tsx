{/*"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    const dismissed = localStorage.getItem("pwa-dismissed");
    if (dismissed) setShow(false);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    (deferredPrompt as any).prompt();
    const result = await (deferredPrompt as any).userChoice;
    if (result.outcome === "accepted") setShow(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem("pwa-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-md"
        >
          <div className="rounded-2xl border border-border/80 bg-white/90 dark:bg-dark-900/90 backdrop-blur-xl p-4 shadow-glass-lg">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-500/10">
                <Download className="h-5 w-5 text-primary-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text">Install Measurely</p>
                <p className="text-xs text-text-secondary mt-0.5">Install our app for a better experience. Access tools offline!</p>
              </div>
              <button
                onClick={handleDismiss}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-muted hover:text-text hover:bg-white/60 dark:hover:bg-dark-800/60 transition-all shrink-0"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={handleDismiss}
                className="flex-1 rounded-xl border border-border/60 px-3 py-2 text-xs font-medium text-text-secondary hover:text-text hover:bg-white/60 dark:hover:bg-dark-800/60 transition-all"
              >
                Not now
              </button>
              <button
                onClick={handleInstall}
                className="flex-1 rounded-xl bg-primary-500 px-3 py-2 text-xs font-medium text-white hover:bg-primary-600 transition-all"
              >
                Install App
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
*/}
