# Guides content and presentation update

- Renamed the public Blog heading, navigation label, breadcrumb and collection metadata to Guides. Kept `/blog` and article canonicals/routes to preserve existing links.
- Replaced every active guide cover with locally optimized licensed WebP photography, including related articles and social image metadata. Source licenses: `GUIDE-PHOTO-SOURCES.md`. Existing unused assets remain archived; no calculator images or branding were replaced.
- Removed visible update-date labels from the Guides index, article template, About and public policy pages. Original publication dates and structured timestamps remain; no fake freshness labels were added.
- Reviewed dated financial information. Nine guides received focused source-backed replacements after CMS merging: Ontario payroll, CCB, RRSP, quarterly estimated tax, 1099, U.S. take-home pay, estate tax, UK salary sacrifice and AI API budgeting. Applied targeted retirement-limit corrections to the 401(k)/Roth guides and TFSA cumulative-room corrections. Other guides remain intact.
- Updated U.S. 2026 federal brackets, standard deductions and Social Security cap; fixed the SE deduction calculation, business mileage periods, child-credit eligibility label and cumulative installment planning. The target is explicitly 90% of current-year federal tax, not a claimed complete prior-year safe-harbor calculation.
- Updated Ontario 2026 payroll, CPP2, EI, non-refundable credits, federal BPA taper, provincial surtax/health premium and tax reduction. RRSP uses actual CRA deduction room and explicitly scopes provincial estimates to Ontario rather than silently returning Ontario results for every province.
- Updated CCB to July 2026–June 2027, including both income-reduction tiers and income-tested Ontario support. Full-custody estimate; other provincial/disability programs excluded.
- Corrected the U.S. estate exclusion, qualifying full-spouse transfer behavior and lifetime-gift adjustment; removed the unsupported tax-on-total-Canadian-estate model. UK calculation excludes residence relief. Income/capital-gains liabilities at death still require a separate calculation.
- Corrected UK employer NI and allowance taper. Pension-style model: non-pension benefit charges and Scotland are explicitly excluded.
- Replaced unreliable legacy AI price presets with a curated, source-backed set and retained editable custom prices. Custom input pricing no longer receives an unrelated model's cache discount. Model availability and pricing can change; no automatic live-pricing feed is claimed.

## Executed verification

- Production Next.js webpack build: passed, 226 generated pages.
- TypeScript: passed (also executed by the production build).
- ESLint: 0 errors; 264 pre-existing warnings remain.
- Calculator regression suite: all 80 example computations and allowed-zero checks passed, plus federal bracket references, Ontario CPP/EI caps, CRA CCB examples, unique input keys and every published guide cover path.
- Brand/photo asset check: passed; 12 licensed 1600×900 guide photos and existing icon sizes.
- Headless Chrome production checks: desktop/mobile, dark appearance, search shortcut/results/recent searches, category links, bookmarks, converter, scientific/matrix validation, HSA input behavior and calculator navigation passed; no runtime page errors.
- 185 sitemap URLs returned HTTP 200; 197 internal links checked without failures. Retired tax-guide redirect and missing-page 404 remain correct.
- Existing AdSense, analytics, layout and security integrations were preserved.

These checks do not certify every medical or legal statement on the site or turn planning calculators into tax-return software. State tax percentages and user-entered market assumptions are estimates, not live rates. Historical examples were not indiscriminately relabeled with a new year.

## Primary data sources

- IRS Publication 505: https://www.irs.gov/publications/p505
- SSA 2026: https://www.ssa.gov/cola/factsheets/2026.html
- IRS mileage periods: https://www.irs.gov/tax-professionals/standard-mileage-rates
- IRS retirement limits: https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500
- CRA Ontario payroll: https://www.canada.ca/en/revenue-agency/services/forms-publications/payroll/t4032-payroll-deductions-tables/t4032on-jan/t4032on-january-general-information.html
- CRA CCB: https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit/how-much.html
- CRA Ontario benefits: https://www.canada.ca/en/revenue-agency/services/child-family-benefits/provincial-territorial-programs/province-ontario.html
- CRA registered-plan limits: https://www.canada.ca/en/revenue-agency/services/tax/registered-plans-administrators/pspa/mp-rrsp-dpsp-tfsa-limits-ympe.html
- HMRC 2026–27: https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027
- IRS estate rules: https://www.irs.gov/businesses/small-businesses-self-employed/whats-new-estate-and-gift-tax
- UK inheritance rules: https://www.gov.uk/inheritance-tax
- Provider pricing URLs appear in the reviewed AI guide and pricing data module.
