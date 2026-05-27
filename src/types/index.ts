export interface Channel {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  streamUrl: string;
  groupTitle: string;
  categoryId: string | null;
  category?: Category | null;
  isActive: boolean;
  order: number;
  tvgId: string | null;
  tvgName: string | null;
  createdAt: Date;
  updatedAt: Date;
  isFavorite?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  channelCount: number;
  channels?: Channel[];
}

export interface Favorite {
  id: string;
  channelId: string;
  sessionId: string;
}

export interface SyncLog {
  id: string;
  status: string;
  channelsAdded: number;
  channelsUpdated: number;
  channelsRemoved: number;
  totalChannels: number;
  error: string | null;
  createdAt: Date;
}

export interface M3UEntry {
  name: string;
  logo: string;
  groupTitle: string;
  tvgId: string;
  tvgName: string;
  streamUrl: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export type PlayerState = 'idle' | 'loading' | 'playing' | 'paused' | 'error' | 'buffering';
