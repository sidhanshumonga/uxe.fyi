import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { Icon, IconName } from '@/components/Icon';
import { Avatar, ActivityFeed } from '@/components/CommunityComponents';
import { getContributors, getRecentActivity } from '@/lib/github';
import { AUTHORS } from '@/data/authors';

const MAINTAINER = 'sidhanshumonga';

export default async function CommunityPage() {
  const [people, activity] = await Promise.all([getContributors(), getRecentActivity(8)]);
  const contributors = people.map((c) => ({ name: c.login, avatarUrl: c.avatarUrl, contributions: c.contributions }));

  return (
    <>
      <PageHeader
        eyebrow="Community"
        title="The people"
        italic="behind uxe.fyi."
        lead="A growing, global community of UX engineers, designers, and the curious in-between. There are many ways to take part — and none of them require permission."
      />

      <section>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 18 }}>How to take part</div>
          <p style={{ fontSize: 16, color: 'var(--ink-dim)', maxWidth: '60ch', lineHeight: 1.55, marginBottom: 36 }}>
            Everything happens on GitHub. Issues are how we talk. Pull requests are how we ship. There's no waiting list, no application, no permission to ask for.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12, marginBottom: 56 }}>
            {[
              { i: 'plus' as IconName, t: 'Raise an issue', d: 'Spot a missing topic, a typo, a broken link, a bad take? Open an issue. Someone — maybe you — will pick it up.', cta: 'New issue' },
              { i: 'github' as IconName, t: 'Pick up an issue', d: 'Browse open issues labeled "good first issue" or "help wanted". Comment to claim it, then send a PR.', cta: 'Browse issues' },
              { i: 'sparkle' as IconName, t: 'Submit a breakdown', d: 'Took apart a great interaction in the wild? Open a PR with a new entry. The community will review it.', cta: 'Open PR' },
              { i: 'book' as IconName, t: 'Write a guide', d: 'Have a strong opinion on a topic? Draft a guide in your fork, open a PR, and we’ll edit it together.', cta: 'Start draft' },
              { i: 'eye' as IconName, t: 'Review or translate', d: 'Help review incoming PRs, or translate existing content. Issues tagged "review" and "translation" are how it happens.', cta: 'See open PRs' },
              { i: 'flask' as IconName, t: 'Propose a direction', d: 'Bigger ideas live in RFC-style issues. Open one, sketch the shape, and invite people to argue with you.', cta: 'Open RFC' },
            ].map((w, i) => (
              <div key={i} className="card hov">
                <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--surface-2)', color: 'var(--accent)', display: 'grid', placeItems: 'center', marginBottom: 14 }}>
                  <Icon name={w.i} size={18} />
                </div>
                <div className="display" style={{ fontSize: 19, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 8 }}>{w.t}</div>
                <div style={{ fontSize: 13.5, color: 'var(--ink-dim)', lineHeight: 1.55, marginBottom: 14 }}>{w.d}</div>
                <a
                  href="https://github.com/sidhanshumonga/uxe.fyi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono"
                  style={{ fontSize: '11.5px', color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <Icon name="github" size={12} />
                  {w.cta} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 18 }}>Recent activity</div>
          <p style={{ fontSize: 15, color: 'var(--ink-dim)', maxWidth: '54ch', lineHeight: 1.55, marginBottom: 28 }}>
            Every merged PR, opened issue, and shipped breakdown will show up here.
          </p>
          <ActivityFeed items={activity} />
        </div>
      </section>

      <section>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 18 }}>Contributors</div>
          <div className="grid-2-min" style={{ alignItems: 'stretch' }}>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {(contributors.length ? contributors : [{ name: MAINTAINER, avatarUrl: '', contributions: 0 }]).map((c, i) => {
                const info = AUTHORS[c.name];
                const role = c.name.toLowerCase() === MAINTAINER ? 'maintainer' : 'contributor';
                return (
                  <a
                    key={c.name}
                    href={`https://github.com/${c.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 22px', borderTop: i ? '1px solid var(--border)' : 0, flexWrap: 'wrap' }}
                  >
                    <Avatar a={{ i: c.name[0].toUpperCase(), c: 'var(--accent)', url: c.avatarUrl }} size={34} />
                    <div style={{ flex: '1 1 140px', minWidth: 0 }}>
                      <div style={{ fontSize: 15, fontWeight: 500 }}>{info?.name ?? c.name}</div>
                      <div className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>@{c.name} · {role}</div>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--ink-dim)', flex: '1 1 120px' }}>{info?.focus ?? ''}</div>
                    <div className="mono" style={{ fontSize: 11.5, color: 'var(--muted)' }}>
                      {c.contributions ? `${c.contributions} commit${c.contributions === 1 ? '' : 's'}` : ''}
                    </div>
                  </a>
                );
              })}
            </div>
            <EmptyState
              variant="card"
              eyebrow={`${contributors.length || 1} contributor${(contributors.length || 1) === 1 ? '' : 's'} · so far`}
              title="Be the"
              italic="next name."
              body="There is no waitlist, no application, no role to apply for. Open a pull request, write a guide, fix a typo, propose a roadmap — your handle joins this page the moment your first PR lands."
              primary={{
                label: 'Contribute on GitHub',
                icon: 'github',
                href: 'https://github.com/sidhanshumonga/uxe.fyi',
              }}
              secondary={{
                label: 'Browse open issues',
                icon: 'plus',
                href: 'https://github.com/sidhanshumonga/uxe.fyi/issues',
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
