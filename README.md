# Measurely

**Smart Tools for Smart Measurements** — A comprehensive web application offering 77+ free online calculators, 27+ unit converters, and 70+ blog articles, built with Next.js 16. Visit us at [measurely.in](https://measurely.in).

> **Author:** Achyutananda Meher  
> **Location:** Bhubaneswar, Odisha, India  
> **Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Chart.js · Framer Motion · Radix UI · Zustand

---

## Quick Start

```bash
npm install
npm run dev      # → http://localhost:3000
```

| Script | Description |
|---|---|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [slug]/             # Dynamic tool + blog pages (~160+ routes)
│   ├── blog/               # Blog listing page
│   ├── calculators/        # All calculators listing
│   ├── categories/         # Category grid + detail pages
│   ├── compare/            # Comparison index + detail pages
│   ├── search/             # Search results
│   ├── about/, contact/, legal pages, etc.
│   ├── ai-token-cost-calculator/  # Custom calculator pages
│   ├── severance-pay-calculator/
│   ├── inheritance-tax-calculator/
│   ├── emergency-fund-calculator/
│   └── cd-ladder-calculator/
│
├── components/
│   ├── calculators/        # Calculator form, results, chart, layout
│   ├── converters/         # Converter input, results, layout
│   ├── blog/               # Blog article, card, search, share buttons
│   ├── home/               # Hero, category grid, tool cards, sections
│   ├── layout/             # Navbar, footer, search command, dropdowns
│   ├── seo/                # JSON-LD structured data, analytics
│   ├── ui/                 # shadcn-style primitives (button, dialog, etc.)
│   ├── pwa/                # Install prompt
│   └── tool-content.tsx    # Dynamic content sections on tool pages
│
├── data/
│   ├── calculators.ts      # 77 calculator definitions with compute logic
│   ├── converters.ts       # 27 converter definitions
│   ├── blogs.ts            # 70+ blog articles
│   ├── comparisons.ts      # Tool comparisons
│   ├── tool-registry.ts    # Category display config + tool grouping
│   └── ai-model-pricing.ts # 50+ AI model pricing data
│
├── lib/
│   ├── constants.ts        # Site config, nav, social links, SEO defaults
│   ├── tool-content.ts     # Dynamic content generation per calculator
│   ├── blog-images.ts      # Blog image URL mapping
│   ├── calculator-utils.ts # 960+ lines of math computation functions
│   ├── converter-utils.ts  # Unit conversion math
│   ├── search.ts           # Full-text search engine
│   ├── card-theme.ts       # Per-category color themes
│   └── admin-auth.ts       # JWT auth, 2FA, password hashing
│
├── content/articles/       # 74 blog articles (TypeScript files)
├── hooks/                  # React hooks
├── types/                  # TypeScript interfaces
└── config/
    └── adPlacements.ts     # Ad slot configuration
```

---

## Features

### 77+ Calculators & 27+ Converters

**Calculators** span 12 categories: Finance, Health, Math, Time, Engineering, Construction, Everyday Life, Real Estate, Retirement, Automotive, Social Media, and Business.

**Unit Converters:** Length, Weight, Area, Volume, Speed, Temperature, Pressure, Energy, Time, Data Storage, Fuel Economy, Angle, Density, Frequency, Power, Current, Voltage, Resistance, Capacitance, Inductance, Force, Magnetic Field, Concentration, Typography, Shoe Size, Clothing Size, Ring Size.

### Blog (70+ articles)
- Full HTML content with SEO metadata
- Categories: Finance, Health, Math, Engineering, Construction, and more
- Related tools and articles interlinking
- Reading time, author profiles, tags
- Social share buttons
- Each article is 1,000–3,000+ words with comprehensive coverage

### Dynamic Content Generation
- Every calculator page features auto-generated content sections
- Sections: Introduction, Why It Matters, When to Use, How It Works, Formula, How to Use, Example Calculation, Result Interpretation, Advantages, Limitations, Benefits, Common Mistakes, Expert Tips, Related Tools, Related Articles, FAQs, Conclusion
- 51 calculators have detailed formula explanations
- All calculators have 8+ FAQs with FAQ schema markup

### Admin Panel (`/sruticheck`)
- JWT-based login with 2FA (TOTP), rate limiting, scrypt password hashing
- Dashboard with visitor stats, page views, device breakdown, countries
- CRUD for calculators, converters, blogs, categories
- Redirect manager, ad placement manager, media library
- SEO settings, analytics, user management, audit logs
- Backup/export/import functionality
- Newsletter subscriber management, contact form inquiries

### Search
- Cmd+K command palette via cmdk
- Full-text search engine with stemming and synonym expansion (50+ terms)
- Searches calculators, converters, blogs, FAQs, and static pages

### SEO & Structured Data
- Dynamic sitemap.xml with all pages (static, calculators, converters, blogs, categories, comparisons, custom pages)
- robots.txt with custom bot rules
- **13 JSON-LD schemas:** WebSite, Organization, WebPage, BreadcrumbList, FAQPage, HowTo, BlogPosting, WebApplication, CollectionPage, ItemList, AboutPage, ContactPage, Product
- Per-page OpenGraph + Twitter Card metadata (`summary_large_image`)
- Canonical URLs on all pages
- Breadcrumbs (UI + structured data) on every page
- llms.txt for AI crawlers

### Theme
- Dark/Light mode toggle via `next-themes`
- Persists user preference
- Tailwind v4 `dark:` variant throughout

### Analytics & Ads
- Google Analytics 4 (GA4)
- Google Tag Manager (GTM)
- Google AdSense with verification
- GDPR cookie consent banner (Accept/Reject/Customize)
- Conditional ad/tracker loading based on consent

### PWA
- Web App Manifest with icons (96/192/512)
- `display: standalone` support
- Apple touch icons + iOS meta tags

### Performance & Security
- HTTP→HTTPS redirect
- Comprehensive Content-Security-Policy
- X-Content-Type-Options, X-Frame-Options, XSS Protection
- Referrer-Policy, Permissions-Policy
- 1-year immutable cache for static assets
- 1-hour cache with stale-while-revalidate for popular tool pages

---

## Data Model

Each **calculator** includes: icon, name, slug, category, description, inputs (label/key/type/placeholder/default), compute function, optional chart config, example inputs, 8-10 FAQs, related slugs, and full SEO metadata (metaTitle, metaDescription).

Each **converter** includes: icon, name, slug, category, description, unit definitions (multiplier or toBase/fromBase functions), popular conversions, FAQs, and related slugs.

Each **blog post** includes: slug, title, excerpt, HTML content (1,000-3,000+ words), category, publishedAt/updatedAt dates, readingTime, featured/popular flags, image with alt text, author profile, related tools, FAQs, tags, and full SEO metadata.

---

## API Routes

All under `/api/admin/`: auth, tools CRUD, blogs CRUD, categories CRUD, media library, redirects, ads, analytics, homepage sections, inquiries, newsletter, settings, users, stats, audit logs, backup, search analytics, and SEO settings.

---

## Environment Variables

Set in `.env.local`:
- `JWT_SECRET` — JWT signing key (required for admin auth)
- `ADMIN_EMAIL` — Default admin email
- `ADMIN_PASSWORD` — Default admin password

---

## Deployment

```bash
npm run build
npm start
```

Standard Next.js deployment. Recommended platform: **Vercel** or any Node.js host.

---

## License

Private project. All rights reserved.
