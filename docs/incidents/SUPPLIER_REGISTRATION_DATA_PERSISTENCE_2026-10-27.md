# Supplier Registration Persistence Incident — 2026-10-27

## Status at investigation time

**Classification: PARTIALLY_FIXED — root cause confirmed; remediation is on a review branch and has not been deployed.** Production persistence must not be considered repaired until the migration is applied, the matching application is deployed through the approval process, and a test registration is verified in the same Supabase project.

## Production evidence

- Latest inspected Vercel production deployment: `dpl_HkuQa7fkNC8n1zzLwV4vZqqnV8H8`.
- Deployment source ref/SHA: `main` / `1e24c680074aa07cee9ddef3f3dbf10838d1bf1f`.
- The deployed page submits to `POST /api/suppliers`. The repository has no `/api/supplier-registration` or `/api/supplier-leads` route; those are not the current form endpoint.
- Production environment contains `SUPABASE_URL` and `SUPABASE_ANON_KEY`. The URL matches the inspected Supabase project, and the configured key matches its active legacy anon key. No key values are recorded here.
- Supabase project `uiekcrowevzkybqrcloj` contains `public.suppliers` with RLS enabled. No `supplier_leads` table was found in the public schema.
- The existing policy `supplier_public_insert_with_consent` allowed the `anon` role only when `company_name` had at least 2 characters, `business_type` at least 1, and `governorate` at least 2. The live form marks those fields optional and the API sends empty strings/null when they are omitted.
- Independent privilege inspection also showed `anon` does **not** have table-level `INSERT` permission on `public.suppliers`. It has no `SELECT`, `UPDATE`, or `DELETE` permission either. This is why having an RLS INSERT policy was not enough to make inserts work.
- Vercel's grouped production errors show `Supplier registration insert failed { status: 401 }` **15 times** on `/api/suppliers` over the inspected seven-day window, from 2026-10-25 17:41 UTC to 2026-10-27 13:46 UTC.

## Root cause

The registration path reaches the correct API and Supabase project, but the database write is denied. The database role used by the API has no INSERT grant, and the existing RLS predicate contradicts the optional-first form contract. These are database privilege/policy defects, not a success-message-only or form-fetch-path issue.

## Remediation in this branch

1. Add a database migration that adds a unique nullable `submission_id` for idempotent retries, grants the public anon role **INSERT only**, and recreates the INSERT policy around the actual required form contract. It does not grant read, update, or delete access.
2. Make the API require a valid submission UUID, bound request bodies to 16 KiB, require the WhatsApp field the UI marks required, and use PostgREST `resolution=ignore-duplicates` on the unique submission key.
3. Keep the current UI rule that success is shown only after an HTTP-success response; reuse the same submission key on retry and reset it after a successful save or a changed form.

## Verification plan and gate

After review/approval, apply `supabase/migrations/20261027180000_fix_supplier_registration_insert_policy.sql` to the intended Supabase project, then deploy the matching application commit through the approved process. Verify:
- `anon` can INSERT a valid synthetic registration but cannot SELECT, UPDATE, or DELETE supplier rows;
- missing WhatsApp/consent, malformed submission UUID, and oversized bodies are rejected without an inserted row;
- submitting the same `submission_id` twice produces one row and a success response for the retry;
- the public deployed form returns success only after the database accepted or idempotently recognized that submission;
- a query by the synthetic `submission_id` confirms the persisted row; then remove the synthetic record using an authorized administrative path and confirm it is gone.

**Not yet verified:** migration execution, CI/build on the remediation branch, successful insert using the new policy, repeated-request behavior against Supabase, or a successful submission from the public deployed page. No live test record was inserted and no production database policy or deployment was changed during this investigation.
