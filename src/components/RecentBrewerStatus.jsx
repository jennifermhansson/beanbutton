import ProgressBar from "./ProgressBar";

const FRESH_MINUTES = 2; //Här ska det ändras kanske till 30min, men lägg gärna till 5min tll som tas i bryggningen dvs addera det som finns i "durationMinutes" i progressbar.jsx
const MS_PER_MINUTE = 60 * 1000;

const delayWhenBrewing = 1;

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
  const hasDelayPassed = diffMs >= delayWhenBrewing * MS_PER_MINUTE;
  const isFresh =
    hasDelayPassed &&
    diffMs < (FRESH_MINUTES + delayWhenBrewing) * MS_PER_MINUTE;

  return (
    <section className="recent-brewer-status">
      <h2>☕️ Senaste bryggning</h2>
      <p className="recent-brewer-status__message">
        <strong>{latest.name}</strong> bryggde kaffet för{" "}
        {formatMinutesAgo(diffMs)} sedan.
      </p>
      {hasDelayPassed ? (
        isFresh ? (
          <>
            <p>Kaffet kallnar</p>
            <ProgressBar
              startedAt={latest.time}
              durationMinutes={FRESH_MINUTES}
            />
            <div className="status-banner">
              <div className="status-box">
                <h3>Färsk kaffe finns att hämta!</h3>
              </div>
            </div>
          </>
        ) : (
          <p>Får intas på egen risk</p>
        )
      ) : (
        <p>☕ Bryggning pågår… vänta {delayWhenBrewing} minut</p>
      )}
    </section>
  );
}

export default RecentBrewerStatus;
