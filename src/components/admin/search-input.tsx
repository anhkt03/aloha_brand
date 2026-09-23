export function SearchInput({ defaultValue, placeholder = "Tìm kiếm..." }: { defaultValue?: string; placeholder?: string }) {
  return (
    <div className="relative">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.35-4.35" strokeLinecap="round" />
      </svg>
      <input
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-md border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  );
}
