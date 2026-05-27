'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Channel } from '@/types';

interface PlayerStore {
  currentChannel: Channel | null;
  isPlayerOpen: boolean;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  setCurrentChannel: (channel: Channel | null) => void;
  closePlayer: () => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  setFullscreen: (v: boolean) => void;
}

interface UIStore {
  sidebarOpen: boolean;
  searchQuery: string;
  setSidebarOpen: (v: boolean) => void;
  setSearchQuery: (q: string) => void;
}

interface FavoritesStore {
  favorites: string[];
  toggleFavorite: (channelId: string) => void;
  isFavorite: (channelId: string) => boolean;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  currentChannel: null,
  isPlayerOpen: false,
  volume: 80,
  isMuted: false,
  isFullscreen: false,
  setCurrentChannel: (channel) => set({ currentChannel: channel, isPlayerOpen: !!channel }),
  closePlayer: () => set({ currentChannel: null, isPlayerOpen: false }),
  setVolume: (volume) => set({ volume }),
  toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),
  setFullscreen: (isFullscreen) => set({ isFullscreen }),
}));

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: false,
  searchQuery: '',
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (channelId) =>
        set((s) => ({
          favorites: s.favorites.includes(channelId)
            ? s.favorites.filter((id) => id !== channelId)
            : [...s.favorites, channelId],
        })),
      isFavorite: (channelId) => get().favorites.includes(channelId),
    }),
    { name: 'iptv-favorites' }
  )
);
