import type { BlogPost } from "@/types";

export const days_between_calculator: BlogPost = {
    slug: "days-between-calculator",
    title: "Days Between Calculator: Count Days, Weeks, Months Between Dates",
    excerpt: "Learn how to calculate the exact number of days, weeks, months, and years between any two dates. Includes formulas, examples, and practical applications.",
    content: `Need to know exactly how many days between two dates? Planning a wedding, tracking a deadline, or just curious? Our <a href="/days-between-calculator">Days Between Calculator</a> gives you the precise interval — in days, weeks, months, years, even hours and minutes.

## How Day Counting Works

Counting days between dates involves a few things:

1. <strong>Subtract the earlier date from the later one</strong>
2. <strong>Account for leap years</strong> — extra day for each Feb 29
3. <strong>Different month lengths</strong> — not all months have 31 days
4. <strong>Inclusive vs exclusive</strong> — should you count the start date?

### The Formula

<strong>Days Between = Later Date - Earlier Date</strong>

Break it down:
1. Days left in the starting month
2. Full days for each complete month in between
3. Days from the end month
4. Add 366 for each leap year, 365 for common years

### Julian Day Numbers

Every date has a unique Julian Day Number (JDN). Days between two dates = difference in their JDNs.

<strong>Days Between = JDN(end) - JDN(start)</strong>

### Inclusive vs Exclusive

- <strong>Exclusive:</strong> Days between the dates (start and end not counted)
- <strong>Inclusive:</strong> Counts the start or end dates too
- <strong>Example:</strong> Jan 1 to Jan 3 exclusive = 2 days; inclusive = 3 days

## How to Use the Calculator

1. Pick start date (month, day, year)
2. Pick end date
3. Choose inclusive or exclusive mode
4. Hit calculate — see results in days, weeks, months, years
5. Optional: add time for hour/minute precision

## Examples

### Example 1: Wedding Countdown

June 20, 2026 to December 15, 2026.

<strong>178 days exclusive, 179 inclusive.</strong> That's 25 weeks and 3 days.

### Example 2: Project Duration

January 15, 2026 to April 10, 2026.

<strong>85 days.</strong> Breakdown: 16 days left in Jan + 28 (Feb) + 31 (Mar) + 10 (Apr).

### Example 3: Moon Landing to Today

July 20, 1969 to June 20, 2026.

<strong>~20,783 days</strong> (56 years, 11 months — 14 leap years accounted for).

### Example 4: Billing Cycle

March 1 to March 31.

<strong>30 days exclusive, 31 days inclusive.</strong>

## Why Use a Days Calculator?

- <strong>Instant results</strong> — no manual counting
- <strong>Multiple units</strong> — days, weeks, months, years, hours, minutes
- <strong>Leap year aware</strong> — automatic
- <strong>Flexible counting</strong> — inclusive or exclusive
- <strong>Accurate</strong> — no off-by-one errors

## Common Mistakes

1. <strong>Off-by-one:</strong> Inclusive vs exclusive always differs by 1
2. <strong>Forgetting leap years:</strong> They add a day to February
3. <strong>Month boundaries:</strong> Jan 31 to Feb 1 is 1 day, not 1 month
4. <strong>Time zones:</strong> For hour precision, keep both dates in the same zone
5. <strong>Year boundaries:</strong> Dec 31 to Jan 1 is 1 day, not 1 year

## FAQs

### What's the difference between inclusive and exclusive?
Exclusive counts days between (neither date included). Inclusive counts one or both. Jan 1 to Jan 3 exclusive = 2 days, inclusive = 3 days.

### How many days in a year?
365 in a common year, 366 in a leap year.

### How do I calculate weeks between dates?
Divide days by 7.

### Does the calculator account for calendar changes?
It uses the Gregorian calendar, the standard today.

Counting days between dates is useful for project management, event planning, finance, and personal tracking. Our <a href="/days-between-calculator">Days Between Calculator</a> gives instant, accurate results. Check out our <a href="/age-calculator">Age Calculator</a> and <a href="/date-calculator">Date Calculator</a> too.`,
    category: "Daily Life",
    categorySlug: "daily-life",
    publishedAt: "2026-02-20",
    updatedAt: "2026-06-19",
    readingTime: 9,
    featured: false,
    popular: false,
    image: "/blog/days-between-calculator.svg",
    author: {
      name: "Achyutananda Meher",
      avatar: "AM",
      role: "Founder of Measurely",
      bio: "Achyutananda Meher is the founder of Measurely. He created the platform to make unit conversions simple and intuitive for professionals and everyday users.",
    },
    relatedSlugs: ["age-calculator", "date-calculator", "time-duration-calculator", "week-calculator"],
    relatedTools: [
      { name: "Age Calculator", slug: "calculate-exact-age-years-months-days-hours", type: "calculator" },
      { name: "Date Calculator", slug: "add-subtract-find-date-differences-ease", type: "calculator" },
      { name: "Time Duration Calculator", slug: "calculate-hours-minutes-seconds-between-times", type: "calculator" },
      { name: "Week Calculator", slug: "find-week-numbers-calculate-weeks-between-dates", type: "calculator" },
    ],
    faqs: [
      { question: "What is the difference between inclusive and exclusive counting?", answer: "Exclusive counts days between (neither included). Inclusive counts one or both dates." },
      { question: "How many days are in a year?", answer: "365 common, 366 leap." },
      { question: "How do I calculate weeks between dates?", answer: "Divide the number of days by 7." },
      { question: "Does the calculator account for the calendar change?", answer: "It uses the Gregorian calendar, the standard today." },
    ],
    tags: ["days between calculator", "count days", "date difference", "day counter", "days between two dates"],
    metaTitle: "Days Between Calculator | Count Days, Weeks, Months Between Dates | Measurely",
    metaDescription: "Learn how to calculate the exact number of days, weeks, months, and years between any two dates. Includes formulas, examples, and practical applications.",
    keywords: ["days between calculator", "count days between dates", "day counter", "date difference calculator", "how many days between"],
  };
