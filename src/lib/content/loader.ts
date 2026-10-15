// Reads and validates Markdown/MDX content from content/.
//
//   content/essays/<slug>.mdx
//   content/lessons/<track>/<slug>.mdx
//   content/roadmaps/<slug>.mdx
//   content/resources/<slug>.mdx
//   content/breakdowns/<slug>/index.mdx   (+ Demo.tsx)
//
// Files and folders starting with "_" (templates) and README.md are ignored.
// Server-only: uses the filesystem. Imports stay relative so scripts/ can run
// this file directly with tsx.

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { COLLECTIONS, schemas, type CollectionName, type Frontmatter } from './schema';

/** The content folder. UXE_CONTENT_DIR overrides it (used by the tests). */
export const contentDir = () => process.env.UXE_CONTENT_DIR ?? path.join(process.cwd(), 'content');

const EXTENSIONS = ['.mdx', '.md'];
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const WORDS_PER_MINUTE = 220;

export interface Entry<C extends CollectionName = CollectionName> {
  collection: C;
  slug: string;
  /** Repo-relative path, for error messages and "edit on GitHub" links. */
  file: string;
  frontmatter: Frontmatter<C>;
  /** Raw MDX body, without frontmatter. */
  body: string;
  readingMinutes: number;
  /** Breakdowns only: repo-relative path to the demo component. */
  demo?: string;
}

export class ContentError extends Error {
  constructor(public readonly problems: string[]) {
    super(`Invalid content (${problems.length} problem${problems.length === 1 ? '' : 's'}):\n  - ${problems.join('\n  - ')}`);
    this.name = 'ContentError';
  }
}

// Paths relative to the folder that contains content/, e.g. "content/essays/x.mdx".
const rel = (p: string) => path.relative(path.dirname(contentDir()), p).split(path.sep).join('/');
const isIgnored = (name: string) => name.startsWith('_') || name.startsWith('.') || name.toLowerCase() === 'readme.md';
const isContentFile = (name: string) => EXTENSIONS.includes(path.extname(name));

function listDir(dir: string): fs.Dirent[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).filter((d) => !isIgnored(d.name));
}

interface RawFile {
  abs: string;
  slug: string;
  /** Lessons: the track folder the file sits in. */
  folder?: string;
  demo?: string;
}

// Find candidate files for a collection, reporting files in the wrong place.
function discover(collection: CollectionName, problems: string[]): RawFile[] {
  const root = path.join(contentDir(), collection);
  const files: RawFile[] = [];
  const stray = (p: string, hint: string) => problems.push(`${rel(p)}: ${hint}`);

  for (const d of listDir(root)) {
    const abs = path.join(root, d.name);

    if (collection === 'lessons') {
      if (!d.isDirectory()) { stray(abs, 'lessons go in a track folder, e.g. content/lessons/foundations/<slug>.mdx'); continue; }
      for (const f of listDir(abs)) {
        const fAbs = path.join(abs, f.name);
        if (f.isFile() && isContentFile(f.name)) files.push({ abs: fAbs, slug: path.parse(f.name).name, folder: d.name });
        else stray(fAbs, 'expected a .mdx or .md file');
      }
      continue;
    }

    if (collection === 'breakdowns') {
      if (!d.isDirectory()) { stray(abs, 'breakdowns are folders: content/breakdowns/<slug>/index.mdx + Demo.tsx'); continue; }
      const index = EXTENSIONS.map((ext) => path.join(abs, `index${ext}`)).find((p) => fs.existsSync(p));
      if (!index) { stray(abs, 'missing index.mdx'); continue; }
      const demo = path.join(abs, 'Demo.tsx');
      if (!fs.existsSync(demo)) stray(abs, 'missing Demo.tsx');
      else if (!/export\s+default\b/.test(fs.readFileSync(demo, 'utf8'))) stray(demo, 'Demo.tsx needs a default export (export default function Demo…)');
      files.push({ abs: index, slug: d.name, demo: fs.existsSync(demo) ? rel(demo) : undefined });
      continue;
    }

    if (d.isFile() && isContentFile(d.name)) files.push({ abs, slug: path.parse(d.name).name });
    else stray(abs, `expected content/${collection}/<slug>.mdx`);
  }
  return files;
}

function parse<C extends CollectionName>(collection: C, raw: RawFile, problems: string[]): Entry<C> | null {
  const file = rel(raw.abs);
  const fail = (msg: string) => { problems.push(`${file}: ${msg}`); return null; };

  if (!SLUG.test(raw.slug)) return fail(`"${raw.slug}" is not a valid slug — use lowercase-words-with-hyphens`);

  let data: Record<string, unknown>, body: string;
  try {
    ({ data, content: body } = matter(fs.readFileSync(raw.abs, 'utf8')));
  } catch (e) {
    return fail(`frontmatter is not valid YAML (${(e as Error).message.split('\n')[0]})`);
  }
  if (Object.keys(data).length === 0) return fail('missing frontmatter — see CONTRIBUTING.md#frontmatter');

  const result = schemas[collection].safeParse(data);
  if (!result.success) {
    for (const issue of result.error.issues) {
      const key = issue.path.join('.') || '(frontmatter)';
      const msg =
        issue.code === 'unrecognized_keys' ? `unknown field(s) ${issue.keys.join(', ')}`
        : issue.code === 'invalid_type' && issue.message.endsWith('received undefined') ? 'is required'
        : issue.message;
      problems.push(`${file}: ${key}: ${msg}`);
    }
    return null;
  }
  const frontmatter = result.data as Frontmatter<C>;

  if (collection === 'lessons' && 'track' in frontmatter && frontmatter.track !== raw.folder) {
    return fail(`track "${frontmatter.track}" doesn't match its folder "${raw.folder}"`);
  }

  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    collection,
    slug: raw.slug,
    file,
    frontmatter,
    body,
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    ...(raw.demo ? { demo: raw.demo } : {}),
  };
}

function load<C extends CollectionName>(collection: C, problems: string[]): Entry<C>[] {
  const entries: Entry<C>[] = [];
  const seen = new Map<string, string>();
  for (const raw of discover(collection, problems)) {
    const entry = parse(collection, raw, problems);
    if (!entry) continue;
    const key = `${raw.folder ?? ''}/${entry.slug}`;
    const dupe = seen.get(key);
    if (dupe) { problems.push(`${entry.file}: duplicate slug "${entry.slug}" (also used by ${dupe})`); continue; }
    seen.set(key, entry.file);
    entries.push(entry);
  }
  return entries.sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date) || a.slug.localeCompare(b.slug));
}

/**
 * All valid entries in a collection, newest first. Throws a ContentError
 * listing every problem if any file is invalid, so a bad file fails the build.
 */
export function getEntries<C extends CollectionName>(
  collection: C,
  { includeDrafts = false }: { includeDrafts?: boolean } = {},
): Entry<C>[] {
  const problems: string[] = [];
  const entries = load(collection, problems);
  if (problems.length) throw new ContentError(problems);
  return includeDrafts ? entries : entries.filter((e) => e.frontmatter.status === 'published');
}

export function getEntry<C extends CollectionName>(
  collection: C,
  slug: string,
  opts?: { includeDrafts?: boolean },
): Entry<C> | undefined {
  return getEntries(collection, opts).find((e) => e.slug === slug);
}

/** Validate every collection without throwing. Used by `npm run content:check`. */
export function checkAllContent(): { counts: Record<CollectionName, number>; problems: string[] } {
  const problems: string[] = [];
  const counts = {} as Record<CollectionName, number>;
  for (const c of COLLECTIONS) counts[c] = load(c, problems).length;

  for (const d of listDir(contentDir())) {
    if (d.isDirectory() && !(COLLECTIONS as readonly string[]).includes(d.name)) {
      problems.push(`content/${d.name}: unknown folder — expected one of ${COLLECTIONS.join(', ')}`);
    }
  }
  return { counts, problems };
}
