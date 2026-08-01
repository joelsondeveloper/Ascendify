import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface Character {
  id: string;
  name: string;
  level: number;
  currentXp: number;
  totalXp: number;
  coins: number;
  title: string | null;
}

export const CHARACTER_KEY = ["character", "me"];

export function useCharacter() {
  return useQuery({
    queryKey: CHARACTER_KEY,
    queryFn: () => api.get<Character>("/api/character/me"),
  });
}