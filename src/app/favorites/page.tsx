'use client';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useFavoritesStore } from '@/store/useStore';
import ChannelCard from '@/components/channels/ChannelCard';
import SkeletonCard from '@/components/ui/SkeletonCard';
import type { Channel } from '@/types';

export default function FavoritesPage() {
  const { favorites } = useFavoritesStore();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favorites.length === 0) {
      setChannels([]);
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          favorites.map((id) =>
            fetch(`/api/channels/${id}`)
              .then((r) => r.json())
              .then((d) => d.success ? d.data : null)
              .catch(() => null)
          )
        );
        setChannels(results.filter(Boolean));
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Favorites</h1>
        <p className="text-gray-500 text-sm">Your saved channels</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : channels.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
            <Heart className="w-8 h-8 text-gray-600" />
          </div>
          <h2 className="text-lg font-semibold text-white">No favorites yet</h2>
          <p className="text-gray-500 max-w-sm text-sm">
            Click the heart icon on any channel to add it to your favorites.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {channels.map((channel, i) => (
            <ChannelCard key={channel.id} channel={channel} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
