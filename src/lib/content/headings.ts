// Section headings for an MDX body, used for the lesson table of contents.
// Ids are derived the same way as the <h2> renderer in components/Mdx.tsx.

export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Level-2 headings ("## …") outside fenced code blocks. */
export function h2Headings(body: string): { text: string; id: string }[] {
  const out: { text: string; id: string }[] = [];
  let inFence = false;
  for (const line of body.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    else if (!inFence && line.startsWith('## ')) {
      const text = line.slice(3).trim().replace(/[`*_~]/g, '');
      out.push({ text, id: headingId(text) });
    }
  }
  return out;
}
