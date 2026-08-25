# Proximux — Design Upgrade Spec

A tailored plan to make the site read as "a designer built this," grounded in your actual
components and current (2025/2026) patterns from the Vercel/Geist, Fontshare, Emil Kowalski
(motion), Josh Comeau (shadows), and Aceternity/Magic UI ecosystems.

The whole thing reduces to three levers your site is currently missing:

1. **Type contrast** — you ship one Figtree for everything, and `font-mono` is broken.
2. **Tinted depth** — your shadows are harsh black on a soft sage background.
3. **Motion restraint** — a couple of bouncy defaults undercut a senior engineering brand.

Everything below is organized so you can implement top to bottom, highest leverage first.

---

## Diagnosis (found in your code)

| Issue | Where | Why it reads as "template" |
|---|---|---|
| One typeface for heading + body | `theme.css:74-75` (`--font-syne` and `--font-dm-sans` both = Figtree) | No display/body contrast. Everything feels flat. |
| `font-mono` used but never loaded | `FeatureCard.tsx:34`, `ProcessCard`, `ProofCard`, `ServiceModal` | Metric strings fall back to the OS mono. Off-brand for an AI/eng studio. |
| Harsh black shadow on a light theme | `FeatureCard.tsx:20` `rgba(0,0,0,0.3)`, `ServiceModal.tsx:27` `rgba(0,0,0,0.5)` | Pure black desaturates the sage into dirty gray. |
| 5-step responsive type jumps | `HomePage.tsx:47` `text-3xl sm:4xl md:5xl lg:6xl xl:7xl` | Steppy, not intentional. Fluid `clamp()` reads as tuned. |
| No `text-wrap` anywhere | all headings/paragraphs | Ragged heading wraps and orphaned words. |
| Bouncy `backOut` easing | hero badge in `HomePage.tsx:36` | Overshoot bounce contradicts a calm senior brand. |
| Generic `scale: 1.05` buttons | hero CTAs, Navbar | The default Framer hover tell. |
| `setMousePos` on every mousemove | `Layout.tsx:43` | Re-renders the whole Layout subtree ~60x/sec. |
| No `prefers-reduced-motion` | everywhere | Accessibility gap and a polish tell. |
| Ad-hoc radii | `rounded-[16px]/[20px]/[24px]/2xl` mixed | No system. |

Good bones already there: house easing `[0.22, 1, 0.36, 1]`, masked word reveal
(`HeadingReveal`), the hairline bento grid (`gap-0.5` over a border-colored wrap), mouse
spotlight, radial glow blobs, `CountUp`. We build on these, not over them.

---

## 1. Typography (do this first, biggest visual delta)

### 1a. Add real type contrast: display + body + mono

Recommendation for a senior AI/engineering studio: keep **Figtree for body**, add a
**display grotesk for headings**, and load a **real mono** for metrics/code. That fixes both
diagnosed type problems with almost no component churn (your class names stay the same).

Primary pick: **Cabinet Grotesk (display) + Figtree (body) + Geist Mono (mono).**
Cabinet Grotesk is an understated modern grotesk (senior, not trendy). Alternatives:
- More headline punch: swap display to **Clash Display** (ration it to hero + H2).
- Pure "Vercel/dev-tools" look: use **Geist** for both display and body (contrast then comes
  from weight + scale + the mono pairing, the way Vercel and Linear do it).

Replace the single line in `src/styles/fonts.css`. Prefer `<link>` with preconnect in
`index.html` over `@import` (preconnect cannot happen from `@import`, which blocks render):

```html
<!-- index.html <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://api.fontshare.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800;900&family=Geist+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800&display=swap">
```

Then re-point the tokens in `src/styles/theme.css`. Note `--font-syne` now becomes the real
display face and `--font-mono` finally has a value, so every existing `font-mono` in your
components starts rendering correctly with zero edits:

```css
@theme inline {
  --font-syne:    "Cabinet Grotesk", "Figtree", sans-serif;  /* headings / display */
  --font-dm-sans: "Figtree", sans-serif;                     /* body (unchanged) */
  --font-mono:    "Geist Mono", ui-monospace, "SF Mono", Menlo, monospace;
}
```

### 1b. Fluid type scale (`clamp()`), tuned 375px to 1440px

Replace the stepped breakpoint chains with one fluid ramp. Tailwind v4 lets you attach line
height, tracking, and weight to each `text-*` token, so `class="font-syne text-display"`
carries all of it. Add to the `@theme inline` block in `theme.css`:

```css
@theme inline {
  --text-display: clamp(2.5rem, 1.80rem + 3.00vw, 4.5rem);
  --text-display--line-height: 1.02;
  --text-display--letter-spacing: -0.025em;
  --text-display--font-weight: 800;

  --text-h1: clamp(2.0625rem, 1.56rem + 2.16vw, 3.5rem);
  --text-h1--line-height: 1.05;
  --text-h1--letter-spacing: -0.02em;

  --text-h2: clamp(1.6875rem, 1.40rem + 1.22vw, 2.5rem);
  --text-h2--line-height: 1.12;
  --text-h2--letter-spacing: -0.015em;

  --text-h3: clamp(1.375rem, 1.20rem + 0.75vw, 1.875rem);
  --text-h3--line-height: 1.22;
  --text-h3--letter-spacing: -0.01em;

  --text-body-lg: clamp(1.125rem, 1.08rem + 0.19vw, 1.25rem);
  --text-body-lg--line-height: 1.55;

  --text-body: clamp(1rem, 0.96rem + 0.19vw, 1.125rem);
  --text-body--line-height: 1.62;

  --text-small: clamp(0.875rem, 0.85rem + 0.09vw, 0.9375rem);
  --text-caption: clamp(0.75rem, 0.73rem + 0.09vw, 0.8125rem);
}
```

Then the hero headline in `HomePage.tsx:47` collapses from the 5-step chain to:
`className="font-syne text-display ..."` and `CtaBand.tsx:28` becomes `text-h2`.

### 1c. Micro-typography (the part people feel but cannot name)

Add to `@layer base` in `theme.css`:

```css
@layer base {
  h1, h2, h3 { text-wrap: balance; }          /* evens heading line lengths */
  p          { text-wrap: pretty; max-width: 65ch; }  /* kills orphans, caps measure */
  .font-mono { font-variant-numeric: tabular-nums slashed-zero; }  /* aligned digits, 0 not O */
}
```

Tracking rules already baked into the tokens above: negative on display sizes, zero on body.
The one place to go **positive** is your uppercase eyebrows (the "What we engineer" pills,
`HomePage.tsx:105`): add `tracking-[0.08em]` so uppercase at small sizes breathes.

Stats (`Stat.tsx`, driven by `CountUp`): give the number `font-mono tabular-nums` so the
digits stop jittering as the counter animates and stay column-aligned.

---

## 2. Surfaces and divs (second biggest delta)

### 2a. Delete the black shadows, add a sage-tinted elevation scale

A pure-black shadow on a near-white sage card reads as grime. Tint the shadow toward a cool
desaturated green-gray and layer it (an ambient layer plus a tighter contact layer). Add to
`theme.css`:

```css
:root { --shadow-ink: 150 14% 24%; }  /* cool green-gray, not black */

@theme {
  --shadow-sm:
    0 1px 2px -1px hsl(var(--shadow-ink) / 0.05),
    0 2px 4px -1px hsl(var(--shadow-ink) / 0.05);
  --shadow-md:
    0 2px 4px -1px hsl(var(--shadow-ink) / 0.04),
    0 4px 8px -1px hsl(var(--shadow-ink) / 0.05),
    0 8px 16px -2px hsl(var(--shadow-ink) / 0.05);
  --shadow-lg:                                  /* card hover target */
    0 2px 4px -1px hsl(var(--shadow-ink) / 0.04),
    0 8px 16px -3px hsl(var(--shadow-ink) / 0.06),
    0 16px 32px -4px hsl(var(--shadow-ink) / 0.07);
  --shadow-xl:                                  /* modals / popovers */
    0 4px 8px -2px hsl(var(--shadow-ink) / 0.05),
    0 12px 24px -4px hsl(var(--shadow-ink) / 0.07),
    0 24px 48px -8px hsl(var(--shadow-ink) / 0.09);
}
```

`FeatureCard.tsx:20`: drop the `boxShadow` from `whileHover` and add `hover:shadow-lg` as a
class (let CSS own the multi-layer shadow, Motion cannot tween a 3-layer box-shadow cleanly).
Keep `whileHover={{ y: -6 }}`. `ServiceModal.tsx:27`: swap the black glow for `shadow-xl`.

### 2b. The signature light-card recipe

Border + an inset top white highlight (fakes a lit bevel) + the tinted shadow. This is what
gives Linear/Vercel cards their crispness. Apply to `FeatureCard`, `ProjectCard`,
`FounderCard`:

```css
.surface {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow:
    inset 0 1px 0 0 rgba(255,255,255,0.65),   /* lit top edge */
    var(--shadow-sm);
}
```

### 2c. Radius system (replace the ad-hoc values)

```css
@theme {
  --radius-xs:   0.375rem;  /* chips nested in cards */
  --radius-sm:   0.5rem;    /* buttons, badges, inputs */
  --radius-md:   0.75rem;   /* default control */
  --radius-lg:   1rem;      /* cards, bento cells */
  --radius-xl:   1.5rem;    /* hero panels, modals, CTA band */
  --radius-pill: 9999px;    /* pills, avatars, icon buttons */
}
```

Migration: `rounded-[20px]` pills and `rounded-[24px]` buttons become `rounded-pill`,
`rounded-[16px]` bento wrap and `rounded-2xl` cards become `rounded-lg`, modals `rounded-xl`.
Nesting rule for concentric corners: inner radius = outer radius minus padding. A `rounded-xl`
(24px) cell with 16px padding wants an 8px (`rounded-sm`) media element inside.

### 2d. Pointer spotlight card, tuned for light

On a light theme this is a faint green wash and a border that lights up near the cursor, not a
white halo. Write CSS vars on `mousemove` (no React re-render):

```jsx
const onMove = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
};
```
```css
.spotlight-card::before {
  content: ""; position: absolute; inset: 0; border-radius: inherit;
  pointer-events: none; opacity: 0; transition: opacity .3s;
  background: radial-gradient(200px circle at var(--x) var(--y),
    hsl(132 30% 45% / 0.06), transparent 65%);  /* keep alpha very low on light */
}
.spotlight-card:hover::before { opacity: 1; }
```

### 2e. Break the uniform 2x2 bento

Your hairline grid mechanism is good, keep it, but uniformity flattens hierarchy. Move to a
spanned grid and put your heaviest content (a diagram or the globe) in the large cell. Bump
`gap-0.5` to `gap-px` so the divider cannot collapse on sub-pixel rounding. Keep one 8pt
spacing scale (16 / 24 / 32) and the same internal padding on every cell so asymmetric sizes
still feel like one system.

```html
<div class="grid grid-cols-1 md:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-px
            rounded-lg bg-[var(--saas-border)] p-px">
  <div class="md:col-span-2 md:row-span-2 ...">...</div>  <!-- hero / diagram cell -->
  <div class="...">...</div>
  <div class="...">...</div>
  <div class="md:col-span-2 ...">...</div>
</div>
```

### 2f. Optional texture (use at most one per section)

- Hero dotted background with a radial mask fade: dots in a slightly darker sage
  `radial-gradient(circle, hsl(140 12% 80%) 1px, transparent 1px)` at `24px`, masked so it
  fades before it reaches the copy.
- Grain overlay on large flat areas (hero, CTA band, footer) via an inline `feTurbulence`
  data-URI at `opacity: 0.035` and `mix-blend-mode: multiply`. Never over text or controls.

---

## 3. Motion (refine, do not add more)

### 3a. Standardize on motion tokens

Create `src/app/motion/tokens.ts`. Keep your house curve as the entrance spine:

```ts
export const ease = {
  entrance: [0.22, 1, 0.36, 1],  // your existing curve, keep
  exit:     [0.4, 0, 1, 1],      // accelerate away, short
  hover:    [0.4, 0, 0.2, 1],    // near-linear micro
  emphasis: [0.32, 0.72, 0, 1],  // modals / overlays
} as const;

export const spring = {
  hover:    { type: "spring", stiffness: 300, damping: 30, mass: 1 },   // calm lift
  magnetic: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 }, // pointer pull
  overlay:  { type: "spring", duration: 0.5, bounce: 0.15 },            // panels
} as const;
```

### 3b. Kill the two bouncy defaults

- Hero badge `HomePage.tsx:36`: change `ease: "backOut"` to `ease: ease.entrance`.
- Card hover springs: your `stiffness 300 / damping 20` visibly overshoots. Use
  `spring.hover` (`damping 30`) to remove the wobble.

### 3c. Refined buttons (replace `scale: 1.05`)

The generic tell is uniform scale. Compose a small lift, a shadow bloom, and directional
intent on the arrow instead:

```jsx
<motion.button
  initial="rest" whileHover="hover" whileTap="tap"
  variants={{
    rest:  { y: 0,  boxShadow: "0 1px 2px rgba(44,52,44,0.06)" },
    hover: { y: -2, boxShadow: "0 8px 24px rgba(79,114,86,0.22)" },
    tap:   { y: 0,  scale: 0.98 },
  }}
  transition={spring.hover}
  className="... group">
  Request a Technical Discovery Call
  <motion.span variants={{ rest: { x: 0 }, hover: { x: 3 } }}>
    <ArrowRight size={16} />
  </motion.span>
</motion.button>
```

### 3d. Fix the Layout spotlight perf

`Layout.tsx:43` re-renders on every mousemove. Swap `useState` for motion values so nothing
re-renders:

```jsx
const mx = useMotionValue(-400), my = useMotionValue(-400);
useEffect(() => {
  const onMove = (e) => { mx.set(e.clientX); my.set(e.clientY); };
  window.addEventListener("mousemove", onMove);
  return () => window.removeEventListener("mousemove", onMove);
}, []);
const bg = useMotionTemplate`radial-gradient(600px circle at ${mx}px ${my}px, rgba(79,114,86,0.04), transparent 60%)`;
// <motion.div style={{ background: bg }} ... />
```

### 3e. Reduced motion (accessibility and polish)

Wrap the app once and hand-handle the loops and rAF animations:

```jsx
// main.tsx
<MotionConfig reducedMotion="user"><App /></MotionConfig>
```

Then guard the non-`motion` pieces:
- `PageLoader`: `if (useReducedMotion()) return null;`
- `CountUp`: `if (reduce) { setCount(end); return; }`
- Looping "slots open" dot and scroll-top float: stop the `repeat: Infinity` loop when reduced.

### 3f. Two scroll touches worth adding (subtle)

- Hero globe parallax: as the hero scrolls out, drift the globe down ~120px, scale to 1.08,
  fade to 0. `useScroll({ target: heroRef, offset: ["start start","end start"] })` then
  `useTransform` + `useSpring`. Gate on `useReducedMotion`.
- A 2px scroll-progress line at the bottom edge of the sticky nav:
  `useSpring(scrollYProgress)` driving `scaleX`, `originX: 0`, accent color at 60% opacity.

### 3g. Route and modal choreography

- Route change (`Layout.tsx`): wrap `<Outlet/>` in `AnimatePresence mode="wait"` keyed on
  `pathname`, `initial/animate/exit` of `opacity + 8px`, and move your scroll-reset to
  `onExitComplete`. Keep it minimal so it does not fight the per-section reveals.
- Modals: start panel at `scale: 0.96` (not 0.9), make exit faster and smaller than enter,
  use `spring.overlay` (`bounce: 0.15`) to kill the wobble.

### 3h. Restraint list (skip these, they cheapen a senior brand)

Sticky "pinned" scroll sections, looping gradient-text shimmer, horizontal scroll galleries,
any overshoot/`backOut` easing, magnetic pull on more than one element per viewport.

---

## Priority: if you only do five things

1. **Type contrast + real mono + fluid scale** (1a, 1b). Single biggest perceived-craft jump.
2. **Delete the black shadows, add the tinted scale + surface recipe** (2a, 2b).
3. **`text-wrap: balance`/`pretty` + `tabular-nums` on stats** (1c).
4. **Reduced motion + kill `backOut` + refined buttons** (3b, 3c, 3e).
5. **Break the bento + radius system** (2c, 2e).

Items 1 to 3 are mostly `theme.css` edits and read instantly. Items 4 to 5 touch components.

---

## Sources (read during research)

- Typography: vercel.com/font (Geist), Fontshare pairings (Cabinet Grotesk / General Sans),
  utopia.fyi (fluid clamp method), oddbird.net (fluid type accessibility), webkit.org and
  logrocket (text-wrap balance vs pretty), MDN font-variant-numeric.
- Motion: Emil Kowalski great-animations and review-animations STANDARDS, motion.dev scroll +
  accessibility docs, Olivier Larose magnetic button, Aceternity Card Spotlight.
- Surfaces: Josh Comeau designing-shadows + shadow-palette, ibelick grainy backgrounds,
  CodyHouse gradient borders, concentric border-radius rule, Magic UI Magic Card, Cruip
  spotlight card, SaaSFrame bento 2026.
