'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from './Icon';
import { useTheme } from './ThemeProvider';

export const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/explore', label: 'Explore' },
  { path: '/learning', label: 'Learning' },
  { path: '/roadmaps', label: 'Roadmaps' },
  { path: '/thinking', label: 'Thinking' },
  { path: '/breakdowns', label: 'Breakdowns' },
  { path: '/community', label: 'Community' },
  { path: '/resources', label: 'Resources' },
];

export default function Nav() {
  const pathname = usePathname();
  const { theme, accent, setTheme, setAccent, accentOptions } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const coffeeUrl = "https://buymeacoffee.com/sidhanshu";

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <Link className="brand" href="/">
          <span>uxe.fyi</span>
          <span className="brand-cursor" aria-hidden="true"></span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="nav-links nav-links-desktop">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
                href={item.path}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right Side Controls */}
        <div className="nav-right">
          <AppearanceMenu
            theme={theme}
            accent={accent}
            onSetTheme={setTheme}
            onSetAccent={setAccent}
            accentOptions={accentOptions}
          />
          <a className="gh-badge" href="https://github.com/sidhanshumonga/uxe.fyi" target="_blank" rel="noopener noreferrer">
            <Icon name="github" size={13} />
            <span>star</span>
            <span className="star">★</span>
          </a>
          <a className="coffee-btn" href={coffeeUrl} target="_blank" rel="noopener noreferrer">
            <Icon name="heart" size={13} />
            <span>Support</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            className="icon-btn mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <Icon name={mobileMenuOpen ? 'close' : 'chev'} size={15} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer fade-in">
          <div className="mobile-drawer-links">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  className={`mobile-drawer-link ${isActive ? 'active' : ''}`}
                  href={item.path}
                >
                  {item.label}
                  {isActive && <span className="active-dot"></span>}
                </Link>
              );
            })}
          </div>
          <div className="mobile-drawer-footer">
            <a className="mobile-drawer-gh" href="https://github.com/sidhanshumonga/uxe.fyi" target="_blank" rel="noopener noreferrer">
              <Icon name="github" size={14} />
              <span>Star on GitHub</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

interface AppearanceMenuProps {
  theme: 'dark' | 'light';
  accent: string;
  onSetTheme: (theme: 'dark' | 'light') => void;
  onSetAccent: (accent: string) => void;
  accentOptions: string[];
}

function AppearanceMenu({ theme, accent, onSetTheme, onSetAccent, accentOptions }: AppearanceMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <button
        className="icon-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label="Appearance settings"
        aria-expanded={open}
        style={{ position: 'relative' }}
      >
        <Icon name={theme === 'dark' ? 'moon' : 'sun'} size={13} />
        <span
          style={{
            position: 'absolute',
            right: 4,
            bottom: 4,
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: accent,
            border: '1.5px solid var(--bg)',
          }}
        />
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: 240,
            background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
            padding: 14,
            zIndex: 200,
            transformOrigin: 'top right',
            animation: 'appearanceMenuOpen 180ms cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        >
          <div
            className="mono"
            style={{
              fontSize: 10,
              color: 'var(--muted)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            Theme
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 4,
              padding: 3,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              marginBottom: 14,
            }}
          >
            {(['dark', 'light'] as const).map((m) => (
              <button
                key={m}
                onClick={() => onSetTheme(m)}
                style={{
                  appearance: 'none',
                  padding: '6px 8px',
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  borderRadius: 6,
                  border: 0,
                  background: theme === m ? 'var(--ink)' : 'transparent',
                  color: theme === m ? 'var(--bg)' : 'var(--ink-dim)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  transition: 'all 140ms',
                }}
              >
                <Icon name={m === 'dark' ? 'moon' : 'sun'} size={12} />
                {m}
              </button>
            ))}
          </div>

          <div
            className="mono"
            style={{
              fontSize: 10,
              color: 'var(--muted)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            Accent
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
            {accentOptions.map((c) => {
              const isActive = c.toLowerCase() === (accent || '').toLowerCase();
              return (
                <button
                  key={c}
                  onClick={() => onSetAccent(c)}
                  aria-label={`Set accent to ${c}`}
                  style={{
                    appearance: 'none',
                    width: '100%',
                    aspectRatio: '1',
                    borderRadius: 8,
                    background: c,
                    border: `2px solid ${isActive ? 'var(--ink)' : 'transparent'}`,
                    boxShadow: isActive
                      ? '0 0 0 2px var(--bg-2), 0 0 0 3px var(--ink)'
                      : '0 0 0 1px var(--border)',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'transform 120ms',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
