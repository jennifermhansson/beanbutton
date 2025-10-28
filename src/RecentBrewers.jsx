const RecentBrewers = ({ brewers, giveKudos }) => {
  return (
    <div className="recent-brewers">
      <h2>☕️ Recent Brewers</h2>
      <ul>
        {brewers.map((brewer) => (
          <li key={brewer.id}>
            <div className="name-time-container">
              <strong>{brewer.name}</strong>

              <small>{new Date(brewer.time).toLocaleString()}</small>
            </div>
            <div className="kudos-container">
              <span>Kudos: {brewer.kudos}</span>
              <button onClick={() => giveKudos(brewer.id)}>Give Kudos</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentBrewers;
