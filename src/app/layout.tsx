import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import LanguageProvider from '@/components/layout/LanguageProvider';
import Tracker from '@/components/analytics/Tracker';
import GlobalAdScripts from '@/components/ads/GlobalAdScripts';
import StickyBottomAd from '@/components/ads/StickyBottomAd';
import ExitIntentAd from '@/components/ads/ExitIntentAd';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sportalive.live'),
  title: {
    default: process.env.NEXT_PUBLIC_SITE_NAME || 'SportaLive',
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME || 'SportaLive'}`,
  },
  description: 'Watch live football and 1000+ free TV channels in HD — beIN Sports, MBC, Al Jazeera, sports & news. No subscription, no registration. بث مباشر مجاني.',
  keywords: ['IPTV', 'live tv free', 'live stream', 'watch football free', 'beinsport free', 'بث مباشر', 'مشاهدة مباشرة', 'live TV', 'free channels'],
  openGraph: { type: 'website', siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'SportaLive' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full dark">
      <body className="min-h-full bg-gray-950 text-white antialiased">
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
