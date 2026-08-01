import {
  createHabit,
  findHabitById,
  findHabitsBySubplotId,
  findSubplotById,
  registerCheckIn,
  archiveHabit,
  setHabitFreeze,
} from "./habit.repository.js";
import { addCoins } from "../character/character.service.js";
import { checkAndCompleteSubplot } from "../subplot/subplot.service.js";
import { calculateStreak } from "./streak.utils.js";

const STREAK_GOALS = {
  DAILY: 21,
  WEEKLY: 8,
} as const;

export async function listHabits(subplotId: string) {
  return findHabitsBySubplotId(subplotId);
}

export async function createNewHabit(
  subplotId: string,
  data: {
    title: string;
    description?: string;
    frequency: "DAILY" | "WEEKLY";
    coinsReward: number;
  }
) {
  const subplot = await findSubplotById(subplotId);
  if (!subplot) {
    throw new Error("SUBPLOT_NOT_FOUND");
  }

  return createHabit({
    subplotId,
    title: data.title,
    description: data.description,
    frequency: data.frequency,
    coinsReward: data.coinsReward,
    streakGoal: STREAK_GOALS[data.frequency],
  });
}

export async function checkInHabit(habitId: string, characterId: string) {
  const habit = await findHabitById(habitId);
  if (!habit) {
    throw new Error("HABIT_NOT_FOUND");
  }

  if (habit.isArchived) {
    throw new Error("HABIT_ARCHIVED");
  }

  const { newStreak, alreadyCheckedIn, freezeConsumed } = calculateStreak(
    habit.frequency,
    habit.currentStreak,
    habit.lastCompletedAt,
    habit.hasActiveFreeze
  );

  if (alreadyCheckedIn) {
    throw new Error("ALREADY_CHECKED_IN");
  }

  const newLongestStreak = Math.max(habit.longestStreak, newStreak);
  const consolidated = newStreak >= habit.streakGoal;

  const updated = await registerCheckIn(habitId, newStreak, newLongestStreak, consolidated);

  if (freezeConsumed) {
    await setHabitFreeze(habitId, false);
  }

  await addCoins(characterId, habit.coinsReward);

  if (consolidated) {
    await checkAndCompleteSubplot(habit.subplotId, characterId);
  }

  return updated;
}

export async function archiveHabitById(habitId: string, characterId: string) {
  const habit = await findHabitById(habitId);
  if (!habit) {
    throw new Error("HABIT_NOT_FOUND");
  }

  const updated = await archiveHabit(habitId);

  // Arquivar pode liberar a conclusão da Subtrama (já que hábitos arquivados
  // não bloqueiam mais a cascata)
  await checkAndCompleteSubplot(habit.subplotId, characterId);

  return updated;
}

export async function applyStreakFreeze(habitId: string) {
  const habit = await findHabitById(habitId);
  if (!habit) {
    throw new Error("HABIT_NOT_FOUND");
  }
  return setHabitFreeze(habitId, true);
}