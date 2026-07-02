"use client";

import { useState } from "react";
import { SITE_CONFIG, CONTACT_INFO, GOOGLE_FORM } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import type { BreadcrumbItem } from "@/types";
import { AdSlot } from "@/components/AdSlot";
import { CONTACT_BOTTOM } from "@/config/adPlacements";
import { Mail, MapPin, Phone, Send, CheckCircle2, AlertCircle, User, Clock, MessageSquare, HelpCircle } from "lucide-react";

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Contact Us" },
];

const contactMethods = [
  { icon: Mail, label: "Email", value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
  { icon: Phone, label: "Phone", value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}` },
  { icon: MapPin, label: "Address", value: CONTACT_INFO.address },
  { icon: User, label: "Founder", value: CONTACT_INFO.founderName },
];

const faqs = [
  {
    q: "How quickly do you respond?",
    a: "We typically respond within 24 hours during business days. For urgent matters, please use the email hello@measurely.in.",
  },
  {
    q: "Can I suggest a new calculator or converter?",
    a: "Absolutely! We welcome suggestions for new tools. Use the contact form or email us with your idea, and we'll consider it for our development roadmap.",
  },
  {
    q: "How do I report an error in a calculation?",
    a: "Please send us the details including which tool, the inputs you used, the expected result, and the result you received. We review and fix errors promptly.",
  },
  {
    q: "Do you offer technical support for developers?",
    a: "Yes, if you have questions about our formulas, API integration, or technical implementation, feel free to reach out and we'll be happy to help.",
  },
];

export function ContactPageClient() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email address";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (formData.message.length > 2000) newErrors.message = "Message must be under 2000 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const honeypot = (e.target as HTMLFormElement).querySelector<HTMLInputElement>('[name="honeypot"]');
    if (honeypot?.value) return;

    setSubmitting(true);
    setSubmitError(false);

    try {
      const formBody = new URLSearchParams();
      formBody.append(GOOGLE_FORM.fields.name, formData.name);
      formBody.append(GOOGLE_FORM.fields.email, formData.email);
      formBody.append(GOOGLE_FORM.fields.subject, formData.subject);
      formBody.append(GOOGLE_FORM.fields.message, formData.message);

      if (GOOGLE_FORM.actionUrl) {
        await fetch(GOOGLE_FORM.actionUrl, {
  method: "POST",
  mode: "no-cors",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: formBody.toString(),
});
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} className="mb-8" />
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6 border border-primary-500/20">
              <Mail className="h-4 w-4" />
              <span>Get in Touch</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Contact <span className="text-gradient">Us</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Have a question, suggestion, or feedback? We&apos;d love to hear from you.
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact methods */}
            <div className="space-y-4">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div key={method.label} className="p-5 rounded-2xl border border-border/60 bg-surface hover:shadow-elevation-md transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-500/10 text-primary-500 shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted font-medium uppercase tracking-wider">{method.label}</p>
                        {method.href ? (
                          <a href={method.href} className="text-sm text-text hover:text-primary-500 transition-colors">
                            {method.value}
                          </a>
                        ) : (
                          <p className="text-sm text-text">{method.value}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Response expectations */}
              <div className="p-5 rounded-2xl border border-border/60 bg-surface-secondary/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent-green/10 text-accent-green shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted font-medium uppercase tracking-wider">Response Time</p>
                    <p className="text-sm font-semibold text-text">Within 24 Hours</p>
                  </div>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  We strive to respond to all inquiries within one business day.
                  For urgent matters, please mark your subject as &ldquo;Urgent&rdquo; and we will prioritize your message.
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="p-8 sm:p-12 rounded-3xl border border-border/60 bg-surface text-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-green/10 text-accent-green mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-text mb-2">Message Sent!</h2>
                  <p className="text-text-secondary mb-2">
                    Thank you for reaching out, {formData.name}. We&apos;ll respond within 24 hours.
                  </p>
                  <p className="text-sm text-text-secondary mb-6">
                    A copy has been sent to our team. If you don&apos;t hear back, please send a direct email to{' '}
                    <a href={`mailto:${CONTACT_INFO.supportEmail}`} className="text-primary-500 hover:text-primary-400 transition-colors">{CONTACT_INFO.supportEmail}</a>.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setSubmitError(false); setFormData({ name: "", email: "", subject: "", message: "" }); }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl border border-border/60 bg-surface space-y-5">
                  {/* Honeypot field for spam prevention */}
                  <input
                    type="text"
                    name="honeypot"
                    className="absolute -left-[9999px] -top-[9999px]"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text mb-1.5">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-11 rounded-xl border border-border/60 bg-surface-secondary px-4 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text mb-1.5">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-11 rounded-xl border border-border/60 bg-surface-secondary px-4 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-text mb-1.5">Subject</label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full h-11 rounded-xl border border-border/60 bg-surface-secondary px-4 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-border/60 bg-surface-secondary px-4 py-3 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                    {errors.message && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{errors.message}</p>}
                    <p className="text-xs text-muted mt-1 text-right">{formData.message.length}/2000</p>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <><Send className="h-4 w-4" /> Send Message</>
                    )}
                  </button>
                  {submitError && (
                    <p className="text-xs text-red-500 flex items-center gap-1 justify-center">
                      <AlertCircle className="h-3 w-3" />
                      Submission failed. Please try again or email us directly at{' '}
                      <a href={`mailto:${CONTACT_INFO.supportEmail}`} className="underline hover:text-red-400">{CONTACT_INFO.supportEmail}</a>.
                    </p>
                  )}
                  <p className="text-xs text-text-secondary text-center leading-relaxed">
                    Your information is used only to respond to your inquiry and will not be shared with third parties.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Feedback and Support */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4 border border-primary-500/20">
                <MessageSquare className="h-4 w-4" />
                <span>Feedback and Support</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text mb-3">We Value Your Feedback</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Your input helps us improve. Whether you found a bug, have a feature request, or just want to share your thoughts, we want to hear from you.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: AlertCircle,
                  title: "Report an Issue",
                  description: "Found an error or bug? Let us know which tool and what went wrong. We review and fix issues promptly.",
                  email: "hello@measurely.in",
                },
                {
                  icon: MessageSquare,
                  title: "Suggest a Tool",
                  description: "Need a calculator or converter we don't have yet? Send us your idea and we'll consider adding it to our roadmap.",
                  email: "hello@measurely.in",
                },
                {
                  icon: HelpCircle,
                  title: "General Inquiry",
                  description: "Have a question about our tools, policies, or anything else? We're happy to help and typically respond within 24 hours.",
                  email: "hello@measurely.in",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="p-6 rounded-2xl border border-border/60 bg-surface text-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-500/10 text-primary-500 mx-auto mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-text mb-2">{item.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">{item.description}</p>
                    <a href={`mailto:${item.email}`} className="text-sm text-primary-500 hover:text-primary-400 transition-colors font-medium">
                      {item.email}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-text mb-8 text-center">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="p-6 rounded-2xl border border-border/60 bg-surface">
                  <h3 className="font-semibold text-text mb-2">{faq.q}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <AdSlot placement={CONTACT_BOTTOM} />
        </div>
      </div>
    </>
  );
}
