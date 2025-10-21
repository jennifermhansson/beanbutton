function Input({ name, setName, savedName }) {
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="userInput">
      <h2>Hej {savedName ? savedName : ""} </h2>
      <h2>Fyll i ditt namn för att starta bryggningen! ☕</h2>

      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Namn"
      />
    </div>
  );
}

export default Input;
