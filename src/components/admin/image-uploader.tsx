"use client";

import Image from "next/image";
import { useState } from "react";

export function ImageUploader({ name, folder, defaultValue = "", required = false }: { name: string; folder: string; defaultValue?: string; required?: boolean }) {
  const [url, setUrl] = useState(defaultValue);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function upload(file?: File) {
    if (!file) return;
    setPending(true);
    setError("");
    const body = new FormData();
    body.set("file", file);
    body.set("folder", folder);
    const response = await fetch("/api/admin/media", { method: "POST", body });
    const data = await response.json();
    setPending(false);
    if (!response.ok) return setError(data.message || "Upload thất bại.");
    setUrl(data.url);
  }

  return (
    <div className="grid gap-2">
      <input type="hidden" name={name} value={url} required={required} />
      {url ? <Image src={url} alt="Xem trước ảnh" width={192} height={128} className="h-32 w-48 rounded-xl object-cover" /> : null}
      <input type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/svg+xml" onChange={(event) => upload(event.target.files?.[0])} disabled={pending} />
      {pending ? <small>Đang tải lên...</small> : null}
      {error ? <small className="text-red-600">{error}</small> : null}
    </div>
  );
}
