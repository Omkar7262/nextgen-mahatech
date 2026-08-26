// Next.js App Router ROUTE HANDLER
// GET /api/testimonials — public list of active testimonials.

import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { active: true },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ success: true, data: testimonials, error: null });
  } catch {
    const { testimonials: seed } = await import("@/lib/seed-data");
    return NextResponse.json({ success: true, data: seed, error: null });
  }
}
