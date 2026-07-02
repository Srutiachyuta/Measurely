// =============================================================================
// MEASURELY AD PLACEMENTS CONFIGURATION
// =============================================================================
// Manage all ad slots in one place. 
// To disable an ad: simply comment out its entry with //
// To replace ad code: paste Adsterra (or any) code in the matching component
// =============================================================================

export type AdType = "banner" | "rectangle" | "square" | "native";

export interface AdPlacement {
  /** Unique identifier for this slot (used as component key) */
  id: string;
  /** Ad size/type hint for placeholder display */
  type: AdType;
  /** Human-readable label shown in placeholder */
  label: string;
  /** Adsterra-ready: paste your snippet here later */
  code?: string;
  /** AdSense data-ad-slot (set per-placement or use env default) */
  adSlot?: string;
  /** Optional CSS classes for the container */
  className?: string;
}

// =============================================================================
// CATEGORY PAGES  (/categories/[slug])
// Max: 2 ads
// =============================================================================
export const CATEGORY_TOP_BANNER: AdPlacement = {
  id: "category-top-banner",
  type: "banner",
  label: "728x90 Banner",
};
// export const CATEGORY_MIDDLE_RECTANGLE: AdPlacement = {
//   id: "category-middle-rectangle",
//   type: "rectangle",
//   label: "300x250 Rectangle",
// };

// =============================================================================
// CALCULATOR PAGES  (/calculators/[slug])
// Max: 3 ads
// =============================================================================
export const CALCULATOR_AFTER_RESULT: AdPlacement = {
  id: "calculator-after-result",
  type: "rectangle",
  label: "300x250 Rectangle",
};
export const CALCULATOR_BEFORE_FAQ: AdPlacement = {
  id: "calculator-before-faq",
  type: "banner",
  label: "728x90 Banner",
};
// export const CALCULATOR_AFTER_INTRO: AdPlacement = {
//   id: "calculator-after-intro",
//   type: "banner",
//   label: "728x90 Banner",
// };

// =============================================================================
// CONVERTER PAGES  (/converters/[slug])
// Max: 2 ads
// =============================================================================
export const CONVERTER_BELOW_CARD: AdPlacement = {
  id: "converter-below-card",
  type: "rectangle",
  label: "300x250 Rectangle",
};
// export const CONVERTER_BEFORE_FAQ: AdPlacement = {
//   id: "converter-before-faq",
//   type: "banner",
//   label: "728x90 Banner",
// };

// =============================================================================
// BLOG LISTING  (/blog)
// Max: 2 ads
// =============================================================================
// export const BLOG_LISTING_MIDDLE: AdPlacement = {
//   id: "blog-listing-middle",
//   type: "banner",
//   label: "728x90 Banner",
// };

// =============================================================================
// BLOG POST PAGES  (/blog/[slug])
// Max: 2 ads
// =============================================================================
export const BLOG_AFTER_CONTENT: AdPlacement = {
  id: "blog-after-content",
  type: "rectangle",
  label: "300x250 Rectangle",
};
// export const BLOG_BEFORE_RELATED: AdPlacement = {
//   id: "blog-before-related",
//   type: "banner",
//   label: "728x90 Banner",
// };

// =============================================================================
// STATIC PAGES  (about, contact, privacy, terms, disclaimer)
// Max: 1 ad each (near bottom)
// =============================================================================
export const ABOUT_BOTTOM: AdPlacement = {
  id: "about-bottom",
  type: "banner",
  label: "728x90 Banner",
};
export const CONTACT_BOTTOM: AdPlacement = {
  id: "contact-bottom",
  type: "banner",
  label: "728x90 Banner",
};
export const PRIVACY_BOTTOM: AdPlacement = {
  id: "privacy-bottom",
  type: "banner",
  label: "728x90 Banner",
};
export const TERMS_BOTTOM: AdPlacement = {
  id: "terms-bottom",
  type: "banner",
  label: "728x90 Banner",
};
export const DISCLAIMER_BOTTOM: AdPlacement = {
  id: "disclaimer-bottom",
  type: "banner",
  label: "728x90 Banner",
};

// =============================================================================
// SEARCH, 404, FAVORITES, HISTORY
// Max: 1 ad each
// =============================================================================
// export const SEARCH_BOTTOM: AdPlacement = {
//   id: "search-bottom",
//   type: "banner",
//   label: "728x90 Banner",
// };
// export const NOT_FOUND_BOTTOM: AdPlacement = {
//   id: "not-found-bottom",
//   type: "banner",
//   label: "728x90 Banner",
// };

// =============================================================================
// ALL ACTIVE PLACEMENTS (import this to loop if needed)
// =============================================================================
export const activePlacements: AdPlacement[] = [
  CATEGORY_TOP_BANNER,
  CALCULATOR_AFTER_RESULT,
  CALCULATOR_BEFORE_FAQ,
  CONVERTER_BELOW_CARD,
  BLOG_AFTER_CONTENT,
  ABOUT_BOTTOM,
  CONTACT_BOTTOM,
  PRIVACY_BOTTOM,
].filter(Boolean);
