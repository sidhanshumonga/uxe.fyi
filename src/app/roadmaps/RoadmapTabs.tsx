'use client';

import { useState } from 'react';
import type React from 'react';
import Link from 'next/link';
import { Icon, type IconName } from '@/components/Icon';
import { authorName } from '@/data/authors';
import { REPO_URL } from '@/lib/site';

export interface RoadmapTab {
  slug: string;
  from: string;
  icon: IconName;
  months: string;
  /** status: published — solid cards, "final" pill, author credit. */
  final: boolean;
  authors: string[];
  issue?: number;
  phases: { title: string; weeks: string; items: string[] }[];
}

const names = (handles: string[]) =>
  handles.map(authorName).reduce((s, n, i, all) => (i === 0 ? n : s + (i === all.length - 1 ? ' and ' : ', ') + n), '');

// Tabs + phase cards — layout from context/pages.jsx (RoadmapsPage).
export function RoadmapTabs({ roadmaps }: { roadmaps: RoadmapTab[] }) {
  const [active, setActive] = useState(0);
  const r = roadmaps[active];
  if (!r) return null;

  return (
    <>
      <div style={{ display: 'flex', gap: 8, marginBottom: 36, flexWrap: 'wrap' }}>
        {roadmaps.map((rm, i) => (
          <button
            key={rm.slug}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            style={{
              padding: '12px 18px',
              background: active === i ? 'var(--accent)' : 'var(--surface)',
              color: active === i ? 'var(--accent-ink)' : 'var(--ink)',
              border: '1px solid ' + (active === i ? 'var(--accent)' : 'var(--border)'),
              borderRadius: 9,
              fontSize: 14,
              fontWeight: 500,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              cursor: 'pointer',
              transition: 'background 120ms, border-color 120ms, color 120ms',
            }}
          >
            <Icon name={rm.icon} size={14} />
            {rm.from} → UXE
            <span className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.7 }}>
              {rm.final ? 'final' : 'draft'}
            </span>
          </button>
        ))}
      </div>

      <div className="grid-roadmap" style={{ '--phases': r.phases.length } as React.CSSProperties}>
        {r.phases.map((p, i) => (
          <div
            key={i}
            className={r.final ? 'card' : 'draft-card'}
            style={{ padding: 22, gap: 14, position: 'relative', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="mono" style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Phase {i + 1}
              </span>
              {r.final ? <span className="pub-pill">final</span> : <span className="draft-pill">draft</span>}
            </div>
            <div
              className="display"
              style={{ fontSize: 19, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.2, color: r.final ? 'var(--ink)' : 'var(--ink-dim)' }}
            >
              {p.title}
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {p.items.map((it, j) => (
                <li key={j} style={{ fontSize: 13, color: r.final ? 'var(--ink-dim)' : 'var(--muted)', lineHeight: 1.5, display: 'flex', gap: 8 }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0 }}>—</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
            <div className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 'auto' }}>
              {p.weeks}
            </div>
          </div>
        ))}
      </div>

      <div className="mono" style={{ fontSize: 12, color: 'var(--muted)', marginTop: 18, textAlign: 'center' }}>
        Estimated time: <span style={{ color: 'var(--ink)' }}>{r.months}</span>
        {r.final && <> · written by <span style={{ color: 'var(--ink)' }}>{names(r.authors)}</span></>}
        {' '}· roadmaps are guides, not contracts — adjust to your life
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
        {r.final ? (
          <Link href={`/roadmaps/${r.slug}`} className="btn primary">
            Open the full roadmap <Icon name="arrow" size={13} />
          </Link>
        ) : (
          r.issue && (
            <a href={`${REPO_URL}/issues/${r.issue}`} className="btn" target="_blank" rel="noopener noreferrer">
              <Icon name="github" size={13} /> Walked this path? Help write it
            </a>
          )
        )}
      </div>
    </>
  );
}
