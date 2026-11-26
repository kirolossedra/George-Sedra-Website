# GS Engineering

React/Vite company website with a Hono backend prepared for Cloudflare Workers and Cloudflare D1.

## Current architecture

```text
React + TypeScript + Vite (frontend)
              |
              | API connection is intentionally deferred
              v
Hono API on Cloudflare Workers (implemented, not yet authorized/deployed)
              |
              +--> Cloudflare D1
                   - jobs
                   - applications
                   - base64 resumes
                   - contact requests
                   - project inquiries
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
- Base64 resume persistence in D1
- Contact request persistence
- Structured project inquiry persistence
- Admin job-posting lifecycle
- Admin application/request review workflows
- D1 migrations
- Bearer-protected admin routes

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

- Company name, contact details and navigation: `src/data/site.ts`
- Page copy: `src/data/pages/*.ts`
- Temporary frontend job data: `src/data/jobs.ts`
- Website images: `src/data/media.ts` (see below)
- Backend: `api/src`
- D1 schema: `api/migrations/0001_initial.sql`
- Cloudflare config template: `wrangler.jsonc`
- Frontend routes: `src/App.tsx`

## Visual system

Styles are plain CSS, loaded through `src/styles/index.css` in this order:

| File | Contents |
| --- | --- |
| `tokens.css` | Colours, type scale, spacing, layout widths and the `@font-face` rule. Change design values here only. |
| `base.css` | Element defaults, typographic role classes (`t-display`, `t-h1`…`t-label`), focus and reduced-motion handling. |
| `layout.css` | Container, sections, header, mobile menu and footer. |
| `components.css` | Buttons, links, page header, image frames, notices, lists and form controls. |
| `pages.css` | Page-specific compositions. |

Layouts switch to a 12-column grid at `64rem`; the full desktop navigation appears at `68rem`.

The typeface is [Archivo](https://github.com/Omnibus-Type/Archivo) (SIL Open Font License, see `public/fonts/OFL-Archivo.txt`), self-hosted as a Latin variable font in `public/fonts/`.

## Images

Pages never reference image files directly. Each image position is a named slot (`MediaSlotId` in `src/media/types.ts`) rendered by `src/components/MediaImage.tsx`. The default asset for every slot, including its alt text, crop rectangle, caption and credit, is defined in `src/data/media.ts`.

To replace images without code changes later, load slot data from an API and pass it to `MediaProvider` in `src/main.tsx`:

```tsx
<MediaProvider overrides={{ 'about.portrait': { src, alt, width, height } }}>
```

Slots that are not overridden fall back to the defaults. Crops are stored in source-image pixels, which is the format an image-cropping admin tool would produce.

Several current images are Google Maps and Street View screen captures. Their crops hide the map interface, and their credit lines keep the Google attribution visible. They should be replaced with original photography or properly licensed imagery.
