# CodeAlpha_ImageGallery — Gallery

A photography-wall style image gallery with a Pinterest-like masonry grid, category filters, and a full lightbox viewer.

**Built with:** HTML, CSS, JavaScript (no frameworks, no dependencies).

## Features
- Responsive masonry grid (CSS columns) — 4 columns on desktop down to 2 on mobile
- Hover zoom + caption reveal on each photo
- Category filters: All / Nature / Architecture / Travel / Portrait, with smooth fade transitions
- Full-screen lightbox with Next/Prev navigation (only cycles through the currently filtered set)
- Keyboard support: `←` `→` to navigate, `Esc` to close
- Click outside the image, or the close button, to exit the lightbox
- Image counter (e.g. "3 / 12") and caption in the lightbox

## Images
Photos are loaded from [Picsum Photos](https://picsum.photos) (a free placeholder photo service built for exactly this kind of demo/portfolio use) via deterministic seeded URLs — so you'll need an internet connection for them to display. To swap in your own photos, replace the `seed` values in `script.js` with your own image paths/URLs.

## Run it
Open `index.html` in any browser — no build step required.

## Deploy (bonus)
Push this folder to GitHub, then enable **GitHub Pages** in the repo settings (Settings → Pages → Deploy from branch → `main` / root). Or drag the folder into [Netlify Drop](https://app.netlify.com/drop).

## Project structure
```
index.html   — markup
style.css    — design system & layout
script.js    — rendering, filtering, lightbox logic
```

---
*Built as part of the CodeAlpha Frontend Development internship.*
