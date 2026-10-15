// Starter / mid / advanced as 1–3 coloured dots (context/pages.jsx).
import React from 'react';

export const LevelDot: React.FC<{ lvl: string }> = ({ lvl }) => {
  const c = lvl === 'starter' ? '#9EE493' : lvl === 'mid' ? '#FFB46D' : '#FF7A59';
  const n = lvl === 'starter' ? 1 : lvl === 'mid' ? 2 : 3;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            width: 4,
            height: 4,
            borderRadius: 2,
            background: i <= n ? c : 'var(--border-strong)',
          }}
        />
      ))}
    </div>
  );
};
