import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainApp from "./MainApp.tsx";
import { AuthProvider } from "./components/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  </React.StrictMode>,
);
