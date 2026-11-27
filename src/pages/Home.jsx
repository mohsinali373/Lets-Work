import { Page } from '../components/layout/Page.jsx';
import { PAGES } from '../data/seo.js';
import { Hero } from '../components/home/Hero.jsx';
import { WindowReveal } from '../components/home/WindowReveal.jsx';
import { SpacesShelf } from '../components/home/SpacesShelf.jsx';
import { PricingPlans } from '../components/home/PricingPlans.jsx';
import { Compare } from '../components/home/Compare.jsx';
import { PolaroidWall } from '../components/home/PolaroidWall.jsx';
import { AmenitiesBento } from '../components/home/AmenitiesBento.jsx';
import { StoryStats } from '../components/home/StoryStats.jsx';
import { FaqSection } from '../components/sections/FaqSection.jsx';
import { CtaBand } from '../components/sections/CtaBand.jsx';
import { Bridge } from '../components/ui/Bridge.jsx';
import { PAGE_FAQS } from '../data/faqs.js';

export function Home() {
  return (
    <Page seo={PAGES.home}>
      <Hero />
      <div className="wrap py-10 md:py-12">
        <Bridge>Enough talk — let us show you around.</Bridge>
      </div>
      <WindowReveal />
      {/* below the fold: the browser skips layout and paint for these until they near the screen */}
      <div className="cv-auto">
        <SpacesShelf />
      </div>
      <div className="cv-auto">
        <PricingPlans />
      </div>
      <div className="cv-auto">
        <Compare />
      </div>
      <div className="cv-auto">
        <PolaroidWall />
      </div>
      <div className="cv-auto">
        <AmenitiesBento />
      </div>
      <div className="cv-auto">
        <StoryStats />
      </div>
      <div className="cv-auto">
        <FaqSection items={PAGE_FAQS.home} className="pt-0 md:pt-0" />
      </div>
      <CtaBand />
    </Page>
  );
}
