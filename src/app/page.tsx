import { PropertyCodeForm } from "@/components/access/property-code-form";
import { SeazoneLogo } from "@/components/brand/seazone-logo";
import type { ReactNode } from "react";

export default function Home() {
  return (
    <main className="seazone-shell min-h-screen px-5 py-6 text-slate-900 sm:px-8 lg:px-10">
      <section className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl items-center gap-10 py-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div className="flex flex-col">
          <SeazoneLogo />

          <div className="mt-12 max-w-xl sm:mt-16 lg:mt-20">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0067b1]">
              Assistente da sua estadia
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-[#06243d] sm:text-6xl lg:text-7xl">
              Digite o código do imóvel.
              <br />
              Fale com o César.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
              Receba ajuda imediata sobre acesso, Wi-Fi, check-in, regras da
              casa e recomendações locais.
            </p>

            <div className="mt-8">
              <PropertyCodeForm />
            </div>
          </div>

          <p className="mt-6 hidden text-sm leading-6 text-slate-500 lg:block">
            Atendimento 24h • Informações por imóvel • Respostas com contexto
            da estadia
          </p>
        </div>

        <ChatPreview />

        <p className="text-sm leading-6 text-slate-500 lg:hidden">
          Atendimento 24h • Informações por imóvel • Respostas com contexto da
          estadia
        </p>
      </section>
    </main>
  );
}

function ChatPreview() {
  return (
    <aside
      aria-label="Prévia do chat do César da Seazone"
      className="rounded-[2rem] border border-white bg-white p-3 shadow-[0_28px_90px_rgba(6,36,61,0.14)] sm:p-4"
    >
      <div className="overflow-hidden rounded-[1.65rem] border border-slate-100 bg-[#f8fbfb]">
        <div className="bg-[#06243d] px-5 py-5 text-white sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-base font-semibold">César da Seazone</p>
              <p className="mt-1 text-sm text-cyan-100">
                Assistente da sua estadia
              </p>
            </div>
            <span className="rounded-full bg-[#ff8a1c] px-3 py-1 text-xs font-semibold text-white">
              online
            </span>
          </div>
        </div>

        <div className="space-y-4 px-4 py-5 sm:px-6 sm:py-7">
          <MessageBubble>
            Olá! Me diga o código do imóvel para eu abrir as informações da sua
            reserva.
          </MessageBubble>
          <MessageBubble align="right">FLN001</MessageBubble>
          <MessageBubble>
            Encontrei sua estadia. Quer ajuda com acesso, Wi-Fi ou regras da
            casa?
          </MessageBubble>
        </div>

        <div className="border-t border-slate-100 bg-white px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-[#fbf7f0] px-4 py-3 text-sm text-slate-500">
            Pergunte sobre sua estadia
            <span className="ml-auto h-8 rounded-full bg-[#ff8a1c] px-4 text-xs font-semibold leading-8 text-white">
              Enviar
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function MessageBubble({
  children,
  align = "left",
}: {
  children: ReactNode;
  align?: "left" | "right";
}) {
  const isRight = align === "right";

  return (
    <div
      className={
        isRight
          ? "ml-auto max-w-[78%] rounded-3xl rounded-br-md bg-[#0067b1] px-5 py-3 text-sm font-medium leading-6 text-white"
          : "mr-auto max-w-[84%] rounded-3xl rounded-bl-md bg-white px-5 py-3 text-sm leading-6 text-slate-700 shadow-sm"
      }
    >
      {children}
    </div>
  );
}
