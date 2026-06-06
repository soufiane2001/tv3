import type { FC } from 'react';

export interface BlogTeam {
  name: string;
  flag?: string;
  logo?: string;
  form: ('W' | 'D' | 'L')[];
  news: string;
  keyPlayers: { name: string; role: string }[];
}

export interface H2H {
  played: number;
  homeWins: number;
  draws: number;
  awayWins: number;
  lastMatch?: string;
}

export interface MatchBlogData {
  preview: string[];
  home: BlogTeam;
  away: BlogTeam;
  h2h: H2H;
  prediction: { score: string; analysis: string };
  broadcastInfo?: string;
}

const formColor = { W: 'bg-green-500', D: 'bg-yellow-500', L: 'bg-red-600' };

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-white/[0.08] p-5 md:p-6 space-y-4 ${className}`}
    style={{ background: 'var(--card)' }}>
    {children}
  </div>
);

const SECTION_ICONS: Record<string, { bi: string; cls: string; color: string }> = {
  'Match Preview': { bi: 'bi-file-earmark-text', cls: 'icon-box-blue',   color: 'text-blue-400'   },
  'Head-to-Head':  { bi: 'bi-bar-chart-line',    cls: 'icon-box-amber',  color: 'text-amber-400'  },
  'Prediction':    { bi: 'bi-bullseye',           cls: 'icon-box-red',    color: 'text-red-400'    },
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  const key = String(children);
  const meta = SECTION_ICONS[key];
  return (
    <div className="flex items-center gap-3">
      {meta
        ? <div className={`icon-box ${meta.cls}`}><i className={`bi ${meta.bi} ${meta.color} text-lg`} /></div>
        : <div className="w-1 h-5 rounded-full bg-red-600 flex-shrink-0" />
      }
      <h2 className="text-white font-black text-lg">{children}</h2>
    </div>
  );
};

const MatchBlog: FC<{ data: MatchBlogData }> = ({ data }) => {
  const { preview, home, away, h2h, prediction, broadcastInfo } = data;

  return (
    <div className="space-y-5 text-sm text-gray-300 leading-relaxed">

      {/* ── Match Preview ── */}
      <Card>
        <SectionTitle>Match Preview</SectionTitle>
        <div className="space-y-3">
          {preview.map((para, i) => (
            <p key={i} className="text-gray-400 leading-relaxed">{para}</p>
          ))}
        </div>
        {broadcastInfo && (
          <div className="flex items-center gap-2.5 pt-3 border-t border-white/[0.06]">
            <div className="icon-box icon-box-red !w-7 !h-7 shrink-0"><i className="bi bi-tv text-red-400 text-sm" /></div>
            <span className="text-red-400 text-xs font-semibold">{broadcastInfo}</span>
          </div>
        )}
      </Card>

      {/* ── Teams ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[home, away].map((team) => (
          <Card key={team.name}>
            {/* Header */}
            <div className="flex items-center gap-3">
              {team.logo ? (
                <img src={team.logo} alt={team.name} width={32} height={32} className="rounded object-contain" />
              ) : team.flag ? (
                <img src={`https://flagcdn.com/w40/${team.flag}.png`} alt={team.name} width={32} height={22} className="rounded" />
              ) : (
                <div className="icon-box icon-box-red !w-9 !h-9 text-white text-xs font-black">
                  {team.name[0]}
                </div>
              )}
              <h3 className="text-white font-black">{team.name}</h3>
            </div>

            {/* Form */}
            <div>
              <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-2">Last 5 matches</p>
              <div className="flex items-center gap-1.5">
                {team.form.map((r, i) => (
                  <span key={i} className={`w-7 h-7 rounded-full ${formColor[r]} flex items-center justify-center text-white text-xs font-black`}>
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {/* Team News */}
            <div>
              <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-1">Team News</p>
              <p className="text-gray-400 text-sm leading-relaxed">{team.news}</p>
            </div>

            {/* Key Players */}
            <div>
              <p className="text-gray-600 text-[10px] uppercase tracking-widest mb-2">Players to Watch</p>
              <div className="space-y-2">
                {team.keyPlayers.map((p) => (
                  <div key={p.name} className="flex items-center justify-between py-1.5 border-b border-white/[0.04]">
                    <span className="text-white font-semibold text-sm">{p.name}</span>
                    <span className="text-gray-500 text-xs">{p.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ── Head-to-Head ── */}
      <Card>
        <SectionTitle>Head-to-Head</SectionTitle>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl p-4 border border-green-500/20 transition-all hover:border-green-500/40 hover:-translate-y-1" style={{ background: 'rgba(34,197,94,0.07)' }}>
            <p className="text-green-400 text-3xl font-black">{h2h.homeWins}</p>
            <p className="text-white/40 text-xs mt-1">{home.name} wins</p>
          </div>
          <div className="rounded-xl p-4 border border-yellow-500/20 transition-all hover:border-yellow-500/40 hover:-translate-y-1" style={{ background: 'rgba(234,179,8,0.07)' }}>
            <p className="text-yellow-400 text-3xl font-black">{h2h.draws}</p>
            <p className="text-white/40 text-xs mt-1">Draws</p>
          </div>
          <div className="rounded-xl p-4 border border-blue-500/20 transition-all hover:border-blue-500/40 hover:-translate-y-1" style={{ background: 'rgba(59,130,246,0.07)' }}>
            <p className="text-blue-400 text-3xl font-black">{h2h.awayWins}</p>
            <p className="text-white/40 text-xs mt-1">{away.name} wins</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-white/[0.06] pt-3">
          <span>Total meetings: <span className="text-white font-bold">{h2h.played}</span></span>
          {h2h.lastMatch && <span>Last: <span className="text-gray-300">{h2h.lastMatch}</span></span>}
        </div>
      </Card>

      {/* ── Prediction ── */}
      <div className="rounded-2xl p-5 md:p-6 space-y-4 border border-red-500/20"
        style={{ background: 'linear-gradient(135deg, rgba(224,0,27,0.12) 0%, var(--card) 60%)' }}>
        <SectionTitle>Prediction</SectionTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/[0.06]"
            style={{ background: 'rgba(255,255,255,0.03)' }}>
            {home.flag
              ? <img src={`https://flagcdn.com/w40/${home.flag}.png`} alt={home.name} width={28} height={19} className="rounded" />
              : <span className="text-white text-sm font-bold">{home.name[0]}</span>}
            <span className="text-white text-3xl font-black">{prediction.score.split('-')[0]}</span>
            <span className="text-gray-600 font-bold text-xl">–</span>
            <span className="text-white text-3xl font-black">{prediction.score.split('-')[1]}</span>
            {away.flag
              ? <img src={`https://flagcdn.com/w40/${away.flag}.png`} alt={away.name} width={28} height={19} className="rounded" />
              : <span className="text-white text-sm font-bold">{away.name[0]}</span>}
          </div>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">{prediction.analysis}</p>
      </div>

    </div>
  );
};

export default MatchBlog;
