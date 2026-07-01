import { useEffect, useState } from 'react';

const QUOTES = [
  'Death before decaf.',
  'Espresso yourself.',
  'But first, coffee.',
  'Life is too short for bad coffee.',
  'Coffee: because adulting is hard.',
  'May your coffee be strong and your Mondays short.',
  'A yawn is a silent scream for coffee.',
  'Caffeine and code.',
  'Brew it. Ship it.',
  'This meeting could have been a coffee.',
];

const INTERVAL_MS = 6_000;

export function CheesyQuotes() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * QUOTES.length));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % QUOTES.length);
        setVisible(true);
      }, 400);
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <p className={`cheesy-quote${visible ? ' cheesy-quote--visible' : ''}`} aria-live="polite">
      &ldquo;{QUOTES[index]}&rdquo;
    </p>
  );
}
