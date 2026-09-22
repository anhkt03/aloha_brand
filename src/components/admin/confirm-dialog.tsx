"use client";

import { useRef } from "react";

export function ConfirmDialog({ title = "Xác nhận xóa", description = "Thao tác này không thể hoàn tác.", children }: { title?: string; description?: string; children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return <><button type="button" onClick={() => dialogRef.current?.showModal()} className="text-sm text-red-700">Xóa</button><dialog ref={dialogRef} className="rounded-lg p-0 shadow-xl"><div className="p-5"><h2 className="font-bold">{title}</h2><p className="mt-2 text-sm text-slate-600">{description}</p><div className="mt-4 flex justify-end gap-2"><button type="button" onClick={() => dialogRef.current?.close()} className="rounded border px-3 py-2 text-sm">Hủy</button>{children}</div></div></dialog></>;
}
