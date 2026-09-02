import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await prisma.service.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ success: true, data, error: null });
  } catch (err) {
    console.error("Fetch services error:", err);
    try {
        const { services: seed } = await import("@/lib/seed-data");
        return NextResponse.json({ success: true, data: seed, error: null });
    } catch (e) {
        return NextResponse.json({ success: false, data: [], error: "Failed to fetch services" }, { status: 500 });
    }
  }
}
