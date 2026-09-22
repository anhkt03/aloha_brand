"use client";

import { useActionState } from "react";
import { login, type LoginState } from "../actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="grid gap-4">
      <label className="grid gap-1 text-sm font-medium text-slate-700">
        Tên đăng nhập
        <input name="username" autoComplete="username" required className="rounded border border-slate-300 px-3 py-2" />
      </label>
      <label className="grid gap-1 text-sm font-medium text-slate-700">
        Mật khẩu
        <input name="password" type="password" autoComplete="current-password" required className="rounded border border-slate-300 px-3 py-2" />
      </label>
      {state.message ? <p role="alert" className="text-sm text-red-600">{state.message}</p> : null}
      <button type="submit" disabled={pending} className="rounded bg-emerald-700 px-4 py-2 font-semibold text-white disabled:opacity-60">
        {pending ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
}
