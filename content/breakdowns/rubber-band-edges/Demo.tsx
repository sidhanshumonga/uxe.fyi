'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DemoFrame, Segmented } from '@/components/demo-kit';

// ── Demo: Rubber-band edges (context/breakdowns2.jsx) ───────────────────────
// Past the edge, movement meets resistance that grows with distance, then
// springs back on release. Keyboard: arrow keys nudge, with the same overshoot.

const KNOB = 44;
const PAD = 16;
const STEP = 32;
// Diminishing return: the further past the edge, the less it moves.
const band = (over: number, dim: number) => (1 - 1 / ((over * 0.55) / dim + 1)) * dim;

const RubberBandDemo = () => {
  const [mode, setMode] = useState('rubber');
  const [x, setX] = useState(0);
  const [drag, setDrag] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const start = useRef<{ px: number; x: number } | null>(null);
  const settle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [max, setMax] = useState(0); // furthest in-bounds position, from the track width

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setMax(el.clientWidth - KNOB - PAD);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      ro.disconnect();
      if (settle.current) clearTimeout(settle.current);
    };
  }, []);

  const clampX = (v: number) => Math.max(0, Math.min(max, v));
  const resist = (raw: number) => {
    if (mode === 'hard') return clampX(raw);
    if (raw < 0) return -band(-raw, 120);
    if (raw > max) return max + band(raw - max, 120);
    return raw;
  };

  const down = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { px: e.clientX, x };
    setDrag(true);
  };
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!start.current) return;
    setX(resist(start.current.x + (e.clientX - start.current.px)));
  };
  const up = () => {
    if (!start.current) return;
    start.current = null;
    setDrag(false);
    setX(clampX);
  };
  const key = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const delta = e.key === 'ArrowRight' ? STEP : -STEP;
    // Nudge from the in-bounds position, so held keys don't stack overshoot.
    setX((v) => resist(clampX(v) + delta));
    if (settle.current) clearTimeout(settle.current);
    settle.current = setTimeout(() => setX(clampX), 160);
  };

  return (
    <DemoFrame
      title="Rubber-band edges"
      tag="motion"
      tags={['physics', 'drag']}
      desc="A hard stop at the edge feels like hitting a wall. Resistance that grows with distance, then a spring back, tells you where the end is without breaking direct manipulation."
      controls={
        <Segmented
          value={mode}
          onChange={setMode}
          options={[
            { id: 'hard', label: 'Hard stop' },
            { id: 'rubber', label: 'Rubber band' },
          ]}
        />
      }
    >
      <div style={{ minHeight: 150, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
        <div ref={track} style={{ position: 'relative', height: 60, background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 10 }}>
          <div
            role="slider"
            tabIndex={0}
            aria-label="Draggable block"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round((clampX(x) / (max || 1)) * 100)}
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={up}
            onKeyDown={key}
            style={{
              position: 'absolute', left: 8, top: 7, width: KNOB, height: KNOB, borderRadius: 8,
              background: 'var(--accent)', cursor: drag ? 'grabbing' : 'grab', touchAction: 'none',
              transform: `translateX(${x}px)`,
              transition: drag ? 'none' : 'transform 420ms cubic-bezier(0.34,1.56,0.64,1)',
            }}
          ></div>
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center' }}>drag the block past either edge</div>
      </div>
      <style>{'@media (prefers-reduced-motion: reduce){[aria-label="Draggable block"]{transition:none!important}}'}</style>
    </DemoFrame>
  );
};

export default RubberBandDemo;
