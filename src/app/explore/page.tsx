import React from 'react';
import type { Metadata } from 'next';
import { sectionMetadata } from '@/lib/sections';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = sectionMetadata('explore');

// Each definition paraphrases a public source from the team itself, linked on
// the card. Add one only with a source that says it (job postings expire, so
// prefer blog posts, docs and talks).
const DEFINITIONS = [
  {
    co: 'Vercel',
    def: 'Design engineers blend aesthetic sensibility with technical skill, and work alongside designers from the start instead of waiting for a handoff.',
    src: { label: 'Vercel blog, 2024', href: 'https://vercel.com/blog/design-engineering-at-vercel' },
  },
  {
    co: 'Google',
    def: 'UX engineers are creative all-rounders who bridge engineering and design, across every stage of a project from intent to implementation.',
    src: { label: 'Google Design', href: 'https://design.google/library/why-google-needs-ux-engineers' },
  },
  {
    co: 'GOV.UK',
    def: 'Its frontend developers bridge technology and design, a cross between an interaction designer and a software developer, and champion accessibility in the team.',
    src: { label: 'GDS technology blog, 2020', href: 'https://technology.blog.gov.uk/2020/07/24/why-you-should-hire-a-frontend-developer/' },
  },
  {
    co: 'Clearleft',
    def: 'A design engineer translates between visual design, systems thinking and engineering, and is there to help both the designer and the engineer.',
    src: { label: 'Clearleft Podcast', href: 'https://podcast.clearleft.com/season03/episode02/' },
  },
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
          <div className="eyebrow" style={{ marginBottom: 18 }}>How teams define it</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 14, maxWidth: 1000 }}>
            {DEFINITIONS.map((d, i) => (
              <div key={i} className="card hov" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="display" style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 10 }}>{d.co}</div>
                <div style={{ fontSize: 14.5, color: 'var(--ink-dim)', lineHeight: 1.55, marginBottom: 14 }}>{d.def}</div>
                <a
                  className="mono"
                  href={d.src.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: 'auto', fontSize: 11.5, color: 'var(--muted)' }}
                >
                  {d.src.label} ↗
                </a>
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
