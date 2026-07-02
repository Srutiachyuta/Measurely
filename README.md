# Measurely

**Smart Tools for Smart Measurements** — A comprehensive web application offering 97 free online calculators and unit converters, plus 90+ blog articles, built with Next.js 16.

> **URL:** [https://measurely.in](https://measurely.in)  
> **Author:** Achyutananda Meher  
> **Location:** Bhubaneswar, Odisha, India

---

## Tech Stack

| Category | Technology | Version |
|---|---|---|
| **Framework** | Next.js | 16.2.9 |
| **UI Library** | React | 19.2.4 |
| **Language** | TypeScript | ^5 |
| **Styling** | Tailwind CSS | ^4 |
| **Charts** | Chart.js + react-chartjs-2 | 4.5.1 / 5.3.1 |
| **Animation** | Framer Motion | 12.40.0 |
| **Icons** | Lucide React | 1.18.0 |
| **State** | Zustand | 5.0.14 |
| **Theming** | next-themes | 0.4.6 |
| **Components** | Radix UI (16 primitives) | — |
| **Search** | cmdk (command palette) | 1.1.1 |

---

## Quick Start

```bash
npm install
npm run dev      # → http://localhost:3000
```

| Script | Description |
|---|---|
| `npm run dev` | Start dev server (webpack) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [slug]/             # Dynamic tool pages (calculators + converters)
│   ├── blog/               # Blog listing, posts, categories
│   ├── calculators/        # All calculators listing
│   ├── converters/         # All converters listing
│   ├── categories/         # Category grid + detail pages
│   ├── sruticheck/         # Admin panel (dashboard, CRUD, settings)
│   ├── api/admin/          # Admin REST API (auth, CRUD, analytics)
│   ├── about/              # About page
│   ├── contact/            # Contact form
│   ├── search/             # Search results page
│   ├── ai-token-cost-calculator/  # Custom AI cost calculator
│   ├── severance-pay-calculator/  # Severance Pay Calculator
│   ├── inheritance-tax-calculator/  # Inheritance Tax Calculator
│   ├── legal pages         # privacy-policy, terms, disclaimer, etc.
│   ├── layout.tsx          # Root layout (nav, footer, SEO, analytics)
│   ├── page.tsx            # Homepage
│   ├── sitemap.ts          # Dynamic sitemap.xml
│   ├── robots.ts           # robots.txt
│   └── manifest.ts         # PWA manifest
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
│   ├── calculators.ts      # 70 calculator definitions
│   ├── converters.ts       # 27 converter definitions
│   ├── blogs.ts            # 98 blog posts
│   ├── tool-registry.ts    # Category display config + tool grouping
│   └── ai-model-pricing.ts # 50+ AI model pricing data
│
├── lib/
│   ├── constants.ts        # Site config, nav, social links, POPULAR_TOOLS
│   ├── search.ts           # Full-text search engine (stemming, synonyms)
│   ├── tool-content.ts     # Auto-generated content (formulas, benefits)
│   ├── card-theme.ts       # Per-category color themes
│   ├── blog-images.ts      # Blog image URL mapping
│   ├── calculator-utils.ts
│   ├── converter-utils.ts  # Unit conversion math
│   ├── admin-auth.ts       # JWT auth, 2FA, password hashing
│   └── utils.ts            # cn(), formatNumber(), date helpers
│
├── hooks/                  # use-calculations, use-debounce, etc.
├── types/                  # TypeScript interfaces for all data
└── config/
    └── adPlacements.ts     # Ad slot configuration
```

---

## Features

### 95 Online Tools

**70 Calculators** across 12 categories:

| Category | Tools |
|---|---|
| **Finance** | EMI, Loan, Mortgage, Interest, Compound Interest, SIP, SWP, FD, RD, GST, Tax, Salary, Paycheck, Home Affordability, Rent vs Buy, 401k, ROI, EV Charging, YouTube Money, Freelance Rate, TFSA, RRSP, Canada Mortgage Stress Test, Ontario Take Home Pay, GST/HST Ontario, 1099 Tax, Overtime Pay, Debt-to-Income, Canada Child Benefit, Ontario Severance, Severance Pay, Inheritance Tax, and more |
| **Health** | BMI, BMR, Body Fat, Calorie, Water Intake, Pregnancy, Heart Rate, Ideal Weight |
| **Math** | Percentage, Fraction, Scientific, Matrix, Equation Solver, GCF/LCM, Prime Number, Statistics |
| **Time** | Age, Date, Days Between, Time Duration, Week, Month |
| **Engineering** | Ohm's Law, Voltage Divider, Power, Resistor, Watt |
| **Construction** | Concrete, Paint, Tile, Roofing, Flooring |
| **Everyday Life** | Discount, Tip, Split Bill, Fuel Cost |
| **Real Estate** | Mortgage, Home Affordability, Rent vs Buy |
| **Retirement** | 401k, SWP |
| **Automotive** | Fuel Cost, EV Charging Cost |
| **Social Media** | YouTube Money |
| **Business** | Freelance Rate, ROI |

**27 Unit Converters:** Length, Weight, Area, Volume, Speed, Temperature, Pressure, Energy, Time, Data Storage, Fuel Economy, Angle, Density, Frequency, Power, Current, Voltage, Resistance, Capacitance, Inductance, Force, Magnetic Field, Concentration, Typography, Shoe Size, Clothing Size, Ring Size.

### Blog (98 articles)
- Full markdown content with SEO metadata
- Categories: Finance, Health, Math, Engineering, Construction, etc.
- Related tools & articles linking
- Reading time, author, tags
- Social share buttons

### Admin Panel (`/sruticheck`)
- **Auth:** JWT-based login with 2FA (TOTP), rate limiting, scrypt password hashing
- **Dashboard:** Visitor stats, page views, device breakdown, countries
- **Tools CRUD:** Add/edit/delete/clone calculators & converters
- **Blogs CRUD:** Create/edit with draft/published/scheduled status
- **Categories CRUD:** Manage tool categories
- **Redirects:** Manage 301 redirects
- **Ads:** Manage ad placements
- **Media Library:** Upload images
- **SEO:** Set default meta, OG image, verification codes
- **Analytics:** Daily stats, top pages, search queries, ad revenue
- **Users:** Admin user management
- **Audit Logs:** Track admin actions
- **Backup:** Export/import site data
- **Newsletter:** Subscriber management
- **Inquiries:** Contact form submissions
- **Settings:** Site name, URL, GA/AdSense IDs, maintenance mode

### Search
- **Cmd+K command palette** via cmdk
- **Full-text search engine** with stemming, synonym expansion (50+ terms), scored results
- Searches calculators, converters, blogs, FAQs, and static pages
- Search results page at `/search`

### SEO & Structured Data
- Dynamic sitemap.xml
- robots.txt with custom bot rules
- JSON-LD: Website, Organization, WebPage, BreadcrumbList, FAQPage, HowTo, BlogPosting, WebApplication, CollectionPage, ItemList, AboutPage, ContactPage
- Per-page OpenGraph + Twitter Card metadata
- Canonical URLs on all pages
- Breadcrumbs (UI + structured data)

### Theme
- Dark/Light mode toggle via `next-themes`
- Persists user preference
- Tailwind v4 `dark:` variant throughout

### Analytics & Ads
- Google Analytics 4 (GA4)
- Google Tag Manager (GTM)
- Google AdSense
- GDPR cookie consent banner (Accept/Reject/Customize)
- Conditional loading based on consent

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

Each **calculator** includes: icon, name, slug, category, description, inputs (label/key/type/placeholder/default), compute function, optional chart config, example inputs, 7-8 FAQs, related slugs, full SEO metadata (metaTitle, metaDescription).

Each **converter** includes: icon, name, slug, category (always "unit-converters"), description, unit definitions (multiplier or toBase/fromBase functions), popular conversions, FAQs, related slugs, SEO metadata.

Each **blog post** includes: slug, title, excerpt, full markdown content, category, publishedAt, updatedAt, readingTime, featured/popular flags, image, author, related tools, FAQs, tags, SEO metadata.

---

## API Routes

All under `/api/admin/`:
- `auth/` — login, logout, me, 2FA setup/verify
- `tools/` — CRUD + clone
- `blogs/` — CRUD with status filtering
- `categories/` — CRUD
- `media/` — upload, delete
- `redirects/` — CRUD
- `ads/` — CRUD
- `analytics/` — stats, page views, devices, countries
- `homepage/` — get/update homepage sections
- `inquiries/` — list, delete contact submissions
- `newsletter/` — list subscribers
- `settings/` — get/update site settings
- `users/` — CRUD admin users
- `stats/` — dashboard metrics
- `audit-logs/` — filtered log viewer
- `backup/` — export/import
- `search/` — search analytics
- `seo/` — SEO settings

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
