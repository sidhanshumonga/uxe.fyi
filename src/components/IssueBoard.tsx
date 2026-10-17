import type { OpenIssue } from '@/lib/github';
import { REPO_URL } from '@/lib/site';
import { Icon, type IconName } from './Icon';

// Open GitHub issues grouped by the kind of contribution, for the Community
// page. Groups come from labels and the issue-title conventions used when
// the issues were filed ("Write the essay: …", "Review a resource: …").

interface Group {
  key: string;
  title: string;
  icon: IconName;
  blurb: string;
  query: string; // GitHub issues search for "see all"
  match: (i: OpenIssue) => boolean;
  /** Text to strip from the start of titles in this group. */
  prefix?: RegExp;
}

const GROUPS: Group[] = [
  { key: 'essays', title: 'Essays', icon: 'book', blurb: 'One idea, argued well. 800–1,500 words.', query: 'is:open is:issue "Write the essay"', match: (i) => /^Write the essay/.test(i.title), prefix: /^Write the essay:\s*/ },
  { key: 'breakdowns', title: 'Breakdowns', icon: 'sparkle', blurb: 'A real interaction, a live demo, the reasoning.', query: 'is:open is:issue label:breakdown', match: (i) => i.labels.includes('breakdown'), prefix: /^Build the breakdown:\s*/ },
  { key: 'reviews', title: 'Resource reviews', icon: 'eye', blurb: '100–150 words on something you’ve read or used.', query: 'is:open is:issue "Review a resource"', match: (i) => /^Review a resource/.test(i.title), prefix: /^Review a resource:\s*/ },
  { key: 'paths', title: 'Roadmap stories', icon: 'map', blurb: 'How you actually got into the role.', query: 'is:open is:issue label:roadmap-story', match: (i) => i.labels.includes('roadmap-story'), prefix: /^Share your path:\s*/ },
  { key: 'practice', title: 'Practice exercises', icon: 'flask', blurb: 'Hands-on exercises for the lessons.', query: 'is:open is:issue label:practice', match: (i) => i.labels.includes('practice'), prefix: /^Add a practice exercise to the\s*/ },
  { key: 'other', title: 'Site & code', icon: 'code', blurb: 'Features, fixes and everything else.', query: 'is:open is:issue', match: () => true },
];

const SHOWN = 6;

export function IssueBoard({ issues }: { issues: OpenIssue[] }) {
  const rest = issues.filter((i) => !i.labels.includes('dependencies'));
  const grouped = GROUPS.map((g) => {
    const mine = rest.filter((i) => g.match(i));
    for (const i of mine) rest.splice(rest.indexOf(i), 1);
    return { g, items: mine };
  }).filter((x) => x.items.length > 0);

  if (grouped.length === 0) {
    return (
      <p style={{ fontSize: 14.5, color: 'var(--ink-dim)' }}>
        Couldn&rsquo;t load issues right now. <a href={`${REPO_URL}/issues`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>See them on GitHub →</a>
      </p>
    );
  }

  return (
    <div className="issue-board">
      {grouped.map(({ g, items }) => (
        <div key={g.key} className="card issue-group">
          <div className="issue-group-head">
            <span className="issue-icon"><Icon name={g.icon} size={15} /></span>
            <div>
              <div className="display issue-group-title">{g.title} <span className="mono">{items.length}</span></div>
              <div className="issue-group-blurb">{g.blurb}</div>
            </div>
          </div>
          <ul>
            {items.slice(0, SHOWN).map((i) => (
              <li key={i.number}>
                <a href={i.url} target="_blank" rel="noopener noreferrer">
                  <span className="mono">#{i.number}</span>
                  <span>{g.prefix ? i.title.replace(g.prefix, '').replace(/[“”"]/g, '').replace(/ lesson$/, '') : i.title}</span>
                  {i.labels.includes('good first issue') && <span className="issue-tag">first issue</span>}
                  {i.claimed && <span className="issue-tag dim">claimed</span>}
                </a>
              </li>
            ))}
          </ul>
          <a className="mono issue-all" href={`${REPO_URL}/issues?q=${encodeURIComponent(g.query)}`} target="_blank" rel="noopener noreferrer">
            {items.length > SHOWN ? `See all ${items.length}` : 'Open on GitHub'} →
          </a>
        </div>
      ))}
    </div>
  );
}
