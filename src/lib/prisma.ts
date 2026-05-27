import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
}

// Lazy proxy — PrismaClient is only instantiated on first actual DB call,
// not at module import time (which would break Vercel builds without DATABASE_URL).
const handler: ProxyHandler<object> = {
  get(_, prop: string) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = createClient();
    }
    const val = (globalForPrisma.prisma as any)[prop];
    return typeof val === 'function' ? val.bind(globalForPrisma.prisma) : val;
  },
};

export const prisma = new Proxy({}, handler) as PrismaClient;
