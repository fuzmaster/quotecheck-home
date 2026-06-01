import { DisclaimerBanner } from "../layout/DisclaimerBanner";
import { useWizardStore } from "../../store/useWizardStore";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { RiskSummary } from "./RiskSummary";
import { QuoteComparisonTable } from "./QuoteComparisonTable";
import { MissingScopeFlags } from "./MissingScopeFlags";
import { FollowUpQuestions } from "./FollowUpQuestions";
import { PremiumReportLock } from "./PremiumReportLock";
import { PrintReportButton } from "./PrintReportButton";

export function ReportPage() {
  const report = useWizardStore((s) => s.report);
  const project = useWizardStore((s) => s.project);
  const reset = useWizardStore((s) => s.reset);
  if (!report) return null;

  const createdLabel = new Date(report.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="qc-stack">
      <div className="no-print">
        <DisclaimerBanner />
      </div>
      <Card className="print-card">
        <div className="qc-report-head">
          <div>
            <span className="qc-eyebrow">QuoteCheck Report</span>
            <h1 className="qc-display" style={{ marginTop: 8 }}>
              {project.projectType || "Your project"} review
            </h1>
            <p className="qc-section-sub">
              Created {createdLabel} · {project.projectArea || "—"} · ZIP{" "}
              {project.zipCode || "—"}
            </p>
          </div>
          <div className="no-print qc-row qc-gap-3">
            <PrintReportButton />
            <Button variant="secondary" onClick={reset}>
              <Icon.refresh fill="" /> Start over
            </Button>
          </div>
        </div>
      </Card>
      <RiskSummary report={report} />
      <QuoteComparisonTable quotes={report.rankedQuotes} spread={report.spread} />
      <MissingScopeFlags flags={[...report.missingScope, ...report.flags]} />
      <FollowUpQuestions questions={report.questions} />
      <PremiumReportLock reportId={report.reportId} />
      <Card className="print-card">
        <h2 className="qc-section-title" style={{ fontSize: 20 }}>
          Final disclaimer
        </h2>
        <p className="qc-final-disclaimer">
          This report is based only on the manual information entered by the user. It may miss
          scope issues, pricing context, code requirements, contractor qualifications, insurance
          requirements, hidden damage, or local permitting details. Do not treat this as legal,
          construction, engineering, insurance, financial, or professional advice.
        </p>
      </Card>
    </div>
  );
}
