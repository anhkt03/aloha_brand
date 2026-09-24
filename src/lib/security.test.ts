import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./password";
import { canAccessModule } from "./permissions";
describe("security helpers", () => {
  it("hashes and verifies passwords without storing plaintext", async () => { const hash = await hashPassword("aloha2026"); expect(hash).not.toContain("aloha2026"); expect(await verifyPassword("aloha2026", hash)).toBe(true); expect(await verifyPassword("wrong", hash)).toBe(false); });
  it("restricts user management to ADMIN", () => { expect(canAccessModule("ADMIN", "users")).toBe(true); expect(canAccessModule("STAFF", "users")).toBe(false); });
});
