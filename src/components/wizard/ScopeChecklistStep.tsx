import type { Quote, ScopeAnswer } from "../../types/quote";
import { scopeChecklistLabels } from "../../data/scopeChecklist";
import { useWizardStore } from "../../store/useWizardStore";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Segmented } from "../ui/Segmented";
import { Icon } from "../ui/Icon";

const LETTER = ["a", "b", "c", "d", "e"];

const scopeFields = Object.keys(scopeChecklistLabels) as Array<keyof typeof scopeChecklistLabels>;

const YESNO = [
  { value: "yes" as const, label: "Yes", tone: "yes" as const },
  { value: "no" as const, label: "No", tone: "no" as const },
  { value: "not_sure" as const, label: "Not sure" },
];

export function ScopeChecklistStep() {
  const quotes = useWizardStore((s) => s.quotes);
  const updateQuote = useWizardStore((s) => s.updateQuote);
  const setStep = useWizardStore((s) => s.setStep);

  return (
    <Card>
      <span className="qc-eyebrow">Step 3 of 4</span>
      <h2 className="qc-section-title" style={{ marginTop: 8 }}>
        Scope clarity checklist
      </h2>
      <p className="qc-section-sub">
        Mark what each quote clearly includes <em>in writing</em>.
      </p>

      <div className="qc-quotes-list qc-mt-6">
        {quotes.map((q, i) => {
          const letter = LETTER[i] ?? "a";
          return (
            <div key={q.id} className="qc-quote">
              <div className="qc-quote-head">
                <div className={`qc-quote-letter ${letter}`}>{letter.toUpperCase()}</div>
                <div className="meta">
                  <div className="k">Quote {i + 1}</div>
                  <div className="nm">{q.contractorName || "Untitled contractor"}</div>
                </div>
              </div>
              <div className="qc-quote-body">
                <div className="qc-scope-list">
                  {scopeFields.map((field) => (
                    <div key={field} className="qc-scope-row">
                      <span className="lbl">{scopeChecklistLabels[field]}</span>
                      <div className="ctrl">
                        <Segmented
                          value={q[field] as ScopeAnswer}
                          onChange={(v) =>
                            updateQuote(q.id, { [field]: v } as Partial<Quote>)
                          }
                          options={YESNO}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <hr className="qc-divider qc-mt-6" />
      <div className="qc-row qc-between qc-mt-5">
        <Button variant="secondary" onClick={() => setStep(1)}>
          <Icon.arrowL fill="" /> Back
        </Button>
        <Button onClick={() => setStep(3)}>
          Review <Icon.arrowR fill="" />
        </Button>
      </div>
    </Card>
  );
}
