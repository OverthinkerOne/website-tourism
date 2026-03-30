# Guará Travel — Tourism Website

Modern React + Vite website for a tourism operator in Iguazu. It features private tours, gastronomy highlights, a multi-language blog with pagination, SEO best practices, and a simple content layer that supports admin overrides without a backend.

## ✨ Highlights

- React 19 + Vite 5 + MUI 6 (Emotion)
- Multi-language i18n (EN/ES/PT/ZH) with automatic language detection
- Blog with images and numeric pagination (6 posts per page)
- Structured SEO with Open Graph, Twitter, canonical, and JSON-LD via a lightweight `Seo.jsx`
- Sitemap.xml auto-generated on build and robots.txt included
- Content layer that merges static data and runtime overrides (localStorage)
- Ready-to-use theming with Material UI and custom tokens
- Client-side routing for Tours, Gastronomy, Blog, and Details pages

## 🧱 Tech Stack

- React 19, React Router 6
- Vite 5 (ESM), @vitejs/plugin-react
- Material UI 6 + Emotion
- i18next + browser language detector
- Pexels SDK (for image fallback/lookups in dev)

## 📁 Project Structure

- `src/main.jsx` — Router and app bootstrap
- `src/App.jsx` — Home page composition (Hero, Sessions, Footer)
- `src/components/Seo.jsx` — Minimal head manager: title, meta, OG/Twitter, canonical, JSON-LD
- `src/pages/*` — Route pages (Tours, Gastronomy, Blog list/detail, Gallery, Admin)
- `src/data/*` — Static content seeds (tours, restaurants, blog posts)
- `src/lib/content.js` — Content layer that merges static and admin overrides stored in localStorage
- `src/i18n/*` — i18n setup and translations
- `public/` — Static assets (images, robots.txt, sitemap.xml)
- `scripts/generate-sitemap.mjs` — Generates `public/sitemap.xml` before build
- `scripts/fetch_blog_images.mjs` — Helper to fetch representative blog images (optional)

## 🔤 Internationalization (i18n)

- Languages: EN, ES, PT, ZH (fallback to EN)
- Detector: localStorage, then browser/navigator
- Translations live in `src/i18n/locales/*.json`

## 🧩 Content Model and Admin Overrides

Static seeds: `src/data/tours.js`, `src/data/restaurants.js`, `src/data/blogPosts.js`.

Runtime overrides are stored in `localStorage` under the key `gt_admin_overrides_v1` and merged by `src/lib/content.js`:

- Tours: `{ tours: { list: [{ id, title, ... }], byId: { [id]: override } } }`
- Blog: `{ blog: { list: [{ id, title, ... }], byId: { [id]: override } } }`
- Restaurants: `{ restaurants: { list: [...], byId: {...} } }`
- Testimonials and FAQs also supported via list arrays

Static items always exist; dynamic items can override them by `id`. Only published items are surfaced.

## 📰 Blog

- Data source: `src/data/blogPosts.js`
- Each post: `{ id, query, override? }` where `override` can define `title`, `category`, `excerpt`, `body[]`, `date`, `tags[]`, `image`, `published`
- Images: Prefer local files under `public/images/blog/*.jpg` and set `override.image` to `/images/blog/<file>.jpg`.
- Pagination: 6 cards per page via `?page=n` on `/blog`. A numeric paginator at the bottom updates the URL and scrolls to top.
- Related posts: Shown in the blog sidebar, based on `getAllBlogPosts()`.

## 🔎 SEO

- Use `src/components/Seo.jsx` on each page to set:
	- `title`, `description`, `canonical`, `image`, `type`, `locale`
	- JSON-LD via `jsonLd` prop (e.g., Article/Organization)
- `public/robots.txt` points to `/sitemap.xml`.
- `scripts/generate-sitemap.mjs` builds a sitemap using `VITE_SITE_URL` for absolute URLs.

## ⚙️ Environment

Create `.env` from `.env.example` and set:

- `VITE_SITE_URL` — public site URL for canonical and sitemap (e.g., `https://guaratravel.com`)
- `VITE_CALENDLY_URL` — booking link used by the in-page dialog (optional; suppresses warnings when set)
- `VITE_PEXELS_API_KEY` — optional for image lookups in development

## ▶️ Local Development (Windows PowerShell)

```powershell
npm install
npm run dev
```

Visit the printed local URL (e.g., http://localhost:5173 or 5174 if the port is in use).

## 🏗️ Build & Preview

```powershell
npm run build
npm run preview
```

The output is generated into `dist/`. The build step automatically generates `public/sitemap.xml` beforehand.

## 🖼️ Blog Images Helper (optional)

You can fetch representative images for certain blog posts:

```powershell
node scripts/fetch_blog_images.mjs
```

This will save files under `public/images/blog/` and you can reference them via `/images/blog/<file>.jpg`.

## 🚦 Routes

- `/` — Home
- `/about`, `/gallery`
- `/tours`, `/tours/:id`
- `/gastronomy`, `/gastronomy/:id`
- `/blog`, `/blog/:id` (list supports `?page=n`)
- `/admin` — simple admin UI writing to localStorage overrides

## 🔒 Notes on Data and Sources

- Blog content is paraphrased and translated for clarity; images are stored locally where appropriate. External sources are referenced for inspiration only.
- If you replace any image, keep filenames consistent to avoid code changes.

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes and add tests or docs where relevant
3. Ensure `npm run build` passes
4. Open a PR

## 📄 License

Proprietary — internal project for Guará Travel. Distribution outside the organization requires permission.
