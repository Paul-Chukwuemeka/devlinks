# Devlinks 🔗

Devlinks is a Next.js app for managing and sharing developer links and lightweight profiles. It supports email + Google authentication, avatar uploads (Supabase storage), Prisma (Postgres) for persistence, and a small admin area for link management.

---

## Key features ✅

- Email and Google authentication (better-auth)
- User profiles and public link collections
- Avatar uploads using Supabase Storage (bucket: `avatars`)
- Admin area and simple settings UI
- Built with Next.js (app router), TypeScript, Tailwind CSS, and Prisma

---

## Tech stack 🧩

- Next.js 16 (app router)
- React 19, TypeScript
- Tailwind CSS
- Prisma 7 + PostgreSQL
- Supabase (storage + client)
- better-auth for authentication

---

## Getting started ⚡

1. Clone the repo

	git clone <repo-url>

2. Install dependencies

	npm install

3. Create a `.env` file using the `.env.example` in the repo and set the real secrets

4. Apply database migrations and generate Prisma client

	npx prisma migrate dev --name init
	npx prisma generate

5. Start local development

	npm run dev

Open http://localhost:3000 in your browser.

---

## Environment variables (.env.example) 🗝️

You should create a `.env` with the following variables (see `.env.example`):

- DATABASE_URL — PostgreSQL connection string
- NEXT_PUBLIC_SUPABASE_URL — Supabase project URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY — Supabase anon/public key
- GOOGLE_CLIENT_ID — Google OAuth client ID
- GOOGLE_CLIENT_SECRET — Google OAuth client secret
- NODE_ENV — development | production

There is a `google_signin_setup.txt` in the repo with notes for configuring Google OAuth.

---

## Scripts 📜

- npm run dev — start dev server
- npm run build — build for production
- npm run start — serve production build
- npm run lint — run ESLint

---

## Deployment 🚀

- Recommended: Vercel. Set the environment variables in your Vercel project and run Prisma migrations against your production database (use `npx prisma migrate deploy`).

---

## Contributing ✨

- PRs welcome — please include tests if adding behavior.
- Add a LICENSE file if you want to publish under a permissive license.

---

If you'd like, I can also:

- add a `.env.example` file with placeholder values ✅
- add a short `CONTRIBUTING.md` or `LICENSE` file

— enjoy!
