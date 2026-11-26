import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const MotionLink = motion.create(Link);
const SPRING = { stiffness: 220, damping: 16, mass: 0.4 };

/**
 * Pill button with a magnetic pull, rolling label and rotating arrow.
 * Pass `to` for internal routes or `href` for tel:, mailto: and external links.
 * @param {{ to?: string, href?: string, variant?: 'sun'|'ink'|'ghost'|'glass', icon?: any, magnetic?: boolean, className?: string, children: React.ReactNode }} props
 */
export function Button({ to, href, variant = 'sun', icon = ArrowUpRight, magnetic = true, className = '', children, ...rest }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);

  function handleMove(e) {
    if (!magnetic || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.2);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const Icon = icon;
  const content = (
    <>
      <span className="roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {Icon && (
        <span className="btn-ico">
          <Icon size={17} strokeWidth={2.2} aria-hidden="true" />
        </span>
      )}
    </>
  );
  const shared = {
    ref,
    style: { x: sx, y: sy },
    onPointerMove: handleMove,
    onPointerLeave: reset,
    className: `btn btn-${variant} ${Icon ? '' : 'btn-noicon'} ${className}`,
    ...rest,
  };

  if (to) {
    return (
      <MotionLink to={to} {...shared}>
        {content}
      </MotionLink>
    );
  }
  const external = href?.startsWith('http');
  return (
    <motion.a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...shared}>
      {content}
    </motion.a>
  );
}
