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
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Live TV</h1>
        <p className="text-gray-500 text-sm">All live channels available right now</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar
          onSearch={setSearch}
          placeholder="Search channels..."
          className="flex-1"
        />
        <CategoryFilter selected={category} onSelect={setCategory} />
      </div>

      <ChannelGrid search={search} category={category} />
    </div>
  );
}
