import React from 'react';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'explore the discipline — uxe.fyi',
  description: 'What is UX Engineering? How companies define it, how it differs from frontend/design, and a day in the life of a UXE.',
};

const DEFINITIONS = [
  { co: 'Vercel', def: 'engineers who work at the intersection of design and frontend, focused on the craft of the interface itself.' },
  { co: 'Linear', def: 'engineers who build the product’s expressive layer — animation, interaction, polish.' },
  { co: 'Stripe', def: 'engineers embedded with design who specialize in implementation quality and interaction fidelity.' },
  { co: 'Google', def: 'a hybrid role split between design systems engineering and prototype engineering for experiences.' },
  { co: 'Figma',  def: 'design engineers who think in components and ship the system the rest of the product is built on.' },
];

const COMPARE = [
  { a: 'UX Engineer', b: 'Frontend Engineer', diff: 'A UXE optimizes for how it feels. A FE optimizes for how it scales. The overlap is huge; the orientation is different.' },
  { a: 'UX Engineer', b: 'Product Designer',  diff: 'Both think in interactions. The UXE ships them; the designer specifies them. The best UXEs do both.' },
  { a: 'UX Engineer', b: 'Creative Developer', diff: 'Creative developers build expressive, often one-off experiences. UXEs build systems that ship and stay.' },
  { a: 'UX Engineer', b: 'Product Engineer',  diff: 'A product engineer owns end-to-end. A UXE owns the surface — but with the same product ownership instinct.' },
];

const DAY = [
  { t: '09:30', e: 'Sync with design about the upcoming filter UI. Spot a focus-trap edge case in the prototype.' },
  { t: '10:15', e: 'Prototype 3 motion variants for the new menu in code. Send a Loom to the team.' },
  { t: '11:00', e: 'Pair with backend on the new endpoint. Push back on a payload shape that would force a loading state.' },
  { t: '13:00', e: 'Audit the design system’s button. File 4 RFCs about hover states and focus rings.' },
  { t: '15:00', e: 'Ship the empty state for the dashboard. Write a small post about what changed and why.' },
  { t: '16:30', e: 'Review a PR from a designer learning React. Leave 12 nice comments.' },
];

export default function ExplorePage() {
  return (
    <>
      <PageHeader
        eyebrow="Explore"
        title="What is"
        italic="UX Engineering, really?"
        lead="UX Engineering is one role with many shapes. Here's how different teams define it, how it differs from adjacent roles, and what a real day looks like."
      />

      <section>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 18 }}>How companies define it</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            {DEFINITIONS.map((d, i) => (
              <div key={i} className="card hov">
                <div className="display" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 10 }}>{d.co}</div>
                <div style={{ fontSize: 14.5, color: 'var(--ink-dim)', lineHeight: 1.55 }}>{d.def}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 18 }}>UXE vs adjacent roles</div>
          <div style={{ borderTop: '1px solid var(--border)' }}>
            {COMPARE.map((c, i) => (
              <div key={i} className="row-compare" style={{
                borderBottom: '1px solid var(--border)',
              }}>
                <div className="display" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em' }}>{c.a}</div>
                <div style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 14 }}>vs</div>
                <div className="display" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink-dim)' }}>{c.b}</div>
                <div style={{ fontSize: 14.5, color: 'var(--ink-dim)', lineHeight: 1.55 }}>{c.diff}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 18 }}>A day in the life</div>
          <div style={{
            border: '1px solid var(--border)',
            borderRadius: 14,
            background: 'var(--surface)',
            overflow: 'hidden',
          }}>
            {DAY.map((d, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '90px 1fr',
                gap: 18,
                padding: '18px 24px',
                borderTop: i ? '1px solid var(--border)' : 0,
              }}>
                <div className="mono" style={{ fontSize: 13, color: 'var(--accent)' }}>{d.t}</div>
                <div style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-dim)' }}>{d.e}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
