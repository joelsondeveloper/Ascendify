import type { Habit } from "../types/narrative";
import { useCheckInHabit, useArchiveHabit } from "../hooks/useActiveChapter";

export function HabitItem({ habit }: { habit: Habit }) {
  const { mutate: checkIn, isPending: checkingIn, error } = useCheckInHabit();
  const { mutate: archive, isPending: archiving } = useArchiveHabit();

  if (habit.isArchived) {
    return null;
  }

  return (
    <div className="py-2 border-b border-border last:border-0">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-body text-sm text-text">{habit.title}</span>
          {habit.consolidated && (
            <span className="ml-2 text-xs text-accent-xp font-mono">★ consolidado</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm(`Confirmar check-in de "${habit.title}"?`)) {
                checkIn(habit.id);
              }
            }}
            disabled={checkingIn}
            className="text-xs font-display uppercase tracking-wide text-accent hover:underline disabled:opacity-50"
          >
            Check-in
          </button>
          <button
            onClick={() => {
              if (
                window.confirm(
                  `Arquivar "${habit.title}"? Ele deixará de contar para conclusão da subtrama, mas o histórico será mantido.`
                )
              ) {
                archive(habit.id);
              }
            }}
            disabled={archiving}
            className="text-xs font-display uppercase tracking-wide text-text-muted hover:text-danger disabled:opacity-50"
          >
            Arquivar
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-1">
        <span className="font-mono text-xs text-text-muted">
          Streak: {habit.currentStreak}/{habit.streakGoal}
        </span>
        <span className="font-mono text-xs text-accent-xp">+{habit.coinsReward} coins</span>
      </div>
      {error && (
        <p className="text-danger text-xs font-body mt-1">{error.message}</p>
      )}
    </div>
  );
}