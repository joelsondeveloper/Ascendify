import { prisma } from "../../lib/prisma.js";

export function findHabitsBySubplotId(subplotId: string) {
  return prisma.habit.findMany({
    where: { subplotId },
    orderBy: { createdAt: "asc" },
  });
}

export function findHabitById(id: string) {
  return prisma.habit.findUnique({ where: { id } });
}

export function findSubplotById(id: string) {
  return prisma.subplot.findUnique({ where: { id } });
}

export function createHabit(data: {
  subplotId: string;
  title: string;
  description?: string | undefined;
  frequency: "DAILY" | "WEEKLY";
  coinsReward: number;
  streakGoal: number;
}) {
  return prisma.habit.create({
    data: {
      subplotId: data.subplotId,
      title: data.title,
      description: data.description ?? null,
      frequency: data.frequency,
      coinsReward: data.coinsReward,
      streakGoal: data.streakGoal,
    },
  });
}

export async function registerCheckIn(
  habitId: string,
  newStreak: number,
  newLongestStreak: number,
  consolidated: boolean
) {
  const [habit] = await prisma.$transaction([
    prisma.habit.update({
      where: { id: habitId },
      data: {
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        consolidated,
        lastCompletedAt: new Date(),
      },
    }),
    prisma.habitCompletion.create({
      data: { habitId },
    }),
  ]);

  return habit;
}

export function archiveHabit(id: string) {
  return prisma.habit.update({
    where: { id },
    data: { isArchived: true },
  });
}

export function setHabitFreeze(id: string, value: boolean) {
  return prisma.habit.update({
    where: { id },
    data: { hasActiveFreeze: value },
  });
}