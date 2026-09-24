"use client";

import { useRef } from "react";

export function ConfirmDialog({
  trigger = "Xóa",
  triggerLabel,
  triggerClassName = "rounded-md px-2.5 py-1.5 text-sm font-semibold text-red-600 transition hover:bg-red-50",
  title = "Xác nhận xóa",
  description = "Thao tác này không thể hoàn tác.",
  children,
}: {
  trigger?: React.ReactNode;
  /** Tooltip + accessible name for the trigger — required when `trigger` isn't plain text (e.g. an icon). */
  triggerLabel?: string;
  triggerClassName?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const label = triggerLabel ?? (typeof trigger === "string" ? trigger : undefined);
  return (
    <>
      <button type="button" onClick={() => dialogRef.current?.showModal()} title={label} aria-label={label} className={triggerClassName}>
        {trigger}
      </button>
      <dialog ref={dialogRef} className="rounded-lg border border-slate-200 p-0 shadow-xl backdrop:bg-slate-900/50">
        <div className="w-[min(90vw,380px)] p-5">
          <h2 className="font-display text-base font-black text-slate-900">{title}</h2>
          <p className="mt-2 text-sm text-slate-500">{description}</p>
          <div className="mt-5 flex justify-end gap-2">
            <button type="button" onClick={() => dialogRef.current?.close()} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Hủy
            </button>
            {children}
          </div>
        </div>
      </dialog>
    </>
  );
}
