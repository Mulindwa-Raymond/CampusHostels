// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { getToken, removeToken } from "./utils/helpers";
import "./styles/globals.css";
import "./styles/layout.css";

/**
 * Vite uses import.meta.env for env variables.
 * Use VITE_API_URL in your .env (Vite) file: VITE_API_URL=http://localhost:5000/api
 */
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
axios.defaults.baseURL = API_BASE;

export const setAxiosAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

const initAuthFromStorage = () => {
  try {
    const token = typeof getToken === "function" ? getToken() : localStorage.getItem("token");
    if (token) setAxiosAuthToken(token);
  } catch (err) {
    console.warn("Could not initialize auth token:", err);
  }
};

initAuthFromStorage();

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      try {
        if (typeof removeToken === "function") removeToken();
        setAxiosAuthToken(null);
      } catch (e) {
        /* noop */
      }
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

window.addEventListener("storage", (e) => {
  if (e.key === "token") {
    const newToken = e.newValue;
    if (newToken) {
      setAxiosAuthToken(newToken);
    } else {
      setAxiosAuthToken(null);
    }
  }
});

// Safe root creation (helpful in some test environments)
const container = document.getElementById("root") || (() => {
  const el = document.createElement("div");
  el.id = "root";
  document.body.appendChild(el);
  return el;
})();

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);