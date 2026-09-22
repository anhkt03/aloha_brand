export function SearchInput({ defaultValue, placeholder = "Tìm kiếm..." }: { defaultValue?: string; placeholder?: string }) {
  return <input name="q" type="search" defaultValue={defaultValue} placeholder={placeholder} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />;
}
