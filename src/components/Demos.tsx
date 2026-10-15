'use client';

import React, { useState, useEffect } from 'react';
import { Icon } from './Icon';

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

// ── Demo: Optimistic UI ────────────────────────────────────────────────────
export const OptimisticDemo = () => {
  const [mode, setMode] = useState('optimistic');
  const [liked, setLiked] = useState(false);
  const [pending, setPending] = useState(false);
  const [count, setCount] = useState(412);

  const onClick = () => {
    if (mode === 'optimistic') {
      setLiked((l) => !l);
      setCount((c) => (liked ? c - 1 : c + 1));
    } else {
      setPending(true);
      setTimeout(() => {
        setLiked((l) => !l);
        setCount((c) => (liked ? c - 1 : c + 1));
        setPending(false);
      }, 900);
    }
  };

  return (
    <DemoFrame
      title="Optimistic UI"
      tag="time"
      tags={['perceived performance', 'state']}
      desc="Apply the change instantly; reconcile with the server in the background. The user never waits for the network for actions that almost always succeed."
      controls={
        <Segmented
          value={mode}
          onChange={setMode}
          options={[
            { id: 'optimistic', label: 'Optimistic' },
            { id: 'pessimistic', label: 'Wait for server' },
          ]}
        />
      }
    >
      <button
        onClick={onClick}
        disabled={pending}
        style={{
          appearance: 'none',
          background: 'transparent',
          border: 0,
          padding: 0,
          color: 'inherit',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          cursor: 'pointer',
          opacity: pending ? 0.5 : 1,
          textAlign: 'left',
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            background: liked
              ? 'color-mix(in srgb, var(--accent) 22%, transparent)'
              : 'var(--surface-2)',
            border: `1px solid ${liked ? 'var(--accent)' : 'var(--border)'}`,
            display: 'grid',
            placeItems: 'center',
            transition: 'all 180ms cubic-bezier(0.2,0.7,0.2,1)',
            transform: liked ? 'scale(1.08)' : 'scale(1)',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={liked ? 'var(--accent)' : 'none'}
            stroke={liked ? 'var(--accent)' : 'var(--ink-dim)'}
            strokeWidth="1.8"
          >
            <path d="M12 21s-7-4.5-9-9c-1.5-3.5 1-7 5-7 2 0 4 2 4 2s2-2 4-2c4 0 6.5 3.5 5 7-2 4.5-9 9-9 9z" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500 }}>{liked ? 'Liked' : 'Like'}</div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>
            {count.toLocaleString()} {pending && '· saving…'}
          </div>
        </div>
      </button>
    </DemoFrame>
  );
};

// ── Demo: Skeleton loader ──────────────────────────────────────────────────
export const SkeletonDemo = () => {
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

export const SearchDemo = () => {
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

// ── Demo: Easing curve ────────────────────────────────────────────────────
const CURVES: Record<string, string> = {
  linear: 'linear',
  'ease-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  snap: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
};

export const EasingDemo = () => {
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

// ── Demo: Form choreography ───────────────────────────────────────────────
export const FormDemo = () => {
  const [v, setV] = useState('');
  const [touched, setTouched] = useState(false);
  const ok = v.includes('@') && v.includes('.') && v.length > 5;
  const showErr = touched && v && !ok;

  return (
    <DemoFrame
      title="Form choreography"
      tag="trust"
      tags={['feedback', 'a11y']}
      desc="Don't yell at the user the moment they start typing. Validate on blur, recover on input. Errors should arrive softly and leave the second they're resolved."
      controls={
        <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>
          {touched ? (ok ? '✓ valid · saved on blur' : v ? 'soft warning' : 'pristine') : 'untouched'}
        </div>
      }
    >
      <label style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>email</label>
      <div style={{ position: 'relative', marginTop: 6 }}>
        <input
          value={v}
          onChange={(e) => setV(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="you@example.com"
          style={{
            width: '100%',
            padding: '10px 36px 10px 12px',
            background: 'var(--bg-2)',
            border: `1px solid ${showErr ? 'var(--warn)' : ok && touched ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 9,
            color: 'var(--ink)',
            outline: 0,
            font: 'inherit',
            fontSize: 14,
            transition: 'border-color 200ms',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            color: showErr ? 'var(--warn)' : ok && touched ? 'var(--accent)' : 'transparent',
            transition: 'color 200ms',
          }}
        >
          {showErr ? <Icon name="close" size={14} /> : <Icon name="check" size={14} />}
        </div>
      </div>
      <div
        style={{
          height: showErr ? 22 : 0,
          overflow: 'hidden',
          transition: 'height 220ms',
          marginTop: showErr ? 6 : 0,
        }}
      >
        <div className="mono" style={{ fontSize: 11, color: 'var(--warn)' }}>
          that doesn't look like an email — try again
        </div>
      </div>
    </DemoFrame>
  );
};

// ── Demo: Empty state ─────────────────────────────────────────────────────
export const EmptyStateDemo = () => {
  const [variant, setVariant] = useState('helpful');

  return (
    <DemoFrame
      title="Empty states"
      tag="trust"
      tags={['onboarding', 'tone']}
      desc="Most products treat empty states like errors. The best ones treat them like opportunities — moments to teach, invite, or set tone before anything else exists."
      controls={
        <Segmented
          value={variant}
          onChange={setVariant}
          options={[
            { id: 'lazy', label: 'Lazy' },
            { id: 'helpful', label: 'Helpful' },
          ]}
        />
      }
    >
      <div
        style={{
          background: 'var(--bg-2)',
          borderRadius: 10,
          border: '1px solid var(--border)',
          padding: 20,
          minHeight: 130,
          display: 'grid',
          placeItems: 'center',
          textAlign: 'center',
        }}
      >
        {variant === 'lazy' ? (
          <div style={{ color: 'var(--muted)', fontSize: 13 }}>No items found.</div>
        ) : (
          <div>
            <div style={{ fontSize: 24, marginBottom: 6 }}>
              <span className="serif-italic" style={{ color: 'var(--accent)' }}>
                Nothing here yet.
              </span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-dim)', marginBottom: 10 }}>
              Your saved articles will appear here. Want to see how it works?
            </div>
            <button className="btn primary" style={{ padding: '7px 14px', fontSize: '12.5px' }}>
              Add a sample
              <Icon name="arrow" size={12} />
            </button>
          </div>
        )}
      </div>
    </DemoFrame>
  );
};
