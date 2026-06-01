import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { enforceOrigin } from "./_lib/origin";

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!enforceOrigin(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!stripe) return res.status(500).json({ error: "Stripe is not configured." });

  const appUrl = process.env.APP_URL;
  if (!appUrl) return res.status(500).json({ error: "Server is not configured." });

  const priceId = process.env.STRIPE_PRICE_ID ?? process.env.VITE_STRIPE_PRICE_ID;
  if (!priceId) return res.status(500).json({ error: "Server is not configured." });

  const { reportId } = (req.body ?? {}) as { reportId?: string };
  if (!reportId || typeof reportId !== "string" || reportId.length > 64) {
    return res.status(400).json({ error: "Invalid reportId." });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: appUrl,
      client_reference_id: reportId,
      metadata: { reportId },
    });
    return res.status(200).json({ url: session.url });
  } catch {
    return res.status(502).json({ error: "Could not start checkout." });
  }
}
