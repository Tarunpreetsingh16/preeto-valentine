# haggu-valentine

A Valentine’s surprise: **timeline of your story** (May 2025 → Feb 2026) followed by an interactive **“Will you be my Valentine?”** page.

- **Tech:** React + Vite, hash routing, built for GitHub Pages.
- **Live URL (after deploy):** `https://<username>.github.io/haggu-valentine/`

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown (e.g. `http://localhost:5173/haggu-valentine/`).

## Customize

1. **Timeline content**  
   Edit `src/data/timeline.js`: update `title`, `caption`, and `image` for each month.

2. **Photos**  
   Put images in `src/assets/photos/` (e.g. `may-2025.jpg`). In `timeline.js`, import the image and set `image: importedUrl` for that month (see May 2025 as an example).

3. **Valentine page**  
   Final message after “Yes!” is in `src/views/Valentine.jsx` (e.g. “I love you” and the short line below). Edit that file to change the text.

## Deploy to GitHub Pages

**Option A – Deploy from branch**

1. In repo **Settings → Pages**: Source = **GitHub Actions**.
2. Push to `main` (or `master`). The workflow in `.github/workflows/deploy-pages.yml` will build and deploy.

**Option B – Deploy with `gh-pages`**

1. In repo **Settings → Pages**: Source = **Deploy from a branch**, branch = `gh-pages`, folder = **/ (root)**.
2. Run: `npm run deploy`

After deploy, the site will be at `https://<username>.github.io/haggu-valentine/`.
