import { useEffect, useState } from "react";

const FRESH_MINUTES = 30; // kaffe räknas som färskt i 30 min
const MS_PER_MINUTE = 60 * 1000;
const delayWhenBrewing = 180; // sekunder att vänta innan status visas
const old = 90; // minuter efter vilket det är dags att brygga nytt

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
    <div className="recent-brewer-status">
      <h2>☕️ Senaste bryggning</h2>

      {status === "väntar" && <div>⏳ Bryggning pågår...<p className="brewer-name">{brewerName}</p></div>}

      {status === "färsk" && (
        <div><p className="brewer-name">{brewerName}</p> bryggde nyligen, kaffe finns!</div>
      )}

      {status === "risk" && (
        <div className="recent-brewer-status__warning">
          ⚠️ Kaffet är äldre än <p>{FRESH_MINUTES} minuter</p> drick på egen risk!
        </div>
      )}

      {status === "newPot" && (
        <div className="recent-brewer-status__warning">
          🕰️ Kaffet är över <p>{old} minuter</p>  gammalt, brygg nytt!
        </div>
      )}
    </div>
  );
}

export default RecentBrewerStatus;