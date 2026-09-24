/**
 * "Quy trình du học" — 6-step process shown on /duhocquocte.
 * Title/desc copy is localized — see `pages.global.timeline.steps.<key>`
 * in `messages/*.json`. This file only holds the step order/number.
 */
export const globalTimelineSteps = ["step1", "step2", "step3", "step4", "step5", "step6"] as const;
export type TimelineStepKey = (typeof globalTimelineSteps)[number];
