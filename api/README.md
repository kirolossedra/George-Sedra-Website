# George Sedra API

Hono API prepared for Cloudflare Workers with Cloudflare D1 as the relational database. The frontend is intentionally not connected to this API yet.

## Implemented domains

### Public API

- `GET /api/health`
- `GET /api/v1/jobs`
- `GET /api/v1/jobs/:slug`
- `POST /api/v1/applications` — JSON is supported; multipart applications can include a resume once R2 is bound
- `POST /api/v1/contact-requests`
- `POST /api/v1/project-inquiries`

### Admin API

All `/api/v1/admin/*` routes require `Authorization: Bearer <ADMIN_API_TOKEN>`.

- CRUD lifecycle for job postings (`DELETE` archives rather than hard-deletes)
- List applications, inspect one application with status history, and move it through human-review statuses with optional notes
- Download a stored resume once R2 is connected
- List contact requests and project inquiries
- Update request/inquiry statuses

There is deliberately no applicant scoring, ranking, or automatic rejection. The backend stores and organizes applications for human review.

## Database

Schema: `api/migrations/0001_initial.sql`

The optional `api/seed/prototype_jobs.sql` mirrors the current frontend prototype roles but keeps them as `draft`. It is deliberately outside the migration directory so production migration commands cannot accidentally create fake openings.

## Cloudflare linking — deliberately deferred

No real Cloudflare account/database IDs or secrets are committed. `wrangler.jsonc` contains only a zero UUID placeholder plus the planned local binding names.

When ready to link:

1. Install dependencies.
2. Authenticate Wrangler with Cloudflare.
3. Create/bind the D1 database and replace the zero UUID placeholder in `wrangler.jsonc`.
4. Optionally create/bind the R2 resume bucket.
5. Set `ADMIN_API_TOKEN` as a Worker secret.
6. Apply migrations.
7. Deploy the Worker.
8. Connect the React frontend to the deployed API in a separate step.

## Local commands after dependencies are installed

```bash
npm run api:typecheck
npm run api:migrate:local
npm run api:seed:local   # optional prototype data
npm run api:dev
```

Migration commands are intentionally not hardcoded against a production database until the Cloudflare binding exists.
