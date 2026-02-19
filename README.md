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