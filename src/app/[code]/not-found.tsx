import Link from "next/link";

import { SeazoneLogo } from "@/components/brand/seazone-logo";

export default function PropertyNotFound() {
  return (
    <main className="seazone-shell flex min-h-screen items-center justify-center px-5 py-10 text-[var(--color-text)] sm:px-8">
      <section className="w-full max-w-xl rounded-[var(--radius-surface)] border border-[var(--color-border)] bg-white p-6 shadow-[var(--shadow-surface)] sm:p-8">
        <SeazoneLogo />
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-coral)]">
          Código não encontrado
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[var(--color-navy)]">
          Não encontramos um imóvel com este código.
        </h1>
        <p className="mt-4 leading-7 text-[var(--color-muted)]">
          Confira o código na reserva ou no QR Code do imóvel. Se o problema
          continuar, entre em contato com o anfitrião ou com a central da Seazone.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-2xl bg-[var(--color-coral)] px-5 py-3 font-semibold text-white transition hover:bg-[var(--color-coral-hover)] focus:ring-4 focus:ring-[rgba(255,107,95,0.25)] focus:outline-none"
        >
          Tentar outro código
        </Link>
      </section>
    </main>
  );
}
