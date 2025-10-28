import { useEffect, useState } from "react"

const RecentBrewers = () => {
  const [topList, setTopList] = useState([])

  useEffect(() => {
    // 1. Hämta all data från localStorage
    const data = JSON.parse(localStorage.getItem("brewers")) || []

    // 2. Sortera efter datum (senaste först)
    const sorted = data.sort((a, b) => new Date(b.time) - new Date(a.time))

    // 3. Ta de 3 senaste
    const topThree = sorted.slice(0, 3)

    // 4. Uppdatera state
    setTopList(topThree)
  }, [])

  return (
    <div className="recent-brewers">
      <h2>☕️ Recent Brewers</h2>
      <ul>
        {topList.map((brewer, index) => (
          <li key={index}>
            <strong>{brewer.name}</strong>
            <br />
            <small>{new Date(brewer.time).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecentBrewers