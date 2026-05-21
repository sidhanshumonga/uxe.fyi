import React from 'react';

export type IconName =
  | 'arrow'
  | 'arrowUR'
  | 'plus'
  | 'minus'
  | 'chev'
  | 'chevR'
  | 'star'
  | 'github'
  | 'rss'
  | 'heart'
  | 'search'
  | 'sun'
  | 'moon'
  | 'book'
  | 'map'
  | 'sparkle'
  | 'flask'
  | 'users'
  | 'code'
  | 'eye'
  | 'bolt'
  | 'check'
  | 'close';

interface IconProps {
  name: IconName;
  size?: number;
  stroke?: number;
}

export const Icon: React.FC<IconProps> = ({ name, size = 16, stroke = 1.6 }) => {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    arrowUR: <path d="M7 17 17 7M9 7h8v8" />,
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    chev: <path d="m6 9 6 6 6-6" />,
    chevR: <path d="m9 6 6 6-6 6" />,
    star: <path d="M12 3.5 14.6 9l6 .9-4.3 4.2 1 6L12 17l-5.3 3.1 1-6L3.4 9.9 9.4 9z" />,
    github: (
      <path
        d="M12 1.7a10.3 10.3 0 0 0-3.3 20.1c.5.1.7-.2.7-.5v-2c-2.9.6-3.5-1.4-3.5-1.4-.4-1.2-1-1.5-1-1.5-.9-.6.1-.6.1-.6 1 0 1.5 1 1.5 1 .9 1.6 2.5 1.1 3.1.9 0-.7.4-1.2.6-1.5-2.3-.3-4.7-1.2-4.7-5 0-1.1.4-2 1-2.8-.1-.3-.4-1.3.1-2.7 0 0 .9-.3 2.8 1a9.7 9.7 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.7 1 2.8 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.3 10.3 0 0 0 12 1.7"
        fill="currentColor"
        stroke="none"
      />
    ),
    rss: (
      <>
        <path d="M4 11a9 9 0 0 1 9 9" />
        <path d="M4 4a16 16 0 0 1 16 16" />
        <circle cx="5" cy="19" r="1.5" fill="currentColor" stroke="none" />
      </>
    ),
    heart: <path d="M12 21s-7-4.5-9-9c-1.5-3.5 1-7 5-7 2 0 4 2 4 2s2-2 4-2c4 0 6.5 3.5 5 7-2 4.5-9 9-9 9z" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
    moon: <path d="M21 13a9 9 0 1 1-10-10 7 7 0 0 0 10 10z" />,
    book: <path d="M4 4h7a3 3 0 0 1 3 3v13M20 4h-7a3 3 0 0 0-3 3v13M4 4v15h7M20 4v15h-7" />,
    map: (
      <>
        <path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2z" />
        <path d="M9 4v16M15 6v16" />
      </>
    ),
    sparkle: <path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />,
    flask: (
      <>
        <path d="M9 3h6M10 3v6L5 18a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 18l-5-9V3" />
        <path d="M7.5 13h9" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
        <circle cx="17" cy="6.5" r="2.5" />
        <path d="M21.5 17a4.5 4.5 0 0 0-5-4.4" />
      </>
    ),
    code: (
      <>
        <path d="m8 6-6 6 6 6" />
        <path d="m16 6 6 6-6 6" />
        <path d="M14 4 10 20" />
      </>
    ),
    eye: (
      <>
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
    check: <path d="m4 12 5 5 11-11" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      {paths[name]}
    </svg>
  );
};
