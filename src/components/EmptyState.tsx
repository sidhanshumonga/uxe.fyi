'use client';

import React from 'react';
import { Icon, IconName } from './Icon';

interface ActionButton {
  label: string;
  href?: string;
  icon?: IconName;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

interface EmptyStateProps {
  eyebrow?: string;
  title: string;
  italic?: string;
  body?: string;
  primary?: ActionButton;
  secondary?: ActionButton;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  eyebrow = 'empty state',
  title,
  italic,
  body,
  primary,
  secondary,
}) => {
  return (
    <div className="empty-state">
      <span className="es-eyebrow">{eyebrow}</span>
      <h3>
        {title}
        {italic && (
          <>
            {' '}
            <span className="serif-italic" style={{ color: 'var(--accent)' }}>
              {italic}
            </span>
          </>
        )}
      </h3>
      {body && <p>{body}</p>}
      {(primary || secondary) && (
        <div className="empty-state-actions">
          {primary && (
            <a
              className="btn primary"
              href={primary.href || '#'}
              target={primary.href ? '_blank' : undefined}
              rel={primary.href ? 'noopener noreferrer' : undefined}
              onClick={primary.onClick}
            >
              {primary.icon && <Icon name={primary.icon} size={14} />}
              {primary.label}
            </a>
          )}
          {secondary && (
            <a
              className="btn"
              href={secondary.href || '#'}
              target={secondary.href ? '_blank' : undefined}
              rel={secondary.href ? 'noopener noreferrer' : undefined}
              onClick={secondary.onClick}
            >
              {secondary.icon && <Icon name={secondary.icon} size={14} />}
              {secondary.label}
            </a>
          )}
        </div>
      )}
    </div>
  );
};
