import Link from "next/link";
import { cn } from "@/lib/utils";

export const inputClass =
  "mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

export function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block text-sm font-semibold text-slate-700", className)}>
      {label}
      {children}
      {hint ? <span className="mt-1 block text-xs font-normal text-slate-400">{hint}</span> : null}
    </label>
  );
}

export function Panel({ title, description, className, children }: { title?: string; description?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-xl border border-slate-200 bg-white p-5 shadow-sm", className)}>
      {title ? (
        <div className="mb-3">
          <p className="font-display text-sm font-bold text-slate-900">{title}</p>
          {description ? <p className="mt-0.5 text-xs font-normal text-slate-400">{description}</p> : null}
        </div>
      ) : null}
      {children}
    </div>
  );
}

export const buttonVariants = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-500",
  ghost: "border border-slate-300 text-slate-700 hover:bg-slate-50",
  danger: "border border-red-200 text-red-600 hover:bg-red-50",
} as const;

type ButtonVariant = keyof typeof buttonVariants;
export const buttonBase = "inline-flex items-center justify-center gap-1.5 rounded-md px-3.5 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60";

export function Button({ variant = "primary", className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button className={cn(buttonBase, buttonVariants[variant], className)} {...props} />;
}

export function LinkButton({ variant = "primary", className, href, ...props }: React.ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return <Link href={href} className={cn(buttonBase, buttonVariants[variant], className)} {...props} />;
}

export function PageHeader({ eyebrow, title, actions }: { eyebrow?: string; title: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        {eyebrow ? <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">{eyebrow}</span> : null}
        <h1 className="mt-1 font-display text-2xl font-black text-slate-900">{title}</h1>
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}
