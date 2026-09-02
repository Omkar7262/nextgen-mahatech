import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function reset() {
  const username = "admin";
  const password = "admin123";
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(`Resetting password for ${username}...`);
  
  await prisma.admin.upsert({
    where: { username },
    update: { password: hashedPassword },
    create: { username, password: hashedPassword },
  });

  console.log("Password reset successfully!");
  console.log(`Username: ${username}`);
  console.log(`Password: ${password}`);
}

reset()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
