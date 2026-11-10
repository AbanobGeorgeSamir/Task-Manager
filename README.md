# ✅ Task Manager

A full-stack task management application with a React/Vite frontend and a secure Node.js/Express/MongoDB backend.

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

## ✨ Features

- 🔐 JWT-based authentication (register, login, logout)
- 📋 Create, read, update, and delete tasks
- 🛡️ Security: bcrypt password hashing, rate limiting, security headers (Helmet)
- 📦 Gzip compression for fast responses
- 📱 Responsive UI built with React & Vite

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, JavaScript |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| Auth | JSON Web Tokens (JWT), bcrypt |
| Security | Helmet, express-rate-limit |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database (local or Atlas)

### Setup

```bash
git clone https://github.com/AbanobGeorgeSamir/Task-Manager.git
cd Task-Manager
```

**Backend:**
```bash
cd backend
cp .env.example .env   # Set MONGODB_URI, JWT_SECRET, PORT
npm install
npm start
```

**Frontend:**
```bash
cd frontend
cp .env.example .env   # Set VITE_API_URL
npm install
npm run dev
```

## 📁 Project Structure

```
Task-Manager/
├── backend/     # Express API (routes, models, middleware)
└── frontend/    # React/Vite client
```

## 👤 Author

**Abanoub George Samir** — [LinkedIn](https://www.linkedin.com/in/abanob-george-samir) · [GitHub](https://github.com/AbanobGeorgeSamir)