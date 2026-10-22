# Shairy Achwan · Cinematic Portfolio

Personal portfolio for Shairy Achwan, Cyber Security Engineer (web, API, mobile, AI & LLM penetration testing).

Built with React + TypeScript + Vite, Tailwind CSS v4, GSAP + ScrollTrigger and Lucide icons.

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check and production build into dist/
npm run lint
```

## Notes

- All copy lives in `src/content.ts` and comes only from Shairy's resume. Edit there, not in components.
- `public/media/shairy-walk.mp4` / `.webm` is the supplied walking video, chroma-keyed from its green screen onto pure white so it blends into the hero. The original audio (footsteps, no speech) is kept and starts muted behind a sound toggle.
- `public/media/shairy-still.jpg` is the static fallback used for reduced motion or when playback fails.
- The build uses a relative base (`./`), so `dist/` can be hosted from any path.
