import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { Chapter, Mission, Habit } from "../types/narrative";
import { CHARACTER_KEY } from "./useCharacter";

const ACTIVE_CHAPTER_KEY = ["chapter", "active"];

export function useActiveChapter() {
  return useQuery({
    queryKey: ACTIVE_CHAPTER_KEY,
    queryFn: () => api.get<Chapter | null>("/api/chapters/active"),
  });
}

export function useCompleteMission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (missionId: string) =>
      api.post<Mission>(`/api/missions/${missionId}/complete`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACTIVE_CHAPTER_KEY });
      queryClient.invalidateQueries({ queryKey: CHARACTER_KEY });
    },
  });
}

export function useCheckInHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (habitId: string) => api.post<Habit>(`/api/habits/${habitId}/check-in`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACTIVE_CHAPTER_KEY });
      queryClient.invalidateQueries({ queryKey: CHARACTER_KEY });
    },
  });
}

export function useArchiveHabit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (habitId: string) => api.post<Habit>(`/api/habits/${habitId}/archive`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACTIVE_CHAPTER_KEY });
      queryClient.invalidateQueries({ queryKey: CHARACTER_KEY });
    },
  });
}