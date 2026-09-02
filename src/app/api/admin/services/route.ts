import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.service.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to fetch services" }, { status: 500 });
  }
}

import { ServiceSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = ServiceSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ 
        success: false, 
        error: "Validation failed", 
        details: validated.error.flatten().fieldErrors 
      }, { status: 400 });
    }

    const result = await prisma.service.create({
      data: validated.data,
    });
    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    console.error("Create service error:", err);
    return NextResponse.json({ success: false, error: "Failed to create service" }, { status: 500 });
  }
}
