import { useCallback, useRef, useState } from "react";
import { postChat, STREAM_URL } from "../services/api.js";

const SESSION_KEY = "bholu_session_id";

function getOrCreateSessionId() {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  content:
    "👋 Hey! I'm **Bholu** — Ashutosh's Personal AI Portfolio Assistant.\n\n" +
    "I'm here to help you explore Ashutosh's projects, technical skills, learning journey, and career goals.\n\n" +
    "Rather than browsing multiple pages, just ask me things like:\n" +
    "- Tell me about Ashutosh\n" +
    "- Explain his GPT project\n" +
    "- Show his AI projects\n" +
    "- What technologies does he know?\n" +
    "- Why should I hire him?\n\n" +
    "Let's get started 🚀",
  timestamp: Date.now(),
};

/**
 * useChat
 *
 * Owns all chat state. Crucially: /chat (or /chat/stream) is ONLY ever
 * called from sendMessage(), which only runs when the user submits a
 * message. The welcome message above is static and never triggers a
 * network request.
 */
export function useChat() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const sessionIdRef = useRef(getOrCreateSessionId());
  const eventSourceRef = useRef(null);

  const appendMessage = useCallback((msg) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const sendMessage = useCallback(
    async (text, streamingEnabled = true) => {
      const trimmed = text.trim();
      if (!trimmed || isSending) return;

      setError(null);
      const userMsg = { id: crypto.randomUUID(), role: "user", content: trimmed, timestamp: Date.now() };
      appendMessage(userMsg);
      setIsSending(true);

      const assistantId = crypto.randomUUID();
      appendMessage({ id: assistantId, role: "assistant", content: "", timestamp: Date.now(), streaming: true });

      const updateAssistant = (updater) => {
        setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, ...updater(m) } : m)));
      };

      if (streamingEnabled && typeof EventSource !== "undefined") {
        try {
          await streamViaSSE(trimmed, sessionIdRef.current, updateAssistant, eventSourceRef);
          setIsSending(false);
          return;
        } catch (streamErr) {
          // Graceful fallback to the normal JSON endpoint below.
          console.warn("Streaming failed, falling back to normal /chat:", streamErr);
        }
      }

      try {
        const result = await postChat(trimmed, sessionIdRef.current);
        updateAssistant(() => ({ content: result.response, streaming: false }));
        if (result.session_id) sessionIdRef.current = result.session_id;
      } catch (err) {
        updateAssistant(() => ({
          content: "Bholu is taking a short break. Please try again in a moment.",
          streaming: false,
          isError: true,
        }));
        setError(err);
      } finally {
        setIsSending(false);
      }
    },
    [appendMessage, isSending]
  );

  return { messages, sendMessage, isSending, error };
}

function streamViaSSE(message, sessionId, updateAssistant, eventSourceRef) {
  return new Promise((resolve, reject) => {
    const url = STREAM_URL(message, sessionId);
    const source = new EventSource(url);
    eventSourceRef.current = source;
    let accumulated = "";
    let receivedAny = false;

    source.onmessage = (event) => {
      receivedAny = true;
      accumulated += event.data;
      updateAssistant(() => ({ content: accumulated, streaming: true }));
    };

    source.addEventListener("done", () => {
      updateAssistant(() => ({ streaming: false }));
      source.close();
      resolve();
    });

    source.onerror = () => {
      source.close();
      if (receivedAny) {
        // We already streamed a partial answer - treat as complete rather
        // than discarding it and falling back.
        updateAssistant(() => ({ streaming: false }));
        resolve();
      } else {
        reject(new Error("SSE connection failed before any data arrived."));
      }
    };
  });
}
