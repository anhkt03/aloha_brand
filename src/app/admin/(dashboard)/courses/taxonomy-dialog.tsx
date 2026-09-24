"use client";

import { useRef } from "react";
import { TaxonomyForm } from "./taxonomy-form";

type TaxonomyItem = { id: number; translations: { locale: string; name: string }[] };

export function TaxonomyDialog({
  action,
  item,
  title,
  trigger,
  triggerClassName,
  triggerLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  item?: TaxonomyItem;
  title: string;
  trigger: React.ReactNode;
  triggerClassName?: string;
  triggerLabel?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  async function handleSubmit(formData: FormData) {
    await action(formData);
    dialogRef.current?.close();
  }

  return (
    <>
      <button type="button" onClick={() => dialogRef.current?.showModal()} title={triggerLabel} aria-label={triggerLabel} className={triggerClassName}>
        {trigger}
      </button>
      <dialog ref={dialogRef} className="rounded-lg border border-slate-200 p-0 shadow-xl backdrop:bg-slate-900/50">
        <div className="w-[min(90vw,640px)] p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base font-black text-slate-900">{title}</h2>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Đóng"
              className="grid h-8 w-8 place-items-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </div>
          <TaxonomyForm action={handleSubmit} item={item} />
        </div>
      </dialog>
    </>
  );
}
