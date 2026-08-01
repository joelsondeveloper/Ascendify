import { useState } from "react";
import type { Subplot } from "../types/narrative";
import { MissionItem } from "./MissionItem";
import { HabitItem } from "./HabitItem";
import { Modal } from "./Modal";
import { CreateMissionForm } from "./CreateMissionForm";
import { CreateHabitForm } from "./CreateHabitForm";

export function SubplotSection({ subplot }: { subplot: Subplot }) {
  const [openModal, setOpenModal] = useState<"mission" | "habit" | null>(null);

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display text-base font-semibold text-text">
          {subplot.title}
        </h3>
        {subplot.status === "COMPLETED" && (
          <span className="text-xs font-mono text-accent-xp">✓ Concluída</span>
        )}
      </div>

      {subplot.missions.length > 0 && (
        <div className="mb-2">
          {subplot.missions.map((mission) => (
            <MissionItem key={mission.id} mission={mission} />
          ))}
        </div>
      )}

      {subplot.habits.length > 0 && (
        <div>
          {subplot.habits.map((habit) => (
            <HabitItem key={habit.id} habit={habit} />
          ))}
        </div>
      )}

      {subplot.status === "IN_PROGRESS" && (
        <div className="flex gap-3 mt-3">
          <button
            onClick={() => setOpenModal("mission")}
            className="text-xs font-display uppercase tracking-wide text-accent hover:underline"
          >
            + Missão
          </button>
          <button
            onClick={() => setOpenModal("habit")}
            className="text-xs font-display uppercase tracking-wide text-accent hover:underline"
          >
            + Hábito
          </button>
        </div>
      )}

      {openModal === "mission" && (
        <Modal eyebrow="New Mission" onClose={() => setOpenModal(null)}>
          <CreateMissionForm
            subplotId={subplot.id}
            onDone={() => setOpenModal(null)}
          />
        </Modal>
      )}

      {openModal === "habit" && (
        <Modal eyebrow="New Habit" onClose={() => setOpenModal(null)}>
          <CreateHabitForm
            subplotId={subplot.id}
            onDone={() => setOpenModal(null)}
          />
        </Modal>
      )}
    </div>
  );
}