import type { NextConfig } from "next";

const csp = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com`,
  `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
  `img-src 'self' data: blob: https:`,
  `font-src 'self' https://fonts.gstatic.com`,
  `connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://pagead2.googlesyndication.com https://docs.google.com`,
  `frame-src https://www.googletagmanager.com https://pagead2.googlesyndication.com`,
  `object-src 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
].join("; ");

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.11", "192.168.1.4"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
      {
        source: "/:path*.(css|js|woff2|png|jpg|jpeg|gif|ico|svg|webp|avif)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:slug(emi-calculator|loan-calculator|bmi-calculator|age-calculator|length-converter|weight-converter|temperature-converter|currency-converter|percentage-calculator|gst-calculator|sip-calculator|fd-calculator)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
