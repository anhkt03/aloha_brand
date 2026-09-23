import { requireRole } from "@/lib/auth"; import { UserForm } from "../user-form"; import { saveUser } from "../actions";
export default async function NewUserPage() { await requireRole("ADMIN"); return <><h1 className="mb-6 text-3xl font-black">Thêm tài khoản</h1><UserForm action={saveUser} /></>; }
