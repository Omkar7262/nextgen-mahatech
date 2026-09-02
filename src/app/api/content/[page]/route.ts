import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    const page = (await params).page;
    const results = await prisma.pageContent.findMany({
      where: { page },
    });
    
    const content: Record<string, any> = {};
    results.forEach(item => {
      if (!content[item.section]) content[item.section] = {};
      content[item.section][item.key] = item.value;
    });
    
    return NextResponse.json({ success: true, data: content });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to fetch page content" }, { status: 500 });
  }
}
