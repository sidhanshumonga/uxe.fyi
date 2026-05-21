'use client';

import React from 'react';
import { Icon } from './Icon';

export interface AvatarData {
  i: string;
  c: string;
}

export const AVATARS: AvatarData[] = [
  { i: 'U', c: '#FF3D88' },
];

export const Avatar: React.FC<{ a: AvatarData; size?: number }> = ({ a, size = 36 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: a.c,
      color: '#0B0B0A',
      display: 'grid',
      placeItems: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: size * 0.42,
      fontWeight: 700,
      border: '2px solid var(--bg)',
      flexShrink: 0,
    }}
  >
    {a.i}
  </div>
);

export interface ActivityItem {
  who: string;
  verb: string;
  what: string;
  when: string;
  kind: 'merge' | 'rfc' | 'ship' | 'review' | 'essay';
}

export const ACTIVITY: ActivityItem[] = [
  { who: 'uxe.fyi', verb: 'initialized', what: 'the repository', when: 'just now', kind: 'merge' },
  { who: 'uxe.fyi', verb: 'shipped', what: 'six live interaction breakdowns', when: 'today', kind: 'ship' },
  { who: 'uxe.fyi', verb: 'opened', what: 'discussion: what should uxe.fyi cover first?', when: 'today', kind: 'rfc' },
];

export const verbColor: Record<ActivityItem['kind'], string> = {
  merge: 'var(--accent)',
  rfc: '#6DE1FF',
  ship: '#FFB46D',
  review: '#C77DFF',
  essay: '#9EE493',
};

interface ActivityFeedProps {
  items?: ActivityItem[];
  showHeader?: boolean;
  limit?: number;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  items = ACTIVITY,
  showHeader = true,
  limit,
}) => {
  const list = typeof limit === 'number' ? items.slice(0, limit) : items;

  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: 14,
        background: 'var(--surface)',
        overflow: 'hidden',
      }}
    >
      {showHeader && (
        <div
          style={{
            padding: '16px 22px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            className="mono"
            style={{
              fontSize: 11,
              color: 'var(--muted)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Activity
          </div>
          <span className="pill">
            <span className="dot"></span>live
          </span>
        </div>
      )}
      <div>
        {list.map((a, i) => {
          const av = AVATARS[i % AVATARS.length];
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 22px',
                borderTop: i ? '1px solid var(--border)' : 0,
                flexWrap: 'wrap',
              }}
            >
              <Avatar a={av} size={26} />
              <div style={{ flex: 1, minWidth: 160 }}>
                <div style={{ fontSize: 13, lineHeight: 1.4 }}>
                  <span className="mono" style={{ color: 'var(--ink)', fontSize: 12 }}>
                    {a.who}
                  </span>
                  <span style={{ color: 'var(--muted)' }}> {a.verb} </span>
                  <span style={{ color: verbColor[a.kind] }}>{a.what}</span>
                </div>
              </div>
              <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>
                {a.when}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
