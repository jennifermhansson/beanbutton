import { useState, useEffect } from "react";
import Input from "./Input.jsx";
import Timer from "./Timer.jsx";
import RecentBrewers from "./RecentBrewers.jsx";
import { database } from "./firebase";
import { ref, push, onValue, set, runTransaction } from "firebase/database";

function App() {
  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState("");
  const [recentBrewers, setRecentBrewers] = useState([]);

  useEffect(() => {
    const brewsRef = ref(database, "brews");
    onValue(brewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const brewers = Object.keys(data)
          .map((key) => ({ id: key, ...data[key] }))
          .sort((a, b) => new Date(b.time) - new Date(a.time));
        setRecentBrewers(brewers);
      }
    });
  }, []);

  const handleSave = () => {
    if (name.trim() !== "") {
      const brewsRef = ref(database, "brews");
      const newBrewRef = push(brewsRef);
      set(newBrewRef, {
        name: name,
        time: new Date().toISOString(),
        kudos: 0,
      });
      setSavedName(name);
    }
  };

  const giveKudos = (id) => {
    const brewRef = ref(database, `brews/${id}`);
    runTransaction(brewRef, (brew) => {
      if (brew) {
        brew.kudos = (brew.kudos || 0) + 1;
      }
      return brew;
    });
  };

  return (
    <div>
      <h1>Bean Button</h1>
      <Input savedName={savedName} setName={setName} name={name} />
      <Timer onStart={handleSave} name={name} />
      <div className="container-brewers">
        <RecentBrewers brewers={recentBrewers} giveKudos={giveKudos} />
      </div>
    </div>
  );
}

export default App;
