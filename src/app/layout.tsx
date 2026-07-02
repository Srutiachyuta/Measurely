import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SITE, DEFAULT_SEO } from "@/lib/constants";
import { Providers } from "@/components/layout/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
//import { InstallPrompt } from "@/components/pwa/install-prompt";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
//import SearchCommand from "@/components/layout/search-command";
import { SearchCommandLoader } from "@/components/layout/search-command-loader";
import { WebsiteJsonLd, OrganizationJsonLd } from "@/components/seo/json-ld";
import { Analytics } from "@/components/seo/analytics";
import { ThirdPartyScripts, CookieConsentBanner } from "@/lib/thirdPartyScripts";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: DEFAULT_SEO.title,
    template: `%s | ${SITE.name}`,
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
  alternates: {
    canonical: SITE.url,
    languages: {
      "en": SITE.url,
    },
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
    <html lang="en" dir="ltr" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
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
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
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
          <ScrollToTop />
          <Navbar />
          <main id="main-content" className="flex-1 pt-16" role="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <SearchCommandLoader />
          {/*<InstallPrompt />*/}
          <CookieConsentBanner />
        </Providers>
      </body>
    </html>
  );
}
