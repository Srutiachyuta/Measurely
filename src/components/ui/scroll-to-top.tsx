"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollTop > 300);
      if (docHeight > 0) {
        setProgress(Math.min(scrollTop / docHeight, 1));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={cn(
            "fixed bottom-6 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-2xl",
            "bg-primary-600 text-white shadow-lg shadow-primary-500/25",
            "hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-500/30",
            "active:scale-95 transition-all duration-200"
          )}
          aria-label="Scroll to top"
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r="19"
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="2"
            />
            <circle
              cx="22"
              cy="22"
              r="19"
              fill="none"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="2"
              strokeDasharray={`${progress * 119.38} 119.38`}
              strokeLinecap="round"
              className="transition-[stroke-dasharray] duration-150 ease-linear"
            />
          </svg>
          <ArrowUp className="h-4.5 w-4.5 relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
