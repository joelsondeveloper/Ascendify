import {
  findGlobalCosmetics,
  findRealLifeRewardsByCharacter,
  findShopItemById,
  countRealLifeRewards,
  createRealLifeReward,
  countRedemptionsInWindow,
  createRedemption,
  findOwnedPermanent,
  upsertInventoryQuantity,
  findInventoryItem,
  findOwnedPermanentIds,
  findInventoryQuantities,
} from "./shop.repository.js";
import { prisma } from "../../lib/prisma.js";
import { applyStreakFreeze } from "../habit/habit.service.js";

const INFLATION_RATE = 0.15;
const WINDOW_DAYS = 7;
const MAX_REAL_LIFE_REWARDS = 20;

export async function getShopCatalog(characterId: string) {
  const [cosmetics, realLifeRewards, ownedIds, quantities] = await Promise.all([
    findGlobalCosmetics(),
    findRealLifeRewardsByCharacter(characterId),
    findOwnedPermanentIds(characterId),
    findInventoryQuantities(characterId),
  ]);

  const cosmeticsWithOwnership = cosmetics.map((item) => ({
    ...item,
    owned: item.cosmeticKind === "PERMANENT" ? ownedIds.has(item.id) : undefined,
    quantity: item.cosmeticKind === "CONSUMABLE" ? quantities.get(item.id) ?? 0 : undefined,
  }));

  const realLifeWithPrice = await Promise.all(
    realLifeRewards.map(async (item) => ({
      ...item,
      currentPrice: await calculateCurrentPrice(item.id, item.basePrice),
    }))
  );

  return { cosmetics: cosmeticsWithOwnership, realLifeRewards: realLifeWithPrice };
}

async function calculateCurrentPrice(shopItemId: string, basePrice: number) {
  const since = new Date(Date.now() - WINDOW_DAYS * 24 * 60 * 60 * 1000);
  const count = await countRedemptionsInWindow(shopItemId, since);
  return Math.round(basePrice * (1 + INFLATION_RATE * count));
}

export async function createNewRealLifeReward(
  characterId: string,
  data: { title: string; description?: string; basePrice: number }
) {
  const count = await countRealLifeRewards(characterId);
  if (count >= MAX_REAL_LIFE_REWARDS) {
    throw new Error("MAX_REWARDS_REACHED");
  }

  return createRealLifeReward({
    characterId,
    title: data.title,
    description: data.description,
    basePrice: data.basePrice,
  });
}

export async function redeemItem(shopItemId: string, characterId: string) {
  const item = await findShopItemById(shopItemId);
  if (!item) {
    throw new Error("ITEM_NOT_FOUND");
  }

  if (item.type === "COSMETIC" && item.cosmeticKind === "PERMANENT") {
    const owned = await findOwnedPermanent(characterId, shopItemId);
    if (owned) {
      throw new Error("ALREADY_OWNED");
    }
  }

  const price =
    item.type === "REAL_LIFE"
      ? await calculateCurrentPrice(shopItemId, item.basePrice)
      : item.basePrice;

  const character = await prisma.character.findUniqueOrThrow({
    where: { id: characterId },
  });

  if (character.coins < price) {
    throw new Error("INSUFFICIENT_COINS");
  }

  await prisma.character.update({
    where: { id: characterId },
    data: { coins: { decrement: price } },
  });

  await createRedemption({ shopItemId, characterId, pricePaid: price });

  if (item.type === "COSMETIC" && item.cosmeticKind === "CONSUMABLE") {
    await upsertInventoryQuantity(characterId, shopItemId, 1);
  }

  return { item, pricePaid: price };
}

export async function equipTitle(shopItemId: string, characterId: string) {
  const item = await findShopItemById(shopItemId);
  if (!item || item.cosmeticKind !== "PERMANENT") {
    throw new Error("ITEM_NOT_FOUND");
  }

  const owned = await findOwnedPermanent(characterId, shopItemId);
  if (!owned) {
    throw new Error("NOT_OWNED");
  }

  return prisma.character.update({
    where: { id: characterId },
    data: { title: item.effectValue },
  });
}

export async function useConsumable(shopItemId: string, characterId: string, habitId?: string) {
  const item = await findShopItemById(shopItemId);
  if (!item || item.cosmeticKind !== "CONSUMABLE") {
    throw new Error("ITEM_NOT_FOUND");
  }

  const inventory = await findInventoryItem(characterId, shopItemId);
  if (!inventory || inventory.quantity < 1) {
    throw new Error("NOT_ENOUGH_IN_INVENTORY");
  }

  await upsertInventoryQuantity(characterId, shopItemId, -1);

  if (item.effectType === "STREAK_FREEZE") {
    if (!habitId) {
      throw new Error("HABIT_ID_REQUIRED");
    }
    await applyStreakFreeze(habitId);
  }

  return { used: item.title };
}