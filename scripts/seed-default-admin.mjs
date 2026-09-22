import { PrismaClient } from "@prisma/client";
import { randomBytes, scrypt as scryptCallback } from "crypto";
import { promisify } from "util";

const prisma = new PrismaClient();
const scrypt = promisify(scryptCallback);
const username = "alohaadmin";
const password = "aloha2026";
const salt = randomBytes(16).toString("hex");
const derived = await scrypt(password, salt, 64);
const passwordHash = `scrypt$${salt}$${Buffer.from(derived).toString("hex")}`;

await prisma.user.upsert({
  where: { username },
  update: { name: "Aloha Administrator", passwordHash, role: "ADMIN", active: true },
  create: { username, name: "Aloha Administrator", passwordHash, role: "ADMIN", active: true },
});
await prisma.$disconnect();
