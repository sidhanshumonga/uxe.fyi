'use client';

import React, { useRef, useState } from 'react';
import { DemoFrame, Segmented } from '@/components/demo-kit';

// Practice: feel Fitts's law. Click "Start", then the target, five times per
// round. Small-and-far vs large-and-near; your real average times compared.

const TRIALS = 5;
type Round = 'far' | 'near';
const ROUNDS: Record<Round, { size: number; minDist: number; label: string }> = {
  far: { size: 18, minDist: 0.62, label: 'Small + far' },
  near: { size: 64, minDist: 0.12, label: 'Large + near' },
};

export default function FittsPractice() {
  const [round, setRound] = useState<Round>('far');
  const [target, setTarget] = useState<{ x: number; y: number } | null>(null);
  const [times, setTimes] = useState<Record<Round, number[]>>({ far: [], near: [] });
  const started = useRef(0);
  const arena = useRef<HTMLDivElement>(null);

  const done = times[round].length >= TRIALS;
  const avg = (r: Round) => (times[r].length ? Math.round(times[r].reduce((a, b) => a + b, 0) / times[r].length) : null);

  const start = () => {
    const el = arena.current;
    if (!el || done) return;
    const { size, minDist } = ROUNDS[round];
    const w = el.clientWidth - size - 16;
    const h = el.clientHeight - size - 16;
    // Start button sits on the left; place the target at least minDist of the width away.
    const x = Math.min(w, Math.max(minDist * w, 90) + Math.random() * (1 - minDist) * w * 0.9);
    const y = 8 + Math.random() * h;
    setTarget({ x, y });
    started.current = performance.now();
  };

  const hit = () => {
    const ms = performance.now() - started.current;
    setTimes((t) => ({ ...t, [round]: [...t[round], ms] }));
    setTarget(null);
  };

  const reset = () => { setTimes({ far: [], near: [] }); setTarget(null); };
  const a = avg('far');
  const b = avg('near');

  return (
    <DemoFrame
      title="Feel Fitts’s law"
      tag="practice"
      tags={['pointer', 'timing']}
      desc={`Press Start, then click the target as fast as you can — ${TRIALS} times per round. Then switch rounds and compare your averages.`}
      controls={<Segmented value={round} onChange={(r) => { setRound(r as Round); setTarget(null); }} options={[{ id: 'far', label: ROUNDS.far.label }, { id: 'near', label: ROUNDS.near.label }]} />}
    >
      <div ref={arena} style={{ position: 'relative', height: 190, borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--border)', overflow: 'hidden' }}>
        {!target && (
          <button type="button" className="btn primary" onClick={start} disabled={done} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', padding: '6px 12px', fontSize: 12 }}>
            {done ? 'Round done' : `Start ${times[round].length + 1}/${TRIALS}`}
          </button>
        )}
        {target && (
          <button
            type="button"
            aria-label="Target"
            onClick={hit}
            style={{ position: 'absolute', left: target.x, top: target.y, width: ROUNDS[round].size, height: ROUNDS[round].size, borderRadius: '50%', background: 'var(--accent)', border: 0, cursor: 'pointer', padding: 0 }}
          />
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 12, alignItems: 'center', marginTop: 12, fontSize: 13 }}>
        {(['far', 'near'] as Round[]).map((r) => (
          <div key={r} className="mono" style={{ fontSize: 11.5, color: 'var(--muted)' }}>
            {ROUNDS[r].label}: <span style={{ color: 'var(--ink)' }}>{avg(r) === null ? '—' : `${avg(r)} ms`}</span>
            <span> ({times[r].length}/{TRIALS})</span>
          </div>
        ))}
        <button type="button" className="btn" onClick={reset} style={{ padding: '4px 10px', fontSize: 11 }}>Reset</button>
      </div>
      <p aria-live="polite" style={{ margin: '10px 0 0', fontSize: 13, color: 'var(--ink-dim)', minHeight: 20 }}>
        {a !== null && b !== null && times.far.length >= TRIALS && times.near.length >= TRIALS
          ? `Small, far targets took ${Math.round((a / b) * 10) / 10}× as long. That gap is why hit areas and placement matter more than how clean an icon looks.`
          : ''}
      </p>
    </DemoFrame>
  );
}
