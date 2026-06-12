import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';
import {
  WC2026_TEAMS, getTeam, teamSlug, teamBySlug, teamMatches, teamGroup,
} from '@/data/wc2026-matches';

export const revalidate = 3600;
export const dynamicParams = false;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sportalive.live';

export function generateStaticParams() {
  return Object.keys(WC2026_TEAMS).map(name => ({ slug: teamSlug(name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = teamBySlug(slug);
  if (!name) return {};
  const url = `${SITE}/team/${slug}`;
  const grp = teamGroup(name);
  const title = `Watch ${name} at the 2026 World Cup — Free Live Stream & Schedule`;
  const description = `${name} World Cup 2026 — Group ${grp} fixtures, dates, kick-off times and free HD live streams on SportaLive. Watch every ${name} match free, no subscription.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title, description, url, type: 'website', siteName: 'SportaLive',
      images: [{ url: `${SITE}/og?slug=${teamMatches(name)[0]?.slug ?? ''}`, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  };
}

const utcHHMM = (iso: string) => iso.slice(11, 16);

export default async function TeamPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const name = teamBySlug(slug);
  if (!name) notFound();

  const team = getTeam(name)!;
  const grp = teamGroup(name);
  const matches = teamMatches(name);

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'SportsTeam',
    name, sport: 'Soccer',
    memberOf: { '@type': 'SportsOrganization', name: 'FIFA World Cup 2026' },
    url: `${SITE}/team/${slug}`,
    subEvent: matches.map(m => ({
      '@type': 'SportsEvent',
      name: `${m.home} vs ${m.away}`,
      startDate: m.startUtc,
      location: { '@type': 'Place', name: m.venue },
      url: `${SITE}/${m.slug}`,
    })),
  };
  const breadcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'World Cup 2026', item: `${SITE}/wc2026` },
      { '@type': 'ListItem', position: 3, name, item: `${SITE}/team/${slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumb} />
      <div className="max-w-3xl mx-auto px-4 md:px-0 py-8 space-y-8">

        <nav className="text-xs text-white/40">
          <Link href="/" className="hover:text-white">Home</Link> ›{' '}
          <Link href="/wc2026" className="hover:text-white">World Cup 2026</Link> › <span className="text-white/70">{name}</span>
        </nav>

        <header className="flex items-center gap-4">
          <img src={`https://flagcdn.com/w80/${team.flag}.png`} alt={name} width={64} height={43} className="rounded shadow-lg" />
          <div>
            <h1 className="text-white text-3xl font-black">{name} — World Cup 2026</h1>
            <p className="text-white/50 text-sm mt-1">
              {team.nickname ? `${team.nickname} · ` : ''}Group {grp} · Watch free live in HD
            </p>
          </div>
        </header>

        <p className="text-gray-300 leading-relaxed">
          Follow <strong className="text-white">{name}</strong> at the FIFA World Cup 2026 free on SportaLive.
          Below are all of {name}&apos;s Group {grp} fixtures with dates, kick-off times and stadiums —
          click any match to watch the live stream free in HD, no subscription and no registration.
        </p>

        <section className="space-y-3">
          <h2 className="text-white text-xl font-black">{name} — Group {grp} fixtures</h2>
          {matches.map(m => {
            const home = m.home === name;
            const oppName = home ? m.away : m.home;
            const oppFlag = home ? m.af : m.hf;
            return (
              <Link key={m.slug} href={`/${m.slug}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 hover:border-red-600/40 hover:bg-white/[0.08] transition-colors">
                <div className="flex items-center gap-2 min-w-0">
                  <img src={`https://flagcdn.com/w20/${team.flag}.png`} alt="" width={20} height={14} className="rounded-sm" />
                  <span className="text-white text-sm font-bold">{name}</span>
                  <span className="text-white/30 text-xs">vs</span>
                  <span className="text-white text-sm font-bold">{oppName}</span>
                  <img src={`https://flagcdn.com/w20/${oppFlag}.png`} alt="" width={20} height={14} className="rounded-sm" />
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-white/70 text-[11px]">{m.dayShort} · {utcHHMM(m.startUtc)} UTC</p>
                  <p className="text-red-400 text-[11px] font-bold">▶ Watch free</p>
                </div>
              </Link>
            );
          })}
        </section>

        <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-white text-lg font-black mb-2">How to watch {name} free</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            SportaLive streams every {name} World Cup 2026 match free in HD via beIN Sports, M6 and more —
            no cable, no subscription, no account. Open any fixture above and press play.
          </p>
        </section>

        <section>
          <h2 className="text-white text-lg font-black mb-3">FAQ</h2>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-white font-semibold">When does {name} play at the World Cup 2026?</p>
              <p className="text-gray-400">{name} play {matches.length} group matches in Group {grp}: {matches.map(m => `${m.home === name ? m.away : m.home} (${m.dayShort})`).join(', ')}.</p>
            </div>
            <div>
              <p className="text-white font-semibold">Where can I watch {name} matches free?</p>
              <p className="text-gray-400">Watch all {name} matches free in HD on SportaLive — beIN Sports, M6 and more. No subscription required.</p>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-2 pt-2">
          <Link href="/wc2026" className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs text-white/70 hover:text-white">📅 Full schedule</Link>
          <Link href="/world-cup-2026-live" className="rounded-full bg-red-600 px-4 py-2 text-xs font-bold text-white">🔴 Live now</Link>
        </div>
      </div>
    </>
  );
}
