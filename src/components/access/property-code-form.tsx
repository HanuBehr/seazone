"use client";

import { FormEvent, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { propertyCodes } from "@/lib/property-catalog";

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
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isPending}
      className="rounded-[1.25rem] border border-line bg-surface/90 p-3 shadow-card"
    >
      <label htmlFor="property-code" className="text-sm font-semibold text-navy">
        Find your guide
      </label>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <input
          id="property-code"
          value={propertyCode}
          onChange={(event) => setPropertyCode(event.target.value)}
          placeholder="SYD001"
          className="h-11 min-w-0 flex-1 rounded-field border border-line bg-white/70 px-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-navy outline-none transition placeholder:font-semibold placeholder:text-muted/60 hover:border-line-cool focus-visible:border-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/35 focus-visible:ring-offset-2"
          autoComplete="off"
          inputMode="text"
          aria-describedby="property-code-examples"
        />
        <button
          type="submit"
          disabled={isPending || !propertyCode.trim()}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-field bg-navy px-5 text-sm font-semibold text-white transition hover:bg-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          Open
        </button>
      </div>

      <div
        id="property-code-examples"
        className="app-scroll -mx-1 mt-3 flex items-center gap-1.5 overflow-x-auto px-1 pb-1 text-xs text-muted sm:flex-wrap sm:overflow-visible sm:pb-0"
      >
        {propertyCodes.map((code) => (
          <Link
            key={code}
            href={`/${code}`}
            className="shrink-0 rounded-full border border-line bg-surface/80 px-3 py-1.5 font-semibold text-navy transition hover:border-coral hover:bg-coral-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2"
          >
            {code}
          </Link>
        ))}
      </div>
    </form>
  );
}
