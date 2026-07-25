import { prisma } from "../../lib/prisma.js";

export function findChaptersByCharacterId(characterId: string) {
  return prisma.chapter.findMany({
    where: { characterId },
    orderBy: { order: "asc" },
  });
}

export function findActiveChapter(characterId: string) {
  return prisma.chapter.findFirst({
    where: { characterId, status: "IN_PROGRESS" },
  });
}

export function createChapter(data: {
  characterId: string;
  title: string;
  description?: string | undefined;
  order: number;
}) {
  return prisma.chapter.create({
    data: {
      characterId: data.characterId,
      title: data.title,
      description: data.description ?? null,
      order: data.order,
    },
  });
}

export function findChapterById(id: string) {
  return prisma.chapter.findUnique({
    where: { id },
    include: {
      subplots: {
        include: {
          missions: true,
          habits: true,
        },
      },
    },
  });
}

export function completeChapter(id: string) {
  return prisma.chapter.update({
    where: { id },
    data: { status: "COMPLETED", completedAt: new Date() },
  });
}

export function findActiveChapterWithTree(characterId: string) {
  return prisma.chapter.findFirst({
    where: { characterId, status: "IN_PROGRESS" },
    include: {
      subplots: {
        include: {
          missions: true,
          habits: true,
        },
      },
    },
  });
}