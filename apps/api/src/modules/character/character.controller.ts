import type { Request, Response } from "express";
import { findCharacterByUserId } from "./character.repository.js";

export async function getMyCharacter(req: Request, res: Response) {
  const character = await findCharacterByUserId(req.userId!);

  if (!character) {
    res.status(404).json({ error: "Personagem não encontrado" });
    return;
  }

  res.json(character);
}
