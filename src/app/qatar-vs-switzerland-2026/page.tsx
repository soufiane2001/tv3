import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import WC2026MatchLayout from '@/components/worldcup/WC2026MatchLayout';
import { blogs } from '@/data/wc2026-blogs';
import { getWcExtraChannels } from '@/lib/wc-channels';
import { buildMatchMetadata, buildMatchJsonLd, buildBreadcrumbJsonLd } from '@/lib/match-seo';

export const revalidate = 3600;

export const metadata: Metadata = buildMatchMetadata('qatar-vs-switzerland-2026');

export default async function Page() {
  const [beinMax2, beinMax1, m6, beinGlobal] = await getWcExtraChannels();

  return (
    <>
      <JsonLd data={buildMatchJsonLd('qatar-vs-switzerland-2026')} />
      <JsonLd data={buildBreadcrumbJsonLd('qatar-vs-switzerland-2026')} />
      <WC2026MatchLayout
        home={{ name: 'Qatar', flag: 'qa', nickname: 'Al Annabi', formation: '4-3-3' }}
        away={{ name: 'Switzerland', flag: 'ch', nickname: 'Nati', formation: '4-2-3-1' }}
        meta={{ date: 'Saturday, 13 June 2026', time: '19:00 UTC', venue: 'Levi\'s Stadium, Santa Clara', group: 'B', matchday: 1, prediction: 'Qatar 1-2 Switzerland' }}
        servers={[
          { label: 'beIN MAX 2', sublabel: 'beIN · MAX 2 · FHD', channel: beinMax2   as any },
          { label: 'beIN MAX 1', sublabel: 'beIN · MAX 1 · FHD', channel: beinMax1   as any },
          { label: 'M6',         sublabel: 'France · M6 · FHD',   channel: m6         as any },
          { label: 'beIN Global', sublabel: 'beIN · Global · HD', channel: beinGlobal as any },
        ]}
        blog={blogs['qatar-vs-switzerland']}
        kickoffTimes={[{"flag":"🇺🇸","country":"San Francisco","time":"12:00"},{"flag":"🇫🇷","country":"Paris","time":"21:00"},{"flag":"🇬🇧","country":"London","time":"20:00"},{"flag":"🇺🇸","country":"New York","time":"15:00"},{"flag":"🇸🇦","country":"Riyadh","time":"22:00"},{"flag":"🌍","country":"UTC","time":"19:00"}]}
        faqs={[
          { q: 'Where to watch Qatar vs Switzerland World Cup 2026 free?', a: 'Watch free on SportaLive — beIN Sport 1, M6 and RMC Sport live in HD. No subscription, no registration.' },
          { q: 'What time is Qatar vs Switzerland kick-off?', a: 'Saturday, 13 June 2026 at 19:00 UTC. Watch free on SportaLive.' },
          { q: 'كيف أشاهد Qatar ضد Switzerland مجاناً؟', a: 'شاهد المباراة مجاناً على SportaLive عبر beIN Sport 1 بدون اشتراك ولا تسجيل.' },
        ]}
        relatedLinks={[{ href: '/world-cup-2026-live', label: '🔴 WC2026 Live' }, { href: '/wc2026', label: '📅 Schedule' }, { href: '/brazil-vs-morocco-2026', label: '🇧🇷 Brazil vs Morocco' }, { href: '/ivory-coast-vs-ecuador-2026', label: '🇨🇮 Ivory Coast vs Ecuador' }]}
      />
    </>
  );
}

