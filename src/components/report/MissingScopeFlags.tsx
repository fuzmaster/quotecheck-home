import type { ReactNode } from "react";
import type { RiskFlag, RiskLevel } from "../../types/report";
import { Card } from "../ui/Card";
import { Badge, type BadgeTone } from "../ui/Badge";
import { Icon } from "../ui/Icon";

type Tone = Extract<BadgeTone, "clay" | "amber" | "teal">;

function toneFor(level: RiskLevel): Tone {
  switch (level) {
    case "Higher Risk":
      return "clay";
    case "Ask Before Signing":
      return "teal";
    default:
      return "amber";
  }
}

function iconFor(tone: Tone): ReactNode {
  if (tone === "clay") return <Icon.alert fill="" />;
  if (tone === "teal") return <Icon.info fill="" />;
  return <Icon.flag fill="" />;
}

export function MissingScopeFlags({ flags }: { flags: RiskFlag[] }) {
  return (
    <Card className="print-card">
      <span className="qc-eyebrow">Action items</span>
      <h2 className="qc-section-title" style={{ marginTop: 8, marginBottom: 18 }}>
        Items to clarify
      </h2>
      {flags.length === 0 ? (
        <p style={{ color: "var(--body)" }}>
          No missing-information flags were generated from your entries.
        </p>
      ) : (
        <div>
          {flags.map((f, i) => {
            const tone = toneFor(f.level);
            return (
              <div key={`${f.title}-${i}`} className={`qc-flag lv-${tone}`}>
                <span className="ficon">{iconFor(tone)}</span>
                <div className="fbody">
                  <div className="qc-row qc-between qc-wrap qc-gap-3">
                    <div className="ftitle">{f.title}</div>
                    <Badge tone={tone}>{f.level}</Badge>
                  </div>
                  <div className="fdetail">{f.detail}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
