import type { Brew } from "../types";

interface CoffeeStatusProps {
  brews: Brew[];
}

type StatusLevel = "brewing" | "fresh" | "getting-old" | "make-more" | "idle";

interface StatusInfo {
  label: string;
  level: StatusLevel;
  dotClass: string;
  minutesAgo: number | null;
}

function getStatus(brews: Brew[]): StatusInfo {
  if (brews.length === 0) {
    return {
      label: "NO BREWS YET",
      level: "idle",
      dotClass: "dot--idle",
      minutesAgo: null,
    };
  }
  const latest = brews[0];
  const minutesAgo =
    (Date.now() - new Date(latest.brewedAt).getTime()) / 60_000;

  if (minutesAgo < 3) {
    return {
      label: "BREWING..",
      level: "brewing",
      dotClass: "dot--brewing",
      minutesAgo,
    };
  }
  if (minutesAgo < 30) {
    return {
      label: "FRESH☕",
      level: "fresh",
      dotClass: "dot--fresh",
      minutesAgo,
    };
  }
  if (minutesAgo < 90) {
    return {
      label: "OLD OR OUT☠️",
      level: "getting-old",
      dotClass: "dot--old",
      minutesAgo,
    };
  }
  return {
    label: "MAKE MORE COFFEE🩷",
    level: "make-more",
    dotClass: "dot--stale",
    minutesAgo,
  };
}

function formatMinutes(mins: number): string {
  if (mins < 1) return "just now";
  if (mins < 60) return `${Math.floor(mins)}m ago`;
  const h = Math.floor(mins / 60);
  const m = Math.floor(mins % 60);
  return m > 0 ? `${h}h ${m}m ago` : `${h}h ago`;
}

export function CoffeeStatus({ brews }: CoffeeStatusProps) {
  const status = getStatus(brews);

  return (
    <section className={`coffee-status coffee-status--${status.level}`}>
      <div className="coffee-status__inner">
        <span
          className={`status-dot ${status.dotClass}`}
          aria-hidden="true"
        />
        <span className="status-label">{status.label}</span>
      </div>
      {status.minutesAgo !== null && (
        <p className="status-time">{formatMinutes(status.minutesAgo)}</p>
      )}
    </section>
  );
}
