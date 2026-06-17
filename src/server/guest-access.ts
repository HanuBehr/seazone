import { prisma } from "@/lib/db/prisma";
import {
  hashGuideAccessCode,
  isGuideAccessActive,
  normalizeGuideAccessCode,
} from "@/lib/guide-access";
import { propertySchema, type Property } from "@/lib/validators/property";

export type AuthorizedGuestGuide = {
  property: Property;
  guideAccessCode: string;
};

export async function resolveGuestGuideAccess(
  guideAccessCode: string,
): Promise<AuthorizedGuestGuide | null> {
  const normalizedCode = normalizeGuideAccessCode(guideAccessCode);

  if (!normalizedCode) {
    return null;
  }

  const access = await prisma.guestGuideAccess.findUnique({
    where: { tokenHash: hashGuideAccessCode(normalizedCode) },
    include: { property: true },
  });

  if (!access || !isGuideAccessActive(access)) {
    return null;
  }

  return {
    property: propertySchema.parse(access.property),
    guideAccessCode: normalizedCode,
  };
}

export async function authorizeGuestGuideAccess(
  propertyCode: string,
  guideAccessCode: string,
): Promise<AuthorizedGuestGuide | null> {
  const resolved = await resolveGuestGuideAccess(guideAccessCode);

  if (!resolved) {
    return null;
  }

  if (resolved.property.code !== propertyCode.toUpperCase()) {
    return null;
  }

  return resolved;
}
