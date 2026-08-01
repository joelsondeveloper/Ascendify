import type { Mission } from "../types/narrative";
import { useCompleteMission } from "../hooks/useActiveChapter";

export function MissionItem({ mission }: { mission: Mission }) {
  const { mutate, isPending } = useCompleteMission();
  const done = mission.status === "COMPLETED";

  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            if (
              !done &&
              window.confirm(
                `Concluir a missão "${mission.title}"? Essa ação não pode ser desfeita.`,
              )
            ) {
              mutate(mission.id);
            }
          }}
          disabled={done || isPending}
          className={`w-5 h-5 rounded border flex items-center justify-center transition ${
            done
              ? "bg-accent border-accent"
              : "border-border hover:border-accent"
          }`}
        >
          {done && <span className="text-bg text-xs">✓</span>}
        </button>
        <span
          className={`font-body text-sm ${
            done ? "line-through text-text-muted" : "text-text"
          }`}
        >
          {mission.title}
        </span>
      </div>
      <span className="font-mono text-xs text-accent">
        +{mission.xpReward} XP
      </span>
    </div>
  );
}
