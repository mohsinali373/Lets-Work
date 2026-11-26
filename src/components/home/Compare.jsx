import { Check, Minus, X } from 'lucide-react';
import { SplitWords } from '../ui/SplitWords.jsx';
import { Eyebrow } from '../ui/Eyebrow.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { Bridge } from '../ui/Bridge.jsx';
import { ScrollTilt } from '../ui/ScrollTilt.jsx';

const ROWS = [
  { label: 'Wi-Fi you can trust on a client call', cafe: 'meh', home: 'meh' },
  { label: 'Quiet when you need to focus', cafe: 'no', home: 'meh' },
  { label: 'A proper room to meet a client', cafe: 'no', home: 'no' },
  { label: 'An address that looks professional', cafe: 'no', home: 'no' },
  { label: 'Parking without the hunt', cafe: 'meh', home: 'yes' },
  { label: 'Tea without buying another cup', cafe: 'no', home: 'yes' },
  { label: 'People to learn from and work with', cafe: 'meh', home: 'no' },
];

const MARK = {
  yes: { Icon: Check, cls: 'bg-ink text-cream', sr: 'Yes' },
  meh: { Icon: Minus, cls: 'bg-ink/8 text-ink/60', sr: 'Sometimes' },
  no: { Icon: X, cls: 'bg-transparent text-ink/35', sr: 'No' },
};

function Mark({ value }) {
  const { Icon, cls, sr } = MARK[value];
  return (
    <span className={`grid size-7 place-items-center rounded-full md:size-8 ${cls}`}>
      <Icon size={15} strokeWidth={2.4} aria-hidden="true" />
      <span className="sr-only">{sr}</span>
    </span>
  );
}

/** Café vs home vs Let's Work — the "why pay for a desk" hook. */
export function Compare() {
  return (
    <section className="wrap sec" aria-labelledby="compare-title">
      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <Eyebrow num="04">Honest comparison</Eyebrow>
          <SplitWords id="compare-title" text="Why not just work from a *café?*" className="t-h2 mt-4" />
        </div>
        <Reveal as="p" className="t-lead md:col-span-4 md:col-start-9" delay={0.1}>
          Fair question — most of our members asked it too. Then they tried taking a client call next to the espresso
          machine.
        </Reveal>
      </div>

      <ScrollTilt className="mt-12">
        <table className="w-full border-separate border-spacing-0 text-left text-[0.92rem] md:text-base">
          <thead>
            <tr>
              <th scope="col" className="w-[44%] pb-4 font-normal md:w-[46%]">
                <span className="label text-graphite">What you need</span>
              </th>
              <th scope="col" className="pb-4 text-center font-medium">Café</th>
              <th scope="col" className="pb-4 text-center font-medium">Home</th>
              <th scope="col" className="rounded-t-[22px] bg-sun px-1 pb-4 pt-5 text-center font-semibold leading-tight">Let's Work</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, i) => {
              const last = i === ROWS.length - 1;
              return (
                <tr key={r.label} className="group">
                  <th scope="row" className="border-t border-ink/10 py-4 pr-4 font-medium transition-colors group-hover:text-sun-deep">
                    {r.label}
                  </th>
                  <td className="border-t border-ink/10 py-4">
                    <span className="flex justify-center"><Mark value={r.cafe} /></span>
                  </td>
                  <td className="border-t border-ink/10 py-4">
                    <span className="flex justify-center"><Mark value={r.home} /></span>
                  </td>
                  <td className={`border-t border-ink/10 bg-sun py-4 ${last ? 'rounded-b-[22px] pb-5' : ''}`}>
                    <span className="flex justify-center"><Mark value="yes" /></span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </ScrollTilt>

      <Bridge className="mt-14">And that's before we get to the amenities.</Bridge>
    </section>
  );
}
