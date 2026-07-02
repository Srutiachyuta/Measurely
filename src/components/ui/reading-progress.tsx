"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(scrollTop / docHeight, 1));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px]"
      style={{ pointerEvents: "none" }}
    >
      <div
        className="h-full rounded-r-full transition-transform duration-150 ease-linear"
        style={{
          width: `${progress * 100}%`,
          background: "linear-gradient(90deg, var(--color-primary-500), var(--color-accent-cyan))",
          boxShadow: "0 0 12px rgba(99,102,241,0.4)",
        }}
      />
    </div>
  );
}
