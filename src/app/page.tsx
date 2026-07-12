import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Clock3,
  DoorOpen,
  LayoutDashboard,
  MapPin,
  MessageCircle,
  Sparkles,
  Wifi,
} from "lucide-react";

import { PropertyCodeForm } from "@/components/access/property-code-form";
import { propertyCatalog } from "@/lib/property-catalog";

const previewProperties = propertyCatalog.slice(0, 4);

const guideHighlights = [
  { label: "Check-in", value: "From 3:00 PM", icon: Clock3 },
  { label: "Access", value: "Lockbox and entry steps", icon: DoorOpen },
  { label: "WiFi", value: "Network and password", icon: Wifi },
  { label: "Local tips", value: "Food, essentials, nearby places", icon: MapPin },
] as const;

const workflow = [
  "Add the property details hosts already repeat to guests.",
  "Share one guide link before arrival or attach it to the booking.",
  "Guests open the guide and get answers without another message thread.",
] as const;

export default function Home() {
  return (
    <main className="app-shell min-h-screen px-4 py-5 text-ink sm:px-8 sm:py-8 lg:px-10">
      <header className="mx-auto flex max-w-[1220px] items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-baseline gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50"
        >
          <span className="text-lg font-semibold tracking-[-0.04em] text-navy">Hosthing</span>
          <span className="hidden text-sm font-semibold text-muted sm:inline">
            Guest guide automation
          </span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-2 text-sm font-semibold">
          <a
            href="#preview"
            className="rounded-full px-3 py-2 text-muted transition hover:bg-coral-soft hover:text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50"
          >
            Preview
          </a>
          <Link
            href="/operator"
            className="rounded-full border border-line bg-surface/78 px-3 py-2 text-navy transition hover:border-coral hover:bg-coral-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50"
          >
            Host view
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid min-h-[calc(100dvh-5.5rem)] max-w-[1220px] items-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_500px] lg:gap-16 lg:py-12">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/82 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-coral shadow-card">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            For short-term rental hosts
          </p>
          <h1 className="mt-5 text-[clamp(2.55rem,5.7vw,5.35rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-navy">
            Stop repeating check-in instructions to every guest
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Hosthing turns each property into a guest guide with arrival details,
            house rules, local recommendations, booking context, and AI-powered
            answers from one shared link.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${propertyCatalog[0].code}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 font-semibold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2"
            >
              Preview guest guide
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/operator"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface/88 px-5 py-3 font-semibold text-navy shadow-card transition hover:-translate-y-0.5 hover:border-coral hover:bg-coral-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2"
            >
              <LayoutDashboard className="h-4 w-4" aria-hidden />
              View host dashboard
            </Link>
          </div>

          <div className="mt-8 max-w-xl">
            <PropertyCodeForm />
          </div>
        </div>

        <ProductPreview />
      </section>

      <section className="mx-auto grid max-w-[1180px] gap-4 border-y border-line py-8 sm:grid-cols-3 sm:py-10">
        {workflow.map((step, index) => (
          <div key={step} className="flex gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy text-sm font-semibold text-white">
              {index + 1}
            </span>
            <p className="max-w-xs text-sm font-semibold leading-6 text-navy sm:text-base">
              {step}
            </p>
          </div>
        ))}
      </section>

      <section id="preview" className="mx-auto max-w-[1180px] scroll-mt-8 py-10 sm:py-14">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-navy sm:text-4xl">
            See what guests receive
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
            Open a property guide to see how arrival details, rules, local tips,
            and support are organized for renters.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {previewProperties.map((property) => (
            <GuideCard key={property.code} property={property} />
          ))}
        </div>
      </section>
    </main>
  );
}

function ProductPreview() {
  return (
    <aside
      aria-label="Hosthing product preview"
      className="overflow-hidden rounded-[2rem] border border-line bg-surface shadow-raised"
    >
      <div className="border-b border-line bg-navy px-5 py-4 text-white sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sun">
              Guest guide
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.045em]">
              Harbour Loft Sydney
            </h2>
          </div>
          <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-white">
            SYD001
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          {guideHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-panel border border-line bg-fog/72 p-3">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-coral">
                  <Icon className="h-4 w-4" aria-hidden />
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold leading-5 text-navy">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 rounded-[1.25rem] border border-line bg-surface p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-navy">
            <Bot className="h-4 w-4 text-coral" aria-hidden />
            Ask about this stay
          </p>
          <div className="mt-3 rounded-panel bg-coral-soft p-3 text-sm leading-6 text-navy">
            What is the WiFi password and where do I park?
          </div>
          <div className="mt-2 rounded-panel bg-navy p-3 text-sm leading-6 text-white">
            The WiFi details are in your guide. Parking instructions are listed
            under Arrival essentials for this property.
          </div>
        </div>

        <div className="mt-4 flex items-start gap-3 rounded-panel border border-line bg-orange-soft/72 p-3">
          <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-orange" aria-hidden />
          <p className="text-sm leading-6 text-navy">
            Renters get the information they need without hosts retyping the
            same answers before every arrival.
          </p>
        </div>
      </div>
    </aside>
  );
}

function GuideCard({ property }: { property: (typeof propertyCatalog)[number] }) {
  return (
    <Link
      href={`/${property.code}`}
      className="group overflow-hidden rounded-[1.35rem] border border-line bg-surface shadow-card transition hover:-translate-y-1 hover:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2"
    >
      <div className="relative h-40 overflow-hidden bg-sand">
        <Image
          src={property.images[0]}
          alt={property.name}
          fill
          sizes="(max-width: 1024px) 50vw, 280px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold leading-[1.05] tracking-[-0.04em] text-navy">
          {property.name}
        </h3>
        <p className="mt-3 flex items-center gap-1.5 text-sm leading-5 text-muted">
          <MapPin className="h-4 w-4 shrink-0 text-coral" aria-hidden />
          {property.address.neighborhood}, {property.address.city}
        </p>
        <p className="mt-4 border-t border-line pt-3 text-xs font-semibold text-muted">
          Guest guide · {property.code}
        </p>
      </div>
    </Link>
  );
}
