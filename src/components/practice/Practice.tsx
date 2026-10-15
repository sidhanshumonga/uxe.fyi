import FittsPractice from './FittsPractice';
import ContrastPractice from './ContrastPractice';
import StatesPractice from './StatesPractice';

// Interactive exercises for lessons, usable in MDX as <Practice name="…" />.
const PRACTICE = {
  fitts: FittsPractice,
  contrast: ContrastPractice,
  states: StatesPractice,
};

export function Practice({ name }: { name: string }) {
  const Component = PRACTICE[name as keyof typeof PRACTICE];
  if (!Component) throw new Error(`Unknown <Practice name="${name}">. Use one of: ${Object.keys(PRACTICE).join(', ')}`);
  return (
    <figure className="breakdown-demo practice">
      <Component />
    </figure>
  );
}
