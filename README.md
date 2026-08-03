# alongsideyou-web (Next.js)

Marketing site, app demo and booking form for www.alongsideyou.care, migrated from static HTML to Next.js (App Router).

## Structure

- `app/page.js` — landing page (from index.html)
- `app/about/page.js` — about page
- `app/demo/page.js` — app demo
- `app/book-demo/page.js` — booking form (posts directly to Supabase client-side)
- `app/privacy/page.js` — privacy policy

Each page keeps its original CSS/JS embedded via `dangerouslySetInnerHTML` for a faithful 1:1 migration. Next steps: break these into proper React components, move CSS into stylesheets/modules, and wire up shared layout (nav/footer).

## Develop

```
npm install
npm run dev
```
