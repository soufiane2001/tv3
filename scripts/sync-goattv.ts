/* Add the goattv playlist as a source and import all its channels.
   Run: npx tsx scripts/sync-goattv.ts */
import { readFileSync } from 'fs';
for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
  const m = line.match(/^\s*([\w.]+)\s*=\s*"?([^"]*)"?\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

const URL = 'http://goattv.store:80/playlist/6MQDXbURQj/VVdSS4UxyV/m3u_plus';

(async () => {
  const { prisma } = await import('../src/lib/prisma');
  const { syncM3U } = await import('../src/lib/sync');

  await prisma.source.upsert({
    where:  { url: URL },
    update: { isActive: true },
    create: { name: 'goattv', url: URL },
  });
  console.log('source goattv ajoutée — sync en cours...');

  const res = await syncM3U();
  console.log('SYNC:', JSON.stringify(res, null, 1));
  const total = await prisma.channel.count();
  console.log('channels total après sync:', total);
  await prisma.$disconnect();
})().catch(e => { console.error('ERR', e); process.exit(1); });
