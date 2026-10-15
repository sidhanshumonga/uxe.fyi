'use client';

import React, { useState } from 'react';
import { DemoFrame } from '@/components/demo-kit';

// Practice: walk one button through every state it can be in.

const STATES = [
  { id: 'default', says: 'You can do this.' },
  { id: 'hover', says: 'This is the thing your pointer will act on.' },
  { id: 'focus', says: 'Keyboard users are here. Never hide this ring.' },
  { id: 'active', says: 'Your press registered, right now.' },
  { id: 'disabled', says: 'Not available yet — say why nearby.' },
  { id: 'loading', says: 'Working on it. Don’t click again.' },
  { id: 'success', says: 'Done. Briefly, then back to normal.' },
  { id: 'error', says: 'It didn’t work, and here is how to recover.' },
] as const;
type State = (typeof STATES)[number]['id'];

const styleFor = (s: State): React.CSSProperties => {
  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 9, fontSize: 14,
    fontWeight: 500, border: '1px solid transparent', background: 'var(--accent)', color: 'var(--accent-ink)',
    transition: 'all 150ms', cursor: 'pointer',
  };
  switch (s) {
    case 'hover': return { ...base, filter: 'brightness(1.08)', transform: 'translateY(-1px)' };
    case 'focus': return { ...base, outline: '2px solid var(--accent)', outlineOffset: 3 };
    case 'active': return { ...base, transform: 'translateY(1px) scale(0.98)', filter: 'brightness(0.95)' };
    case 'disabled': return { ...base, background: 'var(--surface-2)', color: 'var(--muted)', cursor: 'not-allowed' };
    case 'loading': return { ...base, opacity: 0.85, cursor: 'progress' };
    case 'success': return { ...base, background: '#9EE493', color: '#0B0B0A' };
    case 'error': return { ...base, background: 'transparent', color: 'var(--warn)', borderColor: 'var(--warn)' };
    default: return base;
  }
};

const label: Record<State, string> = {
  default: 'Save changes', hover: 'Save changes', focus: 'Save changes', active: 'Save changes',
  disabled: 'Save changes', loading: 'Saving…', success: '✓ Saved', error: 'Retry save',
};

export default function StatesPractice() {
  const [state, setState] = useState<State>('default');
  const current = STATES.find((s) => s.id === state)!;
  return (
    <DemoFrame
      title="Every state of one button"
      tag="practice"
      tags={['states', 'feedback']}
      desc="Most mockups show one of these. Step through all eight, then count how many your own buttons actually have."
    >
      <div role="radiogroup" aria-label="Button state" style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
        {STATES.map((s) => (
          <button
            key={s.id}
            type="button"
            role="radio"
            aria-checked={state === s.id}
            onClick={() => setState(s.id)}
            className="mono"
            style={{
              padding: '4px 10px', fontSize: 11, borderRadius: 999, cursor: 'pointer', border: '1px solid var(--border)',
              background: state === s.id ? 'var(--ink)' : 'transparent', color: state === s.id ? 'var(--bg)' : 'var(--ink-dim)',
            }}
          >
            {s.id}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', placeItems: 'center', padding: '22px 0', borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
        <span style={styleFor(state)} aria-hidden="true">
          {state === 'loading' && <span style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid currentColor', borderRightColor: 'transparent', display: 'inline-block', animation: 'practice-spin 700ms linear infinite' }} />}
          {label[state]}
        </span>
      </div>
      <p aria-live="polite" style={{ margin: '12px 0 0', fontSize: 13.5, color: 'var(--ink-dim)' }}>
        <span className="mono" style={{ color: 'var(--accent)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{current.id}</span> — {current.says}
      </p>
      <style>{'@keyframes practice-spin{to{transform:rotate(360deg)}}@media (prefers-reduced-motion: reduce){[style*="practice-spin"]{animation:none!important}}'}</style>
    </DemoFrame>
  );
}
