import { OptimisticDemo, SkeletonDemo, SearchDemo, EasingDemo, FormDemo, EmptyStateDemo } from './Demos';

// Live breakdown demos, usable in MDX as <Demo name="optimistic" caption="…" />.
const DEMOS = {
  optimistic: OptimisticDemo,
  skeleton: SkeletonDemo,
  search: SearchDemo,
  easing: EasingDemo,
  form: FormDemo,
  empty: EmptyStateDemo,
};

export type DemoName = keyof typeof DEMOS;

export function EssayDemo({ name, caption }: { name: DemoName; caption?: string }) {
  const Component = DEMOS[name];
  if (!Component) throw new Error(`Unknown <Demo name="${name}">. Use one of: ${Object.keys(DEMOS).join(', ')}`);
  return (
    <figure className="prose-demo">
      <Component />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
