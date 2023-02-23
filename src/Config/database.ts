import pkg from "@prisma/client";

const { PrismaClient } = pkg;
export let prisma = new PrismaClient()

export async function disconnectDB(): Promise<void> {
    await prisma?.$disconnect();
  }

