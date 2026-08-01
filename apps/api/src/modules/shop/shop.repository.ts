import { prisma } from "../../lib/prisma.js";

export function findGlobalCosmetics() {
  return prisma.shopItem.findMany({
    where: { characterId: null, isArchived: false },
  });
}

export function findRealLifeRewardsByCharacter(characterId: string) {
  return prisma.shopItem.findMany({
    where: { characterId, isArchived: false },
  });
}

export function findShopItemById(id: string) {
  return prisma.shopItem.findUnique({ where: { id } });
}

export function countRealLifeRewards(characterId: string) {
  return prisma.shopItem.count({
    where: { characterId, isArchived: false },
  });
}

export function createRealLifeReward(data: {
  characterId: string;
  title: string;
  description?: string | undefined;
  basePrice: number;
}) {
  return prisma.shopItem.create({
    data: {
      characterId: data.characterId,
      type: "REAL_LIFE",
      title: data.title,
      description: data.description ?? null,
      basePrice: data.basePrice,
    },
  });
}

export function countRedemptionsInWindow(shopItemId: string, since: Date) {
  return prisma.rewardRedemption.count({
    where: { shopItemId, redeemedAt: { gte: since } },
  });
}

export function createRedemption(data: {
  shopItemId: string;
  characterId: string;
  pricePaid: number;
}) {
  return prisma.rewardRedemption.create({ data });
}

export function findOwnedPermanent(characterId: string, shopItemId: string) {
  return prisma.rewardRedemption.findFirst({
    where: { characterId, shopItemId },
  });
}

export function upsertInventoryQuantity(
  characterId: string,
  shopItemId: string,
  delta: number
) {
  return prisma.characterInventoryItem.upsert({
    where: { characterId_shopItemId: { characterId, shopItemId } },
    create: { characterId, shopItemId, quantity: Math.max(delta, 0) },
    update: { quantity: { increment: delta } },
  });
}

export function findInventoryItem(characterId: string, shopItemId: string) {
  return prisma.characterInventoryItem.findUnique({
    where: { characterId_shopItemId: { characterId, shopItemId } },
  });
}

export async function findOwnedPermanentIds(characterId: string) {
  const redemptions = await prisma.rewardRedemption.findMany({
    where: { characterId },
    select: { shopItemId: true },
  });
  return new Set(redemptions.map((r) => r.shopItemId));
}

export async function findInventoryQuantities(characterId: string) {
  const items = await prisma.characterInventoryItem.findMany({
    where: { characterId },
  });
  return new Map(items.map((i) => [i.shopItemId, i.quantity]));
}