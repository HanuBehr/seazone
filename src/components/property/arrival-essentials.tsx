import type { ReactNode } from "react";
import { Car, Clock3, DoorOpen, LogOut, Wifi } from "lucide-react";

import { CopyButton } from "@/components/property/copy-field";
import { formatAccessType, formatHour } from "@/lib/format";
import type { Property } from "@/lib/validators/property";

export function ArrivalEssentials({ property }: { property: Property }) {
  const { operational, rules } = property;

  const parkingValue = operational.has_parking_spot
    ? operational.parking_spot_identifier ?? "Available"
    : "Not available";

  return (
    <section
      id="access"
      className="scroll-mt-24 border-b border-line bg-transparent pb-6 sm:pb-8"
    >
      <div className="space-y-1.5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange">
          Arrival essentials
        </p>
        <h2 className="text-xl font-semibold tracking-[-0.02em] text-navy sm:text-2xl">
          Everything needed to arrive and connect
        </h2>
        <p className="text-sm leading-6 text-muted">
          Check-in timing, WiFi, property access, and parking details for the
          first few minutes of the stay.
        </p>
      </div>

      <div className="atlas-paper mt-5 overflow-hidden rounded-[2rem] border border-line bg-surface/90 shadow-raised sm:mt-6">
        <div className="relative z-10 grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="bg-navy p-5 text-white sm:p-6">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-sun">
              <DoorOpen className="h-4 w-4" aria-hidden />
              Unlock first
            </p>
            <p className="mt-4 text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">
              {formatAccessType(operational.property_access_type)}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/76">
              {operational.property_access_instructions}
            </p>

            {operational.property_password ? (
              <div className="mt-5 flex items-center justify-between gap-4 rounded-[1.25rem] border border-white/18 bg-white/12 p-4 backdrop-blur">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sun">
                    Access code
                  </p>
                  <p className="mt-1 text-3xl font-semibold tracking-[-0.04em]">
                    {operational.property_password}
                  </p>
                </div>
                <CopyButton
                  value={operational.property_password}
                  label="Copy access code"
                />
              </div>
            ) : null}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-1">
            <InfoSlice
              icon={<Clock3 className="h-5 w-5" aria-hidden />}
              label="Check-in"
              value={`From ${formatHour(rules.check_in_time)}`}
              detail={`Check-out until ${formatHour(rules.check_out_time)}`}
            />
            <InfoSlice
              icon={<Wifi className="h-5 w-5" aria-hidden />}
              label="WiFi"
              value={operational.wifi_network}
              detail={operational.wifi_password}
              copyValue={operational.wifi_password}
              copyLabel="Copy WiFi password"
            />
            <InfoSlice
              icon={<Car className="h-5 w-5" aria-hidden />}
              label="Parking"
              value={parkingValue}
              detail={operational.parking_spot_instructions ?? "Ask the host before arrival."}
            />
            <InfoSlice
              icon={<LogOut className="h-5 w-5" aria-hidden />}
              label="Departure"
              value={`Until ${formatHour(rules.check_out_time)}`}
              detail="Leave keys and access devices as instructed by the host."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoSlice({
  icon,
  label,
  value,
  detail,
  copyValue,
  copyLabel,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
  copyValue?: string;
  copyLabel?: string;
}) {
  return (
    <div className="border-b border-line p-4 last:border-b-0 sm:p-5 sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r-0">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-coral">
        {icon}
        {label}
      </p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="min-w-0 truncate text-xl font-semibold tracking-[-0.035em] text-navy" title={value}>
          {value}
        </p>
        {copyValue && copyLabel ? <CopyButton value={copyValue} label={copyLabel} /> : null}
      </div>
      <p className="mt-2 text-sm leading-6 text-muted">{detail}</p>
    </div>
  );
}
