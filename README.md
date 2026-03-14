# Video Editor Portfolio — Frontend

Next.js 15 frontend for Sourav Alam Prodhan's video editor portfolio website. Connects to the NestJS backend API for all data.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **State**: React Context (Auth)
- **HTTP**: Native fetch via custom ApiClient

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.local.example .env.local
# Edit .env.local with your backend URL and admin API key
```

### 3. Start backend
Make sure the NestJS backend is running (default: `http://localhost:3000`)

### 4. Run development server
```bash
npm run dev
```
Open http://localhost:3001 (Next.js default is 3000, but backend uses that — consider setting `PORT=3001` or updating `NEXT_PUBLIC_API_BASE_URL`)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | NestJS backend URL (e.g., `http://localhost:3000/api/v1`) |
| `NEXT_PUBLIC_ADMIN_API_KEY` | Admin API key matching `ADMIN_API_KEY` in backend `.env` |

## Routes

- `/` — Public portfolio site
- `/admin` — Admin dashboard (requires auth)
- `/admin/login` — Admin login
- `/admin/register` — Admin registration
- `/admin/portfolio` — Portfolio management
- `/admin/skills` — Skills management
- `/admin/testimonials` — Testimonials management
