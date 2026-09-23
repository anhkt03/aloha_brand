import { NextRequest, NextResponse } from "next/server";
import { writeAuditLog } from "@/lib/audit";
import { requireAdminUser } from "@/lib/auth";
import { deleteImage, uploadImage } from "@/lib/storage";

export async function POST(request: NextRequest) {
  const actor = await requireAdminUser();
  try {
    const data = await request.formData();
    const file = data.get("file");
    const folder = String(data.get("folder") ?? "");
    if (!(file instanceof File)) return NextResponse.json({ message: "Thiếu file." }, { status: 400 });
    const uploaded = await uploadImage(file, folder);
    await writeAuditLog({ actorUserId: actor.id, action: "UPLOAD", entity: "Media", entityId: uploaded.path, metadata: { contentType: file.type, size: file.size } });
    return NextResponse.json(uploaded, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Upload thất bại." }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const actor = await requireAdminUser();
  const path = String((await request.json()).path ?? "");
  await deleteImage(path);
  await writeAuditLog({ actorUserId: actor.id, action: "DELETE", entity: "Media", entityId: path });
  return NextResponse.json({ success: true });
}
