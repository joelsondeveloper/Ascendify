import type { ReactNode } from "react";

interface SystemPanelProps {
  eyebrow: string;
  children: ReactNode;
}

export function SystemPanel({ eyebrow, children }: SystemPanelProps) {
  return (
    <div className="relative bg-panel border border-border rounded-lg p-8 shadow-[0_0_24px_rgba(91,141,239,0.15)] animate-in fade-in zoom-in-95 duration-200">
      <p className="font-display text-accent uppercase tracking-widest text-sm mb-4">
        [ {eyebrow} ]
      </p>
      {children}
    </div>
  );
}