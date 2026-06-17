CREATE TABLE "GuestGuideAccess" (
  "id" TEXT NOT NULL,
  "propertyId" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3),
  "revokedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "GuestGuideAccess_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "GuestGuideAccess_tokenHash_key" ON "GuestGuideAccess"("tokenHash");

CREATE INDEX "GuestGuideAccess_propertyId_idx" ON "GuestGuideAccess"("propertyId");

ALTER TABLE "GuestGuideAccess" ADD CONSTRAINT "GuestGuideAccess_propertyId_fkey"
  FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
