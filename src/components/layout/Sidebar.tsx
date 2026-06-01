'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/components/layout/LanguageProvider';
import { t } from '@/lib/i18n';
import type { Category } from '@/types';

export default function Sidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const pathname = usePathname();
  const { lang } = useLanguage();
  const tx = t[lang];

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((d) => { if (d.success) setCategories(d.data); });
  }, []);

  return (
    <aside className="hidden lg:flex flex-col w-56 flex-shrink-0 pt-16">
      <div className="sticky top-16 overflow-y-auto max-h-[calc(100vh-4rem)] py-6 pr-2">

        {/* WC2026 Live — red highlighted */}
        <Link href="/world-cup-2026-live"
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl mb-3 text-sm font-black transition-all border border-red-500/30 bg-red-600/10 text-red-400 hover:bg-red-600/20 hover:text-white">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
          <span>🔴 WC2026 Live</span>
        </Link>

        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest px-3 mb-2">
          {tx.categories}
        </p>

        <nav className="flex flex-col gap-0.5">
          {/* WC 2026 schedule */}
          <Link
            href="/wc2026"
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors font-semibold',
              pathname === '/wc2026'
                ? 'bg-red-600/20 text-red-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            )}
          >
            <Trophy className="w-3.5 h-3.5 flex-shrink-0 text-red-500" />
            <span>{tx.wc2026}</span>
          </Link>

          {/* All Channels */}
          <Link
            href="/live"
            className={cn(
              'flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors font-medium',
              pathname === '/live'
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            )}
          >
            <span>{tx.allChannels}</span>
          </Link>

          <div className="my-2 h-px bg-white/[0.06]" />

          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className={cn(
                'flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
                pathname === `/category/${cat.slug}`
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}
            >
              <span className="truncate">{cat.name}</span>
              <span className="text-xs text-gray-700 ml-2 flex-shrink-0">{cat.channelCount}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
