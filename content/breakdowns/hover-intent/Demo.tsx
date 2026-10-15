'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DemoFrame, Segmented } from '@/components/demo-kit';
import { Avatar } from '@/components/CommunityComponents';

// ── Demo: Hover intent (context/breakdowns2.jsx) ────────────────────────────
// Wait ~400ms before the first tooltip opens; once one has opened ("warm"),
// open neighbours immediately until the cursor leaves the group.

const OPEN_DELAY = 400;
const COOL_DOWN = 300;

// Sample people for the demo, not real contributors.
const PEOPLE = [
  { i: 'A', c: '#C2F542', n: 'Ada', r: 'design systems' },
  { i: 'G', c: '#6DE1FF', n: 'Grace', r: 'motion' },
  { i: 'K', c: '#FFB46D', n: 'Kai', r: 'accessibility' },
  { i: 'R', c: '#C77DFF', n: 'Rumi', r: 'essays' },
];

const HoverIntentDemo = () => {
  const [mode, setMode] = useState('intent');
  const [open, setOpen] = useState<number | null>(null);
  const openT = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warmT = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warm = useRef(false);

  const clear = () => {
    if (openT.current) clearTimeout(openT.current);
    if (warmT.current) clearTimeout(warmT.current);
  };
  useEffect(() => clear, []);

  const enter = (i: number) => {
    clear();
    if (mode === 'instant' || warm.current) { setOpen(i); warm.current = true; return; }
    openT.current = setTimeout(() => { setOpen(i); warm.current = true; }, OPEN_DELAY);
  };
  const leave = () => {
    if (openT.current) clearTimeout(openT.current);
    setOpen(null);
    warmT.current = setTimeout(() => { warm.current = false; }, COOL_DOWN);
  };

  return (
    <DemoFrame
      title="Hover intent"
      tag="attention"
      tags={['tooltips', 'timing']}
      desc="Tooltips that open instantly flicker as the cursor passes through. Wait about 400ms before the first one opens, then open neighbours immediately while the user is browsing."
      controls={
        <Segmented
          value={mode}
          onChange={(m) => { setMode(m); setOpen(null); warm.current = false; }}
          options={[
            { id: 'instant', label: 'Instant' },
            { id: 'intent', label: 'Intent + warm' },
          ]}
        />
      }
    >
      <div style={{ minHeight: 150, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', gap: 10 }} onMouseLeave={leave}>
          {PEOPLE.map((p, i) => (
            <button
              key={p.n}
              type="button"
              aria-describedby={open === i ? `hover-intent-tip-${i}` : undefined}
              onMouseEnter={() => enter(i)}
              onFocus={() => { clear(); setOpen(i); warm.current = true; }}
              onBlur={leave}
              style={{ position: 'relative', padding: 4, appearance: 'none', background: 'none', border: 0, borderRadius: '50%', cursor: 'default' }}
            >
              <Avatar a={p} size={40} />
              {open === i && (
                <div
                  id={`hover-intent-tip-${i}`}
                  role="tooltip"
                  style={{ position: 'absolute', bottom: 'calc(100% + 6px)', left: '50%', transform: 'translateX(-50%)', background: 'var(--ink)', color: 'var(--bg)', borderRadius: 8, padding: '7px 10px', whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 2, textAlign: 'left' }}
                >
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>{p.n}</div>
                  <div className="mono" style={{ fontSize: 10, opacity: 0.7 }}>{p.r}</div>
                </div>
              )}
            </button>
          ))}
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>sweep the cursor across the row</div>
      </div>
    </DemoFrame>
  );
};

export default HoverIntentDemo;
