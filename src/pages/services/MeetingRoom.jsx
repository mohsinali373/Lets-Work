import { BriefcaseBusiness, GraduationCap, Handshake, Presentation, UserRound, Users } from 'lucide-react';
import { IMG } from '../../data/site.js';
import { FAQS } from '../../data/faqs.js';
import { Page } from '../../components/layout/Page.jsx';
import { SplitWords } from '../../components/ui/SplitWords.jsx';
import { Reveal } from '../../components/ui/Reveal.jsx';
import { Steps } from '../../components/sections/Steps.jsx';
import { FaqSection } from '../../components/sections/FaqSection.jsx';
import { RelatedSpaces } from '../../components/sections/RelatedSpaces.jsx';
import { CtaBand } from '../../components/sections/CtaBand.jsx';
import { ScrollTilt } from '../../components/ui/ScrollTilt.jsx';
import { MeetingRoomBanner } from '../../components/banners/MeetingRoomBanner.jsx';

const MSG = "Hi Let's Work! I'd like to book the meeting room on (date) at (time).";

const USES = [
  { icon: Handshake, title: 'Client pitches', text: 'Close the deal somewhere that looks like you mean business.' },
  { icon: BriefcaseBusiness, title: 'Interviews', text: 'A calm, private room your candidates will remember.' },
  { icon: Users, title: 'Team meetings', text: 'Get everyone round one table, off the group chat.' },
  { icon: GraduationCap, title: 'Training sessions', text: 'Room to teach, screen to present, chairs that last.' },
  { icon: Presentation, title: 'Presentations', text: 'Plug in, put it on the screen, own the room.' },
  { icon: UserRound, title: 'One-to-ones', text: 'A small room for the conversations that need privacy.' },
];

const STEPS = [
  { title: 'Send a date & time', text: 'WhatsApp or call us with when you need the room and roughly how many people.' },
  { title: 'We confirm the room', text: 'We check availability and lock it in for you — by the hour.' },
  { title: 'Walk in and start', text: 'Room set, internet on, refreshments on us. Just bring your agenda.' },
];

const SIZES = [
  { label: 'Team room', fits: 'One-to-ones · interviews · small teams', img: IMG.teamRoom },
  { label: 'Boardroom', fits: 'Team meetings · workshops · training', img: IMG.boardroomU },
];

export function MeetingRoom() {

  return (
    <Page
      title="Book a Premium Meeting Room in Multan"
      description="Book a premium meeting room at Let's Work Multan by the hour — modern tech, comfortable seating, rooms for one-to-ones up to full-team sessions."
    >
      <MeetingRoomBanner message={MSG} />

      <section className="wrap sec">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <SplitWords text="Built for the meetings *that matter.*" className="t-h2 md:col-span-7" />
          <Reveal as="p" className="text-graphite md:col-span-4 md:col-start-9">
            From a quick one-to-one to a full-team workshop — reserve the room and get convenience and professionalism in one.
          </Reveal>
        </div>
        <ScrollTilt from={18}>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {USES.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={(i % 3) * 0.07} className="group rounded-[26px] bg-paper p-7 transition-colors duration-500 hover:bg-ink hover:text-cream">
              <span className="grid size-12 place-items-center rounded-full bg-sun text-on-sun transition-transform duration-500 group-hover:-rotate-12">
                <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3 className="mt-8 text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-1.5 text-graphite transition-colors duration-500 group-hover:text-cream/60">{text}</p>
            </Reveal>
          ))}
        </ul>
        </ScrollTilt>
      </section>

      <section className="wrap pb-16 md:pb-24">
        <div className="grid gap-4 md:grid-cols-2">
          {SIZES.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="group relative h-[380px] overflow-hidden rounded-[30px] md:h-[460px]">
              <img src={s.img} alt={`${s.label} at Let's Work`} title={`${s.label} at Let's Work`} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="glass-dark absolute inset-x-5 bottom-5 rounded-[22px] p-5 text-cream">
                <p className="text-2xl font-semibold tracking-tight">{s.label}</p>
                <p className="label mt-1 text-cream/60">{s.fits}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="wrap sec">
          <SplitWords text="Booked in *three* messages." className="t-h2 mb-12" />
          <Steps steps={STEPS} dark />
        </div>
      </section>

      <FaqSection items={[FAQS.meetings, FAQS.terms, FAQS.amenities, FAQS.where]} />
      <RelatedSpaces currentId="meeting" />
      <CtaBand title="Got a meeting coming up? *Book the room.*" message={MSG} />
    </Page>
  );
}
