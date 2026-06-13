import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';
import WC2026MatchLayout from '@/components/worldcup/WC2026MatchLayout';
import { blogs } from '@/data/wc2026-blogs';
import { getWcExtraChannels } from '@/lib/wc-channels';
import { buildMatchMetadata, buildMatchJsonLd, buildBreadcrumbJsonLd } from '@/lib/match-seo';
import { WC2026_MATCHES, getMatch, getTeam, groupMatches, teamSlug, teamI18n } from '@/data/wc2026-matches';

export const revalidate = 3600;
export const dynamicParams = false; // only the 72 generated slugs are valid; others 404

export function generateStaticParams() {
  return WC2026_MATCHES.map(m => ({ match: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ match: string }> }): Promise<Metadata> {
  const { match } = await params;
  return buildMatchMetadata(match);
}

const utcHHMM = (iso: string) => iso.slice(11, 16);

// Around-the-world kick-off times computed from the UTC start.
function kickoffTimes(iso: string) {
  const d = new Date(iso);
  const ref = d.getUTCDate();
  const zones: [string, string, number][] = [
    ['🇫🇷', 'Paris', 2], ['🇬🇧', 'London', 1], ['🇲🇦', 'Casablanca', 1],
    ['🇺🇸', 'New York', -4], ['🇸🇦', 'Riyadh', 3], ['🌍', 'UTC', 0],
  ];
  return zones.map(([flag, country, off]) => {
    const t = new Date(d.getTime() + off * 3600_000);
    const dd = t.getUTCDate() - ref;
    const suf = dd === 1 ? '+1' : dd === -1 ? '-1' : '';
    const hh = String(t.getUTCHours()).padStart(2, '0');
    const mm = String(t.getUTCMinutes()).padStart(2, '0');
    return { flag, country, time: `${hh}:${mm}${suf}` };
  });
}

export default async function MatchPage({ params }: { params: Promise<{ match: string }> }) {
  const { match } = await params;
  const m = getMatch(match);
  if (!m) notFound();

  const [beinMax2, beinMax1, m6, beinGlobal] = await getWcExtraChannels();
  const ht = getTeam(m.home);
  const at = getTeam(m.away);
  const hI = teamI18n(m.home);
  const aI = teamI18n(m.away);
  // Visible multilingual name variants (FR/ES/PT deduped + AR) — real indexable
  // content so "maroc vs brésil", "brasil vs marruecos", etc. all match.
  const latin = Array.from(new Set([
    `${hI.fr} vs ${aI.fr}`, `${hI.es} vs ${aI.es}`, `${hI.pt} vs ${aI.pt}`,
  ]));
  const altTitle = `${latin.join(' · ')} · ${hI.ar} ضد ${aI.ar}`;
  const blog = (blogs as Record<string, any>)[match.replace(/-2026$/, '')];

  // Generated matches (no hand-written blog) get a factual preview instead of
  // fabricated form/line-up stats.
  const preview = blog ? undefined : [
    `${m.home} face ${m.away} in Group ${m.group} of the FIFA World Cup 2026, on ${m.dateFull} at ${m.venue}. Watch the match live and free in HD on SportaLive — no subscription, no registration required.`,
    `Kick-off is at ${utcHHMM(m.startUtc)} UTC (${m.time} Paris time). Both teams will be chasing three points in Group ${m.group}. Pick one of the free servers above to follow every minute of ${m.home} vs ${m.away}.`,
    `SportaLive streams the 2026 World Cup free via beIN Sports, M6 and more. Bookmark this page and explore the rest of the Group ${m.group} fixtures in the related links below.`,
  ];

  const faqs = [
    { q: `Where to watch ${m.home} vs ${m.away} World Cup 2026 free?`, a: `Watch ${m.home} vs ${m.away} free in HD on SportaLive — beIN Sports, M6 and more. No subscription, no registration.` },
    { q: `What time is ${m.home} vs ${m.away} kick-off?`, a: `${m.dateFull} at ${utcHHMM(m.startUtc)} UTC (${m.time} Paris). Group ${m.group}, at ${m.venue}.` },
  ];

  const relatedLinks = [
    { href: `/team/${teamSlug(m.home)}`, label: `🏟️ All ${m.home} matches` },
    { href: `/team/${teamSlug(m.away)}`, label: `🏟️ All ${m.away} matches` },
    { href: '/wc2026', label: '📅 Schedule' },
    ...groupMatches(match).slice(0, 2).map(x => ({ href: `/${x.slug}`, label: `${x.home} vs ${x.away}` })),
  ];

  return (
    <>
      <JsonLd data={buildMatchJsonLd(match)} />
      <JsonLd data={buildBreadcrumbJsonLd(match)} />
      <WC2026MatchLayout
        home={{ name: m.home, flag: m.hf, nickname: ht?.nickname || undefined }}
        away={{ name: m.away, flag: m.af, nickname: at?.nickname || undefined }}
        meta={{ date: m.dateFull, time: `${utcHHMM(m.startUtc)} UTC`, venue: m.venue, group: m.group }}
        servers={[
          { label: 'beIN MAX 2', sublabel: 'beIN · MAX 2 · FHD', channel: beinMax2 as any },
          { label: 'beIN MAX 1', sublabel: 'beIN · MAX 1 · FHD', channel: beinMax1 as any },
          { label: 'M6', sublabel: 'France · M6 · FHD', channel: m6 as any },
          { label: 'beIN Global', sublabel: 'beIN · Global · HD', channel: beinGlobal as any },
        ]}
        blog={blog}
        preview={preview}
        altTitle={altTitle}
        kickoffTimes={kickoffTimes(m.startUtc)}
        faqs={faqs}
        relatedLinks={relatedLinks}
      />
    </>
  );
}
