import { quotesSchema } from "../../schemas/zodQuotes";
import { useWizardStore } from "../../store/useWizardStore";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Icon } from "../ui/Icon";
import { QuoteCard } from "./QuoteCard";

export function QuoteEntryStep() {
  const quotes = useWizardStore((s) => s.quotes);
  const addQuote = useWizardStore((s) => s.addQuote);
  const setStep = useWizardStore((s) => s.setStep);
  const isValid = quotesSchema.safeParse(quotes).success;

  return (
    <Card>
      <div className="qc-row qc-between qc-wrap qc-gap-3">
        <div>
          <span className="qc-eyebrow">Step 2 of 4</span>
          <h2 className="qc-section-title" style={{ marginTop: 8 }}>
            Enter 2 to 5 quotes
          </h2>
          <p className="qc-section-sub">
            Structured manual entry only — no PDF uploads or OCR.
          </p>
        </div>
        <Badge tone="teal" dot>
          {quotes.length} of 5 entered
        </Badge>
      </div>

      <div className="qc-quotes-list qc-mt-6">
        {quotes.map((q, i) => (
          <QuoteCard key={q.id} quote={q} index={i} />
        ))}
      </div>

      {quotes.length < 5 && (
        <button className="qc-add-quote qc-mt-4" onClick={addQuote} type="button">
          <Icon.plus fill="" /> Add another quote
        </button>
      )}

      <hr className="qc-divider qc-mt-6" />
      <div className="qc-row qc-between qc-wrap qc-gap-3 qc-mt-5">
        <Button variant="secondary" onClick={() => setStep(0)}>
          <Icon.arrowL fill="" /> Back
        </Button>
        <Button disabled={!isValid} onClick={() => setStep(2)}>
          Continue to scope <Icon.arrowR fill="" />
        </Button>
      </div>
      {!isValid && (
        <p className="qc-error qc-mt-4" style={{ textAlign: "right" }}>
          Add names, prices, deposits, and timelines for at least 2 quotes.
        </p>
      )}
    </Card>
  );
}
