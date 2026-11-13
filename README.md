# Vaishnav R — Portfolio

An accessible, responsive portfolio for Vaishnav R, built with React, TypeScript, Vite, Framer Motion and Lucide.

## Local development

```bash
npm install
npm run dev
```

Build for production with `npm run build`, then preview it with `npm run preview`.

## Personalization

Edit the data files in `src/data/` to add verified experience, projects, education, certifications, and contact details. The resume button is intentionally inactive until a real resume is placed at `public/vaishnav-r-resume.pdf`.

The contact form currently provides a clear local success state and does not claim to send messages. To make it live, add `VITE_CONTACT_ENDPOINT` in a local `.env` file and wire that endpoint to a service such as Resend.

## Deploy

Push the repository to GitHub, import it into Vercel, keep the build command as `npm run build`, and set the output directory to `dist`. Vercel will use the included SPA rewrite.
