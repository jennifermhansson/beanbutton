import ProgressBar from "./ProgressBar";

const FRESH_MINUTES = 5;//Här ska det ändras kanske till 30min, men vi tar 5min så vi ser resultatet
const MS_PER_MINUTE = 60 * 1000;

const formatMinutesAgo = (diffMs) => {
  const minutesAgo = Math.floor(diffMs / MS_PER_MINUTE);
  if (minutesAgo <= 0) {
    return "mindre än en minut";
  }
  if (minutesAgo === 1) {
    return "1 minut";
  }
  return `${minutesAgo} minuter`;
};

function RecentBrewerStatus({ brewers = [] }) {
  if (!brewers.length) {
    return null;
  }

  const latest = brewers[0];

  if (!latest?.time) {
    return null;
  }

  const brewedAt = new Date(latest.time);
  const brewedTimeMs = brewedAt.getTime();

  if (Number.isNaN(brewedTimeMs)) {
    return null;
  }

  const diffMs = Math.max(Date.now() - brewedTimeMs, 0);
  const isFresh = diffMs < FRESH_MINUTES * MS_PER_MINUTE;

  return (
    <section className="recent-brewer-status">
      <h2>☕️ Senaste bryggning</h2>
      <p className="recent-brewer-status__message">
        <strong>{latest.name}</strong> bryggde kaffet för{" "}
        {formatMinutesAgo(diffMs)} sedan.
      </p>
      {isFresh ? (
        <>
          <p className="recent-brewer-status__subtitle">Kaffet kallnar</p>
          <ProgressBar startedAt={latest.time} durationMinutes={FRESH_MINUTES} />
        </>
      ) : (
        <p className="recent-brewer-status__warning">Får intas på egen risk</p>
      )}
    </section>
  );
}

export default RecentBrewerStatus;
