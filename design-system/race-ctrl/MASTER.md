# RACE/CTRL Design System

**Product:** Athlete-only HYROX performance intelligence  
**Creative direction:** Apple-like restraint × competition-grade telemetry  
**Primary surfaces:** Mobile and laptop web app  
**Default theme:** Strict monochrome dark

## Experience architecture

The product opens with one decision:

1. **Pre‑Race** — benchmark, predict, and pace.
2. **Post‑Race** — analyse, attribute, and improve.

Do not expose the full product navigation before this choice. Inside a track, show one overview and two focused destinations. Preserve deep links and browser-back history.

## Visual system

- Use true black (`oklch(0 0 0)`) as the environment.
- Use near-white (`oklch(0.985 0 0)`) for primary information.
- Use neutral tonal separation instead of decorative shadows.
- Reserve cobalt for active model signals and selected data.
- Reserve red, amber, and green for named performance states with text or icons.
- Use Familjen Grotesk Variable throughout with tabular numerals for time data.
- Keep surfaces flat. Borders are one-pixel structural dividers, never ornamental stripes.
- Standard radii: 4px controls, 8px grouped controls, 12px sheets.

## Spacing

Use a spacious 4/8-derived rhythm:

- 4px — micro alignment
- 8px — icon/text separation
- 16px — compact control spacing
- 24px — component padding
- 32px — panel spacing
- 48px — section separation
- 72–120px — major narrative separation

Increase gutters with viewport size. Never force desktop density onto mobile.

## Motion

Motion communicates hierarchy, track selection, cause, sequence, or updated data.

- Micro-feedback: 150–240ms.
- Content replacement: 300–460ms.
- Track transition: up to 580ms with a faster exit.
- Canonical easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Animate transform, opacity, blur, clip, and SVG path length only.
- Content must be visible by default; animation may never gate rendering.
- Navigation remains interruptible throughout transitions.
- Reduced motion replaces spatial choreography with immediate state changes or short fades.

## Components

### Track selector

Two large semantic buttons separated by structural rules. Desktop presents both equally. Mobile reveals both within the opening viewport. Hover may invert black/white; touch uses a restrained pressed surface.

### Track switcher

A two-option pill for Pre‑Race and Post‑Race. Current state uses a white fill with black text. Minimum mobile target is 44×44px.

### Track navigation

Three destinations per track. Desktop uses a top underline. Mobile uses a fixed three-item labeled tab bar with safe-area padding.

### Data regions

Prefer full-width analytical regions and lists over floating card grids. Every chart includes a nearby label or accessible summary.

## Guardrails

- Never resemble a generic SaaS dashboard, clinical portal, or cyberpunk game.
- Never add glitter, ambient blobs, decorative glow, gradients on text, or ornamental animation.
- Never copy Apple, WHOOP, or HYROX brand assets.
- Never hide a key action behind hover.
- Never break browser Back or deep linking.
- Never use color as the only performance signal.
- Never place tappable controls below 44px on mobile.
- Never leave scroll content underneath fixed navigation without safe padding.
