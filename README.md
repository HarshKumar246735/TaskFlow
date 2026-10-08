# TaskFlow — Smart Task & Notes Manager

TaskFlow is a portfolio-grade MERN productivity platform for tasks, notes, categories, calendar planning, notifications and Kanban workflows. It is designed as a serious full-stack demonstration rather than a basic todo app.

## Stack
React + Vite, React Router, Axios, Lucide React, Context API, CSS3; Node.js, Express, MongoDB/Mongoose, JWT, bcryptjs, Socket.IO.

## Features
- JWT authentication and password reset flow
- Dashboard statistics and weekly productivity
- Full task CRUD, filters, priorities, statuses, tags and subtasks
- Recurring-task field ready for scheduler integration
- Notes with pin/archive and search
- Categories with progress statistics
- Calendar month view
- Kanban workflow
- Notifications and Socket.IO events
- Profile and appearance preferences
- Centralized Axios services and protected routes
- Responsive desktop/tablet/mobile UI
- Security-conscious user isolation and password hashing

## Project structure
See `client/src` and `server` for feature-based architecture.

## Local setup
### 1. Backend
PowerShell:
```powershell
cd TaskFlow/server
npm install
Copy-Item .env.example .env
# edit .env and set MONGO_URI and JWT_SECRET
npm run dev
```

### 2. Frontend
```powershell
cd TaskFlow/client
npm install
Copy-Item .env.example .env
npm run dev
```

Open the Vite URL shown in the terminal (normally http://localhost:5173).

### Demo seed
```powershell
cd TaskFlow/server
npm run seed
```
Demo credentials: `demo@taskflow.local` / `TaskFlow123!`

## Environment
Backend: PORT, MONGO_URI, JWT_SECRET, CLIENT_URL, NODE_ENV.
Frontend: VITE_API_URL, VITE_SOCKET_URL.
Never commit `.env`.

## API overview
Auth: `/api/auth/*`; user: `/api/users/*`; tasks: `/api/tasks/*`; notes: `/api/notes/*`; categories: `/api/categories/*`; notifications: `/api/notifications/*`; dashboard: `/api/dashboard/*`.

## Deployment
Frontend can be deployed to Vercel with `npm run build` and the client directory as the project root. Backend can run on Render/Railway with `npm start`. Use MongoDB Atlas for production and set CLIENT_URL to the deployed frontend origin. Socket.IO should use the backend production URL.

## Security notes
Passwords use bcrypt. APIs are authenticated with JWT. Every task/note/category query is scoped to the authenticated user. Secrets live in environment variables.

## Roadmap
Add a background reminder worker, email provider, richer calendar views, attachment storage, rate limiting package, automated tests, drag-and-drop library, and optional AI adapters.

## Git
```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_URL
git push -u origin main
```

## Author
Harsh Kumar — Full Stack Developer / React Developer
