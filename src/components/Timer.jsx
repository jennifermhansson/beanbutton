import { useState, useEffect } from "react";

function Timer({ onStart, name }) {
  const [showTimer, setShowTimer] = useState(5);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return; // om inte igång → gör inget

    if (typeof showTimer === "number" && showTimer > 0) {
      const timer = setTimeout(() => {
        setShowTimer((prev) => prev - 1);
      }, 1000);

      // städar bort timer när komponenten renderas om
      return () => clearTimeout(timer);
    }

    if (showTimer === 0) {
      setShowTimer("Klart");
      setIsRunning(false);
    }
    console.log(showTimer);
  }, [showTimer, isRunning]);

  const startTimer = () => {
    if (!isRunning) {
      onStart();
      setShowTimer(5); //???
      setIsRunning(true);
    }
  };

  return (
    <>
      <div id="displayTimer">{showTimer}</div>
      <div>
        <button onClick={startTimer} disabled={!name.trim()}>
          Start
        </button>
      </div>
    </>
  );
}

export default Timer;
