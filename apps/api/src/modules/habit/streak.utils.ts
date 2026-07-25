function startOfDayUTC(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function startOfWeekUTC(date: Date): Date {
  const d = startOfDayUTC(date);
  const day = d.getUTCDay(); // 0 = domingo, 6 = sábado
  const diffToMonday = day === 0 ? -6 : 1 - day;
  d.setUTCDate(d.getUTCDate() + diffToMonday);
  return d;
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function daysBetween(a: Date, b: Date): number {
  return Math.round((startOfDayUTC(a).getTime() - startOfDayUTC(b).getTime()) / ONE_DAY_MS);
}

function weeksBetween(a: Date, b: Date): number {
  return Math.round(
    (startOfWeekUTC(a).getTime() - startOfWeekUTC(b).getTime()) / (7 * ONE_DAY_MS)
  );
}

export interface StreakResult {
  newStreak: number;
  alreadyCheckedIn: boolean;
}

export function calculateStreak(
  frequency: "DAILY" | "WEEKLY",
  currentStreak: number,
  lastCompletedAt: Date | null,
  now: Date = new Date()
): StreakResult {
  if (!lastCompletedAt) {
    return { newStreak: 1, alreadyCheckedIn: false };
  }

  const diff =
    frequency === "DAILY"
      ? daysBetween(now, lastCompletedAt)
      : weeksBetween(now, lastCompletedAt);

  if (diff === 0) {
    return { newStreak: currentStreak, alreadyCheckedIn: true };
  }

  if (diff === 1) {
    return { newStreak: currentStreak + 1, alreadyCheckedIn: false };
  }

  // diff > 1 (ou negativo, o que não deveria acontecer): streak quebrou
  return { newStreak: 1, alreadyCheckedIn: false };
}