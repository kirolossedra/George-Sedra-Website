# George Sedra Consulting

React/Vite company website with a Hono backend prepared for Cloudflare Workers and Cloudflare D1.

## Current architecture

```text
React + TypeScript + Vite (frontend)
              |
              | API connection is intentionally deferred
              v
Hono API on Cloudflare Workers (implemented, not yet authorized/deployed)
              |
              +--> Cloudflare D1 (jobs, applications, inquiries)
              +--> Cloudflare R2 (resume files; code ready, binding deferred)
```

## Frontend scope

- Responsive company website for Engineering, Environmental, and Real Estate services
- Engineering page covering municipal applications, structural/drawings, P.Eng. review/stamping, mechanical, electrical, and HVAC coordination
- Environmental Phase I / Phase II service page
- Real Estate service page
- Careers page with department filters
- Job detail routes
- Application and contact interfaces
- About page

The frontend still uses local prototype data and local-only form behavior until the API-linking phase.

## Backend scope

The Hono backend is under `api/` and includes:

- Public published-job retrieval
- Job application persistence
- Contact request persistence
- Structured project inquiry persistence
- Admin job-posting lifecycle
- Admin application/request review workflows
- D1 migrations
- Bearer-protected admin routes
- R2-ready resume upload/download code

See `api/README.md` for the API route inventory and the later Cloudflare-linking procedure.

## Development

```bash
npm install
npm run dev
```

When Cloudflare is linked later:

```bash
npm run api:dev
```

## Quality checks

```bash
npm run check
npm run api:typecheck
```

or:

```bash
npm run check:all
```

## Main customization points

- Company contact information: `src/data/site.ts`
- Temporary frontend job data: `src/data/jobs.ts`
- Backend: `api/src`
- D1 schema: `api/migrations/0001_initial.sql`
- Cloudflare config template: `wrangler.jsonc`
- Global visual system: `src/styles/global.css`
- Frontend routes: `src/App.tsx`
