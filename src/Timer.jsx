import { useState, useEffect } from "react";

function Timer({ onStart, name }) {
  // när timern startas så sparas namnet
  const [showTimer, setShowTimer] = useState(5);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    if (typeof showTimer === "number" && showTimer > 0) {
      const timer = setTimeout(() => {
        setShowTimer((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (showTimer === 0) {
      setShowTimer("Kaffet klart!");
      setIsRunning(false);
    }
  }, [showTimer, isRunning]);

  const startTimer = () => {
    if (!isRunning) {
      onStart(); // när timern startas så sparas namnet
      setIsRunning(true);
    }
  };

  return (
    <>
      <div id="displayTimer">{showTimer}</div>
      <button onClick={startTimer} disabled={!name.trim()}>
        Start
      </button>
    </>
  );
}

export default Timer;
