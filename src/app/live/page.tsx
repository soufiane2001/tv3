'use client';
import { useState } from 'react';
import ChannelGrid from '@/components/channels/ChannelGrid';
import SearchBar from '@/components/ui/SearchBar';
import CategoryFilter from '@/components/ui/CategoryFilter';

export default function LivePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 rounded-full bg-red-600" />
        <div>
          <h1 className="text-2xl font-black text-white">Live TV</h1>
          <p className="text-gray-500 text-sm">All live channels available right now</p>
        </div>
        <span className="flex items-center gap-1.5 ml-3 px-3 py-1 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-[10px] font-black uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />Live
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar onSearch={setSearch} placeholder="Search channels..." className="flex-1" />
        <CategoryFilter selected={category} onSelect={setCategory} />
      </div>

      <ChannelGrid search={search} category={category} />
    </div>
  );
}
