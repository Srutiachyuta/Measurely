import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import type { BreadcrumbItem } from "@/types";
import { AdSlot } from "@/components/AdSlot";
import { ABOUT_BOTTOM } from "@/config/adPlacements";

export const metadata: Metadata = {
  title: `Editorial Policy | ${SITE_CONFIG.name}`,
  description: `${SITE_CONFIG.name} editorial policy — how we create, review, and maintain accurate calculators, converters, and content.`,
  openGraph: {
    title: `Editorial Policy | ${SITE_CONFIG.name}`,
    description: `${SITE_CONFIG.name} editorial policy governing content accuracy and review processes.`,
    url: `${SITE_CONFIG.url}/editorial-policy`,
  },
  twitter: {
    title: `Editorial Policy | ${SITE_CONFIG.name}`,
    description: `${SITE_CONFIG.name} editorial policy governing content accuracy and review processes.`,
  },
  alternates: { canonical: `${SITE_CONFIG.url}/editorial-policy` },
  keywords: ["editorial policy", "content accuracy", "measurely editorial"],
};

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Editorial Policy" },
];

export default function EditorialPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }, { name: "Editorial Policy" }]} />
      <WebPageJsonLd title={`Editorial Policy | ${SITE_CONFIG.name}`} description={`${SITE_CONFIG.name} editorial policy governing content accuracy and review processes.`} url={`${SITE_CONFIG.url}/editorial-policy`} />
      <div className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} className="mb-8" />
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Editorial <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-text-secondary">Last updated: June 19, 2026</p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Our Commitment to Accuracy</h2>
              <p className="text-text-secondary leading-relaxed">
                At {SITE_CONFIG.name}, we are committed to providing accurate, reliable, and up-to-date 
                calculators, converters, and educational content. This editorial policy outlines the 
                standards and processes we follow to maintain the quality and trustworthiness of every 
                tool and article on our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Content Creation</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                All calculators and converters are built using well-established mathematical formulas and 
                industry-standard conversion factors. The key principles guiding content creation are:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li><strong className="text-text">Formula verification:</strong> Every calculation is cross-checked against authoritative sources — financial formulas follow standard time-value-of-money principles, health metrics use WHO and peer-reviewed medical guidelines, and unit conversions reference NIST and BIPM standards.</li>
                <li><strong className="text-text">Test-case validation:</strong> Each tool includes predefined test cases with known outputs to verify correctness across normal, edge, and boundary conditions.</li>
                <li><strong className="text-text">Real-world relevance:</strong> Tools are designed around practical use cases identified through user feedback and common calculation needs.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Review and Testing</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Before any tool or article is published, it undergoes a review process:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li><strong className="text-text">Functional testing:</strong> Inputs, outputs, edge cases, and error handling are tested across multiple scenarios.</li>
                <li><strong className="text-text">Formula audit:</strong> The underlying mathematics is reviewed to ensure correct implementation of the source formula.</li>
                <li><strong className="text-text">Content review:</strong> Blog articles and tool descriptions are checked for factual accuracy, clarity, and usefulness.</li>
                <li><strong className="text-text">Cross-browser testing:</strong> Tools are tested on major browsers (Chrome, Firefox, Safari, Edge) and devices (desktop, tablet, mobile).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Updates and Maintenance</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We continuously maintain and improve our tools and content:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li><strong className="text-text">Regular audits:</strong> Calculation accuracy is periodically re-verified to catch any regression or precision issues.</li>
                <li><strong className="text-text">Timely updates:</strong> Tax slabs, interest rates, and regulatory references are updated when new rules take effect. Blog posts include an &ldquo;updated&rdquo; date to reflect changes.</li>
                <li><strong className="text-text">User feedback:</strong> Reports of inaccuracies or suggestions for improvement are reviewed and addressed promptly — typically within 24&ndash;48 hours.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Transparency</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                We believe in being transparent about how our tools work:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-2">
                <li>Every calculator and converter displays the formula or methodology it uses in the &ldquo;Formula Used&rdquo; or &ldquo;How the Conversion Works&rdquo; section.</li>
                <li>Blog articles cite sources and reference the tools they discuss.</li>
                <li>We clearly distinguish between informational content and professional advice through our disclaimers.</li>
                <li>Any changes to our editorial policy will be reflected with an updated date at the top of this page.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">User Feedback</h2>
              <p className="text-text-secondary leading-relaxed">
                We welcome input from our users. If you notice an error, have a suggestion for improvement, 
                or want to request a new tool, please email us at{' '}
                <a href="mailto:hello@measurely.in" className="text-primary-500 hover:text-primary-400 transition-colors">
                  hello@measurely.in
                </a>. 
                We review every submission and incorporate feedback into our development roadmap.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Contact</h2>
              <p className="text-text-secondary leading-relaxed">
                Questions about this editorial policy can be directed to{' '}
                <a href="mailto:hello@measurely.in" className="text-primary-500 hover:text-primary-400 transition-colors">
                  hello@measurely.in
                </a>.
              </p>
            </section>
          </div>

          {/* Related policies */}
          <div className="mt-12 p-6 rounded-2xl border border-border/60 bg-surface">
            <h2 className="text-lg font-semibold text-text mb-4">Related Policies</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link href="/privacy-policy" className="text-sm text-primary-500 hover:text-primary-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-primary-500 hover:text-primary-400 transition-colors">Terms &amp; Conditions</Link>
              <Link href="/disclaimer" className="text-sm text-primary-500 hover:text-primary-400 transition-colors">Disclaimer</Link>
              <Link href="/cookie-policy" className="text-sm text-primary-500 hover:text-primary-400 transition-colors">Cookie Policy</Link>
              <Link href="/about" className="text-sm text-primary-500 hover:text-primary-400 transition-colors">About Us</Link>
              <Link href="/contact" className="text-sm text-primary-500 hover:text-primary-400 transition-colors">Contact Us</Link>
            </div>
          </div>

          <AdSlot placement={ABOUT_BOTTOM} />
        </div>
      </div>
    </>
  );
}
