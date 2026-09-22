import { requireAdminUser } from "@/lib/auth";

export default async function AdminHomePage() {
  const user = await requireAdminUser();
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Chào {user.name}</h1>
      <p className="mt-2 text-slate-600">Trang tổng quan quản trị đang được thiết lập.</p>
    </main>
  );
}
