import { useEffect, useMemo, useState } from "react";

const MS_PER_MINUTE = 60 * 1000;

function ProgressBar({ startedAt, durationMinutes = 30 }) {
  if (!startedAt) {
    return null;
  }

  const durationMs = durationMinutes * MS_PER_MINUTE;

  const calculateRemaining = () => {
    const startMs = new Date(startedAt).getTime();
    if (Number.isNaN(startMs)) {
      return 0;
    }
    const elapsed = Date.now() - startMs;
    return Math.max(durationMs - elapsed, 0);
  };

  const [remainingMs, setRemainingMs] = useState(calculateRemaining);

  useEffect(() => {
    setRemainingMs(calculateRemaining());
    const id = setInterval(() => {
      setRemainingMs(calculateRemaining());
    }, 1000);

    return () => clearInterval(id);
    // durationMinutes is stable, but include for completeness if parent changes it
  }, [startedAt, durationMinutes]);

  const percent = durationMs
    ? Math.max(Math.round((remainingMs / durationMs) * 100), 0)
    : 0;
  const minutes = Math.floor(remainingMs / MS_PER_MINUTE);
  const seconds = Math.floor((remainingMs % MS_PER_MINUTE) / 1000);

  const containerStyle = useMemo(
    () => ({
      width: "100%",
      backgroundColor: "#f0e6d8",
      borderRadius: "999px",
      overflow: "hidden",
      border: "1px solid #d8c7b5",
      marginTop: "0.75rem",
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
      background: "linear-gradient(90deg, #8b5a2b, #c68642)",
      color: "#1f0505ff",
      fontWeight: 600,
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
          ? ` ${minutes}m ${seconds.toString().padStart(2, "0")}s`
          : "0% • Kaffet är ljummet"}
      </div>
    </div>
  );
}

export default ProgressBar;
