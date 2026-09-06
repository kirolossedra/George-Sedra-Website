# Backend Implementation Notes — 2026-09-06

## Scope completed

Added a Hono API prepared for Cloudflare Workers with Cloudflare D1 as the sole persistence layer. The existing React frontend is intentionally still disconnected; Cloudflare authorization/resource binding and frontend API linking are the next phase.

## Backend domains

- Job postings: public published-job reads plus admin create/update/archive lifecycle.
- Job applications: persistence, base64 resume storage, human-review statuses, status history, and admin retrieval.
- Contact requests: persistence, admin listing, and status workflow.
- Project inquiries: structured persistence, admin listing, and status workflow.
- Admin protection: bearer token from a Cloudflare Worker secret; no credential is committed.

## Resume design

- Resumes are submitted as base64 in the application JSON payload.
- Resume base64 is stored in D1 in `application_resumes`, separate from `job_applications`.
- Listing and detail queries return resume metadata only; the large encoded payload is fetched only by the protected resume-download endpoint.
- PDF, DOC, and DOCX are accepted.
- The decoded file is capped at 1 MB so base64 expansion remains safely below D1's row-size ceiling.
- Basic file signatures are checked against the declared content type.
- There is no R2 or bucket dependency.

## Design boundaries

- Prototype job seed data is outside `api/migrations`, so a production migration cannot accidentally publish or create fake openings.
- Public application responses do not echo applicant PII.
- Jobs are archived rather than hard-deleted.
- Applicant ranking/scoring/automatic rejection is deliberately absent. Application states support human review rather than replacing the hiring decision.

## Validation

- D1 schema remains the only persistent-storage dependency.
- No R2 binding or bucket configuration remains.
- No real Cloudflare database ID or admin secret is present in the repository.
- TypeScript source was syntax-checked after the base64-storage change.

## Next phase

Cloudflare authorization and D1 binding only: authenticate Wrangler, create/bind D1, set the admin secret, apply migrations, deploy the Worker, then connect the React frontend to the deployed API.

## Suggested commit

`fix: store application resumes as base64 in D1`
