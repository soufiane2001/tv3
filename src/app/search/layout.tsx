import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Channels | SportaLive',
  robots: { index: false, follow: false },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
