import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";

import { Card, SectionTitle } from "@/components/ui/card";
import { getPropertyByCode } from "@/server/properties";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const property = await getPropertyByCode(code);

  if (!property) {
    return {
      title: "Guia não encontrado | Seazone",
    };
  }

  return {
    title: "Guia protegido | Seazone",
    description: "Acesse o guia da estadia com o código privado recebido na reserva.",
  };
}

export default async function PropertyPage({ params }: PageProps) {
  const { code } = await params;
  const property = await getPropertyByCode(code);

  if (!property) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7fbfc] px-6 py-12 text-slate-900">
      <section className="mx-auto max-w-3xl space-y-6">
        <Card className="border-cyan-100">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
              <LockKeyhole className="h-7 w-7" />
            </span>
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
                Guia protegido · {property.code}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Use o código privado da sua reserva para acessar o guia completo.
              </h1>
              <p className="max-w-2xl leading-7 text-slate-600">
                Este imóvel possui informações sensíveis da estadia, como WiFi,
                instruções de entrada, endereço completo, contato e assistente
                virtual. Por segurança, esses dados só aparecem no link privado
                enviado ao hóspede ou no QR Code do imóvel.
              </p>
              <Link
                href="/"
                className="inline-flex rounded-full bg-cyan-700 px-5 py-3 font-semibold text-white transition hover:bg-cyan-800"
              >
                Inserir código do guia
              </Link>
            </div>
          </div>
        </Card>

        <Card>
          <SectionTitle
            eyebrow="Privacidade"
            title="Dados da estadia ficam bloqueados sem o código do hóspede"
            description="WiFi, endereço completo, instruções de acesso, estacionamento, contato do anfitrião, guia de experiências e assistente virtual só aparecem no guia privado correto."
          />
        </Card>
      </section>
    </main>
  );
}
