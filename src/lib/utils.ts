export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Deterministic date formatter — same output on Node and browser
 * to avoid hydration mismatches.
 */
/**
 * Parses a `datetime-local` input value ("YYYY-MM-DDTHH:mm") as raw wall-clock
 * numbers, independent of the server process's own timezone. The site treats
 * every stored timestamp as Vietnam (UTC+7) wall-clock and always reads it
 * back with a forced `timeZone: "UTC"` (see `formatDate`), so parsing must
 * avoid `new Date(string)` — its no-offset form resolves against whatever
 * timezone the Node process happens to run in, not Vietnam's.
 */
export function parseLocalDateTime(value: string): Date {
  const [datePart, timePart = "00:00"] = value.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);
  return new Date(Date.UTC(year, month - 1, day, hour, minute));
}

export function formatDate(iso: string | Date, locale: string = "vi"): string {
  const d = new Date(iso);

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}
