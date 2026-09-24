import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getSessionUserId: vi.fn(),
  findFirst: vi.fn(),
  redirect: vi.fn((path: string) => { throw new Error(`REDIRECT:${path}`); }),
}));

vi.mock("@/lib/session", () => ({ getSessionUserId: mocks.getSessionUserId }));
vi.mock("@/lib/prisma", () => ({ prisma: { user: { findFirst: mocks.findFirst } } }));
vi.mock("next/navigation", () => ({ redirect: mocks.redirect }));

import { getCurrentAdmin, requireRole } from "./auth";

const admin = { id: 1, username: "admin", name: "Admin", email: null, role: "ADMIN" as const };
const staff = { ...admin, id: 2, username: "staff", role: "STAFF" as const };

describe("admin authorization", () => {
  beforeEach(() => vi.clearAllMocks());

  it("treats an anonymous request as unauthenticated", async () => {
    mocks.getSessionUserId.mockResolvedValue(null);
    await expect(getCurrentAdmin()).resolves.toBeNull();
    expect(mocks.findFirst).not.toHaveBeenCalled();
  });

  it("does not authenticate an inactive or missing user", async () => {
    mocks.getSessionUserId.mockResolvedValue(9);
    mocks.findFirst.mockResolvedValue(null);
    await expect(getCurrentAdmin()).resolves.toBeNull();
    expect(mocks.findFirst).toHaveBeenCalledWith(expect.objectContaining({ where: { id: 9, active: true } }));
  });

  it("allows ADMIN and rejects STAFF for ADMIN-only operations", async () => {
    mocks.getSessionUserId.mockResolvedValue(1);
    mocks.findFirst.mockResolvedValueOnce(admin);
    await expect(requireRole("ADMIN")).resolves.toEqual(admin);
    mocks.findFirst.mockResolvedValueOnce(staff);
    await expect(requireRole("ADMIN")).rejects.toThrow("REDIRECT:/admin");
  });
});
