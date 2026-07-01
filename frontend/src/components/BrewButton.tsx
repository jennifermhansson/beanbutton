import { useState, type FormEvent } from 'react';

interface BrewButtonProps {
  onBrew: (name: string) => Promise<void>;
}

export function BrewButton({ onBrew }: BrewButtonProps) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Enter your name first.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onBrew(trimmed);
      setName('');
    } catch {
      setError('Failed to register brew. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="brew-button-section">
      <form onSubmit={handleSubmit} className="brew-form" noValidate>
        <div className="brew-input-wrapper">
          <input
            className="brew-input"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError('');
            }}
            disabled={loading}
            maxLength={50}
            aria-label="Your name"
          />
        </div>
        {error && <p className="brew-error">{error}</p>}
        <button
          className={`brew-btn${loading ? ' brew-btn--loading' : ''}`}
          type="submit"
          disabled={loading}
        >
          {loading ? 'BREWING…' : 'BREW IT'}
        </button>
      </form>
    </section>
  );
}
