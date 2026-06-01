import type { ReactNode } from "react";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="qc-field">
      <span className="flabel">
        {label}
        {hint && <span className="fhint">{hint}</span>}
      </span>
      {children}
    </label>
  );
}
