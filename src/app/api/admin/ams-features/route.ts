import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AMSFeatureSchema } from "@/lib/validations";

export async function GET() {
  try {
    const data = await prisma.aMSFeature.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to fetch AMS features" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = AMSFeatureSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ 
        success: false, 
        error: "Validation failed", 
        details: validated.error.flatten().fieldErrors 
      }, { status: 400 });
    }

    const result = await prisma.aMSFeature.create({
      data: validated.data,
    });
    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    console.error("Create AMS feature error:", err);
    return NextResponse.json({ success: false, error: "Failed to create AMS feature" }, { status: 500 });
  }
}
