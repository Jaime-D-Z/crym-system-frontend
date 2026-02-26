import axios from "axios";

/**
 * Axios instance pre-configured for the CRM backend.
 * - baseURL points to backend (uses VITE_API_URL in production)
 * - withCredentials: true sends the session cookie (crm.sid) on every request
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true, // required for session cookie auth
  headers: { "Content-Type": "application/json" },
});

// Request interceptor: attach JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("crm_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: handle 401 globally → redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("crm_token");
      // We don't force redirect here to allow AuthContext/PrivateRoutes to handle state
    }
    return Promise.reject(error);
  },
);

export default api;
