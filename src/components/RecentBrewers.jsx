const RecentBrewers = ({ brewers, giveKudos }) => {
  return (
    <div className="recent-brewers">
      <h2>☕️Senaste bryggningarna</h2>
      <ul className="recent-brewers-list">
        {brewers.slice(0, 5).map((brewer) => {
          const brewedAt = new Date(brewer.time);
          // Show 'Idag' when the brew happened today, otherwise show the full date
          const isToday = new Date().toDateString() === brewedAt.toDateString();
          const date = isToday ? "Idag" : brewedAt.toLocaleDateString("sv-SE");
          const time = brewedAt.toLocaleTimeString("sv-SE", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <li key={brewer.id}>
              <div className="name-time-container">
                <p className="brewer-name">{brewer.name}</p>

                <p className="brewer-date">{date}</p>
                <p className="brewer-time">{time}</p>
              </div>
              <div className="kudos-klick">
                <button
                  onClick={() => giveKudos(brewer.id)}
                  className="kudos-btn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-thumbs-up w-8 h-8 thumbs-icon"
                  >
                    <path d="M7 10v12H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z"></path>
                    <path d="M21 11.5a2.5 2.5 0 0 0-2.5-2.5H14l1-5a1.5 1.5 0 0 0-3 0L8 12v10h8.5a2.5 2.5 0 0 0 2.5-2.5z"></path>
                  </svg>
                </button>
                <p>{brewer.kudos}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentBrewers;
