// Next.js App Router ROUTE HANDLER
// PATCH /api/enquiries/:id — update enquiry status (admin).

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../lib/prisma";

const statusSchema = z.enum(["NEW", "CONTACTED", "CLOSED"]);

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json().catch(() => null);
  const parsed = statusSchema.safeParse(body?.status);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, data: null, error: "Invalid status. Use NEW, CONTACTED or CLOSED." },
      { status: 422 }
    );
  }

  let result;
  try {
    result = await prisma.enquiry.update({
      where: { id },
      data: { status: parsed.data },
    });
  } catch (e) {
    result = e instanceof Error ? { error: e.message } : null;
    return NextResponse.json(
      { success: false, data: null, error: "Enquiry not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: result, error: null });
}
