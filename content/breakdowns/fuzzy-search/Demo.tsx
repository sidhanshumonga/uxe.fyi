'use client';

import React, { useState } from 'react';
import { DemoFrame } from '@/components/demo-kit';
import { Icon } from '@/components/Icon';

// ── Demo: Fuzzy search ─────────────────────────────────────────────────────
const searchItems = [
  'Optimistic UI patterns',
  'Empty state principles',
  'Loading state taxonomy',
  'Error message anatomy',
  'Color contrast & a11y',
  'Motion easing curves',
  'Keyboard navigation',
  'Form field choreography',
  'Toast notifications',
  'Hover vs focus states',
  'Drag & drop physics',
  'Scroll-linked animations',
];

interface FuzzyResult {
  score: number;
  hits: number[];
}

const fuzzy = (needle: string, hay: string): FuzzyResult | null => {
  if (!needle) return { score: 1, hits: [] };
  const n = needle.toLowerCase();
  const h = hay.toLowerCase();
  let ni = 0;
  const hits: number[] = [];
  for (let i = 0; i < h.length; i++) {
    if (h[i] === n[ni]) {
      hits.push(i);
      ni++;
      if (ni === n.length) break;
    }
  }
  if (ni < n.length) return null;
  return { score: 1 - hits[hits.length - 1] / h.length, hits };
};

const SearchDemo = () => {
  const [q, setQ] = useState('');
  
  const results = q
    ? searchItems
        .map((item) => ({ s: item, r: fuzzy(q, item) }))
        .filter((x): x is { s: string; r: FuzzyResult } => x.r !== null)
        .sort((a, b) => b.r.score - a.r.score)
        .slice(0, 5)
    : searchItems.slice(0, 5).map((item) => ({ s: item, r: null as FuzzyResult | null }));

  return (
    <DemoFrame
      title="Fuzzy search"
      tag="craft"
      tags={['typing', 'matching']}
      desc="Match what the user means, not what they typed. Forgiving search reduces friction and reveals the depth of your content without forcing perfect spelling."
      controls={
        <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>
          try: <span style={{ color: 'var(--accent)' }}>"otmsc"</span> or <span style={{ color: 'var(--accent)' }}>"empty"</span>
        </div>
      }
    >
      <div
        style={{
          background: 'var(--bg-2)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '9px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 10,
        }}
      >
        <Icon name="search" size={14} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try misspelling something…"
          style={{
            flex: 1,
            background: 'transparent',
            border: 0,
            outline: 0,
            color: 'var(--ink)',
            font: 'inherit',
            fontSize: 13,
          }}
        />
        {q && (
          <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>
            {results.length} hit{results.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: '140px' }}>
        {results.map((r, i) => (
          <div
            key={i}
            style={{
              padding: '7px 10px',
              borderRadius: 6,
              fontSize: 13,
              background: i === 0 && q ? 'var(--surface-2)' : 'transparent',
            }}
          >
            {r.r && q ? (
              r.s.split('').map((char, j) => (
                <span
                  key={j}
                  style={{
                    color: r.r!.hits.includes(j) ? 'var(--accent)' : 'var(--ink-dim)',
                    fontWeight: r.r!.hits.includes(j) ? 600 : 400,
                  }}
                >
                  {char}
                </span>
              ))
            ) : (
              <span style={{ color: 'var(--ink-dim)' }}>{r.s}</span>
            )}
          </div>
        ))}
        {q && results.length === 0 && (
          <div style={{ padding: '12px 10px', fontSize: 13, color: 'var(--muted)' }}>
            No matches. (A good empty state would suggest something here.)
          </div>
        )}
      </div>
    </DemoFrame>
  );
};

export default SearchDemo;
