import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { deleteImage, uploadImage } from "@/lib/storage";
export async function POST(request: NextRequest) { await requireAdminUser(); try { const data = await request.formData(); const file = data.get("file"); const folder = String(data.get("folder") ?? ""); if (!(file instanceof File)) return NextResponse.json({ message: "Thiếu file." }, { status: 400 }); return NextResponse.json(await uploadImage(file, folder), { status: 201 }); } catch (e) { return NextResponse.json({ message: e instanceof Error ? e.message : "Upload thất bại." }, { status: 400 }); } }
export async function DELETE(request: NextRequest) { await requireAdminUser(); const path = String((await request.json()).path ?? ""); await deleteImage(path); return NextResponse.json({ success: true }); }
