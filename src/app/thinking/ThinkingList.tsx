'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import type { WishlistEssay } from '@/data/essays';

export interface PublishedRow {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  by: string;
  readingMinutes: number;
  draft: boolean;
}

const pad = (n: number) => String(n).padStart(2, '0');

const TAGS = ['all', 'attention', 'time', 'trust', 'craft', 'motion'] as const;
type Tag = (typeof TAGS)[number];

export function ThinkingList({ published, wishlist }: { published: PublishedRow[]; wishlist: WishlistEssay[] }) {
  const [filter, setFilter] = useState<Tag>('all');
  // Only offer tags that something is actually filed under.
  const used = new Set<string>([...published.flatMap((p) => p.tags), ...wishlist.map((w) => w.kicker)]);
  const tags = TAGS.filter((t) => t === 'all' || used.has(t));

  const pub = filter === 'all' ? published : published.filter((p) => p.tags.includes(filter));
  const wish = filter === 'all' ? wishlist : wishlist.filter((w) => w.kicker === filter);

  return (
    <>
      <div style={{ display: 'flex', gap: 6, marginBottom: 36, flexWrap: 'wrap' }}>
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={filter === t}
            onClick={() => setFilter(t)}
            style={{
              padding: '6px 12px',
              background: filter === t ? 'var(--surface-2)' : 'transparent',
              color: filter === t ? 'var(--ink)' : 'var(--ink-dim)',
              border: '1px solid var(--border)',
              borderRadius: 999,
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              transition: 'background 120ms, color 120ms',
            }}
          >
            {t === 'all' ? 'all' : '#' + t}
          </button>
        ))}
      </div>

      {/* One list, as in the design: written essays (solid rows) first, then
          wishlist ideas (dashed rows). Numbering continues across both. */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        {pub.map((e) => (
          <Link key={e.slug} href={`/thinking/${e.slug}`} className="row-essay essay-published" style={{ borderBottom: '1px solid var(--border)' }}>
            <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{pad(published.indexOf(e) + 1)}</span>
            <span className="mono" style={{ fontSize: '10.5px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{e.tags[0]}</span>
            <span className="display" style={{ fontSize: 'clamp(20px, 2.4vw, 28px)', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink)' }}>{e.title}</span>
            <span style={{ fontSize: 13.5, color: 'var(--ink-dim)', lineHeight: 1.5 }}>{e.description}</span>
            {e.draft ? <span className="draft-pill">in review</span> : <span className="pub-meta">{e.readingMinutes} min · {e.by}</span>}
            <Icon name="arrow" size={14} />
          </Link>
        ))}
        {wish.map((e) => (
          <a
            key={e.num}
            href={e.issue ? `https://github.com/sidhanshumonga/uxe.fyi/issues/${e.issue}` : 'https://github.com/sidhanshumonga/uxe.fyi/issues/new?template=3-claim-a-piece.yml'}
            target="_blank"
            rel="noopener noreferrer"
            className="row-essay essay-draft"
            style={{ borderBottom: '1px dashed var(--border)' }}
          >
            <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>{pad(published.length + wishlist.indexOf(e) + 1)}</span>
            <span className="mono" style={{ fontSize: '10.5px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{e.kicker}</span>
            <span className="display" style={{ fontSize: 'clamp(20px, 2.4vw, 28px)', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink-dim)' }}>{e.t}</span>
            <span style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.5 }}>{e.d}</span>
            <span className="draft-pill">drafting</span>
            <Icon name="github" size={14} />
          </a>
        ))}
      </div>

      {pub.length === 0 && wish.length === 0 && (
        <p className="dim" style={{ fontSize: 15 }}>Nothing filed under #{filter} yet.</p>
      )}
    </>
  );
}
