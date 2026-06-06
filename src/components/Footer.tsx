'use client';

import React from 'react';
import Link from 'next/link';
import { Icon } from './Icon';

export default function Footer() {
  const coffeeUrl = "https://buymeacoffee.com/sidhanshu";

  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-col">
            <div className="brand" style={{ marginBottom: 14 }}>
              <span>uxe.fyi</span>
            </div>
            <div className="dim" style={{ fontSize: 14, lineHeight: 1.55, maxWidth: '32ch' }}>
              The open-source home for UX Engineering — a living handbook for the discipline of making interfaces feel inevitable.
            </div>
            <div className="coffee-card">
              <div className="ttl">Support uxe.fyi</div>
              <div className="sub">uxe.fyi is open-source and built by one person plus a growing community. If it helped you, fuel it.</div>
              <a href={coffeeUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="heart" size={12} />
                Support the project
              </a>
            </div>
          </div>
          <div className="foot-col">
            <h5>Learn</h5>
            <Link href="/explore">What is UXE</Link>
            <Link href="/learning">Foundations</Link>
            <Link href="/learning">Engineering</Link>
            <Link href="/learning">Experience design</Link>
            <Link href="/roadmaps">Roadmaps</Link>
          </div>
          <div className="foot-col">
            <h5>Explore</h5>
            <Link href="/thinking">UXE Thinking</Link>
            <Link href="/breakdowns">Breakdowns</Link>
            <Link href="/resources">Resource library</Link>
            <Link href="/community">Community</Link>
          </div>
          <div className="foot-col">
            <h5>Open Source</h5>
            <a href="https://github.com/sidhanshumonga/uxe.fyi" target="_blank" rel="noopener noreferrer">GitHub repo</a>
            <a href="https://github.com/sidhanshumonga/uxe.fyi/issues" target="_blank" rel="noopener noreferrer">Open an issue</a>
            <a href="https://github.com/sidhanshumonga/uxe.fyi/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22" target="_blank" rel="noopener noreferrer">Good first issues</a>
            <a href="https://github.com/sidhanshumonga/uxe.fyi/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">Contributing guide</a>
            <a href="/feed.xml" target="_blank" rel="noopener noreferrer">RSS</a>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 64, paddingTop: 24, borderTop: '1px solid var(--border)', flexWrap: 'wrap', gap: 16 }}>
          <div className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>
            <span style={{ color: 'var(--accent)' }}>●</span> built in the open
          </div>
          <div className="mono" style={{ fontSize: 12, color: 'var(--muted)' }}>
            uxe.fyi — engineering the <span className="serif-italic" style={{ color: 'var(--ink-dim)', fontSize: 14 }}>feel</span> of software
          </div>
        </div>
      </div>
    </footer>
  );
}
