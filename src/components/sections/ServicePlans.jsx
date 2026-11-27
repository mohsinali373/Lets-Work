import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { waLink } from '../../data/site.js';
import { PlanCard } from '../home/PlanCard.jsx';
import { Button } from '../ui/Button.jsx';
import { Eyebrow } from '../ui/Eyebrow.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { SplitWords } from '../ui/SplitWords.jsx';

const listVariants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const COLS = { 1: 'lg:grid-cols-1 lg:max-w-md', 2: 'md:grid-cols-2 lg:max-w-4xl', 3: 'lg:grid-cols-3' };

/**
 * The monthly plans that belong to one service page, with the same cards as the home page
 * plus a "good to know" box of details.
 * @param {{ id: string, eyebrow: string, title: string, intro: string, plans: object[], kind: 'solo'|'team',
 *           details: string[], askMessage: string }} props
 */
export function ServicePlans({ id, eyebrow, title, intro, plans, kind, details, askMessage }) {
  const titleId = `${id}-plans-title`;

  return (
    <section className="relative overflow-hidden bg-ink text-cream" aria-labelledby={titleId}>
      <div className="pointer-events-none absolute -left-40 top-1/3 size-[34rem] rounded-full bg-sun/10 blur-[120px]" aria-hidden="true" />

      <div className="wrap sec relative">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow className="text-sun">{eyebrow}</Eyebrow>
            <SplitWords id={titleId} text={title} className="t-h2 mt-4 [&_.accent]:text-sun" />
          </div>
          <Reveal as="p" className="text-cream/60 md:col-span-4 md:col-start-9" delay={0.1}>
            {intro}
          </Reveal>
        </div>

        <motion.ul
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className={`mx-auto mt-10 grid grid-cols-1 gap-5 [perspective:1400px] lg:gap-6 ${COLS[plans.length] ?? COLS[3]}`}
        >
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} kind={kind} index={i} />
          ))}
        </motion.ul>

        <Reveal className="mt-10 grid gap-6 rounded-[28px] bg-white/[0.04] p-6 ring-1 ring-white/10 md:grid-cols-12 md:items-center md:p-8">
          <div className="md:col-span-8">
            <p className="label text-sun">Good to know</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {details.map((d) => (
                <li key={d} className="flex items-start gap-2.5 text-sm text-cream/75">
                  <Check size={16} className="mt-0.5 shrink-0 text-sun" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4 md:text-right">
            <Button href={waLink(askMessage)}>Ask about these plans</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
