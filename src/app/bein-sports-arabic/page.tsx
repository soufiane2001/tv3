import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import ArabicStreamClient from './ArabicStreamClient';
import AdBanner from '@/components/ads/AdBanner';

export const revalidate = 300;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live';

export const metadata: Metadata = {
  title: 'بي إن سبورت مجاناً بث مباشر | beIN Sports Arabic بدون اشتراك',
  description: 'شاهد قنوات بي إن سبورت عربي مجاناً وبجودة HD بدون اشتراك أو تسجيل. بث مباشر beIN Sports 1 2 3 عربي — ثلاثة سيرفرات للنقل المباشر.',
  keywords: [
    'بي إن سبورت مجاناً', 'beIN Sports بث مباشر', 'beinsport gratuit arabe',
    'مشاهدة بي ان سبورت مجاناً', 'bein sports arabic live stream free',
    'بي إن سبورت 1 مباشر', 'بي إن سبورت 2 مباشر', 'بي إن سبورت 3 مباشر',
    'beIN Sports 1 Arabic', 'beIN Sports 2 Arabic', 'beIN Sports 3 Arabic',
    'قنوات رياضية عربية مجاناً', 'بث مباشر كرة القدم', 'مشاهدة مباريات مجاناً',
    'beinsports ar live', 'bein sport hd gratuit', 'قناة بي إن سبورت مباشر',
    'مشاهدة الدوري الإنجليزي مجاناً', 'مشاهدة دوري أبطال أوروبا مجاناً',
    'نهائي دوري الأبطال 2026 بث مباشر', 'ارسنال باريس بث مباشر',
  ].join(', '),
  alternates: { canonical: `${SITE}/bein-sports-arabic` },
  openGraph: {
    title: 'بي إن سبورت مجاناً — بث مباشر بدون اشتراك',
    description: 'شاهد beIN Sports عربي مجاناً بجودة HD — ثلاثة سيرفرات · بدون تسجيل',
    type: 'website',
    siteName: 'SportaLive',
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'بي إن سبورت عربي مجاناً — بث مباشر | SportaLive',
  description: 'مشاهدة قنوات beIN Sports العربية مجاناً بدون اشتراك على SportaLive',
  url: `${SITE}/bein-sports-arabic`,
  inLanguage: 'ar',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'قنوات عربية', item: `${SITE}/bein-sports-arabic` },
    ],
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'كيف أشاهد بي إن سبورت مجاناً بدون اشتراك؟',
      acceptedAnswer: { '@type': 'Answer', text: 'ادخل على sportalive.live وانقر على زر "شاهد الآن" — نبث قنوات beIN Sports العربية مباشرة وبجودة HD بدون أي اشتراك أو تسجيل. إذا لم يعمل سيرفر، جرب السيرفر التالي.' },
    },
    {
      '@type': 'Question',
      name: 'ما هي جودة بث beIN Sports على SportaLive؟',
      acceptedAnswer: { '@type': 'Answer', text: 'نوفر بث بجودة HD عبر ثلاثة سيرفرات مختلفة لضمان أفضل تجربة مشاهدة. إذا كان سيرفر بطيئاً، انتقل للسيرفر الثاني أو الثالث.' },
    },
    {
      '@type': 'Question',
      name: 'هل يعمل البث على الجوال؟',
      acceptedAnswer: { '@type': 'Answer', text: 'نعم، يعمل البث على جميع الأجهزة — موبايل، تابلت، كمبيوتر — بدون تثبيت أي تطبيق. فقط افتح المتصفح وشاهد مباشرة.' },
    },
    {
      '@type': 'Question',
      name: 'ما المباريات التي تبثها beIN Sports عربي؟',
      acceptedAnswer: { '@type': 'Answer', text: 'تبث قنوات beIN Sports العربية دوري أبطال أوروبا، الدوري الإنجليزي الممتاز، الليغا الإسبانية، الدوري الفرنسي، كأس العالم، وأهم المباريات الرياضية عالمياً.' },
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
    const [s1, s2, s3] = await Promise.all([
      findChannel(
        ['bein-sports-1', 'bein-sport-1', 'bein1', 'beinsports-1', 'bein-sports-1-arabic', 'bein-sports-ar-1'],
        ['beIN Sports 1', 'Bein Sports 1', 'bein sport 1', 'beIN 1'],
      ),
      findChannel(
        ['bein-sports-2', 'bein-sport-2', 'bein2', 'beinsports-2', 'bein-sports-2-arabic', 'bein-sports-ar-2'],
        ['beIN Sports 2', 'Bein Sports 2', 'bein sport 2', 'beIN 2'],
      ),
      findChannel(
        ['bein-sports-3', 'bein-sport-3', 'bein3', 'beinsports-3', 'bein-sports-3-arabic', 'bein-sports-ar-3'],
        ['beIN Sports 3', 'Bein Sports 3', 'bein sport 3', 'beIN 3'],
      ),
    ]);
    return { s1, s2, s3 };
  } catch { return { s1: null, s2: null, s3: null }; }
}

async function getRelatedChannels() {
  try {
    return prisma.channel.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: 'beIN', mode: 'insensitive' } },
          { name: { contains: 'SSC', mode: 'insensitive' } },
          { name: { contains: 'Rotana', mode: 'insensitive' } },
          { name: { contains: 'Al Jazeera', mode: 'insensitive' } },
          { name: { contains: 'MBC', mode: 'insensitive' } },
        ],
      },
      take: 8,
      orderBy: { order: 'asc' },
    });
  } catch { return []; }
}

export default async function BeInSportsArabicPage() {
  const [{ s1, s2, s3 }, related] = await Promise.all([getServers(), getRelatedChannels()]);

  const servers = [
    { label: 'سيرفر 1', sublabel: 'HD', channel: s1 as any },
    { label: 'سيرفر 2', sublabel: 'HD', channel: s2 as any },
    { label: 'سيرفر 3', sublabel: 'HD', channel: s3 as any },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="max-w-4xl mx-auto space-y-8" dir="rtl">

        {/* Hero */}
        <section className="relative rounded-3xl overflow-hidden border border-green-900/40"
          style={{ background: 'linear-gradient(135deg, #031a0e 0%, #052d18 50%, #031a0e 100%)' }}>

          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent" />

          <div className="relative px-6 py-10 md:py-14 text-center space-y-5">

            <div className="flex items-center justify-center gap-3">
              <span className="text-green-400">✦</span>
              <span className="text-green-300 text-xs font-bold uppercase tracking-widest">بث مباشر مجاني</span>
              <span className="text-green-400">✦</span>
            </div>

            {/* beIN logo text */}
            <div className="inline-flex flex-col items-center gap-1 px-8 py-4 bg-black/40 rounded-2xl border border-green-500/20 shadow-xl">
              <span className="text-5xl md:text-6xl font-black text-white leading-none" style={{ fontFamily: 'Arial Black, sans-serif' }}>
                <span className="text-green-400">bein</span>
                <span className="text-white"> SPORTS</span>
              </span>
              <span className="text-green-300 text-sm font-bold tracking-widest">بي إن سبورت عربي</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
              شاهد{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-green-300 to-green-500">
                بي إن سبورت مجاناً
              </span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base">بث مباشر HD · ثلاثة سيرفرات · بدون اشتراك · بدون تسجيل</p>

            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {[
                { icon: '📡', text: 'ثلاثة سيرفرات' },
                { icon: '🎯', text: 'جودة HD' },
                { icon: '🔓', text: 'بدون اشتراك' },
                { icon: '📱', text: 'يعمل على الموبايل' },
              ].map(({ icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300">
                  {icon} {text}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Stream Player */}
        <section>
          <h2 className="text-white font-bold text-lg mb-3">📺 مشاهدة البث المباشر — اختر السيرفر</h2>
          <ArabicStreamClient servers={servers} />
        </section>

        <AdBanner />

        {/* How to watch */}
        <section className="bg-gray-800/40 border border-white/5 rounded-2xl p-6 space-y-4">
          <h2 className="text-white font-bold text-xl">كيفية المشاهدة</h2>
          <ol className="space-y-3">
            {[
              { n: '١', text: 'اضغط على زر "شاهد الآن مجاناً" أعلاه' },
              { n: '٢', text: 'إذا لم يعمل السيرفر الأول، انتقل إلى سيرفر 2 أو سيرفر 3' },
              { n: '٣', text: 'يمكنك تفعيل وضع ملء الشاشة للحصول على أفضل تجربة مشاهدة' },
              { n: '٤', text: 'لا حاجة لأي اشتراك أو تسجيل حساب' },
            ].map(({ n, text }) => (
              <li key={n} className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 font-black text-sm flex items-center justify-center flex-shrink-0">{n}</span>
                <p className="text-gray-300 text-sm pt-1.5 leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Channels on beIN */}
        <section className="space-y-4">
          <h2 className="text-white font-bold text-xl">⚽ ماذا تشاهد على beIN Sports عربي؟</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: '🏆', title: 'دوري أبطال أوروبا', desc: 'جميع مباريات الـ UCL بما فيها النهائي' },
              { icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', title: 'الدوري الإنجليزي الممتاز', desc: 'مانشستر يونايتد، ليفربول، آرسنال، سيتي' },
              { icon: '🇪🇸', title: 'الليغا الإسبانية', desc: 'ريال مدريد، برشلونة، أتلتيكو مدريد' },
              { icon: '🇫🇷', title: 'الدوري الفرنسي', desc: 'باريس سان جيرمان، موناكو، مارسيليا' },
              { icon: '🌍', title: 'كأس العالم 2026', desc: 'الولايات المتحدة، كندا والمكسيك' },
              { icon: '🏅', title: 'بطولة الأمم الأفريقية', desc: 'أفضل المنتخبات الأفريقية' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3 p-4 bg-gray-800/40 border border-white/5 rounded-xl hover:border-green-500/20 transition-colors">
                <span className="text-2xl flex-shrink-0">{icon}</span>
                <div>
                  <p className="text-white font-bold text-sm">{title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-3">
          <h2 className="text-white font-bold text-xl">الأسئلة الشائعة</h2>
          {faqJsonLd.mainEntity.map((q: any, i: number) => (
            <details key={i} className="bg-gray-800/40 border border-white/5 rounded-xl p-4 cursor-pointer group" open={i === 0}>
              <summary className="text-white font-semibold text-sm list-none flex justify-between items-center gap-3">
                <span>{q.name}</span>
                <span className="text-green-400 text-lg group-open:rotate-45 transition-transform flex-shrink-0">+</span>
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">{q.acceptedAnswer.text}</p>
            </details>
          ))}
        </section>

        <AdBanner />

        {/* Related Arabic channels */}
        {related.length > 0 && (
          <section>
            <h2 className="text-white font-bold text-xl mb-4">📡 قنوات عربية أخرى</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {related.map(ch => (
                <Link key={ch.id} href={`/channel/${ch.slug}`}
                  className="flex items-center gap-2 p-3 bg-gray-800/60 hover:bg-gray-700/60 border border-white/5 hover:border-green-500/30 rounded-xl transition-all group">
                  {ch.logo && <img src={ch.logo} alt={ch.name} className="w-8 h-8 object-contain rounded flex-shrink-0" />}
                  <span className="text-xs text-gray-400 group-hover:text-white truncate">{ch.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Internal links */}
        <section className="flex flex-wrap gap-3 justify-center pb-4">
          {[
            { href: '/arsenal-vs-psg',              label: '🔴 ارسنال ضد باريس — مباشر' },
            { href: '/champions-league-final-2026', label: '🏆 نهائي دوري الأبطال 2026' },
            { href: '/live',                        label: '📡 جميع القنوات المباشرة' },
            { href: '/chaines-marocaines',          label: '🇲🇦 القنوات المغربية' },
          ].map(({ href, label }) => (
            <Link key={href} href={href}
              className="px-4 py-2 bg-gray-800/60 hover:bg-green-600/20 border border-white/10 hover:border-green-500/30 text-gray-400 hover:text-white text-sm rounded-xl transition-all">
              {label}
            </Link>
          ))}
        </section>

        {/* Arabic SEO text (hidden visually but crawlable) */}
        <p className="text-gray-700 text-xs leading-relaxed">
          بي إن سبورت مجاناً · beIN Sports بث مباشر · مشاهدة beinsport بدون اشتراك · بي ان سبورت 1 2 3 مباشر ·
          قنوات رياضية عربية مجاناً · مشاهدة مباريات كرة القدم مجاناً · نهائي دوري أبطال أوروبا 2026 بث مباشر ·
          الدوري الإنجليزي بث مباشر · كأس العالم 2026 مجاناً
        </p>

      </div>
    </>
  );
}
