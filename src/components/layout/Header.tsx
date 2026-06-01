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
    { href: '/wc2026',              label: 'Schedule' },
    { href: '/world-cup-2026-live', label: 'WC Live', red: true },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05]"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(24px)' }}
    >
      <div className="max-w-screen-2xl mx-auto px-5 h-14 flex items-center gap-6">

        {/* Logo — Barlow Condensed brand mark */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <span className="w-6 h-6 bg-red-600 rounded-sm flex items-center justify-center
                           text-white font-black text-xs group-hover:bg-red-500 transition-colors"
                style={{ fontFamily: 'var(--font-display)' }}>S</span>
          <span className="hidden sm:block text-white font-black tracking-tight text-base uppercase"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}>
            Sporta<span className="text-red-600">Live</span>
          </span>
        </Link>

        {/* Desktop nav — hair-thin, minimal */}
        <nav className="hidden md:flex items-center gap-0.5 ml-2">
          {nav.map(({ href, label, red }) => (
            <Link key={href} href={href}
              className={cn(
                'px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-150',
                red
                  ? pathname === href
                    ? 'bg-red-600 text-white'
                    : 'text-red-500 hover:bg-red-600 hover:text-white'
                  : pathname === href
                    ? 'bg-white/10 text-white'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
              )}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Search — flexible */}
        <div className="flex-1 max-w-xs ml-auto">
          <SearchBar navigateToSearch placeholder={tx.search} className="w-full" />
        </div>

        {/* Lang flags + Live pill */}
        <div className="flex items-center gap-1">
          {LANGS.map(l => (
            <button key={l.code} onClick={() => setLang(l.code as Lang)}
              className={cn('px-1.5 py-1 rounded text-xs transition-all',
                lang === l.code ? 'text-white' : 'text-white/25 hover:text-white/60'
              )}>
              {l.flag}
            </button>
          ))}

          <Link href="/world-cup-2026-live" className="live-badge hidden sm:inline-flex ml-2">
            Live
          </Link>

          <button onClick={() => setOpen(v => !v)}
            className="md:hidden ml-1 p-1.5 text-white/40 hover:text-white transition-colors">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/[0.05]"
          style={{ background: 'rgba(0,0,0,0.97)' }}>
          <nav className="flex flex-col p-4 gap-1">
            {nav.map(({ href, label, red }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className={cn(
                  'px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors',
                  red
                    ? 'text-red-500 border border-red-600/25 bg-red-600/5 hover:bg-red-600/15'
                    : pathname === href
                      ? 'bg-white/10 text-white'
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                )}>
                {label}
              </Link>
            ))}
            <Link href="/world-cup-2026-live" onClick={() => setOpen(false)}
              className="live-badge justify-center mt-2">
              Watch Live Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
