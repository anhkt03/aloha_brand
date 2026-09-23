"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IMAGE_EXTENSIONS, MAX_IMAGE_SIZE } from "@/lib/storage-validation";

const ACCEPT = Object.keys(IMAGE_EXTENSIONS).join(",");

function validateClientSide(file: File) {
  if (!(file.type in IMAGE_EXTENSIONS)) return "Định dạng ảnh không được hỗ trợ.";
  if (file.size > MAX_IMAGE_SIZE) return "Ảnh vượt quá giới hạn 5MB.";
  return null;
}

/**
 * Select → preview locally → explicit confirm uploads to storage and returns
 * the URL. The URL only ever appears as a hidden field (never shown as raw
 * text) and rides along with the rest of the form on submit.
 */
export function ImageUploader({
  name,
  folder,
  defaultValue = "",
  required = false,
}: {
  name: string;
  folder: string;
  defaultValue?: string;
  required?: boolean;
}) {
  const [committedUrl, setCommittedUrl] = useState(defaultValue);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function pickFile(file?: File) {
    if (!file) return;
    const message = validateClientSide(file);
    if (message) {
      setError(message);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setError("");
    setPendingFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function cancelPending() {
    setPendingFile(null);
    setPreviewUrl("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  async function confirmUpload() {
    if (!pendingFile) return;
    setUploading(true);
    setError("");
    try {
      const body = new FormData();
      body.set("file", pendingFile);
      body.set("folder", folder);
      const response = await fetch("/api/admin/media", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Tải ảnh lên thất bại.");
      setCommittedUrl(data.url);
      cancelPending();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Tải ảnh lên thất bại.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-3">
      <input type="hidden" name={name} value={committedUrl} required={required} />

      {previewUrl ? (
        <div className="grid gap-3 sm:grid-cols-[192px_1fr] sm:items-start">
          <div className="relative h-32 w-48 overflow-hidden rounded-lg border border-slate-200">
            <Image src={previewUrl} alt="Xem trước ảnh vừa chọn" fill unoptimized className="object-cover" />
            <span className="absolute left-1.5 top-1.5 rounded-full bg-slate-900/80 px-2 py-0.5 text-[11px] font-semibold text-white">Chưa tải lên</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={confirmUpload}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-60"
            >
              {uploading ? "Đang tải lên..." : "Xác nhận & tải lên"}
            </button>
            <button
              type="button"
              onClick={cancelPending}
              disabled={uploading}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
            >
              Hủy
            </button>
          </div>
        </div>
      ) : committedUrl ? (
        <div className="grid gap-3 sm:grid-cols-[192px_1fr] sm:items-start">
          <div className="relative h-32 w-48 overflow-hidden rounded-lg border border-slate-200">
            <Image src={committedUrl} alt="Ảnh đã lưu" fill className="object-cover" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="cursor-pointer rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Thay ảnh
              <input ref={inputRef} type="file" accept={ACCEPT} className="hidden" onChange={(event) => pickFile(event.target.files?.[0])} />
            </label>
            <button
              type="button"
              onClick={() => setCommittedUrl("")}
              className="rounded-md border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Xóa ảnh
            </button>
          </div>
        </div>
      ) : (
        <label className="flex h-32 w-48 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-slate-300 text-center text-slate-500 transition hover:border-indigo-400 hover:text-indigo-600">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 16V4M12 4l-4 4M12 4l4 4" strokeLinecap="round" strokeLinejoin="round" /><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="text-xs font-semibold">Chọn ảnh từ máy</span>
          <input ref={inputRef} type="file" accept={ACCEPT} className="hidden" onChange={(event) => pickFile(event.target.files?.[0])} />
        </label>
      )}

      <p className="text-xs text-slate-400">JPG, PNG, WebP, AVIF hoặc SVG — tối đa 5MB.</p>
      {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
