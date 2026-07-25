import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import {
  listMissions,
  createNewMission,
  completeMissionById,
} from "./mission.service.js";

async function getCharacterId(userId: string) {
  const character = await prisma.character.findUnique({ where: { userId } });
  return character?.id;
}

export async function index(req: Request, res: Response) {
  const missions = await listMissions(req.params.subplotId!);
  res.json(missions);
}

export async function create(req: Request, res: Response) {
  const { title, description, xpReward } = req.body;

  if (!title || typeof title !== "string") {
    res.status(400).json({ error: "Título é obrigatório" });
    return;
  }

  if (typeof xpReward !== "number") {
    res.status(400).json({ error: "xpReward é obrigatório e deve ser numérico" });
    return;
  }

  try {
    const mission = await createNewMission(req.params.subplotId!, {
      title,
      description,
      xpReward,
    });
    res.status(201).json(mission);
  } catch (err) {
    if (err instanceof Error && err.message === "INVALID_XP_REWARD") {
      res.status(400).json({ error: "xpReward deve estar entre 1 e 1000" });
      return;
    }
    res.status(404).json({ error: "Subtrama não encontrada" });
  }
}

export async function complete(req: Request, res: Response) {
  const characterId = await getCharacterId(req.userId!);
  if (!characterId) {
    res.status(404).json({ error: "Personagem não encontrado" });
    return;
  }

  try {
    const mission = await completeMissionById(req.params.id!, characterId);
    res.json(mission);
  } catch (err) {
    if (err instanceof Error && err.message === "MISSION_ALREADY_COMPLETED") {
      res.status(400).json({ error: "Missão já concluída" });
      return;
    }
    res.status(404).json({ error: "Missão não encontrada" });
  }
}