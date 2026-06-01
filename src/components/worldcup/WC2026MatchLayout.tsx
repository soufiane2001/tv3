import Link from 'next/link';
import AdBanner from '@/components/ads/AdBanner';
import WC2026StreamClient, { type WCServer } from '@/components/worldcup/WC2026StreamClient';
import MatchBlog, { type MatchBlogData } from '@/components/match/MatchBlog';

export interface MatchTeam {
  name: string;
  flag: string;        // flagcdn code e.g. 'mx'
  nickname?: string;
  formation?: string;
  lineup?: string[];
}

export interface MatchMeta {
  date: string;        // e.g. 'Thursday, 11 June 2026'
  time: string;        // e.g. '20:00 UTC'
  venue: string;
  group: string;
  matchday?: number;
  prediction?: string; // e.g. '2-1'
}

interface Props {
  home: MatchTeam;
  away: MatchTeam;
  meta: MatchMeta;
  servers: WCServer[];
  blog: MatchBlogData;
  kickoffTimes: { flag: string; country: string; time: string }[];
  faqs: { q: string; a: string }[];
  relatedLinks: { href: string; label: string }[];
}

export default function WC2026MatchLayout({
  home, away, meta, servers, blog, kickoffTimes, faqs, relatedLinks,
}: Props) {
  return (
    <div className="max-w-4xl mx-auto space-y-0">

      {/* ═══════════════════════════════════════
          HERO — full-bleed red Arda Guler style
      ═══════════════════════════════════════ */}
      <div className="relative -mx-4 -mt-6 overflow-hidden rounded-b-3xl"
        style={{ background: 'linear-gradient(135deg, #b91c1c 0%, #7f1d1d 40%, #991b1b 70%, #450a0a 100%)', minHeight: '340px' }}>

        {/* Radial glow */}
        <div className="absolute top-0 right-0 w-2/3 h-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(255,60,60,0.3) 0%, transparent 65%)' }} />
        {/* Diagonal texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.7))' }} />

        {/* CONTENT */}
        <div className="relative z-10 px-6 md:px-10 pt-8 pb-12">

          {/* Top breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Link href="/world-cup-2026-live"
              className="flex items-center gap-1.5 px-3 py-1 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full text-white text-[10px] font-black uppercase tracking-widest hover:bg-black/60 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              WC2026 Live
            </Link>
            <span className="text-white/30 text-xs">›</span>
            <span className="text-white/60 text-xs font-semibold">Group {meta.group} · {meta.date}</span>
          </div>

          {/* Match display */}
          <div className="grid grid-cols-3 items-center gap-4 md:gap-8">

            {/* Home team */}
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl bg-black/20 flex items-center justify-center">
                <img src={`https://flagcdn.com/w160/${home.flag}.png`} alt={home.name}
                  className="w-full h-full object-cover" loading="eager" />
              </div>
              <div>
                <p className="text-white font-black text-base md:text-xl uppercase tracking-wide">{home.name}</p>
                {home.nickname && <p className="text-white/50 text-[10px] uppercase tracking-widest mt-0.5">{home.nickname}</p>}
              </div>
            </div>

            {/* VS center */}
            <div className="flex flex-col items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-red-600 rounded-full text-white text-[10px] font-black uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />LIVE
              </span>
              <p className="text-white/20 font-black text-3xl md:text-5xl tracking-[0.3em]">VS</p>
              {meta.prediction && (
                <p className="text-white/60 text-xs font-bold">Prediction: {meta.prediction}</p>
              )}
              <div className="text-center space-y-0.5">
                <p className="text-white/70 text-xs font-semibold">{meta.time}</p>
                <p className="text-white/40 text-[10px]">{meta.venue}</p>
              </div>
            </div>

            {/* Away team */}
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl bg-black/20 flex items-center justify-center">
                <img src={`https://flagcdn.com/w160/${away.flag}.png`} alt={away.name}
                  className="w-full h-full object-cover" loading="eager" />
              </div>
              <div>
                <p className="text-white font-black text-base md:text-xl uppercase tracking-wide">{away.name}</p>
                {away.nickname && <p className="text-white/50 text-[10px] uppercase tracking-widest mt-0.5">{away.nickname}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Ghost text */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-1 pointer-events-none select-none overflow-hidden">
          <p className="text-white font-black uppercase leading-none"
            style={{ fontSize: 'clamp(2rem, 7vw, 6rem)', opacity: 0.08, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
            {home.name} VS {away.name}
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          INFO CHIPS
      ═══════════════════════════════════════ */}
      <div className="px-4 md:px-0 pt-5 flex flex-wrap gap-2">
        {[
          { icon: '📅', text: meta.date },
          { icon: '⏰', text: meta.time },
          { icon: '🏟️', text: meta.venue },
          { icon: '🏆', text: `Group ${meta.group}${meta.matchday ? ` · MD${meta.matchday}` : ''}` },
        ].map(({ icon, text }) => (
          <span key={text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-400 border border-white/[0.08]"
            style={{ background: '#111' }}>
            {icon} {text}
          </span>
        ))}
      </div>

      {/* ═══════════════════════════════════════
          STREAM PLAYER
      ═══════════════════════════════════════ */}
      <section className="px-4 md:px-0 pt-5 space-y-2">
        <WC2026StreamClient servers={servers}
          match={{ home: home.name, homeFlag: home.flag, away: away.name, awayFlag: away.flag, date: meta.date, time: meta.time }} />
        <p className="text-gray-700 text-xs text-center">Free HD stream · Switch server if buffering · No registration</p>
      </section>

      <div className="px-4 md:px-0 pt-4"><AdBanner /></div>

      {/* ═══════════════════════════════════════
          KICKOFF TIMES
      ═══════════════════════════════════════ */}
      <section className="px-4 md:px-0 pt-6 rounded-2xl">
        <div className="rounded-2xl p-5 border border-white/[0.06]" style={{ background: '#111' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 rounded-full bg-red-600" />
            <h2 className="text-white font-black text-base">Kickoff Times by Country</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {kickoffTimes.map(({ flag, country, time }) => (
              <div key={country} className="flex justify-between px-3 py-2 rounded-xl border border-white/[0.06]"
                style={{ background: '#0d0d0d' }}>
                <span className="text-gray-400 text-sm">{flag} {country}</span>
                <span className="text-white font-black text-sm">{time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          LINEUPS (if provided)
      ═══════════════════════════════════════ */}
      {(home.lineup || away.lineup) && (
        <section className="px-4 md:px-0 pt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full bg-red-600" />
            <h2 className="text-white font-black text-xl">Predicted Lineups</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[home, away].map((team) => (
              team.lineup && (
                <div key={team.name} className="rounded-2xl p-5 border border-white/[0.06] space-y-3"
                  style={{ background: '#111' }}>
                  <div className="flex items-center gap-3">
                    <img src={`https://flagcdn.com/w40/${team.flag}.png`} alt={team.name} width={32} height={22} className="rounded shadow" />
                    <div>
                      <p className="text-white font-black uppercase text-sm">{team.name}</p>
                      {team.formation && <p className="text-red-400 text-[10px] font-bold">{team.formation} · Predicted XI</p>}
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    {team.lineup.map((name, i) => (
                      <div key={name} className="flex items-center gap-3 py-1.5 border-b border-white/[0.04]">
                        <span className="text-gray-600 text-xs w-4 text-right flex-shrink-0">{i + 1}</span>
                        <span className="text-gray-200 text-sm">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          FAQ
      ═══════════════════════════════════════ */}
      <section className="px-4 md:px-0 pt-6 space-y-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 rounded-full bg-red-600" />
          <h2 className="text-white font-black text-xl">FAQ</h2>
        </div>
        {faqs.map(({ q, a }, i) => (
          <details key={i}
            className="group rounded-2xl border border-white/[0.06] hover:border-red-500/30 transition-all cursor-pointer overflow-hidden"
            style={{ background: '#111' }}>
            <summary className="flex items-center justify-between gap-3 px-5 py-4 list-none text-white text-sm font-semibold">
              {q}
              <span className="text-red-500 text-xl flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="px-5 pb-4 pt-0">
              <div className="h-px bg-white/5 mb-3" />
              <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
            </div>
          </details>
        ))}
      </section>

      <div className="px-4 md:px-0 pt-4"><AdBanner /></div>

      {/* ═══════════════════════════════════════
          MATCH BLOG
      ═══════════════════════════════════════ */}
      <div className="px-4 md:px-0 pt-6">
        <MatchBlog data={blog} />
      </div>

      {/* ═══════════════════════════════════════
          RELATED LINKS
      ═══════════════════════════════════════ */}
      <section className="px-4 md:px-0 pt-6 pb-10 flex flex-wrap gap-3">
        {relatedLinks.map(({ href, label }) => (
          <Link key={href} href={href}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all border border-white/[0.06] hover:border-red-500/40 hover:text-white text-gray-400"
            style={{ background: '#111' }}>
            {label}
          </Link>
        ))}
      </section>
    </div>
  );
}
