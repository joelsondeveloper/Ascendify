import {
  createSubplot,
  findChapterById,
  findSubplotsByChapterId,
  findSubplotById,
  findMissionsBySubplotId,
  findHabitsBySubplotId,
  completeSubplot,
} from "./subplot.repository.js";
import { addXp } from "../character/character.service.js";
import { checkAndCompleteChapter } from "../chapter/chapter.service.js";

export async function listSubplots(chapterId: string, characterId: string) {
  const chapter = await findChapterById(chapterId);
  if (!chapter || chapter.characterId !== characterId) {
    throw new Error("CHAPTER_NOT_FOUND");
  }
  return findSubplotsByChapterId(chapterId);
}

export async function getSubplot(id: string) {
  const subplot = await findSubplotById(id);
  if (!subplot) {
    throw new Error("SUBPLOT_NOT_FOUND");
  }
  return subplot;
}

export async function createNewSubplot(
  chapterId: string,
  characterId: string,
  data: { title: string; description?: string }
) {
  const chapter = await findChapterById(chapterId);
  if (!chapter || chapter.characterId !== characterId) {
    throw new Error("CHAPTER_NOT_FOUND");
  }

  return createSubplot({
    chapterId,
    title: data.title,
    description: data.description,
  });
}

export async function checkAndCompleteSubplot(subplotId: string, characterId: string) {
  const missions = await findMissionsBySubplotId(subplotId);
  const habits = await findHabitsBySubplotId(subplotId);

  if (missions.length === 0 && habits.length === 0) {
    return;
  }

  const allMissionsDone = missions.every((m) => m.status === "COMPLETED");
  const allHabitsReady = habits.every((h) => h.isArchived || h.consolidated);

  if (!allMissionsDone || !allHabitsReady) {
    return;
  }

  const subplot = await findSubplotById(subplotId);
  if (!subplot || subplot.status === "COMPLETED") {
    return;
  }

  await completeSubplot(subplotId);

  if (subplot.xpBonus > 0) {
    await addXp(characterId, subplot.xpBonus);
  }

  await checkAndCompleteChapter(subplot.chapterId, characterId);
}