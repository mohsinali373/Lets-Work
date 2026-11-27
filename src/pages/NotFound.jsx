import { Page } from '../components/layout/Page.jsx';
import { Button } from '../components/ui/Button.jsx';
import { SplitWords } from '../components/ui/SplitWords.jsx';

export function NotFound() {
  return (
    <Page title="Page not found">
      <section className="wrap flex min-h-[80vh] flex-col justify-center pb-16 pt-36">
        <p className="label text-graphite">( Error 404 )</p>
        <SplitWords as="h1" onMount delay={0.4} text="This desk is *taken.*" className="t-display mt-4" />
        <p className="t-lead mt-6 max-w-md">The page you were looking for has moved or never existed. Plenty of free seats elsewhere, though.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/">Back to home</Button>
          <Button to="/spaces" variant="ghost" className="hidden sm:inline-flex">
            See all spaces
          </Button>
        </div>
      </section>
    </Page>
  );
}
