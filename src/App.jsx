import { useState, useEffect } from "react";
import Input from "./Input.jsx";
import Timer from "./Timer.jsx";

function App() {
  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState("");

  // Hämta namnet från localStorage när sidan laddas
  useEffect(() => {
    const stored = localStorage.getItem("userName");
    if (stored) setSavedName(stored);
  }, []);

  // Vi sparar till localStorage
  const saveName = () => {
    if (name.trim() !== "") {
      localStorage.setItem("userName", name);
      setSavedName(name);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <Input name={name} setName={setName} savedName={savedName} />
      <Timer onStart={saveName} name={name} />
    </div>
  );
}

export default App;
