// Validates every file under content/ against the frontmatter schemas.
// Run: npm run content:check   (CI runs it on every PR)

import { checkAllContent } from '../src/lib/content/loader';

const { counts, problems } = checkAllContent();

const summary = Object.entries(counts).map(([c, n]) => `${c}: ${n}`).join(' · ');

if (problems.length) {
  console.error(`\n✗ content/ has ${problems.length} problem${problems.length === 1 ? '' : 's'}:\n`);
  for (const p of problems) console.error(`  - ${p}`);
  console.error('\nThe format is described in CONTRIBUTING.md#writing-content.\n');
  process.exit(1);
}

console.log(`✓ content/ is valid (${summary})`);
