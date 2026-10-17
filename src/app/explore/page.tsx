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
    co: 'Adobe',
    def: 'Design engineers work where design and engineering overlap: prototyping to test design assumptions, building design systems and infrastructure, and sweating the details of craft.',
    src: { label: 'Adobe Design, 2024', href: 'https://adobe.design/ideas/should-you-pursue-a-career-in-design-engineering' },
  },
  {
    co: 'Atlassian',
    def: 'Design technologists sit between design and engineering, thinking like a designer but coding like an engineer, and build real prototypes teams can try before committing.',
    src: { label: 'Atlassian blog, 2026', href: 'https://www.atlassian.com/blog/how-we-build/design-technologists-the-role-that-turns-creativity-into-code' },
  },
  {
    co: 'Slack',
    def: 'Dedicated design engineering roles focus on prototyping new ideas, building tools and advising feature teams, grown from bringing front-end engineers into design.',
    src: { label: 'Slack Design', href: 'https://slack.design/articles/prototyping-the-path-to-design-engineering/' },
  },
  {
    co: 'GitHub',
    def: 'A Design Engineering team, with Design Infrastructure, builds and maintains Primer: the design system, its components, Octicons and the front-end tooling behind them.',
    src: { label: 'Primer docs', href: 'https://primer.style/about/' },
  },
  {
    co: 'Salesforce',
    def: 'UX Engineering bridges the gap between design and development, giving designers engineering support through living design systems and prototypes in code.',
    src: { label: 'Salesforce UX, 2016', href: 'https://medium.com/salesforce-ux/interning-as-a-ux-engineer-290e9115a034' },
  },
  {
    co: 'Indeed',
    def: 'Design technologists are designers who see beauty in code and engineers who appreciate great UX, shipping early interactive prototypes and supporting the design system.',
    src: { label: 'Indeed Design, 2019', href: 'https://medium.com/indeed-design/what-is-a-design-technologist-6431531f0d48' },
  },
  {
    co: 'GOV.UK',
    def: 'Its frontend developers bridge technology and design, a cross between an interaction designer and a software developer, and champion accessibility in the team.',
    src: { label: 'GDS technology blog, 2020', href: 'https://technology.blog.gov.uk/2020/07/24/why-you-should-hire-a-frontend-developer/' },
  },
  {
    co: '18F',
    def: 'Front-end designers design and implement the presentational layer and design systems in semantic HTML and CSS, separate from developers who architect the client-side code.',
    src: { label: '18F engineering guide', href: 'https://guides.18f.org/engineering/our-approach/frontend/' },
  },
  {
    co: 'Epsilon',
    def: 'UX engineers are software engineers who belong to the UX team rather than a product team, sitting with designers and bridging design and technology.',
    src: { label: 'Epsilon blog, 2019', href: 'https://www.epsilon.com/us/about-us/epic-blog/ux-engineering-at-epsilon' },
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
        lead="UX Engineering is one role with many shapes. Here's how a dozen teams define it in their own words, how it differs from adjacent roles, and what a real day looks like."
      />

      <section>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 18 }}>How teams define it</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 14 }}>
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
