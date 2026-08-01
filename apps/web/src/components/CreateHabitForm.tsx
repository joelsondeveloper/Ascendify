import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Input } from "./Input";
import { Button } from "./Button";
import type { Habit } from "../types/narrative";

export function CreateHabitForm({
  subplotId,
  onDone,
}: {
  subplotId: string;
  onDone: () => void;
}) {
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState<"DAILY" | "WEEKLY">("DAILY");
  const [coinsReward, setCoinsReward] = useState("5");
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: () =>
      api.post<Habit>(`/api/subplots/${subplotId}/habits`, {
        title,
        frequency,
        coinsReward: Number(coinsReward),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chapter", "active"] });
      onDone();
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="font-display text-xl font-semibold">Novo Hábito</h2>

      <Input
        id="habit-title"
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-text-muted font-body">Frequência</label>
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as "DAILY" | "WEEKLY")}
          className="bg-bg border border-border rounded-md px-3 py-2 text-text font-body outline-none focus:border-accent"
        >
          <option value="DAILY">Diário (streak: 21 dias)</option>
          <option value="WEEKLY">Semanal (streak: 8 semanas)</option>
        </select>
      </div>

      <Input
        id="habit-coins"
        label="Coins por check-in"
        type="number"
        min={1}
        value={coinsReward}
        onChange={(e) => setCoinsReward(e.target.value)}
        required
      />

      {error && <p className="text-danger text-sm font-body">{error.message}</p>}

      <div className="flex gap-2 mt-2">
        <Button type="submit" disabled={isPending} className="flex-1">
          {isPending ? "Criando..." : "Criar"}
        </Button>
        <button
          type="button"
          onClick={onDone}
          className="px-4 py-2.5 text-text-muted font-body text-sm hover:text-text"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}