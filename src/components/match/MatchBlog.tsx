import type { FC } from 'react';

export interface BlogTeam {
  name: string;
  flag?: string;           // flagcdn country code e.g. 'br' (national teams)
  logo?: string;           // direct image URL (club teams)
  form: ('W' | 'D' | 'L')[];
  news: string;
  keyPlayers: { name: string; role: string }[];
}

export interface H2H {
  played: number;
  homeWins: number;
  draws: number;
  awayWins: number;
  lastMatch?: string;     // e.g. "Brazil 3-0 Morocco (2022)"
}

export interface MatchBlogData {
  preview: string[];      // paragraphs for the main article
  home: BlogTeam;
  away: BlogTeam;
  h2h: H2H;
  prediction: { score: string; analysis: string };
  broadcastInfo?: string; // e.g. "M6 (France), beIN Sport 1 (MENA)"
}

const formColor = { W: 'bg-green-500', D: 'bg-yellow-500', L: 'bg-red-500' };

const MatchBlog: FC<{ data: MatchBlogData }> = ({ data }) => {
  const { preview, home, away, h2h, prediction, broadcastInfo } = data;

  return (
    <div className="space-y-6 text-sm text-gray-300 leading-relaxed">

      {/* ── Match Preview Article ── */}
      <section className="bg-gray-800/30 border border-white/5 rounded-2xl p-5 md:p-7 space-y-4">
        <h2 className="text-white font-bold text-lg flex items-center gap-2">
          📰 Match Preview
        </h2>
        {preview.map((para, i) => (
          <p key={i} className="text-gray-300">{para}</p>
        ))}
        {broadcastInfo && (
          <div className="flex items-center gap-2 pt-2 border-t border-white/5">
            <span className="text-gray-500 text-xs">📺 Watch on:</span>
            <span className="text-purple-300 text-xs font-medium">{broadcastInfo}</span>
          </div>
        )}
      </section>

      {/* ── Teams: Form + News ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[home, away].map((team) => (
          <section
            key={team.name}
            className="bg-gray-800/30 border border-white/5 rounded-2xl p-5 space-y-4"
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              {team.logo ? (
                <img src={team.logo} alt={team.name} width={32} height={32} className="rounded object-contain" />
              ) : team.flag ? (
                <img src={`https://flagcdn.com/w40/${team.flag}.png`} alt={team.name} width={32} height={22} className="rounded object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {team.name[0]}
                </div>
              )}
              <h3 className="text-white font-bold">{team.name}</h3>
            </div>

            {/* Form */}
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Last 5 matches</p>
              <div className="flex items-center gap-1.5">
                {team.form.map((r, i) => (
                  <span
                    key={i}
                    className={`w-7 h-7 rounded-full ${formColor[r]} flex items-center justify-center text-white text-xs font-black`}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {/* Team News */}
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Team News</p>
              <p className="text-gray-400 text-sm">{team.news}</p>
            </div>

            {/* Key Players */}
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Players to Watch</p>
              <div className="space-y-1.5">
                {team.keyPlayers.map((p) => (
                  <div key={p.name} className="flex items-center justify-between">
                    <span className="text-white font-medium">{p.name}</span>
                    <span className="text-gray-500 text-xs">{p.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ── Head-to-Head ── */}
      <section className="bg-gray-800/30 border border-white/5 rounded-2xl p-5 space-y-4">
        <h2 className="text-white font-bold text-lg">📊 Head-to-Head</h2>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
            <p className="text-green-400 text-2xl font-black">{h2h.homeWins}</p>
            <p className="text-gray-500 text-xs mt-1">{home.name} wins</p>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3">
            <p className="text-yellow-400 text-2xl font-black">{h2h.draws}</p>
            <p className="text-gray-500 text-xs mt-1">Draws</p>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
            <p className="text-blue-400 text-2xl font-black">{h2h.awayWins}</p>
            <p className="text-gray-500 text-xs mt-1">{away.name} wins</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-white/5 pt-3">
          <span>Total meetings: <span className="text-white font-bold">{h2h.played}</span></span>
          {h2h.lastMatch && <span>Last: <span className="text-gray-300">{h2h.lastMatch}</span></span>}
        </div>
      </section>

      {/* ── Prediction ── */}
      <section className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-2xl p-5 space-y-3">
        <h2 className="text-white font-bold text-lg">🔮 Prediction</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-5 py-3">
            {home.logo ? <img src={home.logo} alt={home.name} width={28} height={28} className="rounded object-contain" />
              : home.flag ? <img src={`https://flagcdn.com/w40/${home.flag}.png`} alt={home.name} width={28} height={19} className="rounded" />
              : <span className="text-white text-sm font-bold">{home.name[0]}</span>}
            <span className="text-white text-2xl font-black">{prediction.score.split('-')[0]}</span>
            <span className="text-gray-500 font-bold">–</span>
            <span className="text-white text-2xl font-black">{prediction.score.split('-')[1]}</span>
            {away.logo ? <img src={away.logo} alt={away.name} width={28} height={28} className="rounded object-contain" />
              : away.flag ? <img src={`https://flagcdn.com/w40/${away.flag}.png`} alt={away.name} width={28} height={19} className="rounded" />
              : <span className="text-white text-sm font-bold">{away.name[0]}</span>}
          </div>
        </div>
        <p className="text-gray-400 text-sm">{prediction.analysis}</p>
      </section>

    </div>
  );
};

export default MatchBlog;
