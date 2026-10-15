'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Icon } from './Icon';

// "Mark as complete" for lessons, remembered in this browser only
// (localStorage 'uxe-lessons-done', as in context/readers.jsx).

const KEY = 'uxe-lessons-done';
const EVENT = 'uxe-lessons-done';

function read(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

function useLessonsDone() {
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setDone(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);
  const toggle = (slug: string) => {
    const cur = read();
    const next = cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
    setDone(next);
    window.dispatchEvent(new Event(EVENT));
  };
  return { done, toggle };
}

export interface TrackItem {
  title: string;
  slug?: string; // set when the lesson is written
}

/** The "<Track> track" list in the lesson sidebar. */
export function TrackNav({ items, current }: { items: TrackItem[]; current: string }) {
  const { done } = useLessonsDone();
  return (
    <>
      {items.map((it) =>
        it.slug ? (
          <Link key={it.title} href={`/learning/${it.slug}`} className={'track-link' + (it.slug === current ? ' cur' : '')} aria-current={it.slug === current ? 'page' : undefined}>
            <span className={'track-dot' + (done.includes(it.slug) ? ' done' : '')}>
              {done.includes(it.slug) && <Icon name="check" size={9} />}
            </span>
            {it.title}
          </Link>
        ) : (
          <div key={it.title} className="track-link off">
            <span className="track-dot"></span>
            {it.title}
            <span className="mono" style={{ marginLeft: 'auto', fontSize: 9.5 }}>draft</span>
          </div>
        ),
      )}
    </>
  );
}

export function CompleteButton({ slug }: { slug: string }) {
  const { done, toggle } = useLessonsDone();
  const isDone = done.includes(slug);
  return (
    <button type="button" className={'btn' + (isDone ? '' : ' primary')} onClick={() => toggle(slug)} aria-pressed={isDone}>
      <Icon name="check" size={14} />
      {isDone ? 'Completed' : 'Mark as complete'}
    </button>
  );
}
