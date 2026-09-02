import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename with .webp extension
    const filename = `${uuidv4()}.webp`;
    const uploadDir = join(process.cwd(), "public/uploads");
    const path = join(uploadDir, filename);

    // Ensure uploads directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // Ignore if directory already exists
    }

    // Convert to webp using sharp
    await sharp(buffer)
      .webp({ quality: 80 })
      .toFile(path);

    const url = `/uploads/${filename}`;

    return NextResponse.json({ success: true, url });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ success: false, error: "Upload and conversion failed" }, { status: 500 });
  }
}
