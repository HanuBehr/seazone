import { describe, expect, it } from "vitest";

import {
  hashGuideAccessCode,
  isGuideAccessActive,
  normalizeGuideAccessCode,
} from "@/lib/guide-access";

describe("guide access helpers", () => {
  it("normalizes guide access codes before lookup", () => {
    expect(normalizeGuideAccessCode(" fln001-7kq9-sea ")).toBe(
      "FLN001-7KQ9-SEA",
    );
  });

  it("hashes equivalent codes to the same value", () => {
    expect(hashGuideAccessCode("FLN001-7KQ9-SEA")).toBe(
      hashGuideAccessCode(" fln001-7kq9-sea "),
    );
  });

  it("marks revoked or expired access as inactive", () => {
    expect(isGuideAccessActive({ expiresAt: null, revokedAt: null })).toBe(true);
    expect(
      isGuideAccessActive({ expiresAt: null, revokedAt: new Date() }),
    ).toBe(false);
    expect(
      isGuideAccessActive({
        expiresAt: new Date(Date.now() - 1000),
        revokedAt: null,
      }),
    ).toBe(false);
  });
});
