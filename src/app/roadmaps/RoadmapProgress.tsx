'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/Icon';
import { KIND_COLOR, KIND_LABEL, type ResourceKind } from '@/data/resources';

// The interactive half of a roadmap page: the phase timeline with tickable
// steps, and the sticky progress sidebar. Ticks are kept in localStorage
// per roadmap, so they are private to this browser.

export interface PhaseView {
  title: string;
  weeks: string;
  goal?: string;
  items: string[];
  lessons: { title: string; href: string; mins: number }[];
  resources: { title: string; href: string; kind: ResourceKind; who: string }[];
  ship?: string;
}

const EVENT = 'uxe-roadmap-progress';
const keyFor = (slug: string) => `uxe-roadmap:${slug}`;

function read(slug: string): string[] {
  try {
    return JSON.parse(localStorage.getItem(keyFor(slug)) || '[]');
  } catch {
    return [];
  }
}

function useProgress(slug: string) {
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setDone(read(slug));
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, [slug]);
  const toggle = (id: string) => {
    const cur = read(slug);
    const next = cur.includes(id) ? cur.filter((s) => s !== id) : [...cur, id];
    try {
      localStorage.setItem(keyFor(slug), JSON.stringify(next));
    } catch {}
    setDone(next);
    window.dispatchEvent(new Event(EVENT));
  };
  const reset = () => {
    try {
      localStorage.removeItem(keyFor(slug));
    } catch {}
    setDone([]);
    window.dispatchEvent(new Event(EVENT));
  };
  return { done, toggle, reset };
}

const stepId = (p: number, i: number) => `${p}-${i}`;

export function RoadmapTimeline({ slug, phases }: { slug: string; phases: PhaseView[] }) {
  const { done, toggle } = useProgress(slug);
  return (
    <ol className="rm-timeline">
      {phases.map((p, pi) => {
        const total = p.items.length;
        const ticked = p.items.filter((_, i) => done.includes(stepId(pi, i))).length;
        const complete = ticked === total;
        return (
          <li key={pi} id={`phase-${pi + 1}`} className={'rm-phase' + (complete ? ' complete' : '')}>
            <div className="rm-node" aria-hidden="true">
              {complete ? <Icon name="check" size={14} /> : String(pi + 1).padStart(2, '0')}
            </div>
            <div className="rm-phase-body">
              <div className="rm-phase-meta mono">
                <span>Phase {pi + 1}</span>
                <span>{p.weeks}</span>
                <span>{ticked}/{total} done</span>
              </div>
              <h2 className="display rm-phase-title">{p.title}</h2>
              {p.goal && <p className="rm-goal">{p.goal}</p>}

              <ul className="rm-steps">
                {p.items.map((it, i) => {
                  const id = stepId(pi, i);
                  const on = done.includes(id);
                  return (
                    <li key={i}>
                      <label className={'rm-step' + (on ? ' on' : '')}>
                        <input type="checkbox" checked={on} onChange={() => toggle(id)} />
                        <span className="rm-box" aria-hidden="true">{on && <Icon name="check" size={11} />}</span>
                        <span>{it}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>

              {(p.lessons.length > 0 || p.resources.length > 0) && (
                <div className="rm-links">
                  {p.lessons.length > 0 && (
                    <div>
                      <div className="aside-h">Learn it here</div>
                      <div className="rm-chips">
                        {p.lessons.map((l) => (
                          <Link key={l.href} href={l.href} className="rm-chip">
                            <Icon name="book" size={12} />
                            {l.title}
                            <span className="mono">{l.mins} min</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {p.resources.length > 0 && (
                    <div>
                      <div className="aside-h">Read, watch, use</div>
                      <div className="rm-chips">
                        {p.resources.map((r) => (
                          <Link key={r.title} href={r.href} className="rm-chip">
                            <span className="rm-kind" style={{ background: KIND_COLOR[r.kind] }} aria-hidden="true" />
                            {r.title}
                            <span className="mono">{KIND_LABEL[r.kind]} · {r.who}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {p.ship && (
                <div className="rm-ship">
                  <span className="mono">Ship it</span>
                  <p>{p.ship}</p>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function RoadmapAside({ slug, phases }: { slug: string; phases: Pick<PhaseView, 'title' | 'items'>[] }) {
  const { done, reset } = useProgress(slug);
  const total = phases.reduce((n, p) => n + p.items.length, 0);
  const ticked = done.length;
  const pct = total ? Math.round((Math.min(ticked, total) / total) * 100) : 0;
  return (
    <div className="aside-block">
      <div className="aside-h">Your progress</div>
      <div className="rm-progress" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={ticked} aria-label="Steps done">
        <span style={{ width: `${pct}%` }} />
      </div>
      <div className="mono rm-progress-label">
        {ticked} of {total} steps · {pct}%
        {ticked > 0 && (
          <button type="button" onClick={reset} className="rm-reset">reset</button>
        )}
      </div>
      <div style={{ marginTop: 18 }}>
        {phases.map((p, pi) => {
          const n = p.items.filter((_, i) => done.includes(stepId(pi, i))).length;
          const complete = n === p.items.length;
          return (
            <a key={pi} href={`#phase-${pi + 1}`} className="toc-link">
              <span className={'track-dot' + (complete ? ' done' : '')}>{complete && <Icon name="check" size={9} />}</span>
              {p.title}
            </a>
          );
        })}
      </div>
      <p className="rm-private">Saved in this browser only.</p>
    </div>
  );
}
