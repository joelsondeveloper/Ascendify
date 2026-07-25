import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import {
  listSubplots,
  getSubplot,
  createNewSubplot,
} from "./subplot.service.js";

async function getCharacterId(userId: string) {
  const character = await prisma.character.findUnique({ where: { userId } });
  return character?.id;
}

export async function index(req: Request, res: Response) {
  const characterId = await getCharacterId(req.userId!);
  if (!characterId) {
    res.status(404).json({ error: "Personagem não encontrado" });
    return;
  }

  try {
    const subplots = await listSubplots(req.params.chapterId!, characterId);
    res.json(subplots);
  } catch {
    res.status(404).json({ error: "Capítulo não encontrado" });
  }
}

export async function show(req: Request, res: Response) {
  try {
    const subplot = await getSubplot(req.params.id!);
    res.json(subplot);
  } catch {
    res.status(404).json({ error: "Subtrama não encontrada" });
  }
}

export async function create(req: Request, res: Response) {
  const characterId = await getCharacterId(req.userId!);
  if (!characterId) {
    res.status(404).json({ error: "Personagem não encontrado" });
    return;
  }

  const { title, description } = req.body;

  if (!title || typeof title !== "string") {
    res.status(400).json({ error: "Título é obrigatório" });
    return;
  }

  try {
    const subplot = await createNewSubplot(req.params.chapterId!, characterId, {
      title,
      description,
    });
    res.status(201).json(subplot);
  } catch {
    res.status(404).json({ error: "Capítulo não encontrado" });
  }
}