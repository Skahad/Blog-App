# 📝 MERN Blog Platform

A full-stack **MERN** (MongoDB, Express, React, Node.js) blogging platform featuring **Material UI**, **Tailwind CSS**, and **shadcn UI** components.  
Users can create, update, delete, and read blog posts with a modern, responsive interface.

---

## 🚀 Features

- ✨ Modern UI using **Material UI**, **Tailwind CSS**, and **shadcn UI**
- 🪶 Create, Edit, Delete, and View blog posts
- 🧑‍💻 JWT-based Authentication & Authorization
- 🗂️ Image Uploads with **GridFS**
- 📦 RESTful API with Express
- ⚡ State management using React Hooks & Context API
- 🧱 Responsive layout for all devices

---

## 🏗️ Folder Structure

```
BlogApp/
│
├── client/        # React frontend (Vite)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/        # Express backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── .env
│   ├── server.js / index.js
│   ├── package.json
│
└── README.md
```

---

## ⚙️ Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/try/download/community)
- npm or yarn package manager

---

## 🔧 Environment Variables

### 🖥️ Server (.env)

```bash
PORT=8000
BASE_URL=http://localhost:8000
DB_USERNAME=yourMongoDBUsername
DB_PASSWORD=yourMongoDBPassword
JWT_SECRET=yourSecretKey
```

### 🌐 Client (.env)

```bash
VITE_API_URL=http://localhost:8000
```

Make sure both client and server `.env` files are correctly configured before running locally.

---

## 🧠 Running the Project Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Skahad/Blog-App.git
cd Blog-App
```

### 2️⃣ Install Dependencies

#### Server
```bash
cd server
npm install
```

#### Client
```bash
cd ../client
npm install
```

---

### 3️⃣ Run the Server

In the **server** directory:
```bash
npm start
```
or if you use nodemon:
```bash
npm run dev
```
Server should run on:  
👉 http://localhost:8000

---

### 4️⃣ Run the Client

In another terminal, inside **client** directory:
```bash
npm run dev
```
Client will run on:  
👉 http://localhost:5173

---

## ⚠️ Common Issues

| Issue | Solution |
|-------|-----------|
| `CORS` error | Ensure `cors()` middleware is added in Express |
| `.env not loading` | Check file name and `dotenv.config()` placement |
| API URL mismatch | Confirm frontend `VITE_API_URL` matches backend’s local URL |
| Upload issue | Verify MongoDB GridFS or Cloudinary configuration |

---

## 🌐 Deployment

Deployed Version: [View Live Project-blogapp](https://blog-app-ahad.vercel.app/)

---

## 🧑‍💻 Author

**Shaikh Ahad**  
🔗 GitHub: [Skahad](https://github.com/Skahad)

---

## 🪪 License

This project is licensed under the **MIT License** — feel free to use and modify it.

---

⭐ *If you like this project, don’t forget to star the repo!*
