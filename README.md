# QuoteCheck Home

> Compare contractor quotes side by side, spot missing scope items, and generate the follow-up questions to ask before you sign.

QuoteCheck Home is a free, single-page tool for homeowners who are weighing two or three contractor bids for a renovation, roof, HVAC, or other home-improvement job. You paste in what each contractor proposed, and it pulls out the differences — scope gaps, missing line items, vague terms — and gives you a printable report with the questions to bring back to each contractor.

It does not price your job, recommend contractors, or replace professional advice. It's a checklist with teeth.

**Live site:** [quotecheck.homes](https://quotecheck.homes)

## Features

- **Side-by-side bid comparison** — enter each contractor's scope and totals, see them aligned in one view
- **Scope-gap detection** — flags line items present in one bid but missing from another
- **Follow-up question generator** — produces a per-contractor list of questions based on the gaps
- **Printable report** — clean print layout for taking notes into a meeting
- **No account required** — runs entirely client-side; nothing leaves the browser unless you unlock premium

## Tech stack

- Vite + React 19 + TypeScript
- Tailwind CSS
- Zustand for wizard state
- React Hook Form + Zod for validation
- Stripe Checkout (Vercel serverless functions) for the premium unlock
- Deployed on Vercel

## Run locally

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`. Stripe routes fall back to a local mock unlock when `STRIPE_SECRET_KEY` is not configured, so the full flow works without keys.

## Build

```bash
npm run build      # type-check + production build
npm run preview    # serve the build locally
npm run typecheck  # tsc only
```

## Project structure

```
src/
  components/
    layout/     Header, Footer
    wizard/     Multi-step bid entry flow
    report/     Comparison output + print view
    ui/         Shared primitives
  store/        Zustand store
  schemas/      Zod schemas for bids
  lib/          Helpers
api/            Vercel serverless functions (Stripe)
```

## Deployment

Pushes to `main` deploy automatically via Vercel. Stripe env vars (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, price IDs) are set in the Vercel project.

## License

All rights reserved. See [jacobbritten.com](https://jacobbritten.com) for contact.

---

Built by [Jacob Britten](https://jacobbritten.com) — Media Systems Architect.
