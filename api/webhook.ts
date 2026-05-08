import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "node:crypto";
import Stripe from "stripe";
export const config = { api: { bodyParser: false } };
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-02-24.acacia" }) : null;
async function readRawBody(req: VercelRequest): Promise<Buffer> { const chunks: Buffer[] = []; for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)); return Buffer.concat(chunks as unknown as readonly Uint8Array[]); }
function issueSignedFulfillmentToken(reportId: string, sessionId: string) {
  const secret = process.env.PREMIUM_TOKEN_SECRET;
  if (!secret) throw new Error("Missing PREMIUM_TOKEN_SECRET.");
  const payload = Buffer.from(JSON.stringify({ reportId, sessionId, paid: true, source: "stripe_webhook", exp: Date.now() + 1000 * 60 * 60 * 24 * 30 })).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!stripe) return res.status(500).json({ error: "Stripe is not configured." });
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) return res.status(500).json({ error: "Missing webhook secret." });
  const signature = req.headers["stripe-signature"];
  if (!signature || Array.isArray(signature)) return res.status(400).json({ error: "Missing Stripe signature." });
  const rawBody = await readRawBody(req);
  let event: Stripe.Event;
  try { event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret); } catch { return res.status(400).json({ error: "Invalid webhook signature." }); }
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const reportId = session.client_reference_id ?? session.metadata?.reportId;
    if (session.payment_status === "paid" && reportId && session.id) {
      const token = issueSignedFulfillmentToken(reportId, session.id);
      console.log(JSON.stringify({ fulfilled: true, reportId, sessionId: session.id, tokenIssued: Boolean(token) }));
    }
  }
  return res.status(200).json({ received: true });
}
