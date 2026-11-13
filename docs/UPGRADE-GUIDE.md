# Measurely upgrade guide

## Current application

The supplied archive contains 80 calculator definitions, 77 educational articles and 12 tool categories. It does not include the 27 standalone converter modules or JWT/2FA implementation claimed by the older README. This upgrade preserves all existing calculator/article URLs and adds `/saved`, a private-to-your-browser workspace that is noindexed and excluded from the public sitemap.

The framework is pinned to Next.js 16.4.6 with matched lint/analyzer packages; sharp is a declared direct dependency at 0.35.5. npm's package-lock.json is authoritative. Do not use the temporary pnpm lock from audit setup. A successful dependency audit is time-specific, not proof that future advisories cannot appear.

## Run locally

Use a current supported Node.js release compatible with Next.js 16, preferably Node 22 or 24, and npm.

```sh
npm ci
npm test
npm run typecheck
npm run lint
npm run build
npm run dev
```

Development is at `http://localhost:3030`. `npm start` serves a previously built production version on the host's configured port (3000 by default). The production build uses webpack for consistent behavior in this Windows environment and compatibility with the bundle analyzer. Typography uses the system font stack, avoiding build-time Google Fonts downloads.

## CMS authentication and host requirements

Copy `.env.example` to `.env.local` for local setup, or configure the same server-only values through your hosting provider:

- `CMS_PASSWORD`: a unique password with at least 16 characters. There is no default password.
- `CMS_SESSION_SECRET`: independently generated random secret with at least 32 characters.
- `CMS_ORIGIN`: the exact browser origin, including scheme and port where applicable. Use the production HTTPS origin on a deployed host.
- `CMS_ALLOW_SERVER_OPERATIONS`: keep `false` in production. Git/build operations require an authenticated session and this separate explicit opt-in.

Do not prefix CMS secrets with NEXT_PUBLIC or commit real .env files. CMS endpoints fail closed with HTTP 503 until strong credentials are configured. Sign in at `/admin`. Sessions use signed, eight-hour HttpOnly cookies with SameSite=Strict and Secure in production. Logout clears the browser cookie; rotating the password or signing secret invalidates existing signed sessions. A stolen cookie can remain usable until expiry or credential rotation, so use HTTPS and protect the host.

Every CMS handler checks authorization. Writes also check the request Origin. Uploads accept JPEG/PNG/WebP/AVIF only, enforce an 8 MB file limit and decode/re-encode supported images. Git commands use argument arrays instead of shell interpolation. Browser-facing build/Git actions remain unavailable by default.

The login endpoint includes a process-local attempt throttle. Use an upstream rate limit for an internet-facing multi-instance deployment. The throttle alone is not a distributed abuse-control system.

The existing CMS persists JSON/media to the host filesystem. Static public pages need a normal rebuild/release to incorporate edited source data. A read-only/serverless filesystem is not persistent content storage. Choose a persistent host or implement a proper content database/object storage before depending on production CMS writes. Back up data and media before any separately reviewed migration.

## Calculator improvements

- Shared loan and annuity math explicitly handles zero interest/returns. The recurring-deposit model uses an effective monthly rate derived from quarterly compounding and beginning-of-month deposits.
- Scientific Calculator supports arithmetic, exponent precedence, parentheses, trig/inverse trig with radians/degrees, sqrt, log, ln, exp, abs and factorial through a parser; expressions are not executed as JavaScript.
- Matrix Calculator provides labeled numeric grids for square 2 × 2 and 3 × 3 addition, subtraction and multiplication. Non-square matrices are not currently supported.
- India Tax Calculator is explicitly scoped to AY 2026–27, resident salary earners under 60, ordinary salary income up to ₹50 lakh. It uses stated standard deductions, entered old-regime deductions and the new-regime rebate/marginal relief. It excludes special-rate income, surcharge and unmodeled credits. See the Income Tax Department reference linked on the page; do not relabel it for a different tax year without review.
- Salary Calculator includes entered employer costs, income tax and other employee deductions. It assumes employee PF at 12% of entered basic pay and does not automatically estimate tax or employer policy-specific PF caps. Basic/HRA components must fit gross pay.
- HSA 2026 coverage limits are sourced from IRS Revenue Procedure 2025-19. The custom UI distinguishes coverage from filing status, combines employee/employer contributions for the limit check, preserves a zero tax/return rate, and flags excess annual contributions. Examples using $4,150 remain illustrative contributions, not the maximum. The long-term projection remains a simplified model, not a tax return calculation or eligibility determination.
- Generic guidance now shows actual computed example outputs, a changed-input comparison where appropriate, formulas and limitations. These examples explain the implementation; independent reference tests remain necessary.

Not every jurisdiction-specific tax/benefit model has been independently certified. Financial, medical and tax guidance requires ongoing primary-source review. Do not claim guaranteed accuracy or AdSense approval.

## Saved calculations and favorites

After a shared calculator returns results, choose **Save this result**. Up to 20 results are stored in `measurely-saved-calculations-v1` in that browser's localStorage. Visit `/saved` from the result panel or footer to review/remove them. Saving is opt-in; raw input values are not saved by this feature. Results can still be sensitive. Do not save sensitive data on shared devices. Storage errors are handled without breaking calculations.

Tool-card favorites now persist locally under `measurely-favorite-tools`. Existing recent-tool behavior remains separate. These features are not account sync or cloud backups. Clearing browser storage removes local records.

## SEO, content and visual changes

- Public Next.js assets are crawlable. Search and admin pages are noindexed; CMS responses are private/no-store.
- XML sitemap entries are unique, internal search is excluded, and unknown modification dates are omitted rather than regenerated as today's date.
- Missing links are repaired to equivalent destinations or changed to plain text when no appropriate tool exists. No valuable tool/article was removed and no broad merge redirect was fabricated without analytics.
- Root homepage canonical inheritance was removed; public page-specific canonicals remain. Confirm the final canonical hostname with your actual host/redirects/Search Console before deployment.
- Page titles retain their own descriptive text without automatically appending the brand a second time when the metadata already includes it.
- Essential calculator explanations render on the server and stay visible without animation/JavaScript. Related article bodies are no longer passed into the shared calculator's client content implementation.
- The global streaming loading boundary was moved into a reusable UI component so static educational pages do not depend on a client-side streaming reveal to display their explanatory content. Input/result loading states remain local to calculators.
- The homepage uses calculator-focused wording and curated selections instead of unsupported AI/hundreds claims and fabricated weekly percentage growth. Existing light/dark branding is preserved.
- Keyboard labels, error associations, a working 404 search, reduced-motion handling and several admin interactions were improved. This is not a full WCAG conformance certification.
- Thirteen article photos now use 1600 × 900 WebP assets. Original PNGs remain for rollback/editing. Run `node scripts/optimize-article-images.cjs` after updating originals.

## Ads, consent and forms

Set only real AdSense slot IDs. Missing/non-numeric slot IDs render no production slot. Slots initialize when the consent-gated library is ready and reserve baseline space. Verify actual publisher account approval, ad rendering, CSP compatibility and regional consent requirements on a controlled preview before production.

GA/GTM remain optional. Avoid configuring duplicate analytics through both direct GA and GTM without a deliberate tracking plan. Rejecting consent must be tested against the final tag setup; a custom banner alone does not establish compliance with Google's regional CMP requirements.

The existing contact/newsletter integration submits to configured Google Forms using an opaque no-cors request. Updated text explains that delivery is not confirmed. Configure a response-verifiable integration before promising confirmed delivery or subscription. No real submissions were sent during testing.

## Validation policy

`npm test` exercises all registry example outputs, allowed-zero inputs, independent numerical samples, scientific/matrix errors, server session signing/tampering, and sitemap/robots invariants. It is not exhaustive financial/tax correctness coverage.

ESLint configuration is executable again. Existing explicit-any use in legacy CMS/admin/data/comparison files and synchronous initialization effects remain warnings during incremental migration, not silently disabled. The final verification report records error/warning totals. CommonJS test/build scripts use require intentionally. Do not describe a warning-bearing run as warning-free.

Production browser checks should cover mobile and desktop, saved results, scientific/matrix operations, HSA coverage selection, invalid inputs, no-JavaScript guidance, authentication/origin checks, sitemap routes and unexpected errors. Hosting credentials, real analytics, publisher approval and Search Console data are separate release checks.

## Release and rollback

This workspace was initialized from the supplied ZIP with an `archive-baseline` snapshot. GitHub access became available during validation. The original archive tree matched the fetched `main` commit `0ca0b98327197d5b18a6ab9ccbdf9287fc3756d0` exactly. Upgrade commits can therefore be rebased onto that verified upstream without replacing remote content. Recheck the remote head before creating a PR, and never force-push an independently initialized history.

Review the packaged changes, run a clean install and the validation commands, then use a staging preview. Set server-only secrets, confirm host persistence and canonical redirects, verify publisher/forms configuration and back up content. Obtain separate production deployment approval. DNS changes are not implied.

Keep the prior deployment and matching data/configuration. If critical behavior regresses, restore that deployment or revert the approved phase commits after preserving any new content. Do not reset or overwrite live content without a reviewed recovery plan.
