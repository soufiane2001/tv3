import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ChannelGrid from '@/components/channels/ChannelGrid';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return {};
  return {
    title: `${category.name} — Live Channels Free | SportaLive`,
    description: `Watch ${category.channelCount} live ${category.name} channels online for free in HD. No subscription needed. Stream directly in your browser — no app, no subscription, no registration.`,
    alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sportalive.live'}/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="w-1 h-12 rounded-full bg-red-600 flex-shrink-0 mt-1" />
        <div>
          <p className="text-red-400 text-xs font-black uppercase tracking-widest mb-1">Category</p>
          <h1 className="text-2xl font-black text-white">{category.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-[10px] font-black uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {category.channelCount} Live Channels
            </span>
            <Link href="/live" className="text-gray-500 hover:text-white text-xs transition-colors">← All Channels</Link>
          </div>
        </div>
      </div>
      <p className="text-gray-400 text-sm max-w-2xl">
        Stream {category.channelCount} {category.name} channels live and free in HD — no subscription, no registration, no app needed.
        All streams play directly in your browser, available 24/7.
      </p>
      <ChannelGrid category={slug} title={category.name} />
    </div>
  );
}
