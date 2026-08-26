// RUNTIME Prisma client used by the Next.js app.
//
// In production, delete this file and let `npx prisma generate` pull types
// from `@prisma/client` (see lib/prisma.ts). This in-memory fallback keeps the
// application buildable and runnable without a live PostgreSQL database so the
// full stack (App Router + API routes + Prisma) can be demonstrated.

import { services, testimonials } from "../seed-data";

export interface PrismaClientOptions {
  log?: Array<"query" | "info" | "warn" | "error">;
  adapter?: unknown;
}

type AnyArgs = Record<string, any>;

class EnquiryQuery {
  private store: any[] = [];
  create(args: AnyArgs): Promise<any> {
    const now = new Date();
    const record = {
      id: `enq_${this.store.length + 1}_${Date.now()}`,
      fullName: String(args.data?.fullName ?? ""),
      company: args.data?.company ?? null,
      email: String(args.data?.email ?? ""),
      phone: args.data?.phone ?? null,
      service: args.data?.service ?? null,
      message: args.data?.message ?? null,
      status: "NEW",
      source: "WEBSITE",
      createdAt: now,
      updatedAt: now,
    };
    this.store.push(record);
    return Promise.resolve(record);
  }
  findMany(args?: { where?: { status?: string }; orderBy?: unknown; take?: number }): Promise<any[]> {
    let rows = this.store;
    if (args?.where?.status) rows = rows.filter((r) => r.status === args.where!.status);
    return Promise.resolve([...rows]);
  }
  update(args: { where: { id: string }; data: { status?: string } }): Promise<any> {
    const found = this.store.find((r) => r.id === args.where.id);
    if (!found) throw new Error(`Enquiry ${args.where.id} not found`);
    if (args.data.status) found.status = args.data.status;
    found.updatedAt = new Date();
    return Promise.resolve(found);
  }
}

class ServiceQuery {
  findMany(args?: { where?: { active?: boolean }; orderBy?: unknown }): Promise<any[]> {
    void args;
    const rows = services
      .map((s) => ({ ...s, tagline: s.tagline ?? null, icon: s.icon ?? null }))
      .sort((a, b) => a.sortOrder - b.sortOrder);
    return Promise.resolve(rows);
  }
}

class TestimonialQuery {
  findMany(args?: { where?: { active?: boolean }; orderBy?: unknown }): Promise<any[]> {
    void args;
    return Promise.resolve(testimonials.map((t) => ({ ...t, active: true })));
  }
}

class PostQuery {
  findMany(): Promise<any[]> {
    return Promise.resolve([]);
  }
}

export class PrismaClient {
  readonly enquiry = new EnquiryQuery();
  readonly service = new ServiceQuery();
  readonly testimonial = new TestimonialQuery();
  readonly post = new PostQuery();

  constructor(options: PrismaClientOptions = {}) {
    if (options.log) void options.log;
  }

  $connect(): Promise<void> {
    return Promise.resolve();
  }
  $disconnect(): Promise<void> {
    return Promise.resolve();
  }
}

export default PrismaClient;
