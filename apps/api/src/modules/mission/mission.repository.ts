import { prisma } from "../../lib/prisma.js";

export function findMissionsBySubplotId(subplotId: string) {
  return prisma.mission.findMany({
    where: { subplotId },
    orderBy: { createdAt: "asc" },
  });
}

export function findMissionById(id: string) {
  return prisma.mission.findUnique({ where: { id } });
}

export function findSubplotById(id: string) {
  return prisma.subplot.findUnique({ where: { id } });
}

export function createMission(data: {
  subplotId: string;
  title: string;
  description?: string | undefined;
  xpReward: number;
}) {
  return prisma.mission.create({
    data: {
      subplotId: data.subplotId,
      title: data.title,
      description: data.description ?? null,
      xpReward: data.xpReward,
    },
  });
}

export function completeMission(id: string) {
  return prisma.mission.update({
    where: { id },
    data: { status: "COMPLETED", completedAt: new Date() },
  });
}