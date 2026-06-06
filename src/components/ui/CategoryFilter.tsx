'use client';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { Category } from '@/types';

interface CategoryFilterProps {
  selected: string;
  onSelect: (slug: string) => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((d) => { if (d.success) setCategories(d.data); });
  }, []);

  if (categories.length === 0) return null;

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 flex-wrap sm:flex-nowrap">
      <button
        onClick={() => onSelect('')}
        className={cn(
          'px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0',
          !selected
            ? 'bg-red-600 text-white'
            : 'border border-white/[0.08] text-white/50 hover:text-white hover:border-red-500/35 hover:bg-red-500/[0.08]'
        )}
      >
        All
      </button>
      {categories.slice(0, 10).map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.slug === selected ? '' : cat.slug)}
          className={cn(
            'px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0',
            selected === cat.slug
              ? 'bg-red-600 text-white'
              : 'border border-white/[0.08] text-white/50 hover:text-white hover:border-red-500/35 hover:bg-red-500/[0.08]'
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
