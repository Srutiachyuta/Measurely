"use client";

import { useState } from "react";
import { Mail, CheckCircle2, AlertCircle, Send, Bell } from "lucide-react";
import { NEWSLETTER_FORM } from "@/lib/constants";

interface NewsletterProps {
  variant?: "sidebar" | "fullwidth";
}

export function Newsletter({ variant = "sidebar" }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const validate = (value: string) => {
    if (!value.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    const honeypot = (e.target as HTMLFormElement).querySelector<HTMLInputElement>('[name="honeypot"]');
    if (honeypot?.value) return;

    setSubmitting(true);
    setSubmitError(false);

    try {
      const formBody = new URLSearchParams();
      formBody.append(NEWSLETTER_FORM.fieldEmail, email);

      if (NEWSLETTER_FORM.actionUrl) {
  await fetch(NEWSLETTER_FORM.actionUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody.toString(),
  });
      }

      setSubmitted(true);
      setEmail("");
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (variant === "sidebar") {
    if (submitted) {
      return (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-accent-green/5 to-accent-green/10 dark:from-accent-green/10 dark:to-accent-green/20 border border-accent-green/20 text-center">
          <CheckCircle2 className="h-8 w-8 text-accent-green mx-auto mb-2" />
          <h3 className="font-semibold text-text mb-1">You&apos;re Subscribed!</h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            Thanks for subscribing. We&apos;ll send you the latest articles and guides.
          </p>
        </div>
      );
    }

    return (
      <div className="p-5 rounded-2xl bg-gradient-to-br from-primary-500/5 to-primary-600/5 dark:from-primary-500/10 dark:to-primary-600/10 border border-primary-500/20">
        <div className="flex items-center gap-2 mb-3">
          <Bell className="h-4 w-4 text-primary-500" />
          <h3 className="font-semibold text-text text-sm">Subscribe to Our Newsletter</h3>
        </div>
        <p className="text-xs text-text-secondary mb-3 leading-relaxed">
          Get the latest articles and guides delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="honeypot"
            className="absolute -left-[9999px] -top-[9999px]"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <label htmlFor="newsletter-email-sidebar" className="sr-only">Email address</label>
          <input
            id="newsletter-email-sidebar"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            placeholder="Your email"
            className="w-full px-3 py-2.5 rounded-lg border border-border/60 bg-surface text-text placeholder:text-text-secondary/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 mb-2"
            aria-invalid={!!error}
            aria-describedby={error ? "sidebar-email-error" : undefined}
          />
          {error && (
            <p id="sidebar-email-error" className="text-xs text-red-500 flex items-center gap-1 mb-2">
              <AlertCircle className="h-3 w-3 shrink-0" />
              {error}
            </p>
          )}
          {submitError && (
            <p className="text-xs text-red-500 mb-2">Subscription failed. Please try again.</p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1.5"
          >
            {submitting ? (
              <span className="flex items-center gap-1.5">
                <span className="h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Subscribing...
              </span>
            ) : (
              <><Send className="h-3.5 w-3.5" /> Subscribe</>
            )}
          </button>
          <p className="text-[10px] text-text-secondary/60 mt-2 text-center leading-relaxed">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="text-center py-16 sm:py-20">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-green/10 text-accent-green mx-auto mb-5">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-text mb-3">You&apos;re In!</h2>
          <p className="text-text-secondary mb-6">
            Thanks for subscribing. We&apos;ll send you the latest articles, guides, and new tool announcements.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-all"
          >
            Subscribe Another Email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-primary-500/[0.03] to-primary-600/[0.03] dark:from-primary-500/[0.06] dark:to-primary-600/[0.06] overflow-hidden">
      <div className="max-w-2xl mx-auto px-6 sm:px-10 py-14 sm:py-20 text-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-500/10 text-primary-500 mx-auto mb-5">
          <Mail className="h-7 w-7" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-text mb-3">
          Stay Updated
        </h2>
        <p className="text-text-secondary mb-7 max-w-md mx-auto leading-relaxed">
          Get the latest articles, guides, and new tool announcements delivered straight to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="text"
            name="honeypot"
            className="absolute -left-[9999px] -top-[9999px]"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <div className="flex-1 relative">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="Enter your email address"
              className="w-full h-12 rounded-xl border border-border/60 bg-surface px-4 text-sm text-text placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
              aria-invalid={!!error}
              aria-describedby={error ? "full-email-error" : undefined}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="h-12 px-6 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-primary-500/20"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Subscribing...
              </span>
            ) : (
              <><Send className="h-4 w-4" /> Subscribe</>
            )}
          </button>
        </form>
        {error && (
          <p id="full-email-error" className="text-xs text-red-500 flex items-center justify-center gap-1 mt-3">
            <AlertCircle className="h-3 w-3 shrink-0" />
            {error}
          </p>
        )}
        {submitError && (
          <p className="text-xs text-red-500 mt-3">Subscription failed. Please try again.</p>
        )}
        <p className="text-xs text-text-secondary/60 mt-4 leading-relaxed">
          Your email is used only to send you updates. No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
