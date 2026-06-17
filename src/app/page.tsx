import { PropertyCodeForm } from "@/components/access/property-code-form";
import { SeazoneLogo } from "@/components/brand/seazone-logo";

export default function Home() {
  return (
    <main className="seazone-shell relative min-h-screen overflow-hidden px-5 py-6 text-slate-900 sm:px-8 lg:px-10">
      <div className="pointer-events-none absolute -top-28 right-0 h-80 w-80 rounded-full bg-[#ff8a1c]/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#10b6d6]/20 blur-3xl" />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between">
        <SeazoneLogo />
        <span className="rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0067b1] shadow-sm backdrop-blur">
          Guia do Hóspede
        </span>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-6xl items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div className="inline-flex rounded-full border border-cyan-100 bg-white/75 px-4 py-2 text-sm font-semibold text-[#0067b1] shadow-sm backdrop-blur">
            Atendimento inteligente para sua estadia
          </div>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-[#06243d] sm:text-7xl">
              Fale com o César da Seazone.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Digite o código do imóvel reservado ou escaneie o QR Code no
              imóvel. O assistente abre no contexto exato da sua estadia e te
              ajuda com acesso, WiFi, regras e recomendações locais.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <MiniStat value="24h" label="informação sempre à mão" />
            <MiniStat value="1 link" label="para cada imóvel" />
            <MiniStat value="IA" label="com contexto da estadia" />
          </div>
        </div>

        <div className="seazone-glass rounded-[2rem] p-5 sm:p-7">
          <div className="rounded-[1.5rem] bg-[#06243d] p-5 text-white shadow-2xl shadow-slate-900/20">
            <p className="text-sm font-medium text-cyan-100">César da Seazone</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight">
              Oi, como posso te ajudar hoje?
            </p>
            <p className="mt-3 text-sm leading-6 text-cyan-50/85">
              Primeiro, me diga o código do imóvel para eu abrir as informações
              corretas da sua estadia.
            </p>
          </div>

          <PropertyCodeForm />

          <div className="mt-5 rounded-3xl border border-cyan-100 bg-white/80 p-5 text-slate-700">
            <p className="font-semibold text-[#06243d]">Exemplos para avaliação</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-cyan-50 px-3 py-2 text-sm font-semibold text-[#0067b1]">
                FLN001
              </span>
              <span className="rounded-full bg-cyan-50 px-3 py-2 text-sm font-semibold text-[#0067b1]">
                GRM001
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur">
      <p className="text-2xl font-semibold text-[#0067b1]">{value}</p>
      <p className="mt-1 text-sm leading-5 text-slate-600">{label}</p>
    </div>
  );
}
