import type { Metadata, Viewport } from "next";
import { SITE, DEFAULT_SEO } from "@/lib/constants";
import { Providers } from "@/components/layout/providers";
import { SiteShell } from "@/components/layout/site-shell";
import { WebsiteJsonLd, OrganizationJsonLd } from "@/components/seo/json-ld";
import { Analytics } from "@/components/seo/analytics";
import { ThirdPartyScripts } from "@/lib/thirdPartyScripts";
import "./globals.css";


export const metadata: Metadata = {
  title: {
    default: DEFAULT_SEO.title,
    template: "%s",
  },
  description: DEFAULT_SEO.description,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.author }],
  creator: SITE.author,
  publisher: SITE.author,
  metadataBase: new URL(SITE.url),
  openGraph: {
    ...DEFAULT_SEO.openGraph,
    locale: "en_US",
    siteName: SITE.siteName,
  },
  twitter: {
    ...DEFAULT_SEO.twitter,
    card: "summary_large_image",
  },
  robots: {
    ...DEFAULT_SEO.robots,
    index: true,
    follow: true,
  },

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "google-site-verification": "mu1iRPof4O2Ux3CmG8SJ1JxrTPw6e3AZNDLgf2DXWM4",
    "msvalidate.01": "3E5E5C8B7A6F4D2E9B0A1C3D5E7F9B0",
    "referrer": "origin-when-cross-origin",
    "format-detection": "telephone=no, address=no, email=no",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className="h-full antialiased" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script id="measurely-adsense" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8154961694177774" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={SITE.name} />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content={SITE.name} />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="msapplication-TileImage" content="/icon-192.png" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="google-adsense-account" content="ca-pub-8154961694177774" />
        <WebsiteJsonLd />
        <OrganizationJsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-surface-secondary text-text">
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:px-4 focus-visible:py-2 focus-visible:bg-primary-600 focus-visible:text-white focus-visible:rounded-lg focus-visible:shadow-lg focus-visible:outline-none"
        >
          Skip to main content
        </a>
        <Providers>
          <Analytics />
          <ThirdPartyScripts
            gaId={process.env.NEXT_PUBLIC_GA_ID}
            gtmId={process.env.NEXT_PUBLIC_GTM_ID}
            adSenseSlotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID}
          />
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
