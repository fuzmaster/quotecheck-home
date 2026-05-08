import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
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
    } catch (error) {
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
      <h2 className="text-2xl font-black">Premium report section</h2>
      {unlocked ? (
        <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-950">
          <p className="font-black">Unlocked</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Save this report as a PDF for family review.</li>
            <li>Send the contractor questions before signing.</li>
            <li>Ask for written clarification on every missing-information item.</li>
            <li>Do not pay a large deposit until the written scope is clear.</li>
          </ul>
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-slate-200 p-4">
          <p className="text-sm text-slate-600">
            Unlock the clean premium report packet for printing, family review, and contractor
            follow-up. Development mode falls back to a local mock unlock if Stripe is not
            configured.
          </p>
          <Button className="mt-4" disabled={loading} onClick={unlockWithStripe}>
            {loading ? "Opening checkout..." : "Unlock report"}
          </Button>
          {error && <p className="mt-2 text-sm font-bold text-red-600">{error}</p>}
        </div>
      )}
    </Card>
  );
}
