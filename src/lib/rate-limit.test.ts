import { describe, expect, it } from "vitest";
import { FixedWindowRateLimiter } from "./rate-limit";

describe("FixedWindowRateLimiter", () => {
  it("blocks requests over the limit and resets after the window", () => {
    const limiter = new FixedWindowRateLimiter(2, 1_000);
    expect(limiter.consume("client", 0)).toBe(true);
    expect(limiter.consume("client", 10)).toBe(true);
    expect(limiter.consume("client", 20)).toBe(false);
    expect(limiter.consume("client", 1_000)).toBe(true);
  });

  it("keeps independent buckets per client", () => {
    const limiter = new FixedWindowRateLimiter(1, 1_000);
    expect(limiter.consume("a", 0)).toBe(true);
    expect(limiter.consume("a", 1)).toBe(false);
    expect(limiter.consume("b", 1)).toBe(true);
  });
});
