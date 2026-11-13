# Targeted branding and content update

## Scope

The supplied square ruler logo is used without cropping or redesign. Standard PNG icons were resized from that exact source, and existing WebP/SVG aliases were refreshed from the same image. Header and footer retain their existing wordmark, navigation and layout. Versioned logo paths and icon query strings prevent reuse of older branding.

The visible header Ctrl K badge was removed; its keyboard handler remains. Search keeps existing results, suggestions, history and keyboard selection, with a neutral wrapper focus indicator and no double input outline. Category names, descriptions, order, links and grid breakpoints remain unchanged; cards now use neutral backgrounds, restrained icons and subtle borders.

Promotional totals were removed from About, Blog and the categories introduction, including hard-coded category and view figures in the blog sidebar. Useful category filters and search-result counts remain. The About heading, mission and other useful content are retained.

## Article audit and retirement

The 77 existing published records were screened for empty content, placeholders, duplicate body content, substantial text overlap, relevance and obvious stale claims. Flagged content was manually reviewed. This is not a line-by-line financial or clinical fact certification.

One public article was retired:

| URL | Reason | Handling |
| --- | --- | --- |
| /tax-saving-tips-2026 | Its FY 2025–26/new-regime slab and rebate discussion uses older figures, including a ₹7 lakh new-regime rebate threshold. | Removed from the public blog data, search/listings and sitemap; inbound article links point to the relevant tax calculator; the old URL returns 301 to /tax-calculator. |

Primary reference: [Income Tax Department: Salaried Individuals for AY 2026–27](https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1?mobile-app=1).

The retired source remains archived in the repository, excluded from publishing even if a CMS override exists. Other relevant articles were retained; short length alone was not used as a removal criterion. Retained article URLs and SEO metadata are preserved.

## Article imagery

63 repeated category illustrations were replaced with individual 1600 × 900 WebP illustrations based on each article's topic and an illustrative calculator example. These are locally authored explanatory graphics, not third-party stock images. 13 existing topic-specific WebP images were retained. Each new image has descriptive alt text, and cards maintain the image aspect ratio without stretching or cropping explanatory content. No new dependencies were added.

## Release checks

Run the existing calculator checks and the targeted asset checks:

```sh
npm test
node scripts/verify-brand-assets.cjs
npm run lint
npm run build
```

Also verify search via Ctrl K, keyboard selection and recent searches; article search/filter controls; light/dark and desktop/mobile layouts; every category link; the retired article's 301 and sitemap exclusion; versioned manifest icons; and unchanged AdSense/analytics and calculator behavior.
