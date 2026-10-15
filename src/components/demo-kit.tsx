'use client';

// Shared chrome for breakdown demos: the card frame and the segmented toggle.
// Each demo lives in content/breakdowns/<slug>/Demo.tsx and imports these.

import React from 'react';

// ── Segmented Control helper ────────────────────────────────────────────────
interface SegmentedOption {
  id: string;
  label: string;
}

interface SegmentedProps {
  value: string;
  onChange: (value: string) => void;
  options: SegmentedOption[];
}

export const Segmented: React.FC<SegmentedProps> = ({ value, onChange, options }) => (
  <div
    style={{
      display: 'inline-flex',
      padding: 2,
      background: 'var(--surface-2)',
      borderRadius: 7,
      border: '1px solid var(--border)',
    }}
  >
    {options.map((o) => (
      <button
        key={o.id}
        onClick={() => onChange(o.id)}
        style={{
          appearance: 'none',
          padding: '4px 9px',
          fontSize: 11,
          fontFamily: 'var(--font-mono)',
          borderRadius: 5,
          border: 0,
          background: value === o.id ? 'var(--ink)' : 'transparent',
          color: value === o.id ? 'var(--bg)' : 'var(--ink-dim)',
          cursor: 'pointer',
          transition: 'all 140ms',
        }}
      >
        {o.label}
      </button>
    ))}
  </div>
);

// ── DemoFrame helper ────────────────────────────────────────────────────────
interface DemoFrameProps {
  title: string;
  tag: string;
  tags?: string[];
  desc: string;
  controls?: React.ReactNode;
  children: React.ReactNode;
}

export const DemoFrame: React.FC<DemoFrameProps> = ({
  title,
  tag,
  tags = [],
  desc,
  controls,
  children,
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 14,
      overflow: 'hidden',
      transition: 'border-color 180ms',
    }}
  >
    <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
        <div>
          <div
            className="mono"
            style={{
              fontSize: '10.5px',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 6,
            }}
          >
            {tag}
          </div>
          <div className="display" style={{ fontSize: '22px', fontWeight: 500, letterSpacing: '-0.02em' }}>
            {title}
          </div>
        </div>
      </div>
      <div style={{ fontSize: '13.5px', color: 'var(--ink-dim)', lineHeight: 1.5 }}>{desc}</div>
    </div>
    <div style={{ padding: '20px', background: 'var(--bg)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {children}
    </div>
    <div
      style={{
        padding: '10px 16px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--bg-2)',
        gap: 12,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {tags.map((t) => (
          <span key={t} className="mono" style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: 0 }}>
            #{t}
          </span>
        ))}
      </div>
      {controls}
    </div>
  </div>
);
