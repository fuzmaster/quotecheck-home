import { Icon } from "../ui/Icon";

const STEPS = [
  { label: "Project", sub: "Basics" },
  { label: "Quotes", sub: "2–5 bids" },
  { label: "Scope", sub: "Checklist" },
  { label: "Review", sub: "Generate" },
];

export function Stepper({ step }: { step: number }) {
  return (
    <div className="qc-stepper">
      {STEPS.map((s, i) => {
        const state = i < step ? "done" : i === step ? "current" : "upcoming";
        return (
          <div key={s.label} className={`qc-step ${state}`}>
            <div className="bead">
              {i < step ? <Icon.check fill="" size={16} sw={2.6} /> : i + 1}
            </div>
            <div className="lbl">{s.label}</div>
            <div className="sub">{s.sub}</div>
          </div>
        );
      })}
    </div>
  );
}
