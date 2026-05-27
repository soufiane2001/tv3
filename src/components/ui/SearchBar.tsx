'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  navigateToSearch?: boolean;
}

export default function SearchBar({
  className,
  placeholder = 'Search channels...',
  onSearch,
  navigateToSearch = false,
}: SearchBarProps) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (onSearch) onSearch(value);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navigateToSearch && value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'relative flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200',
        focused
          ? 'bg-gray-800 border-purple-500 shadow-lg shadow-purple-900/20'
          : 'bg-gray-800/60 border-white/10 hover:border-white/20',
        className
      )}
    >
      <Search className={cn('w-4 h-4 flex-shrink-0 transition-colors', focused ? 'text-purple-400' : 'text-gray-500')} />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 outline-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => { setValue(''); onSearch?.(''); }}
          className="text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </form>
  );
}
