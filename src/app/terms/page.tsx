import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import type { BreadcrumbItem } from "@/types";
import { AdSlot } from "@/components/AdSlot";
import { TERMS_BOTTOM as AD_BOTTOM } from "@/config/adPlacements";

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_CONFIG.name}`,
  description: `${SITE_CONFIG.name} Terms of Service — Please read these terms carefully before using our calculators and website. Governs use, liability, and your legal rights.`,
  openGraph: {
    title: `Terms of Service | ${SITE_CONFIG.name}`,
    description: `${SITE_CONFIG.name} Terms of Service governing the use of our calculators and website services.`,
    url: `${SITE_CONFIG.url}/terms`,
  },
  twitter: {
    title: `Terms of Service | ${SITE_CONFIG.name}`,
    description: `${SITE_CONFIG.name} Terms of Service governing the use of our calculators and website services.`,
  },
  alternates: { canonical: `${SITE_CONFIG.url}/terms` },
  keywords: [
    "terms of service", "terms and conditions", "acceptable use",
    "measurely terms", "website terms", "user agreement",
  ],
};

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Terms of Service" },
];

export default function TermsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: SITE_CONFIG.name, url: SITE_CONFIG.url },
          { name: "Terms of Service" },
        ]}
      />
      <WebPageJsonLd
        title={`Terms of Service | ${SITE_CONFIG.name}`}
        description={`${SITE_CONFIG.name} Terms of Service governing the use of our calculators and website services.`}
        url={`${SITE_CONFIG.url}/terms`}
      />
      <div className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} className="mb-8" />
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Terms of <span className="text-gradient">Service</span>
            </h1>
            <p className="text-text-secondary">Last updated: June 20, 2026</p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Acceptance of Terms</h2>
              <p className="text-text-secondary leading-relaxed">
                By accessing or using {SITE_CONFIG.name} (the &ldquo;Website&rdquo;), you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;).
                If you do not agree with any part of these Terms, you must not use our Website or services.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                These Terms constitute a legally binding agreement between you (&ldquo;User&rdquo; or &ldquo;you&rdquo;) and {SITE_CONFIG.name} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;).
                By using our calculators, tools, or any other content on this Website, you acknowledge that you have read, understood, and agree to be bound by these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Eligibility</h2>
              <p className="text-text-secondary leading-relaxed">
                By using our services, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-1 mt-2">
                <li>You are at least 13 years of age (or the age of digital consent in your country of residence).</li>
                <li>You have the legal capacity to enter into a binding agreement.</li>
                <li>You are not located in a country that is subject to a U.S. government embargo or that has been designated as a &ldquo;terrorist-supporting&rdquo; country.</li>
                <li>You are not listed on any U.S. government list of prohibited or restricted parties.</li>
              </ul>
              <p className="text-text-secondary leading-relaxed mt-3">
                If you are under 13, you may use our Website only under the supervision of a parent or legal guardian.
                No account registration is required to use our tools.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Description of Service</h2>
              <p className="text-text-secondary leading-relaxed">
                {SITE_CONFIG.name} provides free online calculators across various categories including finance, health, math, engineering, construction, and everyday life.
                All tools are provided for informational and educational purposes only.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                While we strive for accuracy, the results generated by our tools should not be used as a substitute for professional advice.
                We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Acceptable Use and Prohibited Activities</h2>
              <p className="text-text-secondary leading-relaxed">You agree to use our Website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul className="list-disc pl-6 text-text-secondary space-y-1 mt-2">
                <li>Use our services in any way that violates applicable local, state, national, or international laws or regulations.</li>
                <li>Attempt to disrupt, damage, or impair the functionality of our Website or servers, including through the use of viruses, malware, denial-of-service attacks, or other harmful code.</li>
                <li>Scrape, crawl, or extract data from our Website using automated means without our prior written consent.</li>
                <li>Reverse engineer, decompile, or disassemble any aspect of our Website or tools.</li>
                <li>Impersonate any person or entity, or falsely state or misrepresent your affiliation with any person or entity.</li>
                <li>Use our services for any fraudulent or deceptive purpose.</li>
                <li>Upload or transmit any content that is harmful, offensive, defamatory, or infringes upon the rights of others.</li>
                <li>Attempt to gain unauthorized access to any part of our Website, server, or database.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Intellectual Property Rights</h2>
              <p className="text-text-secondary leading-relaxed">
                All content, design, code, graphics, text, formulas, algorithms, and functionality on {SITE_CONFIG.name} are owned by us or our licensors and are protected by applicable intellectual property laws, including copyright, trademark, and patent laws.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                You are granted a limited, non-exclusive, non-transferable, revocable license to access and use our Website and tools for personal, non-commercial use.
                You may not reproduce, distribute, modify, create derivative works from, or publicly display any part of our Website without our prior written permission.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                The {SITE_CONFIG.name} name, logo, and related trademarks are our property.
                You may not use them without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">User Feedback and Submissions</h2>
              <p className="text-text-secondary leading-relaxed">
                We welcome your feedback, suggestions, and ideas for improving our services.
                By submitting feedback to us (via email, contact forms, or other channels), you grant us a non-exclusive, royalty-free, perpetual, irrevocable, and worldwide license to use, reproduce, modify, and incorporate your feedback for any purpose without compensation to you.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                You represent that your feedback does not infringe upon the rights of any third party.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Disclaimer of Warranties</h2>
              <p className="text-text-secondary leading-relaxed">
                Our services are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis, without warranties of any kind, either express or implied.
                To the fullest extent permitted by applicable law, we disclaim all warranties, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-1 mt-2">
                <li>Implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement.</li>
                <li>Warranties that our services will be uninterrupted, error-free, secure, or free of viruses or other harmful components.</li>
                <li>Warranties regarding the accuracy, reliability, or completeness of any calculation results, content, or information provided on our Website.</li>
              </ul>
              <p className="text-text-secondary leading-relaxed mt-3">
                No advice or information obtained by you from us or through our services shall create any warranty not expressly stated in these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Limitation of Liability</h2>
              <p className="text-text-secondary leading-relaxed">
                To the maximum extent permitted by applicable law, {SITE_CONFIG.name}, its owners, operators, employees, and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or relating to:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-1 mt-2">
                <li>Your use or inability to use our Website or services.</li>
                <li>Any errors or inaccuracies in calculation results or content.</li>
                <li>Any unauthorized access to or use of our servers and/or any personal information stored therein.</li>
                <li>Any interruption or cessation of transmission to or from our services.</li>
                <li>Any bugs, viruses, or other harmful code that may be transmitted to or through our services.</li>
                <li>Any loss or damage incurred as a result of your reliance on information obtained through our services.</li>
              </ul>
              <p className="text-text-secondary leading-relaxed mt-3">
                In no event shall our total liability to you exceed the amount you have paid us in the twelve (12) months preceding the claim.
                Since our services are provided free of charge, your sole remedy is to discontinue use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Indemnification</h2>
              <p className="text-text-secondary leading-relaxed">
                You agree to indemnify, defend, and hold harmless {SITE_CONFIG.name}, its owners, operators, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys&apos; fees) arising out of or related to:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-1 mt-2">
                <li>Your violation of these Terms.</li>
                <li>Your use or misuse of our services.</li>
                <li>Your violation of any applicable law or the rights of any third party.</li>
                <li>Any content or information you submit to us.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Third-Party Links and Services</h2>
              <p className="text-text-secondary leading-relaxed">
                Our Website may contain links to third-party websites, advertisements, or services that are not owned or controlled by us.
                We are not responsible for the content, privacy practices, or terms of any third-party websites.
                Your interactions with third-party sites are solely between you and the third party.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                We encourage you to review the terms and privacy policies of any third-party websites you visit.
                The inclusion of any link does not imply endorsement by us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Termination</h2>
              <p className="text-text-secondary leading-relaxed">
                We reserve the right to terminate or suspend your access to our services at any time, without prior notice or liability, for any reason, including if you breach these Terms.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                Upon termination, your right to use our services will immediately cease.
                All provisions of these Terms that by their nature should survive termination shall survive, including but not limited to intellectual property provisions, disclaimers, indemnification, and limitations of liability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Governing Law and Dispute Resolution</h2>
              <p className="text-text-secondary leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of India.
                Any disputes arising out of or relating to these Terms or your use of our services shall be resolved through binding arbitration in Bhubaneswar, Odisha, India.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                You agree to waive any right to participate in a class-action lawsuit or class-wide arbitration.
                Any claim or cause of action arising out of these Terms must be filed within one (1) year after such claim or cause of action arose, or it shall be forever barred.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Changes to These Terms</h2>
              <p className="text-text-secondary leading-relaxed">
                We reserve the right to modify or replace these Terms at any time.
                Changes will be effective immediately upon posting to this page.
                We will update the &ldquo;Last updated&rdquo; date at the top of this page.
                For material changes, we will provide a prominent notice on our website.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                Your continued use of our services after any changes constitutes your acceptance of the new Terms.
                If you do not agree with the revised Terms, you must stop using our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Contact Us</h2>
              <p className="text-text-secondary leading-relaxed">
                If you have any questions about these Terms, please contact us:
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
                <Link href="/disclaimer" className="text-primary-500 hover:text-primary-400 transition-colors">Disclaimer</Link>
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
