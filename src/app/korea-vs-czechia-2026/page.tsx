import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import AdBanner from '@/components/ads/AdBanner';
import WC2026StreamClient from '@/components/worldcup/WC2026StreamClient';
import MatchBlog from '@/components/match/MatchBlog';
import { blogs } from '@/data/wc2026-blogs';

export const revalidate = 3600;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sportalive.live';
const SLUG = 'korea-vs-czechia-2026';
const PAGE_URL = `${SITE}/${SLUG}`;

const TITLE = 'Korea Republic vs Czechia LIVE — World Cup 2026 Free Stream | M6 · beIN Sport · La 1';
const DESC = '🔴 LIVE — Watch Korea Republic vs Czechia FIFA World Cup 2026 FREE. Group A match. Stream HD on M6, beIN Sport 1, La 1. No subscription. 무료 한국 체코 2026 월드컵 · Ver gratis · Regarder gratuit.';

const KEYWORDS = [
  'korea vs czechia live stream free','korea republic czechia world cup 2026',
  'watch korea vs czechia online free','world cup 2026 group a korea czechia',
  'south korea czechia fifa world cup 2026 live','한국 체코 2026 월드컵 무료 생중계',
  '한국 대 체코 월드컵 2026','korea republic vs czechia free stream',
  'corée république tchèque coupe du monde 2026 en direct','coupe du monde 2026 groupe a en direct',
  'corée tchéquie streaming gratuit','ver corea republica checa gratis copa del mundo 2026',
  'corea vs checquia en vivo mundial 2026',
  'كوريا ضد التشيك كأس العالم 2026 بث مباشر','مشاهدة كوريا التشيك مجاناً',
  'korea tschechien weltmeisterschaft 2026 live stream',
  'corea vs chéquia copa do mundo 2026 ao vivo',
  'кorея чехія чемпіонат світу 2026',
  'korea tsjechië wereldkampioenschap 2026 live',
  'corea vs cechia mondiali 2026 in diretta',
  'korea vs çekya dünya kupası 2026 canlı izle',
  'korea vs czechia lineup 2026','son heung-min world cup 2026',
  'where to watch korea vs czechia world cup 2026',
].join(', ');

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: KEYWORDS,
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'en': PAGE_URL, 'fr': PAGE_URL, 'ar': PAGE_URL, 'es': PAGE_URL,
      'pt': PAGE_URL, 'de': PAGE_URL, 'tr': PAGE_URL, 'nl': PAGE_URL,
      'it': PAGE_URL, 'ko': PAGE_URL,
    },
  },
  openGraph: {
    title: '🔴 LIVE: Korea Republic vs Czechia — World Cup 2026 FREE',
    description: 'Watch Korea Republic vs Czechia FIFA World Cup 2026 Group A FREE in HD.',
    type: 'website',
    siteName: 'SportaLive',
    images: [{ url: `${SITE}/api/og?home=Korea&away=Czechia&hf=kr&af=cz&date=Jun+12`, width: 1200, height: 630, alt: 'Korea vs Czechia World Cup 2026 Live Stream' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🔴 Korea vs Czechia LIVE — World Cup 2026 Free Stream',
    description: 'Watch free HD — FIFA World Cup 2026 live on M6, beIN Sport.',
    images: [`${SITE}/og-wc2026.jpg`],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'FIFA World Cup 2026 — Korea Republic vs Czechia',
  description: 'FIFA World Cup 2026 Group A match between Korea Republic and Czechia.',
  startDate: '2026-06-11T23:00:00Z',
  endDate: '2026-06-12T01:00:00Z',
  sport: 'https://en.wikipedia.org/wiki/Association_football',
  location: {
    '@type': 'Place',
    name: 'Estadio Guadalajara',
    address: { '@type': 'PostalAddress', addressLocality: 'Guadalajara', addressCountry: 'MX' },
  },
  offers: {
    '@type': 'Offer',
    name: 'Free Live Stream — Korea vs Czechia World Cup 2026',
    price: '0', priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: PAGE_URL, validFrom: '2026-06-11T00:00:00Z',
    seller: { '@type': 'Organization', name: 'SportaLive', url: SITE },
  },
  url: PAGE_URL,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
  competitor: [
    { '@type': 'SportsTeam', name: 'Korea Republic', sameAs: 'https://en.wikipedia.org/wiki/South_Korea_national_football_team' },
    { '@type': 'SportsTeam', name: 'Czechia', sameAs: 'https://en.wikipedia.org/wiki/Czech_Republic_national_football_team' },
  ],
  organizer: { '@type': 'Organization', name: 'FIFA', url: 'https://www.fifa.com' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Where to watch Korea Republic vs Czechia World Cup 2026 for free?', acceptedAnswer: { '@type': 'Answer', text: 'Watch Korea vs Czechia World Cup 2026 free on SportaLive. Stream M6, beIN Sport 1, and La 1 live in HD — no subscription, no registration needed.' } },
    { '@type': 'Question', name: 'What time is Korea vs Czechia kick-off at World Cup 2026?', acceptedAnswer: { '@type': 'Answer', text: 'Korea vs Czechia kicks off 11 June 2026 at 23:00 UTC (08:00+1 Seoul, 01:00+1 Prague, 01:00+1 Paris, 00:00+1 London).' } },
    { '@type': 'Question', name: 'Which channel shows Korea Republic vs Czechia 2026 World Cup?', acceptedAnswer: { '@type': 'Answer', text: 'M6 (France — free), beIN Sports 1 (MENA), La 1 RTVE (Spain — free), and local Korean/Czech broadcasters. Free worldwide on SportaLive.' } },
    { '@type': 'Question', name: '한국 대 체코 2026 월드컵 어디서 무료로 볼 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: 'SportaLive.live에서 무료로 고화질로 시청하세요. 가입 없이, 구독 없이. M6, beIN Sport 1 또는 La 1 서버를 선택하고 클릭하면 바로 시작됩니다.' } },
  ],
};

async function findChannel(slugs: string[], patterns: string[]) {
  const bySlug = await prisma.channel.findFirst({ where: { slug: { in: slugs }, isActive: true }, orderBy: { order: 'asc' } }).catch(() => null);
  if (bySlug) return bySlug;
  for (const p of patterns) {
    const ch = await prisma.channel.findFirst({ where: { name: { contains: p, mode: 'insensitive' }, isActive: true }, orderBy: { order: 'asc' } }).catch(() => null);
    if (ch) return ch;
  }
  return null;
}

export default async function KoreaVsCzechiaPage() {
  const [m6, bein, la1] = await Promise.all([
    findChannel(['m6', 'm6-hd', 'm6-fr'], ['M6']),
    findChannel(['ar-bein-sport-uhd-1', 'bein-sport-1', 'bein-sport-uhd-1'], ['beIN Sports 1', 'beIN Sport 1', 'beIN Sports UHD']),
    findChannel(['la-1', 'la-1-rtve', 'la1'], ['La 1', 'RTVE']),
  ]);

  const homeLineup = ['Kim Seung-gyu', 'Kim Moon-hwan', 'Kim Min-jae', 'Jung Seung-hyun', 'Kim Jin-su', 'Jung Woo-young', 'Hwang In-beom', 'Lee Kang-in', 'Hwang Hee-chan', 'Son Heung-min', 'Cho Gue-sung'];
  const awayLineup = ['Staněk', 'Coufal', 'Hranáč', 'Kúdela', 'Jurásek', 'Souček', 'Červ', 'Lingr', 'Šick', 'Hložek', 'Kuchta'];

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="max-w-4xl mx-auto space-y-8">

        <section>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h1 className="text-white font-extrabold text-lg md:text-2xl leading-tight">
              🔴 Korea Republic vs Czechia — <span className="text-yellow-400">World Cup 2026 LIVE</span>
            </h1>
            <span className="flex items-center gap-1.5 text-red-400 text-xs font-bold bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />LIVE
            </span>
          </div>
          <WC2026StreamClient
            servers={[
              { label: 'M6', sublabel: 'France · Gratuit', channel: m6 as any },
              { label: 'beIN Sport 1', sublabel: 'UHD · عربي', channel: bein as any },
              { label: 'La 1', sublabel: 'RTVE · España', channel: la1 as any },
            ]}
            match={{ home: 'Korea Republic', homeFlag: 'kr', away: 'Czechia', awayFlag: 'cz', date: 'Thursday, 11 June 2026', time: '23:00 UTC' }}
          />
        </section>

        <AdBanner />

        {/* Hero */}
        <section className="relative rounded-3xl overflow-hidden border border-white/10"
          style={{ background: 'linear-gradient(135deg, #1a0608 0%, #0a0818 50%, #1a0608 100%)' }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="relative px-4 md:px-10 py-8 space-y-6">
            <div className="flex items-center justify-center gap-3">
              <span className="text-yellow-400 text-lg">⚽</span>
              <p className="text-yellow-300 text-xs md:text-sm font-bold uppercase tracking-[0.3em]">FIFA World Cup 2026 — Group A</p>
              <span className="text-yellow-400 text-lg">⚽</span>
            </div>
            <div className="flex items-center justify-center gap-6 md:gap-16">
              <div className="flex flex-col items-center gap-3">
                <img src="https://flagcdn.com/w160/kr.png" alt="Korea Republic" className="w-20 h-auto rounded shadow-lg" />
                <div className="text-center">
                  <p className="text-white font-black text-lg md:text-2xl uppercase">Korea Republic</p>
                  <p className="text-red-400 text-xs uppercase tracking-widest">태극전사</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-red-600 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">Live</span>
                </div>
                <p className="text-white/20 font-black text-2xl md:text-4xl tracking-[0.4em]">VS</p>
                <p className="text-gray-400 text-xs">11 June 2026 · 23:00 UTC</p>
                <p className="text-yellow-400 text-xs font-bold">Estadio Guadalajara</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <img src="https://flagcdn.com/w160/cz.png" alt="Czechia" className="w-20 h-auto rounded shadow-lg" />
                <div className="text-center">
                  <p className="text-white font-black text-lg md:text-2xl uppercase">Czechia</p>
                  <p className="text-red-400 text-xs uppercase tracking-widest">Lvi</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {[
                { icon: '📅', text: '11 June 2026' },
                { icon: '⏰', text: '23:00 UTC · 08:00+1 Seoul' },
                { icon: '🏟️', text: 'Estadio Guadalajara' },
                { icon: '🏆', text: 'Group A · Matchday 1' },
              ].map(({ icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300">
                  <span>{icon}</span>{text}
                </span>
              ))}
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Prediction: <span className="text-white font-bold">Korea Republic 1-1 Czechia</span></p>
            </div>
          </div>
        </section>

        {/* Kickoff times */}
        <section className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-3">
          <h2 className="text-white font-bold text-lg">🕒 Kickoff Times by Country</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {[
              { flag: '🇰🇷', country: 'Korea', time: '08:00+1' },
              { flag: '🇨🇿', country: 'Czechia', time: '01:00+1' },
              { flag: '🇫🇷', country: 'France', time: '01:00+1' },
              { flag: '🇸🇦', country: 'Arabia S.', time: '02:00+1' },
              { flag: '🇬🇧', country: 'UK', time: '00:00+1' },
              { flag: '🌍', country: 'UTC', time: '23:00' },
            ].map(({ flag, country, time }) => (
              <div key={country} className="flex justify-between px-3 py-2 bg-white/[0.03] rounded-lg">
                <span className="text-gray-400">{flag} {country}</span>
                <span className="text-white font-bold">{time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Lineups */}
        <section className="space-y-4">
          <h2 className="text-white font-bold text-xl">⚽ Predicted Lineups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-950/30 border border-red-500/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <img src="https://flagcdn.com/w40/kr.png" alt="Korea" className="w-8 h-auto rounded" />
                <div>
                  <p className="text-white font-black uppercase">Korea Republic</p>
                  <p className="text-red-400 text-xs">4-2-3-1 · Predicted XI</p>
                </div>
              </div>
              <div className="space-y-1">
                {homeLineup.map((name) => (
                  <div key={name} className="flex items-center gap-2 py-1 border-b border-white/5 text-sm">
                    <span className="text-gray-200">{name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-red-950/20 border border-red-400/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <img src="https://flagcdn.com/w40/cz.png" alt="Czechia" className="w-8 h-auto rounded" />
                <div>
                  <p className="text-white font-black uppercase">Czechia</p>
                  <p className="text-red-400 text-xs">4-2-3-1 · Predicted XI</p>
                </div>
              </div>
              <div className="space-y-1">
                {awayLineup.map((name) => (
                  <div key={name} className="flex items-center gap-2 py-1 border-b border-white/5 text-sm">
                    <span className="text-gray-200">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="text-white font-bold text-xl">Frequently Asked Questions</h2>
          {[
            { q: 'Where to watch Korea Republic vs Czechia World Cup 2026 for free?', a: 'Watch right here on SportaLive — stream M6, beIN Sport 1, and La 1 live in HD for free. No account needed.' },
            { q: 'What time is Korea vs Czechia at World Cup 2026?', a: 'Kick-off: 11 June 2026 at 23:00 UTC (08:00+1 Seoul, 01:00+1 Prague/Paris, 00:00+1 London).' },
            { q: 'Which TV channel shows Korea Republic vs Czechia?', a: 'M6 (France — free), beIN Sports 1 (MENA), La 1 RTVE (Spain — free). All free on SportaLive.' },
            { q: '한국 대 체코 2026 월드컵 무료 시청 방법은?', a: 'SportaLive.live에 접속해 서버를 선택하고 클릭하세요. M6, beIN Sport 1 또는 La 1로 HD 무료 생중계.' },
          ].map(({ q, a }, i) => (
            <details key={i} className="bg-gray-800/40 border border-white/5 rounded-xl p-4 cursor-pointer group">
              <summary className="text-white font-semibold text-sm list-none flex justify-between items-center gap-3">
                {q}<span className="text-purple-400 text-lg group-open:rotate-45 transition-transform flex-shrink-0">+</span>
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">{a}</p>
            </details>
          ))}
        </section>

        <AdBanner />

        <section className="flex flex-wrap gap-3 justify-center pb-4">
          {[
            { href: '/live', label: '📡 All Live Channels' },
            { href: '/world-cup-2026', label: '🏆 World Cup 2026' },
            { href: '/mexico-vs-south-africa-2026', label: '🇲🇽 Mexico vs South Africa' },
            { href: '/brazil-vs-morocco-2026', label: '🇧🇷 Brazil vs Morocco' },
            { href: '/netherlands-vs-japan-2026', label: '🇳🇱 Netherlands vs Japan' },
            { href: '/arsenal-vs-psg', label: '⚽ Arsenal vs PSG' },
          ].map(({ href, label }) => (
            <Link key={href} href={href}
              className="px-4 py-2 bg-gray-800/60 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/30 text-gray-400 hover:text-white text-sm rounded-xl transition-all">
              {label}
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}
