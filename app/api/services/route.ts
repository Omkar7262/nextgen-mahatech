// Next.js App Router ROUTE HANDLER
// GET /api/services — public list of active services.

import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ success: true, data: services, error: null });
  } catch (err) {
    // In the no-DB preview, fall back to curated seed content.
    const { services: seed } = await import("@/lib/seed-data");
    return NextResponse.json({ success: true, data: seed, error: null });
  }
}
