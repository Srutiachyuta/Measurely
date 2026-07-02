import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/json-ld";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import type { BreadcrumbItem } from "@/types";
import { AdSlot } from "@/components/AdSlot";
import { PRIVACY_BOTTOM } from "@/config/adPlacements";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_CONFIG.name}`,
  description: `${SITE_CONFIG.name} Privacy Policy — Learn how we collect, use, disclose, and safeguard your personal information when you use our calculators and website.`,
  openGraph: {
    title: `Privacy Policy | ${SITE_CONFIG.name}`,
    description: `${SITE_CONFIG.name} Privacy Policy — how we collect, use, and protect your personal information.`,
    url: `${SITE_CONFIG.url}/privacy-policy`,
  },
  twitter: {
    title: `Privacy Policy | ${SITE_CONFIG.name}`,
    description: `${SITE_CONFIG.name} Privacy Policy — how we collect, use, and protect your personal information.`,
  },
  alternates: { canonical: `${SITE_CONFIG.url}/privacy-policy` },
  keywords: [
    "privacy policy", "data protection", "gdpr", "ccpa", "cookie consent",
    "measurely privacy", "personal information", "data privacy",
  ],
};

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Privacy Policy" },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: SITE_CONFIG.name, url: SITE_CONFIG.url },
          { name: "Privacy Policy" },
        ]}
      />
      <WebPageJsonLd
        title={`Privacy Policy | ${SITE_CONFIG.name}`}
        description={`${SITE_CONFIG.name} Privacy Policy — how we collect, use, and protect your personal information.`}
        url={`${SITE_CONFIG.url}/privacy-policy`}
      />
      <div className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} className="mb-8" />
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-text-secondary">Last updated: June 20, 2026</p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Introduction</h2>
              <p className="text-text-secondary leading-relaxed">
                {SITE_CONFIG.name} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our calculators and other tools.
              </p>
              <p className="text-text-secondary leading-relaxed mt-4">
                By accessing or using {SITE_CONFIG.name}, you agree to the collection and use of information in accordance with this policy.
                If you do not agree with any part of this Privacy Policy, please discontinue use of our services immediately.
              </p>
              <p className="text-text-secondary leading-relaxed mt-4">
                This policy complies with applicable data protection laws, including the General Data Protection Regulation (GDPR) for users in the European Economic Area and the California Consumer Privacy Act (CCPA) for users in California, United States.
                Please read this policy carefully to understand your rights and our practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Information We Collect</h2>

              <h3 className="text-lg font-semibold text-text mb-2">Personal Information You Provide</h3>
              <p className="text-text-secondary leading-relaxed">
                We collect personal information that you voluntarily provide when you interact with our website, including:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-1 mt-2">
                <li>Contacting us through our contact form or email</li>
                <li>Subscribing to our newsletter or email updates</li>
                <li>Submitting feedback, suggestions, or support requests</li>
                <li>Participating in surveys or promotional activities</li>
              </ul>
              <p className="text-text-secondary leading-relaxed mt-3">
                This information may include your name, email address, phone number, and any other details you choose to share with us.
                We do not require you to create an account or provide personal information to use our calculators.
              </p>

              <h3 className="text-lg font-semibold text-text mb-2 mt-6">Information Collected Automatically</h3>
              <p className="text-text-secondary leading-relaxed">
                When you visit {SITE_CONFIG.name}, we automatically collect certain information about your device and browsing activity, including:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-1 mt-2">
                <li>Browser type, version, and language preferences</li>
                <li>Operating system and device type</li>
                <li>Pages you visit and how you interact with them</li>
                <li>Time and date of your visits</li>
                <li>Referral URL (the website you came from)</li>
                <li>Internet Protocol (IP) address and approximate geographic location</li>
              </ul>
              <p className="text-text-secondary leading-relaxed mt-3">
                This information is collected using cookies, web beacons, and similar tracking technologies, as described in the <Link href="/cookie-policy" className="text-primary-500 hover:text-primary-400 transition-colors">Cookie Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">How We Use Your Information</h2>
              <p className="text-text-secondary leading-relaxed">We use the information we collect for the following purposes:</p>
              <ul className="list-disc pl-6 text-text-secondary space-y-1 mt-2">
                <li><strong className="text-text">Providing and improving our services:</strong> To operate our calculators and tools, and to enhance their functionality and user experience.</li>
                <li><strong className="text-text">Communication:</strong> To respond to your inquiries, support requests, and feedback. If you subscribe, we may send you newsletters or updates about new tools and features.</li>
                <li><strong className="text-text">Analytics and performance:</strong> To analyze usage patterns, detect technical issues, and optimize the performance and reliability of our website.</li>
                <li><strong className="text-text">Advertising:</strong> To serve relevant advertisements through Google AdSense and measure the effectiveness of ad campaigns. See our <Link href="/cookie-policy" className="text-primary-500 hover:text-primary-400 transition-colors">Cookie Policy</Link> for details.</li>
                <li><strong className="text-text">Legal compliance:</strong> To comply with applicable laws, regulations, and legal processes.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-text-secondary leading-relaxed">
                We use cookies and similar tracking technologies (such as web beacons, pixels, and local storage) to enhance your browsing experience, analyze traffic, and serve personalized advertisements.
                Cookies are small text files stored on your device by your web browser.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                For a detailed explanation of the types of cookies we use, why we use them, and how you can control them, please read our separate{' '}
                <Link href="/cookie-policy" className="text-primary-500 hover:text-primary-400 transition-colors">Cookie Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Google Analytics, Google Tag Manager, and AdSense</h2>
              <p className="text-text-secondary leading-relaxed">
                We use the following Google services on our website. Each of these services may collect information about your browsing activity through cookies and other tracking technologies:
              </p>

              <h3 className="text-lg font-semibold text-text mb-2 mt-4">Google Analytics</h3>
              <p className="text-text-secondary leading-relaxed">
                Google Analytics is a web analytics service provided by Google LLC that tracks and reports website traffic.
                Google uses the data collected to monitor and analyze the use of our website, compile reports on website activity, and share them with other Google services.
                Google may use the collected data to contextualize and personalize ads of its own advertising network.
                You can learn more about Google Analytics privacy practices at{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 transition-colors">
                  https://policies.google.com/privacy
                </a>.
              </p>

              <h3 className="text-lg font-semibold text-text mb-2 mt-4">Google Tag Manager</h3>
              <p className="text-text-secondary leading-relaxed">
                Google Tag Manager is a tag management system that allows us to deploy analytics and advertising tags on our website.
                Tag Manager itself does not set cookies or collect personal data, but it triggers other tags that may do so.
                You can review Google Tag Manager&apos;s use policy at{' '}
                <a href="https://www.google.com/tagmanager/use-policy.html" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 transition-colors">
                  https://www.google.com/tagmanager/use-policy.html
                </a>.
              </p>

              <h3 className="text-lg font-semibold text-text mb-2 mt-4">Google AdSense</h3>
              <p className="text-text-secondary leading-relaxed">
                We display advertisements through Google AdSense, an advertising service provided by Google.
                AdSense uses cookies and web beacons to serve ads based on your previous visits to our website and other websites on the internet.
                You can opt out of personalized advertising by visiting Google&apos;s Ads Settings at{' '}
                <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 transition-colors">
                  https://adssettings.google.com
                </a>.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                All Google services used on this website are subject to their respective consent requirements.
                We require your explicit consent before loading any Google Analytics, Google Tag Manager, or AdSense scripts, as described in our <Link href="/cookie-policy" className="text-primary-500 hover:text-primary-400 transition-colors">Cookie Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Data Sharing and Disclosure</h2>
              <p className="text-text-secondary leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties.
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-1 mt-2">
                <li><strong className="text-text">Service providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website, conducting business, or serving users, provided they agree to keep your information confidential.</li>
                <li><strong className="text-text">Legal requirements:</strong> We may disclose information if required to do so by law or in response to valid legal requests by public authorities.</li>
                <li><strong className="text-text">Business transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                <li><strong className="text-text">With your consent:</strong> We may share your information for any other purpose with your explicit consent.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Data Retention</h2>
              <p className="text-text-secondary leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes described in this Privacy Policy, or as required by applicable law.
                When we no longer need your information, we will securely delete or anonymize it.
                Analytics data collected through Google Analytics is retained for a period of 26 months before being automatically deleted.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Data Security</h2>
              <p className="text-text-secondary leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                These measures include secure socket layer (SSL) encryption, regular security audits, and restricted access to personal data.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure.
                While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Your Rights and Choices</h2>
              <p className="text-text-secondary leading-relaxed">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>

              <h3 className="text-lg font-semibold text-text mb-2 mt-4">Your Rights (GDPR — European Economic Area)</h3>
              <p className="text-text-secondary leading-relaxed">If you are located in the European Economic Area, you have the following rights under the GDPR:</p>
              <ul className="list-disc pl-6 text-text-secondary space-y-1 mt-2">
                <li><strong className="text-text">Right to access:</strong> Request a copy of the personal information we hold about you.</li>
                <li><strong className="text-text">Right to rectification:</strong> Request correction of inaccurate or incomplete information.</li>
                <li><strong className="text-text">Right to erasure:</strong> Request deletion of your personal information when it is no longer necessary for the purposes for which it was collected.</li>
                <li><strong className="text-text">Right to restrict processing:</strong> Request restriction of processing your personal information in certain circumstances.</li>
                <li><strong className="text-text">Right to data portability:</strong> Request a copy of your information in a structured, machine-readable format.</li>
                <li><strong className="text-text">Right to object:</strong> Object to the processing of your personal information for direct marketing or legitimate interests.</li>
                <li><strong className="text-text">Right to withdraw consent:</strong> Withdraw your consent at any time, without affecting the lawfulness of processing based on consent before its withdrawal.</li>
              </ul>

              <h3 className="text-lg font-semibold text-text mb-2 mt-6">Your Rights (CCPA — California Residents)</h3>
              <p className="text-text-secondary leading-relaxed">If you are a California resident, you have the following rights under the CCPA:</p>
              <ul className="list-disc pl-6 text-text-secondary space-y-1 mt-2">
                <li><strong className="text-text">Right to know:</strong> Request disclosure of the categories and specific pieces of personal information we have collected about you.</li>
                <li><strong className="text-text">Right to delete:</strong> Request deletion of your personal information that we have collected, subject to certain exceptions.</li>
                <li><strong className="text-text">Right to opt out:</strong> Opt out of the sale of your personal information. We do not sell personal information as defined by the CCPA.</li>
                <li><strong className="text-text">Right to non-discrimination:</strong> We will not discriminate against you for exercising any of your CCPA rights.</li>
              </ul>

              <p className="text-text-secondary leading-relaxed mt-4">
                To exercise any of these rights, please contact us at{' '}
                <a href="mailto:hello@measurely.in" className="text-primary-500 hover:text-primary-400 transition-colors">hello@measurely.in</a>.
                We will respond to your request within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Children&apos;s Privacy</h2>
              <p className="text-text-secondary leading-relaxed">
                Our services are not directed to children under the age of 13 (or the applicable age of consent in your jurisdiction).
                We do not knowingly collect personal information from children.
                If you are a parent or guardian and you believe that your child has provided us with personal information, please contact us immediately.
                If we become aware that we have collected personal information from a child without verification of parental consent, we will take steps to delete that information promptly.
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                Our calculators are designed to be used by individuals of all ages without requiring any personal information.
                If a child uses our tools, no personal data is collected in the process.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Third-Party Links</h2>
              <p className="text-text-secondary leading-relaxed">
                Our website may contain links to third-party websites, products, or services that are not owned or controlled by us.
                We are not responsible for the privacy practices or content of these third-party sites.
                We encourage you to review the privacy policies of any third-party websites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Changes to This Privacy Policy</h2>
              <p className="text-text-secondary leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or operational needs.
                When we make changes, we will update the &ldquo;Last updated&rdquo; date at the top of this page.
                In the case of material changes, we will provide a prominent notice on our website or notify you via email (if you have subscribed).
              </p>
              <p className="text-text-secondary leading-relaxed mt-3">
                We encourage you to review this Privacy Policy periodically for any updates.
                Your continued use of {SITE_CONFIG.name} after any changes constitutes your acceptance of the revised policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-text mb-4">Contact Us</h2>
              <p className="text-text-secondary leading-relaxed">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <ul className="list-disc pl-6 text-text-secondary space-y-1 mt-2">
                <li>Email: <a href="mailto:hello@measurely.in" className="text-primary-500 hover:text-primary-400 transition-colors">hello@measurely.in</a></li>
                <li>Support: <a href="mailto:hello@measurely.in" className="text-primary-500 hover:text-primary-400 transition-colors">hello@measurely.in</a></li>
                <li>Address: Bhubaneswar, Odisha, India</li>
              </ul>
              <p className="text-text-secondary leading-relaxed mt-3">
                You may also visit our <Link href="/contact" className="text-primary-500 hover:text-primary-400 transition-colors">Contact Us</Link> page to send a message directly.
              </p>
            </section>

            <section className="pt-4 border-t border-border/40">
              <p className="text-sm text-text-secondary">
                <strong className="text-text">Related policies:</strong>{' '}
                <Link href="/terms" className="text-primary-500 hover:text-primary-400 transition-colors">Terms of Service</Link>
                {' | '}
                <Link href="/disclaimer" className="text-primary-500 hover:text-primary-400 transition-colors">Disclaimer</Link>
                {' | '}
                <Link href="/cookie-policy" className="text-primary-500 hover:text-primary-400 transition-colors">Cookie Policy</Link>
                {' | '}
                <Link href="/editorial-policy" className="text-primary-500 hover:text-primary-400 transition-colors">Editorial Policy</Link>
              </p>
            </section>
          </div>

          <AdSlot placement={PRIVACY_BOTTOM} />
        </div>
      </div>
    </>
  );
}
