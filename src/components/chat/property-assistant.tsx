"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import {
  ArrowRight,
  Bot,
  CalendarClock,
  ExternalLink,
  MapPin,
  Send,
} from "lucide-react";

import { SeazoneLogo } from "@/components/brand/seazone-logo";
import { formatHour } from "@/lib/format";
import type { Property } from "@/lib/validators/property";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "Qual é a senha do Wi-Fi?",
  "Como entro no imóvel?",
  "Quais são as regras da casa?",
  "Que horas é o check-out?",
  "Posso trazer meu cachorro?",
];

export function PropertyAssistant({ property }: { property: Property }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Encontrei sua estadia no imóvel ${property.code}. Você pode abrir o guia completo ou me perguntar qualquer coisa sobre acesso, Wi-Fi, check-in e regras da casa.`,
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
    <main className="seazone-shell min-h-screen px-4 py-5 text-slate-900 sm:px-8 lg:px-10">
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 pb-5">
        <SeazoneLogo />
        <Link
          href={`/${property.code}/guia`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#06243d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0b3558] focus:ring-4 focus:ring-[#10b6d6]/20 focus:outline-none"
        >
          Guia completo
          <ExternalLink className="h-4 w-4" aria-hidden />
        </Link>
      </header>

      <section className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <aside className="space-y-4 lg:pt-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0067b1]">
              Assistente conectado ao imóvel
            </p>
            <h1 className="mt-4 text-[clamp(2.35rem,4vw,3.75rem)] font-semibold leading-tight tracking-[-0.045em] text-[#06243d]">
              Oi, aqui é o César da Seazone.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              Encontrei sua estadia em {property.name}. Posso ajudar com acesso,
              Wi-Fi, check-in, regras da casa e dicas próximas.
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

        <section className="flex min-h-[620px] flex-col overflow-hidden rounded-[1.75rem] border border-white bg-white shadow-[0_24px_70px_rgba(6,36,61,0.12)] lg:h-[calc(100vh-7rem)] lg:max-h-[760px]">
          <div className="bg-[#06243d] px-5 py-4 text-white sm:px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ff8a1c] text-white">
                <Bot className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <p className="font-semibold">César da Seazone</p>
                <p className="text-sm text-cyan-100">Atendimento da sua estadia</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-[#fbf8f2] p-4 sm:p-5">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <MessageRow key={index} message={message}>
                  {index === 0 ? (
                    <>
                      <GuideCallout propertyCode={property.code} />
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-[#06243d]">
                          Ou escolha uma pergunta rápida:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {suggestions.map((suggestion) => (
                            <button
                              type="button"
                              key={suggestion}
                              onClick={() => sendMessage(suggestion)}
                              disabled={isStreaming}
                              className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#0067b1]/30 hover:text-[#0067b1] focus:ring-4 focus:ring-[#10b6d6]/15 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : null}
                </MessageRow>
              ))}
            </div>
          </div>

          <footer className="border-t border-slate-100 bg-white p-4 sm:p-5">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <label htmlFor="guest-question" className="sr-only">
                Pergunte sobre sua estadia
              </label>
              <input
                id="guest-question"
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Pergunte sobre sua estadia"
                className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-[#fbf8f2] px-4 py-3 text-sm outline-none transition focus:border-[#0067b1] focus:ring-4 focus:ring-[#10b6d6]/15"
              />
              <button
                type="submit"
                disabled={isStreaming || !input.trim()}
                className="rounded-2xl bg-[#ff8a1c] p-3 text-white transition hover:bg-[#f47c08] focus:ring-4 focus:ring-[#ff8a1c]/25 focus:outline-none disabled:cursor-not-allowed disabled:bg-[#e3d8cb] disabled:text-slate-500"
                aria-label="Enviar mensagem"
              >
                <Send className="h-5 w-5" aria-hidden />
              </button>
            </form>
          </footer>
        </section>
      </section>
    </main>
  );
}

function GuideCallout({ propertyCode }: { propertyCode: string }) {
  return (
    <div className="rounded-[1.35rem] border border-orange-100 bg-white p-4 shadow-sm">
      <p className="font-semibold text-[#06243d]">Guia completo da estadia</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Acesse todas as informações organizadas: entrada no imóvel, Wi-Fi,
        regras, check-in, check-out e recomendações locais.
      </p>
      <Link
        href={`/${propertyCode}/guia`}
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#ff8a1c] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#f47c08] focus:ring-4 focus:ring-[#ff8a1c]/25 focus:outline-none"
      >
        Ver guia completo
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}

function MessageRow({
  message,
  children,
}: {
  message: ChatMessage;
  children?: ReactNode;
}) {
  const isUser = message.role === "user";

  return (
    <div className="space-y-4">
      <div
        className={
          isUser
            ? "ml-auto max-w-[86%] rounded-[1.25rem] rounded-br-md bg-[#1e6f9f] px-5 py-3 text-sm leading-6 text-white"
            : "mr-auto max-w-[88%] rounded-[1.25rem] rounded-bl-md bg-white px-5 py-3 text-sm leading-6 text-slate-700 shadow-sm"
        }
      >
        {message.content || "..."}
      </div>
      {children}
    </div>
  );
}

function ContextCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white bg-white/75 p-4 shadow-sm">
      <p className="flex items-center gap-2 text-sm font-semibold text-[#0067b1]">
        {icon}
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-[#06243d]">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{detail}</p>
    </div>
  );
}
