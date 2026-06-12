// Server Component — renders real <a href> links in the static HTML so Googlebot
// can discover every match page at depth 1 from the home page (fixes the
// "Discovered - currently not indexed" / orphan-page problem).
import Link from 'next/link';
import { WC2026_MATCHES } from '@/data/wc2026-matches';

export default function MatchLinksGrid() {
  return (
    <nav aria-label="World Cup 2026 group-stage matches" className="px-4 md:px-0 pt-14">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1 h-7 rounded-full bg-red-600" />
        <h2 className="text-white font-black text-2xl">World Cup 2026 — Tous les matchs en direct</h2>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {WC2026_MATCHES.map(m => (
          <li key={m.slug}>
            <Link
              href={`/${m.slug}`}
              className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-red-600/40 transition-colors"
            >
              <span className="flex items-center gap-2 min-w-0">
                <img src={`https://flagcdn.com/w20/${m.hf}.png`} alt="" width={20} height={14} className="rounded-sm flex-shrink-0" />
                <span className="text-white text-sm font-semibold truncate">{m.home} vs {m.away}</span>
                <img src={`https://flagcdn.com/w20/${m.af}.png`} alt="" width={20} height={14} className="rounded-sm flex-shrink-0" />
              </span>
              <span className="text-white/40 text-[11px] whitespace-nowrap flex-shrink-0">Groupe {m.group} · {m.dayShort}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
