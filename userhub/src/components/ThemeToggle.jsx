import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function ThemeToggle() {
  const mode = useStoreState((s) => s.theme.mode);
  const toggle = useStoreActions((a) => a.theme.toggle);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  return (
    <button className="btn" onClick={toggle} aria-label="Toggle theme">
      {mode === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}