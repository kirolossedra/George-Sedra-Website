# George Sedra API

Hono API prepared for Cloudflare Workers with Cloudflare D1 as the database. The frontend is intentionally not connected to this API yet.

## Implemented domains

### Public API

- `GET /api/health`
- `GET /api/v1/jobs`
- `GET /api/v1/jobs/:slug`
- `POST /api/v1/applications` — JSON body including the resume as base64
- `POST /api/v1/contact-requests`
- `POST /api/v1/project-inquiries`

### Admin API

All `/api/v1/admin/*` routes require `Authorization: Bearer <ADMIN_API_TOKEN>`.

- CRUD lifecycle for job postings (`DELETE` archives rather than hard-deletes)
- List applications, inspect one application with status history, and move it through human-review statuses with optional notes
- Download a resume reconstructed from its base64 value stored in D1
- List contact requests and project inquiries
- Update request/inquiry statuses

There is deliberately no applicant scoring, ranking, or automatic rejection. The backend stores and organizes applications for human review.

## Resume storage

Resume files are stored in D1 as base64 in a separate `application_resumes` table rather than in the main application row. Public application responses and admin application lists expose only resume metadata, never the base64 payload.

Accepted file types:

- PDF
- DOC
- DOCX

Maximum decoded resume size: **1 MB**.

The limit is intentionally below Cloudflare D1's per-row limit because base64 expands the original binary data and the encoded value must remain safely within a D1 row.

## Database

Schema: `api/migrations/0001_initial.sql`

The optional `api/seed/prototype_jobs.sql` mirrors the current frontend prototype roles but keeps them as `draft`. It is deliberately outside the migration directory so production migration commands cannot accidentally create fake openings.

## Cloudflare linking — deliberately deferred

No real Cloudflare account/database IDs or secrets are committed. `wrangler.jsonc` contains only a zero UUID placeholder for D1.

When ready to link:

1. Install dependencies.
2. Authenticate Wrangler with Cloudflare.
3. Create/bind the D1 database and replace the zero UUID placeholder in `wrangler.jsonc`.
4. Set `ADMIN_API_TOKEN` as a Worker secret.
5. Apply migrations.
6. Deploy the Worker.
7. Connect the React frontend to the deployed API in a separate step.

No bucket or object-storage resource is required by the current backend.

## Local commands after dependencies are installed

```bash
npm run api:typecheck
npm run api:migrate:local
npm run api:seed:local   # optional prototype data
npm run api:dev
```

Migration commands are intentionally not hardcoded against a production database until the Cloudflare binding exists.
