"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { SITE, SOCIAL_LINKS, CONTACT_INFO } from "@/lib/constants";
import { FooterInstall } from "@/components/layout/footer-install";
import { Separator } from "@/components/ui/separator";

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.87.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.94 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.06 0zm4.96 7.22c.1 0 .32.03.47.14.1.09.16.2.17.33.02.09.04.3.02.47-.18 1.9-.96 6.5-1.36 8.63-.17.9-.5 1.2-.82 1.23-.7.06-1.22-.46-1.9-.9-1.05-.7-1.65-1.13-2.68-1.8-1.18-.78-.41-1.21.26-1.91.18-.19 3.25-2.98 3.31-3.23a.2.2 0 0 0-.06-.22.33.33 0 0 0-.25-.02c-.1.02-1.79 1.14-5.06 3.35-.48.33-.91.48-1.3.48-.43-.01-1.25-.24-1.87-.44-.75-.25-1.35-.38-1.3-.79.03-.22.33-.44.9-.66 3.5-1.53 5.83-2.53 7-3.02 3.33-1.38 4.02-1.63 4.47-1.63z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.18.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.52a5.4 5.4 0 0 0-.57 0c-.2 0-.52.07-.8.37-.27.3-1.03 1.02-1.03 2.48 0 1.46 1.06 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.48.71.31 1.26.5 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.3.18-1.42-.08-.12-.28-.2-.57-.35zm-5.42 7.4a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.5-5.26C2 8.08 6.44 3.64 11.89 3.64c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.89-9.89 9.89m8.42-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.94L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.48-8.41z" />
    </svg>
  );
}

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Categories", href: "/categories" },
  { label: "Blog", href: "/blog" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Editorial Policy", href: "/editorial-policy" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border/60 bg-surface overflow-hidden">
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      {/* Background decoration */}
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-accent-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 py-16 lg:py-20">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-6 group">
              <Image
                src="/logo-light.webp"
                alt={SITE.name}
                width={267}
                height={72}
                className="block dark:hidden h-[60px] sm:h-[72px] w-auto object-contain"
              />
              <Image
                src="/logo-dark.webp"
                alt={SITE.name}
                width={267}
                height={72}
                className="hidden dark:block h-[60px] sm:h-[72px] w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm mb-5">
              {SITE.tagline}. {SITE.description}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2.5 mb-6">
              {[
                { href: SOCIAL_LINKS.youtube, icon: YouTubeIcon, label: "YouTube" },
                { href: SOCIAL_LINKS.instagram, icon: InstagramIcon, label: "Instagram" },
                { href: SOCIAL_LINKS.telegram, icon: TelegramIcon, label: "Telegram" },
                { href: SOCIAL_LINKS.whatsapp, icon: WhatsAppIcon, label: "WhatsApp" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 text-muted hover:text-primary-500 hover:border-primary-500/30 hover:bg-primary-500/5 transition-all duration-200"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <p className="text-xs text-muted flex items-center gap-1">
              Built with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for the world
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-5 tracking-wide">Quick Links</h3>
            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary-500 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-5 tracking-wide">Legal</h3>
            <ul className="space-y-3.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary-500 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-text mb-5 tracking-wide">Company</h3>
            <ul className="space-y-3.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary-500 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Email contact */}
            <div className="mt-6">
              <p className="text-xs text-muted mb-2">Contact us</p>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="text-sm text-primary-500 hover:text-primary-400 transition-colors"
              >
                {CONTACT_INFO.email}
              </a>
            </div>
          </div>
        </div>

        <FooterInstall />

        <Separator className="bg-border/50" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-6">
          <p className="text-sm text-muted text-center">
            &copy; {currentYear} <span className="text-text font-medium">{SITE.name}</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
