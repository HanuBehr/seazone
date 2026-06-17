import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PropertyGuide } from "@/components/property/property-guide";
import { getExperienceGuideForProperty } from "@/server/experience-guides";
import { authorizeGuestGuideAccess } from "@/server/guest-access";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ code: string; guideAccessCode: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code, guideAccessCode } = await params;
  const access = await authorizeGuestGuideAccess(code, guideAccessCode);

  if (!access) {
    return {
      title: "Guia não encontrado | Seazone",
    };
  }

  return {
    title: `${access.property.name} | Guia do Hóspede`,
    description: `Guia da estadia em ${access.property.address.city}/${access.property.address.state}.`,
  };
}

export default async function GuestGuidePage({ params }: PageProps) {
  const { code, guideAccessCode } = await params;
  const access = await authorizeGuestGuideAccess(code, guideAccessCode);

  if (!access) {
    notFound();
  }

  const guide = await getExperienceGuideForProperty(access.property.id);

  return (
    <PropertyGuide
      property={access.property}
      guide={guide}
      guideAccessCode={access.guideAccessCode}
    />
  );
}
