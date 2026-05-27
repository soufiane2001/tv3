'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { Category } from '@/types';

export default function Sidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((d) => { if (d.success) setCategories(d.data); });
  }, []);

  return (
    <aside className="hidden lg:flex flex-col w-56 flex-shrink-0 pt-16">
      <div className="sticky top-16 overflow-y-auto max-h-[calc(100vh-4rem)] py-6 pr-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3">
          Categories
        </p>
        <nav className="flex flex-col gap-0.5">
          <Link
            href="/live"
            className={cn(
              'flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
              pathname === '/live'
                ? 'bg-purple-600/20 text-purple-300'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            )}
          >
            <span>All Channels</span>
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className={cn(
                'flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
                pathname === `/category/${cat.slug}`
                  ? 'bg-purple-600/20 text-purple-300'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}
            >
              <span className="truncate">{cat.name}</span>
              <span className="text-xs text-gray-600 ml-2 flex-shrink-0">{cat.channelCount}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
