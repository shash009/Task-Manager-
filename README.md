# Task Manager – Full Stack Application

A full-stack Task Management System built with a modern TypeScript stack.

This project demonstrates secure authentication, clean architecture, service abstraction, pagination, filtering and real-world CRUD patterns.

## 🧱 Architecture

```
task-manager/
  ├── frontend/   → Next.js 14 (App Router)
  └── backend/    → Node.js + Express + Prisma
```

## 🚀 Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn UI
- Zustand
- Axios (with interceptors)
- React Hook Form + Zod

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT (Access + Refresh)
- bcrypt

## ✨ Features
- Secure JWT authentication
- Refresh token flow
- Protected routes
- Full Task CRUD
- Pagination
- Status filtering
- Search by title
- Toggle task status
- Service-layer abstraction
- Clean architecture separation

## 🔧 Local Setup

### 1️⃣ Backend
```bash
cd backend
npm install

# Create .env:
DATABASE_URL=your_database_url
JWT_ACCESS_SECRET=your_secret
JWT_REFRESH_SECRET=your_secret

# Run:
npx prisma generate
npx prisma migrate dev
npm run dev
```

Server runs on:

http://localhost:8000

### 2️⃣ Frontend
```bash
cd frontend
npm install

# Create .env.local:
NEXT_PUBLIC_API_URL=http://localhost:8000

# Run:
npm run dev
```

App runs on:

http://localhost:3000

## 📌 Notes
- Backend must run before frontend.
- Access tokens stored in memory (Zustand).
- Refresh flow handled via Axios interceptors.
- Prisma used for structured database access.

## 🎯 Purpose

This project was built to demonstrate production-level full-stack architecture using modern TypeScript tooling and clean separation of concerns.

---

## 🏷️ Release v1.0.0 — Summary

Release highlights:

- Dashboard stats: added a lightweight `DashboardStats` UI component showing Total, Completed, Pending and Completion %.
- Navbar with profile: top navigation with a small profile dropdown (View Profile, Logout) and responsive behavior.
- Footer: global footer with copyright and tagline.
- UI polish: improved layout composition in `RootLayout`, consistent cards, buttons, and backdrop styles for a cohesive look.
- Verified smoke test: local smoke verification performed (backend API health, register/login/logout, tasks endpoint, and basic page render checks).

Suggested release commit message (use for the release commit):

"feat(release): v1.0.0 — dashboard stats, navbar/profile, footer, UI polish, smoke-verified\n\n- Adds `DashboardStats` component and integrates it into dashboard UI\n- Adds top `Navbar` with profile dropdown and logout\n- Adds global `Footer` and integrates into layout\n- Small UI polish and layout improvements across dashboard and layout\n- Smoke-tested: backend API health, auth flow, and page rendering"

---

## 📸 Screenshots

Add screenshots to `docs/screenshots/` (create the folder) and reference them below. Examples:

![Dashboard with stats](docs/screenshots/dashboard-stats.png)
![Navbar profile dropdown](docs/screenshots/navbar-profile.png)
![Footer example](docs/screenshots/footer.png)

If you prefer, replace the above images with actual screenshots and commit them to the repository.

---

## ✅ Updated Setup & Quick Start

The existing setup instructions remain valid. Quick summary:

1) Backend

```bash
cd backend
npm install

# .env (example)
DATABASE_URL=postgres://user:pass@localhost:5432/taskdb
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Server: http://localhost:8000

2) Frontend

```bash
cd frontend
npm install

# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000

npm run dev
```

App: http://localhost:3000

---

If you want, I can add a `docs/release-notes.md` with a changelog and a checklist for future releases.
