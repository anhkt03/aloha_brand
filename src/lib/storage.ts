import "server-only";

import { randomUUID } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { validateImageUpload, validateStoragePath } from "@/lib/storage-validation";

const BUCKET = "aloha-media";

function adminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("Supabase Storage chưa được cấu hình.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function uploadImage(file: File, folder: string) {
  const extension = validateImageUpload(file, folder);
  const path = `${folder}/${randomUUID()}.${extension}`;
  const supabase = adminClient();
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw error;
  return { path, url: supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl };
}

export async function deleteImage(path: string) {
  validateStoragePath(path);
  const { error } = await adminClient().storage.from(BUCKET).remove([path]);
  if (error) throw error;
}

export function storagePathFromUrl(url: string) {
  try {
    const parsed = new URL(url);
    const projectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (projectUrl && parsed.origin !== new URL(projectUrl).origin) return null;
    const marker = `/storage/v1/object/public/${BUCKET}/`;
    const index = parsed.pathname.indexOf(marker);
    if (index < 0) return null;
    const path = decodeURIComponent(parsed.pathname.slice(index + marker.length));
    validateStoragePath(path);
    return path;
  } catch {
    return null;
  }
}

export async function deleteManagedImages(urls: Iterable<string>) {
  const paths = [...new Set(Array.from(urls, storagePathFromUrl).filter((path): path is string => Boolean(path)))];
  await Promise.allSettled(paths.map(deleteImage));
}
