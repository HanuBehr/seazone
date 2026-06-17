import Image from "next/image";

import { PropertyCodeForm } from "@/components/access/property-code-form";
import { SeazoneLogo } from "@/components/brand/seazone-logo";

const supportImageUrl =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=82";

export default function Home() {
  return (
    <main className="seazone-shell min-h-screen px-5 py-6 text-[var(--color-text)] sm:px-8 lg:px-10">
      <section className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-[1120px] items-center gap-7 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
        <div className="max-w-2xl">
          <SeazoneLogo />

          <div className="mt-8 sm:mt-9 lg:mt-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-coral)]">
              Acesso rápido ao guia
            </p>
            <h1 className="mt-3 text-[clamp(2.3rem,4.2vw,3.65rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--color-navy)]">
              Encontre sua estadia
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-[var(--color-muted)] sm:text-lg">
              Digite o código do imóvel para acessar o guia, tirar dúvidas e ver
              informações da sua reserva.
            </p>

            <div className="mt-6 max-w-lg rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-surface)] sm:p-5">
              <PropertyCodeForm />
            </div>

            <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">
              Atendimento 24h · Guia completo · Ajuda com acesso e Wi-Fi
            </p>
          </div>
        </div>

        <ArrivalSupportVisual />
      </section>
    </main>
  );
}

function ArrivalSupportVisual() {
  return (
    <aside
      aria-label="Resumo do suporte disponível para hóspedes"
      className="flex justify-center lg:justify-end"
    >
      <div className="relative h-[300px] w-full max-w-lg overflow-hidden rounded-[1.5rem] border border-white/70 bg-[var(--color-surface)] shadow-[var(--shadow-surface)] sm:h-[360px] lg:h-[500px] lg:max-w-none lg:rounded-[1.75rem]">
        <Image
          src={supportImageUrl}
          alt="Ambiente de hospedagem Seazone"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 380px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,31,51,0.68)] via-[rgba(3,31,51,0.08)] to-transparent" />

        <div className="absolute inset-x-3 bottom-3 rounded-[1.1rem] border border-white/35 bg-white/90 p-4 text-[var(--color-navy)] shadow-[0_14px_36px_rgba(3,31,51,0.14)] backdrop-blur-md sm:inset-x-4 sm:bottom-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-coral)]">
            GUIA DA ESTADIA
          </p>
          <p className="mt-2 text-base font-semibold tracking-[-0.02em]">
            Acesso, Wi-Fi e check-in em um só lugar.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-[var(--color-navy)]">
            <span className="rounded-full border border-[var(--color-border)] bg-white px-2.5 py-1">Acesso</span>
            <span className="rounded-full border border-[var(--color-border)] bg-white px-2.5 py-1">Wi-Fi</span>
            <span className="rounded-full border border-[var(--color-border)] bg-white px-2.5 py-1">Check-in</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
