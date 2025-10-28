import Timer from "./Timer.jsx";
import Input from "./Input.jsx";
import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState("");

  // Hämta namnet från localStorage när sidan laddas om
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setSavedName(storedName);
    }
  }, []);

    // Spara till localStorage när man klickar på knappen
  const handleSave = () => {
    if (name.trim() !== "") {
      localStorage.setItem("userName", name);
      setSavedName(name);
    }
  };

  return (
    <div>
      <h1>Bean Button</h1>
      <Input savedName={savedName} setName={setName} name={name} />
      <Timer onStart={handleSave} name={name} />
    </div>
  );
}

export default App;
