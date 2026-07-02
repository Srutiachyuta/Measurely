# Tool Consolidation Audit

**Date:** 2026-06-26  
**Total tools:** 97 (70 calculators + 27 converters)

## Classification Legend

| Label | Meaning |
|-------|---------|
| **KEEP** | Core, high-value, differentiated. Preserve and optimize. |
| **IMPROVE** | Worth keeping but needs features (chart, formula, inputs, location logic). |
| **MERGE** | Combine into single page with 301 redirects from old slugs. |
| **REMOVE** | Redundant, no SEO value, better served externally. (Use sparingly.) |

---

## CALCULATORS (70)

### Finance (19)

| # | Slug | Chart | Inputs | Verdict | Rationale |
|---|------|-------|--------|---------|-----------|
| 1 | emi-calculator | Yes | 4 | **KEEP** | High search volume. Core loan tool. Well-differentiated from loan-calculator (monthly focus vs total cost view). |
| 2 | loan-calculator | Yes | 4 | **KEEP** | Broader than EMI (covers amortization, total cost). Distinct use case. |
| 3 | mortgage-calculator | Yes | 6 | **KEEP** | Real estate specific. PITI (principal, interest, taxes, insurance) inputs differentiate it. |
| 4 | interest-calculator | Yes | 3 | **KEEP** | Simple/high-traffic. Different from compound-interest (simple vs compound). |
| 5 | compound-interest-calculator | Yes | 4 | **KEEP** | Educational cornerstone. Investment planning. High authority potential. |
| 6 | sip-calculator | Yes | 4 | **KEEP** | India-specific high volume. Distinct from general investment calc. |
| 7 | swp-calculator | Yes | 4 | **KEEP** | Complements SIP (withdrawal planning). India audience. |
| 8 | fd-calculator | Yes | 4 | **KEEP** | India fixed deposit. High search volume. |
| 9 | rd-calculator | Yes | 3 | **KEEP** | India recurring deposit. Complements FD. |
| 10 | gst-calculator | Yes | 3 | **KEEP** | India business tool. Practical, high volume. |
| 11 | tax-calculator | Yes | 2 | **IMPROVE** | Too generic. Needs location-specific logic (India, US, Canada) or disclaimer. Only 2 inputs (income, type) — too simplistic for "tax calculator" expectations. Add brackets, deductions, location selector. |
| 12 | salary-calculator | Yes | 3 | **IMPROVE** | Generic. Needs location-aware deductions (PF, SS, income tax). Switch from fixed 10% PF to real bracket logic. |
| 13 | currency-converter | No | 3 | **MERGE** | Not a calculator — it's a converter. Misclassified. Move to converters.ts or merge into a unified converter page. Has no chart, uses hardcoded static rates (not real-time), weakens trust. |
| 50 | paycheck-calculator | Yes | 6 | **KEEP** | US-specific. Well-featured with pre-tax/post-tax deductions, FICA, state tax. Good differentiation. |
| 58 | tfsa-contribution-room-calculator-canada | Yes | 4 | **KEEP** | Strong Canada long-tail. Unique retirement calculation (TFSA room carry-forward logic). |
| 59 | rrsp-contribution-tax-savings-calculator | Yes | 4 | **KEEP** | Canada RRSP. Shows tax refund from contributions. Unique value prop. |
| 60 | ontario-take-home-pay-calculator-after-tax | Yes | 2 | **KEEP** | Ontario-specific. Only 2 inputs (salary, frequency) — simplistic but targeted long-tail. Consider adding deductions. |
| 62 | canada-child-benefit-calculator-by-income | Yes | 5 | **KEEP** | Unique Canada CCB calculation. Strong government-program SEO. |
| 64 | gst-hst-calculator-ontario | Yes | 2 | **KEEP** | Ontario-specific GST/HST. Overlaps with #10 (gst-calculator) but Ontario rate differs. Could be merged with gst-calculator via location selector instead. **Alternative: MERGE into gst-calculator with province toggle.** |
| 67 | debt-to-income-ratio-calculator-for-mortgage-approval | Yes | 6 | **KEEP** | US mortgage underwriting. Practical pre-qualification tool. Well-featured. |

### Health (8)

| # | Slug | Chart | Inputs | Verdict | Rationale |
|---|------|-------|--------|---------|-----------|
| 14 | bmi-calculator | Yes | 4 | **KEEP** | Highest-volume health tool. Chart differentiates. |
| 15 | bmr-calculator | No | 6 | **IMPROVE** | Missing chart (calorie burn visualization). Has 6 inputs (age, height, weight, gender, activity) — adequate. Add chart showing TDEE vs BMR. Add formula display (Mifflin-St Jeor). |
| 16 | body-fat-calculator | No | 5 | **IMPROVE** | Missing chart (body fat % categories). Add Navy method formula + chart. |
| 17 | calorie-calculator | No | 5 | **IMPROVE** | Missing chart (maintenance/cut/bulk visual). Add macro split visualization. |
| 18 | water-intake-calculator | No | 3 | **IMPROVE** | Simple but useful. Missing chart (hydration goal vs intake visual). Very thin content — expand. |
| 19 | pregnancy-calculator | No | 2 | **KEEP** | Unique tool (due date, conception date, trimester tracking). Only 2 inputs but practical. Add timeline visualization (no chart but a visual timeline would improve UX). |
| 20 | heart-rate-calculator | No | 2 | **KEEP** | Unique fitness tool (HR zones, max HR). Add zone chart. |
| 21 | ideal-weight-calculator | No | 3 | **IMPROVE** | Overlaps with BMI. Uses multiple formulas (Devine, Miller, Hamwi) — good differentiation. Missing comparison chart showing formula variance. |

### Math (8)

| # | Slug | Chart | Inputs | Verdict | Rationale |
|---|------|-------|--------|---------|-----------|
| 22 | percentage-calculator | Yes | 3 | **KEEP** | Universal appeal. Chart shows proportion visualization. High volume. |
| 23 | fraction-calculator | No | 5 | **IMPROVE** | Missing chart (visual fraction representation). Add visual pie/bar output. |
| 24 | scientific-calculator | No | 0 | **KEEP** | Interactive component (0 inputs = custom UI). Unique tool. No changes needed. |
| 25 | matrix-calculator | No | 2 | **IMPROVE** | Niche but unique. Missing step-by-step solution display. |
| 26 | equation-solver | Yes | 4 | **IMPROVE** | Has chart (graph). Niche academic. Add step-by-step solving display. |
| 27 | gcf-lcm-calculator | No | 2 | **IMPROVE** | Simple but educational. Missing formula display (Euclidean algorithm). |
| 28 | prime-number-calculator | No | 2 | **IMPROVE** | Thin. Missing prime factorization visualization. Would benefit from chart showing prime distribution. |
| 29 | statistics-calculator | No | 1 | **IMPROVE** | Only 1 input (comma-separated dataset). Could add histogram chart, box plot. Currently very basic. |

### Time (6)

| # | Slug | Chart | Inputs | Verdict | Rationale |
|---|------|-------|--------|---------|-----------|
| 30 | age-calculator | Yes | 2 | **KEEP** | High volume. Chart shows age breakdown (years/months/days). Distinctive. |
| 31 | date-calculator | No | 2 | **KEEP** | Practical (add/subtract days from date). Keep as the hub. |
| 32 | days-between-dates | No | 2 | **MERGE** | Near-identical to date-calculator (both take 2 dates). Small difference: days-between-dates counts duration, date-calculator does add/subtract. **Merge into date-calculator with mode toggle** (duration mode + add/subtract mode). 301 redirect. |
| 33 | time-duration-calculator | No | 2 | **KEEP** | Differentiates from date tools (hours:minutes, time-of-day based). Keep separate. |
| 34 | week-calculator | No | 1 | **MERGE** | Very thin (1 input: date -> week number). Essential functionality but not a standalone page. **Merge into date-calculator** as a "week number" output field. 301 redirect. |
| 35 | month-calculator | No | 2 | **MERGE** | Thin (month/year -> days in month, calendar). **Merge into date-calculator** as additional output. 301 redirect. |

### Engineering (5)

| # | Slug | Chart | Inputs | Verdict | Rationale |
|---|------|-------|--------|---------|-----------|
| 36 | ohms-law-calculator | No | 3 | **KEEP** | Unique electronics tool. Solve for V/I/R given any two. Add formula wheel visualization. |
| 37 | voltage-divider-calculator | No | 3 | **KEEP** | Unique practical electronics. Circuit design tool. Add schematic diagram. |
| 38 | power-calculator | No | 4 | **IMPROVE** | Generic name. Missing formula display (P=VI, P=I²R, P=V²/R). Could add chart. |
| 39 | resistor-calculator | No | 4 | **KEEP** | Unique (color band decoder + series/parallel). Interactive. |
| 40 | watt-calculator | No | 4 | **MERGE** | Massive overlap with power-calculator (both compute power from voltage/current). **Merge into power-calculator** as a "watts" mode. 301 redirect. |

### Construction (5)

| # | Slug | Chart | Inputs | Verdict | Rationale |
|---|------|-------|--------|---------|-----------|
| 41 | concrete-calculator | No | 4 | **KEEP** | Practical contractor tool. No chart but practical enough. Add material breakdown visual. |
| 42 | paint-calculator | No | 3 | **KEEP** | DIY home improvement. Add cost breakdown chart. |
| 43 | tile-calculator | No | 5 | **KEEP** | DIY/contractor. Material + waste calculation. Add layout visual. |
| 44 | roofing-calculator | No | 4 | **KEEP** | Contractor niche. Add material quantity chart. |
| 45 | flooring-calculator | No | 5 | **KEEP** | Similar to tile but distinct measurements (sqft vs piece count). Keep separate. |

### Everyday Life (4)

| # | Slug | Chart | Inputs | Verdict | Rationale |
|---|------|-------|--------|---------|-----------|
| 46 | discount-calculator | Yes | 2 | **KEEP** | High volume. Chart shows savings visualization. Good as-is. |
| 47 | tip-calculator | Yes | 3 | **KEEP** | Practical dining out. Chart (split visualization). |
| 48 | split-bill-calculator | Yes | 2 | **KEEP** | Unique (per-person cost split). Chart shows individual shares. |
| 49 | fuel-cost-calculator | Yes | 5 | **KEEP** | Road trip planning. Chart shows cost breakdown. Good differentiation. |

### Real Estate (3)

| # | Slug | Chart | Inputs | Verdict | Rationale |
|---|------|-------|--------|---------|-----------|
| 51 | home-affordability-calculator | Yes | 7 | **KEEP** | High volume. DTI-based affordability. Good feature set. |
| 52 | rent-vs-buy-calculator | Yes | 8 | **KEEP** | Excellent comparison tool. Strong internal-silo content. Deserves its own comparison page. |
| 61 | canada-mortgage-stress-test-calculator | Yes | 8 | **KEEP** | Canada-specific. Different from #3 (mortgage-calculator) — stress test rate vs actual payment. Unique regulatory calc. |

### Retirement (2)

| # | Slug | Chart | Inputs | Verdict | Rationale |
|---|------|-------|--------|---------|-----------|
| 53 | 401k | Yes | 8 | **KEEP** | US 401(k) projection. Employer match logic. Chart shows growth projection. |
| 69 | fire-number-calculator | Yes | 7 | **KEEP** | Growing FIRE movement. 4% rule calculator. Chart shows portfolio trajectory. Good early-mover SEO. |

### Automotive (1)

| # | Slug | Chart | Inputs | Verdict | Rationale |
|---|------|-------|--------|---------|-----------|
| 54 | ev-charging-cost-calculator | Yes | 8 | **KEEP** | Trending EV market. Chart shows cost comparison (home vs supercharger). Well-featured. |

### Social Media (1)

| # | Slug | Chart | Inputs | Verdict | Rationale |
|---|------|-------|--------|---------|-----------|
| 55 | youtube-money-calculator | Yes | 6 | **KEEP** | Creator economy. CPM-based revenue estimation. Chart shows earnings breakdown. Unique. |

### Business (6)

| # | Slug | Chart | Inputs | Verdict | Rationale |
|---|------|-------|--------|---------|-----------|
| 56 | roi-calculator | Yes | 4 | **KEEP** | Business fundamental. Chart shows net return vs investment. |
| 57 | freelance-rate-calculator | Yes | 6 | **KEEP** | Gig economy. Desired salary -> hourly rate. Tax/overhead logic. Well-featured. |
| 63 | ontario-severance-pay-calculator | Yes | 4 | **KEEP** | Canada long-tail. Unique legal/employment calc. |
| 65 | 1099-tax-calculator-for-freelancers | Yes | 6 | **KEEP** | US self-employment tax. SE tax, QBI deduction. Well-featured. |
| 66 | overtime-pay-calculator-for-hourly-employees | Yes | 6 | **KEEP** | US labor law. Time-and-a-half, double-time logic. Practical. |
| 68 | ai-token-cost-calculator | Yes | 7 | **KEEP** | Trending AI topic. Model pricing from ai-model-pricing.ts. Chart shows token cost comparison. Has its own dedicated page (custom component). Well-positioned. |
| 70 | cash-flow-forecast-calculator | Yes | 9 | **KEEP** | Business planning. Chart shows cash flow timeline. Most inputs (9). Well-differentiated. |

---

## CONVERTERS (27)

### Unit Converters — Foundational

| # | Slug | Units | Verdict | Rationale |
|---|------|-------|---------|-----------|
| 1 | length-converter | 11 | **KEEP** | Highest-volume converter. Imperial + metric. Keep as flagship. |
| 2 | weight-converter | 10 | **KEEP** | High volume. Mass + weight units. Keep. |
| 3 | area-converter | 10 | **KEEP** | Broad usage (real estate, construction). Keep. |
| 4 | volume-converter | 13 | **KEEP** | Cooking, science, construction. Keep. |
| 5 | speed-converter | 7 | **KEEP** | Automotive, physics. Distinct. Keep. |
| 6 | temperature-converter | 5 | **KEEP** | Universal. Simple but essential. Keep. |
| 7 | pressure-converter | 10 | **KEEP** | Engineering, weather. Keep. |
| 8 | energy-converter | 9 | **KEEP** | Science, engineering. Keep. |
| 9 | time-converter | 13 | **KEEP** | Universal. Keep. |
| 10 | data-storage-converter | 14 | **KEEP** | Tech high-volume. Keep. |
| 11 | fuel-economy-converter | 4 | **KEEP** | Niche but unique (MPG, L/100km, km/L). No overlap. Keep. |
| 12 | angle-converter | 6 | **KEEP** | Math/engineering. Degrees, radians, gradians. Keep. |
| 13 | density-converter | 7 | **KEEP** | Science/lab. Keep. |
| 14 | frequency-converter | 6 | **KEEP** | Engineering. Hz, kHz, MHz, GHz. Keep. |
| 15 | power-converter | 8 | **KEEP** | Engineering. W, kW, HP, BTU/h. Different from power-calculator. Keep. |
| 16 | force-converter | 5 | **KEEP** | Physics. N, kN, lbf, kgf. Keep. |
| 17 | magnetic-field-converter | 5 | **KEEP** | Niche (Tesla, Gauss). Differentiated. Keep. |
| 18 | concentration-converter | 8 | **KEEP** | Chemistry/lab (molar, ppm, ppb). Unique. Keep. |
| 19 | typography-converter | 8 | **KEEP** | Design/web (pt, px, em, rem, in, cm, mm, pc). Unique niche. Keep. |

### Unit Converters — Electrical Family (MERGE candidates)

| # | Slug | Units | Verdict | Rationale |
|---|------|-------|---------|-----------|
| 20 | current-converter | 4 | **MERGE** | 4 units (A, mA, kA, µA). Metric-prefix only. Thin standalone page. **Merge into unified "Electrical Converter"** with voltage, resistance, capacitance, inductance. |
| 21 | voltage-converter | 5 | **MERGE** | 5 units (V, mV, kV, MV, µV). Same pattern as current. |
| 22 | resistance-converter | 5 | **MERGE** | 5 units (Ω, mΩ, kΩ, MΩ, µΩ). Same pattern. |
| 23 | capacitance-converter | 5 | **MERGE** | 5 units (F, mF, µF, nF, pF). Same pattern. |
| 24 | inductance-converter | 4 | **MERGE** | 4 units (H, mH, µH, nH). Same pattern. |

**New merged page:** `/converters/electrical-converter`  
**Sections:** Current, Voltage, Resistance, Capacitance, Inductance (tabs or accordion).  
**301 redirects:** `current-converter`, `voltage-converter`, `resistance-converter`, `capacitance-converter`, `inductance-converter` → `electrical-converter`.  
**SEO benefit:** One authoritative "Electrical Converter" page instead of 5 thin pages. Retain unique meta by using sub-navigation URLs or anchor targets.

### Unit Converters — Size Family (MERGE candidates)

| # | Slug | Units | Verdict | Rationale |
|---|------|-------|---------|-----------|
| 25 | shoe-size-converter | 6 | **MERGE** | US Men/Women, UK, EU + cm/in. Already cross-linked. |
| 26 | clothing-size-converter | 7 | **MERGE** | US, UK, EU, JP, FR, IT, RU. Overlapping audience. |
| 27 | ring-size-converter | 6 | **MERGE** | US, UK, EU, JP + circ/dia. Same audience as shoe/clothing. |

**New merged page:** `/converters/size-converter`  
**Sections:** Shoe Size, Clothing Size, Ring Size (tabs).  
**301 redirects:** `shoe-size-converter`, `clothing-size-converter`, `ring-size-converter` → `size-converter`.  
**SEO benefit:** All three already link to each other in `relatedSlugs`. One page captures all "size converter" traffic.

---

## Summary

| Verdict | Count | Notes |
|---------|-------|-------|
| **KEEP** | 66 | Core tools. Optimize charts/FAQs/internal links. |
| **IMPROVE** | 14 | Add charts, formulas, location logic, or expand inputs. |
| **MERGE** | 17 | Consolidate into 3 new pages + redirect old slugs. |
| **REMOVE** | 0 | No tools recommended for full removal per SEO policy. |

### Merge Plan

| New Page | Merged Slugs | Tools Merged |
|----------|-------------|--------------|
| `date-calculator` (enhanced) | `days-between-dates`, `week-calculator`, `month-calculator` | 3 |
| `power-calculator` (enhanced) | `watt-calculator` | 1 |
| `gst-calculator` (enhanced) | `gst-hst-calculator-ontario` | 1 |
| `electrical-converter` | `current-converter`, `voltage-converter`, `resistance-converter`, `capacitance-converter`, `inductance-converter` | 5 |
| `size-converter` | `shoe-size-converter`, `clothing-size-converter`, `ring-size-converter` | 3 |
| — | `currency-converter` (move from calc to converters) | 1 |
| — | `days-between-dates`, `week-calculator`, `month-calculator` (into date-calculator) | 3 |
| **Total old URLs to 301:** | | **15** |

### Improve Priority

| Priority | Slug | What to add |
|----------|------|-------------|
| P0 | bmr-calculator | Chart (TDEE vs BMR), formula display |
| P0 | body-fat-calculator | Chart (fat % categories), Navy method formula |
| P1 | calorie-calculator | Chart (macro split), formula display |
| P1 | ideal-weight-calculator | Chart (formula comparison), formula display |
| P1 | tax-calculator | Location selector, bracket logic |
| P1 | salary-calculator | Location-aware deductions |
| P1 | statistics-calculator | Histogram chart, box plot |
| P1 | water-intake-calculator | Visual gauge, expand content |
| P2 | fraction-calculator | Visual pie/bar output |
| P2 | matrix-calculator | Step-by-step solution |
| P2 | equation-solver | Step-by-step solving |
| P2 | gcf-lcm-calculator | Formula display |
| P2 | prime-number-calculator | Factorization display |
| P2 | power-calculator | Formula display + chart |
| P2 | concrete-calculator | Material breakdown chart |
| P2 | paint-calculator | Cost breakdown chart |
| P2 | tile-calculator | Layout visualization |
| P2 | roofing-calculator | Material quantity chart |
| P2 | flooring-calculator | Material comparison chart |
