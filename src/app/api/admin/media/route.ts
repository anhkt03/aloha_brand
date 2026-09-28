import { NextRequest, NextResponse } from "next/server";
import { writeAuditLog } from "@/lib/audit";
import { getCurrentAdmin } from "@/lib/auth";
import { deleteImage, uploadImage } from "@/lib/storage";
import { ImageValidationError } from "@/lib/storage-validation";

const UNAUTHORIZED = "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.";

function fail(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

// Validation problems are the caller's fault (400); anything else is ours (500).
// Either way the real message goes back so it is readable in DevTools → Network.
function failFrom(error: unknown, fallback: string) {
  if (error instanceof ImageValidationError) return fail(error.message, 400);
  console.error("[api/admin/media]", error);
  return fail(error instanceof Error && error.message ? error.message : fallback, 500);
}

export async function POST(request: NextRequest) {
  try {
    const actor = await getCurrentAdmin();
    if (!actor) return fail(UNAUTHORIZED, 401);

    const data = await request.formData().catch(() => null);
    if (!data) return fail("Yêu cầu phải là multipart/form-data.", 400);
    const file = data.get("file");
    if (!(file instanceof File)) return fail("Thiếu file.", 400);

    const uploaded = await uploadImage(file, String(data.get("folder") ?? ""));
    await writeAuditLog({ actorUserId: actor.id, action: "UPLOAD", entity: "Media", entityId: uploaded.path, metadata: { contentType: file.type, size: file.size } });
    return NextResponse.json(uploaded, { status: 201 });
  } catch (error) {
    return failFrom(error, "Upload thất bại.");
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const actor = await getCurrentAdmin();
    if (!actor) return fail(UNAUTHORIZED, 401);

    const body: unknown = await request.json().catch(() => null);
    const path = body && typeof body === "object" && "path" in body && typeof body.path === "string" ? body.path : "";
    if (!path) return fail('Thiếu "path" của ảnh cần xóa.', 400);

    await deleteImage(path);
    await writeAuditLog({ actorUserId: actor.id, action: "DELETE", entity: "Media", entityId: path });
    return NextResponse.json({ success: true });
  } catch (error) {
    return failFrom(error, "Xóa ảnh thất bại.");
  }
}
