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
    { href: '/wc2026',    label: tx.wc2026,    icon: Trophy, green: true },
    { href: '/favorites', label: tx.favorites, icon: Heart },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-screen-2xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-900/40">
            <Tv className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-lg hidden sm:block">
            Sport<span className="text-purple-400">aLive</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 ml-4">
          {navLinks.map(({ href, label, icon: Icon, green }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                green
                  ? pathname === href
                    ? 'bg-green-600/30 text-green-300'
                    : 'text-green-400 hover:text-white hover:bg-green-600/20 border border-green-500/30'
                  : pathname === href
                    ? 'bg-purple-600/20 text-purple-300'
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
          <SearchBar
            navigateToSearch
            placeholder={tx.search}
            className="w-full"
          />
        </div>

        {/* Language switcher + Admin */}
        <div className="flex items-center gap-1">
          {LANGS.map(l => (
            <button
              key={l.code}
              onClick={() => setLang(l.code as Lang)}
              title={l.flag}
              className={cn(
                'px-2 py-1 rounded-md text-xs font-bold transition-all',
                lang === l.code
                  ? 'bg-purple-600/30 text-purple-300'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              )}
            >
              {l.flag} {l.label}
            </button>
          ))}
          {/* Admin link removed from public nav */}

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
        <div className="md:hidden border-t border-white/5 bg-gray-950/95 backdrop-blur-xl">
          <nav className="flex flex-col p-3 gap-1">
            {navLinks.map(({ href, label, icon: Icon, green }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  green
                    ? pathname === href
                      ? 'bg-green-600/30 text-green-300'
                      : 'text-green-400 hover:text-white hover:bg-green-600/20'
                    : pathname === href
                      ? 'bg-purple-600/20 text-purple-300'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            ))}
            {/* Admin link removed from public nav */}
          </nav>
        </div>
      )}
    </header>
  );
}
