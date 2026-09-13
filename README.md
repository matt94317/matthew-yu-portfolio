# Matthew Yu — Portfolio

Personal portfolio for Matthew Yu, software engineer in Brisbane. Built with **React 19 + TypeScript + Vite 8**, styled with **Tailwind CSS v4**, animated with **Framer Motion**, and deployed on **Vercel**.

Live site: https://matthew-yu-portfolio.vercel.app

## Highlights

- Animated hero with a looping ambient video (generated with Higgsfield), a canvas particle network and a cursor spotlight
- Typewriter role cycling, staggered name reveal, magnetic buttons and 3D-tilt project cards with glare
- Scroll-triggered section reveals, animated stat counters and a timeline that draws itself as you scroll
- Project case-study modals, filterable skills with "used in" tooltips, logo marquee
- Fully responsive (phone → desktop), keyboard accessible, honours `prefers-reduced-motion`
- SEO: Open Graph image, JSON-LD person schema, sitemap and robots

## Editing content

All copy lives in `src/data/` — no component changes needed for routine updates:

| File | What it controls |
| --- | --- |
| `src/data/profile.ts` | Name, roles, tagline, bio, quick facts, contact links, hero stats |
| `src/data/projects.ts` | Featured + coursework projects (case-study text, stack, cover image, links) |
| `src/data/skills.ts` | Skill categories, icons and which projects each skill was used in |
| `src/data/experience.ts` | Work/education timeline and awards |

Images live in `public/images/`, the hero video in `public/videos/`, and the downloadable CV at `public/Matthew_Yu_CV.pdf` (replace the file to update the download).

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # preview the production build
```

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which type-checks and builds the site, then deploys it to Vercel with the Vercel CLI (`vercel deploy --prod`). The only configuration is the `VERCEL_TOKEN` repository secret (Vercel account token). The production URL is printed in the workflow's job summary.

To deploy manually from your machine instead: `npx vercel deploy --prod`.

## Project structure

```
src/
  components/      # Nav, Hero, Stats, About, Skills, Projects, Experience, Contact, Footer
  components/ui/   # ParticleField, CursorGlow, TiltCard, Magnetic, Typewriter, Marquee, Reveal, Loader, BackToTop
  data/            # All site content
  hooks/           # useActiveSection, useMediaQuery
  index.css        # Tailwind v4 theme tokens + global styles
```
