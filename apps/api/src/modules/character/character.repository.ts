import { prisma } from "../../lib/prisma.js";

export function findCharacterByUserId(userId: string) {
  return prisma.character.findUnique({
    where: { userId },
  });
}