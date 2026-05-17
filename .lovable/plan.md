## Hero Section Refinement Plan

Scope: `src/routes/index.tsx` (Hero component only) and one new image asset. No other sections touched.

### 1. Remove the green scanning line
Delete the animated horizontal beam at the top of the hero:
```tsx
<div className="... animate-scan" />
```
Also remove the `@keyframes scan` / `.animate-scan` rule from `src/styles.css` since it will be unused.

The two ambient radial glow blobs and the `grid-bg` backdrop stay — user said only the running green line looks awful.

### 2. Replace the radar/orbital visual
Remove the entire right-column block: concentric spinning rings, orbiting dots, crosshair frames, HUD telemetry badges (NODE_01, LLM_CORE, 99.98% UPTIME), and the bottom grid gradient.

Replace with a generated hero image + subtle parallax/float motion:

- **Image generation**: Use `imagegen--generate_image` (standard quality, transparent background PNG, 1024×1024) saved to `src/assets/hero-visual.png`.
  - Prompt direction: an abstract cyber-industrial 3D render — a glowing neon-green (#39FF14) crystalline / geometric AI core or wireframe orb with circuit-like filaments, soft emerald rim light, deep black background, futuristic, premium, matte + glass materials. Matches the dark-mode neon aesthetic of the rest of the page.
- **Presentation**:
  - Import as ES6 asset, render inside the existing right-column container (keep current sizing `h-[480px] max-w-[520px]`) so the surrounding 2-col grid layout is unchanged.
  - Keep the soft radial neon glow behind the image for depth.
  - Add gentle motion: `animate-float` (already defined) on the image plus a mouse-move parallax using a tiny inline `useEffect` that translates the image a few pixels based on cursor position within the hero. Falls back gracefully on touch (no listener needed; default transform).
  - Keep `animate-fade-up` entrance.
  - Add descriptive `alt` text for SEO/a11y.

### 3. Files touched
- `src/routes/index.tsx` — edit `Hero` component only
- `src/styles.css` — remove `.animate-scan` + `@keyframes scan`
- `src/assets/hero-visual.png` — new generated asset

Nothing else in the hero (headline, tag pill, paragraph, CTAs, trust strip) or any other section changes.
