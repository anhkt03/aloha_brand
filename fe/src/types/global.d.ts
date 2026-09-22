// Side-effect CSS imports (e.g. `import "./globals.css"`) — Next.js handles
// them at build time. This ambient declaration silences the TS error before
// `next dev`/`next build` regenerates `next-env.d.ts`.
declare module "*.css";
