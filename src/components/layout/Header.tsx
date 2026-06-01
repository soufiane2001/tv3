'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tv, Heart, Radio, Menu, X, Trophy } from 'lucide-react';
import { useState } from 'react';
import SearchBar from '@/components/ui/SearchBar';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/components/layout/LanguageProvider';
import { t, LANGS, type Lang } from '@/lib/i18n';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const tx = t[lang];

  const navLinks = [
    { href: '/',          label: tx.home,      icon: Tv },
    { href: '/live',      label: tx.live,      icon: Radio },
    { href: '/wc2026',    label: tx.wc2026,    icon: Trophy, red: true },
    { href: '/favorites', label: tx.favorites, icon: Heart },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-white/[0.06]"
      style={{ background: 'rgba(10,10,10,0.95)' }}>
      <div className="max-w-screen-2xl mx-auto px-4 h-16 flex items-center gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center shadow-lg shadow-red-900/40 group-hover:bg-red-500 transition-colors">
            <Tv className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-white text-lg hidden sm:block tracking-tight">
            Sporta<span className="text-red-500">Live</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 ml-4">
          {navLinks.map(({ href, label, icon: Icon, red }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                red
                  ? pathname === href
                    ? 'bg-red-600/30 text-red-300'
                    : 'text-red-400 hover:text-white hover:bg-red-600/20 border border-red-500/30'
                  : pathname === href
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="flex-1 max-w-xs ml-auto">
          <SearchBar navigateToSearch placeholder={tx.search} className="w-full" />
        </div>

        {/* Language switcher */}
        <div className="flex items-center gap-1">
          {LANGS.map(l => (
            <button
              key={l.code}
              onClick={() => setLang(l.code as Lang)}
              title={l.flag}
              className={cn(
                'px-2 py-1 rounded-md text-xs font-bold transition-all',
                lang === l.code
                  ? 'bg-red-600/30 text-red-300'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              )}
            >
              {l.flag} {l.label}
            </button>
          ))}

          {/* Live Stream pill */}
          <Link href="/world-cup-2026-live"
            className="hidden sm:flex items-center gap-1.5 ml-2 px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-black rounded-full transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Live
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.06] backdrop-blur-xl" style={{ background: 'rgba(10,10,10,0.98)' }}>
          <nav className="flex flex-col p-3 gap-1">
            {navLinks.map(({ href, label, icon: Icon, red }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
                  red
                    ? pathname === href
                      ? 'bg-red-600/30 text-red-300'
                      : 'text-red-400 hover:text-white hover:bg-red-600/20'
                    : pathname === href
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            ))}
            <Link href="/world-cup-2026-live" onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-black text-white bg-red-600/20 border border-red-500/30">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              🔴 Live Stream — WC2026
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
