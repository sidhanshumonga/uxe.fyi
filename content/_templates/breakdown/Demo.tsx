'use client';

// Breakdown demo template. Checklist (CONTRIBUTING.md#building-a-breakdown):
// theme tokens only, keyboard-usable with visible focus, respects
// prefers-reduced-motion, works at 375px, no network calls or new deps.

import { useState } from 'react';

export default function Demo() {
  const [mode, setMode] = useState<'before' | 'after'>('after');

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div role="group" aria-label="Compare" style={{ display: 'flex', gap: 6 }}>
        {(['before', 'after'] as const).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setMode(m)}
            style={{
              padding: '6px 12px',
              borderRadius: 999,
              border: '1px solid var(--border)',
              background: mode === m ? 'var(--surface-2)' : 'transparent',
              color: mode === m ? 'var(--ink)' : 'var(--ink-dim)',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            {m}
          </button>
        ))}
      </div>
      <div style={{ padding: 24, borderRadius: 14, background: 'var(--surface)', color: 'var(--ink)' }}>
        {mode === 'before' ? 'The interaction without the technique.' : 'The interaction with it.'}
      </div>
    </div>
  );
}
