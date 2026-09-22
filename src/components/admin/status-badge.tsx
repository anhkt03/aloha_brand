export function StatusBadge({ active, label }: { active: boolean; label?: string }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${active ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>
      {label ?? (active ? "Đang hoạt động" : "Đã tắt")}
    </span>
  );
}
