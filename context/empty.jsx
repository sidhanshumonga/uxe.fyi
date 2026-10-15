// empty.jsx — Empty-state + Draft-card primitives for unfinished sections

const ctaProps = (c) => ({ href: c.href || '#', target: c.href ? '_blank' : undefined, rel: c.href ? 'noopener' : undefined, onClick: c.onClick });

const EmptyState = (props) => props.variant === 'card' ? <EmptyStateCard {...props} /> : <EmptyStateStrip {...props} />;

const EmptyStateStrip = ({ eyebrow = 'empty state', title, italic, body, primary, secondary }) => (
  <div className="es-strip">
    <div className="es-strip-text">
      <span className="es-strip-eyebrow"><span className="es-dot" aria-hidden></span>{eyebrow}</span>
      <p><strong>{title}{italic && <> <span className="serif-italic" style={{ color: 'var(--accent)' }}>{italic}</span></>}</strong>{body && <> {body}</>}</p>
    </div>
    {(primary || secondary) && (
      <div className="es-strip-actions">
        {primary && <a className="es-link primary" {...ctaProps(primary)}>{primary.icon && <Icon name={primary.icon} size={13} />}{primary.label}</a>}
        {secondary && <a className="es-link" {...ctaProps(secondary)}>{secondary.label} →</a>}
      </div>
    )}
  </div>
);

const EmptyStateCard = ({ eyebrow = 'empty state', title, italic, body, primary, secondary }) => (
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
          <a className="btn primary" href={primary.href || '#'} target={primary.href ? '_blank' : undefined} rel={primary.href ? 'noopener' : undefined} onClick={primary.onClick}>
            {primary.icon && <Icon name={primary.icon} size={14} />}
            {primary.label}
          </a>
        )}
        {secondary && (
          <a className="btn" href={secondary.href || '#'} target={secondary.href ? '_blank' : undefined} rel={secondary.href ? 'noopener' : undefined} onClick={secondary.onClick}>
            {secondary.icon && <Icon name={secondary.icon} size={14} />}
            {secondary.label}
          </a>
        )}
      </div>
    )}
  </div>
);

const DraftCard = ({ title, kicker, note, label = 'Write this' }) => (
  <a className="draft-card" href="#" onClick={(e) => e.preventDefault()}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {kicker && <span className="mono" style={{ fontSize: 10.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{kicker}</span>}
      <span className="draft-pill">drafting</span>
    </div>
    <div style={{ fontSize: 17, fontWeight: 500, color: 'var(--ink-dim)', lineHeight: 1.2 }}>{title}</div>
    {note && <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{note}</div>}
    <div className="write-cta">
      <Icon name="github" size={11} />
      {label} →
    </div>
  </a>
);

Object.assign(window, { EmptyState, EmptyStateCard, EmptyStateStrip, DraftCard });
