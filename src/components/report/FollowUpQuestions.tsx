import { useState } from "react";
import { Card } from "../ui/Card";
import { Icon } from "../ui/Icon";

export function FollowUpQuestions({ questions }: { questions: string[] }) {
  const [copied, setCopied] = useState(false);
  const qs = questions.slice(0, 10);

  function copyAll() {
    const text = qs.map((q, i) => `${i + 1}. ${q}`).join("\n");
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Card className="print-card">
      <div className="qc-row qc-between qc-wrap qc-gap-3" style={{ marginBottom: 18 }}>
        <div>
          <span className="qc-eyebrow">Send before you pay</span>
          <h2 className="qc-section-title" style={{ marginTop: 8 }}>
            Copy-paste contractor questions
          </h2>
        </div>
        <button className="qc-copy-all no-print" onClick={copyAll} type="button">
          {copied ? <Icon.check fill="" /> : <Icon.copy fill="" />}
          {copied ? "Copied" : "Copy all"}
        </button>
      </div>
      <div>
        {qs.map((q, i) => (
          <div key={`${q}-${i}`} className="qc-q">
            <span className="qn">{i + 1}</span>
            <span className="qt">{q}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
