'use client';

import React, { useState } from 'react';
import { DemoFrame } from '@/components/demo-kit';

// Practice: measure color contrast with the WCAG 2 formula.
// https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio

const hexToRgb = (hex: string) => {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const luminance = (hex: string) => {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const contrastRatio = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const PRESETS = [
  { label: 'Body text on dark', fg: '#EDEAE2', bg: '#0B0B0A' },
  { label: 'Muted label on dark', fg: '#807D74', bg: '#0B0B0A' },
  { label: 'Pink on dark', fg: '#FF3D88', bg: '#0B0B0A' },
  { label: 'Light grey on white', fg: '#AAAAAA', bg: '#FFFFFF' },
];

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

function Badge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={ok ? 'pub-pill' : 'draft-pill'} style={ok ? undefined : { color: 'var(--warn)' }}>
      {ok ? '✓' : '✕'} {label}
    </span>
  );
}

export default function ContrastPractice() {
  const [fg, setFg] = useState('#807D74');
  const [bg, setBg] = useState('#0B0B0A');
  const valid = HEX.test(fg) && HEX.test(bg);
  const ratio = valid ? contrastRatio(fg, bg) : 0;

  const field = (label: string, value: string, set: (v: string) => void) => (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }} className="mono">
      <input type="color" value={HEX.test(value) && value.length === 7 ? value : '#000000'} onChange={(e) => set(e.target.value.toUpperCase())} aria-label={`${label} color picker`} style={{ width: 28, height: 28, padding: 0, border: '1px solid var(--border)', borderRadius: 6, background: 'none' }} />
      <span style={{ color: 'var(--muted)', width: 70 }}>{label}</span>
      <input value={value} onChange={(e) => set(e.target.value.trim())} aria-label={`${label} hex`} spellCheck={false} style={{ width: 86, padding: '5px 8px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-2)', color: 'var(--ink)', font: 'inherit' }} />
    </label>
  );

  return (
    <DemoFrame
      title="Check a contrast ratio"
      tag="practice"
      tags={['wcag', 'color']}
      desc="Pick a text and background color, or try a preset. Body text needs 4.5:1; large text (24px, or 19px bold) needs 3:1."
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        {PRESETS.map((p) => (
          <button key={p.label} type="button" className="btn" style={{ padding: '4px 10px', fontSize: 11 }} onClick={() => { setFg(p.fg); setBg(p.bg); }}>
            {p.label}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {field('Text', fg, setFg)}
          {field('Background', bg, setBg)}
        </div>
        <div style={{ flex: '1 1 200px', padding: '14px 16px', borderRadius: 10, border: '1px solid var(--border)', background: valid ? bg : 'transparent', color: valid ? fg : 'inherit' }}>
          <div style={{ fontSize: 15 }}>The quick brown fox jumps over the lazy dog.</div>
          <div style={{ fontSize: 24, fontWeight: 600, marginTop: 4 }}>Large text</div>
        </div>
      </div>
      <div aria-live="polite" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginTop: 14 }}>
        <span className="display" style={{ fontSize: 26, fontWeight: 500, marginRight: 6 }}>{valid ? `${ratio.toFixed(2)}:1` : 'Enter #RRGGBB'}</span>
        {valid && (
          <>
            <Badge ok={ratio >= 4.5} label="AA body" />
            <Badge ok={ratio >= 3} label="AA large" />
            <Badge ok={ratio >= 7} label="AAA body" />
          </>
        )}
      </div>
    </DemoFrame>
  );
}
