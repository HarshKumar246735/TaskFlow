# 🚀 TaskFlow — Full-Stack Task Management System

<img width="1917" height="922" alt="image" src="https://github.com/user-attachments/assets/c73854cd-f6cc-462c-95e5-6a706edbc85c" />


TaskFlow is a modern **full-stack task management web application** designed to help users efficiently create, organize, prioritize, and track their daily tasks.

The application provides a structured workspace where users can manage tasks according to their **status, priority, category, and deadlines**, making it easier to stay organized and productive.

---

## 📌 Project Overview

Managing multiple tasks manually can become difficult, especially when tasks have different priorities, deadlines, and categories.

**TaskFlow** solves this problem by providing a centralized task management platform where users can:

* Create and manage tasks
* Assign priorities
* Organize tasks into categories
* Track task status
* Set deadlines
* Update and delete tasks
* Monitor tasks from a dashboard
* Manage their account securely

The project is built using a modern **MERN-style full-stack architecture** with a React frontend and Node.js/Express backend.

---

## ✨ Features

### 🔐 Authentication & User Management

<img width="1916" height="922" alt="image" src="https://github.com/user-attachments/assets/661bfb86-3a7d-4c79-96d4-1bff166e1fd4" />


* User registration
* User login
* Secure authentication
* JWT-based authentication
* Protected routes
* User-specific task management
* Logout functionality

### 📝 Task Management

<img width="1908" height="916" alt="image" src="https://github.com/user-attachments/assets/9951bf8b-70d8-4e43-91e6-e07b86a7b2e6" />


Users can:

* Create new tasks
* View all tasks
* View individual task details

<img width="1913" height="922" alt="image" src="https://github.com/user-attachments/assets/edf21a3c-6bb6-4335-bc9a-c629d33e7ba0" />


  
* Update existing tasks
* Delete tasks
* Mark tasks as completed
* Change task status

<img width="1910" height="917" alt="Screenshot 2026-10-08 210209" src="https://github.com/user-attachments/assets/3293d903-eaae-4e73-871b-4cc993b3419c" />

* Set task priority
* Add task descriptions
* Set due dates

### 📂 Category Management

<img width="1916" height="903" alt="image" src="https://github.com/user-attachments/assets/efa3aa16-e765-4297-8393-f900354b4580" />


Tasks can be organized into different categories.

Examples:

* Work
* Personal
* Study
* Projects
* Meetings
* Important

Users can create and manage categories according to their requirements.

### 🎯 Task Priority

Tasks can have different priority levels such as:

* Low
* Medium
* High

This helps users focus on the most important tasks first.

### 📊 Task Status

<img width="1908" height="916" alt="image" src="https://github.com/user-attachments/assets/887f5ecc-e80d-4a51-b7ff-85180f11df48" />


TaskFlow supports task progress tracking using statuses such as:

* Pending
* In Progress
* Completed

This allows users to understand the current state of their work.

### 📅 Deadline Management

Users can assign deadlines to tasks and keep track of upcoming work.

This helps with:

* Time management
* Planning
* Productivity
* Deadline tracking

### 📱 Responsive Interface

<img width="1915" height="912" alt="image" src="https://github.com/user-attachments/assets/094a208e-d152-426a-989d-d27255e127cf" />


The frontend is designed to work across different screen sizes:

* Desktop
* Laptop
* Tablet
* Mobile

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* React Router
* REST API integration

### Backend

* Node.js
* Express.js
* RESTful APIs
* JWT Authentication
* Middleware

### Database

* MongoDB
* Mongoose

### Development Tools

* Git
* GitHub
* VS Code
* Postman
* npm

---

## 🏗️ Project Architecture

```text
TaskFlow
│
├── client
│   │
│   ├── public
│   │
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── assets
│   │   ├── css
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server
│   │
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── config
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
```

---

## 🔄 Application Flow

```text
User
  │
  ▼
React Frontend
  │
  ▼
REST API
  │
  ▼
Express.js Server
  │
  ▼
Controllers
  │
  ▼
Mongoose
  │
  ▼
MongoDB
```

---

## 🔐 Authentication Flow

TaskFlow uses JWT-based authentication.

```text
User Registration
       │
       ▼
Backend Validation
       │
       ▼
Password Hashing
       │
       ▼
User Stored in MongoDB
       │
       ▼
Login
       │
       ▼
JWT Token Generated
       │
       ▼
Authenticated Requests
```

Protected APIs verify the JWT token before allowing access to user-specific resources.

---

## 📡 API Structure

The backend follows a RESTful API architecture.

Typical API operations include:

```text
POST    /api/auth/register
POST    /api/auth/login

GET     /api/tasks
POST    /api/tasks
GET     /api/tasks/:id
PUT     /api/tasks/:id
DELETE  /api/tasks/:id

GET     /api/categories
POST    /api/categories
PUT     /api/categories/:id
DELETE  /api/categories/:id
```

> API routes may vary depending on the current implementation.

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/HarshKumar246735/TaskFlow.git
```

Move into the project directory:

```bash
cd TaskFlow
```

---

## 2. Install Frontend Dependencies

```bash
cd client
npm install
```

---

## 3. Install Backend Dependencies

Open another terminal:

```bash
cd server
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the `server` directory.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Important

Never upload your `.env` file to GitHub.

Make sure `.env` is included in `.gitignore`.

Example:

```gitignore
node_modules/
.env
```

---

# ▶️ Running the Application

## Start Backend

Inside the `server` folder:

```bash
npm run dev
```

or:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

---

## Start Frontend

Inside the `client` folder:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🗄️ Database

TaskFlow uses **MongoDB** for storing application data.

The database can contain collections such as:

```text
Users
Tasks
Categories
```

### User Data

Typical user information:

```text
name
email
password
createdAt
updatedAt
```

### Task Data

Typical task information:

```text
title
description
priority
status
category
dueDate
user
createdAt
updatedAt
```

---

# 🧪 Testing APIs

Backend APIs can be tested using tools such as:

* Postman
* Thunder Client
* Browser
* Frontend application

Example request:

```http
POST /api/tasks
```

Example task data:

```json
{
  "title": "Complete React Project",
  "description": "Finish the frontend implementation",
  "priority": "High",
  "status": "In Progress"
}
```

---

# 🔒 Security

TaskFlow follows basic web application security practices, including:

* JWT authentication
* Password hashing
* Protected API routes
* User-specific data access
* Environment variables for secrets
* Backend validation
* CORS configuration

Sensitive credentials such as database passwords and JWT secrets should never be committed to GitHub.

---

# 📁 Important Folders

### `client/`

Contains the complete React frontend.

```text
client/
└── src/
    ├── components/
    ├── pages/
    ├── services/
    ├── css/
    └── App.jsx
```

### `server/`

Contains the backend application.

```text
server/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
└── server.js
```

---

# 🌐 Deployment

TaskFlow can be deployed using:

### Frontend

**Vercel**

```text
React/Vite Application
        ↓
      Vercel
```

### Backend

**Render**

```text
Node.js + Express
        ↓
      Render
```

### Database

**MongoDB Atlas**

```text
MongoDB Atlas
      ↓
Cloud Database
```

---

## 🚀 Production Architecture

```text
                 ┌──────────────────┐
                 │     User         │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │     Vercel       │
                 │ React Frontend   │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │     Render       │
                 │ Express Backend  │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │  MongoDB Atlas   │
                 │     Database     │
                 └──────────────────┘
```

---

# 🧑‍💻 Development Workflow

Recommended development workflow:

```text
1. Create a feature
       ↓
2. Develop frontend
       ↓
3. Develop backend API
       ↓
4. Connect database
       ↓
5. Test API
       ↓
6. Test frontend
       ↓
7. Fix bugs
       ↓
8. Commit changes
       ↓
9. Push to GitHub
       ↓
10. Deploy
```

---

# 📌 Git Commands

Check repository status:

```bash
git status
```

Add changes:

```bash
git add .
```

Commit changes:

```bash
git commit -m "Update TaskFlow"
```

Push changes:

```bash
git push
```

Pull latest changes:

```bash
git pull
```

---

# 🔮 Future Improvements

Possible future features include:

* 🔔 Task reminders
* 📧 Email notifications
* 📊 Productivity analytics
* 📈 Advanced dashboard
* 🔎 Task search
* 🔃 Advanced filtering and sorting
* 🌓 Dark/light mode
* 📅 Calendar integration
* 👥 Team collaboration
* 💬 Comments
* 📎 File attachments
* 🔔 Browser notifications
* 📱 Progressive Web App support

---

# 🎯 Learning Objectives

This project demonstrates practical experience with:

* Full-stack web development
* React component development
* REST API development
* CRUD operations
* Authentication and authorization
* JWT
* MongoDB
* Mongoose
* Express.js
* API integration
* Git and GitHub
* Frontend/backend communication
* Deployment

---

# 👨‍💻 Author

**Harsh Kumar**

MCA — Graphic Era Hill University

BSc — MJPR University

**Role:** Full Stack Developer / Software Developer

---

## 📬 Contact

GitHub:

https://github.com/HarshKumar246735

Portfolio:

https://my-portfolio-kappa-one-62.vercel.app

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is created for educational, portfolio, and development purposes.
