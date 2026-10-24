# KVRAT.ai — Temporary Supplier Lead Storage

## Purpose
The supplier form sends only the minimum contact information to a private Supabase table. No supplier personal data is committed to GitHub or written to the application filesystem. This is a temporary central intake store until a full supplier CRM/backend is adopted.

## Required Vercel environment variables
Set these for the **kvr-web** deployment (Production and Preview as appropriate):
- `SUPABASE_URL`: the Supabase project URL.
- `SUPABASE_SERVICE_ROLE_KEY`: the Supabase service-role secret. Server-side only; never use a `NEXT_PUBLIC_` prefix and never commit it to Git.

## Database setup
1. Create or select a private Supabase project.
2. Open its SQL Editor.
3. Run the SQL in `docs/operations/supplier-leads-schema.sql`.
4. Add both environment variables in Vercel.
5. Redeploy the `kvr-web` application so the server route can read the variables.

## Data collected
Required: responsible person's name, company/factory name, phone number, consent to use the data for follow-up.
Optional: business type, governorate, product categories, and separate consent for further contact.
The API stores a creation timestamp and status (`new` by default). It does not store the optional form fields that are not collected in this simplified version.

## Retrieval and access
Review records in Supabase Table Editor, table `supplier_leads`. Restrict project access to authorized administrators. Row Level Security is enabled and no public read/write policies are created; the server route uses the service-role key only on the server.

## Important status
Code is prepared, but central saving will not work until the Supabase project/table and Vercel environment variables are configured and the updated deployment is successful. The API intentionally returns a clear unavailable message instead of pretending that a submission was saved. Before public launch, publish a proper privacy notice, define retention/deletion procedures, and add rate limiting or bot protection.
