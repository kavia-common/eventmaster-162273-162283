# Event Management Frontend (Next.js)

Modern light-themed frontend for the Event Management application. Implements:
- Authentication (login/register)
- Dashboard layout with sidebar/header
- Events list with search
- Event detail modal
- RSVP capability
- Attendee list
- Responsive calendar view
- My RSVPs page

## Prerequisites
- Node.js 18+ recommended
- Backend API running and reachable

## Configuration
1. Copy `.env.example` to `.env.local`
2. Set:
   - `NEXT_PUBLIC_API_BASE_URL` to your backend origin (e.g. http://localhost:4000)
   - Optionally `NEXT_PUBLIC_APP_TITLE`

## Scripts
- `npm run dev` - start development server (http://localhost:3000)
- `npm run build` - build for production
- `npm start` - start production server

## API Integration
This app talks to the Express backend with the following endpoints:
- POST `/auth/register`, POST `/auth/login`, GET `/auth/me`
- GET `/events`, POST `/events`, GET/PUT/DELETE `/events/:id`
- GET `/events/:id/attendees`
- POST `/events/:id/rsvp`
- GET `/rsvps/me`

JWT is stored in `localStorage` as `auth_token` after login.

## Notes
- UI uses Tailwind v4 via @tailwindcss/postcss configuration already present.
- All pages are client components for simplicity with API calls on the client.

