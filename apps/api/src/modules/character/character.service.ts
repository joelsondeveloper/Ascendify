import { prisma } from "../../lib/prisma.js";

const MAX_LEVEL = 100;

export function xpForNextLevel(level: number): number {
  return Math.round(50 * Math.pow(level, 1.5));
}

export async function addXp(characterId: string, xpGained: number) {
  const character = await prisma.character.findUniqueOrThrow({
    where: { id: characterId },
  });

  let { level, currentXp, totalXp } = character;

  if (level >= MAX_LEVEL) {
    totalXp += xpGained;
  } else {
    currentXp += xpGained;
    totalXp += xpGained;

    while (level < MAX_LEVEL && currentXp >= xpForNextLevel(level)) {
      currentXp -= xpForNextLevel(level);
      level += 1;
    }
  }

  return prisma.character.update({
    where: { id: characterId },
    data: { level, currentXp, totalXp },
  });
}

export async function addCoins(characterId: string, amount: number) {
  return prisma.character.update({
    where: { id: characterId },
    data: { coins: { increment: amount } },
  });
}