import type { ReactNode } from "react";

export type SegmentedOption<T extends string> = {
  value: T;
  label: string;
  tone?: "yes" | "no";
  icon?: ReactNode;
};

export function Segmented<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (value: T) => void;
  options: SegmentedOption<T>[];
}) {
  return (
    <div className="qc-seg">
      {options.map((o) => {
        const on = value === o.value;
        const cls = `${on ? "on" : ""} ${on && o.tone ? o.tone : ""}`.trim();
        return (
          <button key={o.value} type="button" className={cls} onClick={() => onChange(o.value)}>
            {o.icon}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
