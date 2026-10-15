'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Icon, IconName } from '@/components/Icon';
import { BREAKDOWN_DEMOS } from '@/generated/breakdown-demos';
import { Avatar, AVATARS, ActivityFeed } from '@/components/CommunityComponents';

const HOME_BREAKDOWNS = ['optimistic-ui', 'skeleton-vs-spinner', 'fuzzy-search', 'easing-curves', 'form-choreography', 'empty-states'];

// ── Hero Section Word Swaps ────────────────────────────────────────────────
const HERO_FILLS = [
  { word: 'inevitable', tone: 'serif' },
  { word: 'effortless', tone: 'serif' },
  { word: 'intuitive', tone: 'serif' },
  { word: 'human', tone: 'serif' },
  { word: 'trustworthy', tone: 'serif' },
];

function Hero() {
  const [fillIdx, setFillIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setFillIdx((i) => (i + 1) % HERO_FILLS.length);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ position: 'relative', paddingTop: 'clamp(60px, 9vw, 120px)', paddingBottom: 'clamp(40px, 6vw, 80px)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32, flexWrap: 'wrap' }}>
          <span className="mono dim" style={{ fontSize: 12, letterSpacing: 0 }}>
            an open notebook on the discipline of UX engineering
          </span>
        </div>

        <h1 className="display" style={{
          fontSize: 'clamp(44px, 8.2vw, 132px)',
          margin: 0,
          maxWidth: '14ch',
          position: 'relative',
        }}>
          We engineer the{' '}
          <span className="serif-italic" style={{
            color: 'var(--accent)',
            fontWeight: 400,
            fontStyle: 'italic',
            display: 'inline-block',
            position: 'relative',
          }}>
            feel
            <svg width="100%" height="14" viewBox="0 0 120 14" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, bottom: -6, width: '100%' }}>
              <path d="M2 10 C 30 2, 70 14, 118 6" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </span>
          {' '}of software so it feels{' '}
          <span style={{
            position: 'relative',
            display: 'inline-block',
            verticalAlign: 'bottom',
            minWidth: '7ch',
          }}>
            <span key={fillIdx}
              className="serif-italic fade-in"
              style={{
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'var(--ink)',
                whiteSpace: 'nowrap',
                background: 'color-mix(in srgb, var(--accent) 14%, transparent)',
                padding: '0 0.18em',
                borderRadius: 6,
              }}>
              {HERO_FILLS[fillIdx].word}.
            </span>
          </span>
        </h1>

        <div className="grid-hero">
          <div>
            <p style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.55, color: 'var(--ink-dim)', maxWidth: '54ch', margin: 0 }}>
              <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>uxe.fyi</strong> is an open-source home for <em className="serif-italic" style={{ fontStyle: 'italic' }}>UX Engineering</em> — the multidisciplinary craft that lives between engineering, design, and human behavior. A living handbook, a career bridge, a community of people who care how interfaces feel under the cursor.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 32, flexWrap: 'wrap' }}>
              <Link href="/explore" className="btn primary">
                Explore the discipline
                <span className="arr"><Icon name="arrow" size={14} /></span>
              </Link>
              <Link href="/roadmaps" className="btn">
                <Icon name="map" size={14} />
                See the roadmaps
              </Link>
              <Link href="/thinking" className="btn ghost">
                Read the handbook
                <Icon name="arrowUR" size={13} />
              </Link>
            </div>
          </div>

          <HeroSidePanel />
        </div>
      </div>
    </section>
  );
}

// ── Hero Side Panel (Animating Cursor Simulation) ─────────────────────────
interface TargetType {
  x: number;
  y: number;
  label: string;
  dur: number;
}

function HeroSidePanel() {
  const [cursor, setCursor] = useState({ x: 70, y: 60, label: '200ms · feels instant' });
  const [phase, setPhase] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets: TargetType[] = [
      { x: 70, y: 50, label: '200ms · feels instant', dur: 1600 },
      { x: 200, y: 130, label: 'enter & exit symmetry', dur: 1800 },
      { x: 95, y: 215, label: 'fitts: 44px hit target', dur: 1800 },
      { x: 260, y: 80, label: 'tabular nums · alignment', dur: 1700 },
    ];
    let i = 0;
    let tid: NodeJS.Timeout;

    const tick = () => {
      const t = targets[i % targets.length];
      setCursor({ x: t.x, y: t.y, label: t.label });
      setPhase(i % targets.length);
      i++;
      tid = setTimeout(tick, t.dur);
    };

    tick();
    return () => clearTimeout(tid);
  }, []);

  return (
    <div ref={wrapRef} style={{
      position: 'relative',
      borderRadius: 16,
      border: '1px solid var(--border)',
      background: 'linear-gradient(180deg, var(--surface-2), var(--surface))',
      padding: 20,
      height: 320,
      overflow: 'hidden',
    }}>
      <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
        what UXE looks at
      </div>

      {/* Fake UI */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Row 1: Search */}
        <div style={{
          background: 'var(--bg-2)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: 'var(--muted)',
          fontSize: 13,
        }}>
          <Icon name="search" size={14} />
          <span>Search 412 patterns…</span>
          <span style={{ marginLeft: 'auto' }} className="kbd">⌘K</span>
        </div>

        {/* Row 2: Timing List Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[
            { l: 'Skeleton loaders', t: '120 ms' },
            { l: 'Optimistic UI', t: '0 ms' },
            { l: 'Debounced search', t: '240 ms' },
          ].map((r, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 12px',
              border: '1px solid var(--border)',
              borderRadius: 9,
              background: 'var(--surface)',
              fontSize: 13,
            }}>
              <div style={{ width: 4, height: 4, borderRadius: 2, background: 'var(--accent)' }} />
              <span style={{ color: 'var(--ink)' }}>{r.l}</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 'auto' }}>{r.t}</span>
            </div>
          ))}
        </div>

        {/* Row 3: Buttons */}
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <div style={{
            padding: '8px 14px',
            background: 'var(--accent)',
            color: 'var(--accent-ink)',
            borderRadius: 8,
            fontSize: 12.5,
            fontWeight: 500,
          }}>Open pattern</div>
          <div style={{
            padding: '8px 12px',
            border: '1px solid var(--border)',
            borderRadius: 8,
            fontSize: 12.5,
            color: 'var(--ink-dim)',
          }}>↗ source</div>
        </div>
      </div>

      {/* Moving cursor */}
      <div style={{
        position: 'absolute',
        left: cursor.x,
        top: cursor.y,
        pointerEvents: 'none',
        transition: 'left 700ms cubic-bezier(0.2, 0.7, 0.2, 1), top 700ms cubic-bezier(0.2, 0.7, 0.2, 1)',
      }}>
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
          <path d="M2 1.5 L 16 11 L 9 12 L 13 19 L 10.5 20 L 6.5 13 L 2 16 Z"
                fill="var(--ink)" stroke="var(--bg)" strokeWidth="1" strokeLinejoin="round" />
        </svg>
        <div className="mono" style={{
          position: 'absolute',
          left: 22,
          top: 18,
          fontSize: 10.5,
          background: 'var(--accent)',
          color: 'var(--accent-ink)',
          padding: '3px 6px',
          borderRadius: 4,
          whiteSpace: 'nowrap',
          fontWeight: 600,
        }}>
          {cursor.label || '…'}
        </div>
      </div>

      <div className="mono" style={{
        position: 'absolute',
        bottom: 12,
        right: 14,
        fontSize: 10,
        color: 'var(--muted)',
        letterSpacing: '0.08em',
      }}>
        live demo · {String(phase).padStart(2, '0')}
      </div>
    </div>
  );
}

// ── Continuous Scrolling Marquee Ticker ────────────────────────────────────
function Ticker() {
  const items = [
    'invisible friction',
    'optimistic UI',
    'calm interfaces',
    'perceived performance',
    'interface trust',
    'fitts\u2019s law',
    'design systems',
    'motion choreography',
    'cognitive load',
    'emotional latency',
    'micro-copy',
    'a11y as experience',
    'state machines',
    'easing curves',
    'progressive disclosure',
  ];
  const list = [...items, ...items];
  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      padding: '14px 0',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      background: 'var(--bg-2)',
    }}>
      <div style={{
        display: 'inline-flex',
        gap: 36,
        animation: 'tick 48s linear infinite',
        whiteSpace: 'nowrap',
      }}>
        {list.map((t, i) => (
          <span key={i} className="mono" style={{ fontSize: 12, color: 'var(--ink-dim)', letterSpacing: 0 }}>
            <span style={{ color: 'var(--accent)', marginRight: 8 }}>×</span>{t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Interactive Role map coordinate deck ──────────────────────────────────
interface RoleType {
  id: string;
  name: string;
  pos: [number, number];
  color: string;
  desc: string;
  skills: string[];
}

const ROLES: RoleType[] = [
  { id: 'uxe', name: 'UX Engineer', pos: [50, 50], color: 'var(--accent)', desc: 'Engineers the experience. Builds production interfaces with the rigor of an engineer and the empathy of a designer.', skills: ['Frontend systems', 'Interaction design', 'Accessibility', 'Motion', 'Design systems', 'Product thinking'] },
  { id: 'fe',  name: 'Frontend Engineer', pos: [22, 22], color: '#6DE1FF', desc: 'Engineers the implementation. Builds the application layer with a focus on architecture, state, performance, and APIs.', skills: ['Frontend architecture', 'State', 'APIs', 'Build systems', 'Performance', 'Testing'] },
  { id: 'pd',  name: 'Product Designer', pos: [78, 22], color: '#FFB46D', desc: 'Designs the experience. Frames problems, explores solutions, and produces high-fidelity specs and prototypes.', skills: ['Research', 'IA', 'Visual design', 'Prototyping', 'Systems', 'Product strategy'] },
  { id: 'cd',  name: 'Creative Developer', pos: [22, 78], color: '#C77DFF', desc: 'Engineers expression. Works on bespoke web experiences where motion, materiality, and surprise are the product.', skills: ['WebGL', 'Canvas', 'GLSL', 'Motion', 'Generative', 'Sound'] },
  { id: 'pe',  name: 'Product Engineer', pos: [78, 78], color: '#FF7A59', desc: 'Engineers across the stack toward shipped product. End-to-end ownership, less specialized in the interface layer.', skills: ['Full-stack', 'Velocity', 'Product sense', 'Data', 'APIs', 'Infrastructure'] },
];

function RoleMap() {
  const [active, setActive] = useState('uxe');
  const role = ROLES.find((r) => r.id === active) || ROLES[0];

  return (
    <div className="grid-2-asym">
      <div style={{
        position: 'relative',
        aspectRatio: '1',
        maxWidth: 480,
        margin: '0 auto',
        width: '100%',
      }}>
        {/* Axes SVG */}
        <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <pattern id="g" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M0 10H10M10 0V10" stroke="var(--border)" strokeWidth="0.2" fill="none" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#g)" opacity="0.6" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="var(--border-strong)" strokeWidth="0.2" strokeDasharray="1 1" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="var(--border-strong)" strokeWidth="0.2" strokeDasharray="1 1" />
        </svg>

        {/* Axes Labels */}
        <div className="mono" style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>↑ Closer to design</div>
        <div className="mono" style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>↓ Closer to engineering</div>
        <div className="mono" style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'left top', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>← Implementation</div>
        <div className="mono" style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%) rotate(90deg)', transformOrigin: 'right top', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Product →</div>

        {/* Nodes */}
        {ROLES.map((r) => {
          const isActive = r.id === active;
          return (
            <button key={r.id}
              onMouseEnter={() => setActive(r.id)}
              onClick={() => setActive(r.id)}
              style={{
                position: 'absolute',
                left: `${r.pos[0]}%`, top: `${r.pos[1]}%`,
                transform: 'translate(-50%, -50%)',
                border: 0,
                background: 'transparent',
                padding: 0,
                cursor: 'pointer',
                zIndex: isActive ? 3 : 2,
              }}>
              <div style={{
                width: isActive ? 22 : 14,
                height: isActive ? 22 : 14,
                borderRadius: '50%',
                background: r.color,
                border: '2px solid var(--bg)',
                boxShadow: isActive ? `0 0 0 6px color-mix(in srgb, ${r.color} 22%, transparent)` : 'none',
                transition: 'all 220ms cubic-bezier(0.2,0.7,0.2,1)',
              }} />
              <div className="mono" style={{
                position: 'absolute',
                top: '120%',
                left: '50%',
                transform: 'translateX(-50%)',
                whiteSpace: 'nowrap',
                fontSize: 11,
                color: isActive ? 'var(--ink)' : 'var(--ink-dim)',
                fontWeight: isActive ? 600 : 500,
                marginTop: 4,
              }}>
                {r.name}
              </div>
            </button>
          );
        })}
      </div>

      <div>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Role: {role.name}</div>
        <p style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--ink)', margin: '0 0 20px', maxWidth: '38ch' }}>
          {role.desc}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {role.skills.map((s) => (
            <span key={s} style={{
              padding: '5px 10px',
              border: '1px solid var(--border)',
              borderRadius: 6,
              fontSize: 12,
              color: 'var(--ink-dim)',
              background: 'var(--surface)',
            }}>{s}</span>
          ))}
        </div>
        <div className="mono dim" style={{ fontSize: 11.5, marginTop: 18, letterSpacing: 0 }}>
          Hover other roles to compare →
        </div>
      </div>
    </div>
  );
}

// ── Careers Accordion Bridge Transitions ───────────────────────────────────
interface TransitionType {
  from: string;
  icon: IconName;
  steps: string[];
  time: string;
  note: string;
}

const TRANSITIONS: TransitionType[] = [
  { from: 'Software Engineer', icon: 'code', steps: ['Interaction design', 'Accessibility', 'Design systems', 'Visual literacy', 'User empathy'], time: '4–9 months', note: 'You already engineer. Now learn to design.' },
  { from: 'Product Designer',   icon: 'sparkle', steps: ['HTML / CSS depth', 'JavaScript & React', 'Component architecture', 'Performance', 'Engineering constraints'], time: '6–12 months', note: 'You already design. Now learn to ship.' },
  { from: 'QA / Test Engineer', icon: 'flask', steps: ['Frontend foundations', 'Interaction edges', 'A11y testing', 'UI state modeling', 'User empathy'], time: '6–12 months', note: 'You already see failure modes. Translate them.' },
  { from: 'Student / Graduate', icon: 'book', steps: ['HTML, CSS, JS', 'A design eye', 'One real project', 'A portfolio of details', 'Open-source contribution'], time: '9–18 months', note: 'No moat. Just taste and reps.' },
  { from: 'Product Manager',    icon: 'map', steps: ['Visual fluency', 'Frontend basics', 'Prototyping in code', 'Systems thinking', 'A specialty'], time: '12+ months', note: 'You already know users. Add craft.' },
];

function TransitionsSection() {
  const [open, setOpen] = useState(0);

  return (
    <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">02 — Career bridges</div>
            <h2>There is, <span className="serif-italic" style={{ color: 'var(--accent)' }}>finally,</span><br/>a clear path in.</h2>
          </div>
          <div className="lead">
            UX Engineering attracts people from very different starting points. Pick a path that already looks like you, and follow it without guessing.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', background: 'var(--bg)' }}>
          {TRANSITIONS.map((t, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ borderTop: i ? '1px solid var(--border)' : 0 }}>
                <button onClick={() => setOpen(isOpen ? -1 : i)}
                  className="row-transition"
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 0,
                    color: 'inherit',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: 'var(--surface-2)',
                    color: 'var(--accent)',
                    display: 'grid', placeItems: 'center',
                  }}>
                    <Icon name={t.icon} size={18} />
                  </div>
                  <div>
                    <div className="display" style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                      <span style={{ color: 'var(--ink-dim)' }}>{t.from}</span>
                      <span className="serif-italic" style={{ color: 'var(--accent)', margin: '0 14px' }}>→</span>
                      <span>UX Engineer</span>
                    </div>
                    <div className="mono" style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 4, letterSpacing: 0 }}>{t.note}</div>
                  </div>
                  <div className="mono" style={{ fontSize: 11.5, color: 'var(--ink-dim)' }}>{t.time}</div>
                  <div style={{ color: 'var(--ink-dim)', transition: 'transform 220ms', transform: isOpen ? 'rotate(180deg)' : 'none' }}>
                    <Icon name="chev" size={18} />
                  </div>
                </button>
                <div style={{
                  maxHeight: isOpen ? 240 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 380ms cubic-bezier(0.2,0.7,0.2,1)',
                }}>
                  <div className="row-transition-detail">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap', marginBottom: 16 }}>
                      {t.steps.map((s, j) => (
                        <React.Fragment key={j}>
                          <div style={{
                            padding: '7px 12px',
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: 8,
                            fontSize: 13,
                          }}>
                            <span className="mono" style={{ color: 'var(--accent)', fontSize: 11, marginRight: 8 }}>{String(j + 1).padStart(2, '0')}</span>
                            {s}
                          </div>
                          {j < t.steps.length - 1 && (
                            <div style={{ color: 'var(--muted-2)', padding: '0 8px' }}>→</div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    <Link href="/roadmaps" className="btn" style={{ padding: '8px 14px', fontSize: 13 }}>
                      Open full roadmap
                      <Icon name="arrow" size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── UXE Thinking Editorial rows ────────────────────────────────────────────
interface EssayType {
  num: string;
  title: string;
  kicker: string;
  desc: string;
  tag: string;
}

const THINKING: EssayType[] = [
  { num: '01', title: 'Invisible friction', kicker: 'why', desc: 'The cost of every extra click, every loading spinner, every form field that asks for something you already know.', tag: 'attention' },
  { num: '02', title: 'Calm interfaces', kicker: 'how', desc: 'Designing software that does not demand your attention — it earns it, briefly, and gives it back.', tag: 'attention' },
  { num: '03', title: 'Emotional latency', kicker: 'what', desc: 'Time is not measured in milliseconds. It is measured in feelings — and feelings have their own physics.', tag: 'time' },
  { num: '04', title: 'The trust contract', kicker: 'why', desc: 'Every interface makes promises. Every load, every error, every undo button is a promise being kept or broken.', tag: 'trust' },
  { num: '05', title: 'Optimism as a feature', kicker: 'how', desc: 'Showing the result before the server confirms it. A small lie in service of a much bigger truth.', tag: 'time' },
  { num: '06', title: 'Affordance is a verb', kicker: 'what', desc: 'A button is not affordance. Looking like something you can press at this moment — that is.', tag: 'craft' },
];

function ThinkingSection() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">03 — UXE Thinking</div>
            <h2>Less <span className="serif-italic">"how"</span>,<br/>more <span className="serif-italic" style={{ color: 'var(--accent)' }}>"why does this feel right?"</span></h2>
          </div>
          <div className="lead">
            The intellectual core of UX Engineering — short, opinionated essays on the ideas that shape how interfaces feel. Updated weekly.
          </div>
        </div>

        <div style={{ borderTop: '1px dashed var(--border)' }}>
          {THINKING.map((t, i) => (
            <Link key={i} href="/thinking"
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
              className="row-thinking"
              style={{
                borderBottom: '1px dashed var(--border)',
                transition: 'all 200ms',
                position: 'relative',
              }}>
              <span className="mono" style={{ fontSize: 12, color: 'var(--muted)', letterSpacing: 0 }}>{t.num}</span>
              <span className="mono" style={{ fontSize: 10.5, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.kicker}</span>
              <span className="display" style={{
                fontSize: 'clamp(22px, 2.8vw, 32px)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                color: hover === i ? 'var(--accent)' : 'var(--ink-dim)',
                transition: 'color 200ms',
              }}>{t.title}</span>
              <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5, maxWidth: '46ch' }}>{t.desc}</span>
              <span className="draft-pill">drafting</span>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: 28, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link href="/thinking" className="btn primary">
            <Icon name="github" size={13} />
            Claim an essay
          </Link>
          <Link href="/thinking" className="btn">
            See all sketches
            <Icon name="arrow" size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Interaction breakdowns grid ────────────────────────────────────────────
function BreakdownsSection() {
  return (
    <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">04 — Interaction breakdowns</div>
            <h2>Look closer.<br/><span className="serif-italic" style={{ color: 'var(--accent)' }}>Touch&nbsp;them.</span></h2>
          </div>
          <div className="lead">
            Real, working interactions — each isolated and annotated. Play with the controls. Read the why. Steal what you need for your own work.
          </div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 14,
        }}>
          {HOME_BREAKDOWNS.map((slug) => {
            const Demo = BREAKDOWN_DEMOS[slug];
            return Demo ? <Demo key={slug} /> : null;
          })}
        </div>
        <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
          <Link href="/breakdowns" className="btn">
            All breakdowns, and how they&rsquo;re built
            <Icon name="arrow" size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Built in public day-one community section ──────────────────────────────
function CommunitySection() {
  return (
    <section>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">05 — Built in public, day one</div>
            <h2>An open notebook<br/>waiting for <span className="serif-italic" style={{ color: 'var(--accent)' }}>its&nbsp;people.</span></h2>
          </div>
          <div className="lead">
            uxe.fyi is open-source and brand new. The structure is here — the handbook, the roadmaps, the breakdowns. Most of it is scaffolding, waiting for people who care about this stuff to fill it in.
          </div>
        </div>

        <div className="grid-2-min">
          {/* Left: stats + contributors */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="grid-stats-4" style={{
              border: '1px solid var(--border)',
              borderRadius: 14,
              padding: 28,
              background: 'var(--surface)',
            }}>
              {[
                { n: '1', l: 'contributor' },
                { n: '0', l: 'guides' },
                { n: '6', l: 'live breakdowns' },
                { n: '0', l: 'roadmaps' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="display" style={{ fontSize: 'clamp(34px, 4vw, 56px)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1 }}>
                    {s.n}
                  </div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6, letterSpacing: 0 }}>{s.l}</div>
                </div>
              ))}
            </div>

            <div style={{
              border: '1px solid var(--border)',
              borderRadius: 14,
              padding: 24,
              background: 'var(--surface)',
              flex: 1,
            }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>The crew, so far</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <Avatar a={AVATARS[0]} size={36} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>uxe.fyi</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>maintainer · just opened the repo</div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--ink-dim)', lineHeight: 1.55, margin: '0 0 16px', maxWidth: '40ch' }}>
                uxe.fyi just opened its doors. Be the second name on the contributor list.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href="https://github.com/sidhanshumonga/uxe.fyi" target="_blank" rel="noopener noreferrer" className="btn primary" style={{ padding: '9px 16px', fontSize: 13 }}>
                  <Icon name="github" size={13} />
                  Contribute on GitHub
                </a>
                <a href="https://github.com/sidhanshumonga/uxe.fyi/issues" target="_blank" rel="noopener noreferrer" className="btn" style={{ padding: '9px 16px', fontSize: 13 }}>
                  <Icon name="plus" size={13} />
                  Open an issue
                </a>
              </div>
            </div>
          </div>

          {/* Right: activity feed */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ActivityFeed limit={6} />
            <Link href="/community" style={{
              display: 'block', width: '100%',
              padding: '12px',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderTop: 0,
              borderRadius: '0 0 14px 14px',
              color: 'var(--ink-dim)',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              textAlign: 'center',
              cursor: 'pointer',
              marginTop: -1,
            }}>
              See all activity →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Main Page Component Assembly ───────────────────────────────────────────
export default function Home() {
  const coffeeUrl = "https://buymeacoffee.com/sidhanshu";

  return (
    <>
      <Hero />
      <Ticker />

      {/* What is UX Engineering coordinate map */}
      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">01 — What is UX Engineering?</div>
              <h2>One role,<br/><span className="serif-italic" style={{ color: 'var(--accent)' }}>many shapes.</span></h2>
            </div>
            <div className="lead">
              UX Engineering lives between engineering and design — but never in the same place twice. Hover any role to see how a UXE compares to the discipline next door.
            </div>
          </div>
          <RoleMap />
        </div>
      </section>

      <TransitionsSection />
      <ThinkingSection />
      <BreakdownsSection />
      <CommunitySection />

      {/* Closing manifesto */}
      <section>
        <div className="container">
          <div className="premise-card">
            <div className="eyebrow" style={{ marginBottom: 18 }}>The premise</div>
            <p className="display" style={{
              fontSize: 'clamp(28px, 4vw, 56px)',
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              margin: 0,
              maxWidth: '20ch',
            }}>
              <span className="serif-italic" style={{ color: 'var(--accent)' }}>Software is made of feelings.</span> The people who care about that — who measure interfaces in milliseconds and millimeters and small acts of trust — deserve a name, a discipline, a community. <span style={{ color: 'var(--ink-dim)' }}>This is for them.</span>
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 36, flexWrap: 'wrap' }}>
              <Link href="/explore" className="btn primary">
                Start exploring
                <span className="arr"><Icon name="arrow" size={14} /></span>
              </Link>
              <a className="btn" href={coffeeUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="heart" size={14} />
                Support uxe.fyi
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
