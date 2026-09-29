import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function ThemeToggle() {
  const mode = useStoreState((s) => s.theme.mode);
  const toggle = useStoreActions((a) => a.theme.toggle);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  const isDark = mode === 'dark';

  return (
    <button
      className="theme-switch"
      onClick={toggle}
      aria-label="Toggle theme"
      aria-pressed={isDark}
    >
      <span className="theme-switch-track">
        <span className="theme-switch-label">☀️</span>
        <span className="theme-switch-label">🌙</span>
        <span className={`theme-switch-thumb ${isDark ? 'is-dark' : ''}`} />
      </span>
    </button>
  );
}