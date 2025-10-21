import { useState, useEffect } from "react";

function Input() {
  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState("");

  // Hämta namnet från localStorage när sidan laddas om
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setSavedName(storedName);
    }
  }, []);

  // Uppdatera state när användaren skriver
  const handleChange = (event) => {
    setName(event.target.value);
  };

  // Spara till localStorage när man klickar på knappen
  const handleSave = () => {
    if (name.trim() !== "") {
      localStorage.setItem("userName", name);
      setSavedName(name);
    }
  };

  return (
    <div className="userInput">
      <h2>Hej {savedName ? savedName : ""} </h2>
      <h2>Fyll i ditt namn för att starta bryggningen!☕</h2>

      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Namn"
      />
      <button onClick={handleSave}>Starta bryggning!</button>
    </div>
  );
}

export default Input;
