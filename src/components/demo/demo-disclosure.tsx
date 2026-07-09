import { ShieldCheck } from "lucide-react";

export function DemoDisclosure({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-panel border border-orange/30 bg-orange-soft/75 p-3 text-sm leading-6 text-navy sm:p-4">
      <div className="flex gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-field bg-surface text-orange shadow-card">
          <ShieldCheck className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="font-semibold tracking-[-0.01em]">
            Public portfolio demo
          </p>
          <p className={compact ? "mt-1 text-xs leading-5 text-muted" : "mt-1 text-muted"}>
            All property, reservation, WiFi, and access details are fictional.
            A production version should protect private guest guides with
            expiring access links or authenticated guest sessions.
          </p>
        </div>
      </div>
    </div>
  );
}
