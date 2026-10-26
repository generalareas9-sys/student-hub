# Student Hub — Production Academic Management & Student Dashboard

Student Hub is a modern, responsive, production-ready academic dashboard and university management web application. It enables students to monitor course progression, submit assignments, track study hours, view cumulative GPA transcripts, and communicate with instructors and classmates.

---

## 🌟 Key Features

- **Personalized Academic Dashboard**: 4 live metric cards (Courses in Progress, Completed, Certificates, Community Score), interactive study hours bar chart (Weekly/Monthly), GPA performance curve, and active assignment task manager.
- **Course & Curriculum Catalog**: View enrolled courses, track syllabus milestones, check credits, and register for new courses with instant status updates.
- **Assignments & Deliverables Tracker**: Filter by *All*, *In Progress*, *Completed*, and *Pending*. Update assignment submission statuses and view grades.
- **Verified Grades & Transcripts**: Cumulative GPA calculation on a 4.0 weighted scale, assessment breakdowns, and instructor feedback logs.
- **Interactive Timetable & Calendar**: 6-day sliding window calendar chip strip, daily lecture/lab tracks, and custom event scheduling.
- **Real-time Notifications**: Alerts for graded assignments, upcoming deadlines, and schedule reminders.
- **Student Profile & Settings**: Update major, year of study, contact phone, residential address, research bio, and account passwords.
- **Direct Messaging**: Chat with instructors and study group peers.
- **Enterprise Security**: Password hashing with bcrypt, JWT authentication with HTTP-only cookies, Helmet security headers, CORS restrictions, rate limiting, and database audit logs.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, React Router v6, Lucide React, CSS Custom Properties |
| **Backend** | Node.js, Express.js, Helmet, CORS, Express-Rate-Limit, Cookie-Parser |
| **Database & ORM** | PostgreSQL / SQLite (zero-config local dev), Prisma ORM |
| **Authentication** | JSON Web Tokens (JWT), Bcrypt, Role-Based Access Control (RBAC) |
| **Testing** | Vitest, Supertest (10/10 automated tests passing) |
| **Deployment** | Vercel (Frontend), Render / Railway (Backend API + Managed PostgreSQL) |

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Install Dependencies
```bash
# From the project root
npm run install:all
```
*(Or run `npm install` in the root, `client/`, and `server/` directories)*

### 3. Initialize & Seed Database
```bash
cd server
npx prisma generate
npx prisma db push
node prisma/seed.js
cd ..
```

### 4. Run the Full Application (Client + Server Concurrently)
```bash
npm run dev
```
- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **API Health Check**: `http://localhost:5000/health`

---

## 🔑 Default Demo Login Accounts

| Role | Email | Password |
|---|---|---|
| **Demo Student** | `student@studenthub.edu` | `password123` |
| **Demo Instructor** | `instructor@studenthub.edu` | `password123` |

*(You can also click **"Demo Student"** on the login page for 1-click credentials auto-fill, or create a brand new student account via the Register page.)*

---

## 🧪 Automated Testing

Run the automated integration test suite covering authentication, session cookies, dashboard stats, assignments, courses, events, and profile updates:

```bash
cd server
npm run test
```

Result:
```text
✓ tests/api.test.js (10 tests) 2229ms
 Test Files  1 passed (1)
      Tests  10 passed (10)
```

To verify the client production build:
```bash
cd client
npm run build
```

---

## 📡 REST API Documentation (`/api/v1`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | Register new student account | No |
| `POST` | `/api/v1/auth/login` | Authenticate user & issue JWT | No |
| `GET` | `/api/v1/auth/me` | Fetch active user session | Yes |
| `POST` | `/api/v1/auth/logout` | Clear session cookie | Yes |
| `POST` | `/api/v1/auth/change-password` | Change account password | Yes |
| `GET` | `/api/v1/dashboard/stats` | Academic overview cards data | Yes |
| `GET` | `/api/v1/dashboard/study-hours` | Weekly/Monthly study hours | Yes |
| `GET` | `/api/v1/dashboard/performance` | GPA performance trend curves | Yes |
| `GET` | `/api/v1/courses` | List courses & enrollment status | Yes |
| `GET` | `/api/v1/courses/:id` | Course syllabus & deliverables | Yes |
| `POST` | `/api/v1/courses/:id/enroll` | Enroll in course | Yes |
| `GET` | `/api/v1/assignments` | List assignments (supports filter/search) | Yes |
| `PATCH` | `/api/v1/assignments/:id/status`| Update submission status | Yes |
| `POST` | `/api/v1/assignments/:id/submit`| Submit assignment deliverables | Yes |
| `GET` | `/api/v1/grades` | Cumulative GPA & grade transcript | Yes |
| `GET` | `/api/v1/events` | Calendar & schedule timetable | Yes |
| `POST` | `/api/v1/events` | Create new schedule event | Yes |
| `DELETE` | `/api/v1/events/:id` | Remove event from schedule | Yes |
| `GET` | `/api/v1/notifications` | Fetch unread & history notifications | Yes |
| `PATCH` | `/api/v1/notifications/read-all`| Mark all notifications read | Yes |
| `GET` | `/api/v1/profile` | Retrieve student profile details | Yes |
| `PUT` | `/api/v1/profile` | Update profile fields | Yes |
| `GET` | `/api/v1/chat/messages` | Message threads with peers & faculty | Yes |
| `POST` | `/api/v1/chat/messages` | Send message | Yes |

---

## 🌐 Production Deployment

### Option A: Render (1-Click Blueprint)
1. Fork or push this repository to GitHub.
2. In [Render Dashboard](https://dashboard.render.com/), click **New > Blueprint**.
3. Connect this repository — Render will automatically read `render.yaml` and provision:
   - Managed PostgreSQL database
   - Node.js API Web Service
   - Vite React Static Site

### Option B: Vercel (Frontend) + Render / Railway (Backend)
1. **Frontend**: Import the `client/` directory into [Vercel](https://vercel.com). Deploy with build command `npm run build` and output directory `dist`.
2. **Backend**: Import the `server/` directory into [Render](https://render.com) or [Railway](https://railway.app). Set environment variables from `server/.env.example`.
3. In `server/prisma/schema.prisma`, switch `datasource db { provider = "postgresql" }` when using PostgreSQL.
4. Set `DATABASE_URL` to your production PostgreSQL connection string.

---

## 🔒 Security & Privacy Notes

- Plaintext passwords are never stored in the database.
- Production credentials and tokens are read exclusively through environment variables (`.env`).
- API requests are protected against brute-force attacks via `express-rate-limit`.
- Inputs are validated and sanitized on both client and server.
- All database modifications create records in the `AuditLog` table.
