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
 * POST /chat - extracts the clean conversational text from any response shape.
 * Never allows raw JSON objects to leak through to the UI.
 */
export const postChat = (message, sessionId) =>
  api
    .post("/chat", { message, session_id: sessionId || undefined })
    .then((r) => {
      const payload = r.data;
      let text = "";
      let sid = sessionId;

      if (typeof payload === "string") {
        text = payload;
      } else if (payload?.data?.response) {
        text = payload.data.response;
        sid = payload.data.session_id || sid;
      } else if (payload?.data?.answer) {
        text = payload.data.answer;
        sid = payload.data.session_id || sid;
      } else if (payload?.response) {
        text = payload.response;
        sid = payload.session_id || sid;
      } else if (payload?.answer) {
        text = payload.answer;
        sid = payload.session_id || sid;
      } else {
        text = typeof payload === "object" ? JSON.stringify(payload) : String(payload);
      }

      // If text itself is a JSON string e.g. {"answer": "...", "status": "success"}
      if (typeof text === "string" && text.trim().startsWith("{") && text.trim().endsWith("}")) {
        try {
          const parsed = JSON.parse(text.trim());
          if (parsed.answer) text = parsed.answer;
          else if (parsed.response) text = parsed.response;
          else if (parsed.data?.response) text = parsed.data.response;
          else if (parsed.data?.answer) text = parsed.data.answer;
        } catch (e) {}
      }

      return { response: text, answer: text, session_id: sid };
    });

/** POST /feedback */
export const postFeedback = (question, response, rating) =>
  api.post("/feedback", { question, response, rating }).then((r) => r.data);

export const STREAM_URL = (message, sessionId) => {
  const params = new URLSearchParams({ message });
  if (sessionId) params.set("session_id", sessionId);
  return `${API_URL}/chat/stream?${params.toString()}`;
};

export default api;
