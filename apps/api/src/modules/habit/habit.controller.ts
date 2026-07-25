import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import { listHabits, createNewHabit, checkInHabit } from "./habit.service.js";

async function getCharacterId(userId: string) {
  const character = await prisma.character.findUnique({ where: { userId } });
  return character?.id;
}

export async function index(req: Request, res: Response) {
  const habits = await listHabits(req.params.subplotId!);
  res.json(habits);
}

export async function create(req: Request, res: Response) {
  const { title, description, frequency, coinsReward } = req.body;

  if (!title || typeof title !== "string") {
    res.status(400).json({ error: "Título é obrigatório" });
    return;
  }

  if (frequency !== "DAILY" && frequency !== "WEEKLY") {
    res.status(400).json({ error: "frequency deve ser DAILY ou WEEKLY" });
    return;
  }

  if (typeof coinsReward !== "number" || coinsReward < 1) {
    res.status(400).json({ error: "coinsReward deve ser um número maior que 0" });
    return;
  }

  try {
    const habit = await createNewHabit(req.params.subplotId!, {
      title,
      description,
      frequency,
      coinsReward,
    });
    res.status(201).json(habit);
  } catch {
    res.status(404).json({ error: "Subtrama não encontrada" });
  }
}

export async function checkIn(req: Request, res: Response) {
  const characterId = await getCharacterId(req.userId!);
  if (!characterId) {
    res.status(404).json({ error: "Personagem não encontrado" });
    return;
  }

  try {
    const habit = await checkInHabit(req.params.id!, characterId);
    res.json(habit);
  } catch (err) {
    if (err instanceof Error && err.message === "ALREADY_CHECKED_IN") {
      res.status(400).json({ error: "Você já fez check-in neste período" });
      return;
    }
    if (err instanceof Error && err.message === "HABIT_ARCHIVED") {
      res.status(400).json({ error: "Este hábito está arquivado" });
      return;
    }
    res.status(404).json({ error: "Hábito não encontrado" });
  }
}