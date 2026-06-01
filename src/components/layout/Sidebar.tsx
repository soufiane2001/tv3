'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
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
    fetch('/api/categories').then(r => r.json()).then(d => { if (d.success) setCategories(d.data); });
  }, []);

  return (
    <aside className="hidden lg:flex flex-col w-52 flex-shrink-0 pt-16">
      <div className="sticky top-16 overflow-y-auto max-h-[calc(100vh-4rem)] py-6 pr-3"
        style={{ scrollbarWidth: 'none' }}>

        {/* WC2026 Live CTA */}
        <Link href="/world-cup-2026-live"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl mb-4 border border-red-600/30 bg-red-600/8 hover:bg-red-600/15 transition-colors group">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
          <span className="text-red-400 group-hover:text-white text-xs font-black uppercase tracking-widest transition-colors">WC2026 Live</span>
        </Link>

        <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.2em] px-3 mb-2">
          {tx.categories}
        </p>

        <nav className="flex flex-col gap-0.5">
          {[{ href: '/live', label: tx.allChannels }, { href: '/wc2026', label: tx.wc2026 }].map(({ href, label }) => (
            <Link key={href} href={href}
              className={cn('px-3 py-2 rounded-lg text-xs font-semibold transition-colors',
                pathname === href ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'
              )}>
              {label}
            </Link>
          ))}

          <div className="my-2 h-px bg-white/[0.05]" />

          {categories.map(cat => (
            <Link key={cat.id} href={`/category/${cat.slug}`}
              className={cn('flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors',
                pathname === `/category/${cat.slug}` ? 'bg-white/10 text-white font-semibold' : 'text-white/40 hover:text-white hover:bg-white/5'
              )}>
              <span className="truncate">{cat.name}</span>
              <span className="text-white/15 font-bold ml-2 flex-shrink-0">{cat.channelCount}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
