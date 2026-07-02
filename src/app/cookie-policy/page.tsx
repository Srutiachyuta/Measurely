import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import type { BreadcrumbItem } from "@/types";
import { AdSlot } from "@/components/AdSlot";
import { ABOUT_BOTTOM } from "@/config/adPlacements";

export const metadata: Metadata = {
  title: `Cookie Policy | ${SITE_CONFIG.name}`,
  description: `${SITE_CONFIG.name} Cookie Policy — Learn how we use cookies and similar tracking technologies. Understand your choices and how to manage cookie preferences.`,
  openGraph: {
    title: `Cookie Policy | ${SITE_CONFIG.name}`,
    description: `${SITE_CONFIG.name} Cookie Policy — learn about cookies, analytics, and advertising technologies used on our website.`,
    url: `${SITE_CONFIG.url}/cookie-policy`,
  },
  twitter: {
    title: `Cookie Policy | ${SITE_CONFIG.name}`,
    description: `${SITE_CONFIG.name} Cookie Policy — learn about cookies, analytics, and advertising technologies used on our website.`,
  },
  alternates: { canonical: `${SITE_CONFIG.url}/cookie-policy` },
  keywords: [
    "cookie policy", "cookie consent", "browser cookies",
    "google analytics cookies", "adsense cookies", "tracking technologies",
  ],
};

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Cookie Policy" },
];

export default function CookiePolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: SITE_CONFIG.name, url: SITE_CONFIG.url },
          { name: "Cookie Policy" },
        ]}
      />
      <WebPageJsonLd
        title={`Cookie Policy | ${SITE_CONFIG.name}`}
        description={`${SITE_CONFIG.name} Cookie Policy — learn about cookies, analytics, and advertising technologies used on our website.`}
        url={`${SITE_CONFIG.url}/cookie-policy`}
      />
      <div className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} className="mb-8" />
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Cookie <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-text-secondary">Last updated: June 20, 2026</p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Introduction</h2>
              <p className="text-text-secondary leading-relaxed">
                This Cookie Policy explains how {SITE_CONFIG.name} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) uses cookies and similar tracking technologies on our website.
                It explains what cookies are, why we use them, and how you can control and manage your cookie preferences.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                By using our website, you consent to the use of cookies in accordance with this policy.
                You have the right to accept or reject cookies at any time.
                For more information about how we handle your personal data, please see our{' '}
                <Link href="/privacy-policy" className="text-primary-500 hover:text-primary-400 transition-colors">Privacy Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">What Are Cookies?</h2>
              <p className="text-text-secondary leading-relaxed">
                Cookies are small text files that are placed on your device (computer, smartphone, tablet) when you visit a website.
                They are widely used to make websites work more efficiently, enhance user experience, and provide information to website owners.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                Cookies can be &ldquo;persistent&rdquo; (remain on your device for a set period) or &ldquo;session&rdquo; (deleted when you close your browser).
                They may be set by the website you visit (&ldquo;first-party cookies&rdquo;) or by third-party services we use (&ldquo;third-party cookies&rdquo;).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Types of Cookies We Use</h2>

              <h3 className="text-lg font-semibold text-text mb-2">Essential / Strictly Necessary Cookies</h3>
              <p className="text-text-secondary leading-relaxed">
                These cookies are necessary for the website to function properly and cannot be disabled in our systems.
                They are usually set only in response to actions you take, such as setting your privacy preferences, logging in, or filling in forms.
                You can set your browser to block these cookies, but some parts of the site may not function properly.
              </p>
              <p className="text-text-secondary leading-relaxed mt-2">
                <strong className="text-text">Examples:</strong> Cookie consent preference storage, session management, CSRF tokens.
              </p>

              <h3 className="text-lg font-semibold text-text mb-2 mt-6">Analytics and Performance Cookies</h3>
              <p className="text-text-secondary leading-relaxed">
                These cookies allow us to count visits, measure traffic sources, and understand how users interact with our website.
                This helps us improve the performance and usability of our services.
              </p>
              <p className="text-text-secondary leading-relaxed mt-2">
                We use <strong className="text-text">Google Analytics</strong> to collect and analyze this information.
                Google Analytics uses cookies to generate reports on website usage and activity.
                The data collected includes pages visited, time spent on site, browser type, and device information — but does not identify individual users.
              </p>
              <p className="text-text-secondary leading-relaxed mt-2">
                <strong className="text-text">Cookies used:</strong> <code>_ga</code>, <code>_gid</code>, <code>_gat</code>, <code>_ga_&lt;container-id&gt;</code>.
                These cookies have a typical lifespan of 24 hours to 2 years.
                Google Analytics data is retained for 26 months before automatic deletion.
              </p>

              <h3 className="text-lg font-semibold text-text mb-2 mt-6">Advertising and Targeting Cookies</h3>
              <p className="text-text-secondary leading-relaxed">
                These cookies are used to deliver relevant advertisements to you and measure the effectiveness of advertising campaigns.
                They track your browsing habits across websites and may share this information with advertisers.
              </p>
              <p className="text-text-secondary leading-relaxed mt-2">
                We use <strong className="text-text">Google AdSense</strong> to display advertisements on our website.
                AdSense uses cookies to serve personalized ads based on your interests and previous browsing behavior.
                You can opt out of personalized advertising by visiting{' '}
                <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 transition-colors">
                  Google&apos;s Ads Settings
                </a>.
              </p>
              <p className="text-text-secondary leading-relaxed mt-2">
                <strong className="text-text">Cookies used:</strong> <code>_gads</code>, <code>_gac_&lt;property-id&gt;</code>, <code>IDE</code> (DoubleClick), <code>test_cookie</code>.
              </p>

              <h3 className="text-lg font-semibold text-text mb-2 mt-6">Functional Cookies</h3>
              <p className="text-text-secondary leading-relaxed">
                These cookies enable enhanced functionality and personalization, such as remembering your preferences or settings.
                They may be set by us or by third-party providers whose services we have added to our pages.
              </p>
              <p className="text-text-secondary leading-relaxed mt-2">
                <strong className="text-text">Examples:</strong> Local storage for tool preferences, theme preference (light/dark mode).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Google Services</h2>
              <p className="text-text-secondary leading-relaxed">
                We use the following Google services on our website, each of which may set cookies on your device:
              </p>

              <h3 className="text-lg font-semibold text-text mb-2 mt-4">Google Analytics</h3>
              <p className="text-text-secondary leading-relaxed">
                Google Analytics is a web analytics service provided by Google LLC (&ldquo;Google&rdquo;).
                Google uses the data collected to track and examine the use of our website, prepare reports, and share them with other Google services.
                Google may use the collected data to contextualize and personalize ads of its own advertising network.
                Learn more at{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 transition-colors">
                  Google Privacy Policy
                </a>.
              </p>

              <h3 className="text-lg font-semibold text-text mb-2 mt-4">Google Tag Manager</h3>
              <p className="text-text-secondary leading-relaxed">
                Google Tag Manager is a tag management system that helps us deploy analytics and marketing tags on our website.
                Tag Manager itself is a cookie-less domain and does not set cookies.
                However, it triggers other tags (such as Google Analytics and AdSense) that may set cookies.
              </p>

              <h3 className="text-lg font-semibold text-text mb-2 mt-4">Google AdSense</h3>
              <p className="text-text-secondary leading-relaxed">
                Google AdSense is an advertising service that uses cookies to serve relevant advertisements to you.
                AdSense uses the <code>DoubleClick</code> cookie to serve and measure ads across the web.
                Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.
              </p>

              <h3 className="text-lg font-semibold text-text mb-2 mt-4">Consent Management</h3>
              <p className="text-text-secondary leading-relaxed">
                We use a cookie consent mechanism that stores your cookie preferences in your browser&apos;s local storage.
                Google Analytics, Google Tag Manager, and AdSense scripts will only load after you have given your explicit consent.
                Your consent preferences are stored in the <code>cookieConsent</code> local storage key.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Your Choices and Consent Management</h2>
              <p className="text-text-secondary leading-relaxed">
                When you first visit our website, you will see a cookie consent banner that allows you to accept or reject cookies.
                Your choice is stored locally in your browser, and analytics/advertising scripts will only load if you have accepted cookies.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                You can change your cookie preferences at any time. If you initially rejected cookies and later wish to accept them, or vice versa, you can:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-1 mt-2">
                <li>Clear your browser&apos;s local storage for our domain, which will cause the consent banner to reappear on your next visit.</li>
                <li>Adjust your browser settings as described below.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">How to Control Cookies in Your Browser</h2>
              <p className="text-text-secondary leading-relaxed">
                Most web browsers allow you to control cookies through their settings.
                You can choose to block all cookies, delete existing cookies, or receive a notification when a cookie is set.
                Please note that blocking certain cookies may impact your experience on our website and limit some functionality.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                You can find instructions for managing cookies in the most popular browsers at the following links:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-1 mt-2">
                <li>
                  <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 transition-colors">
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 transition-colors">
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 transition-colors">
                    Apple Safari
                  </a>
                </li>
                <li>
                  <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 transition-colors">
                    Microsoft Edge
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Opting Out of Google Analytics</h2>
              <p className="text-text-secondary leading-relaxed">
                You can opt out of Google Analytics tracking by installing the{' '}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 transition-colors">
                  Google Analytics Opt-Out Browser Add-on
                </a>.
                This add-on prevents Google Analytics from collecting data about your visits.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Opting Out of Personalized Ads</h2>
              <p className="text-text-secondary leading-relaxed">
                To opt out of personalized advertising from Google, visit{' '}
                <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 transition-colors">
                  Google&apos;s Ads Settings
                </a>.
                You can also opt out of third-party interest-based advertising through the{' '}
                <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 transition-colors">
                  Network Advertising Initiative Opt-Out page
                </a>{' '}
                or the{' '}
                <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 transition-colors">
                  Digital Advertising Alliance opt-out tool
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Changes to This Cookie Policy</h2>
              <p className="text-text-secondary leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices, legal requirements, or the cookies and technologies we use.
                When we make changes, we will update the &ldquo;Last updated&rdquo; date at the top of this page.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies and similar technologies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Contact Us</h2>
              <p className="text-text-secondary leading-relaxed">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-1 mt-2">
                <li>Email: <a href="mailto:hello@measurely.in" className="text-primary-500 hover:text-primary-400 transition-colors">hello@measurely.in</a></li>
                <li>Support: <a href="mailto:hello@measurely.in" className="text-primary-500 hover:text-primary-400 transition-colors">hello@measurely.in</a></li>
              </ul>
              <p className="text-text-secondary leading-relaxed mt-3">
                You may also visit our <Link href="/contact" className="text-primary-500 hover:text-primary-400 transition-colors">Contact Us</Link> page to send a message directly.
              </p>
            </section>

            <section className="pt-4 border-t border-border/40">
              <p className="text-sm text-text-secondary">
                <strong className="text-text">Related policies:</strong>{' '}
                <Link href="/privacy-policy" className="text-primary-500 hover:text-primary-400 transition-colors">Privacy Policy</Link>
                {' | '}
                <Link href="/terms" className="text-primary-500 hover:text-primary-400 transition-colors">Terms of Service</Link>
                {' | '}
                <Link href="/disclaimer" className="text-primary-500 hover:text-primary-400 transition-colors">Disclaimer</Link>
                {' | '}
                <Link href="/editorial-policy" className="text-primary-500 hover:text-primary-400 transition-colors">Editorial Policy</Link>
              </p>
            </section>
          </div>

          <AdSlot placement={ABOUT_BOTTOM} />
        </div>
      </div>
    </>
  );
}
