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
    title: '🔴 La 1 En Directo — Champions League Final Arsenal vs PSG LIVE 2026',
    description: 'Watch La 1 live online — UEFA Champions League Final 2026: Arsenal vs PSG in HD. La 1 en directo gratis, final champions league 2026 streaming. Arsenal PSG en vivo. Arsenal contre PSG en direct. ارسنال باريس سان جيرمان بث مباشر.',
    keywords: [
      'la 1 en directo','la 1 live stream','arsenal vs psg la 1','champions league final la 1',
      'final champions 2026 la 1','arsenal psg en vivo','final champions league 2026',
      'la primera en directo','la 1 españa en vivo','watch la 1 online free',
      'arsenal psg live stream','ucl final 2026 la 1','champions league final stream free',
    ],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BroadcastEvent',
      name: 'UEFA Champions League Final 2026 — Arsenal vs PSG on La 1',
      startDate: '2026-05-27T20:00:00Z',
      isLiveBroadcast: true,
      broadcastOfEvent: {
        '@type': 'SportsEvent',
        name: 'Arsenal FC vs Paris Saint-Germain — UCL Final 2026',
        sport: 'Football',
        startDate: '2026-05-27T20:00:00Z',
        competitor: [
          { '@type': 'SportsTeam', name: 'Arsenal FC' },
          { '@type': 'SportsTeam', name: 'Paris Saint-Germain' },
        ],
      },
      broadcastDisplayName: 'La 1',
    },
  },
  'la-1-1': { title: '🔴 La 1 En Directo — Champions League Final Arsenal vs PSG LIVE 2026', description: 'La 1 live — Champions League Final 2026 Arsenal vs PSG. Free HD stream.', keywords: ['la 1 live','arsenal psg la 1','champions league final 2026'] },
  'la-1-2': { title: '🔴 La 1 En Directo — Champions League Final Arsenal vs PSG LIVE 2026', description: 'La 1 live — Champions League Final 2026 Arsenal vs PSG. Free HD stream.', keywords: ['la 1 live','arsenal psg la 1','champions league final 2026'] },
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
