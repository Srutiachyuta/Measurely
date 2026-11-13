"use client";
import { useEffect } from "react";

export function LegacyCacheCleanup() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    void (async () => {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        const worker = registration.active || registration.waiting || registration.installing;
        if (!worker) continue;
        const url = new URL(worker.scriptURL);
        if (url.origin !== location.origin || url.pathname !== "/sw.js") continue;
        await navigator.serviceWorker.register("/sw.js", { scope: new URL(registration.scope).pathname, updateViaCache: "none" });
      }
    })().catch(() => { /* A later online visit can retry a failed update. */ });
  }, []);
  return null;
}
