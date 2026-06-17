"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { Bot, CalendarClock, ExternalLink, MapPin, Send, Sparkles } from "lucide-react";

import { SeazoneLogo } from "@/components/brand/seazone-logo";
import { formatHour } from "@/lib/format";
import type { Property } from "@/lib/validators/property";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "Qual a senha do WiFi?",
  "Como eu entro no imóvel?",
  "Posso trazer meu cachorro?",
  "Me envie o guia completo",
];

export function PropertyAssistant({ property }: { property: Property }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Oi, aqui é o César da Seazone. Como posso te ajudar na sua estadia no imóvel ${property.code}? Se quiser ver tudo organizado, acesse o guia completo em /${property.code}/guia.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function sendMessage(content: string) {
    const trimmed = content.trim();
    if (!trimmed || isStreaming) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];

    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setIsStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyCode: property.code, messages: nextMessages }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Não consegui responder agora. Tente novamente em instantes.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        assistantContent += decoder.decode(value, { stream: true });
        setMessages([...nextMessages, { role: "assistant", content: assistantContent }]);
      }
    } catch (error) {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Erro inesperado no assistente.",
        },
      ]);
    } finally {
      setIsStreaming(false);
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <main className="seazone-shell relative min-h-screen overflow-hidden px-4 py-5 text-slate-900 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#10b6d6]/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#ff8a1c]/20 blur-3xl" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between pb-5">
        <SeazoneLogo />
        <Link
          href={`/${property.code}/guia`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#06243d] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-[#0067b1]"
        >
          Guia completo
          <ExternalLink className="h-4 w-4" />
        </Link>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <aside className="space-y-5">
          <div className="seazone-glass rounded-[2rem] p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-[#0067b1]">
              <Sparkles className="h-4 w-4" />
              Assistente conectado ao imóvel
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#06243d] sm:text-5xl">
              Oi, aqui é o César da Seazone.
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Como posso te ajudar na estadia em {property.name}? Posso responder
              sobre acesso, WiFi, regras, contato e experiências próximas.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <ContextCard
              icon={<MapPin className="h-5 w-5" />}
              label="Imóvel"
              value={property.code}
              detail={`${property.address.city}/${property.address.state}`}
            />
            <ContextCard
              icon={<CalendarClock className="h-5 w-5" />}
              label="Check-in"
              value={formatHour(property.rules.check_in_time)}
              detail={`Check-out até ${formatHour(property.rules.check_out_time)}`}
            />
          </div>
        </aside>

        <section className="flex h-[min(820px,calc(100vh-7rem))] min-h-[640px] flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-2xl shadow-slate-900/10">
          <div className="border-b border-slate-100 bg-[#06243d] p-5 text-white sm:p-6">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff8a1c] text-white shadow-lg shadow-orange-500/25">
                <Bot className="h-7 w-7" />
              </span>
              <div>
                <p className="text-sm text-cyan-100">César da Seazone</p>
                <h2 className="text-xl font-semibold tracking-tight">
                  Atendimento da sua estadia
                </h2>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-[#f8fdff] to-white p-4 sm:p-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.role === "user"
                    ? "ml-auto max-w-[86%] rounded-[1.4rem] rounded-br-md bg-[#0067b1] px-5 py-3 text-sm leading-6 text-white shadow-lg shadow-blue-900/10"
                    : "mr-auto max-w-[86%] rounded-[1.4rem] rounded-bl-md border border-cyan-50 bg-white px-5 py-3 text-sm leading-6 text-slate-700 shadow-sm"
                }
              >
                {message.content || "..."}
              </div>
            ))}
          </div>

          <footer className="border-t border-slate-100 bg-white p-4 sm:p-5">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {suggestions.map((suggestion) => (
                <button
                  type="button"
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  disabled={isStreaming}
                  className="shrink-0 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-2 text-xs font-semibold text-[#0067b1] transition hover:border-[#0067b1]/30 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Pergunte sobre sua estadia"
                className="min-w-0 flex-1 rounded-full border border-slate-200 bg-[#f7fbfc] px-5 py-3 text-sm outline-none transition focus:border-[#0067b1] focus:bg-white"
              />
              <button
                type="submit"
                disabled={isStreaming}
                className="rounded-full bg-[#ff8a1c] p-3 text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-[#f47c08] disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Enviar mensagem"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </footer>
        </section>
      </section>
    </main>
  );
}

function ContextCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-3xl border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur">
      <p className="flex items-center gap-2 text-sm font-semibold text-[#0067b1]">
        {icon}
        {label}
      </p>
      <p className="mt-3 text-2xl font-semibold text-[#06243d]">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{detail}</p>
    </div>
  );
}
