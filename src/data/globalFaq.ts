/**
 * FAQ item order shown on /duhocquocte.
 * Q/A copy is localized — see `pages.global.faq.items.<key>` in
 * `messages/*.json`. This file only holds the fixed display order.
 */
export const globalFaqKeys = [
  "cost",
  "timing",
  "language",
  "scholarshipSupport",
  "workAfter",
  "noLanguageYet",
] as const;
export type FaqKey = (typeof globalFaqKeys)[number];
