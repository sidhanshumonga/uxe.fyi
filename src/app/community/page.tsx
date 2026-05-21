'use client';

import React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { Icon, IconName } from '@/components/Icon';
import { Avatar, ActivityFeed, AVATARS } from '@/components/CommunityComponents';

export default function CommunityPage() {
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
            Every merged PR, opened issue, and shipped breakdown will show up here. Right now it's a quiet feed — that's what day one looks like.
          </p>
          <ActivityFeed />
        </div>
      </section>

      <section>
        <div className="container">
          <div className="eyebrow" style={{ marginBottom: 18 }}>Contributors</div>
          <div className="grid-2-min" style={{ alignItems: 'stretch' }}>
            <div className="card" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <Avatar a={AVATARS[0]} size={48} />
                <div>
                  <div style={{ fontSize: 18, fontWeight: 500 }}>uxe.fyi</div>
                  <div className="mono" style={{ fontSize: '11.5px', color: 'var(--muted)' }}>maintainer · v0.0 · open source</div>
                </div>
              </div>
              <p style={{ fontSize: 14.5, color: 'var(--ink-dim)', lineHeight: 1.6, margin: 0 }}>
                One person opened the door. The site, the demos, the structure — all of it is here as scaffolding for a community that hasn't fully shown up yet.
              </p>
              <div className="mono" style={{ fontSize: '11.5px', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: 8, paddingTop: 6, borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
                <span style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--accent)' }} />
                1 contribution so far
              </div>
            </div>
            <EmptyState
              eyebrow="0 other contributors · so far"
              title="Be the"
              italic="second name."
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
