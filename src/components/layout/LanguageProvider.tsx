'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { type Lang, LANGS } from '@/lib/i18n';

type LangCtx = { lang: Lang; setLang: (l: Lang) => void };
const Ctx = createContext<LangCtx>({ lang: 'fr', setLang: () => {} });

export function useLanguage() { return useContext(Ctx); }

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved && ['en', 'fr', 'ar'].includes(saved)) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
    const dir = LANGS.find(x => x.code === l)?.dir ?? 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', l);
  };

  useEffect(() => {
    const dir = LANGS.find(x => x.code === lang)?.dir ?? 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}
