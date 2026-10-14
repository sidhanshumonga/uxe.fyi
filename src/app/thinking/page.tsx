'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { Icon } from '@/components/Icon';
import { ESSAYS } from '@/data/essays';

export default function ThinkingPage() {
  const [filter, setFilter] = useState<'all' | 'attention' | 'time' | 'trust' | 'craft'>('all');
  const tags: Array<'all' | 'attention' | 'time' | 'trust' | 'craft'> = ['all', 'attention', 'time', 'trust', 'craft'];

  const filtered = filter === 'all' 
    ? ESSAYS 
    : ESSAYS.filter((e) => e.kicker === filter);

  return (
    <>
      <PageHeader
        eyebrow="UXE Thinking"
        title="Short, opinionated"
        italic="essays — coming."
        lead="The intellectual core of uxe.fyi. Below are eight essays we want to write — concepts that shape how UX Engineers see their craft. None are finished yet. Help us pick what comes first."
      />

      <section style={{ paddingTop: 32, paddingBottom: 24 }}>
        <div className="container">
          <EmptyState
            eyebrow="0 essays published · 8 in the wishlist"
            title="The first essay"
            italic="hasn't been written."
            body="Every line below is a title with an idea behind it but no one to write it yet. Claim one in an issue, draft it in markdown, open a PR. We'll edit it with you."
            primary={{
              label: 'Claim an essay',
              icon: 'github',
              href: 'https://github.com/sidhanshumonga/uxe.fyi/issues',
            }}
            secondary={{
              label: 'Suggest a new one',
              icon: 'plus',
              href: 'https://github.com/sidhanshumonga/uxe.fyi/issues',
            }}
          />
        </div>
      </section>

      <section>
        <div className="container">
          {/* Tags Selector */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 36, flexWrap: 'wrap' }}>
            {tags.map((t) => (
              <button
                key={t}
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

          {/* Essay Row List */}
          <div style={{ borderTop: '1px solid var(--border)' }}>
            {filtered.map((e) => (
              <a
                key={e.num}
                href="https://github.com/sidhanshumonga/uxe.fyi/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="row-essay essay-draft"
                style={{
                  borderBottom: '1px dashed var(--border)',
                }}
              >
                <span className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>
                  {e.num}
                </span>
                <span
                  className="mono"
                  style={{
                    fontSize: '10.5px',
                    color: 'var(--accent)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  {e.kicker}
                </span>
                <span
                  className="display"
                  style={{
                    fontSize: 'clamp(20px, 2.4vw, 28px)',
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    color: 'var(--ink-dim)',
                  }}
                >
                  {e.t}
                </span>
                <span style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.5 }}>
                  {e.d}
                </span>
                <span className="draft-pill">drafting</span>
                <Icon name="github" size={14} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
