'use client';

import React, { useState, useEffect } from 'react';
import { DemoFrame, Segmented } from '@/components/demo-kit';

// ── Demo: Easing curve ────────────────────────────────────────────────────
const CURVES: Record<string, string> = {
  linear: 'linear',
  'ease-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  snap: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
};

const EasingDemo = () => {
  const [curve, setCurve] = useState('snap');
  const [pos, setPos] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPos((p) => (p + 1) % 2), 1300);
    return () => clearInterval(t);
  }, []);

  return (
    <DemoFrame
      title="Easing curves"
      tag="motion"
      tags={['choreography', 'feel']}
      desc="An ease-out moves like a car braking — it settles. A spring feels alive. Linear feels mechanical. Choosing the right curve is choosing how the interface 'breathes'."
      controls={
        <Segmented
          value={curve}
          onChange={setCurve}
          options={Object.keys(CURVES).map((k) => ({ id: k, label: k }))}
        />
      }
    >
      <div
        style={{
          position: 'relative',
          height: 60,
          background: 'var(--bg-2)',
          borderRadius: 10,
          padding: 8,
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 8,
            background: 'var(--accent)',
            transition: `transform 850ms ${CURVES[curve]}`,
            transform: `translateX(${pos ? 'calc(100% + 8px)' : '0'})`,
            position: 'absolute',
            left: 8,
            top: 8,
            maxWidth: 'calc(100% - 60px)',
          }}
        />
        <div style={{ position: 'absolute', right: 12, bottom: 8 }} className="mono">
          <span style={{ fontSize: 10, color: 'var(--muted)' }}>{CURVES[curve]}</span>
        </div>
      </div>
    </DemoFrame>
  );
};

export default EasingDemo;
