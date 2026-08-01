import { useState } from "react";
import type { Chapter } from "../types/narrative";
import { SystemPanel } from "./SystemPanel";
import { SubplotSection } from "./SubplotSection";
import { Modal } from "./Modal";
import { CreateSubplotForm } from "./CreateSubplotForm";

export function ChapterView({ chapter }: { chapter: Chapter }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <SystemPanel eyebrow="Chapter">
      <h2 className="font-display text-2xl font-semibold">{chapter.title}</h2>
      {chapter.description && (
        <p className="text-text-muted text-sm font-body mt-1">
          {chapter.description}
        </p>
      )}

      {chapter.subplots.length === 0 ? (
        <p className="text-text-muted text-sm font-body mt-4">
          Nenhuma subtrama ainda.
        </p>
      ) : (
        chapter.subplots.map((subplot) => (
          <SubplotSection key={subplot.id} subplot={subplot} />
        ))
      )}

      <button
        onClick={() => setShowModal(true)}
        className="text-xs font-display uppercase tracking-wide text-accent hover:underline mt-4"
      >
        + Subtrama
      </button>

      {showModal && (
        <Modal eyebrow="New Subplot" onClose={() => setShowModal(false)}>
          <CreateSubplotForm
            chapterId={chapter.id}
            onDone={() => setShowModal(false)}
          />
        </Modal>
      )}
    </SystemPanel>
  );
}