'use client';

import React from 'react';
import { Icon, IconName } from './Icon';

// Empty states for unfinished sections (context/empty.jsx).
// Default is the slim "strip" that sits above a list; variant="card" is the
// larger dashed card used where the empty state is the main content.

interface ActionButton {
  label: string;
  href?: string;
  icon?: IconName;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

interface EmptyStateProps {
  variant?: 'strip' | 'card';
  eyebrow?: string;
  title: string;
  italic?: string;
  body?: string;
  primary?: ActionButton;
  secondary?: ActionButton;
}

const ctaProps = (c: ActionButton) => ({
  href: c.href || '#',
  target: c.href ? '_blank' : undefined,
  rel: c.href ? 'noopener noreferrer' : undefined,
  onClick: c.onClick,
});

export const EmptyState: React.FC<EmptyStateProps> = ({ variant = 'strip', ...props }) =>
  variant === 'card' ? <EmptyStateCard {...props} /> : <EmptyStateStrip {...props} />;

const EmptyStateStrip: React.FC<Omit<EmptyStateProps, 'variant'>> = ({ eyebrow = 'empty state', title, italic, body, primary, secondary }) => (
  <div className="es-strip">
    <div className="es-strip-text">
      <span className="es-strip-eyebrow"><span className="es-dot" aria-hidden="true"></span>{eyebrow}</span>
      <p>
        <strong>{title}{italic && <> <span className="serif-italic" style={{ color: 'var(--accent)' }}>{italic}</span></>}</strong>
        {body && <> {body}</>}
      </p>
    </div>
    {(primary || secondary) && (
      <div className="es-strip-actions">
        {primary && (
          <a className="es-link primary" {...ctaProps(primary)}>
            {primary.icon && <Icon name={primary.icon} size={13} />}
            {primary.label}
          </a>
        )}
        {secondary && <a className="es-link" {...ctaProps(secondary)}>{secondary.label} →</a>}
      </div>
    )}
  </div>
);

const EmptyStateCard: React.FC<Omit<EmptyStateProps, 'variant'>> = ({ eyebrow = 'empty state', title, italic, body, primary, secondary }) => (
  <div className="empty-state">
    <span className="es-eyebrow">{eyebrow}</span>
    <h3>
      {title}
      {italic && <> <span className="serif-italic" style={{ color: 'var(--accent)' }}>{italic}</span></>}
    </h3>
    {body && <p>{body}</p>}
    {(primary || secondary) && (
      <div className="empty-state-actions">
        {primary && (
          <a className="btn primary" {...ctaProps(primary)}>
            {primary.icon && <Icon name={primary.icon} size={14} />}
            {primary.label}
          </a>
        )}
        {secondary && (
          <a className="btn" {...ctaProps(secondary)}>
            {secondary.icon && <Icon name={secondary.icon} size={14} />}
            {secondary.label}
          </a>
        )}
      </div>
    )}
  </div>
);
