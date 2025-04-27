# NextAuth Polyfill Bug Demo

This minimal Next.js project reproduces the Node.js polyfill bloat caused by using `SessionProvider` from NextAuth.js v5 in the App Router.

## Steps to Reproduce

1. Install dependencies:
   ```sh
   pnpm install
   # or
   npm install
   ```
2. Build the app:
   ```sh
   pnpm build
   # or
   npm run build
   ```
3. Analyze the `.next/static/chunks` or use a bundle analyzer to see the polyfill bloat (e.g., `crypto`).
4. Try removing `SessionProvider` and see the bundle shrink.

## Key Files
- `next.config.js` — has `fallbackNodePolyfills: false`
- `pages/_app.js` — uses `SessionProvider`
- `pages/index.js` — uses NextAuth hooks
- `pages/api/auth/[...nextauth].js` — minimal NextAuth setup

---

**Use this repo as a reproduction URL for bug reports or sharing with the community.**
