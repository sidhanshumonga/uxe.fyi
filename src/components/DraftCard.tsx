'use client';

import React from 'react';
import { Icon } from './Icon';

interface DraftCardProps {
  title: string;
  kicker?: string;
  note?: string;
  label?: string;
}

export const DraftCard: React.FC<DraftCardProps> = ({
  title,
  kicker,
  note,
  label = 'Write this',
}) => {
  return (
    <a
      className="draft-card"
      href="https://github.com/sidhanshumonga/uxe.fyi/issues"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {kicker && (
          <span
            className="mono"
            style={{
              fontSize: '10.5px',
              color: 'var(--muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {kicker}
          </span>
        )}
        <span className="draft-pill">drafting</span>
      </div>
      <div style={{ fontSize: '17px', fontWeight: 500, color: 'var(--ink-dim)', lineHeight: 1.2 }}>
        {title}
      </div>
      {note && (
        <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>
          {note}
        </div>
      )}
      <div className="write-cta">
        <Icon name="github" size={11} />
        {label} →
      </div>
    </a>
  );
};
