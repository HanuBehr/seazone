import Image from "next/image";
import Link from "next/link";
import { BedDouble, MapPin, Users } from "lucide-react";

import { PropertyCodeForm } from "@/components/access/property-code-form";
import { propertyCatalog } from "@/lib/property-catalog";

export default function Home() {
  const heroProperties = propertyCatalog.slice(0, 3);
  const remainingProperties = propertyCatalog.slice(3);

  return (
    <main className="app-shell min-h-screen px-4 py-5 sm:px-8 sm:py-8 lg:px-10">
      <section className="mx-auto grid min-h-[calc(100dvh-2.5rem)] max-w-[1220px] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_500px] lg:gap-16">
        <div className="max-w-2xl">
          <div>
            <h1 className="text-[clamp(2.45rem,5.4vw,4.65rem)] font-semibold leading-[0.93] tracking-[-0.065em] text-navy">
              A guest guide for the first five minutes of every stay
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Open a property guide with arrival instructions, booking details,
              house rules, local recommendations, and fast help when guests
              need it.
            </p>

            <div className="mt-7 max-w-xl sm:mt-9">
              <div className="relative z-10">
                <PropertyCodeForm />
              </div>
            </div>
          </div>
        </div>

        <HeroGuidePreview properties={heroProperties} />
      </section>

      <section className="mx-auto mt-8 max-w-[1180px] pb-10 sm:mt-10 sm:pb-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.05em] text-navy sm:text-4xl">
              Explore the property guides
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {remainingProperties.map((property, index) => (
            <GuideCard
              key={property.code}
              property={property}
              priority={false}
              className={index === 0 ? "sm:col-span-2 lg:col-span-2" : ""}
              featured={index === 0}
            />
          ))}
        </div>
      </section>

    </main>
  );
}

type GuideProperty = (typeof propertyCatalog)[number];

function HeroGuidePreview({ properties }: { properties: GuideProperty[] }) {
  const [featured, ...supporting] = properties;

  return (
    <aside
      aria-label="Featured property guides"
      className="grid gap-4"
    >
      {featured ? (
        <GuideCard property={featured} priority className="" featured />
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        {supporting.map((property) => (
          <GuideCard
            key={property.code}
            property={property}
            priority={false}
            className=""
          />
        ))}
      </div>
    </aside>
  );
}

function GuideCard({
  property,
  priority,
  className,
  featured = false,
}: {
  property: GuideProperty;
  priority: boolean;
  className: string;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/${property.code}`}
      className={`group grid overflow-hidden rounded-[1.45rem] border border-line bg-surface shadow-card transition hover:-translate-y-1 hover:border-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/50 focus-visible:ring-offset-2 ${
        featured ? "sm:grid-cols-[1.05fr_0.95fr]" : ""
      } ${className}`}
    >
      <div className={`${featured ? "min-h-[16rem] sm:min-h-full" : "h-44"} relative overflow-hidden bg-sand`}>
        <Image
          src={property.images[0]}
          alt={property.name}
          fill
          priority={priority}
          sizes={priority ? "(max-width: 1024px) 100vw, 260px" : "(max-width: 1024px) 50vw, 250px"}
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex min-h-[13rem] flex-col justify-between p-4 sm:p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">
            {property.market}
          </p>
          <h3 className={`${featured ? "text-2xl" : "text-lg"} mt-2 font-semibold leading-[1.02] tracking-[-0.045em] text-navy`}>
            {property.name}
          </h3>
          <p className="mt-3 flex items-center gap-1.5 text-sm leading-5 text-muted">
            <MapPin className="h-4 w-4 shrink-0 text-coral" aria-hidden />
            {property.address.neighborhood}, {property.address.city}
          </p>
        </div>
        <div className="mt-5 border-t border-line pt-4">
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-navy">
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4 text-coral" aria-hidden />
              {property.guestCapacity} guests
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="h-4 w-4 text-coral" aria-hidden />
              {property.bedroomQuantity} bed{property.bedroomQuantity > 1 ? "s" : ""}
            </span>
          </div>
          <p className="mt-3 text-xs font-semibold text-muted">
            {property.typeLabel} · Self check-in · {property.code}
          </p>
        </div>
      </div>
    </Link>
  );
}
