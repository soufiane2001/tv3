import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import ChannelPageClient from './ChannelPageClient';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sportalive.live';

interface Props { params: Promise<{ slug: string }> }

/* ── Event override map: enriches SEO for known channels ── */
const EVENT_OVERRIDES: Record<string, {
  title: string; description: string; keywords: string[];
  jsonLd?: Record<string, unknown>;
}> = {

  // ── L'Équipe TV ──────────────────────────────────────────────────────────────
  'lequipe-tv': {
    title: "🔴 L'Équipe TV En Direct — Germany vs Finland LIVE | Allemagne Finlande Gratuit",
    description: "Regarder L'Équipe TV en direct gratuit HD — Allemagne vs Finlande et tout le sport en live. Watch L'Équipe TV free live stream — Germany Finland and top sport. L'Équipe TV kostenlos live. قناة L'Équipe بث مباشر مجاناً.",
    keywords: [
      "l'equipe tv en direct","l'equipe direct gratuit","lequipe tv live stream",
      "l equipe tv streaming gratuit","regarder lequipe gratuit","l'équipe tv live",
      "lequipe tv france","lequipe direct sport","l'équipe en direct gratuitement",
      "allemagne finlande lequipe","germany finland lequipe tv",
      "deutschland finnland lequipe","lequipe tv live free",
      "watch lequipe tv online free","قناة lequipe بث مباشر",
      "مشاهدة lequipe مجاناً",
    ],
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'BroadcastService',
      name: "L'Équipe TV",
      description: "Chaîne française de sport en continu. Diffuse le football, le rugby, le tennis et plus.",
      broadcastDisplayName: "L'Équipe TV",
      inLanguage: ['fr'],
      broadcaster: { '@type': 'Organization', name: "L'Équipe", url: 'https://www.lequipe.fr' },
    },
  },

  // ── Moroccan / Maghreb channels ──────────────────────────────────────────────

  '2m': {
    title: '🔴 2M Maroc En Direct — بث مباشر مجاناً | SportaLive',
    description: 'مشاهدة قناة 2M المغربية بث مباشر مجاناً وبجودة HD — بدون اشتراك، بدون تسجيل. Regarder 2M Maroc en direct gratuit en HD. Watch 2M Morocco live stream free online. 2M en vivo gratis.',
    keywords: [
      // Arabic — primary audience
      'مشاهدة 2M مباشر','قناة 2M المغربية بث مباشر','2M بث مباشر مجاناً',
      'بث مباشر 2M ماروك','مشاهدة 2M مجاناً على الإنترنت','2M مباشر بدون اشتراك',
      'قناة 2M مباشرة','2M المغرب بث مباشر','تردد 2M المغربية',
      '2M المغربية مباشر','مشاهدة القنوات المغربية مجاناً','بث مباشر القنوات المغربية',
      // French — diaspora in France/Belgium
      '2M en direct','regarder 2M Maroc en ligne gratuit','2M streaming gratuit',
      '2M Maroc live stream','regarder 2M sans abonnement','2M direct gratuit',
      '2M Maroc en direct gratuit','chaine marocaine en direct','2M live',
      '2M France streaming','2M Belgique direct','regarder 2M depuis France',
      // English
      '2M Morocco live stream','watch 2M Maroc online free','2M live stream HD',
      '2M Morocco channel online','watch moroccan tv free',
    ],
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'BroadcastService',
      name: '2M Maroc — القناة الثانية المغربية',
      description: 'Chaîne de télévision marocaine — القناة الثانية المغربية. Disponible en direct HD sur SportaLive.',
      broadcastDisplayName: '2M Maroc',
      inLanguage: ['ar','fr'],
      area: { '@type': 'Country', name: 'Morocco' },
      broadcaster: { '@type': 'Organization', name: '2M — SOREAD', url: 'https://www.2m.ma' },
    },
  },

  'al-aoula': {
    title: '🔴 القناة الأولى المغربية بث مباشر — Al Aoula En Direct Gratuit | SportaLive',
    description: 'مشاهدة القناة الأولى المغربية (الأولى) بث مباشر مجاناً — SNRT Al Aoula live stream. بدون اشتراك، بدون تسجيل. Regarder Al Aoula en direct gratuit HD. Watch Al Aoula Morocco live online free.',
    keywords: [
      // Arabic
      'القناة الأولى المغربية مباشر','الأولى مباشر','بث مباشر القناة الأولى المغربية',
      'مشاهدة الأولى المغربية مجاناً','القناة الأولى بث مباشر بدون اشتراك',
      'SNRT القناة الأولى بث مباشر','الأولى المغرب مباشر','مشاهدة الأولى مجاناً',
      'قناة الأولى المغربية على الإنترنت','بث مباشر SNRT الأولى',
      'تردد القناة الأولى المغربية','القناة الأولى ماروك بث حي',
      // French
      'Al Aoula en direct','regarder Al Aoula gratuit','Al Aoula live stream gratuit',
      'premiere chaine marocaine en direct','SNRT Al Aoula streaming',
      'Al Aoula Maroc en direct','chaine 1 marocaine direct',
      // English
      'Al Aoula Morocco live stream','watch Al Aoula online free','SNRT 1 live stream',
    ],
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'BroadcastService',
      name: 'Al Aoula — القناة الأولى المغربية',
      description: 'Première chaîne nationale marocaine — القناة الأولى المغربية (SNRT).',
      broadcastDisplayName: 'Al Aoula — الأولى',
      inLanguage: ['ar','fr'],
      area: { '@type': 'Country', name: 'Morocco' },
      broadcaster: { '@type': 'Organization', name: 'SNRT', url: 'https://www.snrt.ma' },
    },
  },

  'arryadia': {
    title: '🔴 القناة الرياضية المغربية بث مباشر — Arryadia En Direct Gratuit | SportaLive',
    description: 'مشاهدة قناة الرياضية المغربية (Arryadia) بث مباشر مجاناً وبجودة HD. SNRT Sport live stream. بدون اشتراك. Regarder Arryadia en direct gratuit. Watch Arryadia Morocco sport live free.',
    keywords: [
      // Arabic
      'القناة الرياضية المغربية مباشر','الرياضية المغربية بث مباشر مجاني',
      'قناة الرياضية 1 مباشر','Arryadia بث مباشر','بث مباشر الرياضية المغربية',
      'مشاهدة الرياضية المغربية مجاناً','SNRT Sport بث مباشر',
      'القناة الرياضية المغرب مباشر','بث مباشر مباريات المغرب',
      'مشاهدة كرة القدم المغربية مباشر','الدوري المغربي بث مباشر',
      // French
      'Arryadia en direct','regarder Arryadia gratuit','chaine sportive marocaine en direct',
      'Arryadia streaming','SNRT Sport live stream','Arryadia Maroc direct gratuit',
      // English
      'Arryadia Morocco live stream','watch Arryadia online free','SNRT Sport live',
    ],
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'BroadcastService',
      name: 'Arryadia — القناة الرياضية المغربية',
      description: 'Chaîne sportive marocaine — القناة الرياضية المغربية (SNRT Sport).',
      broadcastDisplayName: 'Arryadia — الرياضية',
      inLanguage: ['ar','fr'],
      area: { '@type': 'Country', name: 'Morocco' },
      broadcaster: { '@type': 'Organization', name: 'SNRT Sport', url: 'https://www.snrt.ma' },
    },
  },

  'medi-1': {
    title: '🔴 ميدي 1 بث مباشر — Medi 1 TV En Direct Gratuit | SportaLive',
    description: 'مشاهدة قناة ميدي 1 بث مباشر مجاناً وبجودة HD — بدون اشتراك، بدون تسجيل. Regarder Medi 1 TV en direct gratuit. Watch Medi 1 Morocco live online free. أخبار المغرب والعالم على ميدي 1.',
    keywords: [
      // Arabic
      'ميدي 1 بث مباشر','قناة ميدي 1 مباشر','مشاهدة ميدي 1 مجاناً',
      'ميدي 1 تي في بث مباشر','ميدي 1 مباشر بدون اشتراك',
      'Medi 1 بث مباشر عربي','مشاهدة ميدي 1 على الإنترنت',
      // French
      'Medi 1 en direct','regarder Medi 1 TV gratuit','Medi 1 streaming gratuit',
      'Medi 1 Maroc live','Medi 1 direct gratuit HD','regarder Medi 1 depuis France',
      // English
      'Medi 1 live stream','watch Medi 1 TV online free','Medi 1 Morocco live',
    ],
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'BroadcastService',
      name: 'Medi 1 TV — ميدي 1',
      description: 'Chaîne d\'information marocaine — ميدي 1 تيفي. Actualités du Maroc et du monde.',
      broadcastDisplayName: 'Medi 1 TV',
      inLanguage: ['ar','fr'],
      area: { '@type': 'Country', name: 'Morocco' },
      broadcaster: { '@type': 'Organization', name: 'Medi1 TV', url: 'https://www.medi1tv.com' },
    },
  },

  'arrabia': {
    title: '🔴 قناة العربية المغربية بث مباشر — Arrabia En Direct | SportaLive',
    description: 'مشاهدة قناة الثالثة المغربية (Arrabia) بث مباشر مجاناً. SNRT Arrabia live HD. Regarder Arrabia en direct gratuit — sans abonnement.',
    keywords: [
      'قناة الثالثة المغربية مباشر','الثالثة مباشر','Arrabia بث مباشر',
      'مشاهدة الثالثة المغربية مجاناً','SNRT 3 بث مباشر',
      'Arrabia en direct','regarder Arrabia gratuit','SNRT 3 live stream',
    ],
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'BroadcastService',
      name: 'Arrabia — الثالثة المغربية',
      description: 'Troisième chaîne marocaine — الثالثة (SNRT 3).',
      broadcastDisplayName: 'Arrabia — الثالثة',
      inLanguage: ['ar','fr'],
      broadcaster: { '@type': 'Organization', name: 'SNRT', url: 'https://www.snrt.ma' },
    },
  },

  'al-maghribia': {
    title: '🔴 المغربية بث مباشر — Al Maghribia En Direct Gratuit | SportaLive',
    description: 'مشاهدة قناة المغربية (Al Maghribia) بث مباشر مجاناً — للجالية المغربية في العالم. SNRT Al Maghribia live. Regarder Al Maghribia en direct gratuit. قناة الجالية المغربية.',
    keywords: [
      'المغربية بث مباشر','قناة المغربية مباشر','مشاهدة المغربية مجاناً',
      'Al Maghribia بث مباشر','SNRT المغربية مباشر','قناة الجالية المغربية مباشر',
      'Al Maghribia en direct','regarder Al Maghribia gratuit','SNRT Al Maghribia live',
    ],
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'BroadcastService',
      name: 'Al Maghribia — المغربية',
      description: 'Chaîne marocaine pour la diaspora — المغربية للجالية المغربية في العالم.',
      broadcastDisplayName: 'Al Maghribia',
      inLanguage: ['ar','fr'],
      broadcaster: { '@type': 'Organization', name: 'SNRT', url: 'https://www.snrt.ma' },
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
  const baseTitle = override?.title ?? `Watch ${channel.name} Live Stream Free HD | مشاهدة ${channel.name} بث مباشر`;
  const baseDesc  = override?.description ??
    `Stream ${channel.name} live online free in HD. ${channel.groupTitle} channel available 24/7 on SportaLive. No subscription needed. مشاهدة ${channel.name} بث مباشر مجاناً وبجودة HD — بدون اشتراك، بدون تسجيل.`;

  return {
    title: baseTitle,
    description: baseDesc,
    keywords: [
      ...(override?.keywords ?? []),
      channel.name.toLowerCase(), `${channel.name} live`, `${channel.name} stream`,
      `watch ${channel.name}`, `${channel.name} online free`, channel.groupTitle.toLowerCase(),
      'live tv stream free', 'iptv free', 'watch tv online',
      `مشاهدة ${channel.name} مباشر`, `${channel.name} بث مباشر`, `${channel.name} مجاناً`,
      'بث مباشر مجاناً', 'مشاهدة مباشر بدون اشتراك',
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
      canonical: `${SITE}/channel/${slug}`,
    },
  };
}

// Slug aliases: canonical slug → list of DB slugs + name patterns to try
const SLUG_ALIASES: Record<string, { slugs: string[]; names: string[] }> = {
  'la-1':         { slugs: ['la-1','la-1-1','la-1-2','la1','la-1-hd','la-1-es','spain-la-1','la-1-rtve','rtve-la1','es-la1','la-primera'], names: ['La 1','La1','RTVE La','La Un','La Primera'] },
  'm6':           { slugs: ['m6','m6-hd','m6-1','m6-fr'], names: ['M6'] },
  'canal-sport':  { slugs: ['canal-sport','canal-sport-hd','canal-plus-sport','canalplus-sport'], names: ['Canal+ Sport','Canal Sport','CanalSport'] },
  'trt':          { slugs: ['trt','trt-1','trt1'], names: ['TRT','TRT 1','TRT1'] },
  'trt-1':        { slugs: ['trt-1','trt1','trt'], names: ['TRT 1','TRT1','TRT'] },
  // Moroccan / Maghreb channels
  '2m':           { slugs: ['2m','2m-maroc','2m-hd','2m-1','maroc-2m','ma-2m'], names: ['2M','2M Maroc','2M HD','2 M'] },
  'al-aoula':     { slugs: ['al-aoula','al-aula','alaoula','al-aoula-1','al-aoula-hd','aoula','snrt-1','snrt1'], names: ['Al Aoula','Al Aula','القناة الأولى','الأولى','Aoula','SNRT 1'] },
  'arryadia':     { slugs: ['arryadia','al-arryadia','arryadia-hd','arryadia-1','snrt-sport','arrabia-sport'], names: ['Arryadia','Al Arryadia','الرياضية','القناة الرياضية','SNRT Sport'] },
  'arrabia':      { slugs: ['arrabia','al-arrabia','arrabia-hd','arrabia-1','snrt-3'], names: ['Arrabia','Al Arrabia','العربية المغربية','الثالثة','SNRT 3'] },
  'medi-1':       { slugs: ['medi-1','medi1','medi-1-tv','medi1tv','medi-tv'], names: ['Medi 1','Medi1','Medi 1 TV','ميدي 1'] },
  'al-maghribia': { slugs: ['al-maghribia','almaghribia','maghribia','snrt-al-maghribia'], names: ['Al Maghribia','المغربية','Maghribia'] },
  'lequipe-tv':   { slugs: ['lequipe-tv','lequipe','l-equipe','la-chaine-lequipe'], names: ["L'Équipe TV","L'Equipe","LEquipe","L Equipe"] },
};

async function resolveChannel(slug: string) {
  // 1. Exact match
  const exact = await prisma.channel.findUnique({ where: { slug, isActive: true }, include: { category: true } }).catch(() => null);
  if (exact) return exact;

  // 2. Alias lookup (handles slug mismatches from M3U generation)
  const alias = SLUG_ALIASES[slug];
  if (alias) {
    for (const s of alias.slugs) {
      if (s === slug) continue;
      const bySlug = await prisma.channel.findUnique({ where: { slug: s, isActive: true }, include: { category: true } }).catch(() => null);
      if (bySlug) return bySlug;
    }
    for (const name of alias.names) {
      const byName = await prisma.channel.findFirst({
        where: { name: { contains: name, mode: 'insensitive' }, isActive: true },
        include: { category: true },
        orderBy: { order: 'asc' },
      }).catch(() => null);
      if (byName) return byName;
    }
  }
  return null;
}

export default async function ChannelPage({ params }: Props) {
  const { slug } = await params;
  const channel = await resolveChannel(slug);
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
      { '@type': 'ListItem', position: 1, name: 'Home',   item: SITE },
      ...(channel.category ? [{ '@type': 'ListItem', position: 2, name: channel.category.name, item: `${SITE}/category/${channel.category.slug}` }] : []),
      { '@type': 'ListItem', position: channel.category ? 3 : 2, name: channel.name, item: `${SITE}/channel/${slug}` },
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
