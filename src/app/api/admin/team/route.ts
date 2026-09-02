import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.teamMember.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to fetch team members" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await prisma.teamMember.create({
      data: {
        name: body.name,
        role: body.role,
        image: body.image,
        bio: body.bio,
        sortOrder: body.sortOrder ?? 0,
        active: body.active ?? true,
      },
    });
    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to create team member" }, { status: 500 });
  }
}
