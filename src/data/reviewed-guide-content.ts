import type { BlogPost } from "@/types";

// Applies after CMS merging, so an older CMS copy cannot restore superseded rates.
// Publication dates are preserved; this does not manufacture review timestamps.
const reviews: Record<string, { title: string; content: string }> = {
  "ontario-take-home-pay-after-tax-guide": {
    title: "Ontario Take-Home Pay: Understanding Your Net Salary",
    content: `## What comes out of an Ontario paycheck?

Gross salary is reduced by federal income tax, Ontario income tax, Canada Pension Plan contributions and Employment Insurance premiums. An annual estimate spreads these deductions over your chosen pay frequency. Actual payroll deductions can vary during the year, particularly once CPP and EI maximums are reached.

Use the <a href="/ontario-take-home-pay-calculator-after-tax">Ontario take-home pay calculator</a> with your annual gross salary and pay frequency. It estimates a standard employee's 2026 deductions; benefits, union dues, pension deductions, dependent credits and income-tested benefits require separate consideration.

## CPP and EI for the 2026 calendar year

Employee CPP is 5.95% on pensionable earnings between $3,500 and $74,600, up to $4,230.45. CPP2 adds 4% on earnings between $74,600 and $85,000, up to $416. EI is 1.63% on insurable earnings up to $68,900, capped at $1,123.07. The enhanced portions of CPP reduce taxable income; base CPP and EI generate non-refundable credits.

## Income tax and credits

Federal marginal rates are 14%, 20.5%, 26%, 29% and 33%, with thresholds of $58,523, $117,045, $181,440 and $258,482. Ontario rates are 5.05%, 9.15%, 11.16%, 12.16% and 13.16%, with thresholds of $53,891, $107,785, $150,000 and $220,000.

The federal basic personal amount is at most $16,452 and phases down to $14,829 at higher incomes. Ontario's basic personal amount is $12,989. These amounts generate tax credits: they are not deductions from salary before applying brackets. Ontario surtax and the Ontario health premium can also affect the result.

## Using the result for a budget

Compare estimated annual net pay with your actual payslip before committing to recurring expenses. A bonus, second job, taxable benefit or RRSP deduction can change withholding and final tax liability. Monthly, semi-monthly and biweekly payments are different schedules: biweekly usually means 26 annual payments, not 24.

For authoritative payroll rules and special circumstances, consult <a href="https://www.canada.ca/en/revenue-agency/services/forms-publications/payroll/t4032-payroll-deductions-tables/t4032on-jan/t4032on-january-general-information.html">CRA's 2026 Ontario payroll tables</a>.`,
  },
  "canada-child-benefit-calculator-guide": {
    title: "Canada Child Benefit: Estimate Payments from Family Income",
    content: `## Which benefit year applies?

Canada Child Benefit payments for July 2026 through June 2027 use adjusted family net income from 2025. A change in this year's earnings does not immediately change every monthly payment. Family composition, custody and eligibility can also affect entitlement.

The <a href="/canada-child-benefit-calculator-by-income">CCB calculator</a> estimates full-custody federal payments and Ontario Child Benefit where selected. Other provincial benefits and disability benefits are not included. Enter combined family adjusted net income, not a single parent's gross salary.

## Maximum federal benefit

The annual maximum is $8,157 for each eligible child under six and $6,883 for each child aged six through seventeen. Below family income of $38,237, the maximum is generally available subject to eligibility. Benefits decline above that amount.

Between $38,237 and $82,847, the reduction rates are 7%, 13.5%, 19% and 23% for one, two, three and four or more children respectively. Above $82,847, the calculation uses a fixed first-tier reduction plus a smaller marginal reduction. Applying the lower-income percentage to all income over the first threshold would understate payments at higher incomes.

## Ontario support and custody

Ontario Child Benefit can provide about $1,760 per child annually in this period. It decreases above adjusted family net income of $26,865; the maximum must not be added regardless of income. Other provinces have their own eligibility rules and benefit calculations.

For shared custody, CRA generally calculates each eligible parent's amount using that parent's family income and pays 50% of the resulting entitlement. This calculator assumes full custody, so do not treat its output as a shared-custody determination. A child's birthday, a new partner or a move can also change payments.

## Before relying on an estimate

Both spouses or common-law partners should file their returns to support benefit calculation, even when income is zero. Report changes in marital status and custody to CRA. Use the official benefit calculator for disability benefits, partial-year eligibility or additional provincial programs.

Sources: <a href="https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit/how-much.html">CRA CCB amounts and reduction rules</a> and <a href="https://www.canada.ca/en/revenue-agency/services/child-family-benefits/provincial-territorial-programs/province-ontario.html">Ontario benefit amounts</a>.`,
  },
  "rrsp-contribution-tax-savings-guide": {
    title: "RRSP Contributions: Deduction Room and Tax Savings",
    content: `## Start with your actual deduction limit

New RRSP room for 2026 is generally 18% of 2025 earned income, capped at $33,810, with adjustments for employer pension participation and other CRA rules. Unused room can carry forward, so your personal deduction limit can differ substantially from the annual dollar ceiling.

Use the amount on your CRA Notice of Assessment or CRA account. Current salary alone cannot establish your available room. A contribution and a tax deduction are also different decisions: eligible contributions can sometimes be deducted in a later year.

## Estimate the tax reduction

Use the <a href="/rrsp-contribution-tax-savings-calculator">RRSP tax savings calculator</a> to compare Ontario income tax before and after a deduction. Enter your available deduction room as well as the proposed contribution. The tax estimate currently supports Ontario; it must not be interpreted as a Quebec or Alberta calculation.

Tax savings are the difference between two progressive tax calculations, not necessarily the contribution multiplied by one marginal rate. A deduction can cross a bracket boundary, affect the federal personal amount, reduce Ontario surtax or change the health premium. This simplified estimate does not calculate all payroll credits, benefits, pension adjustments or household circumstances.

## Contribution timing and excess amounts

Check CRA's deadline for the tax year you intend to claim. Contributions made during the first 60 days of a year can require reporting with the previous year's return; the contribution date does not automatically decide which year receives the deduction.

Excess RRSP contributions can attract a 1% monthly tax. The limited $2,000 RRSP over-contribution allowance is not deductible room and is not a TFSA allowance. Avoid treating it as a recommended contribution target.

## RRSP or TFSA?

An RRSP deduction may be more valuable during a higher-income year, but withdrawals generally become taxable income. TFSA contributions are not deductible and qualifying withdrawals are tax-free. Compare your present and expected future tax rates, benefits, time horizon and need for access to the money.

Source: <a href="https://www.canada.ca/en/revenue-agency/services/tax/registered-plans-administrators/pspa/mp-rrsp-dpsp-tfsa-limits-ympe.html">CRA registered-plan limits</a>. Confirm your personal room with CRA before contributing.`,
  },
  "how-to-calculate-quarterly-estimated-taxes-for-self-employed": {
    title: "How to Calculate Quarterly Estimated Taxes for Self-Employment",
    content: `## Separate business profit from gross receipts

Start with annual revenue, then subtract eligible business expenses. Keep records and avoid entering the same vehicle or home-office cost twice. The <a href="/estimated-tax-calculator-self-employed">estimated tax calculator</a> provides a federal planning estimate for tax year 2026, not a state tax return or a complete Form 1040 calculation.

## Self-employment tax and its deduction

The usual calculation applies 12.4% Social Security tax and 2.9% Medicare tax to 92.35% of net self-employment profit. For 2026, the Social Security wage base is $184,500. Medicare has no ordinary wage cap. W-2 wages, Additional Medicare Tax and other special circumstances require additional work beyond this basic estimate.

Half of ordinary self-employment tax is an adjustment to income. It reduces income used to calculate federal income tax; it is not a dollar-for-dollar reduction of the final tax bill. Retirement and eligible self-employed health insurance deductions also need their own eligibility checks.

## Federal income tax

The 2026 standard deductions are $16,100 for single filers, $32,200 for married filing jointly and $24,150 for heads of household. Progressive rates apply to taxable income. Itemized deductions, the qualified business income deduction, capital gains and special deductions can materially change an actual return. Only qualifying children under seventeen with required valid SSNs should be entered for the child credit; the credit phases down at higher income.

## Mileage has two 2026 periods

The optional business mileage rate is 72.5 cents per mile for January through June and 76 cents for July through December. Enter each period separately. Do not also deduct actual vehicle expenses that the standard rate already covers.

## Payment timing and penalty planning

The standard 2026 federal installment deadlines are April 15, June 15 and September 15, 2026, and January 15, 2027, subject to applicable relief. These are not four equal calendar quarters. The calculator's selected installment shows a cumulative current-year target minus payments already made; a late payment may not cure an earlier underpayment.

The general penalty safe-harbor comparison uses 90% of current-year tax or 100% of prior-year tax, increasing to 110% of prior-year tax for certain higher-income taxpayers. This calculator displays the current-year 90% target only. Uneven income, withholding and prior-year exceptions require the IRS worksheets.

Sources: <a href="https://www.irs.gov/publications/p505">IRS Publication 505</a>, <a href="https://www.ssa.gov/cola/factsheets/2026.html">SSA 2026 limits</a>, and <a href="https://www.irs.gov/tax-professionals/standard-mileage-rates">IRS mileage rates</a>.`,
  },
  "how-inheritance-tax-works": {
    title: "Estate and Inheritance Tax: What the Calculator Can Tell You",
    content: `## Estate tax and inheritance tax are different

Estate tax is assessed on an estate before distribution. Inheritance tax depends on what a beneficiary receives and the applicable jurisdiction. The existence of one does not imply the other, and a federal exemption does not remove every state or foreign obligation.

The <a href="/inheritance-tax-calculator">inheritance tax calculator</a> is a broad planning illustration. It cannot establish estate valuation, beneficiary eligibility, domicile, treaty relief, trust treatment or state taxes. Collect asset valuations, debts, lifetime gift records and beneficiary details before seeking a formal assessment.

## United States: 2026 federal exclusion

For a U.S. citizen or resident dying in 2026, the federal basic exclusion is $15 million per person. Taxable lifetime gifts can use part of that exclusion. Portability of a deceased spouse's unused exclusion generally requires the relevant estate filing; two exclusions are not automatically available without checking the conditions.

The calculator's 40% rate on value above the exclusion is a high-level marginal illustration. It does not reproduce the full Form 706 computation or calculate state estate and inheritance taxes. Selecting a spouse exemption assumes that the entire net transfer qualifies for the marital deduction, such as an eligible transfer to a U.S.-citizen spouse. Partial transfers and noncitizen-spouse rules need specialist treatment.

## Other jurisdictions

The UK has its own nil-rate band, residence conditions, tapering and spouse rules. A residence nil-rate band is not created merely by selecting a spouse option. Canada's tax consequences at death often involve deemed dispositions of assets rather than a general inheritance tax on total estate value. The calculator's non-U.S. outputs are simplified scenarios and must not be treated as actual liabilities.

## How to use the estimate responsibly

Subtract only debts and costs that qualify under the relevant rules. Do not assume every funeral cost, charitable transfer or gift receives the same treatment worldwide. Review joint ownership, pensions, insurance and trusts separately. For an estate near a threshold, professional valuation and estate advice are more useful than rounding an online estimate.

Source: <a href="https://www.irs.gov/businesses/small-businesses-self-employed/whats-new-estate-and-gift-tax">IRS estate and gift tax rules</a> and <a href="https://www.irs.gov/instructions/i706">Form 706 instructions</a>.`,
  },
  "1099-tax-calculator-freelancers-guide": {
    title: "1099 Freelancer Taxes: Profit, Deductions and Payments",
    content: `## Your 1099 amount is not your taxable profit

A 1099 reports payments, while business profit depends on revenue, deductible expenses and record keeping. Reconcile payment forms against your books so a transaction is not counted twice. Use the <a href="/1099-tax-calculator-for-freelancers">1099 tax calculator</a> for a basic 2026 annual estimate.

## What the calculation includes

Ordinary self-employment tax generally applies to 92.35% of business profit. Social Security is 12.4% up to the applicable wage base, which is $184,500 in 2026; Medicare is 2.9% without that ordinary cap. Half of regular self-employment tax is deductible when calculating adjusted gross income.

The 2026 standard deductions are $16,100 single, $32,200 married filing jointly and $24,150 head of household. Federal income tax uses progressive brackets after deductions. A marginal rate applies only within its bracket, rather than to every dollar of gross income.

## Important boundaries

The selected state's flat percentage is a budgeting assumption, not a state tax calculation. This tool does not combine W-2 Social Security wages with self-employment earnings, calculate Additional Medicare Tax, the qualified business income deduction, itemized deductions or every tax credit. Entering another person's income is not a substitute for selecting the correct filing status.

Health insurance, equipment, home-office expenses and retirement contributions have eligibility and timing rules. An expense can be legitimate for a business without being immediately deductible in full. Keep invoices and separate personal use. Confirm whether an expense belongs in business profit or in a separate adjustment; do not deduct it twice.

## From annual estimate to payment plan

Subtract estimated payments and withholding from the projected tax liability. The remaining balance is not necessarily an equal quarterly installment: payment timing, prior-year tax and uneven income matter. Use the <a href="/estimated-tax-calculator-self-employed">quarterly planning tool</a> and IRS worksheets to review these separately.

Sources: <a href="https://www.irs.gov/publications/p505">IRS Publication 505</a> and <a href="https://www.ssa.gov/cola/factsheets/2026.html">SSA 2026 contribution base</a>.`,
  },
  "complete-guide-calculating-take-home-pay": {
    title: "How to Estimate Take-Home Pay from a U.S. Salary",
    content: `## Gross pay and net pay

Gross salary is your compensation before payroll deductions. Take-home pay is the amount remaining after tax withholding, retirement contributions, health premiums and other deductions. A salary divided by twelve is therefore not automatically your monthly spending budget.

Use the <a href="/paycheck-calculator">paycheck calculator</a> with salary, filing status and pay frequency. The federal estimate uses 2026 rates. Actual withholding depends on Form W-4, multiple jobs, bonuses and employer payroll settings.

## Federal deductions and payroll taxes

For 2026 the standard deduction is $16,100 for single filers, $32,200 for married joint filers and $24,150 for heads of household. Eligible pretax deductions can change taxable wages. A Roth retirement contribution does not receive the same current-year treatment as a traditional pretax contribution.

Employee Social Security is 6.2% on wages up to $184,500 in 2026. Medicare generally adds 1.45%, with Additional Medicare Tax potentially applying above the relevant threshold. Employers have their own withholding obligations; an estimate of annual liability is not a payroll instruction.

## Pay schedules and budgeting

Weekly usually means 52 payments and biweekly means 26. Semi-monthly means 24 and monthly means twelve. A biweekly paycheck should not simply be doubled to represent every month's income because some months have three paydays.

Compare the result with a real payslip. The calculator's state percentage is only a flat planning assumption and excludes local taxes and state-specific brackets, deductions and credits. Benefit premiums, wage types and contribution elections can also affect taxable wages differently. Add recurring after-tax deductions separately before setting your budget.

## When to revise an estimate

Recalculate after changing jobs, adding a second job, receiving a significant bonus or changing retirement and health-plan elections. Review withholding after a marriage, new dependent or other major household change. An unexpected tax refund or balance due can indicate that withholding differs from final liability.

Sources: <a href="https://www.irs.gov/publications/p505">IRS withholding and estimated tax guidance</a> and <a href="https://www.ssa.gov/cola/factsheets/2026.html">SSA payroll limits</a>.`,
  },
  "how-salary-sacrifice-reduces-your-tax-bill": {
    title: "Salary Sacrifice: Pension Contributions and Take-Home Pay",
    content: `## What salary sacrifice changes

Under a qualifying salary-sacrifice arrangement, you agree to reduce contractual cash pay in exchange for an employer-provided benefit. Pension salary sacrifice can reduce both Income Tax and employee National Insurance, but the rules depend on the benefit. A car, computer or childcare arrangement must not automatically be treated like a pension contribution.

The <a href="/salary-sacrifice-calculator">salary-sacrifice calculator</a> models pension arrangements using standard England, Wales and Northern Ireland rates for 2026–27. Scottish income tax bands differ. Student loans, minimum-wage checks, benefit-in-kind tax and individual payroll circumstances need separate assessment.

## Income Tax and National Insurance

The standard personal allowance is £12,570. It reduces by £1 for every £2 of adjusted net income above £100,000, reaching zero at £125,140. The standard taxable bands are 20% on the first £37,700, 40% up to £125,140 and 45% above that.

Standard employee National Insurance is 8% between the primary threshold and upper earnings limit, then 2% above. For a standard employer, the ordinary employer rate is 15% above the £5,000 secondary threshold in this tax year. Employer exemptions, allowances and special employee categories are not included in this simple annual model.

## Follow the money

A £1,000 pension sacrifice is not the same as losing £1,000 of take-home pay: tax and employee NI savings reduce the net cost. An employer may also share employer NI savings, but that depends on the scheme. Check whether employer matching is calculated on pre-sacrifice reference salary and whether shared NI savings are added to the pension.

## Check your scheme before choosing an amount

Sacrifice can affect statutory pay, mortgage references and salary-linked benefits unless the employer uses a protected reference salary. Pension annual allowance and relevant tapering rules still apply. A projection of investment growth is an assumption rather than a guaranteed pension outcome.

Source: <a href="https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027">HMRC 2026–27 rates and thresholds</a>.`,
  },
  "how-much-does-ai-api-usage-cost-for-a-small-business": {
    title: "How to Budget for AI API Usage",
    content: `## Start with tokens and actual traffic

An API budget depends on input tokens, output tokens, request volume and the exact provider endpoint. Subscription prices for consumer chat products are not API token prices. Use measured usage from representative requests rather than assuming that one word always equals one token.

The <a href="/ai-token-cost-calculator">AI token cost calculator</a> includes a curated set of published standard-rate presets and editable custom rates. A model not shown can still be estimated by entering its quoted input and output prices. Removed legacy presets should not be read as a claim that every old provider or model has ceased to exist.

## Calculate the base token cost

Multiply uncached input tokens by the input price per million, cached input tokens by the applicable cache-read price, and output tokens by the output price per million. Divide each token count by one million before adding the costs. Then multiply a representative request cost by expected request volume.

Cached reads and writing a cache are different billable operations. The calculator estimates cached reads only. When a custom input rate is supplied, cached input uses that custom rate too rather than silently applying an unrelated model's discount.

## Include charges outside the simple estimate

Tool calls, web search, image and audio processing, cache writes, context-length premiums, hosting and taxes may add charges. Some reasoning tokens are billed as output tokens. Batch, priority, regional and negotiated rates can differ from standard rates. DeepSeek peak presets use the published peak tariff; off-peak requests can cost less. Claude's small-model long-prompt tier also needs a custom rate when applicable.

## Validate before scaling

Measure both average and high-percentile request size. Add a budget for retries and unusually long outputs, then compare estimated costs with actual provider billing. Set usage limits and alerts in the provider account. A cheaper per-token model is not automatically cheaper for a task if it needs more requests or longer outputs to reach the required quality.

Sources: <a href="https://developers.openai.com/api/docs/pricing">OpenAI pricing</a>, <a href="https://platform.claude.com/docs/en/about-claude/pricing">Anthropic pricing</a> and <a href="https://api-docs.deepseek.com/quick_start/pricing/">DeepSeek pricing</a>.`,
  },
};

export function applyReviewedGuide(post: BlogPost): BlogPost {
  if (post.slug === "401k-retirement-calculator" || post.slug === "best-time-to-do-a-roth-ira-conversion") {
    const amounts: Record<string,string> = post.slug === "401k-retirement-calculator"
      ? {"$23,500":"$24,500","$31,000":"$32,500","$7,500":"$8,000","$70,000":"$72,000","$7,000":"$7,500","$8,000":"$8,600","$4,300":"$4,400","$8,550":"$8,750"}
      : {"$7,000":"$7,500","$8,000":"$8,600"};
    const update = (text: string) => text.split("\n").map(line => /contribution|IRA limit|catch-up|HSA limits|415\(c\)/i.test(line)
      ? line.replace(/\$23,500|\$31,000|\$7,500|\$70,000|\$7,000|\$8,000|\$4,300|\$8,550/g, amount => amounts[amount] ?? amount).replace(/\b2025\b(?![-/])/g, "2026")
      : line).join("\n");
    return {...post, content: update(post.content) + '\n\n<p>For eligible participants ages 60–63, a plan may permit a higher $11,250 catch-up contribution. Source: <a href="https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500">IRS 2026 retirement plan limits</a>. Contribution limits do not cap Roth conversions.</p>', faqs: post.faqs?.map(faq => ({question:update(faq.question),answer:update(faq.answer)}))};
  }
  if (post.slug === "how-to-calculate-tfsa-contribution-room-canada") {
    const correct = (text: string) => text.replace(/The CRA allows a lifetime over-contribution buffer of \$2,000\./g, "There is no TFSA over-contribution buffer.").replaceAll("$102,000","$109,000").replace("(projected, subject to inflation indexing)","(confirmed annual limit)");
    return {...post,content:correct(post.content),faqs:post.faqs?.map(faq=>({...faq,answer:correct(faq.answer)}))};
  }
  const review = reviews[post.slug];
  if (!review) return post;
  return {
    ...post, ...review,
    excerpt: review.content.split("\n\n").find(part => !part.startsWith("#")) ?? post.excerpt,
    metaTitle: review.title,
    metaDescription: review.content.split("\n\n").find(part => !part.startsWith("#"))?.slice(0, 155) ?? post.metaDescription,
    faqs: [], // The reviewed guide replaces obsolete FAQ rates as well as body text.
  };
}
