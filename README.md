# RACE/CTRL

A mobile-first HYROX performance intelligence interface built around:

**Benchmark → Predict → Pace → Race → Analyse → Prescribe**

## Live product

[Open RACE/CTRL](https://athreix.github.io/race-ctrl/)

## Included experience

- Two-track opening experience: **Pre‑Race** or **Post‑Race**
- Pre‑Race overview with finish range, confidence, readiness, and next test
- Benchmark ledger with evidence-quality scoring and editable details
- Interactive race simulator, eight-phase blueprint, and race card
- Post‑Race overview with result variance, attribution, and first-cause diagnosis
- Detailed predicted-versus-actual debrief and root-cause chain
- Training time-ROI ranking and focused block prescription
- Track-aware desktop navigation and three-item mobile navigation
- Deep links, browser-back restoration, and smooth spatial transitions
- Reduced-motion support and WCAG-oriented contrast/focus states

The current data is realistic demonstration data. Prediction, import, authentication, and persistence services are not connected yet.

## Run locally

```bash
npm install
npm run dev
```

Create a production build:

```bash
npm run build
```

GitHub Pages deployments use the repository-aware asset path:

```bash
npm run build:pages
```

## Product sequence

1. Connect athlete accounts and persist benchmarks.
2. Implement the deterministic baseline prediction engine.
3. Add athlete-authorised result upload and manual import.
4. Validate predicted ranges against paired benchmark/race data.
5. Add post-race attribution and personal correction factors.
6. Pursue licensed race-result access; do not depend on unauthorised scraping.

## Working identity

`RACE/CTRL` is a working product name and is not presented as an official HYROX product.
