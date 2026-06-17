"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Loader2 } from "lucide-react";

export function GuideAccessForm() {
  const router = useRouter();
  const [guideCode, setGuideCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const response = await fetch("/api/guide-access/resolve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guideCode }),
    });

    if (!response.ok) {
      setError(
        "Código não encontrado. Confira o código recebido ou escaneie o QR Code do imóvel.",
      );
      return;
    }

    const body = (await response.json()) as { path: string };

    startTransition(() => {
      router.push(body.path);
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.5rem] border border-cyan-100 bg-cyan-50/70 p-5"
    >
      <label htmlFor="guide-code" className="block font-semibold text-slate-950">
        Código do guia
      </label>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Use o código exatamente como enviado na reserva ou exibido no QR Code.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <KeyRound className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-cyan-700" />
          <input
            id="guide-code"
            value={guideCode}
            onChange={(event) => setGuideCode(event.target.value)}
            placeholder="Ex: FLN001-7KQ9-SEA"
            className="h-12 w-full rounded-full border border-cyan-100 bg-white pr-4 pl-12 font-medium tracking-wide text-slate-950 outline-none transition focus:border-cyan-700"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          disabled={isPending || !guideCode.trim()}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-cyan-700 px-6 font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Acessar guia
        </button>
      </div>
      {error ? <p className="mt-3 text-sm font-medium text-red-700">{error}</p> : null}
    </form>
  );
}
