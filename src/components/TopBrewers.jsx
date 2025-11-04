const TopBrewers = ({ brewers }) => {
  //Här ska den börja kontrollera om samma brewer har samma samn o i såna fall lägga ihop kudos
  const aggregatedByName = brewers.reduce((acc, brewer) => {
    const name = brewer?.name;
    if (!name) {
      return acc;
    }

    if (!acc[name]) {
      acc[name] = { name, kudos: 0 };
    }

    acc[name].kudos += brewer.kudos || 0;
    return acc;
  }, {});

  //Här ska den slice, FYI borde gå att få till detta till recent brewers också.
  const topBrewers = Object.values(aggregatedByName)
    .sort((a, b) => (b.kudos || 0) - (a.kudos || 0))
    .slice(0, 3);

  if (topBrewers.length === 0) {
    return null;
  }

  return (
    <div className="top-brewers">
      <h2>🏆 Top Brewers</h2>
      <ol className="top-brewers-list">
        {topBrewers.map((brewer) => (
          <li key={brewer.name} className="top-brewer-container">
            <p className="brewer-name">{brewer.name}</p><p> — Antal: {brewer.kudos || 0}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopBrewers;
