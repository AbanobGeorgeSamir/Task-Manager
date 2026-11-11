# Task Manager

Full-stack task management app. Users create an account, organize tasks by category and priority, set due dates and track what is done. The React frontend talks to an Express and MongoDB REST API secured with JWT.

[![CI](https://github.com/AbanobGeorgeSamir/Task-Manager/actions/workflows/ci.yml/badge.svg)](https://github.com/AbanobGeorgeSamir/Task-Manager/actions/workflows/ci.yml)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

<!-- Add screenshots here, for example: ![Dashboard](docs/dashboard.png) -->

## Features

- Registration, login and account deletion with JWT authentication
- Create, edit, complete and delete tasks
- Task categories (Work, Personal, Urgent) and priorities (High, Medium, Low)
- Due dates and completion status
- Dashboard view with search and filters by category and priority
- Toast notifications and a task modal for quick editing
- Application state (signed-in user and tasks) managed with Redux Toolkit slices
- Every task belongs to its owner, so users only see their own data

**Security**
- Passwords hashed with `bcryptjs`
- Rate limiting on the registration and login endpoints
- `helmet` security headers, response compression, restricted CORS and a request body size limit
- Security headers also configured in `vercel.json`

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, Redux Toolkit, React-Redux, Vite, ESLint |
| Backend | Node.js, Express, Mongoose |
| Auth and security | JSON Web Tokens, bcryptjs, Helmet, express-rate-limit |
| Database | MongoDB |

## Project Structure

```text
backend/    Express API: routes, models, middleware, config
frontend/   React + Vite client: components, Redux store (src/store), API helper, utilities
```

## API Overview

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Public | Create an account |
| POST | `/api/auth/login` | Public | Sign in |
| GET | `/api/auth/me` | User | Current user |
| DELETE | `/api/auth/me` | User | Delete account |
| GET | `/api/tasks` | User | List your tasks |
| POST | `/api/tasks` | User | Create a task |
| PATCH | `/api/tasks/:id` | User | Update a task |
| DELETE | `/api/tasks/:id` | User | Delete a task |

## Getting Started

**Requirements:** Node.js and a MongoDB database (local or MongoDB Atlas).

1. Clone the repository:

   ```bash
   git clone https://github.com/AbanobGeorgeSamir/Task-Manager.git
   cd Task-Manager
   ```

2. Configure and start the API:

   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run dev
   ```

   | Variable | Description |
   | --- | --- |
   | `MONGODB_URI` | MongoDB connection string |
   | `JWT_SECRET` | Long random secret used to sign tokens |
   | `PORT` | Server port (default `5000`) |
   | `CLIENT_ORIGIN` | Optional comma-separated list of allowed frontend origins |

3. Start the frontend in a second terminal:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   The frontend calls `http://localhost:5000/api` by default. To use a different API, copy `frontend/.env.example` to `frontend/.env` and change `VITE_API_URL`.

## Testing

```bash
cd frontend
npm test          # Redux reducer tests (Node test runner)
npm run lint
npm run build
```

GitHub Actions runs the tests, lint and build on every push and pull request.

## Deployment

The repository holds two deployables, each a separate Vercel project.

1. **API:** import the repository into Vercel and set the Root Directory to `backend`. Add `MONGODB_URI` (MongoDB Atlas), `JWT_SECRET` and, optionally, `CLIENT_ORIGIN`. Deploy and copy the production URL.
2. **Client:** import the same repository, set the Root Directory to `frontend`, and add `VITE_API_URL` pointing at the API including the `/api` suffix (for example `https://your-api.vercel.app/api`).

## Author

**Abanoub George Samir** · Junior Full-Stack Developer · [Portfolio](https://devabanobgeorge.vercel.app) · [LinkedIn](https://www.linkedin.com/in/abanob-george-samir) · [GitHub](https://github.com/AbanobGeorgeSamir)
