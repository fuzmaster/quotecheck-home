import type { Quote } from "../../types/quote";
import { useWizardStore } from "../../store/useWizardStore";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Textarea } from "../ui/Textarea";
import { Button } from "../ui/Button";

const toNumber = (value: string) => (value === "" ? 0 : Number(value));

export function QuoteCard({ quote, index }: { quote: Quote; index: number }) {
  const updateQuote = useWizardStore((s) => s.updateQuote);
  const removeQuote = useWizardStore((s) => s.removeQuote);
  const count = useWizardStore((s) => s.quotes.length);
  const patch = (p: Partial<Quote>) => updateQuote(quote.id, p);

  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-black">Quote {index + 1}</h3>
        <Button variant="secondary" disabled={count <= 2} onClick={() => removeQuote(quote.id)}>
          Remove
        </Button>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <label className="space-y-2 text-sm font-semibold">
          Contractor name
          <Input
            value={quote.contractorName}
            onChange={(e) => patch({ contractorName: e.target.value })}
          />
        </label>
        <label className="space-y-2 text-sm font-semibold">
          Total price
          <Input
            type="number"
            value={quote.totalPrice || ""}
            onChange={(e) => patch({ totalPrice: toNumber(e.target.value) })}
          />
        </label>
        <label className="space-y-2 text-sm font-semibold">
          Deposit amount
          <Input
            type="number"
            value={quote.depositAmount || ""}
            onChange={(e) => patch({ depositAmount: toNumber(e.target.value) })}
          />
        </label>
        <label className="space-y-2 text-sm font-semibold">
          Timeline days
          <Input
            type="number"
            value={quote.timelineDays || ""}
            onChange={(e) => patch({ timelineDays: toNumber(e.target.value) })}
          />
        </label>
        <label className="space-y-2 text-sm font-semibold">
          Material quality
          <Select
            value={quote.materialQuality}
            onChange={(e) => patch({ materialQuality: e.target.value as Quote["materialQuality"] })}
          >
            <option value="not_sure">Not sure</option>
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </Select>
        </label>
        <label className="space-y-2 text-sm font-semibold md:col-span-3">
          Notes copied from quote
          <Textarea value={quote.notes} onChange={(e) => patch({ notes: e.target.value })} />
        </label>
      </div>
    </div>
  );
}
