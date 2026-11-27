/**
 * Infinite horizontal ticker. The row is rendered twice so the loop is seamless.
 * @param {{ items: React.ReactNode[], speed?: number, className?: string, itemClassName?: string, separator?: React.ReactNode, label?: string }} props
 */
export function Marquee({ items, speed = 32, className = '', itemClassName = '', separator = null, label }) {
  const row = items.map((item, i) => (
    <div key={i} className={`flex shrink-0 items-center ${itemClassName}`}>
      {item}
      {separator}
    </div>
  ));
  return (
    <div className={`marquee overflow-hidden ${className}`} role={label ? 'region' : undefined} aria-label={label}>
      <div className="marquee-track" style={{ '--marquee-speed': `${speed}s` }}>
        <div className="flex shrink-0">{row}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {row}
        </div>
      </div>
    </div>
  );
}
