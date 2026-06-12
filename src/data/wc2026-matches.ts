// Single source of truth for the WC2026 group-stage match pages.
// Consumed by: home MatchLinksGrid, /wc2026 hub, /world-cup-2026-live schedule,
// and sitemap.ts. Keep this list in sync with the per-match page data.
//
// Data = real FIFA final draw (05/12/2025) + official schedule.
// `time` is Paris local time (CEST, UTC+2); "+1" = early-morning the next day.
// `day` is the venue-local matchday (FIFA day), used as the schedule header.
// Flag codes follow flagcdn.com (Scotland = gb-sct).

export interface WcMatch {
  slug: string;
  home: string; hf: string;
  away: string; af: string;
  group: string;
  day: string;        // 'Thursday June 11' — schedule grouping header
  dayShort: string;   // 'Thu 11 Jun' — compact grid label
  time: string;       // Paris time, e.g. '21:00' or '04:00+1'
  venue: string;      // full, e.g. 'MetLife Stadium, New Jersey'
  venueShort: string; // 'MetLife Stadium, NY'
}

export const WC2026_MATCHES: WcMatch[] = [
  { slug: 'mexico-vs-south-africa-2026', home: 'Mexico', hf: 'mx', away: 'South Africa', af: 'za', group: 'A', day: 'Thursday June 11', dayShort: 'Thu 11 Jun', time: '21:00',    venue: 'Estadio Azteca, Mexico City',          venueShort: 'Estadio Azteca, MX' },
  { slug: 'korea-vs-czechia-2026',       home: 'Korea',  hf: 'kr', away: 'Czechia',      af: 'cz', group: 'A', day: 'Thursday June 11', dayShort: 'Thu 11 Jun', time: '04:00+1',  venue: 'Estadio Akron, Guadalajara',           venueShort: 'Estadio Akron, GDL' },
  { slug: 'canada-vs-bosnia-2026',       home: 'Canada', hf: 'ca', away: 'Bosnia',       af: 'ba', group: 'B', day: 'Friday June 12',   dayShort: 'Fri 12 Jun', time: '21:00',    venue: 'BMO Field, Toronto',                   venueShort: 'BMO Field, Toronto' },
  { slug: 'usa-vs-paraguay-2026',        home: 'USA',    hf: 'us', away: 'Paraguay',     af: 'py', group: 'D', day: 'Friday June 12',   dayShort: 'Fri 12 Jun', time: '03:00+1',  venue: 'SoFi Stadium, Los Angeles',            venueShort: 'SoFi Stadium, LA' },
  { slug: 'qatar-vs-switzerland-2026',   home: 'Qatar',  hf: 'qa', away: 'Switzerland',  af: 'ch', group: 'B', day: 'Saturday June 13', dayShort: 'Sat 13 Jun', time: '21:00',    venue: "Levi's Stadium, Santa Clara",          venueShort: "Levi's Stadium, SF" },
  { slug: 'brazil-vs-morocco-2026',      home: 'Brazil', hf: 'br', away: 'Morocco',      af: 'ma', group: 'C', day: 'Saturday June 13', dayShort: 'Sat 13 Jun', time: '00:00+1',  venue: 'MetLife Stadium, New Jersey',          venueShort: 'MetLife Stadium, NY' },
  { slug: 'haiti-vs-scotland-2026',      home: 'Haiti',  hf: 'ht', away: 'Scotland',     af: 'gb-sct', group: 'C', day: 'Saturday June 13', dayShort: 'Sat 13 Jun', time: '03:00+1', venue: 'Gillette Stadium, Boston',          venueShort: 'Gillette Stadium, Boston' },
  { slug: 'australia-vs-turkiye-2026',   home: 'Australia', hf: 'au', away: 'Türkiye',   af: 'tr', group: 'D', day: 'Saturday June 13', dayShort: 'Sat 13 Jun', time: '06:00+1',  venue: 'BC Place, Vancouver',               venueShort: 'BC Place, Vancouver' },
  { slug: 'germany-vs-curacao-2026',     home: 'Germany', hf: 'de', away: 'Curaçao',     af: 'cw', group: 'E', day: 'Sunday June 14',   dayShort: 'Sun 14 Jun', time: '19:00',    venue: 'NRG Stadium, Houston',                 venueShort: 'NRG Stadium, Houston' },
  { slug: 'netherlands-vs-japan-2026',   home: 'Netherlands', hf: 'nl', away: 'Japan',   af: 'jp', group: 'F', day: 'Sunday June 14',   dayShort: 'Sun 14 Jun', time: '22:00',    venue: 'AT&T Stadium, Dallas',              venueShort: 'AT&T Stadium, Dallas' },
  { slug: 'ivory-coast-vs-ecuador-2026', home: 'Ivory Coast', hf: 'ci', away: 'Ecuador', af: 'ec', group: 'E', day: 'Sunday June 14',   dayShort: 'Sun 14 Jun', time: '01:00+1',  venue: 'Lincoln Financial Field, Philadelphia', venueShort: 'Lincoln Financial Field, Philadelphia' },
  { slug: 'sweden-vs-tunisia-2026',      home: 'Sweden', hf: 'se', away: 'Tunisia',      af: 'tn', group: 'F', day: 'Sunday June 14',   dayShort: 'Sun 14 Jun', time: '04:00+1',  venue: 'Estadio BBVA, Monterrey',              venueShort: 'Estadio BBVA, Monterrey' },
];

// Group matches by matchday, preserving chronological order.
export function matchesByDay(): { date: string; matches: WcMatch[] }[] {
  const out: { date: string; matches: WcMatch[] }[] = [];
  for (const m of WC2026_MATCHES) {
    let bucket = out.find(d => d.date === m.day);
    if (!bucket) { bucket = { date: m.day, matches: [] }; out.push(bucket); }
    bucket.matches.push(m);
  }
  return out;
}
