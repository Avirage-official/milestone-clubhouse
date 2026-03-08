/**
 * Singleton Prisma client with DB_ENABLED guard.
 *
 * When NEXT_PUBLIC_DB_ENABLED !== "true" every property access on `prisma`
 * logs a warning and returns a no-op stub so the app can run without a
 * database connection.
 *
 * NOTE: We use `any` for the PrismaClient type because the generated Prisma 7
 * types require TypeScript ≥5.0 (`const` type parameters) while this project
 * currently targets TypeScript 4.x. At runtime the real PrismaClient is loaded
 * dynamically so all queries work correctly when DB_ENABLED is true.
 */

export const DB_ENABLED =
  process.env.NEXT_PUBLIC_DB_ENABLED === 'true';

/** Loose type alias – keeps call-sites readable without pulling in generated types. */
export type PrismaClientInstance = any;

/* ---------- real singleton (created only when DB is enabled) ---------- */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientInstance | undefined;
};

function createRealClient(): PrismaClientInstance {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  // Dynamic require so the generated module is never parsed by tsc at build
  // time — avoids TS 4.x errors from Prisma 7's const type-parameter syntax.
  const { PrismaClient } = require('../generated/prisma'); // eslint-disable-line
  const client = new PrismaClient();
  globalForPrisma.prisma = client;
  return client;
}

/* ---------- mock client (used when DB is disabled) ---------- */

const noopHandler: ProxyHandler<object> = {
  get(_target, prop) {
    // Allow basic JS introspection without throwing
    if (typeof prop === 'symbol' || prop === 'then') return undefined;

    // Return a function that logs and resolves to null for any model method
    return new Proxy(() => {}, {
      apply(_fn, _thisArg, args) {
        console.log(
          `[dbClient] DB is disabled – stubbed call: prisma.${String(prop)}(`,
          ...args,
          ')',
        );
        return Promise.resolve(null);
      },
      get(_fn, subProp) {
        if (typeof subProp === 'symbol' || subProp === 'then')
          return undefined;
        // Support chained calls like prisma.user.findUnique(...)
        return (...args: unknown[]) => {
          console.log(
            `[dbClient] DB is disabled – stubbed call: prisma.${String(prop)}.${String(subProp)}(`,
            ...args,
            ')',
          );
          return Promise.resolve(null);
        };
      },
    });
  },
};

const mockClient = new Proxy({} as PrismaClientInstance, noopHandler);

/* ---------- export ---------- */

export const prisma: PrismaClientInstance = DB_ENABLED
  ? createRealClient()
  : mockClient;
