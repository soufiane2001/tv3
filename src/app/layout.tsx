import type { Metadata } from 'next';
import { Barlow_Condensed, Inter } from 'next/font/google';
import './globals.css';

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import LanguageProvider from '@/components/layout/LanguageProvider';
import Tracker from '@/components/analytics/Tracker';
import GlobalAdScripts from '@/components/ads/GlobalAdScripts';
import StickyBottomAd from '@/components/ads/StickyBottomAd';
import ExitIntentAd from '@/components/ads/ExitIntentAd';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'react-hot-toast';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sportalive.live';

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SportaLive',
  url: SITE_URL,
  description: 'Free HD live sports streaming — 600+ channels, all 104 FIFA World Cup 2026 matches live. M6, beIN Sport UHD 1, RMC Sport, La 1 RTVE — no subscription.',
  inLanguage: ['en', 'fr', 'ar', 'es', 'pt'],
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SportaLive',
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  description: 'SportaLive is a free live sports streaming platform with 600+ channels including beIN Sport UHD 1, M6, RMC Sport, La 1 RTVE, and all 104 FIFA World Cup 2026 matches.',
  sameAs: [],
  knowsAbout: [
    'Live sports streaming', 'FIFA World Cup 2026', 'beIN Sport', 'M6 France', 'RMC Sport',
    'IPTV', 'Free live TV', 'Football streaming', 'كأس العالم 2026', 'Diffusion direct Coupe du Monde',
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SportaLive — Watch World Cup 2026 Live Free | M6 · beIN Sport · RMC',
    template: `%s | SportaLive`,
  },
  description: 'Watch all 104 FIFA World Cup 2026 matches live free in HD. Stream M6, beIN Sport 1 and RMC Sport — no subscription, no registration. 600+ live TV channels. Free HD streaming.',
  keywords: ['IPTV', 'live tv free', 'live stream', 'watch football free', 'beinsport free', 'بث مباشر', 'مشاهدة مباشرة', 'live TV', 'free channels', 'world cup 2026 live free', 'coupe du monde 2026 direct gratuit'],
  openGraph: { type: 'website', siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'SportaLive' },
  other: {
    'llms-txt': `${SITE_URL}/llms.txt`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full dark ${barlow.variable} ${inter.variable}`}>
      <body className="min-h-full text-white antialiased" style={{ fontFamily: 'var(--font-body, -apple-system, sans-serif)' }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <LanguageProvider>
        <Tracker />
        <GlobalAdScripts />
        <Header />
        <div className="flex max-w-screen-2xl mx-auto px-4 pt-16">
          <Sidebar />
          <main className="flex-1 min-w-0 py-6 lg:pl-6">{children}</main>
        </div>
        <StickyBottomAd />
        <ExitIntentAd />
        </LanguageProvider>
        <SpeedInsights />
        <Toaster
          position="bottom-left"
          toastOptions={{
            style: { background: '#1f2937', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' },
          }}
        />
      </body>
    </html>
  );
}
