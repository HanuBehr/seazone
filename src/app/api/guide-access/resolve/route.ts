import { z } from "zod";

import { normalizeGuideAccessCode } from "@/lib/guide-access";
import { resolveGuestGuideAccess } from "@/server/guest-access";

export const runtime = "nodejs";

const resolveGuideAccessSchema = z.object({
  guideCode: z.string().min(1),
});

export async function POST(request: Request) {
  const body = resolveGuideAccessSchema.safeParse(await request.json());

  if (!body.success) {
    return Response.json({ error: "Código inválido." }, { status: 400 });
  }

  const guideAccessCode = normalizeGuideAccessCode(body.data.guideCode);
  const access = await resolveGuestGuideAccess(guideAccessCode);

  if (!access) {
    return Response.json({ error: "Guia não encontrado." }, { status: 404 });
  }

  return Response.json({
    path: `/${access.property.code}/guest/${encodeURIComponent(guideAccessCode)}`,
  });
}
