"use client";

import { FormEvent, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "Qual a senha do WiFi?",
  "Posso trazer meu cachorro?",
  "A que horas posso fazer check-in?",
  "Que restaurantes tem perto?",
];

export function ChatWidget({
  propertyCode,
}: {
  propertyCode: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Olá! Sou o assistente virtual deste imóvel. Posso responder sobre WiFi, acesso, regras da estadia e recomendações próximas.",
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
        body: JSON.stringify({ propertyCode, messages: nextMessages }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Não foi possível falar com o assistente agora.");
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
    <>
      {isOpen ? (
        <div className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-h-[82vh] max-w-md flex-col overflow-hidden rounded-[1.75rem] border border-cyan-100 bg-white shadow-2xl shadow-slate-900/20 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[420px]">
          <div className="flex items-center justify-between bg-[#06243d] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#ff8a1c] p-2 text-white shadow-lg shadow-orange-500/20">
                <Bot className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold">Assistente Virtual</p>
                <p className="text-xs text-cyan-100">
                  Conhece este imóvel: {propertyCode}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 transition hover:bg-white/10"
              aria-label="Fechar chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-[#f8fdff] to-white p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.role === "user"
                    ? "ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[#0067b1] px-4 py-3 text-sm leading-6 text-white"
                    : "mr-auto max-w-[85%] rounded-2xl rounded-bl-md border border-cyan-50 bg-white px-4 py-3 text-sm leading-6 text-slate-700 shadow-sm"
                }
              >
                {message.content || "..."}
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 bg-white p-4">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {suggestions.map((suggestion) => (
                <button
                  type="button"
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  disabled={isStreaming}
                  className="shrink-0 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-2 text-xs font-semibold text-[#0067b1] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
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
                className="min-w-0 flex-1 rounded-full border border-slate-200 bg-[#f7fbfc] px-4 py-3 text-sm outline-none transition focus:border-[#0067b1] focus:bg-white"
              />
              <button
                type="submit"
                disabled={isStreaming}
                className="rounded-full bg-[#ff8a1c] p-3 text-white shadow-lg shadow-orange-500/20 transition hover:bg-[#f47c08] disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Enviar mensagem"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-[#06243d] px-5 py-4 font-semibold text-white shadow-2xl shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-[#0067b1]"
      >
        <Bot className="h-5 w-5 text-[#ff8a1c]" />
        Assistente virtual
      </button>
    </>
  );
}
