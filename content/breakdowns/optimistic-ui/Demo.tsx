'use client';

import React, { useState } from 'react';
import { DemoFrame, Segmented } from '@/components/demo-kit';

// ── Demo: Optimistic UI ────────────────────────────────────────────────────
const OptimisticDemo = () => {
  const [mode, setMode] = useState('optimistic');
  const [liked, setLiked] = useState(false);
  const [pending, setPending] = useState(false);
  const [count, setCount] = useState(412);

  const onClick = () => {
    if (mode === 'optimistic') {
      setLiked((l) => !l);
      setCount((c) => (liked ? c - 1 : c + 1));
    } else {
      setPending(true);
      setTimeout(() => {
        setLiked((l) => !l);
        setCount((c) => (liked ? c - 1 : c + 1));
        setPending(false);
      }, 900);
    }
  };

  return (
    <DemoFrame
      title="Optimistic UI"
      tag="time"
      tags={['perceived performance', 'state']}
      desc="Apply the change instantly; reconcile with the server in the background. The user never waits for the network for actions that almost always succeed."
      controls={
        <Segmented
          value={mode}
          onChange={setMode}
          options={[
            { id: 'optimistic', label: 'Optimistic' },
            { id: 'pessimistic', label: 'Wait for server' },
          ]}
        />
      }
    >
      <button
        onClick={onClick}
        disabled={pending}
        style={{
          appearance: 'none',
          background: 'transparent',
          border: 0,
          padding: 0,
          color: 'inherit',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          cursor: 'pointer',
          opacity: pending ? 0.5 : 1,
          textAlign: 'left',
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            background: liked
              ? 'color-mix(in srgb, var(--accent) 22%, transparent)'
              : 'var(--surface-2)',
            border: `1px solid ${liked ? 'var(--accent)' : 'var(--border)'}`,
            display: 'grid',
            placeItems: 'center',
            transition: 'all 180ms cubic-bezier(0.2,0.7,0.2,1)',
            transform: liked ? 'scale(1.08)' : 'scale(1)',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={liked ? 'var(--accent)' : 'none'}
            stroke={liked ? 'var(--accent)' : 'var(--ink-dim)'}
            strokeWidth="1.8"
          >
            <path d="M12 21s-7-4.5-9-9c-1.5-3.5 1-7 5-7 2 0 4 2 4 2s2-2 4-2c4 0 6.5 3.5 5 7-2 4.5-9 9-9 9z" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500 }}>{liked ? 'Liked' : 'Like'}</div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>
            {count.toLocaleString()} {pending && '· saving…'}
          </div>
        </div>
      </button>
    </DemoFrame>
  );
};

export default OptimisticDemo;
