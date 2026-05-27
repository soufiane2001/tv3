import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
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
    title: `${category.name} Channels`,
    description: `Watch ${category.channelCount} live ${category.name} channels online.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-purple-400 text-sm font-medium mb-1">Category</p>
        <h1 className="text-2xl font-bold text-white">{category.name}</h1>
        <p className="text-gray-500 text-sm mt-1">{category.channelCount} live channels</p>
      </div>
      <ChannelGrid category={slug} title={category.name} />
    </div>
  );
}
