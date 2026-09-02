# Frontend Rebuild Changelog

## What changed

| Area | Change | Why |
| --- | --- | --- |
| Architecture | Replaced static HTML pages with React + TypeScript + Vite | Establish a maintainable app foundation for future backend and feature work |
| Navigation | Added responsive desktop/mobile navigation and SPA routes | Support all screen sizes and clear service discovery |
| Home | Rebuilt the landing page around the three actual company service lines | Remove generic template content and communicate the business immediately |
| Engineering | Added municipal approvals, drawings, structural, P.Eng., mechanical, electrical, and HVAC sections | Reflect the actual engineering consultation scope |
| Environmental | Added dedicated Phase I and Phase II ESA experience | Make environmental consulting a first-class service instead of an afterthought |
| Real Estate | Added dedicated property service and technical due-diligence positioning | Present the third service line while keeping professional scopes distinct |
| Careers | Added job listing, department filters, job-detail routes, and application UI | Establish the full frontend flow before backend implementation |
| Applications | Added resume selection and candidate form with explicit prototype state | Show realistic UX without falsely claiming data is stored or transmitted |
| Contact | Added project-intake form with explicit frontend-only behavior | Prepare the future lead workflow safely |
| About | Added company operating principles and a structured leadership area | Avoid fabricated credentials while leaving a professional place for verified biography |
| Assets | Moved and renamed existing images into `public/assets` | Give source imagery clear semantic names and remove root-level clutter |
| Responsive design | Added desktop, tablet, mobile, narrow-phone, and reduced-motion handling | Avoid desktop-first breakage and make the site usable across screen sizes |
| Deployment | Added Netlify SPA redirect | Keep deep React routes functional when deployed |

## Intentionally not implemented yet

- Backend/API
- Authentication or admin job-posting console
- Persistent job postings
- Persistent applications or resume uploads
- Email delivery
- Persistent contact submissions
- CMS
- Verified company contact details or professional credential claims

## Verification performed in this environment

- TypeScript syntax parsing passed for all 21 TypeScript/TSX source files.
- All referenced local image assets were verified to exist.
- A full `npm install` / production build could not be executed because this execution environment could not resolve `registry.npmjs.org` (`EAI_AGAIN`). The project includes normal npm configuration and `npm run check` for lint + production build once dependencies are available.
