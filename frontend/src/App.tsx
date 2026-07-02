import './App.css';
import { useBrews } from './hooks/useBrews';
import { BrewButton } from './components/BrewButton';
import { CoffeeStatus } from './components/CoffeeStatus';
import { RecentBrews } from './components/RecentBrews';
import { TopBrewers } from './components/TopBrewers';
import { ConnectionStatus } from './components/ConnectionStatus';
import { CheesyQuotes } from './components/CheesyQuotes';

export default function App() {
  const { brews, topBrewers, addBrew, giveKudos, connectionStatus } = useBrews();

  return (
    <>
      <ConnectionStatus status={connectionStatus} />

      <div className="app-layout">
        <header className="app-header">
          <div className="logo">
            <span className="logo-bean">&#9749;</span>
            <span className="logo-text">Bean<span className="logo-accent">Button</span></span>
          </div>
          <CheesyQuotes />
        </header>

        <main className="app-main">
          <CoffeeStatus brews={brews} />
          <BrewButton onBrew={addBrew} />
          <RecentBrews brews={brews} onKudos={giveKudos} />
          <TopBrewers brewers={topBrewers} />
        </main>

        <footer className="app-footer">
          <span>Built with ☕ by Jennifer &amp; Moises</span>
        </footer>
      </div>
    </>
  );
}
