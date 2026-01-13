import { useState, useEffect } from "react";
import Input from "./components/Input.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import RecentBrewers from "./components/RecentBrewers.jsx";
import TopBrewers from "./components/TopBrewers.jsx";
import RecentBrewerStatus from "./components/RecentBrewerStatus.jsx";
import { database, ensureAnonymousAuth } from "./firebase";
import { ref, push, onValue, set, runTransaction } from "firebase/database";
import CheesyQuotes from "./components/CheesyQuotes.jsx";
import FooterObj from "./components/footer.jsx";

function App() {
  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState("");
  const [recentBrewers, setRecentBrewers] = useState([]);

  // ⏳ ingen isRunning längre – ProgressBar visar sig själv utifrån tiden
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

  const handleSave = async () => {
    if (name.trim() !== "") {
      try {
        await ensureAnonymousAuth();
        const brewsRef = ref(database, "brews");
        const newBrewRef = push(brewsRef);
        await set(newBrewRef, {
          name: name,
          time: new Date().toISOString(),
          kudos: 0,
        });
        setSavedName(name);
      } catch (err) {
        console.error("Failed to save brew:", err);
      }
    }
  };

  const giveKudos = async (id) => {
    try {
      await ensureAnonymousAuth();
      const brewRef = ref(database, `brews/${id}`);
      await runTransaction(brewRef, (brew) => {
        if (brew) {
          brew.kudos = (brew.kudos || 0) + 1;
        }
        return brew;
      });
    } catch (err) {
      console.error("Failed to give kudos:", err);
    }
  };

  return (
    <>
      <div className="coffe-btn-container">
        <div className="logo-container">
          <img id="logo" src="logo.png" alt="Coffee Button logo" />
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
                <ProgressBar
                  brewers={recentBrewers}
                  durationMinutes={5}
                  onComplete={() => console.log("Bryggning klar!")}
                />
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
