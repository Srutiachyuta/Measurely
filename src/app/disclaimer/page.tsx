import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import type { BreadcrumbItem } from "@/types";
import { AdSlot } from "@/components/AdSlot";
import { DISCLAIMER_BOTTOM as AD_BOTTOM } from "@/config/adPlacements";

export const metadata: Metadata = {
  title: `Disclaimer | ${SITE_CONFIG.name}`,
  description: `${SITE_CONFIG.name} Disclaimer — Important information about the use of our calculators, converters, and tools. Results are for informational and educational purposes only.`,
  openGraph: {
    title: `Disclaimer | ${SITE_CONFIG.name}`,
    description: `${SITE_CONFIG.name} Disclaimer — important information about the use of our calculators, converters, and tools.`,
    url: `${SITE_CONFIG.url}/disclaimer`,
  },
  twitter: {
    title: `Disclaimer | ${SITE_CONFIG.name}`,
    description: `${SITE_CONFIG.name} Disclaimer — important information about the use of our calculators, converters, and tools.`,
  },
  alternates: { canonical: `${SITE_CONFIG.url}/disclaimer` },
  keywords: [
    "disclaimer", "measurely disclaimer", "calculator disclaimer",
    "online tool disclaimer", "affiliate disclosure",
  ],
};

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Disclaimer" },
];

export default function DisclaimerPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: SITE_CONFIG.name, url: SITE_CONFIG.url },
          { name: "Disclaimer" },
        ]}
      />
      <WebPageJsonLd
        title={`Disclaimer | ${SITE_CONFIG.name}`}
        description={`${SITE_CONFIG.name} Disclaimer — important information about the use of our calculators, converters, and tools.`}
        url={`${SITE_CONFIG.url}/disclaimer`}
      />
      <div className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} className="mb-8" />
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              <span className="text-gradient">Disclaimer</span>
            </h1>
            <p className="text-text-secondary">Last updated: June 20, 2026</p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-text mb-4">General Information</h2>
              <p className="text-text-secondary leading-relaxed">
                The calculators, converters, tools, and content provided on {SITE_CONFIG.name} are for general informational and educational purposes only.
                While we strive to ensure the accuracy and reliability of all information presented, we make no representations or warranties of any kind, express or implied, regarding the completeness, accuracy, reliability, suitability, or availability of the results, content, or related graphics.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                Any reliance you place on the information or results obtained from our tools is strictly at your own risk.
                We disclaim all liability for any loss or damage arising from the use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Not Professional Advice</h2>
              <p className="text-text-secondary leading-relaxed">
                The information provided by our calculators, converters, and tools should not be considered or used as a substitute for professional advice.
                You should always consult with a qualified professional for decisions that may impact your health, finances, legal rights, or safety.
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-1 mt-4">
                <li><strong className="text-text">Financial calculators</strong> (EMI, loan, SIP, GST, tax, etc.) provide estimates only. Consult a certified financial advisor or accountant for financial decisions.</li>
                <li><strong className="text-text">Health calculators</strong> (BMI, BMR, body fat, calorie, etc.) are for reference only and do not replace professional medical advice, diagnosis, or treatment.</li>
                <li><strong className="text-text">Engineering calculators</strong> (Ohm&apos;s Law, voltage divider, etc.) are educational tools. Always verify with licensed professionals for real-world applications.</li>
                <li><strong className="text-text">Construction calculators</strong> (concrete, paint, tile, roofing, etc.) provide material estimates. Actual requirements may vary due to site-specific conditions.</li>
                <li><strong className="text-text">Unit converters</strong> use standard conversion factors but may exhibit minor rounding differences. Critical conversions should be independently verified.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Accuracy of Information</h2>
              <p className="text-text-secondary leading-relaxed">
                We use industry-standard formulas and regularly audit our calculations to ensure accuracy.
                However, we cannot guarantee that results are error-free or that our tools will meet your specific requirements.
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-1 mt-4">
                <li>Results may contain rounding errors due to differences in precision handling.</li>
                <li>Different calculation methods or conventions may yield slightly different results.</li>
                <li>Currency converters use approximate exchange rates and may not reflect real-time market rates.</li>
                <li>Tax calculators are based on applicable tax laws that may change. Always verify with current regulations.</li>
                <li>We are not responsible for any losses, claims, or damages resulting from the use of our tools or reliance on our content.</li>
              </ul>
              <p className="text-text-secondary leading-relaxed mt-3">
                We strongly recommend verifying critical calculations with a qualified professional before making any decisions based on our results.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">No Guarantees</h2>
              <p className="text-text-secondary leading-relaxed">
                {SITE_CONFIG.name} provides its services on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis.
                We make no guarantees regarding:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-1 mt-2">
                <li>The uninterrupted availability or error-free operation of our tools.</li>
                <li>The accuracy, completeness, or timeliness of any information provided.</li>
                <li>The suitability of our tools for any specific purpose or use case.</li>
                <li>The security of our website against unauthorized access, viruses, or other harmful components.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">External Links</h2>
              <p className="text-text-secondary leading-relaxed">
                Our website may contain links to external websites, advertisements, or third-party services that are not owned, operated, or controlled by us.
                We do not endorse, approve, or assume responsibility for the content, accuracy, privacy practices, or opinions expressed on any third-party websites.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                By using our website, you acknowledge and agree that we are not responsible for any loss or damage incurred as a result of your use of any third-party links.
                We encourage you to review the terms and policies of any third-party websites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Affiliate Disclosure</h2>
              <p className="text-text-secondary leading-relaxed">
                {SITE_CONFIG.name} may participate in affiliate marketing programs, including but not limited to Google AdSense.
                When you click on advertisements or affiliate links on our website, we may earn a commission at no additional cost to you.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                Our participation in affiliate programs does not influence the content, tools, or information we provide.
                We only promote services and products that we believe may be useful to our users.
                Affiliate links are disclosed where applicable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Testimonials Disclaimer</h2>
              <p className="text-text-secondary leading-relaxed">
                Testimonials and reviews displayed on {SITE_CONFIG.name} are individual experiences and results may vary.
                Testimonials are not intended to represent or guarantee that current or future users will achieve the same or similar results.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                Some testimonials may have been edited for clarity or brevity.
                We are not affiliated with any individuals providing testimonials unless explicitly stated.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Fair Use</h2>
              <p className="text-text-secondary leading-relaxed">
                Some content on {SITE_CONFIG.name} may include copyrighted material not specifically authorized by the copyright owner.
                We make such material available for educational and informational purposes, which constitutes &ldquo;fair use&rdquo; under applicable copyright laws.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                If you believe that any content on our website infringes upon your copyright, please contact us with the relevant details and we will address your concern promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Changes to This Disclaimer</h2>
              <p className="text-text-secondary leading-relaxed">
                We reserve the right to update, modify, or change this disclaimer at any time without prior notice.
                Changes will be effective immediately upon posting to this page.
                We encourage you to review this page periodically for any updates.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                Your continued use of {SITE_CONFIG.name} after any changes constitutes your acceptance of the revised disclaimer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Contact Us</h2>
              <p className="text-text-secondary leading-relaxed">
                If you have any questions or concerns about this disclaimer, please contact us:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-1 mt-2">
                <li>Email: <a href="mailto:hello@measurely.in" className="text-primary-500 hover:text-primary-400 transition-colors">hello@measurely.in</a></li>
                <li>Support: <a href="mailto:hello@measurely.in" className="text-primary-500 hover:text-primary-400 transition-colors">hello@measurely.in</a></li>
              </ul>
              <p className="text-text-secondary leading-relaxed mt-3">
                You may also visit our <Link href="/contact" className="text-primary-500 hover:text-primary-400 transition-colors">Contact Us</Link> page.
              </p>
            </section>

            <section className="pt-4 border-t border-border/40">
              <p className="text-sm text-text-secondary">
                <strong className="text-text">Related policies:</strong>{' '}
                <Link href="/privacy-policy" className="text-primary-500 hover:text-primary-400 transition-colors">Privacy Policy</Link>
                {' | '}
                <Link href="/terms" className="text-primary-500 hover:text-primary-400 transition-colors">Terms of Service</Link>
                {' | '}
                <Link href="/cookie-policy" className="text-primary-500 hover:text-primary-400 transition-colors">Cookie Policy</Link>
                {' | '}
                <Link href="/editorial-policy" className="text-primary-500 hover:text-primary-400 transition-colors">Editorial Policy</Link>
              </p>
            </section>
          </div>

          <AdSlot placement={AD_BOTTOM} />
        </div>
      </div>
    </>
  );
}
