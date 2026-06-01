import type { TextareaHTMLAttributes } from "react";

export function Textarea({ className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`qc-textarea ${className}`.trim()} />;
}
