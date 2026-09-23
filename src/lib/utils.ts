export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Deterministic date formatter — same output on Node and browser
 * to avoid hydration mismatches.
 */
export function formatDate(iso: string | Date, locale: string = "vi"): string {
  const d = new Date(iso);

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}
