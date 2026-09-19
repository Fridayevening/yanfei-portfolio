/**
 * Resolves a path inside `public/` against the deployment base path.
 *
 * Files in `public/` are served from the site root, but this app is deployed to a subpath on
 * GitHub Pages (`/yanfei-portfolio/`). Vite rewrites asset URLs that appear literally in
 * `index.html` and in CSS, but it cannot see strings that are assembled at runtime in JS —
 * `<img src="/intro/x.webp">` in JSX, or a path stored in a data file. Those need the base
 * prefix added here, or they resolve against the domain root and 404.
 *
 * `import.meta.env.BASE_URL` is `/` during development and the configured base in a build.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL
  return `${base}${path.replace(/^\/+/, '')}`
}
