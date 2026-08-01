import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Input } from "./Input";
import { Button } from "./Button";
import type { Chapter } from "../types/narrative";

export function CreateChapterForm({ onDone }: { onDone: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: () =>
      api.post<Chapter>("/api/chapters", {
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
      <h2 className="font-display text-xl font-semibold">Novo Capítulo</h2>

      <Input
        id="chapter-title"
        label="Título"
        placeholder="Ex: Meu Glow Up"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        id="chapter-description"
        label="Descrição (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {error && <p className="text-danger text-sm font-body">{error.message}</p>}

      <div className="flex gap-2 mt-2">
        <Button type="submit" disabled={isPending} className="flex-1">
          {isPending ? "Criando..." : "Começar"}
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