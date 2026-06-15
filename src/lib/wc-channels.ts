import { prisma } from './prisma';

// Single multi-viewer relay (Oracle Cloud → HLS at stream.sportalive.live).
// goattv allows only ONE connection (max_connections=1), so the relay can carry
// just ONE channel at a time. The admin picks WHICH goattv channel it broadcasts
// (beIN MAX 1 = 299, beIN MAX 2 = 301) via the `relayChannel` setting; the
// Oracle box polls /api/relay-channel every ~15s and switches ffmpeg's source.
// The output URL never changes, so the site keeps playing across a switch.
// See restream/ for the deploy kit and project-restream-relay memory.
const RELAY_URL = 'https://stream.sportalive.live/hls/bein-max-1.m3u8';
const RELAY_SLUG = 'bein-max-1'; // stable DB slug + matches the HLS filename

export const RELAY_CHANNEL_KEY = 'relayChannel';

// The goattv channels the single relay can broadcast (admin chooses ONE — they
// can't run at once, goattv is max_connections=1). channel = goattv stream id.
export const RELAY_OPTIONS = [
  { slug: 'bein-max-1', channel: 299, name: 'beIN SPORTS MAX 1', label: 'beIN MAX 1',  sublabel: 'beIN · MAX 1 · FHD' },
  { slug: 'bein-max-2', channel: 301, name: 'beIN SPORTS MAX 2', label: 'beIN MAX 2',  sublabel: 'beIN · MAX 2 · FHD' },
  { slug: 'thmanyah-1', channel: 65,  name: 'THMANYAH 1',        label: 'THMANYAH 1',  sublabel: 'الثمانية 1 · FHD' },
  { slug: 'thmanyah-2', channel: 67,  name: 'THMANYAH 2',        label: 'THMANYAH 2',  sublabel: 'الثمانية 2 · FHD' },
  { slug: 'dazn-mundial', channel: 238, name: 'DAZN Mundial ES', label: 'DAZN Mundial', sublabel: 'DAZN · Mundial ES · FHD' },
] as const;

// Extra selectable sources, picked from the SAME admin list as the relay
// options. An HTTPS .m3u8 plays DIRECTLY in each viewer's browser (multi-viewer
// at the origin, no goattv relay box — see VideoPlayer isDirectHls). An HTTP
// source can't play directly on our HTTPS site (mixed content), so VideoPlayer
// auto-routes it through /api/stream (proxy, uses Vercel bandwidth).
export const DIRECT_SOURCES = [
  { slug: 'ard-1', name: 'ARD', label: 'ARD', sublabel: 'ARD · DE · HD', streamUrl: 'https://s6.hopslan.com/ardX/tracks-v1a1/mono.m3u8' },
  { slug: 'as1-hd', name: 'AS1 HD', label: 'AS1 HD', sublabel: 'AS1 · HD', streamUrl: 'https://nl1.nghk.ai/AS1HRHD/index.m3u8' },
  // HRT2 (Croatia) — use the HLS variant; the player can't play the .mpd (DASH).
  { slug: 'hrt-2', name: 'HRT 2', label: 'HRT 2', sublabel: 'HRT 2 · HR · HD', streamUrl: 'https://bpcdnmanprod.nexttv.ht.hr/bpk-tv/HRT2/default/index.m3u8' },
  // ČT Sport (Czech) — HTTP origin → served via the /api/stream proxy.
  { slug: 'ct-sport', name: 'ČT Sport', label: 'ČT Sport', sublabel: 'ČT Sport · CZ · HD', streamUrl: 'http://88.212.15.19/live/test_ctsport_25p/playlist.m3u8' },
] as const;

export function relayOption(slug?: string | null) {
  return RELAY_OPTIONS.find(o => o.slug === slug) ?? RELAY_OPTIONS[0];
}

export function directSource(slug?: string | null) {
  return DIRECT_SOURCES.find(o => o.slug === slug) ?? null;
}

// The full list the admin picker shows — relay (goattv via Oracle box) AND
// direct sources, in one list. The admin selects ONE; that's what viewers see.
export const SOURCE_OPTIONS = [
  ...RELAY_OPTIONS.map(o => ({ slug: o.slug, label: o.label, sublabel: o.sublabel, kind: 'relay'  as const })),
  ...DIRECT_SOURCES.map(o => ({ slug: o.slug, label: o.label, sublabel: o.sublabel, kind: 'direct' as const })),
];

export function isValidSourceSlug(slug?: string | null) {
  return SOURCE_OPTIONS.some(o => o.slug === slug);
}

export interface WcServer { slug: string; label: string; sublabel: string; channel: any }

// Back-compat exports (the legacy /api/admin/main-server route still imports
// these). The site now shows the single relay, so the "main server" notion is a
// no-op, but keeping the exports avoids breaking that route.
export const MAIN_SERVER_KEY = 'mainServer';
export const WC_SERVER_LINEUP = RELAY_OPTIONS.map(({ slug, label, sublabel }) => ({ slug, label, sublabel }));

// Memoise the channel rows (one upsert each) for 5 min so prerendering many
// pages doesn't hammer the DB. The selected channel is read fresh every call so
// an admin switch shows the right label immediately (after ISR revalidation).
let _channel: any = null;
let _direct: Record<string, any> = {};
let _ts = 0;
const TTL = 5 * 60_000;

export async function getWcExtraChannels(): Promise<WcServer[]> {
  const sel = await prisma.setting.findUnique({ where: { key: RELAY_CHANNEL_KEY } }).catch(() => null);
  const slug = sel?.value;
  const direct = directSource(slug); // non-null when the admin picked a direct source

  if (!_channel || Date.now() - _ts > TTL) {
    _channel = await prisma.channel.upsert({
      where:  { slug: RELAY_SLUG },
      update: { streamUrl: RELAY_URL, isActive: true },
      create: { slug: RELAY_SLUG, name: 'beIN MAX (relay)', streamUrl: RELAY_URL, groupTitle: 'Sports', isActive: true, order: 999 },
    }).catch(() => null);
    // Direct multi-viewer sources (ARD…) — own channel rows so the player gets a
    // real id (analytics + VLC fallback) while playing the .m3u8 directly.
    const d: Record<string, any> = {};
    for (const s of DIRECT_SOURCES) {
      d[s.slug] = await prisma.channel.upsert({
        where:  { slug: s.slug },
        update: { streamUrl: s.streamUrl, isActive: true },
        create: { slug: s.slug, name: s.name, streamUrl: s.streamUrl, groupTitle: 'Sports', isActive: true, order: 998 },
      }).catch(() => null);
    }
    _direct = d;
    _ts = Date.now();
  }

  // Admin picked a direct source (e.g. ARD): viewers play its .m3u8 directly.
  if (direct) {
    const ch = _direct[direct.slug];
    if (ch) return [{ slug: direct.slug, label: direct.label, sublabel: direct.sublabel, channel: { ...ch, name: direct.name } }];
  }

  // Otherwise show the goattv relay, labelled by the selected relay option.
  if (!_channel) return [];
  const opt = relayOption(slug);
  const channel = { ..._channel, name: opt.name };
  return [{ slug: RELAY_SLUG, label: opt.label, sublabel: opt.sublabel, channel }];
}
