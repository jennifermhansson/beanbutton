import { useState, useEffect } from "react";

function Input({ name, setName, savedName }) {
  // Uppdatera state när användaren skriver
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="user-input-container">
      {/* <h2>Hej {savedName ? savedName : ""} </h2> */}
      <h2>Hur går det här till?</h2>
      <ul>
        <li>Fyll i ditt namn</li>
        <li>Tryck på knappen</li>
        <li>Ta-da!</li>
      </ul>

      <input
        maxlength="13"
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Vem är den duktiga bryggaren?"
        className="user-input"
      />
    </div>
  );
}

export default Input;
