// The content loader against throwaway content folders: what it accepts,
// what it rejects (with a useful message), and how it filters and sorts.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { checkAllContent, ContentError, getEntries, getEntry } from '@/lib/content/loader';

const TEMPLATES = path.join(process.cwd(), 'content', '_templates');
let root: string;

/** Write files (path → contents) under a fresh content/ folder and point the loader at it. */
function makeContent(files: Record<string, string>) {
  for (const [rel, body] of Object.entries(files)) {
    const file = path.join(root, 'content', rel);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, body);
  }
}

const fm = (fields: Record<string, string>, body = 'Body text.') =>
  `---\n${Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join('\n')}\n---\n\n${body}\n`;

const essay = (over: Record<string, string> = {}, body?: string) =>
  fm({ title: 'An essay', description: 'A description', authors: '[someone]', status: 'published', tags: '[craft]', date: '2026-10-14', ...over }, body);

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'uxe-content-'));
  process.env.UXE_CONTENT_DIR = path.join(root, 'content');
});
afterEach(() => {
  delete process.env.UXE_CONTENT_DIR;
  fs.rmSync(root, { recursive: true, force: true });
});

const problemsFor = (files: Record<string, string>) => {
  makeContent(files);
  return checkAllContent().problems;
};

describe('valid content', () => {
  it('accepts every template once it is in the right place', () => {
    const read = (f: string) => fs.readFileSync(path.join(TEMPLATES, f), 'utf8');
    makeContent({
      'essays/an-essay.mdx': read('essay.mdx'),
      'lessons/foundations/a-lesson.mdx': read('lesson.mdx'),
      'roadmaps/a-path.mdx': read('roadmap.mdx'),
      'resources/a-book.mdx': read('resource.mdx'),
      'breakdowns/a-breakdown/index.mdx': read('breakdown/index.mdx'),
      'breakdowns/a-breakdown/Demo.tsx': read('breakdown/Demo.tsx'),
      '_templates/ignored.mdx': 'not frontmatter at all',
      'README.md': '# ignored',
    });
    const { counts, problems } = checkAllContent();
    expect(problems).toEqual([]);
    expect(counts).toEqual({ essays: 1, lessons: 1, roadmaps: 1, resources: 1, breakdowns: 1 });
  });

  it('normalises dates written with or without quotes', () => {
    makeContent({ 'essays/a.mdx': essay({ date: '2026-10-14' }), 'essays/b.mdx': essay({ title: 'B', date: '"2026-10-01"' }) });
    expect(getEntries('essays').map((e) => e.frontmatter.date)).toEqual(['2026-10-14', '2026-10-01']);
  });

  it('sorts newest first and hides drafts unless asked', () => {
    makeContent({
      'essays/old.mdx': essay({ title: 'Old', date: '2026-01-01' }),
      'essays/new.mdx': essay({ title: 'New', date: '2026-06-01' }),
      'essays/wip.mdx': essay({ title: 'WIP', status: 'draft', date: '2026-09-01' }),
    });
    expect(getEntries('essays').map((e) => e.slug)).toEqual(['new', 'old']);
    expect(getEntries('essays', { includeDrafts: true }).map((e) => e.slug)).toEqual(['wip', 'new', 'old']);
    expect(getEntry('essays', 'wip')).toBeUndefined();
    expect(getEntry('essays', 'wip', { includeDrafts: true })?.frontmatter.status).toBe('draft');
  });

  it('records repo-relative file paths and a reading time', () => {
    makeContent({ 'essays/a.mdx': essay({}, 'word '.repeat(660)) });
    const [e] = getEntries('essays');
    expect(e.file).toBe('content/essays/a.mdx');
    expect(e.readingMinutes).toBe(3);
  });
});

describe('invalid content', () => {
  it.each([
    ['a typo in a field name', { 'essays/a.mdx': essay({ authors: '', author: '[me]' }).replace('authors: \n', '') }, 'unknown field(s) author'],
    ['a missing required field', { 'essays/a.mdx': essay().replace(/description: .*\n/, '') }, 'description: is required'],
    ['an @ in a GitHub handle', { 'essays/a.mdx': essay({ authors: '["@me"]' }) }, 'must be a GitHub handle'],
    ['an unknown status', { 'essays/a.mdx': essay({ status: 'done' }) }, 'status:'],
    ['a badly formatted date', { 'essays/a.mdx': essay({ date: '14/10/2026' }) }, 'must be a date like'],
    ['an unknown essay tag', { 'essays/a.mdx': essay({ tags: '[vibes]' }) }, 'tags.0'],
    ['a slug that is not kebab-case', { 'essays/Bad_Slug.mdx': essay() }, 'is not a valid slug'],
    ['broken YAML', { 'essays/a.mdx': '---\ntitle: [unclosed\n---\n' }, 'not valid YAML'],
    ['missing frontmatter', { 'essays/a.mdx': 'Just text' }, 'missing frontmatter'],
    ['a lesson outside a track folder', { 'lessons/loose.mdx': 'x' }, 'go in a track folder'],
    ['a lesson in the wrong track folder', {
      'lessons/engineering/a.mdx': fm({ title: 'L', description: 'D', authors: '[me]', status: 'draft', track: 'foundations', level: 'starter', date: '2026-10-14' }),
    }, 'doesn\'t match its folder'],
    ['a breakdown without a demo', {
      'breakdowns/x/index.mdx': fm({ title: 'B', description: 'D', authors: '[me]', status: 'draft', tags: '[time]', date: '2026-10-14' }),
    }, 'missing Demo.tsx'],
    ['a demo without a default export', {
      'breakdowns/x/index.mdx': fm({ title: 'B', description: 'D', authors: '[me]', status: 'draft', tags: '[time]', date: '2026-10-14' }),
      'breakdowns/x/Demo.tsx': 'export const Demo = () => null;',
    }, 'needs a default export'],
    ['a resource link that is not a URL', {
      'resources/r.mdx': fm({ title: 'R', description: 'D', authors: '[me]', status: 'draft', kind: 'book', creator: 'Someone', link: 'not-a-url', date: '2026-10-14' }),
    }, 'link:'],
    ['a cover that is not a /public path', {
      'resources/r.mdx': fm({ title: 'R', description: 'D', authors: '[me]', status: 'draft', kind: 'book', creator: 'Someone', link: 'https://example.com', cover: 'https://cdn.example.com/c.jpg', date: '2026-10-14' }),
    }, 'must be a /public path'],
    ['an unknown folder', { 'stuff/a.mdx': essay() }, 'unknown folder'],
  ])('rejects %s', (_label, files, message) => {
    const problems = problemsFor(files as Record<string, string>);
    expect(problems.join('\n')).toContain(message);
  });

  it('rejects the same slug twice', () => {
    const problems = problemsFor({ 'essays/same.md': essay(), 'essays/same.mdx': essay() });
    expect(problems.join('\n')).toContain('duplicate slug "same"');
  });

  it('makes getEntries throw one error listing every problem', () => {
    makeContent({ 'essays/a.mdx': essay({ status: 'done' }), 'essays/b.mdx': essay({ date: 'yesterday' }) });
    let error: unknown;
    try {
      getEntries('essays');
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(ContentError);
    expect((error as ContentError).problems).toHaveLength(2);
  });
});
