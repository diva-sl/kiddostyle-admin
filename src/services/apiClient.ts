import axios from "axios";

// Environment-aware API URL detection for local and production logins
const defaultApiUrl =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:8081/api"
    : "https://api.kiddostyle.gcvdanta.com/api";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || defaultApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to inject Bearer Token on protected calls
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle global responses and redirect to login if session expires
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Optional: window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
