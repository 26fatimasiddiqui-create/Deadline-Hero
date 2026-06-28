# 🚀 Deadline Hero

Deadline Hero is an AI-powered task management web application that helps users organize, prioritize, and complete tasks efficiently. It combines traditional task management with AI-driven prioritization, deadline tracking, and an interactive calendar to improve productivity.

## ✨ Features

- 🔐 Secure User Authentication (JWT)
- ✅ Create, Edit, Delete & Mark Tasks as Complete
- 🤖 AI-Powered Task Prioritization using Google Gemini API
- 📅 Interactive Calendar View
- ⏰ Deadline Tracking & Due Date Management
- 🎯 Task Categorization by Priority
- 📊 Dashboard with Task Overview
- 🔍 Search and Filter Tasks
- 📱 Responsive User Interface
- 🌙 Modern and User-Friendly Design

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Axios
- React Calendar
- CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Google Gemini API

## 📂 Project Structure

```
Deadline-Hero/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── package.json
│
└── README.md
```

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/26fatimasiddiqui-create/Deadline-Hero.git
```

### Install dependencies

Frontend

```bash
cd frontend
npm install
```

Backend

```bash
cd backend
npm install
```

### Configure Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
GEMINI_MODEL=gemini-2.5-flash
```

### Run the application

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

## 🎯 Future Improvements

- Email reminders
- Mobile application
- Team collaboration
- Recurring tasks
- Notifications
- Dark mode
- Analytics Dashboard

## 👩‍💻 Author

**Maheen Fatima**

- GitHub: https://github.com/26fatimasiddiqui-create

---

⭐ If you like this project, consider giving it a star!
