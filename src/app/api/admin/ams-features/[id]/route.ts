import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AMSFeatureSchema } from "@/lib/validations";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const body = await request.json();
    const validated = AMSFeatureSchema.partial().safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ 
        success: false, 
        error: "Validation failed", 
        details: validated.error.flatten().fieldErrors 
      }, { status: 400 });
    }

    const result = await prisma.aMSFeature.update({
      where: { id },
      data: validated.data,
    });
    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to update AMS feature" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    await prisma.aMSFeature.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to delete AMS feature" }, { status: 500 });
  }
}
