/**
 * Small mono label with an index, e.g. "(02) — Spaces".
 * @param {{ num?: string, children: React.ReactNode, className?: string, dot?: boolean }} props
 */
export function Eyebrow({ num, children, className = '', dot = false }) {
  return (
    <p className={`label flex items-center gap-2 ${className}`}>
      {dot && (
        <span className="relative flex size-2">
          <span className="ping-soft absolute inset-0 rounded-full bg-sun" />
          <span className="relative size-2 rounded-full bg-sun" />
        </span>
      )}
      {num && <span className="opacity-50">({num})</span>}
      <span>{children}</span>
    </p>
  );
}
