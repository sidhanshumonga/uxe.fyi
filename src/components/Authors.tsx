export function Authors({ handles, size = 28 }: { handles: string[]; size?: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
      {handles.map((h) => (
        <a key={h} href={`https://github.com/${h}`} target="_blank" rel="noopener noreferrer" className="author-chip">
          <img src={`https://github.com/${h}.png?size=${size * 2}`} alt="" width={size} height={size} loading="lazy" />
          <span>@{h}</span>
        </a>
      ))}
    </span>
  );
}
