import type { TopBrewer } from "../types";

interface TopBrewersProps {
  brewers: TopBrewer[];
}

const RANK_LABELS = ["01", "02", "03"];

export function TopBrewers({ brewers }: TopBrewersProps) {
  const top = brewers.slice(0, 3);

  return (
    <section className="top-brewers">
      <h2 className="section-title">Top Brewers👑</h2>
      {top.length === 0 ? (
        <p className="empty-state">Give some kudos to build the leaderboard.</p>
      ) : (
        <ol
          className="leaderboard"
          aria-label="Top brewers leaderboard"
        >
          {top.map((brewer, i) => (
            <li
              key={brewer.name}
              className={`leaderboard-item leaderboard-item--rank-${i + 1}`}
            >
              <span className="rank-num">{RANK_LABELS[i]}</span>
              <span className="brewer-name">{brewer.name}</span>
              <span className="brewer-kudos">
                <span className="kudos-value">{brewer.totalKudos}</span>
                <span className="kudos-label"> kudos</span>
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
