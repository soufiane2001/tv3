export function detectDevice(ua: string): string {
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return 'mobile';
  return 'desktop';
}

export function detectBrowser(ua: string): string {
  if (/edg\//i.test(ua))     return 'Edge';
  if (/opr\//i.test(ua))     return 'Opera';
  if (/chrome/i.test(ua))    return 'Chrome';
  if (/safari/i.test(ua))    return 'Safari';
  if (/firefox/i.test(ua))   return 'Firefox';
  if (/msie|trident/i.test(ua)) return 'IE';
  return 'Other';
}

const BOT_PATTERN = new RegExp([
  // Generic signals
  'bot','crawl','spider','slurp','scraper','scanner','indexer','checker','validator',
  // Search engines
  'googlebot','google-inspectiontool','bingbot','yahoo','yandex','baiduspider',
  'duckduckbot','applebot','sogou','exabot','seznambot','naver',
  // SEO / marketing tools
  'semrush','ahrefs','rogerbot','dotbot','majestic','screamingfrog',
  'seokicks','seostar','sistrix','serpstat','linkdexbot','blexbot',
  // Monitoring / uptime
  'pingdom','uptimerobot','statuscake','freshping','hetrixtools',
  'site24x7','nodeping','newrelic','datadog','catchpoint',
  // Headless / automation
  'headlesschrome','headless','phantomjs','puppeteer','selenium','playwright',
  'cypress','nightmare','zombie','mechanize','htmlunit','slimerjs',
  // Prerender / SSR
  'prerender','rendertron','googleweblight',
  // AI crawlers
  'gptbot','chatgpt','claudebot','anthropic','cohere','perplexity',
  'ccbot','omgili','diffbot','magpie-crawler',
  // Download tools
  'wget','curl','python-requests','python-urllib','go-http-client',
  'java/','libwww','httpunit','httpclient','okhttp','axios',
  // Social / link preview
  'facebookexternalhit','twitterbot','linkedinbot','slackbot','discordbot',
  'telegrambot','whatsapp','viber','vkshare','xing-contenttabreceiver',
  'skypeuripreview','line-poker','pinterest',
  // Misc
  'archive.org','wayback','webarchive','archive.org_bot',
  'teoma','ask jeeves','gigabot','netcraft','netresearch',
].join('|'), 'i');

export function isBot(ua: string): boolean {
  if (!ua || ua.length < 10) return true; // empty or suspiciously short UA
  return BOT_PATTERN.test(ua);
}

/** Get country from request headers (Cloudflare, Vercel, custom proxy). */
export function getCountryFromHeaders(headers: Headers): { country: string; countryCode: string; city: string } {
  // Cloudflare
  const cf = headers.get('cf-ipcountry');
  if (cf && cf !== 'XX') {
    return { countryCode: cf, country: COUNTRY_NAMES[cf] || cf, city: headers.get('cf-ipcity') || '' };
  }
  // Vercel
  const v = headers.get('x-vercel-ip-country');
  if (v) {
    return { countryCode: v, country: COUNTRY_NAMES[v] || v, city: headers.get('x-vercel-ip-city') || '' };
  }
  // Custom proxy header
  const c = headers.get('x-country-code');
  if (c) return { countryCode: c, country: COUNTRY_NAMES[c] || c, city: '' };

  return { countryCode: '??', country: 'Unknown', city: '' };
}

/** Purge live visitors older than 3 minutes. */
export async function purgeStaleLiveVisitors() {
  const { prisma } = await import('./prisma');
  const cutoff = new Date(Date.now() - 3 * 60 * 1000);
  await prisma.liveVisitor.deleteMany({ where: { lastSeen: { lt: cutoff } } });
}

// ISO 3166-1 alpha-2 country codes → names
export const COUNTRY_NAMES: Record<string, string> = {
  AD:'Andorra',AE:'UAE',AF:'Afghanistan',AL:'Albania',AM:'Armenia',AO:'Angola',
  AR:'Argentina',AT:'Austria',AU:'Australia',AZ:'Azerbaijan',BA:'Bosnia',BD:'Bangladesh',
  BE:'Belgium',BF:'Burkina Faso',BG:'Bulgaria',BH:'Bahrain',BJ:'Benin',BN:'Brunei',
  BO:'Bolivia',BR:'Brazil',BT:'Bhutan',BW:'Botswana',BY:'Belarus',BZ:'Belize',
  CA:'Canada',CD:'DR Congo',CF:'CAR',CG:'Congo',CH:'Switzerland',CI:'Ivory Coast',
  CL:'Chile',CM:'Cameroon',CN:'China',CO:'Colombia',CR:'Costa Rica',CU:'Cuba',
  CV:'Cape Verde',CY:'Cyprus',CZ:'Czech Republic',DE:'Germany',DJ:'Djibouti',
  DK:'Denmark',DO:'Dominican Rep.',DZ:'Algeria',EC:'Ecuador',EE:'Estonia',
  EG:'Egypt',ER:'Eritrea',ES:'Spain',ET:'Ethiopia',FI:'Finland',FJ:'Fiji',
  FR:'France',GA:'Gabon',GB:'United Kingdom',GE:'Georgia',GH:'Ghana',GM:'Gambia',
  GN:'Guinea',GQ:'Eq. Guinea',GR:'Greece',GT:'Guatemala',GW:'Guinea-Bissau',
  GY:'Guyana',HK:'Hong Kong',HN:'Honduras',HR:'Croatia',HT:'Haiti',HU:'Hungary',
  ID:'Indonesia',IE:'Ireland',IL:'Israel',IN:'India',IQ:'Iraq',IR:'Iran',
  IS:'Iceland',IT:'Italy',JM:'Jamaica',JO:'Jordan',JP:'Japan',KE:'Kenya',
  KG:'Kyrgyzstan',KH:'Cambodia',KI:'Kiribati',KM:'Comoros',KP:'North Korea',
  KR:'South Korea',KW:'Kuwait',KZ:'Kazakhstan',LA:'Laos',LB:'Lebanon',LI:'Liechtenstein',
  LK:'Sri Lanka',LR:'Liberia',LS:'Lesotho',LT:'Lithuania',LU:'Luxembourg',LV:'Latvia',
  LY:'Libya',MA:'Morocco',MC:'Monaco',MD:'Moldova',ME:'Montenegro',MG:'Madagascar',
  ML:'Mali',MM:'Myanmar',MN:'Mongolia',MR:'Mauritania',MT:'Malta',MU:'Mauritius',
  MV:'Maldives',MW:'Malawi',MX:'Mexico',MY:'Malaysia',MZ:'Mozambique',NA:'Namibia',
  NE:'Niger',NG:'Nigeria',NI:'Nicaragua',NL:'Netherlands',NO:'Norway',NP:'Nepal',
  NR:'Nauru',NZ:'New Zealand',OM:'Oman',PA:'Panama',PE:'Peru',PG:'Papua NG',
  PH:'Philippines',PK:'Pakistan',PL:'Poland',PS:'Palestine',PT:'Portugal',PW:'Palau',
  PY:'Paraguay',QA:'Qatar',RO:'Romania',RS:'Serbia',RU:'Russia',RW:'Rwanda',
  SA:'Saudi Arabia',SB:'Solomon Is.',SC:'Seychelles',SD:'Sudan',SE:'Sweden',
  SG:'Singapore',SI:'Slovenia',SK:'Slovakia',SL:'Sierra Leone',SM:'San Marino',
  SN:'Senegal',SO:'Somalia',SR:'Suriname',SS:'South Sudan',ST:'São Tomé',
  SV:'El Salvador',SY:'Syria',SZ:'Eswatini',TD:'Chad',TG:'Togo',TH:'Thailand',
  TJ:'Tajikistan',TL:'Timor-Leste',TM:'Turkmenistan',TN:'Tunisia',TO:'Tonga',
  TR:'Turkey',TT:'Trinidad',TV:'Tuvalu',TZ:'Tanzania',UA:'Ukraine',UG:'Uganda',
  US:'United States',UY:'Uruguay',UZ:'Uzbekistan',VA:'Vatican',VC:'St Vincent',
  VE:'Venezuela',VN:'Vietnam',VU:'Vanuatu',WS:'Samoa',YE:'Yemen',ZA:'South Africa',
  ZM:'Zambia',ZW:'Zimbabwe',
};

export const COUNTRY_FLAGS: Record<string, string> = {
  AD:'🇦🇩',AE:'🇦🇪',AF:'🇦🇫',AL:'🇦🇱',AM:'🇦🇲',AO:'🇦🇴',AR:'🇦🇷',AT:'🇦🇹',AU:'🇦🇺',
  AZ:'🇦🇿',BA:'🇧🇦',BD:'🇧🇩',BE:'🇧🇪',BF:'🇧🇫',BG:'🇧🇬',BH:'🇧🇭',BR:'🇧🇷',BY:'🇧🇾',
  CA:'🇨🇦',CD:'🇨🇩',CH:'🇨🇭',CL:'🇨🇱',CM:'🇨🇲',CN:'🇨🇳',CO:'🇨🇴',CZ:'🇨🇿',
  DE:'🇩🇪',DK:'🇩🇰',DZ:'🇩🇿',EG:'🇪🇬',ES:'🇪🇸',ET:'🇪🇹',FI:'🇫🇮',FR:'🇫🇷',
  GB:'🇬🇧',GE:'🇬🇪',GH:'🇬🇭',GR:'🇬🇷',HK:'🇭🇰',HR:'🇭🇷',HU:'🇭🇺',ID:'🇮🇩',
  IE:'🇮🇪',IL:'🇮🇱',IN:'🇮🇳',IQ:'🇮🇶',IR:'🇮🇷',IT:'🇮🇹',JO:'🇯🇴',JP:'🇯🇵',
  KE:'🇰🇪',KR:'🇰🇷',KW:'🇰🇼',KZ:'🇰🇿',LB:'🇱🇧',LY:'🇱🇾',MA:'🇲🇦',MX:'🇲🇽',
  MY:'🇲🇾',NG:'🇳🇬',NL:'🇳🇱',NO:'🇳🇴',NP:'🇳🇵',NZ:'🇳🇿',OM:'🇴🇲',PA:'🇵🇦',
  PE:'🇵🇪',PH:'🇵🇭',PK:'🇵🇰',PL:'🇵🇱',PS:'🇵🇸',PT:'🇵🇹',QA:'🇶🇦',RO:'🇷🇴',
  RS:'🇷🇸',RU:'🇷🇺',SA:'🇸🇦',SE:'🇸🇪',SG:'🇸🇬',SN:'🇸🇳',SO:'🇸🇴',SD:'🇸🇩',
  SY:'🇸🇾',TH:'🇹🇭',TN:'🇹🇳',TR:'🇹🇷',TZ:'🇹🇿',UA:'🇺🇦',UG:'🇺🇬',US:'🇺🇸',
  UZ:'🇺🇿',VE:'🇻🇪',VN:'🇻🇳',YE:'🇾🇪',ZA:'🇿🇦',ZM:'🇿🇲',ZW:'🇿🇼',
};
