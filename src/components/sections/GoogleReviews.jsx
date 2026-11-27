import { ArrowUpRight, Star } from 'lucide-react';
import { GOOGLE_RATING, REVIEWS } from '../../data/reviews.js';
import { GoogleIcon } from '../ui/Icons.jsx';
import { Eyebrow } from '../ui/Eyebrow.jsx';
import { Marquee } from '../ui/Marquee.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { SplitWords } from '../ui/SplitWords.jsx';

const MAX_STARS = 5;
const DAY_MS = 86_400_000;
const ROW_SPEED = 70; // seconds per loop — slow enough to read
const AVATAR_TONES = ['bg-sun text-on-sun', 'bg-ink-soft text-cream', 'bg-graphite text-cream'];
const relative = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

/**
 * "3 weeks ago" style date, worked out from today so it never goes stale.
 * @param {string} isoDate YYYY-MM-DD
 * @returns {string}
 */
function timeAgo(isoDate) {
  const days = Math.round((new Date(isoDate).getTime() - Date.now()) / DAY_MS);
  const abs = Math.abs(days);
  if (abs < 7) return relative.format(days, 'day');
  if (abs < 30) return relative.format(Math.round(days / 7), 'week');
  if (abs < 365) return relative.format(Math.round(days / 30), 'month');
  return relative.format(Math.round(days / 365), 'year');
}

/** @param {{ value: number, size?: number, emptyClass?: string }} props */
function Stars({ value, size = 16, emptyClass = 'fill-ink/15' }) {
  const filled = Math.round(value);
  return (
    <span className="flex items-center gap-0.5" role="img" aria-label={`${value} out of ${MAX_STARS} stars`}>
      {Array.from({ length: MAX_STARS }, (_, i) => (
        <Star key={i} size={size} strokeWidth={0} aria-hidden="true" className={i < filled ? 'fill-star' : emptyClass} />
      ))}
    </span>
  );
}

/**
 * Reviewer photo, or a Google-style coloured initial when there is none.
 * @param {{ name: string, photo?: string, index: number }} props
 */
function Avatar({ name, photo, index }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt=""
        width={40}
        height={40}
        loading="lazy"
        referrerPolicy="no-referrer"
        className="size-10 shrink-0 rounded-full object-cover ring-2 ring-paper shadow-[0_4px_14px_-4px_rgb(0_0_0/0.25)]"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`grid size-10 shrink-0 place-items-center rounded-full text-base font-semibold ${AVATAR_TONES[index % AVATAR_TONES.length]}`}
    >
      {name.charAt(0)}
    </span>
  );
}

/** @param {{ review: import('../../data/reviews.js').Review, index: number }} props */
function ReviewCard({ review, index }) {
  return (
    <article className="group mr-4 flex w-[280px] flex-col self-stretch whitespace-normal rounded-[22px] bg-paper p-5 text-ink transition-transform duration-500 ease-expo hover:-translate-y-1 sm:w-[330px]">
      <div className="flex items-center justify-between">
        <Stars value={review.stars} size={15} />
        <GoogleIcon size={18} />
      </div>
      <p className="mt-3 line-clamp-3 flex-1 text-[0.95rem] leading-relaxed text-ink/80">“{review.text}”</p>
      <footer className="mt-4 flex items-center gap-3 border-t border-ink/10 pt-4">
        <Avatar name={review.name} photo={review.photo} index={index} />
        <div className="min-w-0">
          <p className="truncate text-[0.95rem] font-semibold leading-tight">{review.name}</p>
          <p className="truncate text-[0.8rem] text-graphite">
            {review.role ? `${review.role} · ` : ''}
            {timeAgo(review.date)}
          </p>
        </div>
      </footer>
    </article>
  );
}

/** Star-level bars, 5★ at the top, like the summary on a Google profile. */
function Breakdown({ shares }) {
  return (
    <ul className="hidden w-full space-y-1 sm:block" aria-label="Rating breakdown">
      {shares.map((share, i) => {
        const level = MAX_STARS - i;
        return (
          <li key={level} className="flex items-center gap-3 text-xs text-cream/60">
            <span className="w-2 font-mono">{level}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-cream/10">
              <span className="block h-full rounded-full bg-star" style={{ width: `${share}%` }} />
            </span>
            <span className="w-8 text-right font-mono">{share}%</span>
          </li>
        );
      })}
    </ul>
  );
}

/** The overall Google score laid out in one row: score, star bars, link out to the listing. */
function RatingPanel() {
  const { rating, count, breakdown, url } = GOOGLE_RATING;
  return (
    <div className="grid items-center gap-5 rounded-[24px] border border-cream/10 bg-cream/[0.04] p-5 sm:grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] md:gap-7">
      <div className="flex items-center gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-paper">
          <GoogleIcon size={26} />
        </span>
        <span className="text-[3rem] font-semibold leading-none tracking-tight">{rating.toFixed(1)}</span>
        <div>
          <Stars value={rating} size={18} emptyClass="fill-cream/20" />
          <p className="mt-1 text-sm text-cream/60">{count}+ Google reviews</p>
        </div>
      </div>
      <Breakdown shares={breakdown} />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-sun px-5 py-2.5 text-sm font-semibold text-on-sun transition-transform duration-300 hover:-translate-y-0.5 sm:col-span-2 md:col-span-1"
      >
        See all on Google <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </div>
  );
}

/** Google reviews on a dark band above the closing CTA: heading and score on top, a slow full-width row of review cards below. */
export function GoogleReviews() {
  const cards = REVIEWS.map((review, i) => <ReviewCard key={review.name} review={review} index={i} />);

  return (
    <section className="relative overflow-hidden bg-ink text-cream sec-tight" aria-labelledby="reviews-title">
      <div className="wrap grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-5">
          <Eyebrow dot className="text-cream/60">
            Reviews on Google
          </Eyebrow>
          <SplitWords id="reviews-title" text="Multan works here, *and says so.*" className="t-h2 mt-4 max-w-md" />
        </div>
        <Reveal className="lg:col-span-7" delay={0.1}>
          <RatingPanel />
        </Reveal>
      </div>

      <Reveal className="mt-8 md:mt-10" delay={0.15}>
        <Marquee items={cards} speed={ROW_SPEED} label="Google reviews from Let's Work members" />
      </Reveal>
    </section>
  );
}
