'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import SearchBar from '@/components/ui/SearchBar';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/components/layout/LanguageProvider';
import { t, LANGS, type Lang } from '@/lib/i18n';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const tx = t[lang];

  const nav = [
    { href: '/',                    label: tx.home },
    { href: '/live',                label: tx.live },
    { href: '/world-cup-2026-live', label: 'WC 2026', red: true },
    { href: '/wc2026',              label: tx.wc2026 },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06]"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)' }}>
      <div className="max-w-screen-2xl mx-auto px-5 h-16 flex items-center gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
          <span className="w-7 h-7 bg-red-600 rounded flex items-center justify-center text-white font-black text-xs group-hover:bg-red-500 transition-colors">S</span>
          <span className="font-black text-white text-base tracking-tight hidden sm:block uppercase">
            Sporta<span className="text-red-600">Live</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 ml-2">
          {nav.map(({ href, label, red }) => (
            <Link key={href} href={href}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all',
                red
                  ? pathname === href
                    ? 'bg-red-600 text-white'
                    : 'text-red-500 hover:bg-red-600 hover:text-white border border-red-600/40'
                  : pathname === href
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}>
              {label}
              {red && <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse ml-1.5 align-middle" />}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="flex-1 max-w-sm ml-auto">
          <SearchBar navigateToSearch placeholder={tx.search} className="w-full" />
        </div>

        {/* Lang + Live button */}
        <div className="flex items-center gap-1.5">
          {LANGS.map(l => (
            <button key={l.code} onClick={() => setLang(l.code as Lang)}
              className={cn('px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all',
                lang === l.code ? 'text-white bg-white/10' : 'text-gray-600 hover:text-white'
              )}>
              {l.flag}
            </button>
          ))}
          <Link href="/world-cup-2026-live"
            className="live-badge hidden sm:inline-flex ml-1">
            Live
          </Link>
          <button onClick={() => setOpen(v => !v)} className="md:hidden p-2 text-gray-400 hover:text-white">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/[0.06]" style={{ background: 'rgba(0,0,0,0.98)' }}>
          <nav className="flex flex-col p-4 gap-1">
            {nav.map(({ href, label, red }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors',
                  red ? 'text-red-400 border border-red-600/30 bg-red-600/5' : pathname === href ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}>
                {label}
                {red && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
              </Link>
            ))}
            <Link href="/world-cup-2026-live" onClick={() => setOpen(false)}
              className="live-badge mt-2 justify-center">
              🔴 Watch Live Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
