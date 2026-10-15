// Frontmatter schemas for everything under content/.
// The format is documented for contributors in CONTRIBUTING.md#frontmatter —
// keep the two in sync.

import { z } from 'zod';

export const COLLECTIONS = ['essays', 'lessons', 'roadmaps', 'resources', 'breakdowns'] as const;
export type CollectionName = (typeof COLLECTIONS)[number];

export const STATUSES = ['draft', 'review', 'published'] as const;
export const ESSAY_TAGS = ['attention', 'time', 'trust', 'craft', 'motion'] as const;
export const LESSON_TRACKS = ['foundations', 'engineering', 'experience-design'] as const;
export const RESOURCE_KINDS = ['book', 'talk', 'tool', 'podcast', 'article'] as const;

// GitHub's own rules: alphanumeric or single hyphens, no leading/trailing hyphen, max 39 chars.
const githubHandle = z
  .string()
  .regex(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i, 'must be a GitHub handle, without the @');

// YAML parses an unquoted 2026-10-14 into a Date, a quoted one into a string.
// Accept both and normalise to 'YYYY-MM-DD'.
const isoDate = z
  .union([z.date(), z.string()])
  .transform((v, ctx) => {
    const s = v instanceof Date ? v.toISOString().slice(0, 10) : v;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s) || Number.isNaN(Date.parse(s))) {
      ctx.addIssue({ code: 'custom', message: 'must be a date like 2026-10-14' });
      return z.NEVER;
    }
    return s;
  });

const base = {
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(300),
  authors: z.array(githubHandle).min(1, 'add at least one GitHub handle'),
  status: z.enum(STATUSES),
  date: isoDate,
  updated: isoDate.optional(),
};

// strictObject: unknown keys are errors, so a typo like `author:` fails CI
// instead of silently dropping the credit.
export const schemas = {
  essays: z.strictObject({
    ...base,
    tags: z.array(z.enum(ESSAY_TAGS)).min(1),
  }),
  lessons: z.strictObject({
    ...base,
    track: z.enum(LESSON_TRACKS),
    tags: z.array(z.string()).optional(),
  }),
  roadmaps: z.strictObject({
    ...base,
    tags: z.array(z.string()).optional(),
  }),
  resources: z.strictObject({
    ...base,
    kind: z.enum(RESOURCE_KINDS),
    link: z.url(),
    tags: z.array(z.string()).optional(),
  }),
  breakdowns: z.strictObject({
    ...base,
    tags: z.array(z.enum(ESSAY_TAGS)).min(1),
  }),
} satisfies Record<CollectionName, z.ZodType>;

export type Frontmatter<C extends CollectionName> = z.output<(typeof schemas)[C]>;
