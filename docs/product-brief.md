# QuoteCheck Home Product Brief

## Executive Summary

QuoteCheck Home is a guided one-page homeowner tool that helps users compare contractor quotes without relying on PDF parsing, OCR, handwriting recognition, or automated legal judgments.

The MVP uses structured manual entry for quote details including price, labor, materials, permits, cleanup, warranty, timeline, deposit, and notes. The output is a risk-focused comparison report with conservative wording, missing-scope warnings, and contractor follow-up questions.

## Definition of Done

1. A user can manually enter at least 2 and up to 5 contractor quotes.
2. The app generates a report with quote spread, missing-scope warnings, deposit/timeline/warranty flags, and at least 5 copy-paste contractor questions.
3. The report includes visible liability disclaimers, print-to-PDF support, and a premium report unlock flow.

## Required Risk Controls

- Do not use OCR or PDF parsing for the MVP.
- Do not claim contractor fraud detection.
- Do not provide legal, engineering, insurance, construction, financial, or professional advice.
- Use conservative labels: Missing Information, Needs Clarification, Higher Risk, Ask Before Signing.

## Quote Spread Math

- With exactly 2 quotes, omit median entirely.
- With exactly 2 quotes, use the lower quote as the 0% baseline.
- Percentage spread = `(highest - lowest) / lowest * 100`.
- With 3 or more quotes, show median.
