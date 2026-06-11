import type { Metadata } from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sportalive.live';

export const metadata: Metadata = {
  title: 'Live TV Channels — Watch Free HD Streams | SportaLive',
  description: 'Browse 600+ live TV channels streaming free in HD — sports, news, entertainment worldwide. No subscription, no registration. Watch instantly in your browser.',
  alternates: {
    canonical: `${SITE}/live`,
  },
  openGraph: {
    title: 'Live TV Channels — Watch Free HD Streams | SportaLive',
    description: 'Browse 600+ live TV channels free in HD. Sports, news, entertainment — no subscription.',
    type: 'website',
    url: `${SITE}/live`,
  },
  robots: { index: true, follow: true },
};

export default function LiveLayout({ children }: { children: React.ReactNode }) {
  return children;
}
