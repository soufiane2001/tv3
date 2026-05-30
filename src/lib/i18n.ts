export type Lang = 'en' | 'fr' | 'ar';

export const LANGS: { code: Lang; label: string; flag: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', label: 'EN', flag: '🇬🇧', dir: 'ltr' },
  { code: 'fr', label: 'FR', flag: '🇫🇷', dir: 'ltr' },
  { code: 'ar', label: 'عر', flag: '🇸🇦', dir: 'rtl' },
];

export const t = {
  en: {
    home:        'Home',
    live:        'Live TV',
    wc2026:      'WC 2026',
    favorites:   'Favorites',
    categories:  'Categories',
    allChannels: 'All Channels',
    search:      'Search channels...',
    admin:       'Admin',
  },
  fr: {
    home:        'Accueil',
    live:        'TV Direct',
    wc2026:      'CM 2026',
    favorites:   'Favoris',
    categories:  'Catégories',
    allChannels: 'Toutes les chaînes',
    search:      'Rechercher...',
    admin:       'Admin',
  },
  ar: {
    home:        'الرئيسية',
    live:        'البث المباشر',
    wc2026:      'كأس العالم',
    favorites:   'المفضلة',
    categories:  'الفئات',
    allChannels: 'جميع القنوات',
    search:      'بحث عن قناة...',
    admin:       'إدارة',
  },
} satisfies Record<Lang, Record<string, string>>;
