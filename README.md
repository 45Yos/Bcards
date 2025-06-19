
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

## 🚀 Getting Started Locally

### 1. Clone the project:

```bash
git clone https://github.com/your-username/business-cards-app.git
cd business-cards-app
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Run the development server:

```bash
npm run dev
```

The app will run on `http://localhost:5173` by default (Vite).

---

## 🌍 Deploy Online

This project can be deployed easily on platforms like **Vercel** or **Netlify**.

### ▶ Deploy to Vercel (Recommended):

1. Push your code to GitHub.
2. Go to [https://vercel.com](https://vercel.com) and log in.
3. Click **"Add New Project"** → Import your repo.
4. Choose **Framework: Vite** or **React**
5. Deploy.

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
🌍 [Portfolio Website](https://45yos.github.io/Video-Editor/VideoEditor/VideoEditor.html)

---

## 📄 License

This project is for educational purposes only.
