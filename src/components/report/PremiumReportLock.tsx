import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Icon } from "../ui/Icon";
import {
  getStoredPremiumToken,
  hasMockPremiumUnlock,
  setMockPremiumUnlock,
  storePremiumToken,
} from "../../lib/premiumToken";

export function PremiumReportLock({ reportId }: { reportId: string }) {
  const [unlocked, setUnlocked] = useState(
    Boolean(getStoredPremiumToken(reportId)) || hasMockPremiumUnlock(reportId)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function unlockWithStripe() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId }),
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Unable to start checkout.");
      }
      window.location.href = data.url;
    } catch (e) {
      if (import.meta.env.DEV) {
        setMockPremiumUnlock(reportId);
        setUnlocked(true);
        return;
      }
      setError("Checkout could not be started. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function verify() {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("session_id");
      if (!sessionId) return;
      const response = await fetch(
        `/api/verify-session?session_id=${encodeURIComponent(sessionId)}&report_id=${encodeURIComponent(reportId)}`
      );
      const data = (await response.json()) as { token?: string };
      if (data.token) {
        storePremiumToken(reportId, data.token);
        setUnlocked(true);
        window.history.replaceState({}, "", window.location.pathname);
      }
    }
    void verify();
  }, [reportId]);

  return (
    <Card className="print-card">
      <span className="qc-eyebrow">Premium</span>
      <h2 className="qc-section-title" style={{ marginTop: 8, marginBottom: 14 }}>
        Premium report section
      </h2>
      {unlocked ? (
        <div className="qc-premium unlocked">
          <Badge tone="good" dot>
            Unlocked
          </Badge>
          <ul className="qc-check-list">
            <li>
              <Icon.check fill="" /> Save this report as a PDF for family review.
            </li>
            <li>
              <Icon.check fill="" /> Send the contractor questions before signing.
            </li>
            <li>
              <Icon.check fill="" /> Ask for written clarification on every flagged item.
            </li>
            <li>
              <Icon.check fill="" /> Don't pay a large deposit until the written scope is clear.
            </li>
          </ul>
        </div>
      ) : (
        <div className="qc-premium">
          <div className="qc-row qc-gap-3" style={{ alignItems: "flex-start", gap: 13 }}>
            <span className="qc-premium-icon">
              <Icon.lock fill="" />
            </span>
            <div>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--body)",
                  margin: 0,
                  maxWidth: "60ch",
                  lineHeight: 1.55,
                }}
              >
                Unlock the clean premium report packet for printing, family review, and contractor
                follow-up. Development mode falls back to a local mock unlock if Stripe isn't
                configured.
              </p>
              <Button
                className="no-print"
                style={{ marginTop: 14 }}
                disabled={loading}
                onClick={unlockWithStripe}
              >
                <Icon.spark fill="" />
                {loading ? "Opening checkout..." : "Unlock report"}
              </Button>
              {error && <p className="qc-error qc-mt-4">{error}</p>}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
