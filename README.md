# rodrigoserratogomez.github.io

Personal site of **Rodrigo Serrato Gomez**, Full Stack Engineer (fintech & B2B).
Static HTML/CSS, no build step. English by default, with a button to switch to Spanish (`?lang=es` opens it in Spanish).

- `index.html` — home: services, case study, selected work, experience, contact
- `case-study.html` — 242s → 12s case study
- `assets/` — styles, fonts (SIL Open Font License), images, CV and case study PDFs
- `assets/i18n.js` — Spanish texts (each element with `data-i18n` has its translation here)
- `assets/site.js` — contact details assembled at runtime (anti-spam) and the motion layer
- `assets/vendor/` — GSAP 3.13 + ScrollTrigger, self-hosted ([GSAP standard license](https://gsap.com/standard-license)). With JavaScript off or *reduce motion* on, the page renders complete and static.

Live: https://rodrigoserratogomez.github.io/
