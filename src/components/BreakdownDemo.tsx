import { BREAKDOWN_DEMOS } from '@/generated/breakdown-demos';

// Renders a breakdown's live demo by slug. Also available in MDX as
// <Demo name="<breakdown-slug>" caption="…" />.
export function BreakdownDemo({ slug, caption }: { slug: string; caption?: string }) {
  const Component = BREAKDOWN_DEMOS[slug];
  if (!Component) {
    throw new Error(`No demo for breakdown "${slug}". Known: ${Object.keys(BREAKDOWN_DEMOS).join(', ')}`);
  }
  return (
    <figure className="breakdown-demo">
      <Component />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** MDX adapter: <Demo name="…" caption="…" />. */
export function MdxDemo({ name, caption }: { name: string; caption?: string }) {
  return <BreakdownDemo slug={name} caption={caption} />;
}
