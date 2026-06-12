import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import WC2026MatchLayout from '@/components/worldcup/WC2026MatchLayout';
import { blogs } from '@/data/wc2026-blogs';
import { getWcExtraChannels } from '@/lib/wc-channels';
import { buildMatchMetadata, buildMatchJsonLd, buildBreadcrumbJsonLd } from '@/lib/match-seo';

export const revalidate = 3600;

export const metadata: Metadata = buildMatchMetadata('netherlands-vs-japan-2026');

export default async function Page() {
  const [beinMax2, beinMax1, m6, beinGlobal] = await getWcExtraChannels();

  return (
    <>
      <JsonLd data={buildMatchJsonLd('netherlands-vs-japan-2026')} />
      <JsonLd data={buildBreadcrumbJsonLd('netherlands-vs-japan-2026')} />
      <WC2026MatchLayout
        home={{ name: 'Netherlands', flag: 'nl', nickname: 'Oranje', formation: '4-3-3' }}
        away={{ name: 'Japan', flag: 'jp', nickname: 'Samurai Blue', formation: '4-2-3-1' }}
        meta={{ date: 'Sunday, 14 June 2026', time: '20:00 UTC', venue: 'AT&T Stadium, Dallas', group: 'F', matchday: 1, prediction: 'Netherlands 2-1 Japan' }}
        servers={[
          { label: 'beIN MAX 2', sublabel: 'beIN · MAX 2 · FHD', channel: beinMax2   as any },
          { label: 'beIN MAX 1', sublabel: 'beIN · MAX 1 · FHD', channel: beinMax1   as any },
          { label: 'M6',         sublabel: 'France · M6 · FHD',   channel: m6         as any },
          { label: 'beIN Global', sublabel: 'beIN · Global · HD', channel: beinGlobal as any },
        ]}
        blog={blogs['netherlands-vs-japan']}
        kickoffTimes={[{"flag":"🇺🇸","country":"Dallas","time":"15:00"},{"flag":"🇫🇷","country":"Paris","time":"22:00"},{"flag":"🇬🇧","country":"London","time":"21:00"},{"flag":"🇺🇸","country":"New York","time":"16:00"},{"flag":"🇸🇦","country":"Riyadh","time":"23:00"},{"flag":"🌍","country":"UTC","time":"20:00"}]}
        faqs={[
          { q: 'Where to watch Netherlands vs Japan World Cup 2026 free?', a: 'Watch free on SportaLive — beIN Sport 1, M6 and RMC Sport live in HD. No subscription, no registration.' },
          { q: 'What time is Netherlands vs Japan kick-off?', a: 'Sunday, 14 June 2026 at 20:00 UTC. Watch free on SportaLive.' },
          { q: 'كيف أشاهد Netherlands ضد Japan مجاناً؟', a: 'شاهد المباراة مجاناً على SportaLive عبر beIN Sport 1 بدون اشتراك ولا تسجيل.' },
        ]}
        relatedLinks={[{ href: '/world-cup-2026-live', label: '🔴 WC2026 Live' }, { href: '/wc2026', label: '📅 Schedule' }, { href: '/sweden-vs-tunisia-2026', label: '🇸🇪 Sweden vs Tunisia' }, { href: '/germany-vs-curacao-2026', label: '🇩🇪 Germany vs Curaçao' }]}
      />
    </>
  );
}

