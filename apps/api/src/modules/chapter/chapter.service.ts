import {
  createChapter,
  findActiveChapter,
  findChaptersByCharacterId,
  findChapterById,
  completeChapter,
  findActiveChapterWithTree,
} from "./chapter.repository.js";
import { findSubplotsByChapterId } from "../subplot/subplot.repository.js";
import { addXp } from "../character/character.service.js";

export async function listChapters(characterId: string) {
  return findChaptersByCharacterId(characterId);
}

export async function getChapter(id: string) {
  const chapter = await findChapterById(id);
  if (!chapter) {
    throw new Error("CHAPTER_NOT_FOUND");
  }
  return chapter;
}

export async function startNewChapter(
  characterId: string,
  data: { title: string; description?: string },
) {
  const active = await findActiveChapter(characterId);
  if (active) {
    throw new Error("ACTIVE_CHAPTER_EXISTS");
  }

  const existing = await findChaptersByCharacterId(characterId);
  const nextOrder = existing.length + 1;

  return createChapter({
    characterId,
    title: data.title,
    description: data.description,
    order: nextOrder,
  });
}

export async function checkAndCompleteChapter(
  chapterId: string,
  characterId: string,
) {
  const subplots = await findSubplotsByChapterId(chapterId);

  if (subplots.length === 0) {
    return;
  }

  const allDone = subplots.every((s) => s.status === "COMPLETED");
  if (!allDone) {
    return;
  }

  const chapter = await findChapterById(chapterId);
  if (!chapter || chapter.status === "COMPLETED") {
    return;
  }

  await completeChapter(chapterId);

  if (chapter.xpBonus > 0) {
    await addXp(characterId, chapter.xpBonus);
  }
}

export async function getActiveChapter(characterId: string) {
  return findActiveChapterWithTree(characterId);
}
