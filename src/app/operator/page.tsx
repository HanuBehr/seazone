import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  CalendarCheck,
  CheckCircle2,
  MapPin,
  ParkingCircle,
  Users,
} from "lucide-react";

import { propertyCatalog, reservationCatalog } from "@/lib/property-catalog";

export const metadata: Metadata = {
  title: "Host Dashboard | Hosthing",
  description:
    "Read-only operations dashboard for the Hosthing property guide system.",
};

const marketCount = new Set(propertyCatalog.map((property) => property.market)).size;
const guestCapacity = propertyCatalog.reduce(
  (total, property) => total + property.guestCapacity,
  0,
);
const activeReservations = reservationCatalog.filter(
  (reservation) => reservation.status === "confirmed",
).length;
const parkingReadyCount = propertyCatalog.filter(
  (property) => property.operational.has_parking_spot,
).length;

const operationsStats = [
  {
    label: "Properties",
    value: String(propertyCatalog.length),
    detail: `Across ${marketCount} markets`,
    icon: Building2,
  },
  {
    label: "Confirmed bookings",
    value: String(activeReservations),
    detail: "Arrival details attached",
    icon: CalendarCheck,
  },
  {
    label: "Guest capacity",
    value: String(guestCapacity),
    detail: "Beds, access, and rules modeled",
    icon: Users,
  },
  {
    label: "Parking ready",
    value: `${parkingReadyCount}/${propertyCatalog.length}`,
    detail: "Properties with dedicated instructions",
    icon: ParkingCircle,
  },
] as const;

const marketSummary = [
  { market: "Australia", properties: 2, currency: "AUD" },
  { market: "United States", properties: 2, currency: "USD" },
  { market: "Indonesia", properties: 1, currency: "IDR" },
  { market: "Japan", properties: 1, currency: "JPY" },
  { market: "Brazil", properties: 1, currency: "BRL" },
  { market: "Portugal", properties: 1, currency: "EUR" },
] as const;

export default function OperatorDashboardPage() {
  const topMarkets = [...marketSummary].sort((a, b) => b.properties - a.properties);

  return (
    <main className="app-shell min-h-screen px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-line pb-7 sm:flex-row sm:items-start sm:justify-between sm:pb-9">
          <div>
            <h1 className="max-w-3xl text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-navy">
              Host dashboard
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              Monitor guide readiness, booking coverage, and operational details
              across every property.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 rounded-full px-1 py-2 text-sm font-semibold text-navy transition hover:text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to guest view
          </Link>
        </header>

        <section className="grid border-b border-line py-6 sm:grid-cols-2 lg:grid-cols-4">
          {operationsStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="border-b border-line py-4 last:border-b-0 sm:border-r sm:px-5 sm:last:border-r-0 sm:[&:nth-child(2)]:border-r-0 lg:border-b-0 lg:[&:nth-child(2)]:border-r lg:first:pl-0"
              >
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  <Icon className="h-4 w-4 text-coral" aria-hidden />
                  {stat.label}
                </p>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-navy">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm leading-5 text-muted">{stat.detail}</p>
              </div>
            );
          })}
        </section>

        <section className="grid gap-10 py-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-[-0.035em] text-navy">
                  Property guides
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
                  Review guest guide coverage and open any property guide.
                </p>
              </div>
            </div>

            <div className="mt-5 border-y border-line">
              {propertyCatalog.map((property) => (
                <Link
                  href={`/${property.code}`}
                  key={property.code}
                  className="group grid gap-3 border-b border-line py-4 transition last:border-b-0 hover:bg-surface/58 sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:items-center"
                >
                  <div className="relative h-20 overflow-hidden rounded-field bg-mist sm:h-16">
                    <Image
                      src={property.images[0]}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <p className="font-semibold tracking-[-0.01em] text-navy">
                        {property.name}
                      </p>
                      <span className="text-xs font-semibold text-coral">
                        {property.code}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-5 text-muted">
                      {property.address.neighborhood}, {property.address.city} · {property.typeLabel}
                    </p>
                    <p className="mt-2 text-xs font-semibold text-muted">
                      {property.guestCapacity} guests · {property.bedroomQuantity} bed{property.bedroomQuantity > 1 ? "s" : ""} · {property.operational.has_parking_spot ? "Parking" : "No parking"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 sm:justify-end">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-positive">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                      Guide ready
                    </span>
                    <span className="text-xs font-semibold text-navy underline-offset-4 group-hover:underline">
                      Open
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="lg:border-l lg:border-line lg:pl-8">
            <section className="lg:sticky lg:top-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral">
                Market coverage
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-[-0.035em] text-navy">
                Markets
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                {propertyCatalog.length} properties across {marketCount} active markets.
              </p>
              <ul className="mt-5 border-y border-line">
                {topMarkets.map((market) => (
                  <li key={market.market} className="flex items-center justify-between gap-3 border-b border-line py-3 last:border-b-0">
                    <div>
                      <p className="flex items-center gap-2 font-semibold text-navy">
                        <MapPin className="h-4 w-4 text-coral" aria-hidden />
                        {market.market}
                      </p>
                      <p className="text-sm text-muted">{market.currency}</p>
                    </div>
                    <span className="text-xs font-semibold text-muted">
                      {market.properties} {market.properties > 1 ? "properties" : "property"}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
