import { calculators } from "@/data/calculators";
import { blogs } from "@/data/blogs";
import { CATEGORIES } from "@/lib/constants";

export interface SearchableItem {
  id: string;
  title: string;
  description: string;
  href: string;
  category: string;
  type: "tool" | "blog" | "faq" | "page";
  keywords: string[];
}

export interface ScoredResult {
  item: SearchableItem;
  score: number;
}

const synonymMap: Record<string, string[]> = {
  tax: ["taxes", "taxation", "tax return", "tax refund", "irs", "income tax", "filing", "deduction"],
  mortgage: ["home loan", "house loan", "refinance", "property loan", "housing loan"],
  loan: ["loans", "borrow", "borrowing", "credit", "financing", "lending", "mortgage"],
  emi: ["equated monthly installment", "monthly payment", "installment"],
  salary: ["salaries", "take home", "net pay", "wages", "income", "paycheck", "compensation"],
  calculator: ["calculators", "calculate", "calculation", "calculating", "tool", "tools", "compute"],

  bmi: ["body mass index", "body fat", "weight"],
  tfsa: ["tax free savings account", "savings account", "contribution room"],
  rrsp: ["registered retirement savings plan", "retirement savings", "pension"],
  gst: ["goods and services tax", "hst", "sales tax", "vat", "harmonized sales tax"],
  investment: ["investing", "invest", "returns", "portfolio", "sip", "mutual fund"],
  retirement: ["pension", "superannuation", "401k", "roth", "ira"],
  insurance: ["life insurance", "health insurance", "premium", "coverage"],
  canada: ["canadian", "ca"],
  ontario: ["on"],
  bc: ["british columbia"],
  finance: ["financial", "money", "budget", "budgeting", "savings"],
  health: ["healthy", "fitness", "wellness", "medical", "wellbeing"],
  engineering: ["engineer", "electrical", "circuit", "electronic", "mechanical"],
  construction: ["building", "contractor", "home improvement", "renovation"],
  math: ["mathematics", "algebra", "arithmetic", "geometry", "calculus"],
  time: ["date", "duration", "clock", "schedule", "calendar"],
  real: ["real estate", "realtor", "property"],
  estate: ["real estate", "realtor", "property"],
  energy: ["electricity", "power", "utility", "consumption", "kwh"],
  rent: ["rental", "leasing", "tenant", "landlord"],
  car: ["automotive", "vehicle", "auto", "truck"],
};

function stem(word: string): string {
  const lower = word.toLowerCase();
  if (lower.endsWith("ies") && lower.length > 3) return lower.slice(0, -3) + "y";
  if (lower.endsWith("ves") && lower.length > 3) return lower.slice(0, -3) + "f";
  if (lower.endsWith("es") && lower.length > 3) return lower.slice(0, -2);
  if (lower.endsWith("s") && !lower.endsWith("ss") && lower.length > 2) return lower.slice(0, -1);
  if (lower.endsWith("ing") && lower.length > 4) return lower.slice(0, -3);
  if (lower.endsWith("ed") && lower.length > 3) return lower.slice(0, -2);
  if (lower.endsWith("er") && lower.length > 3) return lower.slice(0, -2);
  return lower;
}

function getSynonyms(word: string): string[] {
  const lower = word.toLowerCase();
  const direct = synonymMap[lower];
  if (direct) return direct;
  for (const [key, syns] of Object.entries(synonymMap)) {
    if (syns.some((s) => s.includes(lower) || lower.includes(s))) {
      return [key, ...syns];
    }
  }
  return [];
}

function extractHeadings(content: string): string[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: string[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push(match[2].trim());
  }
  return headings;
}

function computeFieldScore(
  queryWords: string[],
  stemmedWords: string[],
  fieldValue: string,
  synonyms: string[][]
): number {
  const val = fieldValue.toLowerCase();
  const stemmedVal = stem(val);
  let score = 0;

  for (let i = 0; i < queryWords.length; i++) {
    const qw = queryWords[i];
    const sw = stemmedWords[i];

    if (val === qw) {
      score += 2;
    } else if (val.startsWith(qw + " ") || val.endsWith(" " + qw) || val.includes(" " + qw + " ")) {
      score += 1.5;
    } else if (val.includes(qw)) {
      score += 0.8;
    } else if (stemmedVal.includes(sw)) {
      score += 0.5;
    } else {
      for (const syns of synonyms) {
        for (const syn of syns) {
          if (val.includes(syn)) {
            score += 0.3;
            break;
          }
        }
      }
    }
  }

  return score;
}

export function buildSearchIndex(): SearchableItem[] {
  const index: SearchableItem[] = [];
  const seen = new Set<string>();

  for (const calc of calculators) {
    const id = `calc-${calc.slug}`;
    if (seen.has(id)) continue;
    seen.add(id);

    const kws = [
      calc.name,
      calc.slug.replace(/-/g, " "),
      calc.description,
      calc.metaTitle,
      calc.metaDescription,
      calc.category,
      ...CATEGORIES.filter((c) => c.slug === calc.category).flatMap((c) => [c.name, c.description]),
    ];

    index.push({
      id,
      title: calc.name,
      description: calc.description,
      href: `/${calc.slug}`,
      category: CATEGORIES.find((c) => c.slug === calc.category)?.name || calc.category,
      type: "tool",
      keywords: kws,
    });

    for (const faq of calc.faqs || []) {
      const faqId = `calc-faq-${calc.slug}-${faq.question.slice(0, 30)}`;
      if (seen.has(faqId)) continue;
      seen.add(faqId);
      index.push({
        id: faqId,
        title: faq.question,
        description: faq.answer,
        href: `/${calc.slug}`,
        category: "FAQ",
        type: "faq",
        keywords: [faq.question, faq.answer, calc.name, calc.category],
      });
    }
  }

  for (const post of blogs) {
    const id = `blog-${post.slug}`;
    if (seen.has(id)) continue;
    seen.add(id);

    const headings = extractHeadings(post.content);

    const kws = [
      post.title,
      post.slug.replace(/-/g, " "),
      post.excerpt,
      post.category,
      post.metaTitle,
      post.metaDescription,
      ...post.tags,
      ...post.keywords,
      ...headings,
      ...(post.faqs || []).flatMap((f) => [f.question, f.answer]),
      "article",
      "blog",
    ];

    index.push({
      id,
      title: post.title,
      description: post.excerpt,
      href: `/${post.slug}`,
      category: post.category,
      type: "blog",
      keywords: kws,
    });

    for (const faq of post.faqs || []) {
      const faqId = `blog-faq-${post.slug}-${faq.question.slice(0, 30)}`;
      if (seen.has(faqId)) continue;
      seen.add(faqId);
      index.push({
        id: faqId,
        title: faq.question,
        description: faq.answer,
        href: `/${post.slug}`,
        category: "FAQ",
        type: "faq",
        keywords: [faq.question, faq.answer, post.title, post.category],
      });
    }
  }

  return index;
}

export function searchIndex(
  query: string,
  index: SearchableItem[]
): ScoredResult[] {
  if (!query || query.trim().length < 2) return [];

  const queryTrimmed = query.trim().toLowerCase();
  const queryWords = queryTrimmed.split(/\s+/).filter(Boolean);
  const stemmedWords = queryWords.map(stem);
  const synonyms = queryWords.map((w) => getSynonyms(w));

  const scored: ScoredResult[] = [];

  for (const item of index) {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const titleMatch = computeFieldScore(queryWords, stemmedWords, item.title, synonyms);
    score += titleMatch * 10;

    if (titleLower === queryTrimmed) {
      score += 200;
    } else if (titleLower.startsWith(queryTrimmed)) {
      score += 100;
    } else if (queryWords.every((w) => titleLower.includes(w))) {
      score += 60;
    }

    const descScore = computeFieldScore(queryWords, stemmedWords, item.description, synonyms);
    score += descScore * 3;

    const catScore = computeFieldScore(queryWords, stemmedWords, item.category, synonyms);
    score += catScore * 5;

    const kwText = item.keywords.join(" ").toLowerCase();
    const kwScore = computeFieldScore(queryWords, stemmedWords, kwText, synonyms);
    score += kwScore * 2;

    if (score > 0) {
      scored.push({ item, score });
    }
  }

  return scored.sort((a, b) => {
    if (Math.abs(b.score - a.score) > 10) return b.score - a.score;

    const aTitle = a.item.title.toLowerCase();
    const bTitle = b.item.title.toLowerCase();
    if (aTitle === queryTrimmed) return -1;
    if (bTitle === queryTrimmed) return 1;
    if (aTitle.startsWith(queryTrimmed) && !bTitle.startsWith(queryTrimmed)) return -1;
    if (bTitle.startsWith(queryTrimmed) && !aTitle.startsWith(queryTrimmed)) return 1;

    return b.score - a.score;
  });
}

export function getHighlightSegments(text: string, query: string): { text: string; highlighted: boolean }[] {
  if (!query || query.trim().length < 2) return [{ text, highlighted: false }];

  const queryWords = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const lowerText = text.toLowerCase();
  const segments: { text: string; highlighted: boolean }[] = [];

  if (queryWords.length === 0) {
    return [{ text, highlighted: false }];
  }

  const allKeywords = [...queryWords];
  for (const qw of queryWords) {
    const syns = getSynonyms(qw);
    allKeywords.push(...syns);
  }

  const uniqueSorted = [...new Set(allKeywords)]
    .sort((a, b) => b.length - a.length)
    .filter((kw) => kw.length >= 2);

  let remaining = text;
  let pos = 0;

  while (remaining.length > 0) {
    let bestMatch: { index: number; keyword: string } | null = null;

    for (const kw of uniqueSorted) {
      const idx = remaining.toLowerCase().indexOf(kw);
      if (idx !== -1 && (bestMatch === null || idx < bestMatch.index)) {
        bestMatch = { index: idx, keyword: kw };
      }
    }

    if (bestMatch === null) {
      if (segments.length > 0 && !segments[segments.length - 1].highlighted) {
        segments[segments.length - 1].text += remaining;
      } else {
        segments.push({ text: remaining, highlighted: false });
      }
      break;
    }

    if (bestMatch.index > 0) {
      segments.push({
        text: remaining.slice(0, bestMatch.index),
        highlighted: false,
      });
    }

    segments.push({
      text: remaining.slice(bestMatch.index, bestMatch.index + bestMatch.keyword.length),
      highlighted: true,
    });

    remaining = remaining.slice(bestMatch.index + bestMatch.keyword.length);
  }

  return segments;
}
