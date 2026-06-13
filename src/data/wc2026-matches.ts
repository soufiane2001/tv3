// Single source of truth for the WC2026 group stage — all 72 matches (12 groups).
// Consumed by: home MatchLinksGrid, /wc2026 hub, /world-cup-2026-live schedule,
// the dynamic [match] route (lib/match-seo), and sitemap.ts.
//
// Data = real FIFA final draw (05/12/2025) + ESPN/official match schedule.
// `time` is Paris local time (CEST, UTC+2); "+1" = early-morning the next day.
// `startUtc` is the real kick-off in UTC (ISO). `day` is the venue-local matchday
// (FIFA day, schedule header); `dateFull` is the long form for the match page.
// Flag codes follow flagcdn.com (Scotland = gb-sct, England = gb-eng).
// NOTE: kick-off times for newly added matches come from ESPN and may be off by
// an hour for a few fixtures — worth spot-checking against the official schedule.

export interface WcMatch {
  slug: string;
  home: string; hf: string;
  away: string; af: string;
  group: string;
  day: string;        // 'Thursday June 11' — schedule grouping header
  dayShort: string;   // 'Thu 11 Jun'
  dateFull: string;   // 'Thursday, 11 June 2026'
  time: string;       // Paris time, e.g. '21:00' / '04:00+1'
  startUtc: string;   // ISO UTC kick-off
  venue: string;      // 'MetLife Stadium, New Jersey'
  venueShort: string; // 'MetLife Stadium, NY'
}

export interface WcTeam { flag: string; nickname: string; }

export const WC2026_TEAMS: Record<string, WcTeam> = {
  'Algeria': { flag: 'dz', nickname: 'Les Fennecs' },
  'Argentina': { flag: 'ar', nickname: 'La Albiceleste' },
  'Australia': { flag: 'au', nickname: 'Socceroos' },
  'Austria': { flag: 'at', nickname: '' },
  'Belgium': { flag: 'be', nickname: 'Red Devils' },
  'Bosnia': { flag: 'ba', nickname: 'Zmajevi' },
  'Brazil': { flag: 'br', nickname: 'Selecao' },
  'Canada': { flag: 'ca', nickname: 'Les Rouges' },
  'Cape Verde': { flag: 'cv', nickname: 'Blue Sharks' },
  'Colombia': { flag: 'co', nickname: 'Los Cafeteros' },
  'Croatia': { flag: 'hr', nickname: 'Vatreni' },
  'Curacao': { flag: 'cw', nickname: '' },
  'Czechia': { flag: 'cz', nickname: 'Narodni tym' },
  'DR Congo': { flag: 'cd', nickname: 'Leopards' },
  'Ecuador': { flag: 'ec', nickname: 'La Tri' },
  'Egypt': { flag: 'eg', nickname: 'The Pharaohs' },
  'England': { flag: 'gb-eng', nickname: 'Three Lions' },
  'France': { flag: 'fr', nickname: 'Les Bleus' },
  'Germany': { flag: 'de', nickname: 'Die Mannschaft' },
  'Ghana': { flag: 'gh', nickname: 'Black Stars' },
  'Haiti': { flag: 'ht', nickname: 'Les Grenadiers' },
  'Iran': { flag: 'ir', nickname: 'Team Melli' },
  'Iraq': { flag: 'iq', nickname: 'Lions of Mesopotamia' },
  'Ivory Coast': { flag: 'ci', nickname: 'Les Elephants' },
  'Japan': { flag: 'jp', nickname: 'Samurai Blue' },
  'Jordan': { flag: 'jo', nickname: 'Al-Nashama' },
  'Korea': { flag: 'kr', nickname: 'Taeguk Warriors' },
  'Mexico': { flag: 'mx', nickname: 'El Tri' },
  'Morocco': { flag: 'ma', nickname: 'Atlas Lions' },
  'Netherlands': { flag: 'nl', nickname: 'Oranje' },
  'New Zealand': { flag: 'nz', nickname: 'All Whites' },
  'Norway': { flag: 'no', nickname: '' },
  'Panama': { flag: 'pa', nickname: 'La Marea Roja' },
  'Paraguay': { flag: 'py', nickname: 'La Albirroja' },
  'Portugal': { flag: 'pt', nickname: 'Selecao' },
  'Qatar': { flag: 'qa', nickname: 'Al Annabi' },
  'Saudi Arabia': { flag: 'sa', nickname: 'Green Falcons' },
  'Scotland': { flag: 'gb-sct', nickname: 'Tartan Army' },
  'Senegal': { flag: 'sn', nickname: 'Lions of Teranga' },
  'South Africa': { flag: 'za', nickname: 'Bafana Bafana' },
  'Spain': { flag: 'es', nickname: 'La Roja' },
  'Sweden': { flag: 'se', nickname: 'Blagult' },
  'Switzerland': { flag: 'ch', nickname: 'Nati' },
  'Tunisia': { flag: 'tn', nickname: 'Eagles of Carthage' },
  'Turkiye': { flag: 'tr', nickname: 'Ay-Yildizlilar' },
  'USA': { flag: 'us', nickname: 'USMNT' },
  'Uruguay': { flag: 'uy', nickname: 'La Celeste' },
  'Uzbekistan': { flag: 'uz', nickname: 'White Wolves' },
};

export const WC2026_MATCHES: WcMatch[] = [
  { slug: 'mexico-vs-south-africa-2026', home: 'Mexico', hf: 'mx', away: 'South Africa', af: 'za', group: 'A', day: 'Thursday June 11', dayShort: 'Thu 11 Jun', dateFull: 'Thursday, 11 June 2026', time: '21:00', startUtc: '2026-06-11T19:00:00Z', venue: 'Estadio Azteca, Mexico City', venueShort: 'Estadio Azteca, MX' },
  { slug: 'korea-vs-czechia-2026', home: 'Korea', hf: 'kr', away: 'Czechia', af: 'cz', group: 'A', day: 'Thursday June 11', dayShort: 'Thu 11 Jun', dateFull: 'Thursday, 11 June 2026', time: '04:00+1', startUtc: '2026-06-12T02:00:00Z', venue: 'Estadio Akron, Guadalajara', venueShort: 'Estadio Akron, GDL' },
  { slug: 'czechia-vs-south-africa-2026', home: 'Czechia', hf: 'cz', away: 'South Africa', af: 'za', group: 'A', day: 'Thursday June 18', dayShort: 'Thu 18 Jun', dateFull: 'Thursday, 18 June 2026', time: '18:00', startUtc: '2026-06-18T16:00:00Z', venue: 'Mercedes-Benz Stadium, Atlanta', venueShort: 'Mercedes-Benz Stadium, ATL' },
  { slug: 'mexico-vs-korea-2026', home: 'Mexico', hf: 'mx', away: 'Korea', af: 'kr', group: 'A', day: 'Thursday June 18', dayShort: 'Thu 18 Jun', dateFull: 'Thursday, 18 June 2026', time: '05:00+1', startUtc: '2026-06-19T03:00:00Z', venue: 'Estadio Akron, Guadalajara', venueShort: 'Estadio Akron, GDL' },
  { slug: 'czechia-vs-mexico-2026', home: 'Czechia', hf: 'cz', away: 'Mexico', af: 'mx', group: 'A', day: 'Wednesday June 24', dayShort: 'Wed 24 Jun', dateFull: 'Wednesday, 24 June 2026', time: '03:00+1', startUtc: '2026-06-25T01:00:00Z', venue: 'Estadio Azteca, Mexico City', venueShort: 'Estadio Azteca, MX' },
  { slug: 'south-africa-vs-korea-2026', home: 'South Africa', hf: 'za', away: 'Korea', af: 'kr', group: 'A', day: 'Wednesday June 24', dayShort: 'Wed 24 Jun', dateFull: 'Wednesday, 24 June 2026', time: '03:00+1', startUtc: '2026-06-25T01:00:00Z', venue: 'Estadio BBVA, Monterrey', venueShort: 'Estadio BBVA, MTY' },
  { slug: 'canada-vs-bosnia-2026', home: 'Canada', hf: 'ca', away: 'Bosnia', af: 'ba', group: 'B', day: 'Friday June 12', dayShort: 'Fri 12 Jun', dateFull: 'Friday, 12 June 2026', time: '21:00', startUtc: '2026-06-12T19:00:00Z', venue: 'BMO Field, Toronto', venueShort: 'BMO Field, Toronto' },
  { slug: 'qatar-vs-switzerland-2026', home: 'Qatar', hf: 'qa', away: 'Switzerland', af: 'ch', group: 'B', day: 'Saturday June 13', dayShort: 'Sat 13 Jun', dateFull: 'Saturday, 13 June 2026', time: '21:00', startUtc: '2026-06-13T19:00:00Z', venue: "Levi's Stadium, Santa Clara", venueShort: "Levi's Stadium, SF" },
  { slug: 'switzerland-vs-bosnia-2026', home: 'Switzerland', hf: 'ch', away: 'Bosnia', af: 'ba', group: 'B', day: 'Thursday June 18', dayShort: 'Thu 18 Jun', dateFull: 'Thursday, 18 June 2026', time: '21:00', startUtc: '2026-06-18T19:00:00Z', venue: 'SoFi Stadium, Los Angeles', venueShort: 'SoFi Stadium, LA' },
  { slug: 'canada-vs-qatar-2026', home: 'Canada', hf: 'ca', away: 'Qatar', af: 'qa', group: 'B', day: 'Thursday June 18', dayShort: 'Thu 18 Jun', dateFull: 'Thursday, 18 June 2026', time: '00:00+1', startUtc: '2026-06-18T22:00:00Z', venue: 'BC Place, Vancouver', venueShort: 'BC Place, Vancouver' },
  { slug: 'switzerland-vs-canada-2026', home: 'Switzerland', hf: 'ch', away: 'Canada', af: 'ca', group: 'B', day: 'Wednesday June 24', dayShort: 'Wed 24 Jun', dateFull: 'Wednesday, 24 June 2026', time: '21:00', startUtc: '2026-06-24T19:00:00Z', venue: 'BC Place, Vancouver', venueShort: 'BC Place, Vancouver' },
  { slug: 'bosnia-vs-qatar-2026', home: 'Bosnia', hf: 'ba', away: 'Qatar', af: 'qa', group: 'B', day: 'Wednesday June 24', dayShort: 'Wed 24 Jun', dateFull: 'Wednesday, 24 June 2026', time: '21:00', startUtc: '2026-06-24T19:00:00Z', venue: 'Lumen Field, Seattle', venueShort: 'Lumen Field, Seattle' },
  { slug: 'brazil-vs-morocco-2026', home: 'Brazil', hf: 'br', away: 'Morocco', af: 'ma', group: 'C', day: 'Saturday June 13', dayShort: 'Sat 13 Jun', dateFull: 'Saturday, 13 June 2026', time: '00:00+1', startUtc: '2026-06-13T22:00:00Z', venue: 'MetLife Stadium, New Jersey', venueShort: 'MetLife Stadium, NY' },
  { slug: 'haiti-vs-scotland-2026', home: 'Haiti', hf: 'ht', away: 'Scotland', af: 'gb-sct', group: 'C', day: 'Saturday June 13', dayShort: 'Sat 13 Jun', dateFull: 'Saturday, 13 June 2026', time: '03:00+1', startUtc: '2026-06-14T01:00:00Z', venue: 'Gillette Stadium, Boston', venueShort: 'Gillette Stadium, Boston' },
  { slug: 'scotland-vs-morocco-2026', home: 'Scotland', hf: 'gb-sct', away: 'Morocco', af: 'ma', group: 'C', day: 'Friday June 19', dayShort: 'Fri 19 Jun', dateFull: 'Friday, 19 June 2026', time: '00:00+1', startUtc: '2026-06-19T22:00:00Z', venue: 'Gillette Stadium, Boston', venueShort: 'Gillette Stadium, Boston' },
  { slug: 'brazil-vs-haiti-2026', home: 'Brazil', hf: 'br', away: 'Haiti', af: 'ht', group: 'C', day: 'Friday June 19', dayShort: 'Fri 19 Jun', dateFull: 'Friday, 19 June 2026', time: '03:00+1', startUtc: '2026-06-20T01:00:00Z', venue: 'Lincoln Financial Field, Philadelphia', venueShort: 'Lincoln Financial Field, PHL' },
  { slug: 'scotland-vs-brazil-2026', home: 'Scotland', hf: 'gb-sct', away: 'Brazil', af: 'br', group: 'C', day: 'Wednesday June 24', dayShort: 'Wed 24 Jun', dateFull: 'Wednesday, 24 June 2026', time: '00:00+1', startUtc: '2026-06-24T22:00:00Z', venue: 'Hard Rock Stadium, Miami', venueShort: 'Hard Rock Stadium, Miami' },
  { slug: 'morocco-vs-haiti-2026', home: 'Morocco', hf: 'ma', away: 'Haiti', af: 'ht', group: 'C', day: 'Wednesday June 24', dayShort: 'Wed 24 Jun', dateFull: 'Wednesday, 24 June 2026', time: '00:00+1', startUtc: '2026-06-24T22:00:00Z', venue: 'Mercedes-Benz Stadium, Atlanta', venueShort: 'Mercedes-Benz Stadium, ATL' },
  { slug: 'usa-vs-paraguay-2026', home: 'USA', hf: 'us', away: 'Paraguay', af: 'py', group: 'D', day: 'Friday June 12', dayShort: 'Fri 12 Jun', dateFull: 'Friday, 12 June 2026', time: '03:00+1', startUtc: '2026-06-13T01:00:00Z', venue: 'SoFi Stadium, Los Angeles', venueShort: 'SoFi Stadium, LA' },
  { slug: 'australia-vs-turkiye-2026', home: 'Australia', hf: 'au', away: 'Turkiye', af: 'tr', group: 'D', day: 'Saturday June 13', dayShort: 'Sat 13 Jun', dateFull: 'Saturday, 13 June 2026', time: '06:00+1', startUtc: '2026-06-14T04:00:00Z', venue: 'BC Place, Vancouver', venueShort: 'BC Place, Vancouver' },
  { slug: 'usa-vs-australia-2026', home: 'USA', hf: 'us', away: 'Australia', af: 'au', group: 'D', day: 'Friday June 19', dayShort: 'Fri 19 Jun', dateFull: 'Friday, 19 June 2026', time: '21:00', startUtc: '2026-06-19T19:00:00Z', venue: 'Lumen Field, Seattle', venueShort: 'Lumen Field, Seattle' },
  { slug: 'turkiye-vs-paraguay-2026', home: 'Turkiye', hf: 'tr', away: 'Paraguay', af: 'py', group: 'D', day: 'Friday June 19', dayShort: 'Fri 19 Jun', dateFull: 'Friday, 19 June 2026', time: '06:00+1', startUtc: '2026-06-20T04:00:00Z', venue: "Levi's Stadium, Santa Clara", venueShort: "Levi's Stadium, SF" },
  { slug: 'turkiye-vs-usa-2026', home: 'Turkiye', hf: 'tr', away: 'USA', af: 'us', group: 'D', day: 'Thursday June 25', dayShort: 'Thu 25 Jun', dateFull: 'Thursday, 25 June 2026', time: '04:00+1', startUtc: '2026-06-26T02:00:00Z', venue: 'SoFi Stadium, Los Angeles', venueShort: 'SoFi Stadium, LA' },
  { slug: 'paraguay-vs-australia-2026', home: 'Paraguay', hf: 'py', away: 'Australia', af: 'au', group: 'D', day: 'Thursday June 25', dayShort: 'Thu 25 Jun', dateFull: 'Thursday, 25 June 2026', time: '04:00+1', startUtc: '2026-06-26T02:00:00Z', venue: "Levi's Stadium, Santa Clara", venueShort: "Levi's Stadium, SF" },
  { slug: 'germany-vs-curacao-2026', home: 'Germany', hf: 'de', away: 'Curacao', af: 'cw', group: 'E', day: 'Sunday June 14', dayShort: 'Sun 14 Jun', dateFull: 'Sunday, 14 June 2026', time: '19:00', startUtc: '2026-06-14T17:00:00Z', venue: 'NRG Stadium, Houston', venueShort: 'NRG Stadium, Houston' },
  { slug: 'ivory-coast-vs-ecuador-2026', home: 'Ivory Coast', hf: 'ci', away: 'Ecuador', af: 'ec', group: 'E', day: 'Sunday June 14', dayShort: 'Sun 14 Jun', dateFull: 'Sunday, 14 June 2026', time: '01:00+1', startUtc: '2026-06-14T23:00:00Z', venue: 'Lincoln Financial Field, Philadelphia', venueShort: 'Lincoln Financial Field, PHL' },
  { slug: 'germany-vs-ivory-coast-2026', home: 'Germany', hf: 'de', away: 'Ivory Coast', af: 'ci', group: 'E', day: 'Saturday June 20', dayShort: 'Sat 20 Jun', dateFull: 'Saturday, 20 June 2026', time: '22:00', startUtc: '2026-06-20T20:00:00Z', venue: 'BMO Field, Toronto', venueShort: 'BMO Field, Toronto' },
  { slug: 'ecuador-vs-curacao-2026', home: 'Ecuador', hf: 'ec', away: 'Curacao', af: 'cw', group: 'E', day: 'Saturday June 20', dayShort: 'Sat 20 Jun', dateFull: 'Saturday, 20 June 2026', time: '02:00+1', startUtc: '2026-06-21T00:00:00Z', venue: 'Arrowhead Stadium, Kansas City', venueShort: 'Arrowhead Stadium, KC' },
  { slug: 'ecuador-vs-germany-2026', home: 'Ecuador', hf: 'ec', away: 'Germany', af: 'de', group: 'E', day: 'Thursday June 25', dayShort: 'Thu 25 Jun', dateFull: 'Thursday, 25 June 2026', time: '22:00', startUtc: '2026-06-25T20:00:00Z', venue: 'MetLife Stadium, New Jersey', venueShort: 'MetLife Stadium, NY' },
  { slug: 'curacao-vs-ivory-coast-2026', home: 'Curacao', hf: 'cw', away: 'Ivory Coast', af: 'ci', group: 'E', day: 'Thursday June 25', dayShort: 'Thu 25 Jun', dateFull: 'Thursday, 25 June 2026', time: '22:00', startUtc: '2026-06-25T20:00:00Z', venue: 'Lincoln Financial Field, Philadelphia', venueShort: 'Lincoln Financial Field, PHL' },
  { slug: 'netherlands-vs-japan-2026', home: 'Netherlands', hf: 'nl', away: 'Japan', af: 'jp', group: 'F', day: 'Sunday June 14', dayShort: 'Sun 14 Jun', dateFull: 'Sunday, 14 June 2026', time: '22:00', startUtc: '2026-06-14T20:00:00Z', venue: 'AT&T Stadium, Dallas', venueShort: 'AT&T Stadium, Dallas' },
  { slug: 'sweden-vs-tunisia-2026', home: 'Sweden', hf: 'se', away: 'Tunisia', af: 'tn', group: 'F', day: 'Sunday June 14', dayShort: 'Sun 14 Jun', dateFull: 'Sunday, 14 June 2026', time: '04:00+1', startUtc: '2026-06-15T02:00:00Z', venue: 'Estadio BBVA, Monterrey', venueShort: 'Estadio BBVA, MTY' },
  { slug: 'netherlands-vs-sweden-2026', home: 'Netherlands', hf: 'nl', away: 'Sweden', af: 'se', group: 'F', day: 'Saturday June 20', dayShort: 'Sat 20 Jun', dateFull: 'Saturday, 20 June 2026', time: '19:00', startUtc: '2026-06-20T17:00:00Z', venue: 'NRG Stadium, Houston', venueShort: 'NRG Stadium, Houston' },
  { slug: 'tunisia-vs-japan-2026', home: 'Tunisia', hf: 'tn', away: 'Japan', af: 'jp', group: 'F', day: 'Saturday June 20', dayShort: 'Sat 20 Jun', dateFull: 'Saturday, 20 June 2026', time: '06:00+1', startUtc: '2026-06-21T04:00:00Z', venue: 'Estadio BBVA, Monterrey', venueShort: 'Estadio BBVA, MTY' },
  { slug: 'japan-vs-sweden-2026', home: 'Japan', hf: 'jp', away: 'Sweden', af: 'se', group: 'F', day: 'Thursday June 25', dayShort: 'Thu 25 Jun', dateFull: 'Thursday, 25 June 2026', time: '01:00+1', startUtc: '2026-06-25T23:00:00Z', venue: 'AT&T Stadium, Dallas', venueShort: 'AT&T Stadium, Dallas' },
  { slug: 'tunisia-vs-netherlands-2026', home: 'Tunisia', hf: 'tn', away: 'Netherlands', af: 'nl', group: 'F', day: 'Thursday June 25', dayShort: 'Thu 25 Jun', dateFull: 'Thursday, 25 June 2026', time: '01:00+1', startUtc: '2026-06-25T23:00:00Z', venue: 'Arrowhead Stadium, Kansas City', venueShort: 'Arrowhead Stadium, KC' },
  { slug: 'belgium-vs-egypt-2026', home: 'Belgium', hf: 'be', away: 'Egypt', af: 'eg', group: 'G', day: 'Monday June 15', dayShort: 'Mon 15 Jun', dateFull: 'Monday, 15 June 2026', time: '00:00+1', startUtc: '2026-06-15T22:00:00Z', venue: 'Lumen Field, Seattle', venueShort: 'Lumen Field, Seattle' },
  { slug: 'iran-vs-new-zealand-2026', home: 'Iran', hf: 'ir', away: 'New Zealand', af: 'nz', group: 'G', day: 'Monday June 15', dayShort: 'Mon 15 Jun', dateFull: 'Monday, 15 June 2026', time: '06:00+1', startUtc: '2026-06-16T04:00:00Z', venue: 'SoFi Stadium, Los Angeles', venueShort: 'SoFi Stadium, LA' },
  { slug: 'belgium-vs-iran-2026', home: 'Belgium', hf: 'be', away: 'Iran', af: 'ir', group: 'G', day: 'Sunday June 21', dayShort: 'Sun 21 Jun', dateFull: 'Sunday, 21 June 2026', time: '21:00', startUtc: '2026-06-21T19:00:00Z', venue: 'SoFi Stadium, Los Angeles', venueShort: 'SoFi Stadium, LA' },
  { slug: 'new-zealand-vs-egypt-2026', home: 'New Zealand', hf: 'nz', away: 'Egypt', af: 'eg', group: 'G', day: 'Sunday June 21', dayShort: 'Sun 21 Jun', dateFull: 'Sunday, 21 June 2026', time: '03:00+1', startUtc: '2026-06-22T01:00:00Z', venue: 'BC Place, Vancouver', venueShort: 'BC Place, Vancouver' },
  { slug: 'egypt-vs-iran-2026', home: 'Egypt', hf: 'eg', away: 'Iran', af: 'ir', group: 'G', day: 'Friday June 26', dayShort: 'Fri 26 Jun', dateFull: 'Friday, 26 June 2026', time: '05:00+1', startUtc: '2026-06-27T03:00:00Z', venue: 'Lumen Field, Seattle', venueShort: 'Lumen Field, Seattle' },
  { slug: 'new-zealand-vs-belgium-2026', home: 'New Zealand', hf: 'nz', away: 'Belgium', af: 'be', group: 'G', day: 'Friday June 26', dayShort: 'Fri 26 Jun', dateFull: 'Friday, 26 June 2026', time: '05:00+1', startUtc: '2026-06-27T03:00:00Z', venue: 'BC Place, Vancouver', venueShort: 'BC Place, Vancouver' },
  { slug: 'spain-vs-cape-verde-2026', home: 'Spain', hf: 'es', away: 'Cape Verde', af: 'cv', group: 'H', day: 'Monday June 15', dayShort: 'Mon 15 Jun', dateFull: 'Monday, 15 June 2026', time: '19:00', startUtc: '2026-06-15T17:00:00Z', venue: 'Mercedes-Benz Stadium, Atlanta', venueShort: 'Mercedes-Benz Stadium, ATL' },
  { slug: 'saudi-arabia-vs-uruguay-2026', home: 'Saudi Arabia', hf: 'sa', away: 'Uruguay', af: 'uy', group: 'H', day: 'Monday June 15', dayShort: 'Mon 15 Jun', dateFull: 'Monday, 15 June 2026', time: '00:00+1', startUtc: '2026-06-15T22:00:00Z', venue: 'Hard Rock Stadium, Miami', venueShort: 'Hard Rock Stadium, Miami' },
  { slug: 'spain-vs-saudi-arabia-2026', home: 'Spain', hf: 'es', away: 'Saudi Arabia', af: 'sa', group: 'H', day: 'Sunday June 21', dayShort: 'Sun 21 Jun', dateFull: 'Sunday, 21 June 2026', time: '18:00', startUtc: '2026-06-21T16:00:00Z', venue: 'Mercedes-Benz Stadium, Atlanta', venueShort: 'Mercedes-Benz Stadium, ATL' },
  { slug: 'uruguay-vs-cape-verde-2026', home: 'Uruguay', hf: 'uy', away: 'Cape Verde', af: 'cv', group: 'H', day: 'Sunday June 21', dayShort: 'Sun 21 Jun', dateFull: 'Sunday, 21 June 2026', time: '00:00+1', startUtc: '2026-06-21T22:00:00Z', venue: 'Hard Rock Stadium, Miami', venueShort: 'Hard Rock Stadium, Miami' },
  { slug: 'cape-verde-vs-saudi-arabia-2026', home: 'Cape Verde', hf: 'cv', away: 'Saudi Arabia', af: 'sa', group: 'H', day: 'Friday June 26', dayShort: 'Fri 26 Jun', dateFull: 'Friday, 26 June 2026', time: '02:00+1', startUtc: '2026-06-27T00:00:00Z', venue: 'NRG Stadium, Houston', venueShort: 'NRG Stadium, Houston' },
  { slug: 'uruguay-vs-spain-2026', home: 'Uruguay', hf: 'uy', away: 'Spain', af: 'es', group: 'H', day: 'Friday June 26', dayShort: 'Fri 26 Jun', dateFull: 'Friday, 26 June 2026', time: '02:00+1', startUtc: '2026-06-27T00:00:00Z', venue: 'Estadio Akron, Guadalajara', venueShort: 'Estadio Akron, GDL' },
  { slug: 'france-vs-senegal-2026', home: 'France', hf: 'fr', away: 'Senegal', af: 'sn', group: 'I', day: 'Tuesday June 16', dayShort: 'Tue 16 Jun', dateFull: 'Tuesday, 16 June 2026', time: '21:00', startUtc: '2026-06-16T19:00:00Z', venue: 'MetLife Stadium, New Jersey', venueShort: 'MetLife Stadium, NY' },
  { slug: 'iraq-vs-norway-2026', home: 'Iraq', hf: 'iq', away: 'Norway', af: 'no', group: 'I', day: 'Tuesday June 16', dayShort: 'Tue 16 Jun', dateFull: 'Tuesday, 16 June 2026', time: '00:00+1', startUtc: '2026-06-16T22:00:00Z', venue: 'Gillette Stadium, Boston', venueShort: 'Gillette Stadium, Boston' },
  { slug: 'france-vs-iraq-2026', home: 'France', hf: 'fr', away: 'Iraq', af: 'iq', group: 'I', day: 'Monday June 22', dayShort: 'Mon 22 Jun', dateFull: 'Monday, 22 June 2026', time: '23:00', startUtc: '2026-06-22T21:00:00Z', venue: 'Lincoln Financial Field, Philadelphia', venueShort: 'Lincoln Financial Field, PHL' },
  { slug: 'norway-vs-senegal-2026', home: 'Norway', hf: 'no', away: 'Senegal', af: 'sn', group: 'I', day: 'Monday June 22', dayShort: 'Mon 22 Jun', dateFull: 'Monday, 22 June 2026', time: '02:00+1', startUtc: '2026-06-23T00:00:00Z', venue: 'MetLife Stadium, New Jersey', venueShort: 'MetLife Stadium, NY' },
  { slug: 'norway-vs-france-2026', home: 'Norway', hf: 'no', away: 'France', af: 'fr', group: 'I', day: 'Friday June 26', dayShort: 'Fri 26 Jun', dateFull: 'Friday, 26 June 2026', time: '21:00', startUtc: '2026-06-26T19:00:00Z', venue: 'Gillette Stadium, Boston', venueShort: 'Gillette Stadium, Boston' },
  { slug: 'senegal-vs-iraq-2026', home: 'Senegal', hf: 'sn', away: 'Iraq', af: 'iq', group: 'I', day: 'Friday June 26', dayShort: 'Fri 26 Jun', dateFull: 'Friday, 26 June 2026', time: '21:00', startUtc: '2026-06-26T19:00:00Z', venue: 'BMO Field, Toronto', venueShort: 'BMO Field, Toronto' },
  { slug: 'argentina-vs-algeria-2026', home: 'Argentina', hf: 'ar', away: 'Algeria', af: 'dz', group: 'J', day: 'Tuesday June 16', dayShort: 'Tue 16 Jun', dateFull: 'Tuesday, 16 June 2026', time: '03:00+1', startUtc: '2026-06-17T01:00:00Z', venue: 'Arrowhead Stadium, Kansas City', venueShort: 'Arrowhead Stadium, KC' },
  { slug: 'austria-vs-jordan-2026', home: 'Austria', hf: 'at', away: 'Jordan', af: 'jo', group: 'J', day: 'Tuesday June 16', dayShort: 'Tue 16 Jun', dateFull: 'Tuesday, 16 June 2026', time: '06:00+1', startUtc: '2026-06-17T04:00:00Z', venue: "Levi's Stadium, Santa Clara", venueShort: "Levi's Stadium, SF" },
  { slug: 'argentina-vs-austria-2026', home: 'Argentina', hf: 'ar', away: 'Austria', af: 'at', group: 'J', day: 'Sunday June 21', dayShort: 'Sun 21 Jun', dateFull: 'Sunday, 21 June 2026', time: '19:00', startUtc: '2026-06-21T17:00:00Z', venue: 'AT&T Stadium, Dallas', venueShort: 'AT&T Stadium, Dallas' },
  { slug: 'jordan-vs-algeria-2026', home: 'Jordan', hf: 'jo', away: 'Algeria', af: 'dz', group: 'J', day: 'Sunday June 21', dayShort: 'Sun 21 Jun', dateFull: 'Sunday, 21 June 2026', time: '05:00+1', startUtc: '2026-06-22T03:00:00Z', venue: "Levi's Stadium, Santa Clara", venueShort: "Levi's Stadium, SF" },
  { slug: 'algeria-vs-austria-2026', home: 'Algeria', hf: 'dz', away: 'Austria', af: 'at', group: 'J', day: 'Saturday June 27', dayShort: 'Sat 27 Jun', dateFull: 'Saturday, 27 June 2026', time: '04:00+1', startUtc: '2026-06-28T02:00:00Z', venue: 'Arrowhead Stadium, Kansas City', venueShort: 'Arrowhead Stadium, KC' },
  { slug: 'jordan-vs-argentina-2026', home: 'Jordan', hf: 'jo', away: 'Argentina', af: 'ar', group: 'J', day: 'Saturday June 27', dayShort: 'Sat 27 Jun', dateFull: 'Saturday, 27 June 2026', time: '04:00+1', startUtc: '2026-06-28T02:00:00Z', venue: 'AT&T Stadium, Dallas', venueShort: 'AT&T Stadium, Dallas' },
  { slug: 'portugal-vs-dr-congo-2026', home: 'Portugal', hf: 'pt', away: 'DR Congo', af: 'cd', group: 'K', day: 'Wednesday June 17', dayShort: 'Wed 17 Jun', dateFull: 'Wednesday, 17 June 2026', time: '19:00', startUtc: '2026-06-17T17:00:00Z', venue: 'NRG Stadium, Houston', venueShort: 'NRG Stadium, Houston' },
  { slug: 'uzbekistan-vs-colombia-2026', home: 'Uzbekistan', hf: 'uz', away: 'Colombia', af: 'co', group: 'K', day: 'Wednesday June 17', dayShort: 'Wed 17 Jun', dateFull: 'Wednesday, 17 June 2026', time: '04:00+1', startUtc: '2026-06-18T02:00:00Z', venue: 'Estadio Azteca, Mexico City', venueShort: 'Estadio Azteca, MX' },
  { slug: 'portugal-vs-uzbekistan-2026', home: 'Portugal', hf: 'pt', away: 'Uzbekistan', af: 'uz', group: 'K', day: 'Tuesday June 23', dayShort: 'Tue 23 Jun', dateFull: 'Tuesday, 23 June 2026', time: '19:00', startUtc: '2026-06-23T17:00:00Z', venue: 'NRG Stadium, Houston', venueShort: 'NRG Stadium, Houston' },
  { slug: 'colombia-vs-dr-congo-2026', home: 'Colombia', hf: 'co', away: 'DR Congo', af: 'cd', group: 'K', day: 'Tuesday June 23', dayShort: 'Tue 23 Jun', dateFull: 'Tuesday, 23 June 2026', time: '04:00+1', startUtc: '2026-06-24T02:00:00Z', venue: 'Estadio Akron, Guadalajara', venueShort: 'Estadio Akron, GDL' },
  { slug: 'colombia-vs-portugal-2026', home: 'Colombia', hf: 'co', away: 'Portugal', af: 'pt', group: 'K', day: 'Saturday June 27', dayShort: 'Sat 27 Jun', dateFull: 'Saturday, 27 June 2026', time: '01:30+1', startUtc: '2026-06-27T23:30:00Z', venue: 'Hard Rock Stadium, Miami', venueShort: 'Hard Rock Stadium, Miami' },
  { slug: 'dr-congo-vs-uzbekistan-2026', home: 'DR Congo', hf: 'cd', away: 'Uzbekistan', af: 'uz', group: 'K', day: 'Saturday June 27', dayShort: 'Sat 27 Jun', dateFull: 'Saturday, 27 June 2026', time: '01:30+1', startUtc: '2026-06-27T23:30:00Z', venue: 'Mercedes-Benz Stadium, Atlanta', venueShort: 'Mercedes-Benz Stadium, ATL' },
  { slug: 'england-vs-croatia-2026', home: 'England', hf: 'gb-eng', away: 'Croatia', af: 'hr', group: 'L', day: 'Wednesday June 17', dayShort: 'Wed 17 Jun', dateFull: 'Wednesday, 17 June 2026', time: '22:00', startUtc: '2026-06-17T20:00:00Z', venue: 'AT&T Stadium, Dallas', venueShort: 'AT&T Stadium, Dallas' },
  { slug: 'ghana-vs-panama-2026', home: 'Ghana', hf: 'gh', away: 'Panama', af: 'pa', group: 'L', day: 'Wednesday June 17', dayShort: 'Wed 17 Jun', dateFull: 'Wednesday, 17 June 2026', time: '01:00+1', startUtc: '2026-06-17T23:00:00Z', venue: 'BMO Field, Toronto', venueShort: 'BMO Field, Toronto' },
  { slug: 'england-vs-ghana-2026', home: 'England', hf: 'gb-eng', away: 'Ghana', af: 'gh', group: 'L', day: 'Tuesday June 23', dayShort: 'Tue 23 Jun', dateFull: 'Tuesday, 23 June 2026', time: '22:00', startUtc: '2026-06-23T20:00:00Z', venue: 'Gillette Stadium, Boston', venueShort: 'Gillette Stadium, Boston' },
  { slug: 'panama-vs-croatia-2026', home: 'Panama', hf: 'pa', away: 'Croatia', af: 'hr', group: 'L', day: 'Tuesday June 23', dayShort: 'Tue 23 Jun', dateFull: 'Tuesday, 23 June 2026', time: '01:00+1', startUtc: '2026-06-23T23:00:00Z', venue: 'BMO Field, Toronto', venueShort: 'BMO Field, Toronto' },
  { slug: 'panama-vs-england-2026', home: 'Panama', hf: 'pa', away: 'England', af: 'gb-eng', group: 'L', day: 'Saturday June 27', dayShort: 'Sat 27 Jun', dateFull: 'Saturday, 27 June 2026', time: '23:00', startUtc: '2026-06-27T21:00:00Z', venue: 'MetLife Stadium, New Jersey', venueShort: 'MetLife Stadium, NY' },
  { slug: 'croatia-vs-ghana-2026', home: 'Croatia', hf: 'hr', away: 'Ghana', af: 'gh', group: 'L', day: 'Saturday June 27', dayShort: 'Sat 27 Jun', dateFull: 'Saturday, 27 June 2026', time: '23:00', startUtc: '2026-06-27T21:00:00Z', venue: 'Lincoln Financial Field, Philadelphia', venueShort: 'Lincoln Financial Field, PHL' },
];

export function getMatch(slug: string): WcMatch | undefined {
  return WC2026_MATCHES.find(m => m.slug === slug);
}

export function getTeam(name: string): WcTeam | undefined {
  return WC2026_TEAMS[name];
}

// Team names in FR / AR / ES / PT — used to build multilingual SEO keywords,
// titles and a visible variants line so searches like "maroc vs brésil",
// "brasil vs marruecos", "brasil vs marrocos" or "المغرب ضد البرازيل" all match.
export interface TeamI18n { fr: string; ar: string; es: string; pt: string; }
export const TEAM_I18N: Record<string, TeamI18n> = {
  'Mexico':       { fr: 'Mexique',         ar: 'المكسيك',          es: 'México',          pt: 'México' },
  'South Africa': { fr: 'Afrique du Sud',  ar: 'جنوب أفريقيا',     es: 'Sudáfrica',       pt: 'África do Sul' },
  'Korea':        { fr: 'Corée du Sud',    ar: 'كوريا الجنوبية',   es: 'Corea del Sur',   pt: 'Coreia do Sul' },
  'Czechia':      { fr: 'Tchéquie',        ar: 'التشيك',           es: 'Chequia',         pt: 'Chéquia' },
  'Canada':       { fr: 'Canada',          ar: 'كندا',             es: 'Canadá',          pt: 'Canadá' },
  'Bosnia':       { fr: 'Bosnie',          ar: 'البوسنة',          es: 'Bosnia',          pt: 'Bósnia' },
  'Qatar':        { fr: 'Qatar',           ar: 'قطر',              es: 'Catar',           pt: 'Catar' },
  'Switzerland':  { fr: 'Suisse',          ar: 'سويسرا',           es: 'Suiza',           pt: 'Suíça' },
  'Brazil':       { fr: 'Brésil',          ar: 'البرازيل',         es: 'Brasil',          pt: 'Brasil' },
  'Morocco':      { fr: 'Maroc',           ar: 'المغرب',           es: 'Marruecos',       pt: 'Marrocos' },
  'Haiti':        { fr: 'Haïti',           ar: 'هايتي',            es: 'Haití',           pt: 'Haiti' },
  'Scotland':     { fr: 'Écosse',          ar: 'اسكتلندا',         es: 'Escocia',         pt: 'Escócia' },
  'USA':          { fr: 'États-Unis',      ar: 'الولايات المتحدة', es: 'Estados Unidos',  pt: 'Estados Unidos' },
  'Paraguay':     { fr: 'Paraguay',        ar: 'باراغواي',         es: 'Paraguay',        pt: 'Paraguai' },
  'Australia':    { fr: 'Australie',       ar: 'أستراليا',         es: 'Australia',       pt: 'Austrália' },
  'Turkiye':      { fr: 'Turquie',         ar: 'تركيا',            es: 'Turquía',         pt: 'Turquia' },
  'Germany':      { fr: 'Allemagne',       ar: 'ألمانيا',          es: 'Alemania',        pt: 'Alemanha' },
  'Curacao':      { fr: 'Curaçao',         ar: 'كوراساو',          es: 'Curazao',         pt: 'Curaçao' },
  'Ivory Coast':  { fr: "Côte d'Ivoire",   ar: 'ساحل العاج',       es: 'Costa de Marfil', pt: 'Costa do Marfim' },
  'Ecuador':      { fr: 'Équateur',        ar: 'الإكوادور',        es: 'Ecuador',         pt: 'Equador' },
  'Netherlands':  { fr: 'Pays-Bas',        ar: 'هولندا',           es: 'Países Bajos',    pt: 'Países Baixos' },
  'Japan':        { fr: 'Japon',           ar: 'اليابان',          es: 'Japón',           pt: 'Japão' },
  'Sweden':       { fr: 'Suède',           ar: 'السويد',           es: 'Suecia',          pt: 'Suécia' },
  'Tunisia':      { fr: 'Tunisie',         ar: 'تونس',             es: 'Túnez',           pt: 'Tunísia' },
  'Belgium':      { fr: 'Belgique',        ar: 'بلجيكا',           es: 'Bélgica',         pt: 'Bélgica' },
  'Egypt':        { fr: 'Égypte',          ar: 'مصر',              es: 'Egipto',          pt: 'Egito' },
  'Iran':         { fr: 'Iran',            ar: 'إيران',            es: 'Irán',            pt: 'Irã' },
  'New Zealand':  { fr: 'Nouvelle-Zélande',ar: 'نيوزيلندا',        es: 'Nueva Zelanda',   pt: 'Nova Zelândia' },
  'Spain':        { fr: 'Espagne',         ar: 'إسبانيا',          es: 'España',          pt: 'Espanha' },
  'Cape Verde':   { fr: 'Cap-Vert',        ar: 'الرأس الأخضر',     es: 'Cabo Verde',      pt: 'Cabo Verde' },
  'Saudi Arabia': { fr: 'Arabie Saoudite', ar: 'السعودية',         es: 'Arabia Saudí',    pt: 'Arábia Saudita' },
  'Uruguay':      { fr: 'Uruguay',         ar: 'أوروغواي',         es: 'Uruguay',         pt: 'Uruguai' },
  'France':       { fr: 'France',          ar: 'فرنسا',            es: 'Francia',         pt: 'França' },
  'Senegal':      { fr: 'Sénégal',         ar: 'السنغال',          es: 'Senegal',         pt: 'Senegal' },
  'Iraq':         { fr: 'Irak',            ar: 'العراق',           es: 'Irak',            pt: 'Iraque' },
  'Norway':       { fr: 'Norvège',         ar: 'النرويج',          es: 'Noruega',         pt: 'Noruega' },
  'Argentina':    { fr: 'Argentine',       ar: 'الأرجنتين',        es: 'Argentina',       pt: 'Argentina' },
  'Algeria':      { fr: 'Algérie',         ar: 'الجزائر',          es: 'Argelia',         pt: 'Argélia' },
  'Austria':      { fr: 'Autriche',        ar: 'النمسا',           es: 'Austria',         pt: 'Áustria' },
  'Jordan':       { fr: 'Jordanie',        ar: 'الأردن',           es: 'Jordania',        pt: 'Jordânia' },
  'Portugal':     { fr: 'Portugal',        ar: 'البرتغال',         es: 'Portugal',        pt: 'Portugal' },
  'DR Congo':     { fr: 'RD Congo',        ar: 'الكونغو الديمقراطية', es: 'RD Congo',     pt: 'RD Congo' },
  'Uzbekistan':   { fr: 'Ouzbékistan',     ar: 'أوزبكستان',        es: 'Uzbekistán',      pt: 'Uzbequistão' },
  'Colombia':     { fr: 'Colombie',        ar: 'كولومبيا',         es: 'Colombia',        pt: 'Colômbia' },
  'England':      { fr: 'Angleterre',      ar: 'إنجلترا',          es: 'Inglaterra',      pt: 'Inglaterra' },
  'Croatia':      { fr: 'Croatie',         ar: 'كرواتيا',          es: 'Croacia',         pt: 'Croácia' },
  'Ghana':        { fr: 'Ghana',           ar: 'غانا',             es: 'Ghana',           pt: 'Gana' },
  'Panama':       { fr: 'Panama',          ar: 'بنما',             es: 'Panamá',          pt: 'Panamá' },
};

export function teamI18n(name: string): TeamI18n {
  return TEAM_I18N[name] ?? { fr: name, ar: name, es: name, pt: name };
}

// URL slug for a team, e.g. 'Ivory Coast' -> 'ivory-coast' (matches the slug
// component used in match slugs).
export function teamSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export function teamBySlug(slug: string): string | undefined {
  return Object.keys(WC2026_TEAMS).find(n => teamSlug(n) === slug);
}

// All group matches involving a team, in chronological order.
export function teamMatches(name: string): WcMatch[] {
  return WC2026_MATCHES.filter(m => m.home === name || m.away === name);
}

export function teamGroup(name: string): string {
  return teamMatches(name)[0]?.group ?? '';
}

// Other group matches for a given match (same group, excluding itself).
export function groupMatches(slug: string): WcMatch[] {
  const m = getMatch(slug);
  if (!m) return [];
  return WC2026_MATCHES.filter(x => x.group === m.group && x.slug !== slug);
}

// Group matches by matchday, preserving chronological order.
export function matchesByDay(): { date: string; matches: WcMatch[] }[] {
  const out: { date: string; matches: WcMatch[] }[] = [];
  for (const m of WC2026_MATCHES) {
    let b = out.find(d => d.date === m.day);
    if (!b) { b = { date: m.day, matches: [] }; out.push(b); }
    b.matches.push(m);
  }
  return out;
}
