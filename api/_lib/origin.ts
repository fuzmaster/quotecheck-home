import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Build the allowlist of origins permitted to call our /api/* routes from the browser.
 * - Production: APP_URL only (the real domain).
 * - Preview/Development: APP_URL plus localhost dev ports.
 *
 * Stripe webhooks call us server-to-server with no Origin header, so this only
 * affects browser-originated cross-origin requests.
 */
function allowedOrigins(): string[] {
  const list: string[] = [];
  if (process.env.APP_URL) list.push(process.env.APP_URL);
  if (process.env.VERCEL_ENV !== "production") {
    list.push("http://localhost:5173", "http://localhost:5181", "http://127.0.0.1:5181");
  }
  return list;
}

/**
 * Validate the request's Origin header against the allowlist and set the matching
 * Access-Control-Allow-Origin response header. Returns false if the request must
 * be rejected; the caller should already have sent a response in that case.
 *
 * Requests with no Origin header (curl, same-origin in some browsers, server-to-server)
 * are allowed through — CORS only governs cross-origin browser requests.
 */
export function enforceOrigin(req: VercelRequest, res: VercelResponse): boolean {
  const origin = req.headers.origin;
  if (!origin) return true; // same-origin or non-browser caller

  const allowed = allowedOrigins();
  if (!allowed.includes(origin)) {
    res.status(403).json({ error: "Origin not allowed." });
    return false;
  }
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Vary", "Origin");
  return true;
}
