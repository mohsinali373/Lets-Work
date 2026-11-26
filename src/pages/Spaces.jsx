import { Page } from '../components/layout/Page.jsx';
import { SplitWords } from '../components/ui/SplitWords.jsx';
import { Intro } from '../components/ui/PageIntro.jsx';
import { Eyebrow } from '../components/ui/Eyebrow.jsx';
import { Bridge } from '../components/ui/Bridge.jsx';
import { HoverList } from '../components/spaces/HoverList.jsx';
import { SpaceFinder } from '../components/spaces/SpaceFinder.jsx';
import { Steps } from '../components/sections/Steps.jsx';
import { FlexTerms } from '../components/sections/FlexTerms.jsx';
import { CtaBand } from '../components/sections/CtaBand.jsx';

const STEPS = [
  { title: 'Message us', text: "WhatsApp or call 0326-6802515. Tell us roughly what you need — that's it." },
  { title: 'Take the free tour', text: 'Walk the floor, try the chairs, see the rooms. Ask anything.' },
  { title: 'Move in', text: 'Pick your plan and start working — instant offices are ready the same day.' },
];

export function Spaces() {
  return (
    <Page title="All Workspaces" description="Compare Let's Work spaces in Multan: coworking, dedicated desks, private offices, meeting rooms and instant offices.">
      <section className="wrap grid gap-10 pb-12 pt-32 md:pt-40 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Intro delay={0.4}>
            <Eyebrow>All spaces</Eyebrow>
          </Intro>
          <SplitWords as="h1" onMount delay={0.5} text="Five rooms. *One* address." className="t-display mt-5" />
          <Intro as="p" delay={0.9} className="t-lead mt-6 max-w-lg">
            Every space comes with the same fast internet, the same chai and the same people. What changes is how much
            room — and privacy — you get.
          </Intro>
        </div>
        <Intro delay={1} className="lg:col-span-5">
          <SpaceFinder />
        </Intro>
      </section>

      <section className="wrap pb-16 md:pb-24" aria-label="Spaces list">
        <HoverList />
      </section>

      <section className="bg-ink text-cream">
        <div className="wrap sec grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SplitWords text="Pay for the time *you actually use.*" className="t-h2" />
            <p className="mt-5 max-w-sm text-cream/60">
              Book any space by the hour, day or week. No lease, no deposit drama, no hidden fees.
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
