import { useState } from "react";
import { useCreateReward } from "../hooks/useShop";
import { Input } from "./Input";
import { Button } from "./Button";

export function CreateRewardForm({ onDone }: { onDone: () => void }) {
  const [title, setTitle] = useState("");
  const [basePrice, setBasePrice] = useState("20");
  const { mutate, isPending, error } = useCreateReward();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutate(
      { title, basePrice: Number(basePrice) },
      { onSuccess: onDone }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="font-display text-xl font-semibold">Nova Recompensa</h2>

      <Input
        id="reward-title"
        label="Título"
        placeholder="Ex: Jogar 30min"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        id="reward-price"
        label="Preço base (coins)"
        type="number"
        min={1}
        value={basePrice}
        onChange={(e) => setBasePrice(e.target.value)}
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