# Fitme Pro — PRD

## Original Problem Statement
Build a modern, professional web application called **fitme pro** — a responsive health calculator platform featuring 30 body-measurement and obesity calculators. Enter measurements once, auto-calculate every applicable metric, display in organized cards. Support metric+imperial units, dark mode, per-calculator SEO pages, PDF/print/copy/share, and be comparable to Calculator.net with a more modern UI.

## User Choices (from ask_human)
- Auth: None (session/localStorage only)
- Visual: Modern fitness/health (bold, energetic, vibrant accents)
- Persistence: localStorage across sessions
- PDF: Client-side (window.print)
- SEO: Dedicated route per calculator + unified dashboard

## Architecture
- **Frontend-only** logic; no backend calculators. React 19, react-router-dom v7, Tailwind, Shadcn UI, Phosphor icons, framer/CSS motion, Sonner toasts.
- **State**: React Context (`MeasurementContext`) synced to `localStorage`.
- **Routes**: `/` dashboard, `/calculator/:slug` per-calculator SEO page.
- **Backend**: unchanged template — MongoDB + FastAPI at `/api/*` (currently used only for health check).

## Personas
- Health-conscious lifter / athlete tracking body composition.
- Dietitian or coach needing quick client calculations.
- Casual health researcher looking up formulas + interpretation.

## Core Requirements (static)
- 30 calculators grouped: Basic, Body Composition, Body Shape, Metabolism, Advanced.
- Metric + Imperial unit toggle.
- Dark mode toggle (default dark).
- Instant recompute, no reloads.
- Copy / Share / Print / Reset.
- Per-calculator SEO route with formula, steps, FAQ, related calcs, JSON-LD.

## What's Implemented (2026-02)
- All 30 calculators with formulas + reference ranges + interpretations.
- Session-persistent MeasurementContext (localStorage).
- Dashboard with hero, search, category filter, staggered result cards.
- ResultCard with category color coding, gauge bar for known metrics (BMI, WHtR, WHR, BF%).
- Individual SEO page per calculator with formula, step-by-step guide, FAQ accordion, related calcs, JSON-LD (FAQ + WebApplication schema).
- Header with unit toggle, theme toggle, print button, reset button.
- Sonner toasts for copy/share.
- Client-side print CSS.
- Design tokens per design_guidelines.json (Clash Display + Manrope + JetBrains Mono, lime accent #CCFF00, dark-first).

## Prioritized Backlog
- **P1**: Add unit conversion smoothing when toggling units (currently raw values persist).
- **P1**: Comparison mode: side-by-side "before / after" measurements.
- **P2**: Detailed body-composition chart (pie of fat mass vs lean).
- **P2**: Client history log (saved snapshots per date).
- **P3**: Multilingual copy (SEO expansion).

## Next Tasks
- Testing subagent frontend verification.
- Address any bugs surfaced.
