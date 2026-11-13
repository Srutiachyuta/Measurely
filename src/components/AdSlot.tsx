"use client";

import { useEffect, useRef } from "react";
import type { AdPlacement } from "@/config/adPlacements";

interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
}

export function AdSlot({ placement, className = "" }: AdSlotProps) {
  const pushedRef = useRef(false);
  const slotId = placement.adSlot || process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID;

  useEffect(() => {
    const initialize = () => {
      if (pushedRef.current || !slotId || !/^\d+$/.test(slotId)) return;
      try {
        const preferences = JSON.parse(localStorage.getItem("cookiePreferences") || "null");
        const ads = (window as {adsbygoogle?: unknown[]}).adsbygoogle;
        if (preferences?.marketing && ads && (window as {measurelyAdsReady?: boolean}).measurelyAdsReady) {
          ads.push({});
          pushedRef.current = true;
        }
      } catch { return; }
    };
    initialize();
    window.addEventListener("measurelyAdsReady", initialize);
    window.addEventListener("cookieConsentUpdated", initialize);
    return () => {
      window.removeEventListener("measurelyAdsReady", initialize);
      window.removeEventListener("cookieConsentUpdated", initialize);
    };
  }, [slotId]);

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

  if (!slotId || !/^\d+$/.test(slotId)) return null;

  return (
    <div className={`min-h-[100px] flex justify-center overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-8154961694177774"
        data-ad-slot={slotId}
        data-ad-format={placement.type === "banner" ? "horizontal" : "rectangle"}
        data-full-width-responsive="true"
      />
    </div>
  );
}
