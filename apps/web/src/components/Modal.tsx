import type { ReactNode } from "react";
import { SystemPanel } from "./SystemPanel";

interface ModalProps {
  eyebrow: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ eyebrow, onClose, children }: ModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50"
      onClick={onClose}
    >
      <div className="w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <SystemPanel eyebrow={eyebrow}>{children}</SystemPanel>
      </div>
    </div>
  );
}