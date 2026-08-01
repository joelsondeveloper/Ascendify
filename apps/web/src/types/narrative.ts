export interface Mission {
  id: string;
  subplotId: string;
  title: string;
  description: string | null;
  xpReward: number;
  status: "PENDING" | "COMPLETED";
  completedAt: string | null;
  createdAt: string;
}

export interface Habit {
  id: string;
  subplotId: string;
  title: string;
  description: string | null;
  frequency: "DAILY" | "WEEKLY";
  coinsReward: number;
  streakGoal: number;
  currentStreak: number;
  longestStreak: number;
  consolidated: boolean;
  lastCompletedAt: string | null;
  isArchived: boolean;
  createdAt: string;
}

export interface Subplot {
  id: string;
  chapterId: string;
  title: string;
  description: string | null;
  status: "IN_PROGRESS" | "COMPLETED";
  xpBonus: number;
  createdAt: string;
  completedAt: string | null;
  missions: Mission[];
  habits: Habit[];
}

export interface Chapter {
  id: string;
  characterId: string;
  title: string;
  description: string | null;
  status: "IN_PROGRESS" | "COMPLETED";
  xpBonus: number;
  order: number;
  createdAt: string;
  completedAt: string | null;
  subplots: Subplot[];
}