"use client";

import Image from "next/image";
import { useState } from "react";

export function GalleryUploader({ name, folder, defaultValue = [] }: { name: string; folder: string; defaultValue?: string[] }) {
  const [urls, setUrls] = useState(defaultValue);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setPending(true);
    setError("");
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const body = new FormData();
        body.set("file", file);
        body.set("folder", folder);
        const response = await fetch("/api/admin/media", { method: "POST", body });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Upload thất bại.");
        uploaded.push(data.url);
      }
      setUrls((current) => [...current, ...uploaded].slice(0, 20));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload thất bại.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="grid gap-3">
      <input type="hidden" name={name} value={urls.join("\n")} />
      <div className="flex flex-wrap gap-3">
        {urls.map((url) => (
          <div key={url} className="relative">
            <Image src={url} alt="Ảnh thư viện" width={144} height={96} className="h-24 w-36 rounded-xl object-cover" />
            <button type="button" onClick={() => setUrls((current) => current.filter((item) => item !== url))} className="absolute right-1 top-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white" aria-label="Bỏ ảnh khỏi thư viện">×</button>
          </div>
        ))}
      </div>
      <input type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml" onChange={(event) => upload(event.target.files)} disabled={pending || urls.length >= 20} />
      {pending ? <small>Đang tải ảnh...</small> : null}
      {error ? <small className="text-red-600">{error}</small> : null}
    </div>
  );
}
