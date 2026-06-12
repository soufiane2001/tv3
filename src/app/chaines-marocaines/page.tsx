import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';

export const revalidate = 3600;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sportalive.live';

export const metadata: Metadata = {
  title: 'Chaînes Marocaines En Direct Gratuit — القنوات المغربية بث مباشر | SportaLive',
  description: 'Regardez toutes les chaînes marocaines en direct gratuit HD: 2M, Al Aoula, Arryadia, Medi 1 TV, Arrabia, Al Maghribia — sans abonnement, sans inscription. مشاهدة القنوات المغربية بث مباشر مجاناً.',
  keywords: [
    // Arabic — primary audience
    'القنوات المغربية بث مباشر','مشاهدة القنوات المغربية مجاناً','بث مباشر القنوات المغربية',
    'تلفزيون مغربي بث مباشر','قنوات المغرب على الإنترنت مجاناً',
    'مشاهدة التلفزيون المغربي مجاناً بدون اشتراك',
    'القنوات المغربية على الإنترنت','تلفزيون مغربي مجاني',
    '2M بث مباشر','القناة الأولى المغربية بث مباشر',
    'الرياضية المغربية بث مباشر','ميدي 1 بث مباشر',
    // French — diaspora
    'chaines marocaines en direct','regarder tv maroc en ligne gratuit',
    'television marocaine en direct gratuit','chaines marocaines streaming',
    '2M en direct gratuit','Al Aoula en direct','Arryadia en direct',
    'chaines marocaines depuis France','tv maroc gratuit HD',
    'regarder chaines marocaines sans abonnement',
    // English
    'moroccan tv channels live stream free','watch moroccan channels online',
    'morocco tv live stream','2M Morocco live','Al Aoula live stream',
    'moroccan channels free hd','watch morocco tv free',
  ].join(', '),
  openGraph: {
    title: '🇲🇦 Chaînes Marocaines En Direct Gratuit — القنوات المغربية',
    description: '2M, Al Aoula, Arryadia, Medi 1, Arrabia, Al Maghribia — en direct HD gratuit sur SportaLive.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: '🇲🇦 Chaînes Marocaines En Direct Gratuit' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  alternates: { canonical: `${SITE}/chaines-marocaines` },
};

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Chaînes Marocaines En Direct — القنوات المغربية بث مباشر',
  description: 'Toutes les chaînes de télévision marocaines en direct gratuit HD.',
  url: `${SITE}/chaines-marocaines`,
  hasPart: [
    { '@type': 'WebPage', name: '2M Maroc En Direct', url: `${SITE}/channel/2m` },
    { '@type': 'WebPage', name: 'Al Aoula En Direct', url: `${SITE}/channel/al-aoula` },
    { '@type': 'WebPage', name: 'Arryadia En Direct', url: `${SITE}/channel/arryadia` },
    { '@type': 'WebPage', name: 'Medi 1 TV En Direct', url: `${SITE}/channel/medi-1` },
    { '@type': 'WebPage', name: 'Arrabia En Direct', url: `${SITE}/channel/arrabia` },
    { '@type': 'WebPage', name: 'Al Maghribia En Direct', url: `${SITE}/channel/al-maghribia` },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'كيف أشاهد القنوات المغربية مجاناً على الإنترنت؟',
      acceptedAnswer: { '@type': 'Answer', text: 'يمكنك مشاهدة جميع القنوات المغربية (2M، الأولى، الرياضية، ميدي 1) مجاناً وبجودة HD على SportaLive بدون اشتراك أو تسجيل.' },
    },
    {
      '@type': 'Question',
      name: 'Comment regarder les chaînes marocaines depuis la France ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Toutes les chaînes marocaines sont disponibles gratuitement en HD sur SportaLive depuis la France, la Belgique et partout dans le monde. Pas d\'abonnement requis.' },
    },
    {
      '@type': 'Question',
      name: 'Which Moroccan channels can I watch free online?',
      acceptedAnswer: { '@type': 'Answer', text: 'You can watch 2M Maroc, Al Aoula (SNRT 1), Arryadia (SNRT Sport), Medi 1 TV, Arrabia (SNRT 3), and Al Maghribia — all free in HD on SportaLive.' },
    },
    {
      '@type': 'Question',
      name: 'هل بث القنوات المغربية متاح من خارج المغرب؟',
      acceptedAnswer: { '@type': 'Answer', text: 'نعم، يمكن مشاهدة القنوات المغربية بث مباشر من أي مكان في العالم على SportaLive — من فرنسا، بلجيكا، كندا، الولايات المتحدة وغيرها — مجاناً وبدون اشتراك.' },
    },
  ],
};

const CHANNELS = [
  {
    slug: '2m',
    name: '2M Maroc',
    arabic: 'القناة الثانية المغربية',
    desc: 'Films, series, news, football',
    descAr: 'أفلام، مسلسلات، أخبار، كرة قدم',
    icon: '📺',
    badge: 'SNRT',
    color: 'from-green-900/30 to-red-900/20',
    border: 'border-green-700/30',
  },
  {
    slug: 'al-aoula',
    name: 'Al Aoula',
    arabic: 'القناة الأولى المغربية',
    desc: 'National 1st channel — culture & news',
    descAr: 'الأولى الوطنية — ثقافة وأخبار',
    icon: '🏛️',
    badge: 'SNRT 1',
    color: 'from-emerald-900/30 to-green-900/20',
    border: 'border-emerald-700/30',
  },
  {
    slug: 'arryadia',
    name: 'Arryadia',
    arabic: 'القناة الرياضية المغربية',
    desc: 'Botola Pro, national team, sport',
    descAr: 'البطولة الاحترافية، المنتخب، الرياضة',
    icon: '⚽',
    badge: 'SNRT Sport',
    color: 'from-blue-900/30 to-cyan-900/20',
    border: 'border-blue-700/30',
  },
  {
    slug: 'medi-1',
    name: 'Medi 1 TV',
    arabic: 'ميدي 1',
    desc: 'News, Morocco & world',
    descAr: 'أخبار المغرب والعالم',
    icon: '📰',
    badge: 'INFO',
    color: 'from-purple-900/30 to-indigo-900/20',
    border: 'border-purple-700/30',
  },
  {
    slug: 'arrabia',
    name: 'Arrabia',
    arabic: 'الثالثة المغربية',
    desc: '3rd channel — entertainment & culture',
    descAr: 'الثالثة — ترفيه وثقافة',
    icon: '🎭',
    badge: 'SNRT 3',
    color: 'from-orange-900/30 to-amber-900/20',
    border: 'border-orange-700/30',
  },
  {
    slug: 'al-maghribia',
    name: 'Al Maghribia',
    arabic: 'المغربية',
    desc: 'Channel for Moroccan diaspora worldwide',
    descAr: 'قناة الجالية المغربية في العالم',
    icon: '🌍',
    badge: 'SNRT',
    color: 'from-teal-900/30 to-emerald-900/20',
    border: 'border-teal-700/30',
  },
];

export default function ChainesMarocainesPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="max-w-4xl mx-auto space-y-10">

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative rounded-3xl overflow-hidden border border-green-800/30"
          style={{ background: 'linear-gradient(135deg, #020b02 0%, #051905 45%, #0b0302 100%)' }}>
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="absolute left-0 inset-y-0 w-1/2 bg-gradient-to-r from-green-900/20 to-transparent" />
          <div className="absolute right-0 inset-y-0 w-1/2 bg-gradient-to-l from-red-900/20 to-transparent" />

          <div className="relative px-6 py-10 md:py-14 text-center space-y-5">
            <div className="flex items-center justify-center gap-3">
              <span className="text-green-400/60">✦</span>
              <span className="text-green-400/80 text-xs font-bold uppercase tracking-[0.3em]">SportaLive</span>
              <span className="text-green-400/60">✦</span>
            </div>

            <div className="text-6xl md:text-7xl">🇲🇦</div>

            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Moroccan Channels
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-200 to-green-400">
                  Free Live Stream
                </span>
              </h1>
              <p className="text-gray-400 text-lg mt-2 font-arabic" dir="rtl">
                القنوات المغربية بث مباشر مجاناً
              </p>
            </div>

            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Watch 2M, Al Aoula, Arryadia, Medi 1 and more — free in HD, no subscription.
            </p>

            <div className="flex items-center justify-center gap-2 flex-wrap">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-red-600/20 border border-red-500/30 text-red-400 text-xs rounded-full font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />LIVE
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-gray-400 text-xs rounded-full">HD</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-gray-400 text-xs rounded-full">Free · مجاني</span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-gray-400 text-xs rounded-full">No Registration</span>
            </div>
          </div>
        </section>

        {/* ── Channel grid ─────────────────────────────────── */}
        <section>
          <h2 className="text-white font-bold text-xl mb-5">
            📺 All Moroccan Channels — <span dir="rtl" className="text-gray-400">جميع القنوات المغربية</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CHANNELS.map(ch => (
              <Link
                key={ch.slug}
                href={`/channel/${ch.slug}`}
                className={`relative flex items-start gap-4 p-4 rounded-2xl border bg-gradient-to-br ${ch.color} ${ch.border} hover:scale-[1.02] transition-all group`}
              >
                <span className="text-3xl flex-shrink-0 mt-0.5">{ch.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-bold text-base">{ch.name}</p>
                    <span className="text-[10px] px-1.5 py-0.5 bg-white/10 text-gray-400 rounded font-semibold">{ch.badge}</span>
                  </div>
                  <p className="text-gray-300 text-xs mb-0.5">{ch.desc}</p>
                  <p className="text-gray-500 text-xs" dir="rtl">{ch.descAr}</p>
                </div>
                <span className="flex items-center gap-1 px-2 py-0.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded text-[10px] font-bold flex-shrink-0">
                  <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />LIVE
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Arabic intro block ──────────────────────────── */}
        <section className="bg-gray-800/40 border border-white/5 rounded-2xl p-6 space-y-4" dir="rtl">
          <h2 className="text-white font-bold text-xl">🇲🇦 مشاهدة القنوات المغربية بث مباشر مجاناً</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            يوفر موقع SportaLive بثاً مباشراً مجانياً لجميع القنوات التلفزيونية المغربية الرئيسية وبجودة عالية HD.
            سواء كنت في المغرب، فرنسا، بلجيكا، كندا، أو أي مكان في العالم — يمكنك مشاهدة قناة 2M، القناة الأولى (الأولى)،
            القناة الرياضية (Arryadia)، قناة ميدي 1، قناة الثالثة (Arrabia)، وقناة المغربية بدون اشتراك أو تسجيل.
          </p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-2"><span className="text-green-400">✓</span> بدون اشتراك مدفوع</li>
            <li className="flex items-center gap-2"><span className="text-green-400">✓</span> جودة HD عالية</li>
            <li className="flex items-center gap-2"><span className="text-green-400">✓</span> متاح من جميع أنحاء العالم</li>
            <li className="flex items-center gap-2"><span className="text-green-400">✓</span> بدون تسجيل أو إنشاء حساب</li>
          </ul>
        </section>

        {/* ── French intro block ──────────────────────────── */}
        <section className="bg-gray-800/40 border border-white/5 rounded-2xl p-6 space-y-3">
          <h2 className="text-white font-bold text-lg">How to watch Moroccan channels free from anywhere?</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            SportaLive streams all major Moroccan TV channels free in HD.
            Whether you&apos;re in France, Belgium, Spain, Canada, or anywhere in the world, watch
            2M Maroc, Al Aoula, Arryadia Sport, Medi 1 TV, Arrabia and Al Maghribia — no subscription,
            no registration, no VPN needed.
          </p>
          <ul className="space-y-1.5 text-sm text-gray-400">
            <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Free, no subscription</li>
            <li className="flex items-center gap-2"><span className="text-green-400">✓</span> HD quality</li>
            <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Available from every country</li>
            <li className="flex items-center gap-2"><span className="text-green-400">✓</span> No account or registration required</li>
          </ul>
        </section>

        {/* ── FAQ ─────────────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-white font-bold text-xl">FAQ</h2>
          <div className="space-y-3">
            {faqJsonLd.mainEntity.map((q: any, i: number) => (
              <details key={i} className="bg-gray-800/60 border border-white/5 rounded-xl p-4 group" open={i < 2}>
                <summary className="text-white font-medium cursor-pointer list-none flex justify-between items-center">
                  {q.name}
                  <span className="text-gray-500 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="text-gray-400 text-sm mt-3">{q.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Related links ────────────────────────────────── */}
        <section className="flex flex-wrap gap-3">
          <Link href="/live" className="px-4 py-2 bg-gray-800/60 border border-white/10 text-gray-400 hover:text-white rounded-xl text-sm transition-colors">All Live Channels</Link>
          <Link href="/arsenal-vs-psg" className="px-4 py-2 bg-red-600/20 border border-red-500/30 text-red-400 hover:text-white rounded-xl text-sm transition-colors">Arsenal vs PSG Live</Link>
          <Link href="/champions-league-final-2026" className="px-4 py-2 bg-gray-800/60 border border-white/10 text-gray-400 hover:text-white rounded-xl text-sm transition-colors">UCL Final 2026</Link>
        </section>
      </div>
    </>
  );
}
