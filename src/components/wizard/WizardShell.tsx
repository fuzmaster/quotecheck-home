import { DisclaimerBanner } from "../layout/DisclaimerBanner";
import { Stepper } from "../layout/Stepper";
import { ProjectBasicsStep } from "./ProjectBasicsStep";
import { QuoteEntryStep } from "./QuoteEntryStep";
import { ScopeChecklistStep } from "./ScopeChecklistStep";
import { ReviewStep } from "./ReviewStep";
import { useWizardStore } from "../../store/useWizardStore";

export function WizardShell() {
  const step = useWizardStore((s) => s.step);
  return (
    <div className="qc-stack">
      <DisclaimerBanner />
      <div className="qc-hero">
        <h1>
          Don't sign a <span className="accent">vague</span> contractor quote.
        </h1>
        <p className="lede">
          Enter structured details from 2 to 5 contractor quotes. Get a plain-English comparison,
          missing-scope warnings, and copy-paste questions to send before you pay a deposit.
        </p>
      </div>
      <div className="qc-card tight" style={{ padding: "18px 20px" }}>
        <Stepper step={step} />
      </div>
      {step === 0 && <ProjectBasicsStep />}
      {step === 1 && <QuoteEntryStep />}
      {step === 2 && <ScopeChecklistStep />}
      {step === 3 && <ReviewStep />}
    </div>
  );
}
