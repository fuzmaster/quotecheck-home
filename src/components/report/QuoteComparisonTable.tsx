import type { Quote } from "../../types/quote";
import type { QuoteSpread } from "../../types/report";
import { Card } from "../ui/Card";
import { formatCurrency } from "../../lib/formatCurrency";

const LETTER = ["A", "B", "C", "D", "E"];

export function QuoteComparisonTable({
  quotes,
  spread,
}: {
  quotes: Quote[];
  spread: QuoteSpread;
}) {
  return (
    <Card className="print-card">
      <span className="qc-eyebrow">Side by side</span>
      <h2 className="qc-section-title" style={{ marginTop: 8, marginBottom: 4 }}>
        Quote comparison
      </h2>
      <p className="qc-section-sub" style={{ marginBottom: 18 }}>
        Lowest bid highlighted. "From low" shows how much more each costs versus the cheapest.
      </p>
      <div style={{ overflowX: "auto" }}>
        <table className="qc-doc-table" style={{ minWidth: 720 }}>
          <thead>
            <tr>
              <th>Contractor</th>
              <th className="num">Price</th>
              <th className="num">From low</th>
              <th className="num">Deposit</th>
              <th className="num">Timeline</th>
              <th>Warranty</th>
              <th>Permits</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q, i) => {
              const fromLow =
                spread.low > 0 ? Math.round(((q.totalPrice - spread.low) / spread.low) * 100) : 0;
              const isLow = q.totalPrice === spread.low && spread.low > 0;
              return (
                <tr key={q.id} className={isLow ? "is-low" : ""}>
                  <td>
                    <div className="c-name">
                      <span className="dotlet">{LETTER[i]}</span>
                      <span className="nm">{q.contractorName || "—"}</span>
                    </div>
                  </td>
                  <td className="num price-lead">{formatCurrency(q.totalPrice)}</td>
                  <td className="num">
                    {isLow ? (
                      <span className="qc-pct-base">lowest</span>
                    ) : (
                      <span className="qc-pct-up">+{fromLow}%</span>
                    )}
                  </td>
                  <td className="num">{formatCurrency(q.depositAmount)}</td>
                  <td className="num">{q.timelineDays} days</td>
                  <td style={{ textTransform: "capitalize" }}>
                    {q.warrantyIncluded.replace("_", " ")}
                  </td>
                  <td style={{ textTransform: "capitalize" }}>
                    {q.permitsIncluded.replace("_", " ")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
