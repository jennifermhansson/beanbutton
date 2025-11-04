import { useEffect, useState } from "react";

const old = 3;
const FRESH_MINUTES = 2; // kaffe räknas som färskt i 30 min
const MS_PER_MINUTE = 60 * 1000;

const delayWhenBrewing = 20; // sekunder att vänta innan status visas

function RecentBrewerStatus({ brewers = [] }) {
  const [status, setStatus] = useState("väntar"); // väntar | färsk | risk
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    if (!brewers.length || !brewers[0]?.time) return;

    const latest = brewers[0];
    const brewedAt = new Date(latest.time).getTime();

    // Första steget: vänta fördröjning i sekunder
    const delayTimer = setTimeout(() => {
      setTimerStarted(true);
      setStatus("färsk");

      // När delayen gått ut → starta "färskhets-timer"
      const freshnessTimer = setInterval(() => {
        const now = Date.now();
        const diffMs = now - brewedAt;
        const diffMinutes = diffMs / MS_PER_MINUTE;

        if (diffMinutes >= FRESH_MINUTES) {
          setStatus("risk");
          clearInterval(freshnessTimer);
        }else if(diffMinutes >= old){
          setStatus("newPot");
        }
        
      }, 10 * 1000); // kolla var 10:e sekund

      // Rensa timer när komponent avmonteras
      return () => clearInterval(freshnessTimer);
    }, delayWhenBrewing * 1000);

    // Rensa första timern vid avmontering
    return () => clearTimeout(delayTimer);
  }, [brewers]);

  const latest = brewers[0];
  const brewerName = latest?.name || "Okänd";

  return (
    <section className="recent-brewer-status">
      <h2>☕️ Senaste bryggning</h2>
      {status === "newPot" && (
        <p>⏳ Gör du inget, gör kaffe! </p>
      )}

      {status === "väntar" && (
        <p>⏳ Bryggning pågår... startat av </p>
      )}

      {status === "färsk" && (
        <p>🟢 {brewerName} bryggde nyligen – kaffe finns!</p>
      )}

      {status === "risk" && (
        <p className="recent-brewer-status__warning">
          ⚠️ Kaffet är äldre än {FRESH_MINUTES} minuter – på egen risk!
        </p>
      )}
    </section>
  );
}

export default RecentBrewerStatus;
