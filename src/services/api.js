/**
 * Single Axios instance for talking to the Bholu backend.
 * Base URL comes from VITE_API_URL so it works locally and once deployed
 * without any code changes.
 */
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

/** GET /health */
export const getHealth = () => api.get("/health").then((r) => r.data);

/** GET /about */
export const getAbout = () => api.get("/about").then((r) => r.data?.data ?? r.data);

/** GET /projects */
export const getProjects = () => api.get("/projects").then((r) => r.data?.data ?? r.data);

/** GET /skills */
export const getSkills = () => api.get("/skills").then((r) => r.data?.data ?? r.data);

/** GET /resume */
export const getResume = () => api.get("/resume").then((r) => r.data?.data ?? r.data);

/** GET /stats */
export const getStats = () => api.get("/stats").then((r) => r.data?.data ?? r.data);

/**
 * POST /chat - only ever called when the user actually submits a message.
 * Never called on page load, on section open, or on a timer.
 */
export const postChat = (message, sessionId) =>
  api
    .post("/chat", { message, session_id: sessionId || undefined })
    .then((r) => r.data?.data ?? r.data);

/** POST /feedback */
export const postFeedback = (question, response, rating) =>
  api.post("/feedback", { question, response, rating }).then((r) => r.data);

export const STREAM_URL = (message, sessionId) => {
  const params = new URLSearchParams({ message });
  if (sessionId) params.set("session_id", sessionId);
  return `${API_URL}/chat/stream?${params.toString()}`;
};

export default api;
