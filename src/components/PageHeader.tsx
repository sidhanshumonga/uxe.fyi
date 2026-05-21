'use client';

import React from 'react';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  italic?: string;
  lead?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ eyebrow, title, italic, lead }) => {
  return (
    <section style={{ paddingBottom: 0, paddingTop: 'clamp(40px, 6vw, 80px)' }}>
      <div className="container">
        <div className="eyebrow" style={{ marginBottom: 14 }}>{eyebrow}</div>
        <h1 className="display" style={{
          fontSize: 'clamp(40px, 6vw, 88px)',
          margin: '0 0 24px',
          maxWidth: '18ch',
        }}>
          {title}
          {italic && (
            <>
              {' '}
              <span className="serif-italic" style={{ color: 'var(--accent)' }}>
                {italic}
              </span>
            </>
          )}
        </h1>
        {lead && (
          <p style={{ fontSize: 'clamp(16px, 1.3vw, 19px)', color: 'var(--ink-dim)', maxWidth: '60ch', lineHeight: 1.55, margin: 0 }}>
            {lead}
          </p>
        )}
      </div>
    </section>
  );
};
