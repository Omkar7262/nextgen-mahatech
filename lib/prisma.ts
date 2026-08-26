// Next.js App Router singleton for the Prisma client.
//
// It prefers the real generated `@prisma/client` when available. In preview
// environments where `npx prisma generate` has not run / there is no live
// PostgreSQL database, it falls back to an in-memory implementation that
// mirrors the PrismaClient API surface so the app remains fully functional.

import { PrismaClient } from "./prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
