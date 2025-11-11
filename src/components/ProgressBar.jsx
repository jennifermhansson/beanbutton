import { useEffect, useMemo, useState, useRef } from "react";

const MS_PER_MINUTE = 60 * 1000;

function ProgressBar({ brewers = [], durationMinutes = 5, onComplete }) {
  if (!brewers.length) return null;

  const latest = brewers[0];
  const startedAt = latest?.time;
  if (!startedAt) return null;

  const durationMs = durationMinutes * MS_PER_MINUTE;

  const calculateRemaining = () => {
    const startMs = new Date(startedAt).getTime();
    if (Number.isNaN(startMs)) return 0;
    const elapsed = Date.now() - startMs;
    return Math.max(durationMs - elapsed, 0);
  };

  const [remainingMs, setRemainingMs] = useState(calculateRemaining);
  const completedCalled = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingMs(calculateRemaining());
    }, 1000);
    return () => clearInterval(interval);
  }, [startedAt, durationMinutes]);

  useEffect(() => {
    if (remainingMs === 0 && !completedCalled.current) {
      completedCalled.current = true;
      if (typeof onComplete === "function") onComplete();
    }
  }, [remainingMs, onComplete]);

  const percent = Math.round((remainingMs / durationMs) * 100);
  const minutes = Math.floor(remainingMs / MS_PER_MINUTE);
  const seconds = Math.floor((remainingMs % MS_PER_MINUTE) / 1000);

  const containerStyle = useMemo(
    () => ({
      width: "200px",
      backgroundColor: "#f0e6d8",
      borderRadius: "999px",
      overflow: "hidden",
      border: "1px solid #d8c7b5",
      marginTop: "0.1rem",
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
        percent > 0 ? "linear-gradient(90deg, #ca8505, #ffd78dff" : "#ccc",
      color: "#333",
      letterSpacing: "0.5px",
      transition: "width 0.5s ease",
      whiteSpace: "nowrap",
    }),
    [percent]
  );

  // 🟡 Om tiden är slut, visa klar-text istället för att ta bort komponenten
  if (remainingMs <= 0) {
    return <div></div>;
  }

  return (
    <div style={containerStyle} aria-live="polite">
      <div style={barStyle}>
        {` ${minutes}m ${seconds.toString().padStart(2, "0")}s `}
      </div>
    </div>
  );
}

export default ProgressBar;
