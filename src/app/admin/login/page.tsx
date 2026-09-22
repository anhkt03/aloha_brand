import { LoginForm } from "./login-form";

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 p-6">
      <section className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">Đăng nhập quản trị</h1>
        <p className="mb-6 text-sm text-slate-600">Dùng tài khoản quản trị ALOHA của bạn.</p>
        <LoginForm />
      </section>
    </main>
  );
}
