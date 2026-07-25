import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, id, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm text-text-muted font-body">
        {label}
      </label>
      <input
        id={id}
        className={`bg-bg border border-border rounded-md px-3 py-2 text-text font-body outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(91,141,239,0.15)] transition ${className}`}
        {...props}
      />
    </div>
  );
}