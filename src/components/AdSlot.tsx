"use client";

import { useEffect, useRef } from "react";
import type { AdPlacement } from "@/config/adPlacements";

interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
}

export function AdSlot({ placement, className = "" }: AdSlotProps) {
  const pushedRef = useRef(false);

  useEffect(() => {
    if (pushedRef.current) return;
    try {
      const g = (window as { adsbygoogle?: unknown[] }).adsbygoogle;
      if (g) {
        g.push({});
        pushedRef.current = true;
      }
    } catch {
      // Silently fail if AdSense hasn't loaded or consent not given
    }
  }, []);

  if (process.env.NODE_ENV === "development") {
    return (
      <div
        className={`flex items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface-secondary/50 py-8 text-xs text-muted ${className}`}
        data-ad-placement={placement.id}
      >
        <div className="text-center">
          <div className="font-medium mb-0.5">{placement.label}</div>
          <div className="opacity-60">{placement.id}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex justify-center overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8154961694177774"
        data-ad-slot={placement.adSlot || process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID || "xxxx"}
        data-ad-format={placement.type === "banner" ? "horizontal" : "rectangle"}
        data-full-width-responsive="true"
      />
    </div>
  );
}
