import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.portfolio.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to fetch portfolio" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await prisma.portfolio.create({
      data: {
        title: body.title,
        client: body.client,
        category: body.category,
        description: body.description,
        image: body.image,
        content: body.content,
        sortOrder: body.sortOrder ?? 0,
        active: body.active ?? true,
      },
    });
    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to create portfolio item" }, { status: 500 });
  }
}
