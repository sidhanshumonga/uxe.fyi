'use client';

import React, { useEffect, useState } from 'react';

export interface AvatarData {
  i: string;
  c: string;
  url?: string;
}

export const Avatar: React.FC<{ a: AvatarData; size?: number }> = ({ a, size = 36 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: a.url ? 'transparent' : a.c,
      color: '#0B0B0A',
      display: 'grid',
      placeItems: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: size * 0.42,
      fontWeight: 700,
      border: '2px solid var(--bg)',
      flexShrink: 0,
      overflow: 'hidden',
    }}
  >
    {a.url ? (
      <img src={a.url} alt={a.i} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    ) : (
      a.i
    )}
  </div>
);

export interface ActivityItem {
  who: string;
  verb: string;
  what: string;
  /** ISO timestamp; shown as relative time ("3h ago") in the browser. */
  date: string;
  /** Link to the commit / PR on GitHub. */
  href?: string;
  kind: 'merge' | 'rfc' | 'ship' | 'review' | 'essay';
  avatarUrl?: string;
}

const SHORT_DATE = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

export function relative(iso: string, now: number) {
  const sec = Math.floor((now - Date.parse(iso)) / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const days = Math.floor(hr / 24);
  if (sec < 60) return 'just now';
  if (min < 60) return `${min}m ago`;
  if (hr < 24) return `${hr}h ago`;
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  return SHORT_DATE.format(new Date(iso));
}

/** Relative time, computed after mount so server and client HTML agree. */
function When({ iso }: { iso: string }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(t);
  }, []);
  return <time dateTime={iso}>{now === null ? SHORT_DATE.format(new Date(iso)) : relative(iso, now)}</time>;
}

export const verbColor: Record<ActivityItem['kind'], string> = {
  merge: 'var(--accent)',
  rfc: '#6DE1FF',
  ship: '#FFB46D',
  review: '#C77DFF',
  essay: '#9EE493',
};

interface ActivityFeedProps {
  items: ActivityItem[];
  showHeader?: boolean;
  limit?: number;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  items,
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
        {list.length === 0 && (
          <div style={{ padding: '18px 22px', fontSize: 13, color: 'var(--muted)' }}>
            Couldn&rsquo;t load recent activity right now.{' '}
            <a href="https://github.com/sidhanshumonga/uxe.fyi/commits/main" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
              See it on GitHub →
            </a>
          </div>
        )}
        {list.map((a, i) => {
          const av = { i: a.who[0].toUpperCase(), c: 'var(--accent)', url: a.avatarUrl };
          return (
            <a
              key={a.href ?? i}
              href={a.href ?? 'https://github.com/sidhanshumonga/uxe.fyi/commits/main'}
              target="_blank"
              rel="noopener noreferrer"
              className="activity-row"
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
                <When iso={a.date} />
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};
