"use client";

import { useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const statusSelectClass =
  "w-40 shrink-0 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

/**
 * Search + status filter bar that updates the URL via the client router
 * (soft navigation) instead of a native form GET submit — a full page
 * reload was the slow part, not the server query itself.
 */
export function ListFilters({
  searchPlaceholder,
  statusOptions,
}: {
  searchPlaceholder: string;
  statusOptions: { value: string; label: string }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function applyParams(next: Record<string, string>) {
    const params = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    params.set("page", "1");
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => applyParams({ q: value }), 400);
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        clearTimeout(debounceRef.current);
        applyParams({ q: query });
      }}
      className="flex flex-nowrap items-center gap-2"
    >
      <div className="relative min-w-[160px] max-w-xs flex-1">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.35-4.35" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(event) => handleQueryChange(event.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-md border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>
      <select
        defaultValue={searchParams.get("status") ?? ""}
        onChange={(event) => applyParams({ status: event.target.value })}
        className={statusSelectClass}
      >
        <option value="">Tất cả</option>
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <button
        type="submit"
        disabled={isPending}
        className="shrink-0 rounded-md border border-slate-300 px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Đang lọc..." : "Lọc"}
      </button>
    </form>
  );
}
