import { Card } from "../ui/Card";
import { Icon } from "../ui/Icon";

/**
 * Placeholder card for the future premium report packet.
 *
 * The Stripe Checkout flow (`/api/create-checkout-session`, `/api/verify-session`)
 * and the signed-token plumbing remain in the repo, but the unlock UI is intentionally
 * disabled for launch: the previous "premium" content was just generic advice bullets
 * shipped in the client bundle, which made the paywall theater. Re-enable when a real
 * server-rendered premium artifact exists (e.g. a generated PDF packet returned only
 * after token verification).
 */
export function PremiumReportLock(_props: { reportId: string }) {
  return (
    <Card className="print-card">
      <span className="qc-eyebrow">Coming soon</span>
      <h2 className="qc-section-title" style={{ marginTop: 8, marginBottom: 14 }}>
        Premium report packet
      </h2>
      <div className="qc-premium">
        <div className="qc-row qc-gap-3" style={{ alignItems: "flex-start", gap: 13 }}>
          <span className="qc-premium-icon">
            <Icon.lock />
          </span>
          <div>
            <p style={{ fontSize: 14, color: "var(--body)", margin: 0, maxWidth: "60ch", lineHeight: 1.55 }}>
              A printable PDF packet, contractor email templates, and a deeper red-flag
              walkthrough are in the works. The free comparison and questions above are the
              full tool today — nothing is gated behind a paywall.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
