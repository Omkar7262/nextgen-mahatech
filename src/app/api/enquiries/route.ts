import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await prisma.enquiry.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        company: body.company,
        phone: body.phone,
        service: body.service,
        message: body.message,
      },
    });

    return NextResponse.json({ success: true, data: result, error: null });
  } catch (err) {
    console.error("Create enquiry error:", err);
    return NextResponse.json({ success: false, data: null, error: "Failed to submit enquiry" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data, error: null });
  } catch (err) {
    return NextResponse.json({ success: false, data: [], error: "Failed to fetch enquiries" }, { status: 500 });
  }
}
