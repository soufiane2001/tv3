'use client';
import { useState, useEffect, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import ChannelCard from './ChannelCard';
import SkeletonCard from '@/components/ui/SkeletonCard';
import type { Channel } from '@/types';

interface ChannelGridProps {
  category?: string;
  search?: string;
  initialData?: Channel[];
  title?: string;
}

export default function ChannelGrid({ category, search, initialData, title }: ChannelGridProps) {
  const [channels, setChannels] = useState<Channel[]>(initialData || []);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(!initialData);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchChannels = useCallback(
    async (pageNum: number, append = false) => {
      if (append) setLoadingMore(true);
      else setLoading(true);

      try {
        const params = new URLSearchParams({ page: String(pageNum), limit: '24' });
        if (category) params.set('category', category);
        if (search) params.set('search', search);

        const res = await fetch(`/api/channels?${params}`);
        const json = await res.json();

        if (json.success) {
          setChannels((prev) => (append ? [...prev, ...json.data] : json.data));
          setTotalPages(json.totalPages);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [category, search]
  );

  useEffect(() => {
    if (!initialData || search || category) {
      setPage(1);
      fetchChannels(1, false);
    }
  }, [category, search, fetchChannels, initialData]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchChannels(nextPage, true);
  };

  if (loading) {
    return (
      <div>
        {title && <h2 className="text-xl font-bold text-white mb-4">{title}</h2>}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!loading && channels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-500">
        <p className="text-lg">No channels found</p>
        {search && <p className="text-sm">Try a different search term</p>}
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          {title}
          <span className="text-sm font-normal text-gray-500">({channels.length})</span>
        </h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {channels.map((channel, i) => (
          <ChannelCard key={channel.id} channel={channel} index={i} />
        ))}
      </div>

      {page < totalPages && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 text-white rounded-xl transition-colors font-medium"
          >
            {loadingMore ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
