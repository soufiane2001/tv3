'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ChannelGrid from '@/components/channels/ChannelGrid';
import SearchBar from '@/components/ui/SearchBar';
import { Suspense } from 'react';

function SearchContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Search</h1>
        <p className="text-gray-500 text-sm">Find your favorite channels</p>
      </div>

      <SearchBar
        onSearch={setQuery}
        placeholder="Search channels..."
        className="max-w-xl"
      />

      {query ? (
        <ChannelGrid
          search={query}
          title={`Results for "${query}"`}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <p>Start typing to search channels</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
