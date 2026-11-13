# Measurely

Free online calculators and practical educational guides for finance, health, mathematics, engineering and everyday decisions.

## Stack

Next.js 16.4.6, React 19, TypeScript, Tailwind CSS, Radix UI and dynamically loaded Chart.js. The npm lockfile is authoritative.

## Development

Use a supported Node.js release (Node 22 or 24 recommended).

```sh
npm ci
npm run dev
```

Open http://localhost:3030.

## Verification

```sh
npm test
npm run typecheck
npm run lint
npm run build
npm start
```

The production build uses webpack. Production start uses the configured port, or 3000 by default. The project includes 80 calculator definitions, 77 articles and 12 categories; it does not include a separate suite of 27 converter modules.

## Features

- Scientific expressions and 2 × 2 / 3 × 3 matrix operations with input validation.
- Worked calculator examples, explanations, related guides and clear limitations.
- Search with suggestions, categories and synonym support.
- Optional browser-local saved results, persistent favorites and recent tools.
- Light/dark themes, responsive layouts and reduced-motion support.
- Per-page metadata, a deduplicated sitemap, structured data and indexing controls.
- Authenticated CMS JSON/media APIs with server-signed sessions and origin checks.

## Configuration and deployment

See [the upgrade guide](docs/UPGRADE-GUIDE.md) for scope, financial assumptions, security setup, consent/forms limitations, tests and rollback instructions.

CMS access is disabled until server-only CMS_PASSWORD and CMS_SESSION_SECRET values are configured. Start from .env.example, use unique strong credentials, and never commit actual .env files. Browser Git/build operations are disabled by default. The existing CMS needs persistent writable storage; read-only/serverless hosts require a separate persistence design.

Financial and health outputs are planning/educational estimates, not professional advice. Tax years, jurisdictions, pricing and source references require ongoing review. AdSense approval is not guaranteed. Run a staging review and obtain explicit production deployment approval before release.

Private project. All rights reserved.
