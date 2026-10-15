# content/

Everything people read on uxe.fyi lives here as Markdown (MDX), one file per piece.

```
content/
├── essays/<slug>.mdx
├── lessons/<track>/<slug>.mdx      # track: foundations | engineering | experience-design
├── roadmaps/<slug>.mdx
├── resources/<slug>.mdx
├── breakdowns/<slug>/
│   ├── index.mdx
│   └── Demo.tsx
└── _templates/                     # copy one of these to start
```

**To start a new piece:** copy the matching file from [`_templates/`](_templates), rename it to your slug (`lowercase-words-with-hyphens`), and fill in the frontmatter.

**Before you open a PR**, run:

```bash
npm run content:check
```

It checks every file's frontmatter and tells you exactly what to fix: a missing field, a typo like `author:` instead of `authors:`, a date in the wrong format, or a lesson in the wrong track folder. CI runs the same check on every PR.

Only pieces with `status: published` appear on uxe.fyi. `draft` and `review` pieces show in `npm run dev` with a banner, so you can preview them at their real URL (essays: `/thinking/<slug>`).

The full guide (what to write, how long, voice and style) is in [CONTRIBUTING.md](../CONTRIBUTING.md#writing-content).
