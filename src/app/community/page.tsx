'use client';

import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { Icon, IconName } from '@/components/Icon';
import { Avatar, ActivityFeed, ActivityItem } from '@/components/CommunityComponents';

interface Contributor {
  name: string;
  avatarUrl: string;
  contributions: number;
}

export default function CommunityPage() {
  const [stats, setStats] = useState({ stars: 0, forks: 0, openIssues: 0 });
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [maintainerCommits, setMaintainerCommits] = useState(1);

  useEffect(() => {
    // 1. Fetch General Repo Stats (Stars, Forks, Issues)
    fetch('https://api.github.com/repos/sidhanshumonga/uxe.fyi')
      .then((res) => {
        if (!res.ok) throw new Error('API Rate Limit or Network Error');
        return res.json();
      })
      .then((data) => {
        setStats({
          stars: data.stargazers_count || 0,
          forks: data.forks_count || 0,
          openIssues: data.open_issues_count || 0,
        });
      })
      .catch((err) => console.log('GitHub general stats error:', err));

    // 2. Fetch Contributors
    fetch('https://api.github.com/repos/sidhanshumonga/uxe.fyi/contributors')
      .then((res) => {
        if (!res.ok) throw new Error('API Rate Limit or Network Error');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const formatted = data.map((c: { login: string; avatar_url: string; contributions: number }) => ({
            name: c.login,
            avatarUrl: c.avatar_url,
            contributions: c.contributions,
          }));
          setContributors(formatted);

          // Find maintainer's contributions
          const main = formatted.find((c) => c.name.toLowerCase() === 'sidhanshumonga');
          if (main) {
            setMaintainerCommits(main.contributions);
          }
        }
      })
      .catch((err) => console.log('GitHub contributors error:', err));

    // 3. Fetch Commits for Activity Feed
    fetch('https://api.github.com/repos/sidhanshumonga/uxe.fyi/commits?per_page=5')
      .then((res) => {
        if (!res.ok) throw new Error('API Rate Limit or Network Error');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const getRelativeTime = (dateString: string) => {
            const date = new Date(dateString);
            const now = new Date();
            const diffMs = now.getTime() - date.getTime();
            const diffSec = Math.floor(diffMs / 1000);
            const diffMin = Math.floor(diffSec / 60);
            const diffHr = Math.floor(diffMin / 60);
            const diffDays = Math.floor(diffHr / 24);

            if (diffSec < 60) return 'just now';
            if (diffMin < 60) return `${diffMin}m ago`;
            if (diffHr < 24) return `${diffHr}h ago`;
            if (diffDays === 1) return 'yesterday';
            return `${diffDays} days ago`;
          };

          const formattedActivity: ActivityItem[] = data.map((item: {
            author?: { login: string; avatar_url: string };
            commit: { author: { name: string; date: string }; message: string };
          }) => {
            const msg = item.commit.message.split('\n')[0];
            const isMerge = msg.startsWith('Merge');
            return {
              who: item.author?.login || item.commit.author.name || 'contributor',
              verb: isMerge ? 'merged' : 'committed',
              what: msg,
              when: getRelativeTime(item.commit.author.date),
              kind: isMerge ? 'merge' : 'ship',
              avatarUrl: item.author?.avatar_url || '',
            };
          });
          setActivity(formattedActivity);
        }
      })
      .catch((err) => console.log('GitHub commits activity error:', err));
  }, []);

  const totalOtherContributors = contributors.filter((c) => c.name.toLowerCase() !== 'sidhanshumonga').length;
  const maintainerAvatar = contributors.find((c) => c.name.toLowerCase() === 'sidhanshumonga')?.avatarUrl || '';

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
          {/* GitHub Live Stats Section */}
          <div className="grid-stats-4" style={{ marginBottom: 48 }}>
            <div className="card" style={{ padding: '20px 14px', textAlign: 'center', background: 'var(--surface)' }}>
              <div className="display" style={{ fontSize: 32, fontWeight: 600, color: 'var(--accent)' }}>{stats.stars}</div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4, letterSpacing: '0.05em' }}>GitHub Stars</div>
            </div>
            <div className="card" style={{ padding: '20px 14px', textAlign: 'center', background: 'var(--surface)' }}>
              <div className="display" style={{ fontSize: 32, fontWeight: 600, color: 'var(--accent)' }}>{stats.openIssues}</div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4, letterSpacing: '0.05em' }}>Open Issues</div>
            </div>
            <div className="card" style={{ padding: '20px 14px', textAlign: 'center', background: 'var(--surface)' }}>
              <div className="display" style={{ fontSize: 32, fontWeight: 600, color: 'var(--accent)' }}>{stats.forks}</div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4, letterSpacing: '0.05em' }}>Forks</div>
            </div>
            <div className="card" style={{ padding: '20px 14px', textAlign: 'center', background: 'var(--surface)' }}>
              <div className="display" style={{ fontSize: 32, fontWeight: 600, color: 'var(--accent)' }}>{contributors.length || 1}</div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4, letterSpacing: '0.05em' }}>Contributors</div>
            </div>
          </div>

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
          <ActivityFeed items={activity.length > 0 ? activity : undefined} />
        </div>
      </section>

      <section>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 18 }}>Contributors</div>
          <div className="grid-2-min" style={{ alignItems: 'stretch' }}>
            <div className="card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <Avatar a={{ i: 'S', c: '#FF3D88', url: maintainerAvatar }} size={48} />
                <div>
                  <div style={{ fontSize: 18, fontWeight: 500 }}>sidhanshumonga</div>
                  <div className="mono" style={{ fontSize: '11.5px', color: 'var(--muted)' }}>maintainer · creator · open source</div>
                </div>
              </div>
              <p style={{ fontSize: 14.5, color: 'var(--ink-dim)', lineHeight: 1.6, margin: 0 }}>
                UX Engineering is about making interfaces feel inevitable. The site, the breakdowns, the handbook scaffolding — all of it is here to bring together engineers and designers who care about the details.
              </p>
              <div className="mono" style={{ fontSize: '11.5px', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: 8, paddingTop: 6, borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
                <span style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--accent)' }} />
                {maintainerCommits} contribution{maintainerCommits !== 1 ? 's' : ''} so far
              </div>
            </div>
            
            <EmptyState
              variant="card"
              eyebrow={`${totalOtherContributors} other contributor${totalOtherContributors !== 1 ? 's' : ''} · so far`}
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

          {/* Render extra contributors list if they exist */}
          {totalOtherContributors > 0 && (
            <div style={{ marginTop: 32 }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Other Project Contributors:</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {contributors
                  .filter((c) => c.name.toLowerCase() !== 'sidhanshumonga')
                  .map((c) => (
                    <a
                      key={c.name}
                      href={`https://github.com/${c.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '6px 12px',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: 20,
                        transition: 'border-color 150ms',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                      }}
                    >
                      <Avatar a={{ i: c.name[0].toUpperCase(), c: 'var(--accent)', url: c.avatarUrl }} size={24} />
                      <span className="mono" style={{ fontSize: 12, color: 'var(--ink)' }}>{c.name}</span>
                      <span style={{ fontSize: 11, color: 'var(--muted)' }}>({c.contributions})</span>
                    </a>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
