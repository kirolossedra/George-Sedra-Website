# Backend Implementation Notes — 2026-09-06

## Scope completed

Added a Hono API prepared for Cloudflare Workers, with Cloudflare D1 as the relational store and optional R2 resume storage. The existing React frontend is intentionally still disconnected; Cloudflare authorization/resource binding and frontend API linking are the next phase.

## Backend domains

- Job postings: public published-job reads plus admin create/update/archive lifecycle.
- Job applications: persistence, resume metadata, human-review statuses, status history, and admin retrieval.
- Contact requests: persistence, admin listing, and status workflow.
- Project inquiries: structured persistence, admin listing, and status workflow.
- Resume files: multipart application support and R2 storage/download code, inactive until the R2 binding exists.
- Admin protection: bearer token from a Cloudflare Worker secret; no credential is committed.

## Design boundaries

- Prototype job seed data is outside `api/migrations`, so a production migration cannot accidentally publish or create fake openings.
- Public application responses do not echo applicant PII.
- R2 object keys are server-owned and cannot be injected by public JSON payloads.
- Jobs are archived rather than hard-deleted.
- Applicant ranking/scoring/automatic rejection is deliberately absent. Application states support human review rather than replacing the hiring decision.

## Main changed/new files

| Path | Why | Approx. size |
|---|---|---:|
| `api/src/` | Hono routes, validation, middleware, repositories, resume service | ~1,090 lines |
| `api/migrations/0001_initial.sql` | D1 relational schema and indexes | 104 lines |
| `api/seed/prototype_jobs.sql` | Optional local-only draft seed data | 43 lines |
| `wrangler.jsonc` | Local/deferred Cloudflare bindings with zero UUID placeholder | 24 lines |
| `tsconfig.api.json` | Worker/API TypeScript configuration | 15 lines |
| `package.json` | Hono/Wrangler/Workers types and API scripts | 42 lines total |
| `eslint.config.js` | Separate browser and Worker lint environments | 41 lines total |
| `README.md`, `api/README.md`, `CHANGELOG.md` | Architecture, routes, setup and change record | ~186 lines total |
| `tsconfig.node.json` | Preserves the earlier Vite build fix | 9 lines |

Total touched/new text is approximately 1,700 lines.

## Validation completed here

- API TypeScript syntax check passed with `tsc --noCheck`.
- Project TypeScript project-reference syntax check passed with `tsc -b --noCheck`.
- D1 schema and optional seed were executed successfully against SQLite 3.46.1 in-memory.
- Foreign keys/check constraints/table creation and seed inserts succeeded.
- No real Cloudflare database ID or admin secret is present in the files.

## Validation limitation

The environment could not reach the npm registry, so dependency installation timed out. Therefore a real dependency-aware `npm run lint`, `npm run build`, `npm run api:typecheck`, and Wrangler runtime smoke test could not be executed here. Those should be run immediately after `npm install` succeeds in the normal development/CI environment.

## Next phase

Cloudflare authorization and resource binding only: authenticate Wrangler, create/bind D1, optionally create/bind R2, set the admin secret, apply migrations, deploy the Worker, then connect the React frontend to the deployed API.

## Suggested commit

`feat: add Hono D1 backend for jobs applications and inquiries`
