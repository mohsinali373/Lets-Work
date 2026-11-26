import { ArrowDown } from 'lucide-react';
import { Reveal } from './Reveal.jsx';

/**
 * The one-line hand-off at the end of a section that sets up the next one,
 * so the page reads like a conversation instead of stacked blocks.
 * @param {{ children: React.ReactNode, className?: string }} props
 */
export function Bridge({ children, className = '' }) {
  return (
    <Reveal className={`flex items-center gap-4 md:gap-6 ${className}`}>
      <span className="h-px flex-1 bg-current opacity-20" />
      <p className="accent text-center text-xl leading-tight md:text-2xl">{children}</p>
      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-current/25">
        <ArrowDown size={16} aria-hidden="true" />
      </span>
    </Reveal>
  );
}
