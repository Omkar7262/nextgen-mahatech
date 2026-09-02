import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.pageContent.findMany({
      orderBy: [
        { page: "asc" },
        { section: "asc" },
        { key: "asc" },
      ],
    });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await prisma.pageContent.create({
      data: {
        page: body.page,
        section: body.section,
        key: body.key,
        value: body.value,
        type: body.type ?? "text",
      },
    });
    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to create content" }, { status: 500 });
  }
}
