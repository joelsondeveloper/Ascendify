import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import {
  getShopCatalog,
  createNewRealLifeReward,
  redeemItem,
  equipTitle,
  useConsumable,
} from "./shop.service.js";

async function getCharacterId(userId: string) {
  const character = await prisma.character.findUnique({ where: { userId } });
  return character?.id;
}

export async function catalog(req: Request, res: Response) {
  const characterId = await getCharacterId(req.userId!);
  if (!characterId) {
    res.status(404).json({ error: "Personagem não encontrado" });
    return;
  }

  const shop = await getShopCatalog(characterId);
  res.json(shop);
}

export async function createReward(req: Request, res: Response) {
  const characterId = await getCharacterId(req.userId!);
  if (!characterId) {
    res.status(404).json({ error: "Personagem não encontrado" });
    return;
  }

  const { title, description, basePrice } = req.body;

  if (!title || typeof title !== "string") {
    res.status(400).json({ error: "Título é obrigatório" });
    return;
  }

  if (typeof basePrice !== "number" || basePrice < 1) {
    res.status(400).json({ error: "basePrice deve ser um número maior que 0" });
    return;
  }

  try {
    const item = await createNewRealLifeReward(characterId, { title, description, basePrice });
    res.status(201).json(item);
  } catch (err) {
    if (err instanceof Error && err.message === "MAX_REWARDS_REACHED") {
      res.status(400).json({ error: "Limite de 20 recompensas ativas atingido" });
      return;
    }
    res.status(500).json({ error: "Erro ao criar recompensa" });
  }
}

export async function redeem(req: Request, res: Response) {
  const characterId = await getCharacterId(req.userId!);
  if (!characterId) {
    res.status(404).json({ error: "Personagem não encontrado" });
    return;
  }

  try {
    const result = await redeemItem(req.params.id!, characterId);
    res.json(result);
  } catch (err) {
    if (err instanceof Error && err.message === "INSUFFICIENT_COINS") {
      res.status(400).json({ error: "Coins insuficientes" });
      return;
    }
    if (err instanceof Error && err.message === "ALREADY_OWNED") {
      res.status(400).json({ error: "Você já possui este item" });
      return;
    }
    res.status(404).json({ error: "Item não encontrado" });
  }
}

export async function equip(req: Request, res: Response) {
  const characterId = await getCharacterId(req.userId!);
  if (!characterId) {
    res.status(404).json({ error: "Personagem não encontrado" });
    return;
  }

  try {
    const character = await equipTitle(req.params.id!, characterId);
    res.json(character);
  } catch (err) {
    if (err instanceof Error && err.message === "NOT_OWNED") {
      res.status(400).json({ error: "Você não possui este título" });
      return;
    }
    res.status(404).json({ error: "Item não encontrado" });
  }
}

export async function use(req: Request, res: Response) {
  const characterId = await getCharacterId(req.userId!);
  if (!characterId) {
    res.status(404).json({ error: "Personagem não encontrado" });
    return;
  }

  const { habitId } = req.body;

  try {
    const result = await useConsumable(req.params.id!, characterId, habitId);
    res.json(result);
  } catch (err) {
    if (err instanceof Error && err.message === "NOT_ENOUGH_IN_INVENTORY") {
      res.status(400).json({ error: "Você não possui esse item no inventário" });
      return;
    }
    if (err instanceof Error && err.message === "HABIT_ID_REQUIRED") {
      res.status(400).json({ error: "habitId é obrigatório para este item" });
      return;
    }
    res.status(404).json({ error: "Item não encontrado" });
  }
}