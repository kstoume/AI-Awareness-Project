# AI Awareness Project

React and Vite website for the AI Awareness Project Facebook archive. It contains **147** substantial Facebook posts dated on or before November 17, 2026, with available attached media and source links. The export also contained entries with timestamps after November 17, 2026; those were excluded pending review. Shared links without substantive post text were not converted into articles. Categories were automatically inferred and should be reviewed before public launch.

## Local development

Install Node.js 20.19 or newer, then install dependencies and start the Vite development server:

```sh
npm install
npm run dev
```

Create and preview a production build:

```sh
npm run build
npm run preview
```

## Deploy with Cloudflare Pages

Connect this GitHub repository to Cloudflare Pages, select `main` as the production branch, and configure:

- Framework preset: **Vite**
- Build command: `npm run build`
- Build output directory: `dist`

Configure custom domains in Cloudflare Pages after the first successful deployment. Avoid changing email-related DNS records (MX, SPF, DKIM) unnecessarily.

## Editing
- `posts.json` is the source archive imported by the React app.
- Static images and videos are served from `public/assets` and `public/media`.
- Category choices were made by keyword matching, not from verified Facebook metadata.
- The original Facebook export includes some mojibake; common UTF-8 misdecoding was repaired.
- Avoid publishing private or copyrighted third-party media without reviewing permissions.
- Fact-check time-sensitive claims before publishing.

## Visual identity
This edition uses the original AI Awareness Project circular logo and Facebook cover image supplied by the project owner. The homepage uses a cleaner editorial layout with navy, white, and gold branding.
