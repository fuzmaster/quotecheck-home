import type { ReactNode, SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & { children?: ReactNode };

export function Select({ className = "", children, ...props }: Props) {
  return (
    <select {...props} className={`qc-select ${className}`.trim()}>
      {children}
    </select>
  );
}
