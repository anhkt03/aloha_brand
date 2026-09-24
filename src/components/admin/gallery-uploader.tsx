"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IMAGE_EXTENSIONS, MAX_IMAGE_SIZE } from "@/lib/storage-validation";

const ACCEPT = Object.keys(IMAGE_EXTENSIONS).join(",");
const MAX_ITEMS = 20;

type Pending = { file: File; previewUrl: string };
type Uploaded = { url: string; path: string };

function validateClientSide(file: File) {
  if (!(file.type in IMAGE_EXTENSIONS)) return `${file.name}: định dạng không được hỗ trợ.`;
  if (file.size > MAX_IMAGE_SIZE) return `${file.name}: vượt quá giới hạn 5MB.`;
  return null;
}

/**
 * Same select → preview → confirm flow as ImageUploader, but for multiple
 * files at once. Removing an already-uploaded item also deletes it from
 * storage immediately (unlike a single-image replace, which the server
 * reconciles on save).
 */
export function GalleryUploader({ name, folder, defaultValue = [] }: { name: string; folder: string; defaultValue?: string[] }) {
  const [items, setItems] = useState<Uploaded[]>(defaultValue.map((url) => ({ url, path: "" })));
  const [pending, setPending] = useState<Pending[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      pending.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pickFiles(files: FileList | null) {
    if (!files?.length) return;
    const room = MAX_ITEMS - items.length - pending.length;
    const list = Array.from(files).slice(0, Math.max(room, 0));
    if (list.length < files.length) setError(`Chỉ có thể thêm tối đa ${MAX_ITEMS} ảnh.`);
    else setError("");
    for (const file of list) {
      const message = validateClientSide(file);
      if (message) {
        setError(message);
        continue;
      }
      setPending((current) => [...current, { file, previewUrl: URL.createObjectURL(file) }]);
    }
    if (inputRef.current) inputRef.current.value = "";
  }

  function dropPending(previewUrl: string) {
    setPending((current) => current.filter((item) => item.previewUrl !== previewUrl));
    URL.revokeObjectURL(previewUrl);
  }

  async function confirmUpload() {
    if (!pending.length) return;
    setUploading(true);
    setError("");
    try {
      const uploaded: Uploaded[] = [];
      for (const item of pending) {
        const body = new FormData();
        body.set("file", item.file);
        body.set("folder", folder);
        const response = await fetch("/api/admin/media", { method: "POST", body });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || `${item.file.name}: tải lên thất bại.`);
        uploaded.push({ url: data.url, path: data.path });
      }
      setItems((current) => [...current, ...uploaded].slice(0, MAX_ITEMS));
      pending.forEach((item) => URL.revokeObjectURL(item.previewUrl));
      setPending([]);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Tải ảnh lên thất bại.");
    } finally {
      setUploading(false);
    }
  }

  async function removeUploaded(item: Uploaded) {
    setItems((current) => current.filter((entry) => entry.url !== item.url));
    if (!item.path) return;
    try {
      await fetch("/api/admin/media", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path: item.path }) });
    } catch {
      // Best-effort cleanup; the image is already detached from the form either way.
    }
  }

  return (
    <div className="grid gap-3">
      <input type="hidden" name={name} value={items.map((item) => item.url).join("\n")} />

      {items.length || pending.length ? (
        <div className="flex flex-wrap gap-3">
          {items.map((item) => (
            <div key={item.url} className="relative h-24 w-36 overflow-hidden rounded-lg border border-slate-200">
              <Image src={item.url} alt="Ảnh thư viện" fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeUploaded(item)}
                aria-label="Xóa ảnh khỏi thư viện"
                className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-slate-900/70 text-xs text-white transition hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
          {pending.map((item) => (
            <div key={item.previewUrl} className="relative h-24 w-36 overflow-hidden rounded-lg border border-dashed border-indigo-300">
              <Image src={item.previewUrl} alt="Ảnh chờ tải lên" fill unoptimized className="object-cover" />
              <span className="absolute left-1 top-1 rounded-full bg-slate-900/80 px-1.5 py-0.5 text-[10px] font-semibold text-white">Chờ tải lên</span>
              <button
                type="button"
                onClick={() => dropPending(item.previewUrl)}
                aria-label="Bỏ ảnh này"
                className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-slate-900/70 text-xs text-white transition hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <label className="cursor-pointer rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
          + Chọn ảnh
          <input ref={inputRef} type="file" multiple accept={ACCEPT} className="hidden" onChange={(event) => pickFiles(event.target.files)} disabled={items.length + pending.length >= MAX_ITEMS} />
        </label>
        {pending.length ? (
          <button
            type="button"
            onClick={confirmUpload}
            disabled={uploading}
            className="inline-flex items-center gap-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-60"
          >
            {uploading ? "Đang tải lên..." : `Xác nhận & tải lên (${pending.length})`}
          </button>
        ) : null}
      </div>

      <p className="text-xs text-slate-400">Tối đa {MAX_ITEMS} ảnh, mỗi ảnh ≤ 5MB.</p>
      {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
