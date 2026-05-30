import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Tracker from '@/components/analytics/Tracker';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_SITE_NAME || 'SportaLive',
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME || 'SportaLive'}`,
  },
  description: 'Regardez les matchs de foot et + 1000 chaînes TV en direct gratuitement. Beinsport, MBC, Al Jazeera, chaînes sportives et d\'infos.',
  keywords: ['IPTV', 'streaming gratuit', 'chaînes en direct', 'foot en direct', 'beinsport gratuit', 'بث مباشر', 'مشاهدة مباشرة', 'live TV', 'chaînes arabes'],
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
  },
  openGraph: { type: 'website', siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'SportaLive' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full dark">
      <body className="min-h-full bg-gray-950 text-white antialiased">
        <Tracker />
        <Header />
        <div className="flex max-w-screen-2xl mx-auto px-4 pt-16">
          <Sidebar />
          <main className="flex-1 min-w-0 py-6 lg:pl-6">{children}</main>
        </div>
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
