import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import {
  listChapters,
  getChapter,
  startNewChapter,
  getActiveChapter,
} from "./chapter.service.js";

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

  const chapters = await listChapters(characterId);
  res.json(chapters);
}

export async function show(req: Request, res: Response) {
  try {
    const chapter = await getChapter(req.params.id!);
    res.json(chapter);
  } catch {
    res.status(404).json({ error: "Capítulo não encontrado" });
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
    const chapter = await startNewChapter(characterId, { title, description });
    res.status(201).json(chapter);
  } catch (err) {
    if (err instanceof Error && err.message === "ACTIVE_CHAPTER_EXISTS") {
      res.status(400).json({
        error: "Já existe um capítulo em progresso. Conclua-o antes de iniciar outro.",
      });
      return;
    }
    res.status(500).json({ error: "Erro ao criar capítulo" });
  }
}

export async function active(req: Request, res: Response) {
  const characterId = await getCharacterId(req.userId!);
  if (!characterId) {
    res.status(404).json({ error: "Personagem não encontrado" });
    return;
  }

  const chapter = await getActiveChapter(characterId);
  res.json(chapter);
}