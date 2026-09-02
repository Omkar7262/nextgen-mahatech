import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcryptjs";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log(`Login attempt for username: ${username}`);

    const adminUser = await prisma.admin.findUnique({
      where: { username },
    });

    if (!adminUser) {
      console.log(`User not found: ${username}`);
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, adminUser.password);
    console.log(`Password match: ${passwordMatch}`);

    if (!passwordMatch) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const session = await encrypt({ userId: adminUser.id, username: adminUser.username, expires });

    (await cookies()).set("session", session, { expires, httpOnly: true, path: "/" });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
