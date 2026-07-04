# Portfolio — Dhruv Bamal

Dark, animated single-page portfolio. React 18 + Vite + TypeScript + Tailwind CSS + Framer Motion + Lenis.

## Run

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Edit content

All copy lives in [`src/data/content.ts`](src/data/content.ts) (typed by [`src/data/types.ts`](src/data/types.ts)) — bio, projects, skills, experience, socials, email. Project images go in `public/projects/`. Swapping in a CMS later means replacing the `content` import with a fetch that returns `SiteContent`.

## Theming

Design tokens (accent color, backgrounds, fonts, display type scale) are defined once in [`tailwind.config.ts`](tailwind.config.ts). Change `accent` there to re-skin the whole site.

## Accessibility

Every animation respects `prefers-reduced-motion` (static fallbacks, Lenis and the custom cursor never initialize). All interactive elements are real links/buttons with visible focus rings; the mobile menu traps focus and closes on Escape.
