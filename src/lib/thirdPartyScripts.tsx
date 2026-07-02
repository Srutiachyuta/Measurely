"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Shared types & storage helpers                                     */
/* ------------------------------------------------------------------ */

type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_KEY = "cookieConsent";
const PREFERENCES_KEY = "cookiePreferences";
const VISITED_KEY = "hasVisited";
const UPDATE_EVENT = "cookieConsentUpdated";

function readPreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PREFERENCES_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return null;
  }
}

function writePreferences(
  prefs: CookiePreferences,
  status: "accepted" | "rejected" | "customized"
) {
  localStorage.setItem(CONSENT_KEY, status);
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
  localStorage.setItem(VISITED_KEY, "true");
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT));
}

/* ------------------------------------------------------------------ */
/*  ThirdPartyScripts — loads GA / GTM / AdSense based on consent      */
/* ------------------------------------------------------------------ */

export interface ThirdPartyScriptsProps {
  gaId?: string;
  gtmId?: string;
  adSenseSlotId?: string;
}

export function ThirdPartyScripts({
  gaId,
  gtmId,
  adSenseSlotId,
}: ThirdPartyScriptsProps) {
  const [prefs, setPrefs] = useState<CookiePreferences | null>(null);

  useEffect(() => {
    setPrefs(readPreferences());

    const handleUpdate = () => setPrefs(readPreferences());
    window.addEventListener(UPDATE_EVENT, handleUpdate);
    return () => window.removeEventListener(UPDATE_EVENT, handleUpdate);
  }, []);

  if (!prefs) return null;

  return (
    <>
      {prefs.analytics && gaId && (
        <>
          <link rel="preconnect" href="https://www.googletagmanager.com" />
          <link rel="preconnect" href="https://www.google-analytics.com" />
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}', { page_path: window.location.pathname });`,
            }}
          />
        </>
      )}

      {prefs.analytics && gtmId && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
        />
      )}

      {prefs.marketing && (
        <Script
          id="adsense-script"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8154961694177774"
          async
          crossOrigin="anonymous"
        />
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  CookieConsentBanner — fixed, solid, with a customize panel         */
/* ------------------------------------------------------------------ */

export function CookieConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (!localStorage.getItem(VISITED_KEY)) {
      // small delay so the entrance transition is visible instead of
      // the banner just "popping" in on first paint
      const timer = setTimeout(() => setShowBanner(true), 250);
      return () => clearTimeout(timer);
    }
  }, []);

  const finalize = (
    prefs: CookiePreferences,
    status: "accepted" | "rejected" | "customized"
  ) => {
    writePreferences(prefs, status);
    setShowBanner(false);
    setShowCustomize(false);
  };

  const acceptAll = () =>
    finalize({ necessary: true, analytics: true, marketing: true }, "accepted");

  const rejectAll = () =>
    finalize({ necessary: true, analytics: false, marketing: false }, "rejected");

  const saveCustom = () =>
    finalize({ necessary: true, analytics, marketing }, "customized");

  if (!mounted || !showBanner) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[1000] px-4 pb-4 sm:px-6 transition-all duration-300 ease-out ${
        showBanner ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface shadow-elevation-xl">
        {!showCustomize ? (
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-text">
                We value your privacy
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                We use cookies to enhance your browsing experience, serve
                personalized ads, and analyze our traffic. Choose what
                you&apos;re comfortable with.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setShowCustomize(true)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-secondary hover:text-text"
              >
                Customize
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-secondary"
              >
                Reject All
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5">
            <h3 className="text-sm font-semibold text-text">
              Manage cookie preferences
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Necessary cookies keep the site working and can&apos;t be turned
              off.
            </p>

            <div className="mt-4 space-y-2">
              <PreferenceRow
                title="Necessary"
                description="Required for core site functionality."
                checked
                disabled
              />
              <PreferenceRow
                title="Analytics"
                description="Helps us understand how visitors use the site."
                checked={analytics}
                onChange={setAnalytics}
              />
              <PreferenceRow
                title="Advertising"
                description="Used to show you relevant ads."
                checked={marketing}
                onChange={setMarketing}
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCustomize(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-secondary"
              >
                Back
              </button>
              <button
                type="button"
                onClick={saveCustom}
                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PreferenceRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <label
      className={`flex items-start justify-between gap-4 rounded-xl border border-border p-3 ${
        disabled ? "bg-surface-secondary" : "cursor-pointer hover:bg-surface-secondary"
      }`}
    >
      <div>
        <p className="text-sm font-medium text-text">{title}</p>
        <p className="text-xs text-muted">{description}</p>
      </div>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-primary-600 disabled:opacity-50"
      />
    </label>
  );
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    adsbygoogle: unknown[];
  }
}
