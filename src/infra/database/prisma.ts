import { PrismaClient } from "../../../prisma/generated/prisma/client";

export const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL as string,
  log: ["info"],
});
