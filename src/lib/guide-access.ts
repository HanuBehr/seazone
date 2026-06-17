import { createHash } from "node:crypto";

export function normalizeGuideAccessCode(code: string) {
  return code.trim().toUpperCase().replace(/\s+/g, "");
}

export function hashGuideAccessCode(code: string) {
  return createHash("sha256")
    .update(normalizeGuideAccessCode(code))
    .digest("hex");
}

export function isGuideAccessActive(access: {
  expiresAt: Date | null;
  revokedAt: Date | null;
}) {
  if (access.revokedAt) {
    return false;
  }

  if (access.expiresAt && access.expiresAt < new Date()) {
    return false;
  }

  return true;
}
