import { Reveal } from '../ui/Reveal.jsx';

/**
 * Cards that pin and pile on top of each other as you scroll (pure CSS sticky).
 * @param {{ items: {kicker: string, title: string, text: string, image: string, tone: string}[] }} props
 */
export function StackCards({ items }) {
  return (
    <ul className="relative">
      {items.map((item, i) => (
        <li key={item.title} className="sticky mb-6 last:mb-0" style={{ top: `calc(6.5rem + ${i * 1.75}rem)` }}>
          <Reveal className={`grid overflow-hidden rounded-[32px] shadow-[0_-20px_50px_-30px_rgba(17,17,17,0.35)] md:grid-cols-2 ${item.tone}`}>
            <div className="flex flex-col p-7 md:p-10">
              <span className="label opacity-60">
                ({String(i + 1).padStart(2, '0')}) {item.kicker}
              </span>
              <h3 className="t-h2 mt-auto pt-16">{item.title}</h3>
              <p className="mt-4 max-w-md text-lg opacity-75">{item.text}</p>
            </div>
            <div className="relative min-h-[260px] md:min-h-[440px]">
              <img src={item.image} alt={`${item.kicker} at Let's Work`} title={`${item.kicker} at Let's Work`} loading="lazy" className="absolute inset-0 size-full object-cover" />
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
