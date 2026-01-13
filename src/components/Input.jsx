import { useState } from "react";

function Input({ name, setName, savedName }) {
  // Uppdatera state när användaren skriver
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="user-input-container">
      <input
        maxLength={13}
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Fyll i ditt namn och tryck på knappen"
        className="user-input"
      />
    </div>
  );
}

export default Input;
