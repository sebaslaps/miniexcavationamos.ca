# miniexcavationamos.ca

French local lead-generation website for mini-excavation services in Amos, Québec and surrounding Abitibi sectors.

## Scope

- Service: mini-excavation résidentielle et commerciale.
- City: Amos, QC.
- Surrounding area: Saint-Mathieu-d’Harricana, Saint-Félix-de-Dalquier, Trécesson, La Corne.
- Domain target: `https://miniexcavationamos.ca`.
- Lead capture: phone-only CTAs, no forms.
- Stack: Astro static site, Netlify-ready build, JSON-driven service pages.

## Local development

```bash
cd /Users/sebastienlapointe/miniexcavationamos.ca
npm install
npm run local
```

Then open:

- http://127.0.0.1:4321/
- http://127.0.0.1:4321/mini-excavation-amos/
- http://127.0.0.1:4321/drain-français/

Astro will hot-reload while the local server is running. Press `Ctrl+C` to stop it.

## Verification

Before deploying:

```bash
npm test
npm run build
npm audit --audit-level=moderate
npm run preview
```

`npm run preview` serves the built `dist/` version locally, which is the closest check to what Netlify will publish.
