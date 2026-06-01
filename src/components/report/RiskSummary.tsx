import type { Report } from "../../types/report";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { formatCurrency } from "../../lib/formatCurrency";

export function RiskSummary({ report }: { report: Report }) {
  const total = report.flags.length + report.missingScope.length;
  const level =
    total > 6
      ? { t: "Higher risk", tone: "clay" as const }
      : total > 2
        ? { t: "Needs clarification", tone: "amber" as const }
        : { t: "Ask before signing", tone: "teal" as const };

  const pricedCount = report.rankedQuotes.filter((q) => q.totalPrice > 0).length;

  return (
    <Card className="print-card">
      <div className="qc-row qc-between qc-wrap qc-gap-3">
        <div>
          <span className="qc-eyebrow">Summary</span>
          <h2 className="qc-section-title" style={{ marginTop: 8 }}>
            {total === 0
              ? "No major flags from your entries."
              : `${total} item${total === 1 ? "" : "s"} to clarify before signing.`}
          </h2>
          <p className="qc-section-sub" style={{ maxWidth: "52ch" }}>
            Based only on what you entered. Price alone rarely tells the full story — read the items
            below.
          </p>
        </div>
        <Badge tone={level.tone} dot>
          {level.t}
        </Badge>
      </div>
      <div className="qc-stats">
        <div className="qc-stat hl">
          <div className="k">Lowest</div>
          <div className="v tnum">{formatCurrency(report.spread.low)}</div>
        </div>
        <div className="qc-stat">
          <div className="k">Highest</div>
          <div className="v tnum">{formatCurrency(report.spread.high)}</div>
        </div>
        <div className="qc-stat">
          <div className="k">Spread</div>
          <div className="v tnum">{report.spread.spreadPercentFromLow}%</div>
        </div>
        <div className="qc-stat">
          <div className="k">Median</div>
          <div className="v tnum">
            {report.spread.median === null ? "N/A" : formatCurrency(report.spread.median)}
          </div>
        </div>
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 16 }}>
        {pricedCount < 3
          ? "Median omitted — shown only with 3 or more priced quotes."
          : report.spread.mathNote}
      </p>
    </Card>
  );
}
