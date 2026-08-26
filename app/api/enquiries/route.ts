// Next.js App Router ROUTE HANDLER
// POST /api/enquiries — create an enquiry from the contact form.
// GET  /api/enquiries — list enquiries (admin).

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../lib/prisma";

export const dynamic = "force-dynamic";

const enquirySchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  service: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: parsed.error.issues[0]?.message ?? "Invalid payload",
      },
      { status: 422 }
    );
  }

  try {
    const d = parsed.data;
    const enquiry = await prisma.enquiry.create({
      data: {
        fullName: d.fullName,
        company: d.company ? d.company : null,
        email: d.email.toLowerCase().trim(),
        phone: d.phone ? d.phone : null,
        service: d.service ? d.service : null,
        message: d.message ? d.message : null,
      },
    });
    return NextResponse.json({ success: true, data: enquiry, error: null });
  } catch {
    return NextResponse.json(
      { success: false, data: null, error: "Could not save your enquiry. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    });
    return NextResponse.json({ success: true, data: enquiries, error: null });
  } catch {
    return NextResponse.json({ success: false, data: [], error: "Unavailable" });
  }
}
