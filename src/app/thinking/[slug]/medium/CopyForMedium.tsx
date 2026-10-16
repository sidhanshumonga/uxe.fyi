'use client';

import { useState } from 'react';
import { Icon } from '@/components/Icon';

// Copies the article as rich HTML (plus plain text), ready to paste into a new Medium story.
export function CopyForMedium({ targetId }: { targetId: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const copy = async () => {
    const el = document.getElementById(targetId);
    if (!el) return;
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([el.innerHTML], { type: 'text/html' }),
          'text/plain': new Blob([el.innerText], { type: 'text/plain' }),
        }),
      ]);
      setState('copied');
    } catch {
      // Fallback for browsers or frames without the async clipboard API:
      // select the article and use the legacy copy command (keeps rich HTML).
      const sel = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(el);
      sel?.removeAllRanges();
      sel?.addRange(range);
      const ok = document.execCommand('copy');
      sel?.removeAllRanges();
      setState(ok ? 'copied' : 'failed');
    }
    setTimeout(() => setState('idle'), 2500);
  };
  return (
    <button type="button" className="btn primary" onClick={copy} aria-live="polite">
      <Icon name={state === 'copied' ? 'check' : 'arrow'} size={14} />
      {state === 'copied' ? 'Copied — paste into a new Medium story' : state === 'failed' ? 'Copy failed — select the article and copy instead' : 'Copy for Medium'}
    </button>
  );
}
