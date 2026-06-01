import type { Quote } from "../../types/quote";
import { useWizardStore } from "../../store/useWizardStore";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { Field } from "../ui/Field";
import { MoneyInput, DaysInput } from "../ui/MoneyInput";
import { Segmented } from "../ui/Segmented";
import { Badge } from "../ui/Badge";
import { Icon } from "../ui/Icon";

const LETTER = ["a", "b", "c", "d", "e"];

const MATERIAL_OPTIONS = [
  { value: "not_sure" as const, label: "Not sure" },
  { value: "basic" as const, label: "Basic" },
  { value: "standard" as const, label: "Standard" },
  { value: "premium" as const, label: "Premium" },
];

export function QuoteCard({ quote, index }: { quote: Quote; index: number }) {
  const updateQuote = useWizardStore((s) => s.updateQuote);
  const removeQuote = useWizardStore((s) => s.removeQuote);
  const count = useWizardStore((s) => s.quotes.length);
  const patch = (p: Partial<Quote>) => updateQuote(quote.id, p);

  const depPct =
    quote.totalPrice > 0 ? Math.round((quote.depositAmount / quote.totalPrice) * 100) : 0;
  const depTone: "clay" | "good" | "neutral" =
    depPct >= 40 ? "clay" : depPct > 0 ? "good" : "neutral";
  const letter = LETTER[index] ?? "a";

  return (
    <div className="qc-quote">
      <div className="qc-quote-head">
        <div className={`qc-quote-letter ${letter}`}>{letter.toUpperCase()}</div>
        <div className="meta">
          <div className="k">Quote {index + 1}</div>
          <div className="nm">{quote.contractorName || "Untitled contractor"}</div>
        </div>
        {quote.totalPrice > 0 && (
          <Badge tone={depTone} dot>
            {depPct ? `${depPct}% deposit` : "—"}
          </Badge>
        )}
        <Button
          variant="ghost"
          disabled={count <= 2}
          onClick={() => removeQuote(quote.id)}
          aria-label="Remove quote"
        >
          <Icon.trash fill="" />
        </Button>
      </div>
      <div className="qc-quote-body">
        <div className="qc-grid cols-3">
          <div className="qc-col-span">
            <Field label="Contractor name">
              <Input
                value={quote.contractorName}
                placeholder="e.g. Cedar & Co. Builders"
                onChange={(e) => patch({ contractorName: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Total price">
            <MoneyInput value={quote.totalPrice} onChange={(v) => patch({ totalPrice: v })} />
          </Field>
          <Field label="Deposit amount">
            <MoneyInput value={quote.depositAmount} onChange={(v) => patch({ depositAmount: v })} />
          </Field>
          <Field label="Timeline">
            <DaysInput value={quote.timelineDays} onChange={(v) => patch({ timelineDays: v })} />
          </Field>
          <div className="qc-col-span">
            <Field label="Material quality">
              <Segmented
                value={quote.materialQuality}
                onChange={(v) => patch({ materialQuality: v })}
                options={MATERIAL_OPTIONS}
              />
            </Field>
          </div>
          <div className="qc-col-span">
            <Field label="Notes copied from quote" hint="optional">
              <Textarea
                value={quote.notes}
                placeholder="Paste line items, allowances, or anything the bid says verbatim…"
                onChange={(e) => patch({ notes: e.target.value })}
              />
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
}
