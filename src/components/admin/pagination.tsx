import Link from "next/link";
import { cn } from "@/lib/utils";

function pageList(current: number, total: number): (number | "…")[] {
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);
  const result: (number | "…")[] = [];
  sorted.forEach((page, index) => {
    if (index > 0 && page - (sorted[index - 1] as number) > 1) result.push("…");
    result.push(page);
  });
  return result;
}

export function Pagination({ page, totalPages, makeHref }: { page: number; totalPages: number; makeHref: (page: number) => string }) {
  if (totalPages <= 1) return null;
  const navButton = "inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-slate-300 bg-white px-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50";
  const navButtonDisabled = "inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-slate-200 bg-slate-50 px-2 text-sm font-semibold text-slate-300";

  return (
    <nav aria-label="Phân trang" className="flex flex-wrap items-center justify-center gap-1.5">
      {page > 1 ? <Link href={makeHref(page - 1)} className={navButton}>←</Link> : <span className={navButtonDisabled}>←</span>}
      {pageList(page, totalPages).map((item, index) =>
        item === "…" ? (
          <span key={`gap-${index}`} className="px-1 text-sm text-slate-400">…</span>
        ) : (
          <Link
            key={item}
            href={makeHref(item)}
            aria-current={item === page ? "page" : undefined}
            className={cn(
              "inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2.5 text-sm font-semibold transition",
              item === page ? "bg-indigo-600 text-white" : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
            )}
          >
            {item}
          </Link>
        ),
      )}
      {page < totalPages ? <Link href={makeHref(page + 1)} className={navButton}>→</Link> : <span className={navButtonDisabled}>→</span>}
    </nav>
  );
}
