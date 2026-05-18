import { useState, useCallback } from 'react';
import type { MediaItem } from '@/types/media';
import { mockMedia } from '@lib/mocks/media';

interface UseMediaReturn {
  media: MediaItem[];
  filteredMedia: MediaItem[];
  filter: string;
  setFilter: (f: string) => void;
  search: string;
  setSearch: (s: string) => void;
}

export function useMedia(): UseMediaReturn {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredMedia = mockMedia.filter((item) => {
    const matchesFilter = filter === 'all' || item.status === filter;
    const matchesSearch =
      search === '' || item.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return {
    media: mockMedia,
    filteredMedia,
    filter,
    setFilter: useCallback((f: string) => setFilter(f), []),
    search,
    setSearch: useCallback((s: string) => setSearch(s), []),
  };
}
