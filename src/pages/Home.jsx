import { Page } from '../components/layout/Page.jsx';
import { Hero } from '../components/home/Hero.jsx';
import { WindowReveal } from '../components/home/WindowReveal.jsx';
import { SpacesShelf } from '../components/home/SpacesShelf.jsx';
import { FloorTour3D } from '../components/home/floor3d/FloorTour3D.jsx';
import { Compare } from '../components/home/Compare.jsx';
import { PolaroidWall } from '../components/home/PolaroidWall.jsx';
import { AmenitiesBento } from '../components/home/AmenitiesBento.jsx';
import { StoryStats } from '../components/home/StoryStats.jsx';
import { FaqSection } from '../components/sections/FaqSection.jsx';
import { CtaBand } from '../components/sections/CtaBand.jsx';
import { Bridge } from '../components/ui/Bridge.jsx';
import { HOME_FAQ } from '../data/faqs.js';

export function Home() {
  return (
    <Page description="Let's Work is Multan's coworking space at Nandla Chowk, Shuhada Road. Hot desks, dedicated desks, private offices and meeting rooms — book by the hour, day or week.">
      <Hero />
      <div className="wrap py-10 md:py-12">
        <Bridge>Enough talk — let us show you around.</Bridge>
      </div>
      <WindowReveal />
      <SpacesShelf />
      <FloorTour3D />
      <Compare />
      <PolaroidWall />
      <AmenitiesBento />
      <StoryStats />
      <FaqSection items={HOME_FAQ} className="pt-0 md:pt-0" />
      <CtaBand />
    </Page>
  );
}
