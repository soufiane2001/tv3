import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import ChannelPageClient from './ChannelPageClient';

interface Props { params: Promise<{ slug: string }> }

/* ── Event override map: enriches SEO when a channel airs a known live event ── */
const EVENT_OVERRIDES: Record<string, {
  title: string; description: string; keywords: string[];
  jsonLd?: Record<string, unknown>;
}> = {
  'la-1': {
    title: '🔴 La 1 En Directo — Final Champions League 2026: Arsenal vs PSG EN VIVO AHORA',
    description: 'Ver La 1 en directo gratis — Final UEFA Champions League 2026: Arsenal vs Paris Saint-Germain en vivo HD. La 1 online sin registro. Watch Arsenal vs PSG Champions League Final 2026 free live stream. Arsenal PSG finale en direct. ارسنال باريس سان جيرمان بث مباشر نهائي دوري الأبطال 2026.',
    keywords: [
      // Spanish — highest traffic
      'la 1 en directo','la 1 en vivo','la primera en directo','la 1 españa en directo',
      'ver la 1 online gratis','final champions league 2026 la 1','arsenal vs psg la 1 en directo',
      'arsenal psg en vivo gratis','final champions league en directo gratis',
      'ver final champions 2026 gratis','arsenal psg la 1 directo','final champions la 1',
      'champions league final 2026 en directo','como ver champions league final gratis 2026',
      // English — global traffic
      'arsenal vs psg live stream','arsenal psg champions league final 2026',
      'watch arsenal vs psg free','champions league final 2026 live stream free',
      'ucl final 2026 live','arsenal psg final live hd','la 1 live stream free',
      'watch champions league final 2026 free online','arsenal psg stream no registration',
      'champions league final free stream 2026','arsenal vs paris saint-germain final',
      'how to watch champions league final 2026 free','ucl 2026 final live stream',
      // Arabic
      'بث مباشر نهائي دوري أبطال أوروبا 2026','ارسنال باريس سان جيرمان بث مباشر',
      'مشاهدة نهائي دوري الأبطال مجاناً','نهائي دوري أبطال أوروبا 2026 بث مباشر',
      'ارسنال باريس نهائي','مشاهدة لا 1 مباشر',
      // French
      'arsenal psg finale ligue des champions 2026','voir arsenal psg en direct gratuit',
      'finale champions league 2026 en direct','arsenal psg direct gratuit',
      // German / Italian / Portuguese
      'champions league finale 2026 live stream','arsenal psg finale live',
      'arsenal psg final ao vivo gratis','arsenal psg finale champions 2026',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BroadcastEvent',
      name: 'UEFA Champions League Final 2026 — Arsenal vs PSG LIVE on La 1',
      description: 'Live broadcast of the UEFA Champions League Final 2026 between Arsenal FC and Paris Saint-Germain. Watch free on La 1 (RTVE).',
      startDate: '2026-05-27T20:00:00Z',
      endDate: '2026-05-27T22:30:00Z',
      isLiveBroadcast: true,
      videoFormat: 'HD',
      inLanguage: 'es',
      broadcastDisplayName: 'La 1 — RTVE',
      broadcastChannelId: 'la-1',
      potentialAction: {
        '@type': 'WatchAction',
        target: `${process.env.NEXT_PUBLIC_SITE_URL}/channel/la-1`,
      },
      broadcastOfEvent: {
        '@type': 'SportsEvent',
        name: 'Arsenal FC vs Paris Saint-Germain — UEFA Champions League Final 2026',
        alternateName: ['Arsenal vs PSG Final UCL 2026', 'UCL Final 2026'],
        sport: 'https://en.wikipedia.org/wiki/Association_football',
        startDate: '2026-05-27T20:00:00Z',
        endDate: '2026-05-27T22:00:00Z',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
        competitor: [
          {
            '@type': 'SportsTeam',
            name: 'Arsenal FC',
            alternateName: 'Arsenal',
            sport: 'Football',
            url: 'https://www.arsenal.com',
            memberOf: { '@type': 'SportsOrganization', name: 'Premier League' },
          },
          {
            '@type': 'SportsTeam',
            name: 'Paris Saint-Germain',
            alternateName: ['PSG','Paris SG'],
            sport: 'Football',
            url: 'https://www.psg.fr',
            memberOf: { '@type': 'SportsOrganization', name: 'Ligue 1' },
          },
        ],
        organizer: {
          '@type': 'Organization',
          name: 'UEFA',
          url: 'https://www.uefa.com',
          sameAs: 'https://en.wikipedia.org/wiki/UEFA',
        },
        superEvent: {
          '@type': 'SportsEvent',
          name: 'UEFA Champions League 2025-26',
          url: 'https://www.uefa.com/uefachampionsleague/',
        },
      },
      publisher: {
        '@type': 'Organization',
        name: 'RTVE — La 1',
        url: 'https://www.rtve.es/play/videos/directo/la-1/',
        logo: { '@type': 'ImageObject', url: 'https://www.rtve.es/resources/img/logos/la1.png' },
      },
    },
  },
  'la-1-1': {
    title: '🔴 La 1 En Directo — Final Champions League 2026: Arsenal vs PSG EN VIVO',
    description: 'Ver La 1 en directo — Final UEFA Champions League 2026 Arsenal vs PSG. Stream HD gratis sin registro. Watch Arsenal PSG Champions League Final free.',
    keywords: ['la 1 en directo','arsenal psg la 1','champions league final 2026','arsenal vs psg live','la 1 live stream'],
    jsonLd: { '@context': 'https://schema.org', '@type': 'BroadcastEvent', name: 'Arsenal vs PSG — UCL Final 2026 on La 1', isLiveBroadcast: true, startDate: '2026-05-27T20:00:00Z' },
  },
  'la-1-2': {
    title: '🔴 La 1 En Directo — Final Champions League 2026: Arsenal vs PSG EN VIVO',
    description: 'Ver La 1 en directo — Final UEFA Champions League 2026 Arsenal vs PSG. Stream HD gratis sin registro. Watch Arsenal PSG Champions League Final free.',
    keywords: ['la 1 en directo','arsenal psg la 1','champions league final 2026','arsenal vs psg live','la 1 live stream'],
    jsonLd: { '@context': 'https://schema.org', '@type': 'BroadcastEvent', name: 'Arsenal vs PSG — UCL Final 2026 on La 1', isLiveBroadcast: true, startDate: '2026-05-27T20:00:00Z' },
  },
  'm6': {
    title: '🔴 M6 En Direct — Finale Ligue des Champions 2026 : Arsenal vs PSG LIVE',
    description: 'Regarder M6 en direct gratuitement — Finale UEFA Champions League 2026 : Arsenal vs Paris Saint-Germain en live HD. M6 streaming gratuit sans inscription. Watch Arsenal vs PSG Champions League Final free on M6. Arsenal PSG M6 en direct. ارسنال باريس سان جيرمان بث مباشر نهائي دوري الأبطال M6.',
    keywords: [
      // French — primary audience
      'm6 en direct','m6 direct','regarder m6 gratuitement','m6 streaming gratuit',
      'm6 live stream','m6 direct gratuit','m6 en ligne gratuit','voir m6 en direct',
      'finale champions league 2026 m6','arsenal psg m6 en direct',
      'finale ligue des champions 2026 en direct m6','m6 finale champions league',
      'arsenal psg finale m6','regarder finale champions league m6 gratuit',
      'arsenal contre psg m6 en direct','m6 football en direct',
      // English
      'm6 live free','m6 france live stream','watch m6 online free',
      'arsenal vs psg live m6','champions league final 2026 m6',
      'ucl final 2026 m6 stream','arsenal psg m6 live',
      // Arabic
      'قناة m6 بث مباشر','ارسنال باريس m6 مباشر',
      'نهائي أبطال أوروبا 2026 m6','مشاهدة m6 مجاناً',
      // Spanish / other
      'm6 france en directo','ver m6 online gratis','final champions m6',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BroadcastEvent',
      name: 'UEFA Champions League Final 2026 — Arsenal vs PSG LIVE sur M6',
      description: 'Diffusion en direct de la Finale de la Ligue des Champions 2026 entre Arsenal FC et Paris Saint-Germain sur M6.',
      startDate: '2026-05-30T20:00:00Z',
      endDate: '2026-05-30T22:30:00Z',
      isLiveBroadcast: true,
      inLanguage: 'fr',
      videoFormat: 'HD',
      broadcastDisplayName: 'M6',
      potentialAction: {
        '@type': 'WatchAction',
        target: `${process.env.NEXT_PUBLIC_SITE_URL}/channel/m6`,
      },
      broadcastOfEvent: {
        '@type': 'SportsEvent',
        name: 'Arsenal FC vs Paris Saint-Germain — UEFA Champions League Final 2026',
        sport: 'Football',
        startDate: '2026-05-30T20:00:00Z',
        competitor: [
          { '@type': 'SportsTeam', name: 'Arsenal FC', alternateName: 'Arsenal' },
          { '@type': 'SportsTeam', name: 'Paris Saint-Germain', alternateName: ['PSG', 'Paris SG'] },
        ],
        organizer: { '@type': 'Organization', name: 'UEFA', url: 'https://www.uefa.com' },
      },
      publisher: {
        '@type': 'Organization',
        name: 'M6 — Métropole Télévision',
        url: 'https://www.m6.fr',
      },
    },
  },
  'canal-sport': {
    title: '🔴 Canal+ Sport En Direct — Finale Champions League 2026 : Arsenal vs PSG LIVE',
    description: 'Regarder Canal+ Sport en direct gratuitement — Finale UEFA Champions League 2026 : Arsenal vs Paris Saint-Germain en live HD. Canal+ Sport streaming gratuit sans inscription. Watch Arsenal vs PSG Champions League Final free on Canal+ Sport. ارسنال باريس سان جيرمان بث مباشر نهائي دوري الأبطال Canal+ Sport.',
    keywords: [
      // French — primary
      'canal+ sport en direct','canal plus sport en direct','canal sport direct',
      'regarder canal+ sport gratuitement','canal+ sport streaming gratuit',
      'canal+ sport live stream','canal sport en ligne','voir canal+ sport en direct',
      'finale champions league 2026 canal+ sport','arsenal psg canal+ sport',
      'finale ligue des champions 2026 canal sport','canal+ sport finale champions',
      'arsenal psg canal sport en direct','canal sport football en direct',
      'arsenal contre psg canal+ sport live','canal plus sport finale 2026',
      'canal+ sport hd en direct','canal sport hd live',
      // English
      'canal plus sport live','canal+ sport live free','watch canal sport online free',
      'arsenal vs psg canal sport','champions league final 2026 canal sport',
      'canal sport hd stream','arsenal psg canal+ live',
      // Arabic
      'قناة كانال سبورت بث مباشر','ارسنال باريس canal sport مباشر',
      'نهائي أبطال أوروبا 2026 canal sport','مشاهدة كانال سبورت مجاناً',
      'كانال بلوس سبورت بث مباشر',
      // Spanish / other
      'canal+ sport en directo','ver canal sport online gratis','final champions canal sport',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BroadcastEvent',
      name: 'UEFA Champions League Final 2026 — Arsenal vs PSG LIVE sur Canal+ Sport',
      description: 'Diffusion en direct de la Finale de la Ligue des Champions 2026 entre Arsenal FC et Paris Saint-Germain sur Canal+ Sport HD.',
      startDate: '2026-05-30T20:00:00Z',
      endDate: '2026-05-30T22:30:00Z',
      isLiveBroadcast: true,
      inLanguage: 'fr',
      videoFormat: 'HD',
      broadcastDisplayName: 'Canal+ Sport',
      potentialAction: {
        '@type': 'WatchAction',
        target: `${process.env.NEXT_PUBLIC_SITE_URL}/channel/canal-sport`,
      },
      broadcastOfEvent: {
        '@type': 'SportsEvent',
        name: 'Arsenal FC vs Paris Saint-Germain — UEFA Champions League Final 2026',
        sport: 'Football',
        startDate: '2026-05-30T20:00:00Z',
        competitor: [
          { '@type': 'SportsTeam', name: 'Arsenal FC', alternateName: 'Arsenal' },
          { '@type': 'SportsTeam', name: 'Paris Saint-Germain', alternateName: ['PSG', 'Paris SG'] },
        ],
        organizer: { '@type': 'Organization', name: 'UEFA', url: 'https://www.uefa.com' },
      },
      publisher: {
        '@type': 'Organization',
        name: 'Canal+ Sport — Groupe Canal+',
        url: 'https://www.canalplus.com',
      },
    },
  },
  'canal-sport-hd': {
    title: '🔴 Canal+ Sport HD En Direct — Finale Champions League 2026 : Arsenal vs PSG',
    description: 'Canal+ Sport HD en direct — Finale UEFA Champions League 2026 : Arsenal vs PSG. Stream HD gratuit sans inscription. Canal plus sport hd live stream free. نهائي دوري الأبطال 2026 بث مباشر.',
    keywords: ['canal+ sport hd en direct','canal sport hd live','canal plus sport hd','arsenal psg canal sport hd','champions league final 2026 canal sport','canal sport hd stream free'],
    jsonLd: { '@context': 'https://schema.org', '@type': 'BroadcastEvent', name: 'Arsenal vs PSG — UCL Final 2026 on Canal+ Sport HD', isLiveBroadcast: true, startDate: '2026-05-30T20:00:00Z' },
  },
  'trt-1': {
    title: '🔴 TRT 1 Canlı — Conference League Final: Crystal Palace vs Rayo Vallecano 2026',
    description: 'Watch TRT 1 live — UEFA Conference League Final 2026: Crystal Palace vs Rayo Vallecano. TRT 1 canlı yayın, conference league final 2026 live stream free. Crystal Palace Rayo Vallecano en vivo.',
    keywords: [
      'trt 1 canlı izle','trt 1 live stream','conference league final 2026',
      'crystal palace vs rayo vallecano','crystal palace rayo final',
      'conference league final live','trt 1 canlı','watch trt 1 online',
      'crystal palace rayo vallecano live','uefa conference league final 2026',
      'conference league final stream free',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BroadcastEvent',
      name: 'UEFA Conference League Final 2026 — Crystal Palace vs Rayo Vallecano on TRT 1',
      startDate: '2026-05-27T20:00:00Z',
      isLiveBroadcast: true,
      broadcastOfEvent: {
        '@type': 'SportsEvent',
        name: 'Crystal Palace vs Rayo Vallecano — UEFA Conference League Final 2026',
        sport: 'Football',
        startDate: '2026-05-27T20:00:00Z',
        competitor: [
          { '@type': 'SportsTeam', name: 'Crystal Palace' },
          { '@type': 'SportsTeam', name: 'Rayo Vallecano' },
        ],
      },
      broadcastDisplayName: 'TRT 1',
    },
  },
  'trt': {
    title: '🔴 TRT Canlı — UEFA Conference League Final: Crystal Palace vs Rayo Vallecano LIVE',
    description: 'Watch TRT live — UEFA Conference League Final 2026: Crystal Palace vs Rayo Vallecano. Free HD live stream. TRT canlı yayın, Conference League final maçı izle. Crystal Palace vs Rayo Vallecano en vivo gratis. مباراة كريستال بالاس رايو فاليكانو بث مباشر.',
    keywords: [
      'crystal palace vs rayo vallecano live','conference league final 2026',
      'crystal palace rayo vallecano final','trt canlı izle','trt live stream',
      'conference league final live stream free','crystal palace rayo live',
      'uefa conference league final 2026 live','watch conference league final',
      'crystal palace vs rayo vallecano stream','trt 1 canlı maç izle',
      'conference league final trt','crystal palace rayo vallecano canlı',
      'final conference league 2026 streaming','كريستال بالاس رايو فاليكانو',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BroadcastEvent',
      name: 'UEFA Conference League Final 2026 — Crystal Palace vs Rayo Vallecano LIVE on TRT',
      startDate: '2026-05-28T20:00:00Z',
      isLiveBroadcast: true,
      broadcastOfEvent: {
        '@type': 'SportsEvent',
        name: 'Crystal Palace FC vs Rayo Vallecano — UEFA Conference League Final 2026',
        sport: 'Football',
        startDate: '2026-05-28T20:00:00Z',
        location: { '@type': 'Place', name: 'Estadio de La Cartuja, Seville' },
        competitor: [
          { '@type': 'SportsTeam', name: 'Crystal Palace FC', url: 'https://www.cpfc.co.uk' },
          { '@type': 'SportsTeam', name: 'Rayo Vallecano', url: 'https://www.rayovallecano.es' },
        ],
        organizer: { '@type': 'Organization', name: 'UEFA' },
      },
      broadcastDisplayName: 'TRT',
      videoFormat: 'HD',
    },
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const channel = await prisma.channel.findFirst({
    where: { OR: [{ slug }, { slug: slug.replace(/-\d+$/, '') }], isActive: true },
    include: { category: true },
  }).catch(() => null);

  if (!channel) return {};

  const override = EVENT_OVERRIDES[slug];
  const baseTitle = override?.title ?? `Watch ${channel.name} Live Stream — Free HD`;
  const baseDesc  = override?.description ??
    `Stream ${channel.name} live online free in HD. ${channel.groupTitle} channel available 24/7 on SportaLive. Watch ${channel.name} without subscription.`;

  return {
    title: baseTitle,
    description: baseDesc,
    keywords: [
      ...(override?.keywords ?? []),
      channel.name.toLowerCase(), `${channel.name} live`, `${channel.name} stream`,
      `watch ${channel.name}`, `${channel.name} online free`, channel.groupTitle.toLowerCase(),
      'live tv stream free', 'iptv free', 'watch tv online',
    ].join(', '),
    openGraph: {
      title: baseTitle,
      description: baseDesc,
      type: 'video.other',
      images: channel.logo ? [{ url: channel.logo, alt: channel.name }] : [],
    },
    twitter: { card: 'summary_large_image', title: baseTitle, description: baseDesc },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/channel/${slug}`,
    },
  };
}

export default async function ChannelPage({ params }: Props) {
  const { slug } = await params;
  const channel = await prisma.channel.findUnique({
    where: { slug, isActive: true },
    include: { category: true },
  });
  if (!channel) notFound();

  const related = await prisma.channel.findMany({
    where: { categoryId: channel.categoryId, isActive: true, NOT: { id: channel.id } },
    take: 12,
    orderBy: { order: 'asc' },
    include: { category: { select: { name: true, slug: true } } },
  });

  const override  = EVENT_OVERRIDES[slug];
  const channelLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: override?.title ?? `${channel.name} Live Stream`,
    description: override?.description ?? `Watch ${channel.name} live stream free online.`,
    thumbnailUrl: channel.logo ?? undefined,
    uploadDate: new Date().toISOString().split('T')[0],
    publication: { '@type': 'BroadcastEvent', isLiveBroadcast: true, startDate: new Date().toISOString() },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',   item: process.env.NEXT_PUBLIC_SITE_URL },
      ...(channel.category ? [{ '@type': 'ListItem', position: 2, name: channel.category.name, item: `${process.env.NEXT_PUBLIC_SITE_URL}/category/${channel.category.slug}` }] : []),
      { '@type': 'ListItem', position: channel.category ? 3 : 2, name: channel.name, item: `${process.env.NEXT_PUBLIC_SITE_URL}/channel/${slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={channelLd} />
      <JsonLd data={breadcrumbLd} />
      {override?.jsonLd && <JsonLd data={override.jsonLd} />}
      <ChannelPageClient channel={channel as any} related={related as any} eventOverride={override ?? null} />
    </>
  );
}
