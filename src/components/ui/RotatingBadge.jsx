import { useId } from 'react';

/**
 * Circular rotating text sticker, e.g. "BOOK A FREE TOUR •".
 * @param {{ text: string, className?: string, center?: React.ReactNode }} props
 */
export function RotatingBadge({ text, className = '', center = null }) {
  const id = useId().replace(/:/g, '');
  return (
    <span className={`relative grid place-items-center ${className}`}>
      <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 size-full" aria-hidden="true">
        <defs>
          <path id={`c-${id}`} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current" style={{ fontFamily: 'var(--font-mono)', fontSize: 15.5, letterSpacing: 3.2 }}>
          <textPath href={`#c-${id}`}>{text}</textPath>
        </text>
      </svg>
      <span className="relative">{center}</span>
    </span>
  );
}
