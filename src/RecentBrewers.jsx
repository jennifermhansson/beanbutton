const RecentBrewers = ({ brewers, giveKudos }) => {
  return (
    <div className="recent-brewers">
      <h2>☕️ Recent Brewers</h2>
      <ul>
        {brewers.map((brewer) => (
          <li key={brewer.id}>
            <strong>{brewer.name}</strong>
            <br />
            <small>{new Date(brewer.time).toLocaleString()}</small>
            <br />
            <span>Kudos: {brewer.kudos}</span>
            <button onClick={() => giveKudos(brewer.id)}>Give Kudos</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentBrewers;
