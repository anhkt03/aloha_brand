import Link from "next/link";
import { cn } from "@/lib/utils";

export function Icon({ path, className = "h-[18px] w-[18px]" }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

export const ICON_PATHS = {
  edit: "M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",
  trash: "M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16z",
  back: "M19 12H5m0 0 6 6m-6-6 6-6",
} as const;

const toneClass = {
  neutral: "text-slate-500 hover:bg-slate-100 hover:text-slate-700",
  danger: "text-red-600 hover:bg-red-50",
} as const;

/** Square icon-only link, e.g. an "edit" action in a table row — always carries a tooltip + accessible name. */
export function IconLink({ href, label, path, tone = "neutral" }: { href: string; label: string; path: string; tone?: keyof typeof toneClass }) {
  return (
    <Link href={href} title={label} aria-label={label} className={cn("grid h-8 w-8 place-items-center rounded-md transition", toneClass[tone])}>
      <Icon path={path} />
    </Link>
  );
}
