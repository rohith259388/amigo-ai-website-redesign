# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Amigo AI** is a React + TypeScript website (candidate interview preparation SaaS) built with Vite, Tailwind CSS 4, Framer Motion, and a comprehensive design system. The site is single-page with client-side routing, dark mode support, and scroll-driven animations.

## Quick Commands

```bash
# Start dev server (localhost:5173)
npm run dev

# Build for production (bundles to single HTML file via vite-plugin-singlefile)
npm run build

# Preview production build locally
npm run preview

# Typecheck
npx tsc --noEmit
```

## Architecture & Code Organization

### High-Level Structure

```
src/
├── App.tsx              # Main router & page composition (Home sections)
├── main.tsx             # Vite entry point
├── index.css            # Design tokens, theme variables, keyframe animations
├── components/          # Page sections and UI components
│   ├── Hero.tsx
│   ├── Journey.tsx
│   ├── Pricing.tsx
│   └── ...
├── components/ui/       # Reusable low-level primitives (Brand, Reveal, MagneticButton, etc)
├── components/visuals/  # SVG/visual components for interactive sections
├── hooks/              # useTheme, useHashRoute, useSequence, useMediaQuery
├── lib/                # motion.ts (Framer Motion presets & easing)
├── data/               # Static data (questions.ts for FAQ/browsable content)
└── utils/              # pricingView.ts (sessionStorage+event cross-section comms)
```

### App Structure (src/App.tsx)

The `Home()` function composes the page from top to bottom. Each section is a separate component imported and arranged in order:

```
Hero → Journey → ResumeSection → BoltDivider → AutoApplySection → InterviewSection 
→ InterviewPartnerSection → PrivacySection → BuddySection → CompanionSection 
→ HowItWorks → BoltDivider → WhyAmigo → Ecosystem → QuestionsSection → Pricing 
→ FAQ → FinalCTA
```

Each section has a unique `id` (e.g., `id="pricing"`) for anchor-based navigation. The router (`useHashRoute`) handles `/`, `/questions`, `/question/:slug`, and `/creators` routes.

### Design System

#### Color Tokens (src/index.css @theme block)

**Light Mode Defaults:**
- `--color-amigo-purple`: `#6c2bd9` (primary brand)
- `--color-amigo-light`: `#b78eff` (lighter purple accent)
- `--color-amigo-dark`: `#111318` (text/ink)
- `--color-amigo-surface`: `#f7f4ff` (light lavender background)
- `--color-amigo-pale`: `#f1e9ff` (very light background tint)
- `--color-amigo-ink`: `#0b0c10` (darkest)
- `--color-amigo-border`: `#e5e7eb` (borders)

**Dark Mode** (set on `:root.dark`): All tokens flip to dark equivalents. The `--color-amigo-dark` becomes light (`#ecebf3`), surface becomes near-black (`#0d0b14`), etc.

**Special CSS Variables:**
- `--c-card`: White in light mode, `#16131f` in dark mode. Used for card backgrounds.
- `--c-panel`: White in light mode, `#1c1829` in dark mode. For sections that must look distinct from `.bg-amigo-surface`.

#### Typography

- Font: "DM Sans" + system fallbacks
- Headline classes: `.headline` + `text-[clamp(...)]` for responsive sizing
- Serif emphasis: `<span className="text-gradient">` for purple gradient text in headings

#### Shadows & Effects

- `--shadow-card`: Card shadows with purple tint
- `--shadow-glow`, `--shadow-glow-lg`: Glow effects around interactive elements
- `.glass`: Frosted glass effect (backdrop blur + semi-transparent bg)

### Dark Mode Implementation

**Theme Toggle:**
1. `useTheme()` hook reads from localStorage ("amigo-theme") and system preference.
2. Toggling adds/removes `.dark` class on `<html>`.
3. Initial theme is pre-painted by an inline script in `index.html` (reads localStorage sync, no flash).

**Theme Flipping:**
- CSS tokens auto-flip when `.dark` is present.
- Utilities like `text-amigo-dark` work in both modes because `--color-amigo-dark` changes value.
- Literal colors (e.g., `bg-white`) are re-mapped in dark mode via `@layer utilities` rules.

**Light-Pinned Islands (`.theme-light-pin`):**
- Some components (Interview panel, Buddy window) are mockups of light-themed app UI.
- In dark mode, letting them flip dark makes two dark panels stack invisibly.
- `.theme-light-pin` on the parent element locks all token-based utilities to light values.
- Applied to `InterviewSection` and `BuddySection`.

### Animation & Motion

**Presets in `src/lib/motion.ts`:**
- `EASE`: Custom cubic-bezier for page animations `[0.16, 1, 0.3, 1]`
- `SPRING`, `SOFT_SPRING`, `SNAPPY`: Framer Motion spring presets
- `fadeUp`, `fadeIn`, `scaleIn`, `popIn`, `slideRight`, `growX`: Reusable Variants
- `stagger()`: Stagger animation for lists
- `VIEWPORT`: Standard scroll-triggered animation config `{ once: true, amount: 0.3 }`

**Keyframe Animations** (in `index.css`):
- `@keyframes float`, `breathe`, `wave`, `drift`, `shimmer`, `particle`, `marquee`, etc.
- Used via Tailwind's `animate-*` utilities (e.g., `animate-float`, `animate-marquee`)
- Reduced motion is respected globally by Framer Motion's `<MotionConfig reducedMotion="user">` wrapper in App.tsx.

### Component Patterns

#### Sections

Each major section follows a pattern:
1. A top-level `<section id="...">` with `py-14 lg:py-16` (fitted to ~800px viewport height)
2. A `.container-x` div for max-width constraining
3. Optional decorative blur blob (`bg-*/blur-[140px]`)
4. A `Reveal` or `TextReveal` for heading animations
5. Content grid/layout

#### Cards

Cards use a consistent pattern:
- `rounded-3xl border border-amigo-border bg-white p-5 shadow-card`
- Hover states: `hover:-translate-y-1 hover:shadow-glow`
- Wrapped in `<Reveal delay={i * 0.08}>` for staggered in-view animations
- Use `motion.div` for complex animations (Framer Motion)

#### UI Primitives (src/components/ui/)

- **Brand.tsx**: `Eyebrow`, `LiveDot`, `Wave` — branded atomic components
- **Reveal.tsx**: `Reveal`, `TextReveal` — scroll-triggered entrance animations (uses Framer Motion + viewport trigger)
- **MagneticButton.tsx**: Hover-following cursor effect on buttons
- **BoltDivider.tsx**: Decorative animated divider between sections
- **Typewriter.tsx**: Character-by-character text reveal with blinking cursor

### Cross-Section Communication

**Pricing Tab Pre-Selection:**
- Journey section has a "Get 50% off" CTA that navigates to Pricing and pre-selects the Monthly tab.
- Implemented via `src/utils/pricingView.ts`: `requestPricingView("monthly")` stores in sessionStorage and fires a custom event.
- Pricing component listens via `onPricingViewRequest()` hook in `useEffect`.

### Responsive Design

- Mobile-first with Tailwind breakpoints (`sm:`, `lg:`, `xl:`)
- Grid layouts: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Padding/margin: `clamp()` for fluid scaling (e.g., `text-[clamp(2.1rem,3.6vw,3.5rem)]`)
- Images and SVGs are `max-w-100%` and responsive
- `container-x` utility provides consistent gutter + max-width

### Routing

**useHashRoute Hook:**
- Monitors `window.location.hash` for SPA navigation.
- Returns `{ name: string, slug?: string }`
- Routes: `home`, `questions`, `question/:slug`, `creators`

### State & Context

- No global state library; uses React hooks (`useState`, `useEffect`, `useContext`)
- Cross-section comms via sessionStorage + custom events (see `pricingView.ts`)
- Theme persisted to localStorage

## Key Implementation Details

### Section Fit-to-Screen Optimization

Sections are sized to fit within a standard viewport (~900px height) using:
- Reduced padding: `py-14 lg:py-16` instead of larger values
- Responsive heading sizes with smaller clamp values (e.g., `clamp(1.9rem, 3.4vw, 3.1rem)`)
- Tighter gaps between elements: `gap-8` instead of `gap-10`
- Removed eyebrow labels from section headers for compactness

### InterviewPartnerSection

A six-card problem grid with decorative visuals:
- Cards use site primitives: `Wave`, `Typewriter`, `LiveDot`
- Custom visuals (ECG trace, dot grid, code snippet, skill chips, chat bubbles) implemented inline
- Animations on scroll via `whileInView` (Framer Motion)
- Staggered card entrance with `delay={Math.min(i, 3) * 0.08}`

### Copy & Text Treatment

- No em dashes in body copy (converted to commas or full sentences)
- Text wrapped to 2–3 lines for readability
- Maximum widths on lead text: `max-w-[520px]` or `max-w-[480px]`
- Color for secondary text: `text-amigo-dark/60` or `/55` (opacity-based)

## Development Workflow

### Making Changes

1. **Edit a component** and save; HMR updates instantly.
2. **Typecheck** with `npx tsc --noEmit` to catch type errors.
3. **Build** with `npm run build` to ensure no runtime surprises.
4. **Test in dev** by scrolling to sections and checking animations, dark mode, and responsive behavior.

### Adding a New Section

1. Create `src/components/NewSection.tsx`
2. Export a named function component (e.g., `export function NewSection()`)
3. Import and add to the `Home()` function in `App.tsx` in the correct position
4. Use `.container-x`, `.shadow-card`, `Reveal`, and motion presets from `lib/motion.ts`
5. Follow the padding/sizing patterns (py-14 lg:py-16, tightened heading clamp values)

### Adding UI Primitives

1. Create in `src/components/ui/`
2. Use Tailwind classes + Framer Motion if animated
3. Export and import where needed
4. Keep them focused and reusable

### Git Workflow

- Commit messages summarize the changes (e.g., "Add Interview Partner section, fit to screen")
- Attribution line at end of commit (set in system reminder)
- No force-pushes; use `git push origin main` for normal flow

## Common Patterns & Gotchas

### Animations

- Always use `useReducedMotion()` to skip animations for users who prefer reduced motion
- Scroll-triggered animations: wrap in `whileInView={{ ... }} viewport={{ once: true, amount: 0.3 }}`
- Use `EASE` constant for consistent easing across the site
- Stagger child animations with `delay={index * 0.08}` (default Framer Motion stagger timing)

### Dark Mode

- Test both themes after adding new components
- If a component shows a light-themed mockup (e.g., interview panel), apply `.theme-light-pin` to its wrapper
- Remember that Tailwind's `bg-white`, `text-white`, etc., are re-mapped in dark mode via utilities layer

### Responsive Images & SVGs

- Always set `max-w-100%` on images; avoid fixed widths
- SVG viewBox must be correct to avoid distortion
- Use `aria-hidden="true"` for decorative visuals

### Hover States

- Use Tailwind hover utilities: `hover:shadow-glow`, `hover:-translate-y-1`, `hover:text-amigo-purple`
- Group hover for nested interactions: `group hover:group-hover\:text-amigo-purple`

### Motion Config

- The app is wrapped in `<MotionConfig reducedMotion="user">`, so all Framer Motion respects OS preference automatically
- No need to manually check for reduced motion in most animations, but do call `useReducedMotion()` for custom logic

## File Size & Performance

- Output is a single HTML file (~2.2 MB gzipped) via `vite-plugin-singlefile`
- No code splitting; all sections load together
- Tailwind JIT + Vite ensure only used CSS is bundled
- Images/SVGs are inlined where small; larger assets should be optimized

## Useful Exports & Utilities

- `src/utils/cn.ts`: `cn()` function for conditional Tailwind classes (clsx + tailwind-merge)
- `src/lib/motion.ts`: Motion presets and easing constants
- `src/hooks/useTheme.ts`: `useTheme()` for theme toggle + detection
- `src/hooks/useHashRoute.ts`: SPA routing
- `src/hooks/useMediaQuery.ts`: Media query hook
- `src/hooks/useSequence.ts`: Animation sequencing helper

## Data

- Static questions for the FAQ/browse page: `src/data/questions.ts`
- No backend API calls; all content is client-side

## Deployment

- Produces a single `dist/index.html` with all CSS, JS, and assets inlined
- Ready to serve from any static host (Vercel, Netlify, S3, GitHub Pages, etc.)
- No build-time environment variables needed
