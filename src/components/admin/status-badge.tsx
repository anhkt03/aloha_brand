type Tone = "success" | "warning" | "neutral" | "danger";

const toneClass: Record<Tone, string> = {
  success: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  warning: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
  neutral: "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200",
  danger: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: React.ReactNode }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${toneClass[tone]}`}>{children}</span>;
}

export function StatusBadge({ active, label }: { active: boolean; label?: string }) {
  return <Badge tone={active ? "success" : "neutral"}>{label ?? (active ? "Đang hoạt động" : "Đã tắt")}</Badge>;
}
