import { prisma } from "../../lib/prisma.js";

export function findSubplotsByChapterId(chapterId: string) {
  return prisma.subplot.findMany({
    where: { chapterId },
    orderBy: { createdAt: "asc" },
  });
}

export function findSubplotById(id: string) {
  return prisma.subplot.findUnique({
    where: { id },
    include: { missions: true, habits: true },
  });
}

export function findChapterById(id: string) {
  return prisma.chapter.findUnique({ where: { id } });
}

export function createSubplot(data: {
  chapterId: string;
  title: string;
  description?: string | undefined;
}) {
  return prisma.subplot.create({
    data: {
      chapterId: data.chapterId,
      title: data.title,
      description: data.description ?? null,
    },
  });
}

export function findMissionsBySubplotId(subplotId: string) {
  return prisma.mission.findMany({ where: { subplotId } });
}

export function findHabitsBySubplotId(subplotId: string) {
  return prisma.habit.findMany({ where: { subplotId } });
}

export function completeSubplot(id: string) {
  return prisma.subplot.update({
    where: { id },
    data: { status: "COMPLETED", completedAt: new Date() },
  });
}