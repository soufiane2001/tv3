/**
 * Point existing DB channels at the goattv .ts stream when their name matches a
 * channel in the goattv playlist. Matching is by normalised name (quality tags
 * FHD/HD/SD and accents ignored; best quality preferred).
 *
 * Dry run (default): npx tsx scripts/goattv-sync.ts
 * Apply:             npx tsx scripts/goattv-sync.ts --apply
 */
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';

// Load DATABASE_URL from .env.local (tsx doesn't auto-load it).
try {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = line.match(/^\s*([\w.]+)\s*=\s*"?([^"]*)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch { /* ignore */ }

const prisma = new PrismaClient();
const PLAYLIST = 'http://goattv.store:80/playlist/6MQDXbURQj/VVdSS4UxyV/m3u_plus';
const APPLY = process.argv.includes('--apply');

// Normalise a channel name for matching: lowercase, strip accents + quality
// tags, keep alphanumerics and '+', collapse whitespace.
function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\b(fhd|uhd|hd|sd|4k|hq|tnt)\b/g, ' ')
    .replace(/[^a-z0-9+ ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
const rank = (name: string) =>
  /\bfhd\b/i.test(name) ? 3 : /\b(uhd|4k)\b/i.test(name) ? 4 : /\bhd\b/i.test(name) ? 2 : 1;

async function main() {
  const text = await fetch(PLAYLIST, { headers: { 'User-Agent': 'VLC/3.0.21' } }).then(r => r.text());
  const lines = text.split('\n');

  // normalised name -> best-quality goattv entry
  const g = new Map<string, { name: string; url: string; rank: number }>();
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (!l.startsWith('#EXTINF')) continue;
    const name = l.slice(l.lastIndexOf(',') + 1).trim();
    const url = (lines[i + 1] || '').trim();
    if (!url || url.startsWith('#')) continue;
    const key = norm(name);
    if (!key) continue;
    const prev = g.get(key);
    if (!prev || rank(name) > prev.rank) g.set(key, { name, url, rank: rank(name) });
  }
  console.log(`goattv playlist: ${g.size} noms normalisés uniques`);

  const channels = await prisma.channel.findMany({
    select: { id: true, name: true, slug: true, streamUrl: true },
  });
  console.log(`DB: ${channels.length} chaînes\n`);

  const updates = channels
    .map(ch => ({ ch, match: g.get(norm(ch.name)) }))
    .filter((x): x is { ch: typeof channels[number]; match: NonNullable<ReturnType<typeof g.get>> } =>
      !!x.match && x.ch.streamUrl !== x.match.url);

  console.log(`${updates.length} chaînes à pointer vers goattv :`);
  for (const { ch, match } of updates) {
    console.log(`  "${ch.name}"  →  ${match.name}  (${match.url.split('/').pop()})`);
  }

  if (APPLY) {
    let n = 0;
    for (const { ch, match } of updates) {
      await prisma.channel.update({ where: { id: ch.id }, data: { streamUrl: match.url, isActive: true } });
      n++;
    }
    console.log(`\n✅ APPLIQUÉ : ${n} chaînes mises à jour.`);
  } else {
    console.log(`\n(DRY RUN — relance avec --apply pour écrire en base.)`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
