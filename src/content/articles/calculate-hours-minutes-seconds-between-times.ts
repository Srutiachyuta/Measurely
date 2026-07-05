import type { BlogPost } from "@/types";

export const calculate_hours_minutes_seconds_between_times: BlogPost = {
    slug: "calculate-hours-minutes-seconds-between-times",
    title: "Time Duration Calculator: Calculate Hours, Minutes, and Seconds Between Times",
    excerpt: "Master time duration calculations — learn how to calculate elapsed time, add and subtract time intervals, and convert between time units with practical examples.",
    content: `<h2>How Time Duration Works</h2>

Need to know how long a meeting ran? What about your total work hours this week? Or the duration of a road trip? Our <a href="/time-duration-calculator">Time Duration Calculator</a> gives you precise answers.

The basic idea is simple:

<strong>Duration = End Time - Start Time</strong>

But it gets tricky when:
1. Times cross midnight
2. AM/PM gets confusing (is 12:00 AM midnight or noon?)
3. Time zones are involved
4. Daylight saving kicks in

<h3>Basic Formula</h3>

<strong>Hours = End_Hour - Start_Hour</strong>
<strong>Minutes = End_Minute - Start_Minute</strong>
<strong>Seconds = End_Second - Start_Second</strong>

If minutes or seconds are negative, borrow from hours or minutes.

<h3>Crossing Midnight</h3>

<strong>Duration = (24:00 - Start_Time) + End_Time</strong>

<h3>24-Hour Format</h3>

Saves you from AM/PM headaches:
- 1:00 PM = 13:00
- 12:00 AM = 00:00
- 12:00 PM = 12:00

<h2>Using the Calculator</h2>

Our <a href="/time-duration-calculator">Time Duration Calculator</a> lets you:

1. Calculate duration between two times
2. Add or subtract hours, minutes, seconds
3. Convert between time units
4. Use AM/PM or 24-hour format
5. Include dates for multi-day durations

<h2>Real-World Examples</h2>

<h3>Work Shift</h3>

9:00 AM to 5:30 PM, 30-minute lunch break.

Duration: 5:30 PM - 9:00 AM = <strong>8 hrs 30 min</strong>
Paid hours: 8 hrs 30 min - 30 min = <strong>8 hours</strong>

<h3>Travel Time</h3>

Flight departs 10:15 AM, arrives 2:45 PM.

<strong>4 hours 30 minutes</strong>

<h3>Overnight Shift</h3>

11:00 PM to 7:00 AM next day.

(11 PM to midnight = 1 hr) + (midnight to 7 AM = 7 hrs) = <strong>8 hours</strong>

<h3>Cooking Timer</h3>

Bake for 45 minutes starting at 3:10 PM.

<strong>3:10 PM + 45 min = 3:55 PM</strong>

<h2>Why Use a Time Duration Calculator?</h2>

- <strong>Precision:</strong> Accurate to the second
- <strong>Cross-midnight:</strong> Handles overnight automatically
- <strong>Multiple operations:</strong> Duration, addition, subtraction, conversion
- <strong>No AM/PM errors:</strong> 24-hour option available
- <strong>Timesheets:</strong> Perfect for payroll and billing

<h2>Common Mistakes</h2>

1. <strong>AM/PM confusion:</strong> 12:00 AM = midnight, 12:00 PM = noon
2. <strong>Cross-midnight:</strong> 11 PM to 2 AM = 3 hours, not -9
3. <strong>Daylight saving:</strong> Spring forward/fall back can throw things off by an hour
4. <strong>Time zones:</strong> Convert to a common zone first
5. <strong>Decimal hours:</strong> 1.5 hours = 1 hr 30 min, not 1 hr 50 min

<h2>The Bottom Line</h2>

Time duration math matters for work, travel, cooking, fitness, and more. Our <a href="/time-duration-calculator">Time Duration Calculator</a> handles cross-midnight, multiple formats, and unit conversions.

Also check out the <a href="/week-calculator">Week Calculator</a> and <a href="/age-calculator">Age Calculator</a>.`,
    category: "Daily Life",
    categorySlug: "daily-life",
    publishedAt: "2026-03-05",
    updatedAt: "2026-06-19",
    readingTime: 9,
    featured: false,
    popular: false,
    image: "/blog/time-duration-calculator.svg",
    author: {
      name: "Achyutananda Meher",
      avatar: "AM",
      role: "Founder of Measurely",
      bio: "Achyutananda Meher is the founder of Measurely. He created the platform to make unit conversions simple and intuitive for professionals and everyday users.",
    },
    relatedSlugs: ["week-calculator", "date-calculator", "age-calculator", "days-between-calculator"],
    relatedTools: [
      { name: "Week Calculator", slug: "find-week-numbers-calculate-weeks-between-dates", type: "calculator" },
      { name: "Date Calculator", slug: "add-subtract-find-date-differences-ease", type: "calculator" },
      { name: "Age Calculator", slug: "calculate-exact-age-years-months-days-hours", type: "calculator" },
      { name: "Days Between Calculator", slug: "days-between-calculator", type: "calculator" },
    ],
    faqs: [
      { question: "How do I calculate time duration across midnight?", answer: "Add time from start to midnight plus time from midnight to end." },
      { question: "What is the difference between 12-hour and 24-hour format?", answer: "12-hour uses AM/PM; 24-hour uses 00:00-23:00." },
      { question: "How do I convert decimal hours to hours and minutes?", answer: "Multiply the decimal by 60. 1.75 hours = 1 hour 45 minutes." },
      { question: "Can it handle durations longer than 24 hours?", answer: "Yes, with date support it handles multi-day durations." },
    ],
    tags: ["time duration calculator", "hours minutes seconds", "elapsed time", "time difference", "work hours calculator"],
    metaTitle: "Time Duration Calculator | Calculate Hours, Minutes, Seconds Between Times | Measurely",
    metaDescription: "Master time duration calculations — calculate elapsed time, add and subtract time intervals, and convert between time units with practical examples.",
    keywords: ["time duration calculator", "calculate hours between times", "time difference", "elapsed time calculator", "work hours calculator"],
  };
