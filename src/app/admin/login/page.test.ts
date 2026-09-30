import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getCurrentAdmin: vi.fn(),
  redirect: vi.fn((path: string) => { throw new Error(`REDIRECT:${path}`); }),
}));

vi.mock("@/lib/auth", () => ({ getCurrentAdmin: mocks.getCurrentAdmin }));
vi.mock("next/navigation", () => ({ redirect: mocks.redirect }));
vi.mock("./login-form", () => ({ LoginForm: () => null }));

import AdminLoginPage from "./page";

describe("/admin/login", () => {
  beforeEach(() => vi.clearAllMocks());

  it("sends an already signed-in admin straight to the dashboard", async () => {
    mocks.getCurrentAdmin.mockResolvedValue({ id: 1 });
    await expect(AdminLoginPage()).rejects.toThrow("REDIRECT:/admin");
  });

  it("shows the form when there is no valid session", async () => {
    mocks.getCurrentAdmin.mockResolvedValue(null);
    await expect(AdminLoginPage()).resolves.toBeTruthy();
    expect(mocks.redirect).not.toHaveBeenCalled();
  });
});
