import { useEffect, useMemo, useState } from "react";

const MS_PER_MINUTE = 60 * 1000;

/**
 * ProgressBar som tar in en array av brewers-objekt
 * och använder tiden från den senaste (första) bryggningen.
 */
function ProgressBar({ brewers = [], durationMinutes = 3 }) {
  // 🧩 Ingen data? Visa inget
  if (!brewers.length) return null;

  const latest = brewers[0];
  const startedAt = latest?.time;
  if (!startedAt) return null;

  const durationMs = durationMinutes * MS_PER_MINUTE;

  // 🔹 Beräkna återstående tid utifrån när senaste bryggningen startade
  const calculateRemaining = () => {
    const startMs = new Date(startedAt).getTime();
    if (Number.isNaN(startMs)) return 0;

    const elapsed = Date.now() - startMs;
    return Math.max(durationMs - elapsed, 0);
  };

  const [remainingMs, setRemainingMs] = useState(calculateRemaining);

  // 🔁 Uppdatera varje sekund
  useEffect(() => {
    const update = () => setRemainingMs(calculateRemaining());
    update();

    const intervalId = setInterval(update, 1000);
    return () => clearInterval(intervalId);
  }, [startedAt, durationMinutes]);

  // 📊 Beräkna procent och tid
  const percent = Math.max(Math.round((remainingMs / durationMs) * 100), 0);
  const minutes = Math.floor(remainingMs / MS_PER_MINUTE);
  const seconds = Math.floor((remainingMs % MS_PER_MINUTE) / 1000);

  // 🎨 Stil
  const containerStyle = useMemo(
    () => ({
      width: "200px",
      backgroundColor: "#f0e6d8",
      borderRadius: "999px",
      overflow: "hidden",
      border: "1px solid #d8c7b5",
      marginTop: "2rem",
    }),
    []
  );

  const barStyle = useMemo(
    () => ({
      width: `${percent}%`,
      minHeight: "2.25rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background:
        percent > 0 ? "linear-gradient(90deg, #8b5a2b, #c68642)" : "#ccc",
      color: "#333",
      letterSpacing: "0.5px",
      transition: "width 0.5s ease",
      whiteSpace: "nowrap",
    }),
    [percent]
  );

  return (
    <div style={containerStyle} aria-live="polite">
      <div style={barStyle}>
        {remainingMs > 0
          ? ` ${minutes}m ${seconds.toString().padStart(2, "0")}s `
          : ""}
      </div>
    </div>
  );
}

export default ProgressBar;
