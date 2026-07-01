import type { Brew } from '../types';

interface RecentBrewsProps {
  brews: Brew[];
  onKudos: (id: number) => Promise<void>;
}

function formatBrewTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const time = date.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });

  if (isToday) {
    return `${time} · Idag`;
  }

  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  return `${time} · ${day} ${month}`;
}

function ThumbsUp() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z" />
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

export function RecentBrews({ brews, onKudos }: RecentBrewsProps) {
  const recent = brews.slice(0, 4);

  if (recent.length === 0) {
    return (
      <section className="recent-brews">
        <h2 className="section-title">Recent Brews</h2>
        <p className="empty-state">No brews yet. Be the first!</p>
      </section>
    );
  }

  return (
    <section className="recent-brews">
      <h2 className="section-title">Recent Brews</h2>
      <ul className="brew-list">
        {recent.map((brew) => (
          <li key={brew.id} className="brew-card">
            <div className="brew-card__info">
              <span className="brew-card__name">{brew.name}</span>
              <span className="brew-card__time">{formatBrewTime(brew.brewedAt)}</span>
            </div>
            <button
              className="kudos-btn"
              onClick={() => void onKudos(brew.id)}
              aria-label={`Give kudos to ${brew.name}`}
            >
              <ThumbsUp />
              <span className="kudos-count">{brew.kudos}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
