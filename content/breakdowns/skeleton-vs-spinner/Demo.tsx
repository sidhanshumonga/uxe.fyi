'use client';

import React, { useState, useEffect } from 'react';
import { DemoFrame, Segmented } from '@/components/demo-kit';

// ── Demo: Skeleton loader ──────────────────────────────────────────────────
const SkeletonDemo = () => {
  const [mode, setMode] = useState('skeleton');
  const [loading, setLoading] = useState(true);

  const reset = () => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 1400);
    return t;
  };

  useEffect(() => {
    reset();
    const interval = setInterval(reset, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <DemoFrame
      title="Skeleton vs spinner"
      tag="time"
      tags={['perceived performance', 'attention']}
      desc="A spinner says ‘something is happening, please wait.’ A skeleton says ‘this is the shape of what you’re about to see.’ One demands attention; the other prepares you."
      controls={
        <Segmented
          value={mode}
          onChange={setMode}
          options={[
            { id: 'spinner', label: 'Spinner' },
            { id: 'skeleton', label: 'Skeleton' },
          ]}
        />
      }
    >
      <div style={{ minHeight: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {loading && mode === 'spinner' && (
          <div style={{ display: 'grid', placeItems: 'center', height: 120 }}>
            <div
              style={{
                width: 22,
                height: 22,
                border: '2px solid var(--surface-2)',
                borderTopColor: 'var(--accent)',
                borderRadius: '50%',
                animation: 'spin 0.7s linear infinite',
              }}
            />
          </div>
        )}
        {loading && mode === 'skeleton' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: 'var(--surface-2)',
                    animation: 'shimmer 1.4s ease-in-out infinite',
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div
                    style={{
                      height: 8,
                      width: `${68 - i * 10}%`,
                      borderRadius: 4,
                      background: 'var(--surface-2)',
                      animation: 'shimmer 1.4s ease-in-out infinite',
                      animationDelay: `${i * 0.1 + 0.05}s`,
                    }}
                  />
                  <div
                    style={{
                      height: 7,
                      width: `${44 - i * 8}%`,
                      borderRadius: 4,
                      background: 'var(--surface-2)',
                      animation: 'shimmer 1.4s ease-in-out infinite',
                      animationDelay: `${i * 0.1 + 0.1}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, animation: 'fadeIn 200ms ease-out both' }}>
            {[
              { t: 'Maya Chen', s: 'How to think about interaction debt' },
              { t: 'Lin Park', s: 'The grammar of motion in interfaces' },
              { t: 'A. Foster', s: 'Why my undo button changed everything' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: ['#C2F542', '#6DE1FF', '#FFB46D'][i],
                    color: '#0B0B0A',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 600,
                    fontSize: 13,
                  }}
                >
                  {r.t[0]}
                </div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>{r.s}</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>
                    {r.t}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DemoFrame>
  );
};

export default SkeletonDemo;
