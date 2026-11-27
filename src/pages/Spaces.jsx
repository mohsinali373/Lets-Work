import { Page } from '../components/layout/Page.jsx';
import { PAGES } from '../data/seo.js';
import { SplitWords } from '../components/ui/SplitWords.jsx';
import { Eyebrow } from '../components/ui/Eyebrow.jsx';
import { Bridge } from '../components/ui/Bridge.jsx';
import { SpaceFinder } from '../components/spaces/SpaceFinder.jsx';
import { Steps } from '../components/sections/Steps.jsx';
import { FlexTerms } from '../components/sections/FlexTerms.jsx';
import { CtaBand } from '../components/sections/CtaBand.jsx';
import { SpacesBanner } from '../components/banners/SpacesBanner.jsx';

const STEPS = [
  { title: 'Message us', text: "WhatsApp or call 0326-6802515. Tell us roughly what you need — that's it." },
  { title: 'Take the free tour', text: 'Walk the floor, try the chairs, see the rooms. Ask anything.' },
  { title: 'Move in', text: 'Pick your plan and start working — instant offices are ready the same day.' },
];

export function Spaces() {
  return (
    <Page seo={PAGES.spaces}>
      <SpacesBanner />

      {/* not sure which one? a quick finder instead of a second list of the same five spaces */}
      <section className="wrap pb-16 md:pb-24" aria-labelledby="finder-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Eyebrow num="01">Not sure yet?</Eyebrow>
            <SplitWords id="finder-title" text="Let us *point you* to the right one." className="t-h2 mt-4" />
            <p className="mt-5 max-w-sm text-graphite">Answer a couple of quick questions and we'll suggest the space that fits how you work.</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <SpaceFinder />
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="wrap sec grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SplitWords text="Simple plans, *billed monthly.*" className="t-h2" />
            <p className="mt-5 max-w-sm text-cream/60">
              Every space runs on a monthly plan. No long lease and no hidden fees.
            </p>
          </div>
          <FlexTerms dark className="lg:col-span-7" />
        </div>
      </section>

      <section className="wrap sec">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SplitWords text="Three steps from *message* to desk." className="t-h2 max-w-2xl" />
        </div>
        <Steps steps={STEPS} />
        <Bridge className="mt-16">Ready for step one?</Bridge>
      </section>

      <CtaBand title="Pick a space. *We'll handle the rest.*" />
    </Page>
  );
}
