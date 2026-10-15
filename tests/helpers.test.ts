import { describe, expect, it } from 'vitest';
import { contrastRatio } from '@/components/practice/ContrastPractice';
import { h2Headings, headingId } from '@/lib/content/headings';
import { relative } from '@/components/CommunityComponents';
import { kindOf } from '@/lib/github';

describe('contrastRatio (WCAG 2)', () => {
  it.each([
    ['#000000', '#FFFFFF', 21],
    ['#FFFFFF', '#FFFFFF', 1],
    ['#777777', '#FFFFFF', 4.48],
    ['#767676', '#FFFFFF', 4.54], // the lightest grey that passes AA on white
    ['#FFF', '#000', 21], // 3-digit hex
  ])('%s on %s ≈ %s:1', (a, b, expected) => {
    expect(contrastRatio(a, b)).toBeCloseTo(expected, 2);
  });

  it('is symmetric', () => {
    expect(contrastRatio('#FF3D88', '#0B0B0A')).toBeCloseTo(contrastRatio('#0B0B0A', '#FF3D88'), 10);
  });
});

describe('headings', () => {
  it('slugs heading text the same way the renderer does', () => {
    expect(headingId('Fitts’s law')).toBe('fitts-s-law');
    expect(headingId('1. `visibility: hidden` is inherited')).toBe('1-visibility-hidden-is-inherited');
  });

  it('finds level-2 headings and skips fenced code', () => {
    const body = ['## One', 'text', '```md', '## Not a heading', '```', '### Smaller', '## Two **bold**'].join('\n');
    expect(h2Headings(body)).toEqual([
      { text: 'One', id: 'one' },
      { text: 'Two bold', id: 'two-bold' },
    ]);
  });
});

describe('relative time', () => {
  const now = Date.parse('2026-10-15T12:00:00Z');
  const ago = (ms: number) => new Date(now - ms).toISOString();
  it.each([
    [ago(20_000), 'just now'],
    [ago(5 * 60_000), '5m ago'],
    [ago(3 * 3_600_000), '3h ago'],
    [ago(30 * 3_600_000), 'yesterday'],
    [ago(5 * 86_400_000), '5 days ago'],
    ['2026-08-01T00:00:00Z', 'Aug 1'],
  ])('%s → %s', (iso, expected) => {
    expect(relative(iso, now)).toBe(expected);
  });
});

describe('commit kinds for the activity feed', () => {
  it.each([
    ['feat(readers): lesson layouts', 'ship'],
    ['content: two essays', 'essay'],
    ['docs: CONTRIBUTING', 'essay'],
    ['fix(rss): only published', 'review'],
    ['chore(deps): bump next', 'review'],
    ['Merge pull request #12', 'merge'],
    ['Add a thing', 'ship'],
  ])('%s → %s', (message, kind) => {
    expect(kindOf(message)).toBe(kind);
  });
});
