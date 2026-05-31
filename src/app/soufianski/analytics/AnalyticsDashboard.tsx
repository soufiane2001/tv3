'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  Users, Eye, Globe, Clock, Monitor, Smartphone, Tablet,
  TrendingUp, RefreshCw, Wifi, WifiOff, ChevronUp, ChevronDown, MapPin,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LiveVisitor { path: string; country: string; countryCode: string; flag: string; device: string; lastSeen: string }
interface PageGeoCity { city: string; count: number }
interface PageGeoCountry { country: string; countryCode: string; flag: string; count: number; cities: PageGeoCity[] }
interface PageGeoEntry { path: string; total: number; countries: PageGeoCountry[] }
interface StatsData {
  live: { count: number; visitors: LiveVisitor[] };
  totals: { viewsToday: number; viewsHour: number; uniqueToday: number; avgDuration: number };
  topPages: { path: string; count: number }[];
  topCountries: { country: string; countryCode: string; flag: string; count: number }[];
  topReferrers: { referrer: string; count: number }[];
  devices: { device: string; count: number }[];
  browsers: { browser: string; count: number }[];
  chart24h: { hour: string; count: number }[];
  chart7d: { day: string; count: number }[];
  pageGeo: PageGeoEntry[];
}

const DEVICE_ICONS: Record<string, any> = { desktop: Monitor, mobile: Smartphone, tablet: Tablet };
const CHART_COLORS = ['#a855f7','#3b82f6','#10b981','#f59e0b','#ef4444'];

function fmt(n: number) { return n >= 1000 ? `${(n/1000).toFixed(1)}k` : String(n); }
function fmtDuration(s: number) {
  if (s < 60) return `${s}s`;
  return `${Math.floor(s/60)}m ${s%60}s`;
}
function fmtHour(iso: string) {
  try { return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }
  catch { return iso.slice(11,16); }
}
function fmtDay(d: string) {
  try { return new Date(d).toLocaleDateString([], { month:'short', day:'numeric' }); }
  catch { return d.slice(5); }
}

export default function AnalyticsDashboard({ password }: { password: string }) {
  const [data, setData]           = useState<StatsData | null>(null);
  const [loading, setLoading]     = useState(true);
  const [liveOnline, setLiveOnline] = useState(false);
  const [tab, setTab]             = useState<'24h'|'7d'>('24h');
  const [showLive, setShowLive]   = useState(true);
  const statsTimerRef             = useRef<NodeJS.Timeout | null>(null);
  const liveTimerRef              = useRef<NodeJS.Timeout | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/analytics/stats', {
        headers: { 'x-admin-password': password },
      });
      if (!res.ok) return;
      const d = await res.json();
      setData(d);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, [password]);

  // Poll live visitors every 5s for real-time count
  const fetchLive = useCallback(async () => {
    try {
      const res = await fetch(`/api/analytics/live?pwd=${encodeURIComponent(password)}`);
      if (!res.ok) { setLiveOnline(false); return; }
      const liveData = await res.json();
      setData(prev => prev ? { ...prev, live: liveData } : prev);
      setLiveOnline(true);
    } catch { setLiveOnline(false); }
  }, [password]);

  // Initial stats load + refresh every 30s
  useEffect(() => {
    fetchStats();
    statsTimerRef.current = setInterval(fetchStats, 30_000);
    return () => { if (statsTimerRef.current) clearInterval(statsTimerRef.current); };
  }, [fetchStats]);

  // Live visitor polling every 5s
  useEffect(() => {
    fetchLive();
    liveTimerRef.current = setInterval(fetchLive, 5_000);
    return () => { if (liveTimerRef.current) clearInterval(liveTimerRef.current); };
  }, [fetchLive]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-pulse">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-gray-800/60 rounded-2xl h-28" />
        ))}
      </div>
    );
  }

  const d = data;
  if (!d) return <p className="text-gray-500">Failed to load analytics.</p>;

  const totalDevices = d.devices.reduce((s, x) => s + x.count, 0);
  const totalBrowsers = d.browsers.reduce((s, x) => s + x.count, 0);
  const maxCountryCount = d.topCountries[0]?.count || 1;

  return (
    <div className="space-y-6">

      {/* ── Live pulse header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {liveOnline ? (
            <span className="flex items-center gap-1.5 text-green-400 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Live — updated every 5s
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-gray-500 text-sm">
              <WifiOff className="w-3.5 h-3.5" /> Connecting…
            </span>
          )}
        </div>
        <button onClick={() => { fetchStats(); fetchLive(); }} className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users} label="Live Now" value={d.live.count}
          sub="active visitors" color="green"
          pulse={d.live.count > 0}
        />
        <StatCard icon={Eye}      label="Today"      value={fmt(d.totals.viewsToday)} sub="pageviews"       color="purple" />
        <StatCard icon={TrendingUp} label="This Hour" value={fmt(d.totals.viewsHour)} sub="pageviews"       color="blue"   />
        <StatCard icon={Users}    label="Unique"     value={fmt(d.totals.uniqueToday)} sub="sessions (24h)" color="yellow" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Clock}     label="Avg Time"   value={fmtDuration(d.totals.avgDuration)} sub="per visit" color="purple" />
        <StatCard icon={Globe}     label="Countries"  value={d.topCountries.length}  sub="reached (24h)" color="blue"   />
        <StatCard icon={Monitor}   label="Desktop"    value={`${Math.round((d.devices.find(x=>x.device==='desktop')?.count||0)/Math.max(totalDevices,1)*100)}%`} sub="of visitors" color="green" />
        <StatCard icon={Smartphone} label="Mobile"   value={`${Math.round((d.devices.find(x=>x.device==='mobile')?.count||0)/Math.max(totalDevices,1)*100)}%`}  sub="of visitors" color="yellow" />
      </div>

      {/* ── Live visitors panel ── */}
      {d.live.count > 0 && (
        <section className="bg-gray-800/60 border border-green-500/20 rounded-2xl overflow-hidden">
          <button
            onClick={() => setShowLive(v => !v)}
            className="w-full flex items-center justify-between px-5 py-4"
          >
            <h3 className="text-white font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {d.live.count} Visitor{d.live.count !== 1 ? 's' : ''} Online Right Now
            </h3>
            {showLive ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </button>

          {showLive && (
            <div className="border-t border-white/5 divide-y divide-white/5 max-h-64 overflow-y-auto">
              {d.live.visitors.map((v, i) => {
                const DevIcon = DEVICE_ICONS[v.device] || Monitor;
                return (
                  <div key={i} className="flex items-center gap-3 px-5 py-3">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                    <span className="text-lg flex-shrink-0">{v.flag}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate font-mono">{v.path}</p>
                      <p className="text-gray-500 text-xs">{v.country}</p>
                    </div>
                    <DevIcon className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    <span className="text-gray-600 text-xs flex-shrink-0">
                      {new Date(v.lastSeen).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* ── Traffic chart ── */}
      <section className="bg-gray-800/60 border border-white/5 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Traffic</h3>
          <div className="flex rounded-lg overflow-hidden border border-white/10">
            {(['24h','7d'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={cn('px-3 py-1 text-xs font-medium transition-colors',
                  tab === t ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                )}>
                {t === '24h' ? 'Last 24h' : 'Last 7 days'}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={(tab === '24h' ? d.chart24h.map(r => ({ label: fmtHour(r.hour), count: r.count })) : d.chart7d.map(r => ({ label: fmtDay(r.day), count: r.count }))) as { label: string; count: number }[]}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#a855f7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="label" tick={{ fill: '#6b7280', fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{ background: '#1f2937', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }}
              labelStyle={{ color: '#d1d5db' }}
              cursor={{ stroke: 'rgba(168,85,247,0.3)' }}
            />
            <Area type="monotone" dataKey="count" stroke="#a855f7" strokeWidth={2} fill="url(#grad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </section>

      {/* ── 3-col grid: Pages, Countries, Devices ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Top pages */}
        <section className="bg-gray-800/60 border border-white/5 rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Eye className="w-4 h-4 text-purple-400" /> Top Pages
          </h3>
          <div className="space-y-3">
            {d.topPages.length === 0 && <p className="text-gray-600 text-sm">No data yet</p>}
            {d.topPages.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-gray-600 text-xs w-4 text-right">{i+1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-300 text-xs truncate font-mono">{p.path}</p>
                  <div className="mt-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(p.count/(d.topPages[0]?.count||1))*100}%` }} />
                  </div>
                </div>
                <span className="text-gray-400 text-xs flex-shrink-0 font-medium">{p.count}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Top countries */}
        <section className="bg-gray-800/60 border border-white/5 rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" /> Countries
            <span className="ml-auto text-gray-500 text-xs font-normal">{d.topCountries.length} pays</span>
          </h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {d.topCountries.length === 0 && <p className="text-gray-600 text-sm">No data yet</p>}
            {d.topCountries.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-base flex-shrink-0">{c.flag}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-300 text-xs truncate">{c.country}</p>
                  <div className="mt-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(c.count/maxCountryCount)*100}%` }} />
                  </div>
                </div>
                <span className="text-gray-400 text-xs flex-shrink-0 font-medium">{c.count}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Device + Browser breakdown */}
        <section className="bg-gray-800/60 border border-white/5 rounded-2xl p-5 space-y-5">
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Monitor className="w-4 h-4 text-green-400" /> Devices
            </h3>
            <div className="space-y-2">
              {d.devices.map((dv, i) => {
                const Icon = DEVICE_ICONS[dv.device] || Monitor;
                const pct = Math.round((dv.count / Math.max(totalDevices,1)) * 100);
                return (
                  <div key={i} className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-400 text-xs capitalize flex-shrink-0 w-14">{dv.device}</span>
                    <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width:`${pct}%`, background: CHART_COLORS[i] || '#6b7280' }} />
                    </div>
                    <span className="text-gray-400 text-xs w-8 text-right">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="border-t border-white/5 pt-4">
            <h3 className="text-white font-semibold mb-3 text-sm">Browsers</h3>
            <div className="space-y-2">
              {d.browsers.slice(0,5).map((b, i) => {
                const pct = Math.round((b.count / Math.max(totalBrowsers,1)) * 100);
                return (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs w-14 truncate">{b.browser}</span>
                    <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width:`${pct}%`, background: CHART_COLORS[i] || '#6b7280' }} />
                    </div>
                    <span className="text-gray-400 text-xs w-8 text-right">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* ── Referrers ── */}
      {d.topReferrers.length > 0 && (
        <section className="bg-gray-800/60 border border-white/5 rounded-2xl p-5">
          <h3 className="text-white font-semibold mb-4">Top Referrers (24h)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {d.topReferrers.map((r, i) => (
              <div key={i} className="bg-gray-900/60 rounded-xl p-3">
                <p className="text-gray-300 text-sm truncate">{r.referrer}</p>
                <p className="text-purple-400 font-bold text-lg mt-1">{r.count}</p>
                <p className="text-gray-600 text-xs">visits</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Pages × Countries × Cities ── */}
      {d.pageGeo.length > 0 && <PageGeoSection pages={d.pageGeo} />}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, color, pulse }: {
  icon: any; label: string; value: string | number;
  sub: string; color: string; pulse?: boolean;
}) {
  const colors: Record<string, string> = {
    green:  'bg-green-600/10 text-green-400',
    purple: 'bg-purple-600/10 text-purple-400',
    blue:   'bg-blue-600/10 text-blue-400',
    yellow: 'bg-yellow-600/10 text-yellow-400',
  };
  return (
    <div className="bg-gray-800/60 border border-white/5 rounded-2xl p-5">
      <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center mb-3', colors[color])}>
        <Icon className={cn('w-4 h-4', pulse && 'animate-pulse')} />
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-gray-500 text-xs mt-0.5">{label} · {sub}</p>
    </div>
  );
}

// ── Pages × Countries × Cities breakdown ─────────────────────────────────────

function PageGeoSection({ pages }: { pages: PageGeoEntry[] }) {
  const [openPage, setOpenPage] = useState<string | null>(null);
  const [openCountry, setOpenCountry] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = pages.filter(p =>
    !search || p.path.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="bg-gray-800/60 border border-white/5 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-400" />
          Pages × Countries × Cities
          <span className="text-gray-500 text-xs font-normal ml-1">24h</span>
        </h3>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Filter pages…"
          className="bg-gray-900/60 border border-white/10 rounded-lg px-3 py-1 text-xs text-gray-300 placeholder-gray-600 outline-none focus:border-purple-500/50 w-36"
        />
      </div>

      <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
        {filtered.length === 0 && (
          <p className="text-gray-600 text-sm px-5 py-4">No data yet</p>
        )}
        {filtered.map(page => {
          const isOpen = openPage === page.path;
          const maxCountry = page.countries[0]?.count || 1;
          return (
            <div key={page.path}>
              {/* Page row */}
              <button
                onClick={() => { setOpenPage(isOpen ? null : page.path); setOpenCountry(null); }}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-white/3 transition-colors text-left"
              >
                {isOpen
                  ? <ChevronDown className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  : <ChevronDown className="w-3.5 h-3.5 text-gray-600 flex-shrink-0 -rotate-90" />
                }
                <span className="flex-1 text-sm font-mono text-gray-200 truncate">{page.path}</span>
                <span className="text-xs text-gray-400 font-medium flex-shrink-0">{page.total} views</span>
                {/* Mini country flags preview */}
                <span className="hidden sm:flex items-center gap-0.5 flex-shrink-0">
                  {page.countries.slice(0, 5).map((c, i) => (
                    <span key={i} className="text-base" title={`${c.country}: ${c.count}`}>{c.flag}</span>
                  ))}
                  {page.countries.length > 5 && (
                    <span className="text-gray-600 text-xs ml-1">+{page.countries.length - 5}</span>
                  )}
                </span>
              </button>

              {/* Country breakdown */}
              {isOpen && (
                <div className="bg-gray-900/40 border-t border-white/5 px-5 py-3 space-y-2">
                  {page.countries.map(country => {
                    const ck = `${page.path}|${country.countryCode}`;
                    const isCountryOpen = openCountry === ck;
                    return (
                      <div key={country.countryCode}>
                        {/* Country row */}
                        <button
                          onClick={() => setOpenCountry(isCountryOpen ? null : ck)}
                          className="w-full flex items-center gap-2 py-1.5 text-left group"
                        >
                          <span className="text-base flex-shrink-0">{country.flag}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-gray-300 text-xs font-medium">{country.country}</span>
                              <span className="text-gray-400 text-xs flex-shrink-0">{country.count}</span>
                            </div>
                            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 rounded-full transition-all"
                                style={{ width: `${(country.count / maxCountry) * 100}%` }}
                              />
                            </div>
                          </div>
                          {country.cities.length > 0 && (
                            <ChevronDown className={cn(
                              'w-3 h-3 text-gray-600 flex-shrink-0 transition-transform',
                              isCountryOpen ? 'rotate-0' : '-rotate-90'
                            )} />
                          )}
                        </button>

                        {/* Cities */}
                        {isCountryOpen && country.cities.length > 0 && (
                          <div className="ml-8 mb-2 space-y-1 bg-gray-900/50 rounded-lg p-2">
                            {country.cities.map((city, ci) => (
                              <div key={ci} className="flex items-center gap-2">
                                <span className="text-gray-600 text-[10px]">📍</span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="text-gray-400 text-[11px] truncate">{city.city || '—'}</span>
                                    <span className="text-gray-500 text-[11px] flex-shrink-0">{city.count}</span>
                                  </div>
                                  <div className="mt-0.5 h-0.5 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-emerald-500/70 rounded-full"
                                      style={{ width: `${(city.count / country.cities[0].count) * 100}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                            {!country.cities.some(c => c.city) && (
                              <p className="text-gray-600 text-[11px]">City data not available</p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
