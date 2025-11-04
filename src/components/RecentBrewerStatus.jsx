import { useEffect, useState } from "react";

const FRESH_MINUTES = 1; // kaffe räknas som färskt i 30 min
const MS_PER_MINUTE = 60 * 1000;
const delayWhenBrewing = 5; // sekunder att vänta innan status visas
const old = 2; // minuter efter vilket det är dags att brygga nytt

function RecentBrewerStatus({ brewers = [] }) {
  const [status, setStatus] = useState("väntar"); // väntar | färsk | risk | newPot

  useEffect(() => {
    if (!brewers.length || !brewers[0]?.time) return;

    const latest = brewers[0];
    const brewedAt = new Date(latest.time).getTime();

    const checkStatus = () => {
      const now = Date.now();
      const diffMinutes = (now - brewedAt) / MS_PER_MINUTE;

      if (diffMinutes >= old) {
        setStatus("newPot");
      } else if (diffMinutes >= FRESH_MINUTES) {
        setStatus("risk");
      } else if (diffMinutes >= delayWhenBrewing / 60) {
        setStatus("färsk");
      } else {
        setStatus("väntar");
      }
    };

    // Kör direkt vid mount
    checkStatus();

    // Kolla var 10:e sekund
    const timer = setInterval(checkStatus, 10 * 1000);

    return () => clearInterval(timer);
  }, [brewers]);

  const brewerName = brewers[0]?.name || "Okänd";

  return (
    <section className="recent-brewer-status">
      <h2>☕️ Senaste bryggning</h2>

      {status === "väntar" && <p>⏳ Bryggning pågår...{brewerName}</p>}

      {status === "färsk" && (
        <p>🟢 {brewerName} bryggde nyligen – kaffe finns!</p>
      )}

      {status === "risk" && (
        <p className="recent-brewer-status__warning">
          ⚠️ Kaffet är äldre än {FRESH_MINUTES} minuter – på egen risk!
        </p>
      )}

      {status === "newPot" && (
        <p className="recent-brewer-status__warning">
          🕰️ Kaffet är över {old} minuter gammalt – brygg nytt!
        </p>
      )}
    </section>
  );
}

export default RecentBrewerStatus;