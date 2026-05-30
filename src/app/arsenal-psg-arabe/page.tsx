import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import ArabicMatchClient from './ArabicMatchClient';
import AdBanner from '@/components/ads/AdBanner';

export const revalidate = 300;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';

export const metadata: Metadata = {
  title: 'ارسنال ضد باريس بث مباشر مجاني — نهائي دوري أبطال أوروبا 2026',
  description: 'شاهد مباراة ارسنال ضد باريس سان جيرمان نهائي دوري أبطال أوروبا 2026 بث مباشر مجاني HD — ثلاثة سيرفرات: La 1 · M6 · Canal+ Sport. بدون اشتراك، بدون تسجيل.',
  keywords: [
    'ارسنال ضد باريس بث مباشر', 'نهائي دوري أبطال أوروبا 2026 بث مباشر',
    'مشاهدة ارسنال باريس مجاناً', 'ارسنال باريس سان جيرمان مباشر',
    'نهائي يوفا 2026 بث مباشر', 'arsenal psg بث مباشر عربي',
    'مشاهدة نهائي دوري الأبطال 2026 مجاناً', 'ارسنال باريس نهائي مجاناً',
    'بث مباشر نهائي 2026 عربي', 'arsenal vs psg arabic stream',
    'نهائي أبطال أوروبا 2026 مجاناً', 'مباراة ارسنال باريس مباشر',
    'تشكيلة ارسنال باريس نهائي 2026', 'توقعات نهائي دوري الأبطال',
    'La 1 بث مباشر عربي', 'M6 مباشر عربي', 'Canal Plus Sport مباشر',
  ].join(', '),
  alternates: { canonical: `${SITE}/arsenal-psg-arabe` },
  openGraph: {
    title: '🔴 ارسنال ضد باريس بث مباشر مجاني — نهائي 2026',
    description: 'شاهد النهائي ارسنال ضد باريس مجاناً وبجودة HD — ثلاثة سيرفرات بدون اشتراك',
    type: 'website',
    siteName: 'SportaLive',
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'ارسنال ضد باريس سان جيرمان — نهائي دوري أبطال أوروبا 2026',
  alternateName: ['Arsenal vs PSG UCL Final 2026', 'نهائي يوفا 2026'],
  description: 'مشاهدة مباراة ارسنال ضد باريس سان جيرمان نهائي دوري أبطال أوروبا 2026 بث مباشر مجاناً على SportaLive.',
  startDate: '2026-05-30T20:00:00Z',
  endDate: '2026-05-30T22:30:00Z',
  sport: 'https://en.wikipedia.org/wiki/Association_football',
  inLanguage: 'ar',
  url: `${SITE}/arsenal-psg-arabe`,
  location: {
    '@type': 'Place',
    name: 'Allianz Arena',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Werner-Heisenberg-Allee 25',
      addressLocality: 'Munich',
      addressCountry: 'DE',
    },
  },
  offers: {
    '@type': 'Offer',
    name: 'بث مباشر مجاني',
    price: '0',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: `${SITE}/arsenal-psg-arabe`,
  },
  competitor: [
    { '@type': 'SportsTeam', name: 'Arsenal FC', sameAs: 'https://en.wikipedia.org/wiki/Arsenal_F.C.' },
    { '@type': 'SportsTeam', name: 'Paris Saint-Germain', sameAs: 'https://en.wikipedia.org/wiki/Paris_Saint-Germain_F.C.' },
  ],
  organizer: { '@type': 'Organization', name: 'UEFA', url: 'https://www.uefa.com' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'أين أشاهد مباراة ارسنال ضد باريس مجاناً؟',
      acceptedAnswer: { '@type': 'Answer', text: 'شاهد مباراة ارسنال ضد باريس سان جيرمان نهائي دوري أبطال أوروبا 2026 مجاناً على sportalive.live عبر ثلاثة سيرفرات مختلفة: La 1 وM6 وCanal+ Sport. بدون اشتراك، بدون تسجيل.' },
    },
    {
      '@type': 'Question',
      name: 'متى تبدأ مباراة ارسنال وباريس سان جيرمان؟',
      acceptedAnswer: { '@type': 'Answer', text: 'تبدأ مباراة ارسنال وباريس سان جيرمان نهائي دوري أبطال أوروبا 2026 يوم 30 مايو 2026 الساعة 22:00 بتوقيت القاهرة والجزائر، الساعة 21:00 بتوقيت المغرب، والساعة 23:00 بتوقيت الرياض.' },
    },
    {
      '@type': 'Question',
      name: 'ما هي القنوات التي تبث نهائي ارسنال باريس؟',
      acceptedAnswer: { '@type': 'Answer', text: 'يبث نهائي ارسنال ضد باريس على قناة La 1 الإسبانية وM6 الفرنسية مجاناً. على SportaLive نوفر البث المباشر لهذه القنوات الثلاث: La 1 وM6 وCanal+ Sport.' },
    },
    {
      '@type': 'Question',
      name: 'ما هي تشكيلة ارسنال وباريس في النهائي؟',
      acceptedAnswer: { '@type': 'Answer', text: 'التشكيلة المتوقعة لارسنال (4-3-3): راية؛ وايت، صاليبا، غابرييل، تيمبر؛ رايس، أودغارد، هافرتز؛ ساكا، جيسوس، مارتينيلي. تشكيلة باريس المتوقعة: دوناروما؛ الحكيمي، ماركينيوس، باتشو، مينديس؛ فيتينها، فابيان، نيفيس؛ دمبيلي، راموس، باركولا.' },
    },
  ],
};

async function findChannel(slugs: string[], namePatterns: string[]) {
  const bySlug = await prisma.channel.findFirst({
    where: { slug: { in: slugs }, isActive: true },
    orderBy: { order: 'asc' },
  }).catch(() => null);
  if (bySlug) return bySlug;

  for (const pattern of namePatterns) {
    const byName = await prisma.channel.findFirst({
      where: { name: { contains: pattern, mode: 'insensitive' }, isActive: true },
      orderBy: { order: 'asc' },
    }).catch(() => null);
    if (byName) return byName;
  }
  return null;
}

async function getServers() {
  try {
    const [la1, m6, canalSport] = await Promise.all([
      findChannel(
        ['la-1','la-1-1','la-1-2','la1','la-1-hd','la-1-es','spain-la-1','la-1-rtve'],
        ['La 1','La1','RTVE La','La Un'],
      ),
      findChannel(
        ['m6','m6-hd','m6-1','m6-fr','france-m6'],
        ['M6'],
      ),
      findChannel(
        ['canal-sport','canal-sport-hd','canal-plus-sport','canalplus-sport','canal-sport-1'],
        ['Canal+ Sport','Canal Sport','CanalSport'],
      ),
    ]);
    return { la1, m6, canalSport };
  } catch { return { la1: null, m6: null, canalSport: null }; }
}

export default async function ArsenalPsgArabePage() {
  const { la1, m6, canalSport } = await getServers();

  const servers = [
    { label: 'La 1',        sublabel: 'إسبانيا · مجاني', channel: la1 as any        },
    { label: 'M6',          sublabel: 'فرنسا · مجاني',   channel: m6 as any         },
    { label: 'Canal+ Sport',sublabel: 'فرنسا · HD',       channel: canalSport as any },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="max-w-4xl mx-auto space-y-8" dir="rtl">

        {/* Hero */}
        <section className="relative rounded-3xl overflow-hidden border border-[#1e3a6e]"
          style={{ background: 'linear-gradient(135deg, #05091a 0%, #0d1442 45%, #05091a 100%)' }}>

          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.8) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="absolute left-0 inset-y-0 w-1/2 bg-gradient-to-r from-red-900/25 to-transparent" />
          <div className="absolute right-0 inset-y-0 w-1/2 bg-gradient-to-l from-blue-900/25 to-transparent" />

          <div className="relative px-6 py-10 md:py-14 text-center space-y-6">

            <div className="flex items-center justify-center gap-3">
              <span className="text-yellow-400">✦</span>
              <span className="text-yellow-300 text-xs font-bold uppercase tracking-widest">نهائي دوري أبطال أوروبا — يوفا 2026</span>
              <span className="text-yellow-400">✦</span>
            </div>

            {/* Match image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10 mx-auto max-w-xl">
              <img
                src="https://assets-fr.imgfoot.com/media/cache/642x382/psg-ars.jpg"
                alt="ارسنال ضد باريس سان جيرمان — نهائي دوري أبطال أوروبا 2026"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 bg-red-600 rounded-full shadow-lg">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="text-white text-xs font-black whitespace-nowrap">مباشر الآن</span>
              </div>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
              ارسنال ضد باريس{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-yellow-300 to-yellow-500">
                بث مباشر مجاني
              </span>
            </h1>

            <p className="text-gray-400 text-sm">30 مايو 2026 · الساعة 22:00 القاهرة / 23:00 الرياض · La 1 مجاناً</p>

            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {[
                { icon: '📅', text: '30 مايو 2026' },
                { icon: '⏰', text: '22:00 القاهرة' },
                { icon: '📺', text: 'ثلاثة سيرفرات' },
                { icon: '🔓', text: 'بدون اشتراك' },
              ].map(({ icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300">
                  {icon} {text}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Player */}
        <section>
          <h2 className="text-white font-bold text-lg mb-3">📺 مشاهدة المباراة — اختر السيرفر</h2>
          <ArabicMatchClient servers={servers} />
        </section>

        <AdBanner />

        {/* Kickoff times */}
        <section className="bg-gray-800/40 border border-white/5 rounded-2xl p-5 space-y-4">
          <h2 className="text-white font-bold text-lg">⏰ مواعيد المباراة بالتوقيت العالمي</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
            {[
              ['🇬🇧 لندن',      '20:00'],
              ['🇫🇷 باريس',     '21:00'],
              ['🇪🇸 مدريد',     '21:00'],
              ['🇲🇦 الرباط',    '21:00'],
              ['🇩🇿 الجزائر',   '22:00'],
              ['🇹🇳 تونس',      '22:00'],
              ['🇸🇦 الرياض',    '23:00'],
              ['🇪🇬 القاهرة',   '22:00'],
              ['🇦🇪 دبي',       '00:00+1'],
            ].map(([city, time]) => (
              <div key={city} className="flex justify-between px-3 py-2 bg-white/[0.04] rounded-lg">
                <span className="text-gray-400">{city}</span>
                <span className="text-white font-black">{time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Lineups */}
        <section className="space-y-4">
          <h2 className="text-white font-bold text-xl">⚽ التشكيلة المتوقعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-950/30 border border-red-500/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-red-400/30 flex items-center justify-center overflow-hidden">
                  <img src="/logos/arsenal.svg" alt="ارسنال" className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <p className="text-white font-black">ارسنال</p>
                  <p className="text-red-400 text-xs">4-3-3 · التشكيلة المتوقعة</p>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                {[
                  { pos: 'حارس',   name: 'راية' },
                  { pos: 'أيمن',   name: 'وايت' },
                  { pos: 'وسط دف', name: 'صاليبا' },
                  { pos: 'وسط دف', name: 'غابرييل' },
                  { pos: 'أيسر',   name: 'تيمبر' },
                  { pos: 'وسط',    name: 'رايس' },
                  { pos: 'وسط',    name: 'أودغارد ©' },
                  { pos: 'وسط',    name: 'هافرتز' },
                  { pos: 'جناح أ', name: 'ساكا ⭐' },
                  { pos: 'مهاجم',  name: 'جيسوس' },
                  { pos: 'جناح ي', name: 'مارتينيلي' },
                ].map(({ pos, name }) => (
                  <div key={name} className="flex items-center gap-3 py-1 border-b border-white/5">
                    <span className="w-16 text-center text-[10px] font-bold text-red-400 bg-red-500/10 rounded px-1 py-0.5 flex-shrink-0">{pos}</span>
                    <span className="text-gray-200">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-950/30 border border-blue-500/20 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-blue-400/30 flex items-center justify-center overflow-hidden">
                  <img src="/logos/psg.svg" alt="باريس سان جيرمان" className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <p className="text-white font-black">باريس سان جيرمان</p>
                  <p className="text-blue-400 text-xs">4-3-3 · التشكيلة المتوقعة</p>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                {[
                  { pos: 'حارس',   name: 'دوناروما' },
                  { pos: 'أيمن',   name: 'الحكيمي' },
                  { pos: 'وسط دف', name: 'ماركينيوس ©' },
                  { pos: 'وسط دف', name: 'باتشو' },
                  { pos: 'أيسر',   name: 'مينديس' },
                  { pos: 'وسط',    name: 'فيتينها' },
                  { pos: 'وسط',    name: 'فابيان رويز' },
                  { pos: 'وسط',    name: 'نيفيس' },
                  { pos: 'جناح أ', name: 'دمبيلي ⭐' },
                  { pos: 'مهاجم',  name: 'راموس' },
                  { pos: 'جناح ي', name: 'باركولا' },
                ].map(({ pos, name }) => (
                  <div key={name} className="flex items-center gap-3 py-1 border-b border-white/5">
                    <span className="w-16 text-center text-[10px] font-bold text-blue-400 bg-blue-500/10 rounded px-1 py-0.5 flex-shrink-0">{pos}</span>
                    <span className="text-gray-200">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="text-white font-bold text-xl">الأسئلة الشائعة</h2>
          {faqJsonLd.mainEntity.map((q: any, i: number) => (
            <details key={i} className="bg-gray-800/40 border border-white/5 rounded-xl p-4 cursor-pointer group" open={i === 0}>
              <summary className="text-white font-semibold text-sm list-none flex justify-between items-center gap-3">
                <span>{q.name}</span>
                <span className="text-yellow-400 text-lg group-open:rotate-45 transition-transform flex-shrink-0">+</span>
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">{q.acceptedAnswer.text}</p>
            </details>
          ))}
        </section>

        <AdBanner />

        {/* Internal links */}
        <section className="flex flex-wrap gap-3 justify-center pb-4">
          {[
            { href: '/arsenal-vs-psg',              label: '🔴 Arsenal vs PSG (English)' },
            { href: '/champions-league-final-2026', label: '🏆 نهائي دوري الأبطال 2026'   },
            { href: '/channel/la-1',                label: '📺 قناة La 1 مباشر'           },
            { href: '/channel/m6',                  label: '📺 قناة M6 مباشر'             },
            { href: '/live',                        label: '📡 جميع القنوات'              },
          ].map(({ href, label }) => (
            <Link key={href} href={href}
              className="px-4 py-2 bg-gray-800/60 hover:bg-yellow-600/20 border border-white/10 hover:border-yellow-500/30 text-gray-400 hover:text-white text-sm rounded-xl transition-all">
              {label}
            </Link>
          ))}
        </section>

        <p className="text-gray-700 text-xs leading-relaxed">
          ارسنال ضد باريس بث مباشر · نهائي دوري أبطال أوروبا 2026 مجاناً · مشاهدة ارسنال باريس بدون اشتراك ·
          arsenal psg بث مباشر عربي · تشكيلة ارسنال باريس نهائي · توقعات مباراة ارسنال باريس
        </p>
      </div>
    </>
  );
}
