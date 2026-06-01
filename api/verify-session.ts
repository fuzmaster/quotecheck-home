import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "node:crypto";
import Stripe from "stripe";
import { enforceOrigin } from "./_lib/origin";

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

function signToken(payload: object): string | null {
  const secret = process.env.PREMIUM_TOKEN_SECRET;
  if (!secret) return null;
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${signature}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!enforceOrigin(req, res)) return;
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  if (!stripe) return res.status(500).json({ error: "Stripe is not configured." });

  const sessionId = String(req.query.session_id ?? "");
  const reportId = String(req.query.report_id ?? "");
  if (!sessionId || !reportId || sessionId.length > 200 || reportId.length > 64) {
    return res.status(400).json({ error: "Invalid request." });
  }

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return res.status(404).json({ error: "Session not found." });
  }

  const paid = session.payment_status === "paid";
  const matchesReport =
    session.client_reference_id === reportId || session.metadata?.reportId === reportId;
  if (!paid || !matchesReport) {
    return res.status(403).json({ error: "Session not fulfilled for this report." });
  }

  const token = signToken({
    reportId,
    sessionId,
    paid: true,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 30,
  });
  if (!token) {
    return res.status(500).json({ error: "Server is not configured." });
  }
  return res.status(200).json({ token });
}
