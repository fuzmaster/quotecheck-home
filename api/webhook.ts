import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

export const config = { api: { bodyParser: false } };

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

async function readRawBody(req: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks as unknown as readonly Uint8Array[]);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!stripe) return res.status(500).json({ error: "Stripe is not configured." });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) return res.status(500).json({ error: "Missing webhook secret." });

  const signature = req.headers["stripe-signature"];
  if (!signature || Array.isArray(signature)) {
    return res.status(400).json({ error: "Missing Stripe signature." });
  }

  const rawBody = await readRawBody(req);
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return res.status(400).json({ error: "Invalid webhook signature." });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const reportId = session.client_reference_id ?? session.metadata?.reportId ?? null;
    const sessionId = session.id ?? null;

    // MVP fulfillment happens on-demand in /api/verify-session.ts after the client returns
    // with a session_id. We do not issue unlock tokens in this webhook because there is no
    // persistence layer yet.
    console.log(JSON.stringify({ fulfilled: true, reportId, sessionId }));
  }

  return res.status(200).json({ received: true });
}
