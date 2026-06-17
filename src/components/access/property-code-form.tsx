"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Home, Loader2 } from "lucide-react";

export function PropertyCodeForm() {
  const router = useRouter();
  const [propertyCode, setPropertyCode] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const code = propertyCode.trim().toUpperCase().replace(/\s+/g, "");
    if (!code) return;

    startTransition(() => {
      router.push(`/${encodeURIComponent(code)}`);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 rounded-[1.5rem] bg-white p-4 shadow-sm">
      <label htmlFor="property-code" className="block font-semibold text-[#06243d]">
        Código do imóvel
      </label>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Use o código recebido com a reserva ou exibido no QR Code.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Home className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#0067b1]" />
          <input
            id="property-code"
            value={propertyCode}
            onChange={(event) => setPropertyCode(event.target.value)}
            placeholder="Ex: FLN001"
            className="h-12 w-full rounded-full border border-cyan-100 bg-[#f7fbfc] pr-4 pl-12 font-semibold tracking-wide text-[#06243d] outline-none transition focus:border-[#0067b1] focus:bg-white"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          disabled={isPending || !propertyCode.trim()}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#ff8a1c] px-6 font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-[#f47c08] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Iniciar conversa
        </button>
      </div>
    </form>
  );
}
