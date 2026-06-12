import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import WC2026MatchLayout from '@/components/worldcup/WC2026MatchLayout';
import { blogs } from '@/data/wc2026-blogs';
import { getWcExtraChannels } from '@/lib/wc-channels';
import { buildMatchMetadata, buildMatchJsonLd, buildBreadcrumbJsonLd } from '@/lib/match-seo';

export const revalidate = 3600;

export const metadata: Metadata = buildMatchMetadata('haiti-vs-scotland-2026');

export default async function Page() {
  const [beinMax2, beinMax1, m6, beinGlobal] = await getWcExtraChannels();

  return (
    <>
      <JsonLd data={buildMatchJsonLd('haiti-vs-scotland-2026')} />
      <JsonLd data={buildBreadcrumbJsonLd('haiti-vs-scotland-2026')} />
      <WC2026MatchLayout
        home={{ name: 'Haiti', flag: 'ht', nickname: 'Les Grenadiers', formation: '4-5-1' }}
        away={{ name: 'Scotland', flag: 'gb-sct', nickname: 'The Scots', formation: '3-4-3' }}
        meta={{ date: 'Saturday, 13 June 2026', time: '01:00 UTC (14 Jun)', venue: 'Gillette Stadium, Boston', group: 'C', matchday: 1, prediction: 'Haiti 1-2 Scotland' }}
        servers={[
          { label: 'beIN MAX 2', sublabel: 'beIN · MAX 2 · FHD', channel: beinMax2   as any },
          { label: 'beIN MAX 1', sublabel: 'beIN · MAX 1 · FHD', channel: beinMax1   as any },
          { label: 'M6',         sublabel: 'France · M6 · FHD',   channel: m6         as any },
          { label: 'beIN Global', sublabel: 'beIN · Global · HD', channel: beinGlobal as any },
        ]}
        blog={blogs['haiti-vs-scotland']}
        kickoffTimes={[{"flag":"🇺🇸","country":"Boston","time":"21:00"},{"flag":"🇫🇷","country":"Paris","time":"03:00+1"},{"flag":"🇬🇧","country":"London","time":"02:00+1"},{"flag":"🇺🇸","country":"New York","time":"21:00"},{"flag":"🇸🇦","country":"Riyadh","time":"04:00+1"},{"flag":"🌍","country":"UTC","time":"01:00+1"}]}
        faqs={[
          { q: 'Where to watch Haiti vs Scotland World Cup 2026 free?', a: 'Watch free on SportaLive — beIN Sport 1, M6 and RMC Sport live in HD. No subscription, no registration.' },
          { q: 'What time is Haiti vs Scotland kick-off?', a: 'Saturday, 13 June 2026 at 01:00 UTC (14 Jun). Watch free on SportaLive.' },
          { q: 'كيف أشاهد Haiti ضد Scotland مجاناً؟', a: 'شاهد المباراة مجاناً على SportaLive عبر beIN Sport 1 بدون اشتراك ولا تسجيل.' },
        ]}
        relatedLinks={[{ href: '/world-cup-2026-live', label: '🔴 WC2026 Live' }, { href: '/wc2026', label: '📅 Schedule' }, { href: '/usa-vs-paraguay-2026', label: '🇺🇸 USA vs Paraguay' }, { href: '/australia-vs-turkiye-2026', label: '🇦🇺 Australia vs Türkiye' }]}
      />
    </>
  );
}

