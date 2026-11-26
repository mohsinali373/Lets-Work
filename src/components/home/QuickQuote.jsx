import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { waLink } from '../../data/site.js';

const SPACES = ['Hot desk', 'Dedicated desk', 'Private office', 'Meeting room', 'Instant office'];
const WHEN = ['A few hours', 'A day', 'A week', 'A month+'];
const TEAM = ['Just me', '2–5 people', '6+ people'];

function Choice({ label, options, value, onChange }) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-1 rounded-2xl bg-white/6 px-4 py-2.5 transition-colors focus-within:bg-white/12 hover:bg-white/10">
      <span className="label text-cream/50">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer appearance-none bg-transparent font-semibold text-cream outline-none [&>option]:text-ink"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

/** Hotel-style availability bar: three picks, one WhatsApp message. */
export function QuickQuote() {
  const [space, setSpace] = useState(SPACES[0]);
  const [when, setWhen] = useState(WHEN[1]);
  const [team, setTeam] = useState(TEAM[0]);
  const message = `Hi Let's Work! Is a ${space.toLowerCase()} available? For: ${when.toLowerCase()}. Team: ${team.toLowerCase()}.`;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.open(waLink(message), '_blank', 'noopener,noreferrer');
      }}
      className="glass-dark flex flex-col gap-2 rounded-[26px] p-2 md:flex-row md:items-stretch"
      aria-label="Check availability"
    >
      <Choice label="I need a" options={SPACES} value={space} onChange={setSpace} />
      <Choice label="For" options={WHEN} value={when} onChange={setWhen} />
      <Choice label="Team" options={TEAM} value={team} onChange={setTeam} />
      <button
        type="submit"
        className="roll-host group flex shrink-0 cursor-pointer items-center justify-center gap-3 rounded-2xl bg-sun px-6 py-4 font-semibold text-ink transition-colors hover:bg-[#ffc643]"
      >
        <span className="roll">
          <span>Check availability</span>
          <span aria-hidden="true">Check availability</span>
        </span>
        <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
      </button>
    </form>
  );
}
