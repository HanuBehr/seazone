import Image from "next/image";
import Link from "next/link";
import { Clock3, DoorOpen, MapPin, MessageCircle, Utensils, Wifi } from "lucide-react";

import { PropertyCodeForm } from "@/components/access/property-code-form";
import { propertyCatalog } from "@/lib/property-catalog";

export default function Home() {
  const previewProperties = propertyCatalog;

  return (
    <main className="app-shell min-h-screen px-4 py-5 sm:px-8 sm:py-8 lg:px-10">
      <header className="mx-auto flex max-w-[1220px] items-center justify-between gap-4">
        <Link href="/" className="group inline-flex items-baseline gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50">
          <span className="text-lg font-semibold tracking-[-0.04em] text-navy">Hostwise</span>
          <span className="hidden text-sm font-semibold text-muted sm:inline">Guest guides</span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-2 text-sm font-semibold">
          <a href="#guides" className="rounded-full px-3 py-2 text-muted transition hover:bg-coral-soft hover:text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50">
            Preview guides
          </a>
          <Link href="/operator" className="rounded-full border border-line bg-surface/78 px-3 py-2 text-navy transition hover:border-coral hover:bg-coral-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50">
            Operator view
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid min-h-[calc(100dvh-5.5rem)] max-w-[1220px] items-center gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_470px] lg:gap-16 lg:py-12">
        <div className="max-w-2xl">
          <div>
            <h1 className="text-[clamp(2.45rem,5.4vw,4.65rem)] font-semibold leading-[0.93] tracking-[-0.065em] text-navy">
              Open the guide for your stay
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Enter the property code from your booking to see arrival details,
              WiFi, house rules, local recommendations, and host contact in one
              place.
            </p>

            <div className="mt-7 max-w-xl sm:mt-9">
              <div className="relative z-10">
                <PropertyCodeForm />
              </div>
            </div>
          </div>
        </div>

        <GuidePreviewPanel />
      </section>

      <section id="guides" className="mx-auto max-w-[1180px] scroll-mt-8 pb-10 sm:pb-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.05em] text-navy sm:text-4xl">
              Choose a guide to preview
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              No code yet? Open one of these guides to see the guest experience.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {previewProperties.map((property) => (
            <GuideCard
              key={property.code}
              property={property}
              priority={false}
            />
          ))}
        </div>
      </section>

    </main>
  );
}

type GuideProperty = (typeof propertyCatalog)[number];

const guideFeatures = [
  {
    label: "Check-in",
    value: "Arrival time and access steps",
    icon: Clock3,
  },
  {
    label: "Access",
    value: "Door, lockbox, and parking details",
    icon: DoorOpen,
  },
  {
    label: "WiFi",
    value: "Network and password ready to copy",
    icon: Wifi,
  },
  {
    label: "Local",
    value: "Nearby food, essentials, and tips",
    icon: Utensils,
  },
] as const;

function GuidePreviewPanel() {
  return (
    <aside
      aria-label="What a guest guide includes"
      className="rounded-[1.75rem] border border-line bg-surface p-4 shadow-raised sm:p-5"
    >
      <div className="rounded-[1.35rem] bg-navy p-5 text-white sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sun">
          Guest view
        </p>
        <h2 className="mt-3 text-3xl font-semibold leading-none tracking-[-0.055em]">
          Everything for arrival, in order
        </h2>
        <p className="mt-4 text-sm leading-6 text-white/76">
          Guests open one guide instead of searching through messages for codes,
          rules, recommendations, and host contact.
        </p>
      </div>

      <div className="mt-4 grid gap-3">
        {guideFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.label} className="flex gap-3 rounded-panel border border-line bg-fog/72 p-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-field bg-coral-soft text-coral">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-navy">{feature.label}</p>
                <p className="mt-0.5 text-sm leading-5 text-muted">{feature.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-panel border border-line bg-surface p-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-field bg-orange-soft text-orange">
          <MessageCircle className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <p className="font-semibold text-navy">Fast help</p>
          <p className="mt-0.5 text-sm leading-5 text-muted">
            Host contact and stay support stay visible when guests need them.
          </p>
        </div>
      </div>
    </aside>
  );
}

function GuideCard({
  property,
  priority,
}: {
  property: GuideProperty;
  priority: boolean;
}) {
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
          priority={priority}
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
          Self check-in · {property.code}
        </p>
      </div>
    </Link>
  );
}
