# Task Manager

Full-stack task management app. Users create an account, organize tasks by category and priority, set due dates and track what is done. The React frontend talks to an Express and MongoDB REST API secured with JWT.

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
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
- Every task belongs to its owner, so users only see their own data

**Security**
- Passwords hashed with `bcryptjs`
- Rate limiting on the registration and login endpoints
- `helmet` security headers, response compression, restricted CORS and a request body size limit
- Security headers also configured in `vercel.json`

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, Vite, ESLint |
| Backend | Node.js, Express, Mongoose |
| Auth and security | JSON Web Tokens, bcryptjs, Helmet, express-rate-limit |
| Database | MongoDB |

## Project Structure

```text
backend/    Express API: routes, models, middleware, config
frontend/   React + Vite client: components, API helper, utilities
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

   The frontend calls `http://localhost:5000/api` by default. Set `VITE_API_URL` in `frontend/.env` to point at a different API.

## Author

**Abanoub George**, Junior Full-Stack Developer · [LinkedIn](https://www.linkedin.com/in/abanob-george-samir) · [GitHub](https://github.com/AbanobGeorgeSamir)
