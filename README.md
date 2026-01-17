# React Habit Tracker

A simple yet powerful **Habit Tracker** application built with **React** and a lightweight **Node.js / Express** backend.  
This project helps users track daily habits, monitor progress, and stay motivated with points and statistics.

---

## 🚀 Features

### Frontend (React)
- Add, delete, and toggle habits
- Filter habits (All / Completed / Active)
- Points system based on completed habits
- Streak / score logic
- Statistics dashboard
- Routing with React Router
- Protected routes (basic auth logic)
- Loading & error states
- Clean and simple UI

### Backend (Node.js + Express)
- REST API for habits
- CRUD operations:
  - `GET /habits`
  - `POST /habits`
  - `PATCH /habits/:id`
  - `DELETE /habits/:id`
- Basic authentication endpoints:
  - `POST /auth/register`
  - `POST /auth/login`
- In-memory data (no database yet)

---

## 🛠 Tech Stack

**Frontend**
- React
- React Router DOM
- JavaScript (ES6+)
- CSS

**Backend**
- Node.js
- Express
- CORS

---


---

## ⚙️ Installation & Setup

### Clone the repository

```bash
git clone https://github.com/MerveAltnsk/react-habit-tracker.git
cd react-habit-tracker
```

### Install frontend dependencies

```bash
npm install
```

### Install backend dependencies
```bash
cd server
npm install
```


## API Endpoints
Habits
GET /habits → Get all habits
POST /habits → Create new habit
PATCH /habits/:id → Update habit
DELETE /habits/:id → Delete habit
Auth
POST /auth/register
POST /auth/login

## 🎯 Learning Goals
This project was built to practice:
React Hooks & lifecycle (useState, useEffect)
Component-based architecture
API integration
Basic backend development
Authentication logic
Git & GitHub workflow

## 👩‍💻 Author
Merve Altınışık
