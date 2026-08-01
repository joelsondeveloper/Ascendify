import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Input } from "./Input";
import { Button } from "./Button";
import type { Subplot } from "../types/narrative";

export function CreateSubplotForm({
  chapterId,
  onDone,
}: {
  chapterId: string;
  onDone: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: () =>
      api.post<Subplot>(`/api/chapters/${chapterId}/subplots`, {
        title,
        description: description || undefined,
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
      <h2 className="font-display text-xl font-semibold">Nova Subtrama</h2>

      <Input
        id="subplot-title"
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        id="subplot-description"
        label="Descrição (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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