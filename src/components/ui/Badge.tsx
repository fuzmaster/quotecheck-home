import type { ReactNode } from "react";

export type BadgeTone = "neutral" | "teal" | "amber" | "clay" | "good";

export function Badge({
  children,
  tone = "neutral",
  dot = false,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  dot?: boolean;
}) {
  return (
    <span className={`qc-badge ${tone}`}>
      {dot && <span className="d" />}
      {children}
    </span>
  );
}
