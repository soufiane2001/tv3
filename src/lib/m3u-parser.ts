import type { M3UEntry } from '@/types';

function extractAttribute(line: string, attr: string): string {
  const regex = new RegExp(`${attr}="([^"]*)"`, 'i');
  const match = line.match(regex);
  return match ? match[1].trim() : '';
}

function extractName(line: string): string {
  const commaIdx = line.lastIndexOf(',');
  return commaIdx !== -1 ? line.slice(commaIdx + 1).trim() : '';
}

/**
 * Converts bare Xtream-Codes live stream URLs to HLS format.
 * e.g. http://server/live/user/pass/12345  →  http://server/live/user/pass/12345.m3u8
 * Leaves URLs that already have an extension (or query-string format) untouched.
 */
function toHlsUrl(url: string): string {
  // Already HLS or has recognisable extension
  if (/\.(m3u8|ts|mp4|mkv|avi|flv)(\?.*)?$/i.test(url)) return url;
  // Xtream Codes bare live path — append .m3u8 so server returns HLS playlist
  if (/\/live\/[^/]+\/[^/]+\/\d+$/.test(url) || /\/[^/]+\/[^/]+\/\d+$/.test(url)) {
    return url + '.m3u8';
  }
  return url;
}

export function parseM3U(content: string): M3UEntry[] {
  const lines = content.split('\n').map((l) => l.trim()).filter(Boolean);
  const entries: M3UEntry[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.startsWith('#EXTINF')) continue;

    const nextLine = lines[i + 1];
    if (!nextLine || nextLine.startsWith('#')) continue;

    const rawUrl = nextLine.trim();
    if (!rawUrl.startsWith('http')) continue;

    const streamUrl = toHlsUrl(rawUrl);

    const entry: M3UEntry = {
      name: extractName(line) || extractAttribute(line, 'tvg-name') || 'Unknown',
      logo: extractAttribute(line, 'tvg-logo'),
      groupTitle: extractAttribute(line, 'group-title') || 'General',
      tvgId: extractAttribute(line, 'tvg-id'),
      tvgName: extractAttribute(line, 'tvg-name'),
      streamUrl,
    };

    if (entry.name && entry.streamUrl) {
      entries.push(entry);
    }
    i++;
  }

  return entries;
}

export async function fetchM3U(url: string): Promise<M3UEntry[]> {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 IPTV-Client/1.0' },
    signal: AbortSignal.timeout(30000),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch M3U: ${response.status} ${response.statusText}`);
  }

  const content = await response.text();
  return parseM3U(content);
}
