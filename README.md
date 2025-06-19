# 📇 Business Cards Web App

A full-featured web application for managing, creating, liking, and browsing business cards. Built with React, TypeScript, and TailwindCSS.

---

## 🔥 Features

- 🔐 User authentication (Sign in / Sign up)
- 👤 Profile page with personalized actions
- 📝 Create and manage your own business cards
- ❤️ Like/Unlike cards and view liked cards
- 👥 Admin CRM panel to manage all users
- 🌗 Light/Dark theme toggle (Flowbite + Tailwind)
- 🚫 Login attempts limiter (blocks after 3 tries for 24h)
- 📱 Fully responsive for mobile and desktop

---

## ⚙️ Tech Stack

- **React** + **TypeScript**
- **React Router**
- **TailwindCSS** + **Flowbite React**
- **Axios** for API calls
- **React Context API** (for Auth state)
- **localStorage** (for session + blocking logic)
- External **REST API** (`Node.js`) – Provided by course backend

---

## 🔐 Authentication & Blocking Logic

- The app limits failed login attempts to **3**.
- If exceeded, the user is **blocked for 24 hours** using `localStorage`.
- After 24 hours, access is automatically restored.

---

## 📡 API Endpoint

This project uses a public backend from the course:

```
https://monkfish-app-z9uza.ondigitalocean.app/bcard2
```

You must include a valid JWT token for protected routes:

```http
Header: x-auth-token: <your-token-here>
```

---

## 🖼 Screenshots

_Add screenshots of your app here if desired._

---

## 👨‍💻 Author

**Yossi Tzabari**  
🎬 Video Editor & Fullstack Developer  
🌍 [Portfolio Website](https://45yos.github.io/Yossi-Tsabari-Portfolio/)

---

## 📄 License

This project is for educational purposes only.
