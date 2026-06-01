import { useWizardStore } from "../../store/useWizardStore";
import { formatCurrency } from "../../lib/formatCurrency";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";

const LETTER = ["A", "B", "C", "D", "E"];

export function ReviewStep() {
  const project = useWizardStore((s) => s.project);
  const quotes = useWizardStore((s) => s.quotes);
  const setStep = useWizardStore((s) => s.setStep);
  const createReport = useWizardStore((s) => s.createReport);

  return (
    <Card>
      <span className="qc-eyebrow">Step 4 of 4</span>
      <h2 className="qc-section-title" style={{ marginTop: 8 }}>
        Review before generating
      </h2>
      <p className="qc-section-sub">
        A last look at what you entered. You can still go back and edit.
      </p>

      <div className="qc-review-banner qc-mt-6">
        <div className="ttl">{project.projectType || "Project"}</div>
        <div className="meta">
          {project.projectArea || "—"} · ZIP {project.zipCode || "—"} · Permit likely:{" "}
          {project.permitLikely.replace("_", " ")}
        </div>
      </div>

      <div className="qc-review-table-wrap qc-mt-5">
        <table className="qc-doc-table">
          <thead>
            <tr>
              <th style={{ paddingLeft: 16 }}>Contractor</th>
              <th className="num">Price</th>
              <th className="num">Deposit</th>
              <th className="num" style={{ paddingRight: 16 }}>
                Timeline
              </th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q, i) => (
              <tr key={q.id}>
                <td style={{ paddingLeft: 16 }}>
                  <div className="c-name">
                    <span className="dotlet">{LETTER[i]}</span>
                    <span className="nm">{q.contractorName || "—"}</span>
                  </div>
                </td>
                <td className="num price-lead">{formatCurrency(q.totalPrice)}</td>
                <td className="num">{formatCurrency(q.depositAmount)}</td>
                <td className="num" style={{ paddingRight: 16 }}>
                  {q.timelineDays} days
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr className="qc-divider qc-mt-6" />
      <div className="qc-row qc-between qc-mt-5">
        <Button variant="secondary" onClick={() => setStep(2)}>
          <Icon.arrowL fill="" /> Back
        </Button>
        <Button onClick={createReport}>
          <Icon.spark fill="" /> Generate QuoteCheck report
        </Button>
      </div>
    </Card>
  );
}
