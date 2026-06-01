import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
};

export function Button({ children, variant = "primary", className = "", ...props }: Props) {
  return (
    <button className={`qc-btn qc-btn-${variant} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
