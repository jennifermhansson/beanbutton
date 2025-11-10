import { useState, useEffect } from "react";
import Input from "./components/Input.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import RecentBrewers from "./components/RecentBrewers.jsx";
import TopBrewers from "./components/TopBrewers.jsx";
import RecentBrewerStatus from "./components/RecentBrewerStatus.jsx";
import { database } from "./firebase";
import { ref, push, onValue, set, runTransaction } from "firebase/database";
import CheesyQuotes from "./components/CheesyQuotes.jsx";
import FooterObj from "./components/footer.jsx";

function App() {
  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState("");
  const [recentBrewers, setRecentBrewers] = useState([]);
  // Progress bar hidden by default; shown once someone clicks the brew button
  const [isRunning, setIsRunning] = useState(false);

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
    setIsRunning(true);
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
    <>
      <div className="coffe-btn-container">
        <div className="logo-text">
          <img src="./src/assets/cup.png" alt="Coffe button logo picture" />
          Coffee Button
        </div>
        <CheesyQuotes />
        <div className="horizontal">
          <div className="left-side">
            <RecentBrewerStatus brewers={recentBrewers} />
            <div className="brygg">
              <Input savedName={savedName} setName={setName} name={name} />
              <button onClick={handleSave} className="brew-btn">
                Gör mer kaffe!
              </button>
              <div className="coffe-status">
                {isRunning ? (
                  <ProgressBar
                    brewers={recentBrewers}
                    onComplete={() => setIsRunning(false)}
                  />
                ) : (
                  "Ingen brygger kaffe just nu"
                )}
              </div>
            </div>
          </div>
          <div className="right-side">
            <TopBrewers brewers={recentBrewers} />
            <RecentBrewers brewers={recentBrewers} giveKudos={giveKudos} />
          </div>
        </div>

        <div className="container-brewers"></div>
      </div>
      <FooterObj />
    </>
  );
}

export default App;
