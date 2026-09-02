# George Sedra Consulting — React Frontend

A complete React/Vite frontend rebuild of the original static website.

## Current scope

- Responsive company website for Engineering, Environmental, and Real Estate services
- Engineering page covering municipal applications, structural/drawings, P.Eng. review/stamping, mechanical, electrical, and HVAC coordination
- Environmental Phase I / Phase II service page
- Real Estate service page
- Careers page with department filters
- Job detail routes
- Frontend-only application form with resume selection UI
- About and frontend-only Contact page
- Existing source images reorganized under `public/assets`

## Important prototype limitations

There is no backend. Career applications and contact forms intentionally do not transmit or persist data. Sample job postings are clearly identified as prototype content. Phone/email/service-area values in `src/data/site.ts` are placeholders and should be replaced with verified company information.

## Development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run check
```

## Main customization points

- Company contact information: `src/data/site.ts`
- Job postings: `src/data/jobs.ts`
- Global visual system: `src/styles/global.css`
- Routes: `src/App.tsx`
