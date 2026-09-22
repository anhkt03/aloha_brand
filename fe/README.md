# ALOHA Language School — Frontend

Next.js 15 (App Router) + TypeScript + TailwindCSS + next-intl.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Structure

- `src/app/[locale]/` — App Router pages, one entry per locale (`vi`, `en`, `ja`, `ko`).
- `src/components/common/` — atomic UI (Button, Container, Section, Image).
- `src/components/layout/` — Header, Footer, MobileMenu, LanguageSwitcher.
- `src/components/sections/` — page sections (Hero, About, ...).
- `src/data/` — static/fake data (courses, news, testimonials, features).
- `src/lib/constants.ts` — brand colors, layout, breakpoints.
- `src/config/site.ts` — site-wide config (name, hotline, socials).
- `src/i18n/` — next-intl routing + request config.
- `messages/` — translation JSONs per locale.
- `prisma/schema.prisma` — future BE schema for courses & news.

## Design tokens

Brand palette lives in `src/app/globals.css` as CSS variables and is mirrored in
`src/lib/constants.ts` for JS access and in `tailwind.config.ts`.

| Token       | Value      |
| ----------- | ---------- |
| `--brand`   | `#469142`  |
| `--brand-deep` | `#295326` |
| `--teal`    | `#28b4d2`  |
| `--accent`  | `#e1ba23`  |

## Routes

- `/[locale]` — Home
- `/[locale]/training` — Đào tạo ngoại ngữ
- `/[locale]/global` — Du học
- `/[locale]/about` — Về ALOHA
- `/[locale]/branches` — Hệ thống cơ sở
- `/[locale]/news` — Tin tức
- `/[locale]/contact` — Liên hệ
